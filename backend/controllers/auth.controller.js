import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({ name, email, password });
    res.status(201).json({ success: true, token: user.generateToken() });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Internal Server Error', error: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
      const user = await User.findOne({ email });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
      res.status(200).json({ success: true, token: user.generateToken() });
    } catch (err) {
      return res.status(500).json({ success: false, message: 'Internal Server Error', error: err.message });
    
  }
};
