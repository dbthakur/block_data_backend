import express from "express";
import { getMStationController } from "../controller/fetchcontroller/m_station.controller.js";


const routes = express.Router();

// for all get request for fetching data
console.log("Came in routes");
routes.get("/getmstation",getMStationController);
console.log("Came in routes123");


export default routes;
