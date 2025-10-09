import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ['full-time', 'part-time', 'contract', 'internship'],
      default: 'full-time',
    },
    salary: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    requirements: [
      {
        type: String,
        trim: true,
      },
    ],
    responsibilities: [
      {
        type: String,
        trim: true,
      },
    ],
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    applicants: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        appliedAt: {
          type: Date,
          default: Date.now,
        },
        status: {
          type: String,
          enum: ['applied', 'reviewing', 'shortlisted', 'rejected', 'hired'],
          default: 'applied',
        },
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    visibility: {
      type: String,
      enum: ['public', 'private'],
      default: 'public',
    },
    duration: {
      type: String,
      trim: true,
      required: function (this: mongoose.Document) {
        return this.get('type') === 'internship';
      },
    },
  },
  {
    timestamps: true,
  }
);

JobSchema.index({ title: 'text', company: 'text', description: 'text' });
JobSchema.index({ location: 1 });
JobSchema.index({ type: 1 });
JobSchema.index({ postedBy: 1 });
JobSchema.index({ createdAt: -1 });

export default mongoose.models.Job || mongoose.model('Job', JobSchema);