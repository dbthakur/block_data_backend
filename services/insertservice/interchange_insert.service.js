import { db } from "../../db/dbConnect.js";

export const insertINTERCHANGE = async (dataArray) => {
  if (!Array.isArray(dataArray) || dataArray.length === 0) {
    throw new Error("Invalid data format");
  }

  // Extract unique IC_DATE values from dataArray to check for duplicates
  const icDates = [...new Set(dataArray.map(row => row.IC_DATE))];
  // const icDates = [...new Set(dataArray.map(row => row.IC_DATE ? row.IC_DATE.trim() : null))].filter(Boolean);


  // Check for existing IC_DATE in the database
  const placeholders = icDates.map(() => "?").join(", ");
  const checkQuery = `SELECT IC_DATE FROM t_interchange WHERE IC_DATE IN (${placeholders})`;
  const [existingRecords] = await db.execute(checkQuery, icDates);

  console.log("icdate",icDates)
  if (existingRecords.length > 0) {
    throw new Error("Duplicate IC_DATE found");
  }

  const query = `
    INSERT INTO t_interchange 
    (IC_DATE, WGN_TO, WGN_HO, WGN_TRSN, TRAIN_TO, TRAIN_HO, TRAIN_TRSN, T_FC, FC_FAIL, WTR, DWB, LDG, UNLDG, AVG_SPEED, SPEED_Exclud_Stable, SPEED_Includ_Stable, BCN_HOLDING, E_BCN_HOLDING, L_BCN_HOLDING, BOXN_HOLDING, E_BOXN_HOLDING, L_BOXN_HOLDING, LDD_RECD, EFF_DWB, SICK, ROH, POH, DEPT, TOTAL_INEF)
    VALUES ${dataArray
      .map(() => "(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)").join(", ")}`;

  const values = dataArray.flatMap(row => [
    row.IC_DATE || null,
    row.WGN_TO || 0,
    row.WGN_HO || 0,
    row.WGN_TRSN || 0,
    row.TRAIN_TO || 0,
    row.TRAIN_HO || 0,
    row.TRAIN_TRSN || 0,
    row.T_FC || 0,
    row.FC_FAIL || 0,
    row.WTR || 0,
    row.DWB || 0,
    row.LDG || 0,
    row.UNLDG || 0,
    row.AVG_SPEED || 0,
    row.SPEED_Exclud_Stable || 0,
    row.SPEED_Includ_Stable || 0,
    row.BCN_HOLDING || 0,
    row.E_BCN_HOLDING || 0,
    row.L_BCN_HOLDING || 0,
    row.BOXN_HOLDING || 0,
    row.E_BOXN_HOLDING || 0,
    row.L_BOXN_HOLDING || 0,
    row.LDD_RECD || 0,
    row.EFF_DWB || 0,
    row.SICK || 0,
    row.ROH || 0,
    row.POH || 0,
    row.DEPT || 0,
    row.TOTAL_INEF || 0,
  ]);

  try {
    const [result] = await db.execute(query, values);
    console.log("Insert Successful, Rows Affected:", result.affectedRows);
    return result;
  } catch (error) {
    console.error("Database Insert Error:", error);
    throw new Error("Database error while inserting data");
  }
};
