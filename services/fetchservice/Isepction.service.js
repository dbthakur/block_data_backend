import { db } from "../../db/dbConnect.js";

console.log("Came in service11111");
export const getTinsepctionService = async () => {
  try {
    // console.log("Came in service");

    const query = `SELECT * FROM t_inspection_note ORDER BY ins_date DESC`;
    const [rows] = await db.query(query); // No need for an empty array

    // console.log("Rows in service:", rows);

    return rows;
  
  } catch (error) {
    console.error("Error in getTinsepctionService:", error);
    throw error;
  }
};

export const getMaxInsDateService = async () => {
  try {
    // console.log("Came in service");



    const query = `SELECT id,max(ins_date) as max_ins_date,stations FROM t_inspection_note group by stations`;
    const [rows] = await db.query(query); // No need for an empty array

    // console.log("Rows in service:", rows);

    return rows;
  
  } catch (error) {
    console.error("Error in getMaxInsDateService:", error);
    throw error;
  }
};

