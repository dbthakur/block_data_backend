import express from "express";
import { getMStationController } from "../controller/fetchcontroller/m_station.controller.js";
import { getdepartmentController } from "../controller/fetchcontroller/departments.controller.js";
import { getDeficiencyController } from "../controller/fetchcontroller/deficiency.controller.js";
import { getInspectedByController } from "../controller/fetchcontroller/inspected_by.controller.js";
import { postInspectionNoteController} from "../controller/insertcontroller/t_inspection_note.controller.js";
import { getTinsepctionController,getMaxInsDateController  } from "../controller/fetchcontroller/getTinsepctionController.js";
import { updateInspectionNoteController } from "../controller/updatecontroller/t_inspection_note_update.controller.js";
import { getMaxUniqueIDController } from "../controller/fetchcontroller/getMaxUniqueIDController.controller.js";
import { loginUser, registerUser } from "../controller/authcontroller/auth.controller.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const routes = express.Router();

// for all get request for fetching  master data

routes.get("/getmstation",getMStationController);
routes.get("/getTInspection",getTinsepctionController);
routes.get("/getdepartments",getdepartmentController);
routes.get("/getdeficiency",getDeficiencyController);
routes.get("/getInspectedBy",getInspectedByController);
routes.get("/getMaxUniqueID",getMaxUniqueIDController);

routes.get("/getMaxInsDate",getMaxInsDateController);


// for all insertation of transction table
routes.post("/insertInspectionNote",postInspectionNoteController);

//for update of table
routes.put("/updateInspectionNote",updateInspectionNoteController);

//auth routers 
routes.post('/login',loginUser);
routes.post('/register',registerUser);

routes.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: `Hello ${req.user.username}`, user: req.user });
})


export default routes;
