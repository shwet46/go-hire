import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth-config';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function GET() {
  await dbConnect();
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const user = await User.findOne({ email: session.user.email }).lean() as Record<string, unknown> | null;
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
  // Only return safe fields
  return NextResponse.json({
    name: user.name,
    email: user.email,
    university: user.university,
    degree: user.degree,
    graduationYear: user.graduationYear,
    skills: user.skills,
    bio: user.bio,
    resumeUrl: user.resumeUrl,
    profileCompleted: user.profileCompleted,
    experiences: user.experiences,
    companyHiringFor: user.companyHiringFor,
    role: user.role,
  });
}

export async function PUT(request: NextRequest) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const body = await request.json();
  const update: Record<string, unknown> = {};
  [
    'university',
    'degree',
    'graduationYear',
    'skills',
    'bio',
    'resumeUrl',
    'profileCompleted',
    'experiences',
    'companyHiringFor',
  ].forEach(field => {
    if (body[field] !== undefined) update[field] = body[field];
  });
  const user = await User.findOneAndUpdate(
    { email: session.user.email },
    { $set: update },
    { new: true }
  );
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
