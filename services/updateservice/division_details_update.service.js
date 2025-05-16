

import { db } from '../../db/dbConnect.js';

export const updateDivisionDetailsService = async ({division_id,division_name,zone_id}) => {
  try {
    const fields = [];
    const values = [];

    
    if (division_name !== undefined) {
      fields.push("division_name = ?");
      values.push(division_name);
    }

    if (zone_id !== undefined) {
      fields.push("zone_id = ?");
      values.push(zone_id);
    }

    
    if (fields.length === 0) {
      throw new Error("No fields to update");
    }

    values.push(division_id); // for WHERE clause

    const sql = `UPDATE division SET ${fields.join(", ")} WHERE division_id = ?`;

    const [result] = await db.query(sql, values);
    return result;
  } catch (error) {
    console.error("Error in Service:", error);
    throw new Error(error.message);
  }
};
