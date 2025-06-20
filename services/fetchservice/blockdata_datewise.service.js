
import { db } from "../../db/dbConnect.js";
import { groupByLevelsWithAllData } from "../../utils/groupByLevelWithAllData.js";

export const getBlockDataByDateService = async (inputDateStr) => {
  try {
    const inputDate = new Date(inputDateStr);
    if (isNaN(inputDate)) throw new Error("Invalid date format");

    const dateOnly = inputDate.toISOString().split('T')[0];
    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, '0');
    const yyyyMM = `${year}-${month}`;

    // Financial Year Range
    const fyStart = inputDate.getMonth() + 1 >= 4 ? `${year}-04-01` : `${year - 1}-04-01`;
    const fyEnd = inputDate.getMonth() + 1 >= 4 ? `${year + 1}-03-31` : `${year}-03-31`;

    // Last 7 Days Range
    const last7StartDateObj = new Date(inputDate);
    last7StartDateObj.setDate(last7StartDateObj.getDate() - 6); // 6 days before current
    const last7StartDate = last7StartDateObj.toISOString().split('T')[0];

    // SQL Queries
    const queries = {
      currentDate: `SELECT * FROM block_data WHERE \`reportDate\` = ?`,
      last7Days: `SELECT * FROM block_data WHERE \`reportDate\` BETWEEN ? AND ?`,
      monthData: `SELECT * FROM block_data WHERE DATE_FORMAT(\`reportDate\`, '%Y-%m') = ?`,
      fyData: `SELECT * FROM block_data WHERE \`reportDate\` BETWEEN ? AND ?`,
    };

    // Execute Queries
    const [currentDateRows] = await db.query(queries.currentDate, [dateOnly]);
    const [last7DaysRows] = await db.query(queries.last7Days, [last7StartDate, dateOnly]);
    const [monthRows] = await db.query(queries.monthData, [yyyyMM]);
    const [fyRows] = await db.query(queries.fyData, [fyStart, fyEnd]);

    const levels = ['section_name', 'Department', 'Direction'];
    const structureData = (rows, customLevels = levels) => groupByLevelsWithAllData(rows, customLevels);
    // const structureData = (rows) => groupByLevels(rows, levels);

    return {
      status: "ok",

      currentDate: {
        date: dateOnly,
        data: structureData(currentDateRows)
      },

      last7Days: {
        Range :{ start: last7StartDate,end:dateOnly } ,
        data: structureData(last7DaysRows)
      },

      monthData: {
        month: yyyyMM,
        data: structureData(monthRows)
      },

      financialYearData: { financialYear: `${fyStart.slice(0, 4)}-${fyEnd.slice(2, 4)}`,
        // range: { start: fyStart, end: fyEnd },
        data: structureData(fyRows,['section_name', 'Department', 'a_month']) //filtering by section_name, Department, a_month
      }
    };

  } catch (error) {
    console.error("Error in getBlockDataByDateService:", error);
    return {
      status: "error",
      message: error.message,
    };
  }
};
