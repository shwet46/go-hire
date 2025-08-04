"use client";
import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { Search, MapPin, Clock, DollarSign, Building, Plus, ChevronDown } from 'lucide-react'

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  createdAt: string;
  tags: string[];
  postedBy: {
    name: string;
    email: string;
  };
}

interface ExtendedUser {
  role?: string;
}

export default function JobsPage() {
  const { data: session } = useSession();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        ...(search && { search }),
        ...(location && { location }),
        ...(jobType && { jobType })
      });

      const response = await fetch(`/api/jobs?${params}`);
      if (response.ok) {
        const data = await response.json();
        console.log('API Response:', data); // Debug log
        
        if (page === 1) {
          setJobs(data.jobs || []);
        } else {
          setJobs(prev => [...prev, ...(data.jobs || [])]);
        }
        
        // Use hasMore from API response
        setHasMore(data.hasMore || false);
      } else {
        console.error('Failed to fetch jobs:', response.status, response.statusText);
        setJobs([]);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  }, [page, search, location, jobType]);

  useEffect(() => {
    console.log('Fetching jobs...'); // Debug log
    fetchJobs();
  }, [fetchJobs]);

  const handleSearch = () => {
    setPage(1);
    setHasMore(true);
    fetchJobs();
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
    }
  };

  const handleApply = (jobId: string) => {
    if (!session) {
      // Show message and redirect to login
      alert('Please log in to apply for jobs');
      window.location.href = '/login';
      return;
    }
    
    if ((session.user as ExtendedUser)?.role !== 'student') {
      alert('Only students can apply for jobs');
      return;
    }
    
    // Handle job application logic here
    console.log('Applying for job:', jobId);
    alert('Application submitted successfully!');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-violet-950/20 pt-20">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-64 md:-left-96 top-10 w-96 h-96 bg-violet-600/30 rounded-full blur-3xl"></div>
        <div className="absolute -right-64 md:-right-96 bottom-10 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Header with Post Job Button for Recruiters */}
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

        {/* Search and Filters */}
        <div className="bg-gradient-to-br from-zinc-900/90 via-zinc-800/70 to-violet-900/20 backdrop-blur-2xl rounded-xl p-6 border border-zinc-700/50 mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
              <input
                type="text"
                placeholder="Search jobs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all duration-200"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all duration-200"
              />
            </div>
            <div className="relative">
              <select 
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                className="appearance-none px-4 py-3 pr-10 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all duration-200"
              >
                <option value="">Job Type</option>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" size={20} />
            </div>
            <button 
              onClick={handleSearch}
              disabled={loading}
              className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-violet-700 hover:to-indigo-700 transition-all duration-200 shadow-lg shadow-violet-900/30 disabled:opacity-50"
            >
              {loading ? 'Searching...' : 'Search Jobs'}
            </button>
          </div>
        </div>

        {/* Job Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-zinc-900/90 via-zinc-800/70 to-violet-900/20 backdrop-blur-2xl rounded-xl p-6 border border-zinc-700/50 text-center">
            <div className="text-3xl font-bold text-violet-400 mb-2">{jobs.length}</div>
            <div className="text-zinc-400">Available Jobs</div>
          </div>
          <div className="bg-gradient-to-br from-zinc-900/90 via-zinc-800/70 to-violet-900/20 backdrop-blur-2xl rounded-xl p-6 border border-zinc-700/50 text-center">
            <div className="text-3xl font-bold text-indigo-400 mb-2">150+</div>
            <div className="text-zinc-400">Companies Hiring</div>
          </div>
          <div className="bg-gradient-to-br from-zinc-900/90 via-zinc-800/70 to-violet-900/20 backdrop-blur-2xl rounded-xl p-6 border border-zinc-700/50 text-center">
            <div className="text-3xl font-bold text-emerald-400 mb-2">2,500+</div>
            <div className="text-zinc-400">Successful Hires</div>
          </div>
        </div>

        {/* Job Listings */}
        {loading && jobs.length === 0 ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mx-auto mb-4"></div>
            <p className="text-zinc-400">Loading jobs...</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-gradient-to-br from-zinc-900/90 via-zinc-800/70 to-violet-900/20 backdrop-blur-2xl rounded-xl p-8 border border-zinc-700/50 max-w-md mx-auto">
              <h3 className="text-xl font-bold text-white mb-4">No Jobs Available</h3>
              <p className="text-zinc-400 mb-6">
                {search || location || jobType 
                  ? "No jobs match your search criteria. Try adjusting your filters." 
                  : "Be the first to post a job on our platform!"
                }
              </p>
              {!session && (
                <div className="mb-4">
                  <Link href="/login">
                    <button className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 mr-3">
                      Login to Apply
                    </button>
                  </Link>
                </div>
              )}
              {session && (session.user as ExtendedUser)?.role === 'recruiter' && (
                <Link href="/jobs/post">
                  <button className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-violet-700 hover:to-indigo-700 transition-all duration-200">
                    Post the First Job
                  </button>
                </Link>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-gradient-to-br from-zinc-900/90 via-zinc-800/70 to-violet-900/20 backdrop-blur-2xl rounded-xl p-6 border border-zinc-700/50 hover:border-violet-500/50 transition-all duration-300 group"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-violet-300 transition-colors mb-1">
                          {job.title}
                        </h3>
                        <div className="flex flex-wrap items-center text-zinc-400 text-sm gap-4">
                          <div className="flex items-center space-x-1">
                            <Building size={16} />
                            <span>{job.company}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin size={16} />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock size={16} />
                            <span>{formatDate(job.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center text-emerald-400 font-semibold mb-1">
                          <DollarSign size={16} />
                          <span>{job.salary}</span>
                        </div>
                        <span className="text-xs bg-violet-500/20 text-violet-300 px-2 py-1 rounded-full capitalize">
                          {job.type.replace('-', ' ')}
                        </span>
                      </div>
                    </div>

                    <p className="text-zinc-400 mb-4 line-clamp-2">
                      {job.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {job.tags?.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="text-xs bg-zinc-700/50 text-zinc-300 px-2 py-1 rounded-md"
                          >
                            {tag}
                          </span>
                        ))}
                        {job.tags && job.tags.length > 3 && (
                          <span className="text-xs text-zinc-500">
                            +{job.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2 lg:ml-6">
                    <Link href={`/jobs/${job._id}`}>
                      <button className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-violet-700 hover:to-indigo-700 transition-all duration-200 shadow-lg shadow-violet-900/30 w-full lg:w-auto">
                        View Details
                      </button>
                    </Link>
                    <button 
                      onClick={() => handleApply(job._id)}
                      className={`px-6 py-2 rounded-lg transition-all duration-200 w-full lg:w-auto ${
                        !session 
                          ? 'border border-emerald-600 text-emerald-300 hover:border-emerald-500 hover:text-emerald-400' 
                          : 'border border-zinc-600 text-zinc-300 hover:border-emerald-500 hover:text-emerald-400'
                      }`}
                    >
                      {!session ? 'Login to Apply' : 'Quick Apply'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More */}
        {jobs.length > 0 && hasMore && (
          <div className="text-center mt-12">
            <button 
              onClick={handleLoadMore}
              disabled={loading}
              className="bg-gradient-to-r from-zinc-800 to-zinc-700 text-white px-8 py-3 rounded-lg hover:from-zinc-700 hover:to-zinc-600 transition-all duration-200 border border-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Loading...' : 'Load More Jobs'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}