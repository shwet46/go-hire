import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth-config';
import Job from '@/models/Job';
import dbConnect from '@/lib/db';

interface ExtendedUser {
  id?: string;
  role?: string;
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();

  const { id } = await params;
    const job = await Job.findById(id).populate('postedBy', 'name email role companyHiringFor');

    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    // Compute recruiter hire analytics (number of applicants hired across all their jobs)
    let recruiterHireCount = 0;
    try {
      const recruiterId = (job.postedBy as any)?._id || job.postedBy;
      if (recruiterId) {
        const recruiterJobs = await Job.find({
          postedBy: recruiterId,
          'applicants.status': 'hired',
        })
          .select('applicants.status')
          .lean();
        recruiterJobs.forEach((j: any) => {
          if (Array.isArray(j.applicants)) {
            recruiterHireCount += j.applicants.filter((a: any) => a.status === 'hired').length;
          }
        });
      }
    } catch {
      recruiterHireCount = 0;
    }

    return NextResponse.json({ job, recruiterHireCount });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

  const { id } = await params;
    const job = await Job.findById(id);

    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    // Check if user owns this job
    if (job.postedBy.toString() !== (session.user as ExtendedUser).id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const updateData = await request.json();

    const updatedJob = await Job.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    return NextResponse.json({
      message: 'Job updated successfully',
      job: updatedJob,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

  const { id } = await params;
    const job = await Job.findById(id);

    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    // Check if user owns this job
    if (job.postedBy.toString() !== (session.user as ExtendedUser).id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    await Job.findByIdAndDelete(id);

    return NextResponse.json({
      message: 'Job deleted successfully',
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
