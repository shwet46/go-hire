// src/models/Job.ts

import mongoose from 'mongoose';
import { IJob, IUser } from '../types/models';

const JobSchema = new mongoose.Schema<IJob>({
  recruiterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Link to the Recruiter who posted the job [cite: 3]
  title: { type: String, required: true }, // Job title [cite: 3]
  description: { type: String, required: true }, // Job description [cite: 3]
  requirements: { type: String }, // Job requirements [cite: 3]
  location: { type: String }, // Job location for filtering [cite: 3]
  company: { type: String }, // Company name [cite: 3]
  isActive: { type: Boolean, default: true }, // Admin can approve or remove job postings [cite: 4]
  isPremium: { type: Boolean, default: false }, // Optional feature for premium listings [cite: 3]
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

JobSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.Job as mongoose.Model<IJob> || mongoose.model<IJob>('Job', JobSchema);