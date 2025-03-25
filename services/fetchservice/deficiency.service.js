import { db } from "../../db/dbConnect.js";

export const getDeficiencyServices= async () => {
  try {
    console.log("Came in service");

    const query = `SELECT * FROM deficiency`;
    const [rows] = await db.query(query);
    return rows;
  } catch(error) {
    console.error("Error in getDeficiencyServices:", error);
    throw error;
  }   };    