import { db } from "../../db/dbConnect.js";

export const deleteBlockDataService = async (sno) => {
  try {
    const query = `DELETE FROM block_data WHERE sno = ?`;
    const [result] = await db.query(query, [sno]); // Use parameterized query to prevent SQL injection
    return result;
  } catch (error) {
    console.error("Error in deleteBlockDataService:", error);
    throw new Error("Database error: " + error.message);
  }
};
