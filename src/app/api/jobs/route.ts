import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Job from '@/models/Job';
import { getSession, isRecruiter, isAdmin } from '@/lib/auth';
import { Types } from 'mongoose';
export async function GET() {
  await dbConnect();
  try {
    const jobs = await Job.find({ isActive: true }).populate('recruiterId', 'companyName'); 
    return NextResponse.json(jobs, { status: 200 });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  await dbConnect();
  const session = await getSession();

  if (!session || !(await isRecruiter())) { 
    return NextResponse.json({ message: 'Forbidden: Only recruiters can post jobs.' }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { title, description, requirements, location, company } = body;

    if (!title || !description || !session.user?.id) {
      return NextResponse.json({ message: 'Missing required fields or recruiter ID.' }, { status: 400 });
    }

    const newJob = await Job.create({
      recruiterId: new Types.ObjectId(session.user.id), // Link to recruite
      title,
      description,
      requirements,
      location,
      company,
      isActive: true, 
    });
    return NextResponse.json(newJob, { status: 201 });
  } catch (error) {
    console.error('Error posting job:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
export async function PUT(req: Request) {
  await dbConnect();
  const session = await getSession();
  if (!session || (!(await isRecruiter()) && !(await isAdmin()))) {
    return NextResponse.json({ message: 'Forbidden: Only recruiters or admins can update jobs.' }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { id, ...updates } = body;

    if (!id || !Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: 'Invalid Job ID' }, { status: 400 });
    }

    const jobToUpdate = await Job.findById(id);
    if (!jobToUpdate) {
      return NextResponse.json({ message: 'Job not found' }, { status: 404 });
    }

    if (await isRecruiter() && jobToUpdate.recruiterId.toString() !== session.user?.id) {
      return NextResponse.json({ message: 'Forbidden: You can only update your own jobs.' }, { status: 403 });
    }

    const updatedJob = await Job.findByIdAndUpdate(id, { ...updates, updatedAt: new Date() }, { new: true });
    return NextResponse.json(updatedJob, { status: 200 });
  } catch (error) {
    console.error('Error updating job:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
export async function DELETE(req: Request) {
  await dbConnect();
  const session = await getSession();

  if (!session || !(await isAdmin())) { 
    return NextResponse.json({ message: 'Forbidden: Only admins can remove jobs.' }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id || !Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: 'Invalid Job ID' }, { status: 400 });
    }

    const deletedJob = await Job.findByIdAndDelete(id);
    if (!deletedJob) {
      return NextResponse.json({ message: 'Job not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Job deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting job:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}