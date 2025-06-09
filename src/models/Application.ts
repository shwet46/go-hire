import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
  applicant: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['applied', 'reviewed', 'accepted', 'rejected'], default: 'applied' },
}, { timestamps: true });

export default mongoose.models.Application || mongoose.model("Application", ApplicationSchema);