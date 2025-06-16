import { db } from "../../db/dbConnect.js";
import { groupByLevels } from "../../utils/groupByLevels.js";

export const getstationDataFilteredService = async () => {
  try {
    




   const query = `SELECT 
    sc.station_id,
    sc.station_name,
    sc.station_code,
    sc.section_name,
    sc.division_id,
    d.division_name,
    d.zone_id,
    ld.line_id,
    ld.line,
    ld.location_from,
    ld.location_to
FROM 
    station_code sc
INNER JOIN 
    line_direction ld ON sc.station_id = ld.station_id
INNER JOIN 
    division d ON sc.division_id = d.division_id`;

  
  

    

    
     const StationData = await db.query(query);
      query.map(async stationdata => {
        
        
       
        return {
          stationdata: stationdata,
          data: groupByLevels( ['section_name', 'station_name'])
        };
      })
    ;

    return {
      status: "ok",
        stationData: StationData
    };

  } catch (error) {
    console.error("Error in staton data DataService:", error);
    return {
      status: "error",
      message: error.message
    };
  }
};

