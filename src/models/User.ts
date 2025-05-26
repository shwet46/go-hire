import mongoose from 'mongoose';
import { IUser } from '../types/models';

const UserSchema = new mongoose.Schema<IUser>({
  email: { type: String, required: true, unique: true },
  name: { type: String },
  image: { type: String },
  role: { type: String, enum: ['student', 'recruiter', 'admin'], default: 'student' },
  points: { type: Number, default: 0 },
  referralCode: { type: String, unique: true, sparse: true },
  referredBy: { type: String },
  profileComplete: { type: Boolean, default: false },
  resumeUploaded: { type: Boolean, default: false },
  companyName: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.User as mongoose.Model<IUser> || mongoose.model<IUser>('User', UserSchema);