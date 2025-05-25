import mongoose, { Schema, Document, model } from "mongoose";

export interface IApplication extends Document {
  student: mongoose.Types.ObjectId;
  job: mongoose.Types.ObjectId;
  resumeUrl?: string;
  skillsSnapshot?: string[];
  appliedAt: Date;
}

const ApplicationSchema = new Schema<IApplication>(
  {
    student: { type: Schema.Types.ObjectId, ref: "User", required: true },
    job: { type: Schema.Types.ObjectId, ref: "Job", required: true },
    resumeUrl: String,
    skillsSnapshot: [String],
    appliedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.Application || model<IApplication>("Application", ApplicationSchema);