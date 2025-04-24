import { db } from "../../db/dbConnect.js";

console.log("Came in service11111");
export const getTinsepctionService = async () => {
  try {
    // console.log("Came in service");

    const query = `SELECT * FROM t_inspection_note`;
    const [rows] = await db.query(query); // No need for an empty array

    // console.log("Rows in service:", rows);

    return rows;
  
  } catch (error) {
    console.error("Error in getTinsepctionService:", error);
    throw error;
  }
};

export const getMaxInsDateService = async (st) => {
  try {
    // console.log("Came in service");



    const query = `SELECT max(ins_date) as max_ins_date FROM t_inspection_note WHERE stations="${st}" `;
    const [rows] = await db.query(query); // No need for an empty array

    // console.log("Rows in service:", rows);

    return rows;
  
  } catch (error) {
    console.error("Error in getMaxInsDateService:", error);
    throw error;
  }
};

