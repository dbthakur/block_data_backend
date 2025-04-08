import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from "../../db/dbConnect.js";
// import { findUserByUsername } from '..authService/user.service.js';
import { findUserByUsername } from './user.service.js';
// const SECRET_KEY = 'supersecret123'; 
 const SECRET_KEY= process.env.SECRET_KEY

console.log(SECRET_KEY)
export const handleLogin = async (username, password) => {
  const user = await findUserByUsername(username);
  if (!user) throw new Error('User not found');
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid password');

  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    SECRET_KEY,
    {expiresIn: '1h' }
  );

  // console.log('Token generated:', token); // Debugging line
  return token;
};

export const registerNewUser = async (username, password, role = 'user') => {
  const existing = await findUserByUsername(username);
  if (existing) throw new Error('Username already exists');

  const hash = await bcrypt.hash(password, 10);
  const query = `INSERT INTO users (username, password, role) VALUES (?, ?, ?)`;
  await db.query(query, [username, hash, role]);

  return { username, role };
};
