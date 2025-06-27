

import { db } from "../../db/dbConnect.js";

function timeDifference(time1, time2) {
  const [h1, m1, s1] = time1.split(":").map(Number);
  const [h2, m2, s2] = time2.split(":").map(Number);

  const totalSeconds1 = h1 * 3600 + m1 * 60 + s1;
  const totalSeconds2 = h2 * 3600 + m2 * 60 + s2;

  let diffSeconds = totalSeconds1 - totalSeconds2;
  if (isNaN(diffSeconds)) return null;

  // Ensure non-negative or fallback to "00:00:00"
  diffSeconds = Math.max(0, diffSeconds);

  const h = String(Math.floor(diffSeconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((diffSeconds % 3600) / 60)).padStart(2, "0");
  const s = String(diffSeconds % 60).padStart(2, "0");

  return `${h}:${m}:${s}`;
}

export const postBlockDataService = async (blockDataArray) => {
  try {
    const columns = [
      "reportDate", "Direction", "section", "From_Station", "To_Station",
      "Section_Yard", "Corridore", "Department", "Type", "Block_Type",
      "No_Of_Demand_By_Engg", "No_Of_Demand_Agreed_GIVEN", "Agreed_Demand",
      "Engg_Demand", "GrantedFrom", "GrantedTo", "Availed_Duration",
      "Availed_From", "Availed_To", "Availed", "Rated_Output", "Actual_Output",
      "Granted_Not", "Availed_Not", "Burst", "Burst_Duration", "Remarks",
      "F_Year", "Month", "a_month", "s_month", "Count",
      "Mail_Ex_Detention", "Mail_Detention_time", "Goods_Detention", "Goods_Detention_time"
    ];

    const values = blockDataArray.map(entry => {
      // Calculate Burst_Duration
      const availed = entry["Availed"];
      const availedDuration = entry["Availed_Duration"];

      let burstDuration = null;
      if (availed && availedDuration) {
        burstDuration = timeDifference(availed, availedDuration);
      }

      // Insert the computed Burst_Duration back to the entry
      entry["Burst_Duration"] = burstDuration;

      // Build row in proper column order
      const row = columns.map(col => entry[col] ?? null);
      return `(${row.map(val => db.escape(val)).join(", ")})`;
    }).join(", ");
    //  console.log("Inserting block data with values:", values);

    const query = `INSERT INTO block_data (${columns.join(", ")}) VALUES ${values}`;

     // console.log("Executing query:", query);
    const [result] = await db.execute(query);
    return result;

  } catch (error) {
    throw new Error("Database error: " + error.message);
  }
};

