
import { db } from "../../db/dbConnect.js";

export const updateBlockDataService = async (dataArray) => {
  const results = [];

  for (const data of dataArray) {
    try {
      const { Sno, ...fieldsToUpdate } = data;
      if (!Sno) throw new Error("Primary key 'Sno' is required for update.");
      const keys = Object.keys(fieldsToUpdate);
      if (keys.length === 0) throw new Error("No fields provided for update.");

      const setClause = keys.map((key) => `\`${key}\` = ?`).join(", ");
      const values = keys.map((key) => fieldsToUpdate[key]);
      const query = `UPDATE block_data SET ${setClause} WHERE Sno = ?`;
      values.push(Sno);

      const [result] = await db.execute(query, values);

      results.push({
        Sno,
        status: result.affectedRows ? "success" : "not_found",
        affectedRows: result.affectedRows,
      });
    } catch (error) {
      results.push({ Sno: data?.Sno || null, status: "error", message: error.message });
    }
  }

  return results;
};
