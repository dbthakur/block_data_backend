import { db } from '../../db/dbConnect.js';

export const postInspectionNoteService = async (inspection_note) => {
  try {
    const sql = `
      INSERT INTO t_inspection_note 
      (stations, inspectedbys, designations, depart_id, deficiencys, subdeficiencys, descriptions, remark, compliance, compliance_remark, complaint_solving_date, login_user, login_user_desg, login_user_posting)
      VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      inspection_note.stations,
      inspection_note.inspectedbys,
      inspection_note.designations,
      inspection_note.depart_id,
      inspection_note.deficiencys,
      inspection_note.subdeficiencys || null, // Handle empty values
      inspection_note.descriptions,
      inspection_note.remark,
      inspection_note.compliance || null,
      inspection_note.compliance_remark || null,
      inspection_note.complaint_solving_date || null,
      inspection_note.login_user,
      inspection_note.login_user_desg,
      inspection_note.login_user_posting
    ];

    const [result] = await db.query(sql, values);
    return result;
  } catch (error) {
    console.error("Error in Service:", error);
    throw new Error(error.message);
  }
};
