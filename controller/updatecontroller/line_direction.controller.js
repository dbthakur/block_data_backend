
  
import { updateLineDirectionService } from "../../services/updateservice/line_direction.service.js";

export const updateLineDirectionController = async (req, res) => { 
  try {
    const { line_id,station_id,line,location_from,location_to } = req.body;

    if (!line_id) {
      return res.status(400).json({ message: "line_id is required" });
    }

    if (!line_id && !station_id && !line && !location_from && !location_to) {
      return res.status(400).json({ message: "At least one field to update must be provided" });
    }

    const result = await updateLineDirectionService({ line_id,station_id,line,location_from,location_to});

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "No record found with this ID" });
    }

    res.status(200).json({ message: "line direction data updated successfully", data: result });
  } catch (error) {
    console.error("Error in Controller:", error);
    res.status(500).json({ message: error.message });
  }
};
