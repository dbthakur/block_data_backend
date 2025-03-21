import mysql from "mysql2/promise"; // ✅ Use mysql2 (with promises)
import { dbConfig } from "./config.js";

if (process.env.ENV !== "development") {
  dbConfig.port = process.env.DATABASE_PORT;
}

// ✅ Create a connection pool
export const db = mysql.createPool({
  ...dbConfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export const dbConnect = async () => {
  try {
    const connection = await db.getConnection(); // ✅ Test connection
    console.log("✅ Connected to MySQL database!");
    connection.release();
  } catch (err) {
    console.error("❌ MySQL Connection Error:", err);
    throw err;
  }
};
