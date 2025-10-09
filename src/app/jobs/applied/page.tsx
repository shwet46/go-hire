'use client';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface AppliedJobEntry {
  _id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  createdAt: string;
  status?: string;
  jobId?: string;
}

export default function AppliedJobsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [jobs, setJobs] = useState<AppliedJobEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/login');
      return;
    }
    fetchApplied();
  }, [session, status, router]);

  const fetchApplied = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/user/applied-jobs');
      if (res.ok) {
        const data = await res.json();
        setJobs(data.jobs || []);
      }
    } catch {}
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-b-2 border-violet-600 rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 bg-gray-100 dark:bg-zinc-950">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Applied Jobs</h1>
        {jobs.length === 0 && (
          <div className="p-8 border border-dashed rounded-xl text-center bg-white dark:bg-zinc-900 border-gray-300 dark:border-zinc-700 text-gray-600 dark:text-gray-400">
            You haven't applied to any jobs yet.
          </div>
        )}
        <div className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{job.title}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {job.company} • {job.location} • {job.type}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  Applied status: {job.status || 'applied'}
                </p>
              </div>
              <a href={`/jobs/${job._id}`} className="text-violet-600 hover:underline text-sm">
                View Job
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
