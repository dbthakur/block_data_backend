

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
