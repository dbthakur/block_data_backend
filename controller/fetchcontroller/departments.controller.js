
import { getDepartmentService } from "../../services/fetchservice/departments.service.js";

export const getdepartmentController = async (req, res) => {
  try {
    const result = await getDepartmentService(req, res);
    res.json({ status: "ok", data: result });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};
