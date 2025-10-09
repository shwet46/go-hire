'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

interface JobForm {
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  tags: string;
  duration: string;
}

export default function EditJobPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const [form, setForm] = useState<JobForm>({
    title: '',
    company: '',
    location: '',
    type: '',
    salary: '',
    description: '',
    tags: '',
    duration: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (status === 'loading') return;
    if (!session || (session.user as { role?: string })?.role !== 'recruiter') {
      router.push('/login');
      return;
    }
    fetchJob();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, status]);

  const fetchJob = async () => {
    setLoading(true);
    try {
      const jobId = Array.isArray(params.id) ? params.id[0] : params.id;
      const res = await fetch(`/api/jobs/${jobId}`);
      if (res.ok) {
        const data = await res.json();
        const job = data.job;
        setForm({
          title: job.title || '',
          company: job.company || '',
          location: job.location || '',
          type: job.type || '',
          salary: job.salary || '',
          description: job.description || '',
          tags: (job.tags || []).join(', '),
          duration: job.duration || '',
        });
      } else {
        setError('Job not found');
      }
    } catch {
      setError('Failed to fetch job');
    }
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const jobId = Array.isArray(params.id) ? params.id[0] : params.id;
      const res = await fetch(`/api/jobs/${jobId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          tags: form.tags
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean),
        }),
      });
      if (res.ok) {
        router.push(`/jobs/${jobId}`);
      } else {
        setError('Failed to update job');
      }
    } catch {
      setError('Failed to update job');
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-950 via-zinc-900 to-violet-950/20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-violet-950/20 pt-20">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-white mb-6">Edit Job</h1>
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-zinc-900/80 rounded-xl p-8 border border-zinc-700/50"
        >
          <div>
            <label className="block text-zinc-300 mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white"
              required
            />
          </div>
          <div>
            <label className="block text-zinc-300 mb-2">Company</label>
            <input
              type="text"
              name="company"
              value={form.company}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white"
              required
            />
          </div>
          <div>
            <label className="block text-zinc-300 mb-2">Location</label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white"
              required
            />
          </div>
          <div>
            <label className="block text-zinc-300 mb-2">Type</label>
            <input
              type="text"
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white"
              placeholder="e.g. Full-time, Internship"
              required
            />
          </div>
          <div>
            <label className="block text-zinc-300 mb-2">Salary / Stipend</label>
            <input
              type="text"
              name="salary"
              value={form.salary}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white"
              required
            />
          </div>
          <div>
            <label className="block text-zinc-300 mb-2">Tags (comma separated)</label>
            <input
              type="text"
              name="tags"
              value={form.tags}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white"
              placeholder="e.g. React, Node.js, Python"
            />
          </div>
          <div>
            <label className="block text-zinc-300 mb-2">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white"
              rows={6}
              required
            />
          </div>
          <div>
            <label className="block text-zinc-300 mb-2">Duration (for Internship)</label>
            <input
              type="text"
              name="duration"
              value={form.duration}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white"
              placeholder="e.g. 6 months"
            />
          </div>
          <div className="flex justify-end gap-4">
            <Link href={`/jobs/${params.id}`}>
              <button
                type="button"
                className="px-6 py-3 border border-zinc-600 text-zinc-300 rounded-lg hover:border-zinc-500 transition-colors"
              >
                Cancel
              </button>
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-lg hover:from-violet-700 hover:to-indigo-700 transition-all duration-200 shadow-lg shadow-violet-900/30 disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
          {error && <div className="text-red-400 mt-4">{error}</div>}
        </form>
      </div>
    </div>
  );
}
