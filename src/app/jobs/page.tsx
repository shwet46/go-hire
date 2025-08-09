"use client";
import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription } from "@/components/ui/toast";
import JobsHeader from "@/components/jobs/JobsHeader";
import JobsSearchFilters from "@/components/jobs/JobsSearchFilters";
import JobsStats from "@/components/jobs/JobsStats";
import JobsList from "@/components/jobs/JobsList";

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
  const [toastState, setToastState] = useState<{ open: boolean; title: string; description: string; variant?: "default" | "destructive" | "success" }>({ open: false, title: "", description: "", variant: "default" });

  const showToast = (title: string, description: string, variant: "default" | "destructive" | "success" = "default") => {
    setToastState({ open: true, title, description, variant });
    setTimeout(() => setToastState({ ...toastState, open: false }), 3000);
  };

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
        console.log('API Response:', data); 
        
        if (page === 1) {
          setJobs(data.jobs || []);
        } else {
          setJobs(prev => [...prev, ...(data.jobs || [])]);
        }
        
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
    console.log('Fetching jobs...'); 
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

  const handleApply = () => {
    if (!session) {
      showToast("Login Required", "Please log in to apply for jobs.", "destructive");
      window.location.href = '/login';
      return;
    }
    if ((session.user as ExtendedUser)?.role !== 'student') {
      showToast("Access Denied", "Only students can apply for jobs.", "destructive");
      return;
    }
    showToast("Application Submitted", "Your application was submitted successfully!", "success");
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
    <ToastProvider>
      <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-violet-950/20 pt-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-64 md:-left-96 top-10 w-96 h-96 bg-violet-600/30 rounded-full blur-3xl"></div>
          <div className="absolute -right-64 md:-right-96 bottom-10 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
          <JobsHeader session={session} />
          <JobsSearchFilters
            search={search}
            setSearch={setSearch}
            location={location}
            setLocation={setLocation}
            jobType={jobType}
            setJobType={setJobType}
            handleSearch={handleSearch}
            loading={loading}
          />
          <JobsStats jobsCount={jobs.length} />
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
            <JobsList
              jobs={jobs}
              loading={loading}
              session={session}
              handleApply={handleApply}
              formatDate={formatDate}
            />
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
        <ToastViewport />
        <Toast open={toastState.open} variant={toastState.variant}>
          <ToastTitle>{toastState.title}</ToastTitle>
          <ToastDescription>{toastState.description}</ToastDescription>
        </Toast>
      </div>
    </ToastProvider>
  );
}