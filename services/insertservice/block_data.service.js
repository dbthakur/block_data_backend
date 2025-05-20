import { db } from "../../db/dbConnect.js";

export const postBlockDataService = async (blockDataArray) => {
  try {
    const columns = [
      "Sno", "Date", "Direction", "Section", "From_Station", "To_Station",
      "Section_Yard", "Corridore", "Department", "Type", "Block_Type",
      "No_Of_Demand_By_Engg", "No_Of_Demand_Agreed_GIVEN", "Agreed_Demand",
      "Engg_Demand", "GrantedFrom", "GrantedTo", "Availed_Duration",
      "Availed_From", "Availed_To", "Availed", "Rated_Output", "Actual_Output",
      "Granted_Not", "Availed_Not", "Burst_Not", "Burst_Duration", "Remarks",
      "Repurcussion_No_Of_MExp", "No_Of_MExp_Detention", "No_Of_Goods",
      "No_Of_Goods_Detention", "F_Year", "Month", "a_month", "s_month",
      "count"
    ];

    const values = blockDataArray.map(entry => {
      const row = columns.map(col => entry[col] ?? null); // handle missing fields
      return `(${row.map(val => db.escape(val)).join(", ")})`;
    }).join(", ");

    const query = `INSERT INTO block_data (${columns.join(", ")}) VALUES ${values}`;
    const [result] = await db.execute(query);
    return result;
  } catch (error) {
    throw new Error("Database error: " + error.message);
  }
};
