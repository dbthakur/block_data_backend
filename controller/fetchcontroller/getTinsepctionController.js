import { getTinsepctionService } from "../../services/fetchservice/Isepction.service.js";

export const getTinsepctionController = async (req, res) => {
  try {

    console.log("Came in controller");
    const result = await getTinsepctionService(req, res);
    res.json({ status: "ok", data: result });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};
