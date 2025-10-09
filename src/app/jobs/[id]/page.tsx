'use client';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter, usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import {
  ArrowLeft,
  MapPin,
  Clock,
  DollarSign,
  Building,
  Calendar,
  Bookmark,
  Share2,
} from 'lucide-react';

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
    _id?: string;
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
  const pathname = usePathname();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [jobsList, setJobsList] = useState<Job[]>([]);
  const [bookmarked, setBookmarked] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  // Application form state
  const [note, setNote] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [applied, setApplied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recruiterHireCount, setRecruiterHireCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        if (!params.id) return;
        // Support both string and array for params.id
        const jobId = Array.isArray(params.id) ? params.id[0] : params.id;
        const response = await fetch(`/api/jobs/${jobId}`);
        if (response.ok) {
          const data = await response.json();
          setJob(data.job);
          if (typeof data.recruiterHireCount === 'number') {
            setRecruiterHireCount(data.recruiterHireCount);
          }
        } else {
          setJob(null);
        }
      } catch (error) {
        console.error('Error fetching job:', error);
        setJob(null);
      } finally {
        setLoading(false);
      }
    };

    const fetchJobsList = async () => {
      try {
        const response = await fetch('/api/jobs?limit=8');
        if (response.ok) {
          const data = await response.json();
          setJobsList(data.jobs || []);
        }
      } catch {
        setJobsList([]);
      }
    };

    fetchJob();
    fetchJobsList();
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
    if (!job) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`/api/jobs/${job._id}/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ note }),
      });
      if (res.ok) {
        setApplied(true);
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || 'Failed to apply');
      }
    } catch {
      setError('Failed to apply');
    }
    setSubmitting(false);
  };

  const handleBookmark = () => {
    if (!session) {
      router.push('/login');
      return;
    }
    setBookmarked((prev) => !prev);
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: job?.title,
          text: `Check out this job: ${job?.title} at ${job?.company}`,
          url,
        });
      } catch {
        // ignore
      }
    } else {
      setShareOpen(true);
    }
  };

  const handleDelete = async () => {
    if (!session || (session.user as ExtendedUser)?.role !== 'recruiter') return;
    if (!window.confirm('Are you sure you want to delete this job?')) return;
    try {
      const response = await fetch(`/api/jobs/${job?._id}`, { method: 'DELETE' });
      if (response.ok) {
        router.push('/jobs');
      } else {
        alert('Failed to delete job.');
      }
    } catch {
      alert('Failed to delete job.');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
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
          <h1 className="text-2xl font-bold text-white flex-1">Job Details</h1>
          {/* Edit/Delete buttons for recruiters */}
          {session?.user && (session.user as ExtendedUser)?.role === 'recruiter' && (
            <>
              <Link href={`/jobs/${job._id}/edit`}>
                <button className="ml-4 px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-lg hover:from-violet-700 hover:to-indigo-700 transition-all duration-200">
                  Edit Job
                </button>
              </Link>
              <button
                className="ml-2 px-4 py-2 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-lg hover:from-red-700 hover:to-pink-700 transition-all duration-200"
                onClick={handleDelete}
              >
                Delete Job
              </button>
            </>
          )}
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
              {session?.user && (session.user as ExtendedUser)?.role === 'student' && (
                <button
                  onClick={handleApply}
                  disabled={submitting || applied}
                  className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-8 py-3 rounded-lg hover:from-violet-700 hover:to-indigo-700 transition-all duration-200 shadow-lg shadow-violet-900/30 disabled:opacity-50 font-medium"
                >
                  {!session
                    ? 'Login to Apply'
                    : applied
                      ? 'Applied'
                      : submitting
                        ? 'Applying...'
                        : 'Apply Now'}
                </button>
              )}

              <div className="flex space-x-2">
                <button
                  className={`p-3 rounded-lg transition-colors ${
                    bookmarked
                      ? 'bg-violet-700 text-violet-200'
                      : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
                  }`}
                  onClick={handleBookmark}
                  aria-label={bookmarked ? 'Remove Bookmark' : 'Bookmark'}
                >
                  <Bookmark size={20} />
                </button>
                <button
                  className="p-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg transition-colors"
                  onClick={handleShare}
                  aria-label="Share"
                >
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
            {/* Apply Form (Student) */}
            {session?.user && (session.user as ExtendedUser)?.role === 'student' && !applied && (
              <div className="bg-gradient-to-br from-zinc-900/90 via-zinc-800/70 to-violet-900/20 backdrop-blur-2xl rounded-xl p-6 border border-zinc-700/50">
                <h2 className="text-lg font-semibold text-white mb-3">
                  Application Note (Optional)
                </h2>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={4}
                  maxLength={1000}
                  placeholder="Add a brief note or cover message to the recruiter"
                  className="w-full mb-3 px-4 py-3 border border-zinc-600/60 rounded-lg bg-zinc-900/60 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-600"
                />
                {error && <p className="text-sm text-red-500 mb-2">{error}</p>}
                <button
                  onClick={handleApply}
                  disabled={submitting}
                  className="px-5 py-2 bg-violet-600 hover:bg-violet-700 disabled:opacity-60 text-white rounded-lg text-sm font-medium"
                >
                  {submitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            )}
            {applied && (
              <div className="bg-emerald-600/10 border border-emerald-500/30 text-emerald-400 rounded-lg p-4 text-sm">
                You have applied to this job. Good luck!
              </div>
            )}

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
                <p className="text-white font-medium">{job.postedBy?.name || 'Anonymous'}</p>
                <p className="text-zinc-400 text-sm">
                  {job.postedBy?.email || 'Contact through platform'}
                </p>
                {recruiterHireCount !== null && (
                  <p className="text-zinc-400 text-xs mt-1">
                    Hires so far:{' '}
                    <span className="text-emerald-400 font-semibold">{recruiterHireCount}</span>
                  </p>
                )}
                {session?.user && (session.user as ExtendedUser)?.role === 'student' && (
                  <Link
                    href={`/u/${job.postedBy?._id}`}
                    className="inline-block mt-3 text-violet-400 hover:text-violet-300 text-sm font-medium"
                  >
                    View Recruiter Profile
                  </Link>
                )}
              </div>
            </div>

            {/* Similar Jobs */}
            <div className="bg-gradient-to-br from-zinc-900/90 via-zinc-800/70 to-violet-900/20 backdrop-blur-2xl rounded-xl p-6 border border-zinc-700/50">
              <h3 className="text-lg font-bold text-white mb-4">Other Jobs</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {jobsList
                  .filter((j) => j._id !== job._id)
                  .map((j) => (
                    <Link
                      key={j._id}
                      href={`/jobs/${j._id}`}
                      className={`block p-3 rounded-lg transition-colors ${
                        pathname === `/jobs/${j._id}`
                          ? 'bg-violet-900/40 border border-violet-500'
                          : 'bg-zinc-800/50 hover:bg-zinc-700/50'
                      }`}
                    >
                      <h4 className="text-white font-medium text-sm">{j.title}</h4>
                      <p className="text-zinc-400 text-xs">
                        {j.company} • {j.location}
                      </p>
                    </Link>
                  ))}
                {jobsList.length === 0 && (
                  <div className="text-zinc-500 text-sm text-center py-4">
                    No other jobs available
                  </div>
                )}
              </div>
              <Link href="/jobs">
                <button className="w-full mt-4 text-violet-400 hover:text-violet-300 text-sm font-medium">
                  View All Jobs
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Share Modal */}
        {shareOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-700 w-full max-w-sm">
              <h3 className="text-lg font-bold text-white mb-2">Share this job</h3>
              <input
                type="text"
                readOnly
                value={typeof window !== 'undefined' ? window.location.href : ''}
                className="w-full px-3 py-2 rounded bg-zinc-800 text-zinc-200 mb-4"
              />
              <button
                className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:from-violet-700 hover:to-indigo-700 transition-all duration-200"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setShareOpen(false);
                }}
              >
                Copy Link
              </button>
              <button
                className="w-full mt-2 px-4 py-2 rounded-lg bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                onClick={() => setShareOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
