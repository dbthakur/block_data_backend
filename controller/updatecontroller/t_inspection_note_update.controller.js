
import { updateInspectionNoteService } from "../../services/updateservice/t_inspection_note_update.service.js";

export const updateInspectionNoteController = async (req, res) => { 
    try {
      const { compliance_remark, id } = req.body;

      console.log("Received Data:", req.body);
  
      if (!id) {
        return res.status(400).json({ message: "ID is required" });
      }
  
      console.log("Updating ID:", id);
  
      const result = await updateInspectionNoteService({compliance_remark, id });
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "No record found with this ID" });
      }
  
      res.status(200).json({ message: "Inspection Note updated successfully", data: result });
    } catch (error) {
      console.error("Error in Controller:", error);
      res.status(500).json({ message: error.message });
    }
  };
  