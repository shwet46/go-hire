import mongoose from "mongoose";

const ReferralSchema = new mongoose.Schema({
  referredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  referredEmail: String,
  isSuccessful: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.models.Referral || mongoose.model("Referral", ReferralSchema);