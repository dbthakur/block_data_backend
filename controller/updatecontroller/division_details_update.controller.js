
  
import {updateDivisionDetailsService} from "../../services/updateservice/division_details_update.service.js";
export const updateDivisionDetailsController = async (req, res) => { 
  try {
    const { division_id, division_name,zone_id } = req.body;

    if (!division_id) {
      return res.status(400).json({ message: "division_id is required" });
    }

    if (!division_id && !division_name && !zone_id) {
      return res.status(400).json({ message: "At least one field to update must be provided" });
    }

    const result = await updateDivisionDetailsService({ division_id, division_name,zone_id });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "No record found with this ID" });
    }

    res.status(200).json({ message: "Division data updated successfully", data: result });
  } catch (error) {
    console.error("Error in Controller:", error);
    res.status(500).json({ message: error.message });
  }
};
