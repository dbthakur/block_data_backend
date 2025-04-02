// import { db } from '../../db/dbConnect.js';

// export const postInspectionNoteService = async (inspection_note) => {
//   try {
//     const sql = `
//       INSERT INTO t_inspection_note 
//       (stations, inspectedbys, designations, depart_id, deficiencys, subdeficiencys, descriptions, remark, compliance, compliance_remark, complaint_solving_date, login_user, login_user_desg, login_user_posting)
//       VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//     `;

//     const values = [
//       inspection_note.stations,
//       inspection_note.inspectedbys,
//       inspection_note.designations,
//       inspection_note.depart_id,
//       inspection_note.deficiencys,
//       inspection_note.subdeficiencys || null, 
//       inspection_note.descriptions || null,
//       inspection_note.remark || null,
//       'pending',
//       inspection_note.compliance_remark || null,
//       inspection_note.complaint_solving_date || null,
//       inspection_note.login_user || null,
//       inspection_note.login_user_desg || null,
//       inspection_note.login_user_posting || null
//     ];

//     const [result] = await db.query(sql, values);
//     return result;
//   } catch (error) {
//     console.error("Error in Service:", error);
//     throw new Error(error.message);
//   }
// };



import { db } from "../../db/dbConnect.js"; // Import your MySQL connection

export const postInspectionNoteService = async (inspections) => {
    try {
      console.log("Received Data in Service:", inspections);
        const values = inspections.map(({ stations, inspectedbys, designations, depart_id, deficiencys, subdeficiencys, descriptions, remark, compliance, compliance_remark, complaint_solving_date, login_user, login_user_desg, login_user_posting }) => 
            `('${stations}', '${inspectedbys}', '${designations}', '${depart_id}', '${deficiencys}', '${subdeficiencys}', '${descriptions}', '${remark}', '${compliance}', '${compliance_remark}', '${complaint_solving_date}', '${login_user}', '${login_user_desg}', '${login_user_posting}')`
        ).join(",");

        const query = `INSERT INTO t_inspection_note (stations, inspectedbys, designations, depart_id, deficiencys, subdeficiencys, descriptions, remark, compliance, compliance_remark, complaint_solving_date, login_user, login_user_desg, login_user_posting) VALUES ${values}`;
        
        const [result] = await db.execute(query);

        return result;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};

