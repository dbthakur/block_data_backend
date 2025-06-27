// import { getBlockDataByDateService } from "../../services/fetchservice/blockdata_datewise.service.js";

// export const getBlockDataByDateController = async (req, res) => {
//   try {
//     const { date, start, end } = req.query;

//     if (!date && !(start && end) && !end) {
//       return res.status(400).json({ status: "error", message: "At least one of 'date', 'end', or 'start & end' is required" });
//     }

//     const result = await getBlockDataByDateService(req.query);
//     return res.status(result.status === "ok" ? 200 : 500).json(result);

//   } catch (error) {
//     console.error("Error fetching data by date:", error);
//     return res.status(500).json({ status: "error", message: "Internal server error" });
//   }
// };


import { getBlockDataByDateService } from "../../services/fetchservice/blockdata_datewise.service.js";

export const getBlockDataByDateController = async (req, res) => {
  try {
    const result = await getBlockDataByDateService(req.query);
    return res.status(result.status === "ok" ? 200 : 500).json(result);
  } catch (error) {
    console.error("Error fetching data by date:", error);
    return res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
