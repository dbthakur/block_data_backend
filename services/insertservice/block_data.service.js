
import { db } from "../../db/dbConnect.js";
export const postBlockDataService = async (blockDataArray) => {
  try {
    const columns = [
      "reportDate", "Direction", "section", "From_Station", "To_Station",
      "Section_Yard", "Corridore", "Department", "Type", "Block_Type",
      "No_Of_Demand_By_Engg", "No_Of_Demand_Agreed_GIVEN", "Agreed_Demand",
      "Engg_Demand", "GrantedFrom", "GrantedTo", "Availed_Duration",
      "Availed_From", "Availed_To", "Availed", "Rated_Output", "Actual_Output",
      "Granted_Not", "Availed_Not", "Burst", "Burst_Duration", "Remarks",
       "F_Year", "Month", "a_month", "s_month",
      "Count"];
    const values = blockDataArray.map(entry => {
      const row = columns.map(col => entry[col] ?? null); // handle missing fields
      return `(${row.map(val => db.escape(val)).join(", ")})`;
    }).join(", ");


    // console.log("Inserting block data with values:", values);
    const query = `INSERT INTO block_data (${columns.join(", ")}) VALUES ${values}`;
    const [result] = await db.execute(query);
    return result;
  } catch (error) {
    throw new Error("Database error: " + error.message);

  }
};
