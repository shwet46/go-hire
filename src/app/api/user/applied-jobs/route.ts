import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth-config';
import dbConnect from '@/lib/db';
import Job from '@/models/Job';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  await dbConnect();
  const jobs = (await Job.find({ 'applicants.user': (session.user as any).id })
    .select('title company location type salary applicants createdAt')
    .sort({ 'applicants.appliedAt': -1 })
    .lean()
    .exec()) as Array<{
    _id: any;
    title: string;
    company: string;
    location: string;
    type: string;
    salary: number;
    applicants: any[];
    createdAt: Date;
  }>;

  const flattened = jobs.map((j) => {
    const match = (j.applicants as any[]).find(
      (a) => a.user.toString() === (session.user as any).id
    );
    return {
      _id: j._id.toString(),
      title: j.title,
      company: j.company,
      location: j.location,
      type: j.type,
      salary: j.salary,
      createdAt: j.createdAt,
      status: match?.status || 'applied',
    };
  });
  return NextResponse.json({ jobs: flattened });
}