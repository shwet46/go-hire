import 'next-auth';
import { Types } from 'mongoose';

declare module 'next-auth' {
  interface Session {
    user: {
      points: number;
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: 'student' | 'recruiter' | 'admin';
    };
  }

  interface User {
    id?: string;
    role?: 'student' | 'recruiter' | 'admin';
    points?: number;
    referralCode?: string;
    referredBy?: string;
    profileComplete?: boolean;
    resumeUploaded?: boolean;
    companyName?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
    role?: 'student' | 'recruiter' | 'admin';
  }
}