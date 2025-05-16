import { deleteDivisionDataService } from "../../services/deleteService/delete_division_data.service.js";

export const deleteDivisionDataController = async (req, res) => {
  try {
    const division_id = req.params.id;

    if (!division_id) {
      return res.status(400).json({ message: "Division ID is required" });
    }

    const result = await deleteDivisionDataService(division_id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "No Division found with the given ID" });
    }

    res.status(200).json({
      message: "Division Data deleted successfully",
      "deleted division Id": division_id,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
