
import { postStationCodeServices } from "../../services/insertservice/station_code.service.js";

export const postStationCodeController = async (req, res) => {
    try {
        const stations = Array.isArray(req.body) ? req.body : [req.body]; // Ensure it's an array

        for (const station of stations) {
            const { division_id,station_name,station_code,section_name } = station;

            if (  !division_id || !station_name || !station_code || !section_name) {
                return res.status(400).json({ message: "Required fields are missing in one or more entries" });
            }
        }

        // **Batch Insert in a Single Call**
        const result = await postStationCodeServices(stations);

        res.status(201).json({ 
            status:"ok",
            message: "Station details inserted successfully", 
            data: req.body
        });
    } catch (error) {
        console.error("Error in Controller:", error);
        res.status(500).json({ message: error.message,data:req.body });
    }
};
