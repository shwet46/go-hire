"use client";
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { ArrowLeft, MapPin, Clock, DollarSign, Building, Calendar, Bookmark, Share2 } from 'lucide-react';

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  tags: string[];
  createdAt: string;
  postedBy: {
    name: string;
    email: string;
  };
}

interface ExtendedUser {
  role?: string;
}

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(`/api/jobs/${params.id}`);
        if (response.ok) {
          const data = await response.json();
          setJob(data.job);
        }
      } catch (error) {
        console.error('Error fetching job:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchJob();
    }
  }, [params.id]);

  const handleApply = async () => {
    if (!session) {
      router.push('/login');
      return;
    }

    if ((session.user as ExtendedUser)?.role !== 'student') {
      alert('Only students can apply for jobs');
      return;
    }

    setApplying(true);
    try {
      // Add application logic here
      alert('Application submitted successfully!');
    } catch (error) {
      console.error('Error applying:', error);
      alert('Failed to apply');
    } finally {
      setApplying(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-violet-950/20 pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-violet-950/20 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Job not found</h1>
          <Link href="/jobs">
            <button className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-violet-700 hover:to-indigo-700 transition-all duration-200">
              Back to Jobs
            </button>
          </Link>
        </div>
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

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link href="/jobs">
            <button className="mr-4 p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors">
              <ArrowLeft className="text-zinc-400" size={20} />
            </button>
          </Link>
          <h1 className="text-2xl font-bold text-white">Job Details</h1>
        </div>

        {/* Job Header */}
        <div className="bg-gradient-to-br from-zinc-900/90 via-zinc-800/70 to-violet-900/20 backdrop-blur-2xl rounded-xl p-8 border border-zinc-700/50 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-4">{job.title}</h1>
              
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex items-center text-zinc-300">
                  <Building size={18} className="mr-2" />
                  <span>{job.company}</span>
                </div>
                <div className="flex items-center text-zinc-300">
                  <MapPin size={18} className="mr-2" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center text-zinc-300">
                  <Clock size={18} className="mr-2" />
                  <span className="capitalize">{job.type}</span>
                </div>
              </div>

              <div className="flex items-center text-emerald-400 font-semibold mb-4">
                <DollarSign size={20} className="mr-1" />
                <span>{job.salary}</span>
              </div>

              <div className="flex items-center text-zinc-400 text-sm">
                <Calendar size={16} className="mr-2" />
                <span>Posted on {formatDate(job.createdAt)}</span>
              </div>
            </div>

            <div className="flex flex-col space-y-3">
              <button
                onClick={handleApply}
                disabled={applying}
                className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-8 py-3 rounded-lg hover:from-violet-700 hover:to-indigo-700 transition-all duration-200 shadow-lg shadow-violet-900/30 disabled:opacity-50 font-medium"
              >
                {!session ? 'Login to Apply' : applying ? 'Applying...' : 'Apply Now'}
              </button>
              
              <div className="flex space-x-2">
                <button className="p-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg transition-colors">
                  <Bookmark size={20} />
                </button>
                <button className="p-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg transition-colors">
                  <Share2 size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Job Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-gradient-to-br from-zinc-900/90 via-zinc-800/70 to-violet-900/20 backdrop-blur-2xl rounded-xl p-6 border border-zinc-700/50">
              <h2 className="text-xl font-bold text-white mb-4">Job Description</h2>
              <div className="text-zinc-300 leading-relaxed whitespace-pre-wrap">
                {job.description}
              </div>
            </div>

            {/* Skills */}
            {job.tags && job.tags.length > 0 && (
              <div className="bg-gradient-to-br from-zinc-900/90 via-zinc-800/70 to-violet-900/20 backdrop-blur-2xl rounded-xl p-6 border border-zinc-700/50">
                <h2 className="text-xl font-bold text-white mb-4">Required Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {job.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-violet-500/20 text-violet-300 px-3 py-1 rounded-full text-sm border border-violet-500/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Company Info */}
            <div className="bg-gradient-to-br from-zinc-900/90 via-zinc-800/70 to-violet-900/20 backdrop-blur-2xl rounded-xl p-6 border border-zinc-700/50">
              <h3 className="text-lg font-bold text-white mb-4">About the Company</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-zinc-400 text-sm">Company</span>
                  <p className="text-white font-medium">{job.company}</p>
                </div>
                <div>
                  <span className="text-zinc-400 text-sm">Location</span>
                  <p className="text-white">{job.location}</p>
                </div>
                <div>
                  <span className="text-zinc-400 text-sm">Job Type</span>
                  <p className="text-white capitalize">{job.type}</p>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-gradient-to-br from-zinc-900/90 via-zinc-800/70 to-violet-900/20 backdrop-blur-2xl rounded-xl p-6 border border-zinc-700/50">
              <h3 className="text-lg font-bold text-white mb-4">Posted By</h3>
              <div className="space-y-2">
                <p className="text-white font-medium">{job.postedBy.name}</p>
                <p className="text-zinc-400 text-sm">{job.postedBy.email}</p>
              </div>
            </div>

            {/* Similar Jobs */}
            <div className="bg-gradient-to-br from-zinc-900/90 via-zinc-800/70 to-violet-900/20 backdrop-blur-2xl rounded-xl p-6 border border-zinc-700/50">
              <h3 className="text-lg font-bold text-white mb-4">Similar Jobs</h3>
              <div className="space-y-3">
                <Link href="/jobs" className="block p-3 bg-zinc-800/50 hover:bg-zinc-700/50 rounded-lg transition-colors">
                  <h4 className="text-white font-medium text-sm">Frontend Developer</h4>
                  <p className="text-zinc-400 text-xs">Tech Corp • San Francisco</p>
                </Link>
                <Link href="/jobs" className="block p-3 bg-zinc-800/50 hover:bg-zinc-700/50 rounded-lg transition-colors">
                  <h4 className="text-white font-medium text-sm">React Developer</h4>
                  <p className="text-zinc-400 text-xs">Startup Inc • Remote</p>
                </Link>
              </div>
              <Link href="/jobs">
                <button className="w-full mt-4 text-violet-400 hover:text-violet-300 text-sm font-medium">
                  View All Jobs
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
