'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { format } from 'date-fns';

interface Experience {
  title: string;
  company: string;
  employmentType: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  isCurrent?: boolean;
  description?: string;
  skillsUsed?: string[];
}

interface PublicProfile {
  id: string;
  name: string;
  role?: string;
  university?: string | null;
  degree?: string | null;
  graduationYear?: string | null;
  skills?: string[];
  bio?: string | null;
  resumeUrl?: string | null;
  experiences?: Experience[];
  companyHiringFor?: string | null;
}

export default function PublicProfilePage() {
  const params = useParams();
  const userId = params?.id as string;
  const [profile, setProfile] = useState<PublicProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;
    (async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/users/${userId}`);
        if (res.ok) {
          const data = await res.json();
          setProfile(data);
        } else {
          setError('Profile not found');
        }
      } catch {
        setError('Failed to load profile');
      }
      setLoading(false);
    })();
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-950">
        <div className="h-12 w-12 border-b-2 border-violet-600 rounded-full animate-spin" />
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-950">
        <p className="text-gray-600 dark:text-gray-300 text-sm">{error}</p>
      </div>
    );
  }
  if (!profile) return null;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-zinc-950 pt-24 pb-16 px-4 md:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 dark:from-violet-500/20 dark:to-fuchsia-500/20 flex items-center justify-center text-violet-600 dark:text-violet-300 text-2xl font-bold">
              {profile.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <div>
              <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
                {profile.name}
              </h1>
              {profile.role && (
                <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                  {profile.role}
                </p>
              )}
            </div>
          </div>
          {profile.resumeUrl && (
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg text-sm font-medium shadow"
            >
              View Resume
            </a>
          )}
        </header>

        <section className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Overview</h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
            {profile.university && (
              <div>
                <span className="font-medium">University:</span> {profile.university}
              </div>
            )}
            {profile.degree && (
              <div>
                <span className="font-medium">Degree:</span> {profile.degree}
              </div>
            )}
            {profile.graduationYear && (
              <div>
                <span className="font-medium">Graduation Year:</span> {profile.graduationYear}
              </div>
            )}
            {profile.companyHiringFor && (
              <div>
                <span className="font-medium">Company Hiring For:</span> {profile.companyHiringFor}
              </div>
            )}
          </div>
          {profile.bio && (
            <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
              {profile.bio}
            </p>
          )}
        </section>

        {profile.skills && profile.skills.length > 0 && (
          <section className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((s) => (
                <span
                  key={s}
                  className="px-3 py-1 rounded-full bg-violet-600/10 text-violet-700 dark:text-violet-300 text-xs border border-violet-600/30"
                >
                  {s}
                </span>
              ))}
            </div>
          </section>
        )}

        {profile.experiences && profile.experiences.length > 0 && (
          <section className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-6 space-y-5">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Experience</h2>
            {profile.experiences.map((exp, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg border border-gray-200 dark:border-zinc-700 bg-gradient-to-br from-white to-gray-50 dark:from-zinc-900 dark:to-zinc-800/40"
              >
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {exp.title} <span className="text-violet-600">@ {exp.company}</span>
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  {exp.employmentType}
                  {exp.location ? ` • ${exp.location}` : ''}
                </p>
                {(exp.startDate || exp.endDate) && (
                  <p className="text-[11px] text-gray-500 dark:text-gray-500 mt-1">
                    {exp.startDate ? format(new Date(exp.startDate), 'MMM yyyy') : '—'} -{' '}
                    {exp.isCurrent
                      ? 'Present'
                      : exp.endDate
                        ? format(new Date(exp.endDate), 'MMM yyyy')
                        : '—'}
                  </p>
                )}
                {exp.description && (
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">{exp.description}</p>
                )}
                {exp.skillsUsed && exp.skillsUsed.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {exp.skillsUsed.map((s) => (
                      <span
                        key={s}
                        className="px-2 py-0.5 rounded bg-violet-600/10 text-violet-700 dark:text-violet-300 text-[10px] border border-violet-600/30"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </section>
        )}

        <footer className="pt-4 text-center text-[11px] text-gray-500 dark:text-gray-500">
          Shared profile view
        </footer>
      </div>
    </div>
  );
}