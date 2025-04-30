
// import { db } from "../../db/dbConnect.js"; // Import your MySQL connection

// export const postInspectionNoteService = async (inspections) => {
//     try {
   
//         const values = inspections.map(({ ins_id,stations, inspectedbys, designations, depart_id, deficiency, subDeficiency, description, remark, login_user, login_user_desg, login_user_posting }) => 
//             `('${ins_id}','${stations}', '${inspectedbys}', '${designations}', '${depart_id}', '${deficiency}', '${subDeficiency}', '${description}', '${remark}', 'Pending', '', '0000-00-00', '${login_user}', '${login_user_desg}', '${login_user_posting}')`
//         ).join(",");
//         // console.log("Received Data in Service from ins services:", values);

//         const query = `INSERT INTO t_inspection_note (ins_id,stations, inspectedbys, designations, depart_id, deficiencys, subdeficiencys, descriptions, remark, compliance, compliance_remark, complaint_solving_date, login_user, login_user_desg, login_user_posting) VALUES ${values}`;
        
//         const [result] = await db.execute(query);

//         return result;
//     } catch (error) {
//         throw new Error("Database error: " + error.message);
//     }
// };

import { db } from "../../db/dbConnect.js"; // Import your MySQL connection

export const postInspectionNoteService = async (inspections) => {
    try {
       
   
        const values = inspections.map(({ stations,date_of_inspection, inspectedbys, designations,type_of_inspection,inspector_name,employee_name, depart_id, deficiency, subDeficiency, description, remark, login_user, login_user_desg, login_user_posting }) => 
            `('${stations}','${date_of_inspection}', '${inspectedbys}', '${designations}','${type_of_inspection}', '${inspector_name}','${employee_name}','${depart_id}', '${deficiency}', '${subDeficiency}', '${description}', '${remark}', 'Pending', '', '0000-00-00', '${login_user}', '${login_user_desg}', '${login_user_posting}')`
        ).join(",");
        // console.log("Received Data in Service from ins services:", values);

        const query = `INSERT INTO t_inspection_note (stations,date_of_inspection, inspectedbys, designations,type_of_inspection,inspector_name,employee_name, depart_id, deficiencys, subdeficiencys, descriptions, remark, compliance, compliance_remark, complaint_solving_date, login_user, login_user_desg, login_user_posting) VALUES ${values}`;
    
        const [result] = await db.execute(query);

        return result;
    } catch (error) {
        throw new Error("Database error: " + error.message);
    }
};
