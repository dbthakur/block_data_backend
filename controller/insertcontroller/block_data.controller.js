import { postBlockDataService } from "../../services/insertservice/block_data.service.js";

const REQUIRED_FIELDS = [
  "reportDate", "Direction", "section", 
  "From_Station", "To_Station",
    "Department"];

export const postBlockDataController = async (req, res) => {
  try {
    const blockDataArray = req.body;

    if (!Array.isArray(blockDataArray) || blockDataArray.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "Invalid or empty input data"
      });
    }

    // Validate each object
    for (let i = 0; i < blockDataArray.length; i++) {
      const entry = blockDataArray[i];
      for (const field of REQUIRED_FIELDS) {
        if (
          entry[field] === undefined ||
          entry[field] === null ||
          entry[field] === ""
        ) {
          return res.status(400).json({
            status: "error",
            message: `Field "${field}" is required and cannot be empty (record index: ${i})`
          });
        }
      }
    }

    const result = await postBlockDataService(blockDataArray);

    res.status(201).json({
      status: "ok",
      message: `${result.affectedRows} row(s) inserted successfully`
    });
  } catch (error) {
    console.error("Controller error:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};
