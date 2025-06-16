import { getFinancialYearBlockDataService } from "../../services/fetchservice/blockdata_financial.service.js";

export const getFinancialYearDataController = async (req, res) => {
  try {
    const { date } = req.query;
    
    if (!date) {
      return res.status(400).json({ 
        status: "error", 
        message: "Date parameter is required (YYYY-MM-DD format)" 
      });
    }

    const result = await getFinancialYearBlockDataService(date);
    
    return res.status(result.status === "ok" ? 200 : 500).json(result);

  } catch (error) {
    console.error("Error in historical data controller:", error);
    return res.status(500).json({ 
      status: "error", 
      message: "Internal server error" 
    });
  }
};