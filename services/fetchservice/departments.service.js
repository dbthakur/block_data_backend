import {db} from "../../db/dbConnect.js";

export const getDepartmentService = async () => {
  try {
    console.log("Came in service");

    const query = `SELECT * FROM departments`;
    const [rows] = await db.query(query); 

    return rows;
  } catch (error) { 
    console.error("Error in getDepartmentService:", error);
    throw error;
  }
};