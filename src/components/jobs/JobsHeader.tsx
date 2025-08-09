import Link from 'next/link';
import { Plus } from 'lucide-react';

interface ExtendedUser {
  role?: string;
}

export default function JobsHeader({ session }: { session: { user?: ExtendedUser } | null }) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between mb-12">
      <div className="text-center md:text-left mb-6 md:mb-0">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-400 via-purple-500 to-indigo-500 bg-clip-text text-transparent mb-4">
          Find Your Dream Job
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
          Discover amazing opportunities from top companies looking for talented individuals like you
        </p>
      </div>
      {session && (session.user as ExtendedUser)?.role === 'recruiter' && (
        <Link href="/jobs/post">
          <button className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-violet-700 hover:to-indigo-700 transition-all duration-200 shadow-lg shadow-violet-900/30 flex items-center space-x-2">
            <Plus size={20} />
            <span>Post a Job</span>
          </button>
        </Link>
      )}
    </div>
  );
}
