import Task from '@/models/Task';
import dbConnect from '@/lib/mongoose';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  await dbConnect();
  const tasks = await Task.find({});
  return NextResponse.json(tasks);
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const task = await Task.create(await req.json());
  return NextResponse.json(task, { status: 201 });
}