import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String },
    role: {
      type: String,
      enum: ['student', 'recruiter', 'admin'],
      default: 'student',
    },

    // Academic & profile fields 
    university: { type: String },
    degree: { type: String },
    graduationYear: { type: String },
    skills: [{ type: String }],
    bio: { type: String },
    resumeUrl: { type: String },
    profileCompleted: { type: Boolean, default: false },

    experiences: [
      {
        title: { type: String, required: true },
        company: { type: String, required: true },
        employmentType: {
          type: String,
          enum: [
            'full-time',
            'part-time',
            'internship',
            'freelance',
            'contract',
            'temporary',
            'volunteer',
            'other',
          ],
          required: true,
        },
        location: { type: String },
        startDate: { type: Date, required: true },
        endDate: { type: Date },
        isCurrent: { type: Boolean, default: false },
        description: { type: String },
        skillsUsed: [{ type: String }],
      },
    ],

    // Recruiter-specific fields
    companyHiringFor: { type: String },

    // Referral related fields
    referredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    referralCode: { type: String, unique: true },
    referredUsers: [
      {
        email: { type: String },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        status: {
          type: String,
          enum: ['pending', 'registered', 'completed'],
          default: 'pending',
        },
        isSuccessful: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    referralCount: { type: Number, default: 0 },
    successfulReferrals: { type: Number, default: 0 },

    // Application related fields
    applications: [
      {
        job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
        status: {
          type: String,
          enum: ['applied', 'reviewed', 'accepted', 'rejected'],
          default: 'applied',
        },
        appliedAt: { type: Date, default: Date.now },
        lastUpdated: { type: Date, default: Date.now },
        notes: String,
      },
    ],

    jobsPosted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
  },
  { timestamps: true }
);

UserSchema.pre('save', function (next) {
  if (!this.referralCode) {
    const prefix = this.name ? this.name.substring(0, 2).toUpperCase() : 'GH';
    this.referralCode = prefix + Math.random().toString(36).substring(2, 7).toUpperCase();
  }
  next();
});

export default mongoose.models.User || mongoose.model('User', UserSchema);