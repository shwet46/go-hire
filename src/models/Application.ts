// src/models/Application.ts

import mongoose from 'mongoose';
import { IApplication, ApplicationStatus, IUser, IJob } from '../types/models';

const ApplicationSchema = new mongoose.Schema<IApplication>({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Link to the student who applied
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true }, // Link to the job listing
  status: { type: String, enum: ['applied', 'reviewed', 'interviewed', 'offered', 'rejected'], default: 'applied', required: true },
  pointsAwarded: { type: Number }, // Points awarded for applying (e.g., 5 points) [cite: 3]
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Ensure a student can only apply to a specific job once
ApplicationSchema.index({ studentId: 1, jobId: 1 }, { unique: true });

ApplicationSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.Application as mongoose.Model<IApplication> || mongoose.model<IApplication>('Application', ApplicationSchema);