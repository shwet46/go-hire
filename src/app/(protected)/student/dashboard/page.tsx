'use client'; 

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function StudentDashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/auth/signin');
    } else if (session.user?.role !== 'student') {
      router.push('/unauthorized');
    }
  }, [session, status, router]);

  if (status === 'loading' || !session || session.user?.role !== 'student') {
    return (
      <div className="flex justify-center items-center min-h-screen text-xl text-gray-700">
        Loading or redirecting...
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Student Dashboard</h1>
      <p className="text-lg text-gray-700">Welcome, {session.user.name}! Your role is: {session.user.role}</p>
      <p className="text-md text-gray-600 mt-2">Total Points: {session.user.points ?? 0}</p>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-3">Tasks</h2>
          <p>Complete career-focused tasks to earn points.</p>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">View Tasks</button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-3">Job Board</h2>
          <p>Explore active job postings.</p>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Browse Jobs</button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-3">Referrals</h2>
          <p>Refer peers and earn points on their signup.</p>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Manage Referrals</button>
        </div>
      </div>
    </div>
  );
}