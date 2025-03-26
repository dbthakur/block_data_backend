import { getInspectedByService } from "../../services/fetchservice/inspected_by.service.js";

export const getInspectedByController =async(req,res)=>{
    try{
        const result=await getInspectedByService(req,res);
        console.log("Came in controller");
        res.json({ status: "ok", data: result });

    }catch(error){
        console.error("Error in getInspectedByController:", error);
        throw error;
    }
}    