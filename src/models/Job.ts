import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  description: String,
  requirements: [String],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isApproved: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.models.Job || mongoose.model("Job", JobSchema);