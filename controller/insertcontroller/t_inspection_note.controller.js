
import { postInspectionNoteService } from "../../services/insertservice/t_inspection_note.service.js";

export const postInspectionNoteController = async (req, res) => {
    try {
        const inspections = Array.isArray(req.body) ? req.body : [req.body]; // Ensure it's an array

        for (const inspection of inspections) {
            const { ins_id,stations, inspectedbys, designations, depart_id } = inspection;

            if (!stations || !inspectedbys || !designations || !depart_id) {
                return res.status(400).json({ message: "Required fields are missing in one or more entries" });
            }
        }

        // **Batch Insert in a Single Call**
        const result = await postInspectionNoteService(inspections);

        res.status(201).json({ 
            status:"ok",
            message: "Inspection Notes inserted successfully", 
            data: req.body
        });
    } catch (error) {
        console.error("Error in Controller:", error);
        res.status(500).json({ message: error.message,data:req.body });
    }
};
