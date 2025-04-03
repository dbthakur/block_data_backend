import {getMaxUniqueIDService } from "../../services/fetchservice/getMaxuniqueIDService.service.js";

export const getMaxUniqueIDController = async (req, res) => {
    const { tableName, columnName } = req.query;
    console.log("columnName",columnName);
    try {
        const maxID = await getMaxUniqueIDService(tableName, columnName);
        res.status(200).json({ maxID });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching max unique ID' });
    }
}