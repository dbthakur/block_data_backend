import { db } from '../../db/dbConnect.js';

export const deleteStationDataService = async (station_id) => {
  try {
    const sql = `
      DELETE FROM station_code
      WHERE station_id = ?
    `;
    const [result] = await db.query(sql, [station_id]);
    return result;
  } catch (error) {
    console.error("Error in deleteStationDataService:", error);
    throw new Error(error.message);
  }
};
