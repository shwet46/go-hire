import Link from 'next/link';
import { MapPin, Clock, DollarSign, Building } from 'lucide-react';

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  duration?: string;
  createdAt: string;
  tags: string[];
  postedBy: {
    name: string;
    email: string;
  };
}

export default function JobsList({
  jobs,
  loading,
  session,
  handleApply,
  formatDate,
}: {
  jobs: Job[];
  loading: boolean;
  session: unknown;
  handleApply: (jobId: string) => void;
  formatDate: (dateString: string) => string;
}) {
  if (loading && jobs.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mx-auto mb-4"></div>
        <p className="text-zinc-400">Loading jobs...</p>
      </div>
    );
  }

  return (
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
                    {job.type === 'internship' && job.duration && (
                      <div className="flex items-center space-x-1">
                        <span className="font-semibold">Duration:</span>
                        <span>{job.duration}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-emerald-400 font-semibold mb-1">
                    <DollarSign size={16} />
                    <span>{job.salary}</span>
                  </div>
                  <span className="text-xs bg-violet-500/20 text-violet-300 px-2 py-1 rounded-full capitalize">
                    {job.type ? job.type.replace('-', ' ') : 'Full-time'}
                  </span>
                </div>
              </div>

              <p className="text-zinc-400 mb-4 line-clamp-2">{job.description}</p>

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
                    <span className="text-xs text-zinc-500">+{job.tags.length - 3} more</span>
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
  );
}
