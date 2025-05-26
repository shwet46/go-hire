import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import User from '@/models/User';
import { getSession, isAdmin } from '@/lib/auth';
import { Types } from 'mongoose';

// GET: View/edit/delete Student and Recruiter accounts (Admin only) [cite: 4]
export async function GET(req: Request) {
  await dbConnect();
  const session = await getSession();

  if (!session || !(await isAdmin())) { // Only admins can view users [cite: 4]
    return NextResponse.json({ message: 'Forbidden: Only admins can view user accounts.' }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const roleFilter = searchParams.get('role'); // Optional filter by role

    const query: { role?: string } = {};
    if (roleFilter && ['student', 'recruiter'].includes(roleFilter)) {
      query.role = roleFilter;
    }

    const users = await User.find(query).select('-password'); // Exclude password if it existed (though not used with OAuth)
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

// PUT: Edit user accounts (Admin only) [cite: 4]
export async function PUT(req: Request) {
  await dbConnect();
  const session = await getSession();

  if (!session || !(await isAdmin())) { // Only admins can edit users [cite: 4]
    return NextResponse.json({ message: 'Forbidden: Only admins can edit user accounts.' }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { id, ...updates } = body;

    if (!id || !Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: 'Invalid User ID' }, { status: 400 });
    }

    // Prevent admin from changing their own role to something else or deleting themselves via this endpoint
    if (session.user?.id === id && updates.role && updates.role !== 'admin') {
      return NextResponse.json({ message: 'Admin cannot change their own role or delete themselves via this endpoint.' }, { status: 403 });
    }

    const updatedUser = await User.findByIdAndUpdate(id, { ...updates, updatedAt: new Date() }, { new: true }).select('-password');
    if (!updatedUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

// DELETE: Delete user accounts (Admin only) [cite: 4]
export async function DELETE(req: Request) {
  await dbConnect();
  const session = await getSession();

  if (!session || !(await isAdmin())) { // Only admins can delete users [cite: 4]
    return NextResponse.json({ message: 'Forbidden: Only admins can delete user accounts.' }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id || !Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: 'Invalid User ID' }, { status: 400 });
    }

    // Prevent admin from deleting themselves
    if (session.user?.id === id) {
      return NextResponse.json({ message: 'Forbidden: Admin cannot delete their own account.' }, { status: 403 });
    }

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}