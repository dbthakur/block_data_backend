import { postBlockDataModifiedService } from "../../services/insertservice/bock_data_modified.service.js";

const REQUIRED_FIELDS = [
  "reportDate", "line", "station_name", "Department_ID"
];

export const postBlockDataModifiedController = async (req, res) => {
  try {
    const blockDataArray = req.body;

    if (!Array.isArray(blockDataArray) || blockDataArray.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "Invalid or empty input data"
      });
    }

    // Validate required fields for each object

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

    const result = await postBlockDataModifiedService(blockDataArray);

    res.status(201).json({
      status: "ok",
      message: `${result.affectedRows} row(s) inserted successfully`
    });
  } catch (error) {
    console.error("Controller error:", error);
    res.status(500).json({
      status: "error",
      message: error.message || "Internal Server Error"
    });
  }
};
