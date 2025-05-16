
import { updateBlockDataService } from "../../services/updateservice/block_data.service.js";

export const updateBlockDataController = async (req, res) => {
  try {
    const data = req.body;

    if (!data || typeof data !== "object" || Array.isArray(data)) {
      return res.status(400).json({ status: "error", message: "Invalid JSON body" });
    }

    const result = await updateBlockDataService(data);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: "error",
        message: `No record found with Sno=${data.Sno}`
      });
    }

    res.status(200).json({
      status: "ok",
      message: `Row with Sno=${data.Sno} updated successfully`,
      affectedRows: result.affectedRows
    });
  } catch (error) {
    console.error("Controller Error:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
};
