import MedicalReport from '../models/report.model.js';
import cloudinary from 'cloudinary';

export const uploadReport = async (req, res) => {
  const { symptoms } = req.body;
  const file = req.file; // Assuming you're using multer
  try {
      const result = await cloudinary.v2.uploader.upload(file.path);
    
      const report = await MedicalReport.create({
        userId: req.user.id,
        symptoms,
        reportUrl: result.secure_url,
      });
    
      res.status(201).json({success: true, message: 'Report uploaded successfully', report });
    } catch (err) {
      res.status(500).json({success: false, message: 'Internal Server Error', error: err.message });
  }
};

export const getAllReports = async (req, res) => {
  try {
    const reports = await MedicalReport.find().populate('userId', 'name email');
    res.status(200).json({ success: true, reports });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal Server Error', error: err.message });
  }
};

export const getSpecificReportById = async (req, res) => {
  const { reportId } = req.params;
  try {
    const report = await MedicalReport.findById(reportId).populate('userId', 'name email');
    if (!report) {
      return res.status(404).json({ success: false, message: 'Report not found' });
    }
    res.status(200).json({ success: true, report });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal Server Error', error: err.message });
  }
};

export const getAllReportsOfSpecificUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const reports = await MedicalReport.find({ userId }).populate('userId', 'name email');
    res.status(200).json({ success: true, reports });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal Server Error', error: err.message });
  }
};