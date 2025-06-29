
import { getBlockData1Service } from "../../services/fetchservice/block_data_filter.service.js";




export const getBlockData1Controller = async (req, res) => {
  try {
    const {
      date,
     
    

    } = req.query;

//     const page = req.query.page || 1;
// const limit = req.query.limit || 50;

    if (!date) {
      return res.status(400).json({ error: "Date parameter is required." });
    }

    const data = await getBlockData1Service(req.query.date, /*page, limit */);
 
 
    res.status(200).json({
      status: "ok",
      data   });

    
  } catch (error) {
    console.error("Controller Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
