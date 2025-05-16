import { db } from "../../db/dbConnect.js"; 

export const postLineDirectionService = async (directions) => {
    try {
       
   
        const values = directions.map(({station_id,line,location_from,location_to}) => 
            `('${station_id}','${line}','${location_from}','${location_to}')`
        ).join(",");
       

        const query = `INSERT INTO  line_direction (station_id,line,location_from,location_to) VALUES ${values}`;
    
        const [result] = await db.execute(query);

        return result;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};
