import User from '@/models/User';
import dbConnect from '@/lib/mongoose';
import {NextResponse } from 'next/server';

export async function GET() {
  await dbConnect();
  const users = await User.find({ role: 'student' }).sort({ points: -1 }).limit(100);
  return NextResponse.json(users);
}