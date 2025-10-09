import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth-config';
import dbConnect from '@/lib/db';
import Job from '@/models/Job';
import User from '@/models/User';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  await dbConnect();
  const me = await User.findById((session.user as any).id);
  if (!me || me.role !== 'recruiter') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const jobs = (await Job.find({ postedBy: me._id })
    .select('title company applicants createdAt')
    .populate('applicants.user', 'name email')
    .sort({ createdAt: -1 })
    .lean()) as Array<{
    _id: any;
    title: string;
    company: string;
    applicants: any[];
    createdAt: Date;
  }>;

  const shaped = jobs.map((j) => ({
    _id: j._id.toString(),
    title: j.title,
    company: j.company,
    applicants: (j.applicants as any[]).map((a) => ({
      userId: a.user?._id?.toString() || '',
      name: a.user?.name,
      email: a.user?.email,
      status: a.status,
      appliedAt: a.appliedAt,
    })),
  }));

  return NextResponse.json({ jobs: shaped });
}