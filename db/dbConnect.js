import mysql from "mysql2/promise"; 
import { dbConfig } from "./config.js";

if (process.env.ENV !== "development") {
  dbConfig.port = process.env.DATABASE_PORT;
}


export const db = mysql.createPool({
  ...dbConfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export const dbConnect = async () => {
  try {
    const connection = await db.getConnection(); 
    console.log("Connected to MySQL database!");
    connection.release();
  } catch (err) {
    console.error(" MySQL Connection Error:", err);
    throw err;
  }
};
