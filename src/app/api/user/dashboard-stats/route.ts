import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth-config';
import dbConnect from '@/lib/db';
import User from '@/models/User';

type Application = {
  jobType?: string;
};

type UserDoc = {
  applications?: Application[];
  savedJobs?: unknown[];
  completedPractices?: unknown[];
};

export async function GET() {
  await dbConnect();
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const user = (await User.findOne({ email: session.user.email }).lean()) as UserDoc | null;
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
  // Count jobs and internships applied for
  const appliedJobs = (user.applications || []).filter((a) => a.jobType !== 'internship').length;
  const appliedInternships = (user.applications || []).filter(
    (a) => a.jobType === 'internship'
  ).length;
  // Saved jobs and completed practices would be tracked elsewhere
  return NextResponse.json({
    appliedJobs,
    appliedInternships,
    savedJobs: user.savedJobs?.length || 0,
    completedPractices: user.completedPractices?.length || 0,
  });
}
