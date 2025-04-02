
import { db } from "../../db/dbConnect.js"; // Import your MySQL connection

export const postInspectionNoteService = async (inspections) => {
    try {
   
        const values = inspections.map(({ stations, inspectedbys, designations, depart_id, deficiency, subDeficiency, description, remark, login_user, login_user_desg, login_user_posting }) => 
            `('${stations}', '${inspectedbys}', '${designations}', '${depart_id}', '${deficiency}', '${subDeficiency}', '${description}', '${remark}', 'Pending', '', '0000-00-00', '${login_user}', '${login_user_desg}', '${login_user_posting}')`
        ).join(",");
        // console.log("Received Data in Service from ins services:", values);

        const query = `INSERT INTO t_inspection_note (stations, inspectedbys, designations, depart_id, deficiencys, subdeficiencys, descriptions, remark, compliance, compliance_remark, complaint_solving_date, login_user, login_user_desg, login_user_posting) VALUES ${values}`;
        
        const [result] = await db.execute(query);

        return result;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};

