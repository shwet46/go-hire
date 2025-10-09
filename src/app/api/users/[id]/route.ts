import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import mongoose from 'mongoose';

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
  const { id } = await params;
  const user = (await User.findById(id)
      .select(
        'name role university degree graduationYear skills bio resumeUrl experiences companyHiringFor'
      )
      .lean()) as null | {
      _id: mongoose.Types.ObjectId;
      name?: string;
      role?: string;
      university?: string;
      degree?: string;
      graduationYear?: string;
      skills?: string[];
      bio?: string;
      resumeUrl?: string;
      experiences?: any[];
      companyHiringFor?: string;
    };
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    const shaped = {
      id: user._id.toString(),
      name: user.name || 'User',
      role: user.role,
      university: user.university || null,
      degree: user.degree || null,
      graduationYear: user.graduationYear || null,
      skills: Array.isArray(user.skills) ? user.skills : [],
      bio: user.bio || null,
      resumeUrl: user.resumeUrl || null,
      experiences: (user.experiences || []).map((e: any) => ({
        title: e.title,
        company: e.company,
        employmentType: e.employmentType,
        location: e.location,
        startDate: e.startDate,
        endDate: e.endDate,
        isCurrent: e.isCurrent,
        description: e.description,
        skillsUsed: e.skillsUsed || [],
      })),
      companyHiringFor: user.companyHiringFor || null,
    };
    return NextResponse.json(shaped);
  } catch (e) {
    return NextResponse.json({ error: 'Failed to load profile' }, { status: 500 });
  }
}