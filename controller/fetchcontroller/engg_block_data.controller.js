import { getEnggBlockDataService } from "../../services/fetchservice/engg_block_data.service.js";
export const getEnggBlockDataController = async (req, res) => {
  try {
    
    const result = await getEnggBlockDataService(req, res);
    res.json({ status: "ok", data: result });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};