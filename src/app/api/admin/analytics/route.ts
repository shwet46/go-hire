import Task from '@/models/Task';
import Referral from '@/models/Referral';
import User from '@/models/User';
import dbConnect from '@/lib/mongoose';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  await dbConnect();
  const totalPoints = await User.aggregate([{ $group: { _id: null, sum: { $sum: '$points' } } }]);
  const dailyUsers = await User.find({ createdAt: { $gte: new Date(Date.now() - 86400000) } }).countDocuments();
  const referrals = await Referral.find({ isSuccessful: true }).countDocuments();
  const taskCount = await Task.countDocuments();
  return NextResponse.json({ totalPoints: totalPoints[0]?.sum || 0, dailyUsers, referrals, taskCount });
}
