import {db} from "../../db/dbConnect.js";
import { groupByLevels } from "../../utils/groupByLevels.js";
export const getMachineType = async () => {
    try {
        const query = `SELECT TYPE,ASSET,ASSET_DISCRIPTION FROM m_block_machine_type`;
        const [result] = await db.query(query);
        const groupResult = groupByLevels(result, ['TYPE','ASSET']);
        return groupResult;
    } catch (error) {
        console.error("Error fetching machine types:", error);
        throw new Error("Failed to fetch machine types");
    }
    }