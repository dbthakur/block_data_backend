import { db } from "../../db/dbConnect.js";
import { groupByLevels } from "../../utils/groupByLevels.js";

export const getFinancialYearBlockDataService = async (inputDateStr) => {
  try {
    const inputDate = new Date(inputDateStr);
    if (isNaN(inputDate)) throw new Error("Invalid date format");

    // Get all distinct financial years from database
    const [allYears] = await db.query(`
      SELECT DISTINCT 
        CASE 
          WHEN MONTH(\`Date\`) >= 4 
          THEN CONCAT(YEAR(\`Date\`), '-', RIGHT(YEAR(\`Date\`) + 1, 2))
          ELSE CONCAT(YEAR(\`Date\`) - 1, '-', RIGHT(YEAR(\`Date\`), 2))
        END AS financial_year
      FROM block_data
      ORDER BY financial_year DESC
    `);

    if (allYears.length === 0) {
      return {
        status: "ok",
        Finacial_yaer_Data: []
      };
    }

    // Determine input financial year
    const inputYear = inputDate.getFullYear();
    const inputMonth = inputDate.getMonth() + 1;
    const inputFY = inputMonth >= 4 
      ? `${inputYear}-${String(inputYear + 1).slice(-2)}` 
      : `${inputYear - 1}-${String(inputYear).slice(-2)}`;

    // Get all years prior to input year
    const historicalYears = allYears
      .map(row => row.financial_year)
      .filter(fy => fy < inputFY);

    if (historicalYears.length === 0) {
      return {
        status: "ok",
        Financial_year_data_: ["No  data available for the entered financial year- " + inputFY]
      };
    }

    // Fetch data for all previous FY years
    const FinancialYearData = await Promise.all(
      historicalYears.map(async fy => {
        const [startYear, endYearShort] = fy.split('-');
        const endYear = `20${endYearShort}`;
        
        const [rows] = await db.query(`
          SELECT * FROM block_data 
          WHERE \`Date\` BETWEEN ? AND ?
          ORDER BY \`Date\` DESC
        `, [`${startYear}-04-01`, `${endYear}-03-31`]);

        return {
          financialYear: fy,
          data: groupByLevels(rows, ['section_name', 'Department', 'a_month'])
        };
      })
    );

    return {
      status: "ok",
      FinancialYearData
    };

  } catch (error) {
    console.error("Error in getFinancialYearBlockDataService:", error);
    return {
      status: "error",
      message: error.message
    };
  }
};

