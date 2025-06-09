import Job from '@/models/Job';
import dbConnect from '@/lib/mongoose';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest, { params }) {
  await dbConnect();
  const updated = await Job.findByIdAndUpdate(params.id, await req.json(), { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest, { params }) {
  await dbConnect();
  await Job.findByIdAndDelete(params.id);
  return NextResponse.json({}, { status: 204 });
}