import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  image: String,
  role: { type: String, enum: ['student', 'recruiter', 'admin'], required: true },
  points: { type: Number, default: 0 },
  profileCompleted: { type: Boolean, default: false },
  resumeUrl: String,
  education: String,
  skills: [String],
  college: String,
  experience: String,
  referrals: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);