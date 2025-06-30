import { getblockdataService,getblockdataReportFor30DaysService,getblockdataReportForGroupWiseService } from "../../services/fetchservice/block_data.service.js";

export const getBlockDataController = async (req, res) => {
  try

{
        console.log("req.params:", req.params);
        console.log("req.query:", req.query);

        // Get the value from query params (dose not redeclare as const)
        const finYearFromQuery = req.query.fin_yr_array;
        
        // Convert to array format needed by service
        const fin_yr_array = finYearFromQuery ? [finYearFromQuery] : [];
        
        console.log("Years being queried:", fin_yr_array);

        const { status, groupedData, yearsArray } = await getblockdataService(fin_yr_array);
        
        if (status === "ok") {
            return res.status(200).json({ status: "ok", groupedData, yearsArray });
        } 
        return res.status(500).json({ status: "error", message: "Failed to fetch data" });
        
    }
 catch (error) {
        console.error("Error fetching community wise data:", error);
        return res.status(500).json({ status: "error", message: "Internal server error" });
    }
}

export const getBlockDataReportFor30DaysController = async (req, res) => {
    try {
        const inputDateStr = req.query.date; 
        // if (!inputDateStr) {
        //     return res.status(400).json({ status: "error", message: "Date parameter is required" });
        // }

        const { status, ...data } = await getblockdataReportFor30DaysService(inputDateStr);
        
        if (status === "ok") {
            return res.status(200).json({ status: "ok", ...data });
        }
        return res.status(500).json({ status: "error", message: "Failed to fetch data" });
        
    } catch (error) {
        console.error("Error fetching block data report for 30 days:", error);
        return res.status(500).json({ status: "error", message: "Internal server error" });
    }
}

export const getblockdataReportForGroupWiseController = async (req, res) => {
  try {
    const inputDateStr = req.query.date;

    const { status, ...data } = await getblockdataReportForGroupWiseService(inputDateStr);
    
    if (status === "ok") {
      return res.status(200).json({ status: "ok", ...data });
    }
    return res.status(500).json({ status: "error", message: "Failed to fetch data" });
    
  } catch (error) {
    console.error("Error fetching block data report for 30 days:", error);
    return res.status(500).json({ status: "error", message: "Internal server error" });
  }
}
