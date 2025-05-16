import { db } from "../../db/dbConnect.js";

export const getBlockDataService = async (date) => {
  try {
    const query = `SELECT * FROM block_data WHERE \`date\` = ?`;
    const [rows] = await db.query(query, [date]); // Pass the date parameter here

    return rows;
  } catch (error) {
    console.error("Error in block data:", error);
    throw error;
  }
};
