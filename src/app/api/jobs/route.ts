import Job from '@/models/Job';
import dbConnect from '@/lib/mongoose';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  await dbConnect();
  const jobs = await Job.find({ isApproved: true });
  return NextResponse.json(jobs);
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const job = await Job.create(await req.json());
  return NextResponse.json(job, { status: 201 });
}