import express  from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import { login, signup } from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.post('/login', login);
authRouter.post('/signup', signup);

// Logout function
const logout = (req, res) => {
  res.status(200).json({ success: true, message: 'Logged out successfully' });
};

authRouter.get('/logout', protect, logout);

export default authRouter;