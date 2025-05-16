import { db } from "../../db/dbConnect.js";

export const getStationCodeServices= async () => {
  try {
    

    const query = `SELECT 
    sc.station_id,
    sc.station_name,
    sc.station_code,
    sc.section_name,
    sc.division_id,
    ld.line_id,
    ld.line,
    ld.location_from,
    ld.location_to
FROM 
    station_code sc
INNER JOIN 
    line_direction ld ON sc.station_id = ld.station_id
ORDER BY 
    sc.station_id, ld.line_id;`;
    // const query = `SELECT * FROM station_code WHERE station_code = ?`;
    const [rows] = await db.query(query);
    return rows;
  } catch(error) {
    console.error("Error in getStationCode:", error);
    throw error;
  }   };    