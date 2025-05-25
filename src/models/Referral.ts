import mongoose, { Schema, Document, model } from "mongoose";

export interface IReferral extends Document {
  referrer: mongoose.Types.ObjectId;
  referredEmail: string;
  isSuccessful: boolean;
}

const ReferralSchema = new Schema<IReferral>(
  {
    referrer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    referredEmail: { type: String, required: true },
    isSuccessful: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Referral || model<IReferral>("Referral", ReferralSchema);