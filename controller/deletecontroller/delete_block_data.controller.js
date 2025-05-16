import { deleteBlockDataService } from "../../services/deleteService/delete_block_data.service.js";

export const deleteBlockDataController = async (req, res) => {
  try {
    const sno = req.params.id;

    if (!sno) {
      return res.status(400).json({ message: "sno ID is required" });
    }

    const result = await deleteBlockDataService(sno);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "No Data found with the given sno ID" });
    }

    res.status(200).json({
      message: "BLOCK Data deleted successfully",
      deletedsno: sno,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
