import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  name: String,
  description: String,
  points: Number,
  type: {
    type: String,
    enum: ['daily_signin', 'referral', 'application', 'resume_upload', 'profile_completion'],
  },
  isActive: { type: Boolean, default: true },
});

export default mongoose.models.Task || mongoose.model('Task', TaskSchema);