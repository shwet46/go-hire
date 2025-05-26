import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Application from '@/models/Application';
import User from '@/models/User';
import Task from '@/models/Task';
import { getSession, isStudent, isRecruiter, isAdmin } from '@/lib/auth';
import { Types } from 'mongoose';

// GET: View applications (Recruiter: for their jobs; Admin: all; Student: their own) [cite: 2]
export async function GET(req: Request) {
  await dbConnect();
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const jobId = searchParams.get('jobId');
    const studentId = searchParams.get('studentId');
    const statusFilter = searchParams.get('status');
    const pointsScoreMin = searchParams.get('pointsScoreMin'); // For recruiter filtering [cite: 2]
    const skillsFilter = searchParams.get('skills'); // For recruiter filtering [cite: 2]

    let query: any = {};

    if (await isStudent()) {
      // Students can only see their own applications [cite: 1]
      query.studentId = new Types.ObjectId(session.user.id);
      if (jobId) query.jobId = new Types.ObjectId(jobId);
    } else if (await isRecruiter()) {
      // Recruiters can only see applications for their jobs [cite: 2]
      const recruiterJobs = await mongoose.models.Job.find({ recruiterId: new Types.ObjectId(session.user.id) }).select('_id');
      query.jobId = { $in: recruiterJobs.map(job => job._id) };

      if (jobId && recruiterJobs.some(job => job._id.equals(new Types.ObjectId(jobId)))) {
        query.jobId = new Types.ObjectId(jobId);
      } else if (jobId) {
        return NextResponse.json({ message: 'Forbidden: You can only view applications for your own jobs.' }, { status: 403 });
      }

      // Recruiter filters
      if (statusFilter) query.status = statusFilter; // [cite: 2]
      if (pointsScoreMin) {
        // Need to join with User model to filter by points
        // Mongoose aggregation might be better for complex joins
      }
      if (skillsFilter) {
        // Need to join with User model and filter by skills
        // This is complex and might require an aggregation pipeline or separate requests.
      }

    } else if (await isAdmin()) {
      // Admins can see all applications [cite: 4]
      if (jobId) query.jobId = new Types.ObjectId(jobId);
      if (studentId) query.studentId = new Types.ObjectId(studentId);
      if (statusFilter) query.status = statusFilter;
    } else {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    const applications = await Application.find(query)
      .populate('studentId', 'name email points') // Populate student name, email, and points [cite: 2]
      .populate('jobId', 'title company location'); // Populate job details [cite: 2]

    // Manual filtering for points/skills if aggregation is not used
    let filteredApplications = applications;
    if (pointsScoreMin) {
        const minPoints = parseInt(pointsScoreMin);
        if (!isNaN(minPoints)) {
            filteredApplications = filteredApplications.filter(app => (app.studentId as IUser).points && (app.studentId as IUser).points! >= minPoints);
        }
    }
    // Skills filtering would be similar but require skills field on User model

    return NextResponse.json(filteredApplications, { status: 200 });
  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}


// POST: Apply for a job (Student only) [cite: 3]
export async function POST(req: Request) {
  await dbConnect();
  const session = await getSession();

  if (!session || !(await isStudent())) { // Only students can apply for jobs [cite: 1]
    return NextResponse.json({ message: 'Forbidden: Only students can apply for jobs.' }, { status: 403 });
  }
  if (!session.user?.id) {
    return NextResponse.json({ message: 'User ID not found in session.' }, { status: 400 });
  }

  try {
    const body = await req.json();
    const { jobId } = body;

    if (!jobId || !Types.ObjectId.isValid(jobId)) {
      return NextResponse.json({ message: 'Invalid Job ID.' }, { status: 400 });
    }

    const studentId = new Types.ObjectId(session.user.id);

    // Check if already applied
    const existingApplication = await Application.findOne({ studentId, jobId: new Types.ObjectId(jobId) });
    if (existingApplication) {
      return NextResponse.json({ message: 'You have already applied for this job.' }, { status: 409 });
    }

    // Find the 'Apply for a Job' task to get points [cite: 3]
    const applyTask = await Task.findOne({ taskType: 'apply_for_job', isEnabled: true });
    const pointsToAward = applyTask ? applyTask.points : 5; // Default to 5 if task not configured [cite: 3]

    // Create the application
    const newApplication = await Application.create({
      studentId,
      jobId: new Types.ObjectId(jobId),
      status: 'applied',
      pointsAwarded: pointsToAward,
    });

    // Award points to the student [cite: 3]
    await User.findByIdAndUpdate(studentId, { $inc: { points: pointsToAward } });

    return NextResponse.json(newApplication, { status: 201 });
  } catch (error) {
    console.error('Error applying for job:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

// PUT: Update application status (Recruiter/Admin) [cite: 2]
export async function PUT(req: Request) {
  await dbConnect();
  const session = await getSession();

  if (!session || (!(await isRecruiter()) && !(await isAdmin()))) { // Only recruiters or admins can update status [cite: 2]
    return NextResponse.json({ message: 'Forbidden: Only recruiters or admins can update application status.' }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { id, status } = body; // [cite: 2]

    if (!id || !Types.ObjectId.isValid(id) || !status || !['reviewed', 'interviewed', 'offered', 'rejected'].includes(status)) {
      return NextResponse.json({ message: 'Invalid application ID or status.' }, { status: 400 });
    }

    const applicationToUpdate = await Application.findById(id).populate('jobId');
    if (!applicationToUpdate) {
      return NextResponse.json({ message: 'Application not found.' }, { status: 404 });
    }

    // If recruiter, ensure they manage the job this application belongs to
    if (await isRecruiter() && (applicationToUpdate.jobId as IJob).recruiterId.toString() !== session.user?.id) {
      return NextResponse.json({ message: 'Forbidden: You can only update applications for your own jobs.' }, { status: 403 });
    }

    const updatedApplication = await Application.findByIdAndUpdate(
      id,
      { status, updatedAt: new Date() },
      { new: true }
    );

    return NextResponse.json(updatedApplication, { status: 200 });
  } catch (error) {
    console.error('Error updating application status:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}