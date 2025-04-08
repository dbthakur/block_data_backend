import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY; // Use process.env in production

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer token

  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user; // Add user info to request
    next();
  });
};
