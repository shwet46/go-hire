'use client';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface Applicant {
  userId: string;
  name?: string;
  email?: string;
  status: string;
  appliedAt: string;
}

interface ManagedJob {
  _id: string;
  title: string;
  company: string;
  applicants: Applicant[];
}

export default function ManageJobsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [jobs, setJobs] = useState<ManagedJob[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/login');
      return;
    }
    fetchJobs();
  }, [session, status, router]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/recruiter/posted-jobs');
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
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Manage Applicants</h1>
        {jobs.length === 0 && (
          <div className="p-8 border border-dashed rounded-xl text-center bg-white dark:bg-zinc-900 border-gray-300 dark:border-zinc-700 text-gray-600 dark:text-gray-400">
            No jobs posted yet.
          </div>
        )}
        {jobs.map((job) => (
          <div
            key={job._id}
            className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-6 space-y-4"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{job.title}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">{job.company}</p>
              </div>
              <a href={`/jobs/${job._id}`} className="text-violet-600 hover:underline text-sm">
                View Job
              </a>
            </div>
            <div className="space-y-3">
              {job.applicants.length === 0 && (
                <p className="text-sm text-gray-500 dark:text-gray-500">No applicants yet.</p>
              )}
              {job.applicants.map((app) => (
                <div
                  key={app.userId}
                  className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 border rounded-lg px-4 py-3 border-gray-200 dark:border-zinc-700"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200 flex items-center gap-2">
                      {app.name || 'Applicant'}
                      <a
                        href={`/u/${app.userId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-violet-600 hover:underline text-xs font-normal"
                      >
                        View Profile
                      </a>
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">{app.email}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      Applied: {new Date(app.appliedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded bg-violet-600/10 text-violet-700 dark:text-violet-300 border border-violet-600/30">
                    {app.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
