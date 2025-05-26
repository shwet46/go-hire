// src/models/Task.ts

import mongoose from 'mongoose';
import { ITask, TaskType } from '../types/models';

const TaskSchema = new mongoose.Schema<ITask>({
  name: { type: String, required: true, unique: true }, // e.g., "Daily Sign-In" [cite: 3]
  points: { type: Number, required: true }, // Points associated with the task [cite: 3]
  description: { type: String }, // Description of the task for display [cite: 3]
  isEnabled: { type: Boolean, default: true }, // Admin can enable/disable tasks [cite: 4]
  taskType: { type: String, enum: ['daily_sign_in', 'refer_peer', 'apply_for_job', 'upload_resume', 'complete_profile'], required: true, unique: true }, // Unique type for programmatic identification [cite: 3, 4]
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

TaskSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.Task as mongoose.Model<ITask> || mongoose.model<ITask>('Task', TaskSchema);