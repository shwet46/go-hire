import mongoose, { Schema, Document, model } from "mongoose";

export interface IJob extends Document {
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string[];
  recruiter: mongoose.Types.ObjectId;
  isApproved: boolean;
  isPremium: boolean;
}

const JobSchema = new Schema<IJob>(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: String,
    description: String,
    requirements: [String],
    recruiter: { type: Schema.Types.ObjectId, ref: "User", required: true },
    isApproved: { type: Boolean, default: false },
    isPremium: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Job || model<IJob>("Job", JobSchema);