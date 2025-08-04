import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth-config';
import Job from '@/models/Job';
import dbConnect from '@/lib/db';

interface ExtendedUser {
  id?: string;
  role?: string;
}

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search');
    const location = searchParams.get('location');
    const jobType = searchParams.get('jobType');
    
    const skip = (page - 1) * limit;
    

    const query: Record<string, unknown> = { 
      isActive: { $ne: false } 
    };
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }
    
    if (jobType) {
      query.type = jobType;
    }
    
    const jobs = await Job.find(query)
      .populate('postedBy', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
    
    const total = await Job.countDocuments(query);
    
    return NextResponse.json({
      jobs: jobs || [],
      total,
      page,
      totalPages: Math.ceil(total / limit),
      hasMore: skip + jobs.length < total
    });
  } catch (error: unknown) {
    console.error('Error fetching jobs:', error);
    // Return empty array instead of error to make jobs publicly visible
    return NextResponse.json({
      jobs: [],
      total: 0,
      page: 1,
      totalPages: 0,
      hasMore: false
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    if ((session.user as ExtendedUser)?.role !== 'recruiter') {
      return NextResponse.json(
        { error: 'Only recruiters can post jobs' },
        { status: 403 }
      );
    }
    
    const { title, company, location, type, salary, description, tags } = await request.json();
    
    // Validate required fields
    if (!title || !company || !location || !salary || !description) {
      return NextResponse.json(
        { error: 'Title, company, location, salary, and description are required' },
        { status: 400 }
      );
    }
    
    // Create new job
    const job = new Job({
      title: title.trim(),
      company: company.trim(),
      location: location.trim(),
      type: type || 'full-time',
      salary: salary.trim(),
      description: description.trim(),
      tags: Array.isArray(tags) ? tags.filter(tag => tag.trim()) : [],
      postedBy: (session.user as ExtendedUser).id,
      isActive: true
    });
    
    const savedJob = await job.save();
    
    // Populate the postedBy field for response
    await savedJob.populate('postedBy', 'name email');
    
    return NextResponse.json(
      { 
        message: 'Job posted successfully', 
        job: savedJob
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error('Error posting job:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}