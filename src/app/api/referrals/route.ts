import Referral from '@/models/Referral';
import dbConnect from '@/lib/mongoose';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  await dbConnect();
  const referrals = await Referral.find({});
  return NextResponse.json(referrals);
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const referral = await Referral.create(await req.json());
  return NextResponse.json(referral, { status: 201 });
}