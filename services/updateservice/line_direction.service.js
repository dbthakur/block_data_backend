import { db } from '../../db/dbConnect.js';

export const updateLineDirectionService = async ({ line_id, station_id, line, location_from, location_to }) => {
  try {
    const fields = [];
    const values = [];

    if (station_id !== undefined) {
      fields.push("station_id = ?");
      values.push(station_id);
    }

    if (line !== undefined) {
      fields.push("line = ?");
      values.push(line);
    }

    if (location_from !== undefined) {
      fields.push("location_from = ?");
      values.push(location_from);
    }

    if (location_to !== undefined) {
      fields.push("location_to = ?");
      values.push(location_to);
    }

    if (fields.length === 0) {
      throw new Error("No fields to update");
    }

    // Add WHERE clause value separately
    const whereClauseValue = line_id;
    const sql = `UPDATE line_direction SET ${fields.join(", ")} WHERE line_id = ?`;

    values.push(whereClauseValue); // Add WHERE clause value to the end

    const [result] = await db.query(sql, values);
    return result;
  } catch (error) {
    console.error("Error in Service:", error);
    throw new Error(error.message);
  }
};
