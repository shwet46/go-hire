import Task from '@/models/Task';
import dbConnect from '@/lib/mongoose';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest, { params }) {
  await dbConnect();
  const updated = await Task.findByIdAndUpdate(params.id, await req.json(), { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest, { params }) {
  await dbConnect();
  await Task.findByIdAndDelete(params.id);
  return NextResponse.json({}, { status: 204 });
}