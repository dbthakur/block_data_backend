import { db} from '../../db/dbConnect.js';

export const findUserByUsername = async (username) => {
  const query = `SELECT * FROM users WHERE username = ? LIMIT 1`;
  const [rows] = await db.query(query, [username]);
  return rows[0];
};
