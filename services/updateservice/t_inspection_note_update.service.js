import {db} from '../../db/dbConnect.js';

export const updateInspectionNoteService = async (inspection_note) => {
  try {
    const sql = `
      UPDATE t_inspection_note 
      SET  compliance = ?, compliance_remark = ?, complaint_solving_date = ?
      WHERE id = ? `;

    const values = [
       'Completed',
      inspection_note.compliance_remark || null,
      new Date().toISOString().slice(0, 19).replace("T", " "),
      inspection_note.id || null
    ];

    const [result] = await db.query(sql, values);
    return result;
  } catch (error) {
    console.error("Error in Service:", error);
    throw new Error(error.message);
  }
}