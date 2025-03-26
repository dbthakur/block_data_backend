import {db} from '../../db/dbConnect.js';
export const getInspectedByService = async () => {
    try {
      console.log("Came in service");
  
      const query = `SELECT * FROM  inspected_by`;
      const [rows] = await db.query(query);
      return {status:"ok",rows};
    } catch(error) {
      console.error("Error in getInspectedByService:", error);
      throw error;
    }   };    