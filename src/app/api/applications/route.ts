import Application from '@/models/Application';
import dbConnect from '@/lib/mongoose';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  await dbConnect();
  const apps = await Application.find({}).populate('job').populate('applicant');
  return NextResponse.json(apps);
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const app = await Application.create(await req.json());
  return NextResponse.json(app, { status: 201 });
}
