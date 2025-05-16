
  
import { updateStationCodeService } from "../../services/updateservice/station_code_update.service.js";

export const updateStationCodeController = async (req, res) => { 
  try {
    const { station_id, division_id, station_name, station_code, section_name } = req.body;

    if (!station_id) {
      return res.status(400).json({ message: "station_id is required" });
    }

    if (!division_id && !station_name && !station_code && !section_name) {
      return res.status(400).json({ message: "At least one field to update must be provided" });
    }

    const result = await updateStationCodeService({ station_id, division_id, station_name, station_code, section_name });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "No record found with this ID" });
    }

    res.status(200).json({ message: "Station data updated successfully", data: result });
  } catch (error) {
    console.error("Error in Controller:", error);
    res.status(500).json({ message: error.message });
  }
};
