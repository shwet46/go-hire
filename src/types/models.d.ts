import { Document, Types } from 'mongoose';

export type UserRole = 'student' | 'recruiter' | 'admin';
export type TaskType = 'daily_sign_in' | 'refer_peer' | 'apply_for_job' | 'upload_resume' | 'complete_profile';
export type ApplicationStatus = 'applied' | 'reviewed' | 'interviewed' | 'offered' | 'rejected';
export type ReferralStatus = 'pending' | 'successful';

export interface IUser extends Document {
  _id: Types.ObjectId;
  email: string;
  name?: string;
  image?: string;
  role: UserRole;
  points?: number;
  referralCode?: string;
  referredBy?: string;
  profileComplete?: boolean;
  resumeUploaded?: boolean;
  companyName?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITask extends Document {
  _id: Types.ObjectId;
  name: string;
  points: number;
  description?: string;
  isEnabled: boolean;
  taskType: TaskType;
  createdAt: Date;
  updatedAt: Date;
}

export interface IJob extends Document {
  _id: Types.ObjectId;
  recruiterId: Types.ObjectId | IUser;
  title: string;
  description: string;
  requirements?: string;
  location?: string;
  company?: string;
  isActive: boolean;
  isPremium?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IApplication extends Document {
  _id: Types.ObjectId;
  studentId: Types.ObjectId | IUser;
  jobId: Types.ObjectId | IJob;
  status: ApplicationStatus;
  pointsAwarded?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IReferral extends Document {
  _id: Types.ObjectId;
  referrerId: Types.ObjectId | IUser;
  referredId: Types.ObjectId | IUser;
  status: ReferralStatus;
  pointsAwarded?: number;
  createdAt: Date;
  updatedAt: Date;
}