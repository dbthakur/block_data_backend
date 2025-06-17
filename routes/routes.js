import express from "express";
//get request for fetching data
import { getStationCodeController } from "../controller/fetchcontroller/station_code1.controller.js";
  import { getBlockDataController } from "../controller/fetchcontroller/block_data.controller.js";
import { getBlockData1Controller } from "../controller/fetchcontroller/block_data_filter.controller.js";
import { getBlockDataByDateController } from "../controller/fetchcontroller/blockdata_datewise.controller.js"; 
import { getFinancialYearDataController } from "../controller/fetchcontroller/blockdata_financial.controller.js";
import { getMachineTypeController } from "../controller/fetchcontroller/m_block_machine_type.controller.js";
// import { getStationDataFilteredController } from "../controller/fetchcontroller/station_filtered_data.controller.js";



//post request for inserting data
import { postStationCodeController } from "../controller/insertcontroller/station_code.controller.js";
import { postLineDirectionController } from "../controller/insertcontroller/line_direction.controller.js";
import { postDivisionDetailsController } from "../controller/insertcontroller/division_details.controller.js";
import { postBlockDataController } from "../controller/insertcontroller/block_data.controller.js";



// put request for updating data
import { updateLineDirectionController } from "../controller/updatecontroller/line_direction.controller.js";
import { updateStationCodeController } from "../controller/updatecontroller/station_code_update.controller.js";
import { updateDivisionDetailsController } from "../controller/updatecontroller/division_details_update.controller.js";
import { updateBlockDataController } from "../controller/updatecontroller/block_data.controller.js";


//delete request for deleting data

import { deleteStationDataController } from '../controller/deletecontroller/delete_station_data.controller.js';
import { deleteBlockDataController } from '../controller/deletecontroller/delete_block_data.controller.js';
import { deleteDivisionDataController } from '../controller/deletecontroller/delete_division_data.controller.js';


//authentication
// import { loginUser, registerUser } from "../controller/authcontroller/auth.controller.js";
// import { authenticateToken } from "../middleware/authMiddleware.js";




const routes = express.Router();

// for all get request for fetching  master data
routes.get("/getstationcode",getStationCodeController);
 routes.get("/getblockdata",getBlockDataController);
routes.get("/getblockdata1",getBlockData1Controller);
routes.get("/getblockdatabydate", getBlockDataByDateController);
routes.get("/allFyData", getFinancialYearDataController);
routes.get("/getmachinetype",getMachineTypeController);
// routes.get("/stationDataFiltered", getStationDataFilteredController);



// for all insertation of data in database
routes.post("/insertdivisionDetails",postDivisionDetailsController);
routes.post("/insertstationCode",postStationCodeController);
routes.post("/insertlinedirection",postLineDirectionController);
routes.post("/insertblockdata",postBlockDataController);


//for updation of table
routes.put("/updateStationCode",updateStationCodeController);
routes.put("/updateDivisionDetails",updateDivisionDetailsController);
routes.put("/updatelinedirection",updateLineDirectionController);
routes.put("/updateblockdata", updateBlockDataController);




//for deletion of table data
routes.delete('/deletestation/:id',deleteStationDataController);
routes.delete('/deleteblockdata/:id',deleteBlockDataController);
routes.delete('/deletedivisiondata/:id',deleteDivisionDataController);


//auth routers 
// routes.post('/login',loginUser);
// routes.post('/register',registerUser);

// routes.get('/protected', authenticateToken, (req, res) => {
//   res.json({ message: `Hello ${req.user.username}`, user: req.user });
// })


export default routes;
