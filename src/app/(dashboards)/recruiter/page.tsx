"use client";
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Plus, 
  Briefcase, 
  Users, 
  Eye,
  Calendar,
  TrendingUp,
  MapPin,
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
  applicants?: number;
  views?: number;
}

interface RecruiterStats {
  totalJobs: number;
  activeJobs: number;
  totalApplicants: number;
  jobViews: number;
}

export default function RecruiterDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<RecruiterStats>({
    totalJobs: 0,
    activeJobs: 0,
    totalApplicants: 0,
    jobViews: 0
  });
  const [myJobs, setMyJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      router.push('/login');
      return;
    }

    fetchRecruiterData();
  }, [session, status, router]);

  const fetchRecruiterData = async () => {
    try {
      // Fetch all jobs to calculate stats (in a real app, you'd have a recruiter-specific endpoint)
      const jobsResponse = await fetch('/api/jobs');
      if (jobsResponse.ok) {
        const jobsData = await jobsResponse.json();
        const allJobs = jobsData.jobs || [];
        
        // Filter jobs posted by current user (if we had user ID tracking)
        // For now, showing recent jobs as placeholder
        const recentJobs = allJobs.slice(0, 5);
        setMyJobs(recentJobs);
        
        setStats({
          totalJobs: allJobs.length,
          activeJobs: allJobs.length, // Assuming all are active
          totalApplicants: 0, // Would need to aggregate from applications
          jobViews: 0 // Would need to track views
        });
      }

    } catch (error) {
      console.error('Error fetching recruiter data:', error);
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
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-64 md:-left-96 top-10 w-96 h-96 bg-violet-600/30 rounded-full blur-3xl"></div>
        <div className="absolute -right-64 md:-right-96 bottom-10 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Welcome back, {session?.user?.name || 'Recruiter'}!
            </h1>
            <p className="text-zinc-400 text-lg">
              Manage your job postings and find the perfect candidates for your startup.
            </p>
          </div>
          
          <Link href="/jobs/post">
            <button className="mt-4 md:mt-0 bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-violet-700 hover:to-indigo-700 transition-all duration-200 shadow-lg shadow-violet-900/30 flex items-center space-x-2">
              <Plus size={20} />
              <span>Post New Opportunity</span>
            </button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-br from-zinc-900/90 via-zinc-800/70 to-violet-900/20 backdrop-blur-2xl rounded-xl p-6 border border-zinc-700/50">
            <div className="flex items-center justify-between mb-4">
              <Briefcase className="h-8 w-8 text-violet-400" />
              <span className="text-2xl font-bold text-white">{stats.totalJobs}</span>
            </div>
            <h3 className="text-zinc-400 text-sm">Total Opportunities</h3>
            <p className="text-zinc-500 text-xs mt-1">Posted on platform</p>
          </div>

          <div className="bg-gradient-to-br from-zinc-900/90 via-zinc-800/70 to-emerald-900/20 backdrop-blur-2xl rounded-xl p-6 border border-zinc-700/50">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="h-8 w-8 text-emerald-400" />
              <span className="text-2xl font-bold text-white">{stats.activeJobs}</span>
            </div>
            <h3 className="text-zinc-400 text-sm">Active Listings</h3>
            <p className="text-zinc-500 text-xs mt-1">Currently hiring</p>
          </div>

          <div className="bg-gradient-to-br from-zinc-900/90 via-zinc-800/70 to-indigo-900/20 backdrop-blur-2xl rounded-xl p-6 border border-zinc-700/50">
            <div className="flex items-center justify-between mb-4">
              <Users className="h-8 w-8 text-indigo-400" />
              <span className="text-2xl font-bold text-white">{stats.totalApplicants}</span>
            </div>
            <h3 className="text-zinc-400 text-sm">Total Applications</h3>
            <p className="text-zinc-500 text-xs mt-1">Received this month</p>
          </div>

          <div className="bg-gradient-to-br from-zinc-900/90 via-zinc-800/70 to-amber-900/20 backdrop-blur-2xl rounded-xl p-6 border border-zinc-700/50">
            <div className="flex items-center justify-between mb-4">
              <Eye className="h-8 w-8 text-amber-400" />
              <span className="text-2xl font-bold text-white">{stats.jobViews}</span>
            </div>
            <h3 className="text-zinc-400 text-sm">Profile Views</h3>
            <p className="text-zinc-500 text-xs mt-1">This week</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* My Jobs */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-zinc-900/90 via-zinc-800/70 to-violet-900/20 backdrop-blur-2xl rounded-xl p-6 border border-zinc-700/50">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Recent Opportunities</h2>
                <Link href="/jobs">
                  <button className="text-violet-400 hover:text-violet-300 text-sm font-medium flex items-center space-x-1">
                    <span>Manage All</span>
                    <ArrowRight size={16} />
                  </button>
                </Link>
              </div>

              {myJobs.length === 0 ? (
                <div className="text-center py-12">
                  <Briefcase className="h-16 w-16 text-zinc-600 mx-auto mb-6" />
                  <h3 className="text-xl font-semibold text-white mb-2">No opportunities posted yet</h3>
                  <p className="text-zinc-400 mb-2">Start building your dream team by posting your first opportunity</p>
                  <p className="text-zinc-500 text-sm mb-6">Perfect for startup roles, freelance projects, and contract work</p>
                  <Link href="/jobs/post">
                    <button className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-8 py-3 rounded-lg hover:from-violet-700 hover:to-indigo-700 transition-all duration-200 shadow-lg shadow-violet-900/30">
                      Post Your First Opportunity
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {myJobs.map((job) => (
                    <div key={job._id} className="p-4 bg-zinc-800/50 rounded-lg border border-zinc-700/50 hover:border-violet-500/50 transition-all duration-200 group">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-white group-hover:text-violet-300 transition-colors">{job.title}</h3>
                          <p className="text-zinc-400 text-sm">{job.company}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-zinc-400">{formatDate(job.createdAt)}</span>
                          <div className="mt-1">
                            <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded-full">
                              Active
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap items-center text-zinc-400 text-sm gap-4 mb-4">
                        <div className="flex items-center space-x-1">
                          <MapPin size={14} />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <DollarSign size={14} />
                          <span>{job.salary}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users size={14} />
                          <span>{job.applicants || 0} applicants</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye size={14} />
                          <span>{job.views || 0} views</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-xs bg-violet-500/20 text-violet-300 px-2 py-1 rounded-full capitalize">
                          {job.type ? job.type.replace('-', ' ') : 'Full-time'}
                        </span>
                        <div className="flex space-x-3">
                          <Link href={`/jobs/${job._id}`}>
                            <button className="text-violet-400 hover:text-violet-300 text-sm font-medium">
                              View
                            </button>
                          </Link>
                          <button className="text-zinc-400 hover:text-zinc-300 text-sm font-medium">
                            Edit
                          </button>
                          <button className="text-zinc-400 hover:text-red-400 text-sm font-medium">
                            Archive
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-zinc-900/90 via-zinc-800/70 to-indigo-900/20 backdrop-blur-2xl rounded-xl p-6 border border-zinc-700/50">
              <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
              <div className="space-y-3">
                <Link href="/jobs/post" className="block">
                  <button className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-3 px-4 rounded-lg hover:from-violet-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg shadow-violet-900/30">
                    <Plus size={18} />
                    <span>Post New Opportunity</span>
                  </button>
                </Link>
                
                <button className="w-full border border-zinc-600 text-zinc-300 py-3 px-4 rounded-lg hover:border-emerald-500 hover:text-emerald-400 hover:bg-emerald-500/5 transition-all duration-200 flex items-center justify-center space-x-2">
                  <Users size={18} />
                  <span>View Applications</span>
                </button>
                
                <button className="w-full border border-zinc-600 text-zinc-300 py-3 px-4 rounded-lg hover:border-amber-500 hover:text-amber-400 hover:bg-amber-500/5 transition-all duration-200 flex items-center justify-center space-x-2">
                  <TrendingUp size={18} />
                  <span>Analytics Dashboard</span>
                </button>

                <button className="w-full border border-zinc-600 text-zinc-300 py-3 px-4 rounded-lg hover:border-blue-500 hover:text-blue-400 hover:bg-blue-500/5 transition-all duration-200 flex items-center justify-center space-x-2">
                  <Calendar size={18} />
                  <span>Schedule Interviews</span>
                </button>
              </div>
            </div>

            {/* Startup Hiring Tips */}
            <div className="bg-gradient-to-br from-zinc-900/90 via-zinc-800/70 to-emerald-900/20 backdrop-blur-2xl rounded-xl p-6 border border-zinc-700/50">
              <h2 className="text-xl font-bold text-white mb-4">Startup Hiring Tips</h2>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-zinc-800/50 rounded-lg border border-zinc-700/30">
                  <p className="text-zinc-300"><span className="text-violet-400">💡</span> Emphasize growth potential and learning opportunities</p>
                </div>
                <div className="p-3 bg-zinc-800/50 rounded-lg border border-zinc-700/30">
                  <p className="text-zinc-300"><span className="text-emerald-400">💰</span> Consider equity compensation for early employees</p>
                </div>
                <div className="p-3 bg-zinc-800/50 rounded-lg border border-zinc-700/30">
                  <p className="text-zinc-300"><span className="text-indigo-400">🎯</span> Highlight your mission and impact</p>
                </div>
                <div className="p-3 bg-zinc-800/50 rounded-lg border border-zinc-700/30">
                  <p className="text-zinc-300"><span className="text-amber-400">⚡</span> Move fast - top talent gets snapped up quickly</p>
                </div>
              </div>
            </div>

            {/* Platform Stats */}
            <div className="bg-gradient-to-br from-zinc-900/90 via-zinc-800/70 to-purple-900/20 backdrop-blur-2xl rounded-xl p-6 border border-zinc-700/50">
              <h2 className="text-lg font-bold text-white mb-4">Platform Activity</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Active developers</span>
                  <span className="text-white font-medium">1,247</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">New this week</span>
                  <span className="text-emerald-400 font-medium">+89</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Response rate</span>
                  <span className="text-violet-400 font-medium">94%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}