
import { getBlockDataService } from "../../services/fetchservice/block_data.service.js";


// export const getBlockDataController = async (req, res) => {
//   try {
//     const { date } = req.query;

//     if (!date) {
//       return res.status(400).json({ status: "error", message: "Missing 'date' query parameter" });
//     }

//     const result = await getBlockDataService(date);

//     if (!result || result.length === 0) {
//       return res.status(404).json({
//         status: "error",
//         message: `No data found for date: ${date}`
//       });
//     }

//     res.status(200).json({ status: "ok", data: result });
//   } catch (error) {
//     console.error("Controller Error:", error);
//     res.status(500).json({ status: "error", message: "Internal Server Error" });
//   }
// };



export const getBlockDataController = async (req, res) => {
  try {
    const {
      date,
      // department,
      // section_name,
      // offset = 0,
    

    } = req.query;

    const page = req.query.page || 1;
const limit = req.query.limit || 10;

    if (!date) {
      return res.status(400).json({ error: "Date parameter is required." });
    }

    const data = await getBlockDataService(req.query.date, page, limit);
res.json(data);

    // const data = await getBlockDataService(
    //   date,
    //   department || null,
    //   section_name || null,
    //   parseInt(limit),
    //   parseInt(offset)
    // );

    // res.json(data);
  } catch (error) {
    console.error("Controller Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
