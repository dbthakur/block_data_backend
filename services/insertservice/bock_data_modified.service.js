import { db } from "../../db/dbConnect.js";

export const getStationIdByName = async (stationName) => {
  const [rows] = await db.query(
    "SELECT station_id FROM station_code WHERE station_name = ?", 
    [stationName]
  );
  if (rows.length === 0) throw new Error(`Station "${stationName}" not found`);
  return rows[0].station_id;
};

export const getLineIdByName = async (lineName) => {
  const [rows] = await db.query(
    "SELECT line_id FROM line_direction WHERE line = ?", 
    [lineName]
  );
  if (rows.length === 0) throw new Error(`Line "${lineName}" not found`);
  return rows[0].line_id;
};

export const postBlockDataModifiedService = async (blockDataArray) => {
  const sql = `
    INSERT INTO block_data_
    (Date, line_id, To_Station_ID, Corridore, Department_ID, Type, Block_Type, 
     No_Of_Demand_By_Engg, Demand_Duration, Agreed_Demand_modified, No_Of_Demand_Agreed_GIVEN, 
     Demand_Duration_Permitted_by_OPTG, GrantedFrom, GrantedTo, Availed_Duration, 
     Availed_From, Availed_To, Availed, Remarks, Mail_Ex_Detention, Mail_Detention_Time, Goods_Detention)
    VALUES ?
  `;

  const values = await Promise.all(
    blockDataArray.map(async (entry) => {
      const to_station_id = await getStationIdByName(entry.station_name);
      const line_id = await getLineIdByName(entry.line);

      return [
        entry.Date, 
        line_id, 
        to_station_id, 
        entry.Corridore, 
        entry.Department_ID, 
        entry.Type, 
        entry.Block_Type,
        entry.No_Of_Demand_By_Engg, 
        entry.Demand_Duration, 
        entry.Agreed_Demand_modified, 
        entry.No_Of_Demand_Agreed_GIVEN,
        entry.Demand_Duration_Permitted_by_OPTG, 
        entry.GrantedFrom, 
        entry.GrantedTo, 
        entry.Availed_Duration,
        entry.Availed_From, 
        entry.Availed_To, 
        entry.Availed, 
        entry.Remarks, 
        entry.Mail_Ex_Detention,
        entry.Mail_Detention_Time, 
        entry.Goods_Detention
      ];
    })
  );

  const [result] = await db.query(sql, [values]);
  return result;
};