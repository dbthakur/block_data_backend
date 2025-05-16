import { db } from "../../db/dbConnect.js";

export const updateBlockDataService = async (data) => {
  try {
    const { Sno, ...fieldsToUpdate } = data;

    if (!Sno) {
      throw new Error("Primary key 'Sno' is required for update.");
    }

    const keys = Object.keys(fieldsToUpdate);
    if (keys.length === 0) {
      throw new Error("No fields provided for update.");
    }

    const setClause = keys.map(key => `\`${key}\` = ?`).join(", ");
    const values = keys.map(key => fieldsToUpdate[key]);

    const query = `UPDATE block_data SET ${setClause} WHERE Sno = ?`;
    values.push(Sno); // Append Sno for WHERE clause

    const [result] = await db.execute(query, values);
    return result;
  } catch (error) {
    throw new Error("Database update error: " + error.message);
  }
};
