import mongoose, { Schema, Document, model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  image: string;
  role: "student" | "recruiter" | "admin";
  points: number;
  referrals: number;
  profileComplete: boolean;
  resumeUrl?: string;
  skills?: string[];
  college?: string;
  experienceLevel?: string;
}

const UserSchema = new Schema<IUser>(
  {
    name: String,
    email: { type: String, unique: true, required: true },
    image: String,
    role: {
      type: String,
      enum: ["student", "recruiter", "admin"],
      default: "student",
    },
    points: { type: Number, default: 0 },
    referrals: { type: Number, default: 0 },
    profileComplete: { type: Boolean, default: false },
    resumeUrl: String,
    skills: [String],
    college: String,
    experienceLevel: String,
  },
  { timestamps: true }
);

export default mongoose.models.User || model<IUser>("User", UserSchema);