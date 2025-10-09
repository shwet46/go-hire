'use client';
import React from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

interface ExtendedUser {
  role?: string;
}

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: string;
}

export default function AuthGuard({ children, requiredRole = 'recruiter' }: AuthGuardProps) {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-violet-950/20 pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-violet-950/20 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Please sign in to post jobs</h1>
          <Link href="/login">
            <button className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-violet-700 hover:to-indigo-700 transition-all duration-200">
              Sign In
            </button>
          </Link>
        </div>
      </div>
    );
  }

  if ((session.user as ExtendedUser)?.role !== requiredRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-violet-950/20 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">
            Only {requiredRole}s can access this page
          </h1>
          <Link href="/jobs">
            <button className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-violet-700 hover:to-indigo-700 transition-all duration-200">
              Browse Jobs
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
