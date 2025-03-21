import { getMStationService } from "../../services/fetchservice/m_station.service.js";

export const getMStationController = async (req, res) => {
  try {

    console.log("Came in controller");
    const result = await getMStationService(req, res);
    res.json({ status: "ok", data: result });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};
