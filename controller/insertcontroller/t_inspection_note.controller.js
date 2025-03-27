
import { postInspectionNoteService } from "../../services/insertservice/t_inspection_note.service.js";

export const postInspectionNoteController = async (req, res) => {
    try {
        // console.log("Received Data:", req.body);

        // Ensure required fields are provided
        const {
            stations,
            inspectedbys,
            designations,
            depart_id,
            deficiencys,
            subdeficiencys,
            descriptions,
            remark,
            compliance,
            compliance_remark,
            complaint_solving_date,
            login_user,
            login_user_desg,
            login_user_posting
        } = req.body;

        if (!stations || !inspectedbys || !designations || !depart_id) {
            return res.status(400).json({ message: "Required fields are missing" });
        }

        // Call Service Layer
        const result = await postInspectionNoteService(req.body);

        res.status(201).json({ message: "Inspection Note inserted successfully", data: result });
    } catch (error) {
        console.error("Error in Controller:", error);
        res.status(500).json({ message: error.message });
    }
};
