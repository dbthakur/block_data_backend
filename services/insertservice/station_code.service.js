import { db } from "../../db/dbConnect.js"; 

export const postStationCodeServices = async (stations) => {
    try {
       
   
        const values = stations.map(({division_id,station_name,station_code, section_name}) => 
            `('${division_id}','${station_name}','${station_code}','${section_name}')`
        ).join(",");
        

        const query = `INSERT INTO station_code (division_id,station_name,station_code,section_name) VALUES ${values}`;
    
        const [result] = await db.execute(query);

        return result;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};
