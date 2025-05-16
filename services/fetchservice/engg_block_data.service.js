import {db} from "../../db/dbConnect.js";

export const getEnggBlockDataService = async () => {
  try {
    

    const query = `SELECT * FROM engg_block_data`;
    const [rows] = await db.query(query); 

    return rows;
  } catch (error) { 
    console.error("Error in block data:", error);
    throw error;
  }
};