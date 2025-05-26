import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import User from '@/models/User';
import { getSession } from '@/lib/auth';
import { IUser } from '@/types/models'; // Import IUser for type assertion

// GET: Real-time ranking of students based on task points [cite: 5]
export async function GET(req: Request) {
  await dbConnect();
  const session = await getSession();

  // Leaderboard might be public or require authentication,
  // based on requirements, it seems public or visible to any logged-in user.
  // Adding a basic check for logged-in status.
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const skill = searchParams.get('skill'); // Filter by skills [cite: 6]
    const college = searchParams.get('college'); // Filter by college/university [cite: 6]
    const experienceLevel = searchParams.get('experienceLevel'); // Filter by experience level [cite: 7]
    const referralFilter = searchParams.get('referrals'); // Filter by referrals [cite: 7]

    let matchQuery: any = { role: 'student' }; // Only show students on the leaderboard

    // NOTE: For 'skills', 'college', 'experienceLevel', 'referrals'
    // you would need these fields populated on the User model.
    // For this example, I'll add basic filtering assuming direct fields or simple checks.
    // Real-world implementation might need more complex text search, arrays, or aggregation lookups.

    if (skill) {
      // Assuming 'skills' is an array of strings on the User model
      matchQuery.skills = { $in: [new RegExp(skill, 'i')] }; // Case-insensitive skill match
    }
    if (college) {
      matchQuery.college = { $regex: new RegExp(college, 'i') }; // Case-insensitive college name
    }
    if (experienceLevel) {
      matchQuery.experienceLevel = experienceLevel; // Assuming exact match for experience levels
    }
    if (referralFilter === 'true') {
      // This would require a more complex aggregation to count successful referrals per user
      // For simplicity, this example will just filter for users who have *any* referral code
      // and thus *could* have referred someone. A full implementation needs `Referral` model join.
      matchQuery.referralCode = { $exists: true, $ne: null };
    }

    const leaderboard = await User.aggregate([
      { $match: matchQuery },
      { $project: { name: 1, email: 1, points: 1, _id: 1, image: 1 } }, // Select relevant fields
      { $sort: { points: -1 } }, // Sort by points in descending order
      { $limit: 100 } // Limit to top 100 or adjust as needed
    ]);

    return NextResponse.json(leaderboard, { status: 200 });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}