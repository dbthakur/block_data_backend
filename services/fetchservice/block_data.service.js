

import { db } from "../../db/dbConnect.js";
import { getCurrentFinancialYearandprevious } from "../../utils/getCurrentFinancialYear.js";
import { groupByLevels } from "../../utils/groupByLevels.js";

export const getblockdataService = async (fin_yr_array) => {
  try {
    const yearsToUse = Array.isArray(fin_yr_array) && fin_yr_array.length > 0
      ? fin_yr_array
      : getCurrentFinancialYearandprevious();

    const placeholders = yearsToUse.map(() => '?').join(', '); 

    const query = `SELECT * FROM block_data
      WHERE F_Year IN (${placeholders})
    `;

    const [allRailRodSheet] = await db.query(query, yearsToUse);

    const groupedData = groupByLevels(
      allRailRodSheet,
      ['section_name', 'Department', 'a_month']
    );

    const query2 = ' SELECT DISTINCT F_Year FROM block_data ORDER BY F_Year DESC ';
    const [years] = await db.query(query2);
   
    const yearsArray = years.map(year => year.F_Year);
  
    return {
      status: "ok",
      groupedData,
      yearsArray,
    };
  } catch (error) {
    console.error("Error in getblockdataService:", error);
    return {
      status: "error",
      message: error.message
    };
  }
};


export const getblockdataReportFor30DaysService = async (inputDateStr) => {
  try {
    // Use current date if no input date is provided
    const inputDate = inputDateStr ? new Date(inputDateStr) : new Date();
    if (isNaN(inputDate)) throw new Error("Invalid date format");

    // Set time to midnight to avoid timezone issues
    inputDate.setHours(0, 0, 0, 0);
    
    const last30DaysStartDateObj = new Date(inputDate);
    last30DaysStartDateObj.setDate(last30DaysStartDateObj.getDate() - 29);

    const last30DaysStartDate = last30DaysStartDateObj.toISOString().split('T')[0];
    const endDate = inputDate.toISOString().split('T')[0];

    console.log("Input Date:", endDate);
    console.log("Last 30 Days Start Date:", last30DaysStartDate);

    const query = `
      WITH RECURSIVE date_series AS (
        SELECT ? AS reportDate
        UNION ALL
        SELECT DATE_ADD(reportDate, INTERVAL 1 DAY)
        FROM date_series
        WHERE reportDate < ?
      )
      SELECT 
        d.reportDate as date,
        COALESCE(COUNT(b.reportDate), 0) AS no_of_entries,
        COALESCE(SUM(CASE WHEN b.Actual_Output != '' THEN 1 ELSE 0 END),0) AS no_of_updated_entries,
        COALESCE(SUM(CASE WHEN b.Availed_Duration = 0 THEN 1 ELSE 0 END), 0) AS block_not_granted,
        COALESCE(SUM(CASE WHEN b.Availed_Duration > 0 THEN 1 ELSE 0 END), 0) AS block_granted,
        SEC_TO_TIME(SUM(TIME_TO_SEC(Availed))) AS total_availed_time
      FROM date_series d
      LEFT JOIN block_data b ON d.reportDate = b.reportDate
      GROUP BY d.reportDate
      ORDER BY d.reportDate DESC
    `;

    const [rows] = await db.query(query, [
      last30DaysStartDate,
      endDate
    ]);

    console.log("Rows fetched:", rows);
    return {
      status: "ok",
      data: rows,
    };
  } catch (error) {
    console.error("Error in getblockdataReportFor30DaysService:", error);
    return {
      status: "error",
      message: error.message
    };
  }
}

export const getblockdataReportForGroupWiseService = async (inputDateStr) => {
  try {

     const formatDate = (d) => {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const inputDate = new Date(inputDateStr || Date.now());

let financialYearStartYear;
if (inputDate.getMonth() + 1 >= 4) {
  financialYearStartYear = inputDate.getFullYear();
} else {
  financialYearStartYear = inputDate.getFullYear() - 1;
}

const prevDate = new Date(financialYearStartYear - 1, 3, 1); 

    const query = `SELECT F_Year,Department,section,Corridore,Month,a_month,s_month,
    sum(No_Of_Demand_By_Engg) as aggriedBlock,SUM(TIME_TO_SEC(Agreed_Demand)) as agreedHrs,
     sum(No_Of_Demand_Agreed_GIVEN) as blockGiven,sum(TIME_TO_SEC(Availed)) as givenHour 
     FROM block_data where reportDate between ? and ? GROUP BY F_Year,Department,section,
     Corridore,Month,a_month,s_month ORDER BY F_Year DESC,s_month`;

    const [rows] = await db.query(query, [prevDate, inputDate ]);

    const query2 = `SELECT DISTINCT F_Year FROM block_data ORDER BY F_Year DESC`;
    const [years] = await db.query(query2);
    const yearsArray = years.map(year => year.F_Year);
 const groupedData = groupByLevels(
      rows,
      ['F_Year', 'section', 'Department','Corridore','a_month']
    );

    return {
      status: "ok",
      data: groupedData,
      yearsArray: yearsArray    };
  } catch (error) {
    console.error("Error in getblockdataReportForGroupWiseService:", error);
    return {
      status: "error",
      message: error.message
    };
  } 
}
