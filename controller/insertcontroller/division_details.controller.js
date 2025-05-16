
import { postDivisionDetailsServices } from "../../services/insertservice/division_details.service.js";

export const postDivisionDetailsController = async (req, res) => {
    try {
        const divisions = Array.isArray(req.body) ? req.body : [req.body]; // Ensure it's an array

        for (const division of divisions) {
            const { division_name ,zone_id} = division;

            if (!division_name || !zone_id) {
                return res.status(400).json({ message: "Required fields are missing in one or more entries" });
            }
        }

        // **Batch Insert in a Single Call**
        const result = await postDivisionDetailsServices(divisions);

        res.status(201).json({ 
            status:"ok",
            message: "Division details inserted successfully", 
            data: req.body
        });
    } catch (error) {
        console.error("Error in Controller:", error);
        res.status(500).json({ message: error.message,data:req.body });
    }
};
