import { getTinsepctionService,getMaxInsDateService } from "../../services/fetchservice/Isepction.service.js";

export const getTinsepctionController = async (req, res) => {
  try {

    console.log("Came in controller");
    const result = await getTinsepctionService(req, res);
    res.json({ status: "ok", data: result });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};
export const getMaxInsDateController = async (req, res) => {
  try {

    // console.log("Came in controller before service",req.query.stn);
    // var st =req.query.stn;


    // console.log("Came in controller");
    const result = await getMaxInsDateService(req,res);
    res.json({ status: "ok", data: result });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};



