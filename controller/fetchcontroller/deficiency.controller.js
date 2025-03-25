import { getDeficiencyServices } from "../../services/fetchservice/deficiency.service.js";
export const getDeficiencyController = async (req, res) => {
  try {
    console.log("Came in controller");
    const result = await getDeficiencyServices(req, res);
    res.json({ status: "ok", data: result });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};