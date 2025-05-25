import mongoose, { Schema, Document, model } from "mongoose";

export interface ITask extends Document {
  name: string;
  description: string;
  points: number;
  isDaily?: boolean;
  isEnabled: boolean;
}

const TaskSchema = new Schema<ITask>(
  {
    name: { type: String, required: true },
    description: String,
    points: { type: Number, required: true },
    isDaily: { type: Boolean, default: false },
    isEnabled: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Task || model<ITask>("Task", TaskSchema);