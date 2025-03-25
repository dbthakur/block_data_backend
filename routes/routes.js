import express from "express";
import { getMStationController } from "../controller/fetchcontroller/m_station.controller.js";
import { getdepartmentController } from "../controller/fetchcontroller/departments.controller.js";
import { getDeficiencyController } from "../controller/fetchcontroller/deficiency.controller.js";


const routes = express.Router();

// for all get request for fetching  master data

routes.get("/getmstation",getMStationController);
routes.get("/getdepartments",getdepartmentController);
routes.get("/getdeficiency",getDeficiencyController);


export default routes;
