
import { db } from "../../db/dbConnect.js";
import { groupByLevelsWithAllData } from "../../utils/groupByLevelWithAllData.js";

export const getBlockDataByDateService = async (query) => {
  try {
    const { start, end } = query;
    let selectedDate;
    let currentRows = [];
    let monthRows = [];

    const levels = ['section', 'Department', 'Direction'];
    const structureData = (rows) => groupByLevelsWithAllData(rows, levels);

    if (start && end) {
      // When range is given, take 'end' as current date for currentData
      const startDate = new Date(start);
      const endDate = new Date(end);
      if (isNaN(startDate) || isNaN(endDate)) {
        throw new Error("Invalid start or end date format");
      }

      const startOnly = startDate.toISOString().split('T')[0];
      const endOnly = endDate.toISOString().split('T')[0];

      selectedDate = endOnly;

      const [rangeData] = await db.query(
        `SELECT * FROM block_data WHERE reportDate BETWEEN ? AND ?`,
        [startOnly, endOnly]
      );
      currentRows = rangeData;
    } else {
      // No range: use end or today as selectedDate
      selectedDate = end || new Date().toISOString().split('T')[0];
      const parsedDate = new Date(selectedDate);
      if (isNaN(parsedDate)) throw new Error("Invalid date format");

      selectedDate = parsedDate.toISOString().split('T')[0];

      const [dateRows] = await db.query(
        `SELECT * FROM block_data WHERE reportDate = ?`,
        [selectedDate]
      );
      currentRows = dateRows;
    }

    // Fetch data for the full month of selectedDate
    const month = selectedDate.slice(0, 7); // "YYYY-MM"
    const [monthData] = await db.query(
      `SELECT * FROM block_data WHERE DATE_FORMAT(reportDate, '%Y-%m') = ?`,
      [month]
    );
    monthRows = monthData;

    return {
      status: "ok",
      currentDate: {
        date: selectedDate,
        data: structureData(currentRows),
      },
      monthData: {
        month: month,
        data: structureData(monthRows),
      },
    };

  } catch (error) {
    console.error("Error in getBlockDataByDateService:", error);
    return {
      status: "error",
      message: error.message,
    };
  }
};
