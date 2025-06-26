import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.config.js';
import authRouter from './routes/auth.routes.js';
import reportRouter from './routes/report.routes.js';
import userRouter from './routes/user.routes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to database
connectDB();

// Routes
app.use('/api/auth', authRouter);
app.use('/api/reports', reportRouter);
app.use('/api/users', userRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));