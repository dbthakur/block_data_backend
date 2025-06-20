import { updateBlockDataService } from "../../services/updateservice/block_data.service.js";

export const updateBlockDataController = async (req, res) => {
  try {
    const dataArray = req.body;
    if (!Array.isArray(dataArray) || dataArray.length === 0) {
      return res.status(400).json({ status: "error", message: "Request body must be a non-empty array of objects." });
    }

    const results = await updateBlockDataService(dataArray);

    const successCount = results.filter(r => r.status === "success").length;
    const notFoundCount = results.filter(r => r.status === "not_found").length;
    const errorCount = results.filter(r => r.status === "error").length;

    res.status(200).json({
      status: "ok",
      summary: {
        total: results.length,
        successCount,
        notFoundCount,
        errorCount
      },
      details: results
    });
  } catch (error) {
    console.error("Controller Error:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
};
