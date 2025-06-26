import express  from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import { getAllUsers, getSpecificUserById, updateUserDetails, deleteUser } from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.get('/', protect, getAllUsers);
userRouter.get('/:userId', protect, getSpecificUserById);
userRouter.patch('/:userId', protect, updateUserDetails);
userRouter.delete('/:userId', protect, deleteUser);

export default userRouter;