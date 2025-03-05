import express  from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import { login, signup } from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.post('/login', login);
authRouter.post('/signup', signup);
authRouter.get('/logout', protect, logout);

export default authRouter;