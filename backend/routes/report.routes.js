import express  from 'express';
import { uploadReport, getAllReports, getSpecificReportById, getAllReportsOfSpecificUser } from '../controllers/report.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const reportRouter = express.Router();

reportRouter.get('/', protect, getAllReports);
reportRouter.get('/:reportId', protect, getSpecificReportById);
reportRouter.get('/user/:userId', protect, getAllReportsOfSpecificUser);
reportRouter.post('/upload', protect, uploadReport);

export default reportRouter;