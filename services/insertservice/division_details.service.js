
import { db } from "../../db/dbConnect.js"; 

export const postDivisionDetailsServices = async (divisions) => {
    try {
       
   
        const values = divisions.map(({division_name,zone_id }) => 
            `('${division_name}','${zone_id}')`
        ).join(",");
       

        const query = `INSERT INTO division (division_name,zone_id) VALUES ${values}`;
    
        const [result] = await db.execute(query);

        return result;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};
