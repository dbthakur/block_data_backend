import { db } from '../../db/dbConnect.js';

export const deleteDivisionDataService = async (division_id) => {
  try {
    const sql = `
      DELETE FROM division
      WHERE division_id = ?
    `;
    const [result] = await db.query(sql, [division_id]);
    return result;
  } catch (error) {
    console.error("Error in deletedivisionDataService:", error);
    throw new Error(error.message);
  }
};
