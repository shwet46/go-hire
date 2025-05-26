import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Task from '@/models/Task';
import User from '@/models/User';
import { getSession, isAdmin, isStudent } from '@/lib/auth';
import { Types } from 'mongoose';

// GET: Fetch all active tasks [cite: 2]
export async function GET() {
  await dbConnect();
  try {
    const tasks = await Task.find({ isEnabled: true });
    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

// POST: Create a new task (Admin only) [cite: 4]
export async function POST(req: Request) {
  await dbConnect();
  const session = await getSession();

  if (!session || !(await isAdmin())) { // Only admins can create tasks [cite: 4]
    return NextResponse.json({ message: 'Forbidden: Only admins can configure tasks.' }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { name, points, description, taskType } = body; // [cite: 4]

    if (!name || typeof points !== 'number' || !taskType) {
      return NextResponse.json({ message: 'Missing required fields: name, points, taskType.' }, { status: 400 });
    }

    const newTask = await Task.create({
      name,
      points,
      description,
      taskType,
      isEnabled: true,
    });
    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

// PUT: Update or disable a task (Admin only) [cite: 4]
export async function PUT(req: Request) {
  await dbConnect();
  const session = await getSession();

  if (!session || !(await isAdmin())) { // Only admins can update/disable tasks [cite: 4]
    return NextResponse.json({ message: 'Forbidden: Only admins can configure tasks.' }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { id, ...updates } = body;

    if (!id || !Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: 'Invalid Task ID' }, { status: 400 });
    }

    const updatedTask = await Task.findByIdAndUpdate(id, { ...updates, updatedAt: new Date() }, { new: true }); // [cite: 4]
    if (!updatedTask) {
      return NextResponse.json({ message: 'Task not found' }, { status: 404 });
    }
    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    console.error('Error updating task:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

// POST: Endpoint for students to complete tasks (e.g., daily sign-in)
// This is a generic endpoint; specific task logic will be handled here.
// For 'Daily Sign-In', the client might call this with taskType 'daily_sign_in'.
export async function POST_COMPLETE_TASK(req: Request) {
  await dbConnect();
  const session = await getSession();

  if (!session || !(await isStudent())) { // Only students can complete tasks
    return NextResponse.json({ message: 'Forbidden: Only students can complete tasks.' }, { status: 403 });
  }
  if (!session.user?.id) {
    return NextResponse.json({ message: 'User ID not found in session.' }, { status: 400 });
  }

  try {
    const body = await req.json();
    const { taskType, jobId } = body; // jobId needed for 'apply_for_job'

    const task = await Task.findOne({ taskType, isEnabled: true });
    if (!task) {
      return NextResponse.json({ message: 'Task not found or is disabled.' }, { status: 404 });
    }

    const studentId = new Types.ObjectId(session.user.id);
    const user = await User.findById(studentId);
    if (!user) {
      return NextResponse.json({ message: 'User not found.' }, { status: 404 });
    }

    let message = 'Task completed successfully!';
    let pointsAwarded = task.points;

    switch (taskType) {
      case 'daily_sign_in':
        // Check if user already signed in today
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Start of today
        const lastSignInDate = user.updatedAt; // Assuming updatedAt is roughly last activity

        if (lastSignInDate && lastSignInDate.setHours(0, 0, 0, 0) === today.getTime()) {
          return NextResponse.json({ message: 'Daily sign-in already completed today.' }, { status: 409 });
        }
        // Award points, user's updatedAt will be updated by Mongoose pre-save hook
        user.points = (user.points || 0) + pointsAwarded; // [cite: 3]
        await user.save();
        break;

      case 'apply_for_job':
        if (!jobId || !Types.ObjectId.isValid(jobId)) {
          return NextResponse.json({ message: 'Invalid Job ID for applying.' }, { status: 400 });
        }
        // Prevent duplicate applications
        const existingApplication = await mongoose.models.Application.findOne({ studentId, jobId: new Types.ObjectId(jobId) });
        if (existingApplication) {
          return NextResponse.json({ message: 'Already applied for this job.' }, { status: 409 });
        }

        // Create application and award points
        await mongoose.models.Application.create({
          studentId,
          jobId: new Types.ObjectId(jobId),
          status: 'applied',
          pointsAwarded: pointsAwarded, // [cite: 3]
        });
        user.points = (user.points || 0) + pointsAwarded;
        await user.save();
        message = `Applied for job and earned ${pointsAwarded} points!`;
        break;

      case 'upload_resume':
        if (user.resumeUploaded) {
          return NextResponse.json({ message: 'Resume already uploaded.' }, { status: 409 });
        }
        user.resumeUploaded = true; // [cite: 4]
        user.points = (user.points || 0) + pointsAwarded; // [cite: 4]
        await user.save();
        message = `Resume uploaded and earned ${pointsAwarded} points!`;
        break;

      case 'complete_profile':
        if (user.profileComplete) {
          return NextResponse.json({ message: 'Profile already completed.' }, { status: 409 });
        }
        // This would ideally check specific profile fields, for simplicity, we just toggle a flag.
        // In a real app, you'd check if specific fields (education, skills) are filled.
        user.profileComplete = true; // [cite: 4]
        user.points = (user.points || 0) + pointsAwarded; // [cite: 4]
        await user.save();
        message = `Profile completed and earned ${pointsAwarded} points!`;
        break;

      case 'refer_peer':
        // This task is handled by the user signup process when a referral code is used.
        // It's not typically called directly by a 'complete task' button.
        return NextResponse.json({ message: 'Referral task is completed upon new user signup with a valid code.' }, { status: 400 });

      default:
        return NextResponse.json({ message: 'Invalid task type.' }, { status: 400 });
    }

    return NextResponse.json({ success: true, message, userPoints: user.points, taskName: task.name, pointsAwarded: task.points }, { status: 200 });

  } catch (error) {
    console.error('Error completing task:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}