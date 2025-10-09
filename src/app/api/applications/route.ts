import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/User';
import Job from '@/models/Job';
import dbConnect from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const token = request.cookies.get('auth-token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const user = verifyToken(token);
    if (!user || user.role !== 'student') {
      return NextResponse.json({ error: 'Only students can apply for jobs' }, { status: 403 });
    }

    const { jobId } = await request.json();

    const job = await Job.findById(jobId);
    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    const userDoc = await User.findById(user.id);
    if (!userDoc) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if already applied
    const existingApplication = userDoc.applications.find(
      (app: { job: { toString(): string } }) => app.job.toString() === jobId
    );

    if (existingApplication) {
      return NextResponse.json({ error: 'Already applied to this job' }, { status: 400 });
    }

    // Add application to user
    userDoc.applications.push({
      job: jobId,
      status: 'applied',
      appliedAt: new Date(),
      lastUpdated: new Date(),
    });

    await userDoc.save();

    return NextResponse.json({ message: 'Application submitted successfully' }, { status: 201 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const token = request.cookies.get('auth-token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const user = verifyToken(token);
    if (!user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const userDoc = await User.findById(user.id).populate({
      path: 'applications.job',
      model: 'Job',
      populate: {
        path: 'postedBy',
        model: 'User',
        select: 'name email',
      },
    });

    if (!userDoc) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ applications: userDoc.applications });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}