import {getMachineType} from "../../services/fetchservice/m_block_machine_type.service.js";

export const getMachineTypeController = async (req, res) => {
    try {
        const machineTypes = await getMachineType();
        res.status(200).json({status:"ok", machineTypes});
    } catch (error) {
        console.error("Error in getMachineTypeController:", error);
        res.status(500).json({ error: "Failed to fetch machine types" });
    }
}