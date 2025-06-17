import { getStationCodeServices } from "../../services/fetchservice/station_code1.service.js";

export const getStationCodeController = async (req, res) => {
  try {
  
    const result = await getStationCodeServices(req, res);
    res.json({ status: "ok", data: result });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};