import { handleLogin, registerNewUser } from '../../services/authService/auth.service.js';

export const loginUser = async (req, res) => {
  // console.log('Login request received'); // Debugging line
  const { username, password } = req.body;
// console.log('Login attempt:'); // Debugging line
  // console.log(username, password);
try {
    const token = await handleLogin(username, password);
    res.json({ tokenData:token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

export const registerUser = async (req, res) => {
  const { username, password, role } = req.body;
 if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }
 try {
    const newUser = await registerNewUser(username, password, role);
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
