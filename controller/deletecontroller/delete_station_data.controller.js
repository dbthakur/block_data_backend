import { deleteStationDataService } from "../../services/deleteService/delete_station_data.service.js";

export const deleteStationDataController = async (req, res) => {
  try {
    const station_id = req.params.id;

    if (!station_id) {
      return res.status(400).json({ message: "Station ID is required" });
    }

    const result = await deleteStationDataService(station_id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "No station found with the given ID" });
    }

    res.status(200).json({
      message: "Station Data deleted successfully",
      deletedStationId: station_id,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
