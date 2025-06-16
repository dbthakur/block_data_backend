import { getBlockDataByDateService } from "../../services/fetchservice/blockdata_datewise.service.js";

export const getBlockDataByDateController = async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) {
      return res.status(400).json({ status: "error", message: "Date parameter is required" });
    }

    const result = await getBlockDataByDateService(date);
    return res.status(result.status === "ok" ? 200 : 500).json(result);

  } catch (error) {
    console.error("Error fetching data by date:", error);
    return res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
