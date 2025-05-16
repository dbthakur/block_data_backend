
import { postLineDirectionService } from "../../services/insertservice/line_direction.service.js";

export const postLineDirectionController = async (req, res) => {
    try {
        const directions = Array.isArray(req.body) ? req.body : [req.body]; // Ensure it's an array

        for (const direction of directions) {
            const { station_id ,line} = direction;

            if (!station_id || !line) {
                return res.status(400).json({ message: "Required fields are missing in one or more entries" });
            }
        }

        // **Batch Insert in a Single Call**
        const result = await postLineDirectionService(directions);
        res.status(201).json({ 
            status:"ok",
            message: " Line Direction  details inserted successfully", 
            data: req.body
        });
    } catch (error) {
        console.error("Error in Controller:", error);
        res.status(500).json({ message: error.message,data:req.body });
    }
};
