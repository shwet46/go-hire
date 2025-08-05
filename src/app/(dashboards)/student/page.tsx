"use client";
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  BookOpen, 
  Briefcase, 
  Target, 
  TrendingUp, 
  MapPin,
  Building,
  DollarSign,
  ArrowRight
} from 'lucide-react';

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  createdAt: string;
}

interface DashboardStats {
  totalJobs: number;
  appliedJobs: number;
  savedJobs: number;
  completedPractices: number;
}

export default function StudentDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats>({
    totalJobs: 0,
    appliedJobs: 0,
    savedJobs: 0,
    completedPractices: 0
  });
  const [recentJobs, setRecentJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      router.push('/login');
      return;
    }

    fetchDashboardData();
  }, [session, status, router]);

  const fetchDashboardData = async () => {
    try {
      // Fetch recent jobs
      const jobsResponse = await fetch('/api/jobs?limit=5');
      if (jobsResponse.ok) {
        const jobsData = await jobsResponse.json();
        setRecentJobs(jobsData.jobs || []);
        setStats(prev => ({ ...prev, totalJobs: jobsData.total || 0 }));
      }

      // TODO: Fetch user-specific data (applications, saved jobs, practice progress)
      // For now, using placeholder values that could be fetched from user profile
      setStats(prev => ({
        ...prev,
        appliedJobs: 0, // Would come from user applications
        savedJobs: 0,   // Would come from user saved jobs
        completedPractices: 0 // Would come from user practice history
      }));

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-violet-950/20 pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-violet-950/20 pt-20">
      {/* ...existing background effects... */}
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome back, {session?.user?.name || 'Developer'}!
          </h1>
          <p className="text-zinc-400 text-lg">
            Ready to find your next opportunity? Here&apos;s what&apos;s happening in your job search.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-br from-zinc-900/90 via-zinc-800/70 to-violet-900/20 backdrop-blur-2xl rounded-xl p-6 border border-zinc-700/50">
            <div className="flex items-center justify-between mb-4">
              <Briefcase className="h-8 w-8 text-violet-400" />
              <span className="text-2xl font-bold text-white">{stats.totalJobs}</span>
            </div>
            <h3 className="text-zinc-400 text-sm">Available Jobs</h3>
          </div>

          <div className="bg-gradient-to-br from-zinc-900/90 via-zinc-800/70 to-indigo-900/20 backdrop-blur-2xl rounded-xl p-6 border border-zinc-700/50">
            <div className="flex items-center justify-between mb-4">
              <Target className="h-8 w-8 text-indigo-400" />
              <span className="text-2xl font-bold text-white">{stats.appliedJobs}</span>
            </div>
            <h3 className="text-zinc-400 text-sm">Applications Sent</h3>
          </div>

          <div className="bg-gradient-to-br from-zinc-900/90 via-zinc-800/70 to-emerald-900/20 backdrop-blur-2xl rounded-xl p-6 border border-zinc-700/50">
            <div className="flex items-center justify-between mb-4">
              <BookOpen className="h-8 w-8 text-emerald-400" />
              <span className="text-2xl font-bold text-white">{stats.savedJobs}</span>
            </div>
            <h3 className="text-zinc-400 text-sm">Saved Jobs</h3>
          </div>

          <div className="bg-gradient-to-br from-zinc-900/90 via-zinc-800/70 to-amber-900/20 backdrop-blur-2xl rounded-xl p-6 border border-zinc-700/50">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="h-8 w-8 text-amber-400" />
              <span className="text-2xl font-bold text-white">{stats.completedPractices}</span>
            </div>
            <h3 className="text-zinc-400 text-sm">Practice Sessions</h3>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Jobs */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-zinc-900/90 via-zinc-800/70 to-violet-900/20 backdrop-blur-2xl rounded-xl p-6 border border-zinc-700/50">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Latest Opportunities</h2>
                <Link href="/jobs">
                  <button className="text-violet-400 hover:text-violet-300 text-sm font-medium flex items-center space-x-1">
                    <span>View All</span>
                    <ArrowRight size={16} />
                  </button>
                </Link>
              </div>

              {recentJobs.length === 0 ? (
                <div className="text-center py-8">
                  <Briefcase className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
                  <p className="text-zinc-400">No jobs available at the moment</p>
                  <p className="text-zinc-500 text-sm">Check back later for new opportunities</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentJobs.map((job) => (
                    <div key={job._id} className="p-4 bg-zinc-800/50 rounded-lg border border-zinc-700/50 hover:border-violet-500/50 transition-all duration-200">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-white">{job.title}</h3>
                        <span className="text-xs text-zinc-400">{formatDate(job.createdAt)}</span>
                      </div>
                      
                      <div className="flex items-center text-zinc-400 text-sm space-x-4 mb-3">
                        <div className="flex items-center space-x-1">
                          <Building size={14} />
                          <span>{job.company}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin size={14} />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <DollarSign size={14} />
                          <span>{job.salary}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-xs bg-violet-500/20 text-violet-300 px-2 py-1 rounded-full">
                          {job.type}
                        </span>
                        <Link href={`/jobs/${job._id}`}>
                          <button className="text-violet-400 hover:text-violet-300 text-sm font-medium">
                            View Details
                          </button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            {/* Quick Actions Card */}
            <div className="bg-gradient-to-br from-zinc-900/90 via-zinc-800/70 to-indigo-900/20 backdrop-blur-2xl rounded-xl p-6 border border-zinc-700/50">
              <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
              <div className="space-y-4">
                <Link href="/jobs">
                  <button className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-3 px-4 rounded-lg hover:from-violet-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center space-x-2">
                    <Briefcase size={18} />
                    <span>Browse Jobs</span>
                  </button>
                </Link>
                
                <Link href="/practice">
                  <button className="w-full border border-zinc-600 text-zinc-300 py-3 px-4 rounded-lg hover:border-emerald-500 hover:text-emerald-400 transition-all duration-200 flex items-center justify-center space-x-2">
                    <Target size={18} />
                    <span>Practice Skills</span>
                  </button>
                </Link>
              </div>
            </div>

            {/* Profile Completion */}
            <div className="bg-gradient-to-br from-zinc-900/90 via-zinc-800/70 to-emerald-900/20 backdrop-blur-2xl rounded-xl p-6 border border-zinc-700/50">
              <h2 className="text-xl font-bold text-white mb-4">Profile Status</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400 text-sm">Profile Completion</span>
                  <span className="text-emerald-400 font-medium">75%</span>
                </div>
                <div className="w-full bg-zinc-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-2 rounded-full" style={{width: '75%'}}></div>
                </div>
                <p className="text-zinc-500 text-sm">Add more skills to improve your visibility</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}