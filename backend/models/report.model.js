import mongoose from 'mongoose';

const medicalReportSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  symptoms: { type: String },
  reportUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const MedicalReport = mongoose.model('MedicalReport', medicalReportSchema);
export default MedicalReport