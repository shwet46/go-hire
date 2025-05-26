// src/models/Referral.ts

import mongoose from 'mongoose';
import { IReferral, ReferralStatus, IUser } from '../types/models';

const ReferralSchema = new mongoose.Schema<IReferral>({
  referrerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // User who generated the referral link [cite: 3]
  referredId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true }, // User who signed up using the referral link [cite: 3]
  status: { type: String, enum: ['pending', 'successful'], default: 'successful', required: true }, // Track referral status [cite: 3]
  pointsAwarded: { type: Number }, // Points awarded for a successful referral (e.g., 200 points) [cite: 3]
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

ReferralSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.Referral as mongoose.Model<IReferral> || mongoose.model<IReferral>('Referral', ReferralSchema);