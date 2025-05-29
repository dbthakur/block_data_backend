
import { getBlockDataService } from "../../services/fetchservice/block_data.service.js";




export const getBlockDataController = async (req, res) => {
  try {
    const {
      date,
     
    

    } = req.query;

    const page = req.query.page || 1;
const limit = req.query.limit || 50;

    if (!date) {
      return res.status(400).json({ error: "Date parameter is required." });
    }

    const data = await getBlockDataService(req.query.date, page, limit);
 
 
    res.status(200).json({
      status: "ok",
      data   });

    
  } catch (error) {
    console.error("Controller Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
