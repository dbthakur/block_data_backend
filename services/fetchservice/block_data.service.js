

import { db } from "../../db/dbConnect.js";
import { getCurrentFinancialYearandprevious } from "../../utils/getCurrentFinancialYear.js";
import { groupByLevels } from "../../utils/groupByLevels.js";

export const getblockdataService = async (fin_yr_array) => {
  try {
    const yearsToUse = Array.isArray(fin_yr_array) && fin_yr_array.length > 0
      ? fin_yr_array
      : getCurrentFinancialYearandprevious();

    const placeholders = yearsToUse.map(() => '?').join(', '); 
    //  console.log(yearsToUse)

    const query = `
      SELECT * FROM block_data
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
        d.reportDate,
        COALESCE(COUNT(b.reportDate), 0) AS total_entries,
        COALESCE(SUM(CASE WHEN b.Actual_Output = '' THEN 1 ELSE 0 END), 0) AS not_update_count,
        COALESCE(SUM(CASE WHEN b.Availed_Duration = 0 THEN 1 ELSE 0 END), 0) AS block_not_granted,
        COALESCE(SUM(CASE WHEN b.Availed_Duration > 0 THEN 1 ELSE 0 END), 0) AS block_granted
      FROM date_series d
      LEFT JOIN block_data b ON d.reportDate = b.reportDate
      GROUP BY d.reportDate
      ORDER BY d.reportDate
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