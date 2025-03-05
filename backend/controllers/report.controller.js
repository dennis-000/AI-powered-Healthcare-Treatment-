import MedicalReport from '../models/MedicalReport';
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
      res.status(500).json({success: true, message: 'Internal Server Error', error: err.message });
  }
};
