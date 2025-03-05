import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import authRouter from './routes/auth.routes.js';
import reportRouter from './routes/report.routes.js';
import userRouter from './routes/user.routes.js';

dotenv.config()

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(() => console.log('DB connected'));

app.use('/api/auth', authRouter);
app.use('/api/reports', reportRouter);
app.use('/api/reports', userRouter);

app.listen(5000, () => console.log('Server running on port 5000'));
