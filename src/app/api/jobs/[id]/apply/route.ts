import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth-config';
import dbConnect from '@/lib/db';
import Job from '@/models/Job';
import User from '@/models/User';

interface ExtendedUser {
  id?: string;
  role?: string;
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  const { id } = await params;
    const userId = (session.user as ExtendedUser).id;

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    if (user.role !== 'student') {
      return NextResponse.json({ error: 'Only students can apply' }, { status: 403 });
    }

    const body = await request.json().catch(() => ({}));
    const note = typeof body.note === 'string' ? body.note.slice(0, 1000) : '';

    const job = await Job.findById(id);
    if (!job || job.isActive === false) {
      return NextResponse.json({ error: 'Job not found or inactive' }, { status: 404 });
    }

    interface Applicant {
      user: string;
      status: string;
    }

    const already: boolean = (job.applicants as Applicant[]).some(
      (a: Applicant) => a.user?.toString() === userId
    );
    if (already) {
      return NextResponse.json({ error: 'Already applied' }, { status: 409 });
    }

    job.applicants.push({ user: userId, status: 'applied' });
    await job.save();

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: 'Application failed' }, { status: 500 });
  }
}