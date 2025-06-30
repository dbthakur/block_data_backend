
import { db } from "../../db/dbConnect.js";
import { groupByLevelsWithAllData } from "../../utils/groupByLevelWithAllData.js";

export const getBlockDataByDateService = async (query) => {
  try {
    const { start, end } = query;
    let rows = [];
    let info = {};

    const levels = ['section', 'Department', 'Direction'];
    const structureData = (rows) => groupByLevelsWithAllData(rows, levels);

    if (start && end) {
      // Case 1: Date range query
      const startDate = new Date(start);
      const endDate = new Date(end);
      if (isNaN(startDate) || isNaN(endDate)) {
        throw new Error("Invalid start or end date format");
      }

      const startOnly = startDate.toISOString().split('T')[0];
      const endOnly = endDate.toISOString().split('T')[0];

      const [rangeRows] = await db.query(
        `SELECT * FROM block_data WHERE \`reportDate\` BETWEEN ? AND ?`,
        [startOnly, endOnly]
      );

      rows = rangeRows;
      info = { start: startOnly, end: endOnly };

    } else {
      // Case 2: Single date (end or default to today)
      const selectedDate = end || new Date().toISOString().split('T')[0];

      const parsedDate = new Date(selectedDate);
      if (isNaN(parsedDate)) {
        throw new Error("Invalid date format");
      }

      const cleanDate = parsedDate.toISOString().split('T')[0];

      const [dateRows] = await db.query(
        `SELECT * FROM block_data WHERE \`reportDate\` = ?`,
        [cleanDate]
      );

      rows = dateRows;
      info = { date: cleanDate };
    }

    return {
      status: "ok",
      ...info,
      data: structureData(rows),
    };

  } catch (error) {
    console.error("Error in getBlockDataByDateService:", error);
    return {
      status: "error",
      message: error.message,
    };
  }
};
