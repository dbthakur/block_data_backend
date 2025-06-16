import { getstationDataFilteredService } from "../../services/fetchservice/station_filtered_data.service.js";

export const getstationDataFilteredController = async (req, res) => {
  try {
    
    
   

    const result = await getstationDataFilteredService(req, res);
    
    return res.status(result.status === "ok" ? 200 : 500).json(result);

  } catch (error) {
    console.error("Error in station data controller:", error);
    
  }
};
// import { getstationDataFilteredService } from "../../services/fetchservice/station_filtered_data.service.js";

// export const getStationDataFilteredController = async (req, res) => {
//   try {
//     const result = await getstationDataFilteredService();

//     return res.status(result.status === "ok" ? 200 : 500).json({
//       status: result.status,
//       message: result.status === "ok" ? "Success" : result.message,
//       data: result.data
//     });

//   } catch (error) {
//     console.error("Error in getStationDataFilteredController:", error.message);
//     return res.status(500).json({
//       status: "error",
//       message: "Failed to fetch station data"
//     });
//   }
// };