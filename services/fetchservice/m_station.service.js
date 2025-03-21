import { db } from "../../db/dbConnect.js";

console.log("Came in service11111");
export const getMStationService = async () => {
  try {
    console.log("Came in service");

    const query = `SELECT * FROM m_station`;
    const [rows] = await db.query(query); // No need for an empty array

    return rows;
  
  } catch (error) {
    console.error("Error in getMStationService:", error);
    throw error;
  }
};
