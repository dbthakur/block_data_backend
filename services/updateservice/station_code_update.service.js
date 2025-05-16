

import { db } from '../../db/dbConnect.js';

export const updateStationCodeService = async ({ station_id, division_id, station_name, station_code, section_name }) => {
  try {
    const fields = [];
    const values = [];

    if (division_id !== undefined) {
      fields.push("division_id = ?");
      values.push(division_id);
    }

    if (station_name !== undefined) {
      fields.push("station_name = ?");
      values.push(station_name);
    }

    if (station_code !== undefined) {
      fields.push("station_code = ?");
      values.push(station_code);
    }

    if (section_name !== undefined) {
      fields.push("section_name = ?");
      values.push(section_name);
    }

    if (fields.length === 0) {
      throw new Error("No fields to update");
    }

    values.push(station_id); // for WHERE clause

    const sql = `UPDATE station_code SET ${fields.join(", ")} WHERE station_id = ?`;

    const [result] = await db.query(sql, values);
    return result;
  } catch (error) {
    console.error("Error in Service:", error);
    throw new Error(error.message);
  }
};
