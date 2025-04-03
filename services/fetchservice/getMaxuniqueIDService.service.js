import {db} from '../../db/dbConnect.js';

export const getMaxUniqueIDService = async (tableName, columnName) => {
    try {
        const query = `SELECT MAX(${columnName}) AS max_id FROM ${tableName}`;
        const result = await db.query(query);
        console.log("Result from getMaxUniqueIDService:", result); 
       
        return result[0][0].max_id +1 ; 
    } catch (error) {
        console.error('Error fetching max unique ID:', error);
        throw error;
    }
}   