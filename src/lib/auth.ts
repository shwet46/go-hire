import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '@/models/User';
import dbConnect from '@/lib/db';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'recruiter' | 'admin';
  referralCode: string;
}

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

export function generateToken(user: AuthUser): string {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      referralCode: user.referralCode,
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export function verifyToken(token: string): AuthUser | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload & {
      id: string;
      email: string;
      role: 'student' | 'recruiter' | 'admin';
      name?: string;
      referralCode?: string;
    };
    return {
      id: decoded.id,
      email: decoded.email,
      name: decoded.name || '',
      role: decoded.role,
      referralCode: decoded.referralCode || '',
    };
  } catch {
    return null;
  }
}

export async function createUser(
  email: string,
  password: string,
  name: string,
  role: 'student' | 'recruiter' = 'student',
  referredByCode?: string
): Promise<AuthUser> {
  await dbConnect();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await hashPassword(password);

  // Find referrer if referral code provided
  let referredBy;
  if (referredByCode) {
    referredBy = await User.findOne({ referralCode: referredByCode });
  }

  const user = new User({
    email,
    password: hashedPassword,
    name,
    role,
    referredBy: referredBy?._id,
  });

  await user.save();

  // Update referrer's referrals
  if (referredBy) {
    referredBy.referredUsers.push({
      email,
      user: user._id,
      status: 'registered',
      isSuccessful: true,
    });
    referredBy.referralCount += 1;
    referredBy.successfulReferrals += 1;
    await referredBy.save();
  }

  return {
    id: user._id.toString(),
    email: user.email,
    name: user.name,
    role: user.role,
    referralCode: user.referralCode,
  };
}

export async function authenticateUser(email: string, password: string): Promise<AuthUser | null> {
  await dbConnect();

  const user = await User.findOne({ email });
  if (!user) {
    return null;
  }

  const isValid = await verifyPassword(password, user.password);
  if (!isValid) {
    return null;
  }

  return {
    id: user._id.toString(),
    email: user.email,
    name: user.name,
    role: user.role,
    referralCode: user.referralCode,
  };
}

export async function getUserById(id: string): Promise<AuthUser | null> {
  await dbConnect();

  const user = await User.findById(id);
  if (!user) {
    return null;
  }

  return {
    id: user._id.toString(),
    email: user.email,
    name: user.name,
    role: user.role,
    referralCode: user.referralCode,
  };
}
