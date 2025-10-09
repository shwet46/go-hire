'use client';
import React, { useEffect, useState, useMemo } from 'react';
import { format } from 'date-fns';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Experience {
  title: string;
  company: string;
  employmentType: string;
  location?: string;
  startDate: string;
  endDate?: string;
  isCurrent?: boolean;
  description?: string;
  skillsUsed?: string[];
}

interface UserProfile {
  id?: string;
  name: string;
  email: string;
  university?: string;
  degree?: string;
  graduationYear?: string;
  skills?: string[];
  bio?: string;
  resumeUrl?: string;
  experiences?: Experience[];
  companyHiringFor?: string;
  role?: string;
  profileCompleted?: boolean;
}

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);
  // derive completion metrics
  const completion = useMemo(() => {
    if (!profile) return { percent: 0, missing: [] as string[] };
    const missing: string[] = [];
    if (profile.role === 'student') {
      if (!profile.university) missing.push('University');
      if (!profile.degree) missing.push('Degree');
      if (!profile.graduationYear) missing.push('Graduation Year');
      if (!profile.skills || profile.skills.length === 0) missing.push('Skills');
      if (!profile.resumeUrl) missing.push('Resume');
    } else if (profile.role === 'recruiter') {
      if (!profile.companyHiringFor) missing.push('Company Hiring For');
    }
    const totalNeeded = missing.length + (profile.profileCompleted ? 0 : 0);
    const baseTotal = profile.role === 'student' ? 5 : profile.role === 'recruiter' ? 1 : 0;
    const filled = baseTotal - missing.length;
    const percent =
      baseTotal === 0 ? 100 : Math.max(0, Math.min(100, Math.round((filled / baseTotal) * 100)));
    return { percent, missing };
  }, [profile]);

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/login');
      return;
    }
    fetchProfile();
  }, [session, status, router]);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/user/profile');
      if (res.ok) {
        const data = await res.json();
        setProfile(data);
      }
    } catch {
      // ignore
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-950">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-zinc-950 pt-24 pb-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Progress / Summary */}
        {profile && (
          <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm p-5 border border-gray-200 dark:border-zinc-800 flex flex-col gap-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Profile Completion
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Complete your profile to improve matching.
                </p>
              </div>
              <div className="text-sm font-medium text-violet-600 dark:text-violet-400">
                {completion.percent}% Complete
              </div>
            </div>
            <div className="w-full h-3 rounded-full bg-gray-200 dark:bg-zinc-800 overflow-hidden">
              <div
                className="h-full bg-violet-600 transition-all"
                style={{ width: `${completion.percent}%` }}
              />
            </div>
            {completion.missing.length > 0 && (
              <div className="text-xs text-amber-600 dark:text-amber-400 flex flex-wrap gap-2">
                {completion.missing.map((m) => (
                  <span
                    key={m}
                    className="px-2 py-1 rounded bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700"
                  >
                    {m} needed
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 bg-white dark:bg-zinc-900 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-zinc-800">
          {/* Profile Picture */}
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-zinc-800 flex items-center justify-center text-gray-400 text-2xl font-bold">
              {profile?.name?.[0] || 'U'}
            </div>
            <div>
              <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
                {profile?.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">{profile?.email}</p>
            </div>
          </div>

          <div className="flex flex-col items-stretch md:items-end gap-3 w-full md:w-auto">
            <Link href="/profile/update" className="group">
              <button className="px-6 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition font-medium shadow">
                Edit Profile
              </button>
            </Link>
            {profile && !profile.profileCompleted && (
              <p className="text-xs text-amber-500 md:text-right">Some details still missing.</p>
            )}
          </div>
        </div>

        {/* Shareable Link */}
        {profile && (
          <section className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm p-5 border border-gray-200 dark:border-zinc-800 flex flex-col gap-2">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-200 tracking-wide">
                Share Your Profile
              </h2>
              <button
                type="button"
                onClick={async () => {
                  const url = `${window.location.origin}/u/${encodeURIComponent(profile.id || 'user')}`;
                  try {
                    if (navigator.share) {
                      await navigator.share({
                        title: `${profile.name}'s Profile`,
                        text: 'Check out this profile on GoHire',
                        url,
                      });
                      setShareFeedback('Shared successfully');
                    } else {
                      await navigator.clipboard.writeText(url);
                      setShareFeedback('Link copied');
                    }
                  } catch {
                    setShareFeedback('Share canceled');
                  }
                  setTimeout(() => setShareFeedback(null), 2500);
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium transition-colors shadow-sm"
              >
                <span>Share Profile</span>
              </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              We'll copy the link if native sharing isn't supported.
            </p>
            {shareFeedback && (
              <span className="text-xs text-violet-600 dark:text-violet-400">{shareFeedback}</span>
            )}
          </section>
        )}

        {/* Basic Info */}
        <section className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-zinc-800">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            Basic Information
          </h2>
          <div className="grid md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
            <div>
              <span className="font-medium">University:</span> {profile?.university || '—'}
            </div>
            <div>
              <span className="font-medium">Degree:</span> {profile?.degree || '—'}
            </div>
            <div>
              <span className="font-medium">Graduation Year:</span> {profile?.graduationYear || '—'}
            </div>
          </div>
          {profile?.role === 'student' &&
            (!profile?.university || !profile?.degree || !profile?.graduationYear) && (
              <p className="text-sm text-amber-500 mt-3">
                Add missing academic details to complete your student profile.
              </p>
            )}
        </section>

        {/* Skills */}
        {profile?.skills && profile.skills.length > 0 && (
          <section className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-zinc-800">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Skills</h2>
            <div className="flex flex-wrap gap-3">
              {profile.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-4 py-1 text-sm rounded-full bg-violet-600/10 text-violet-700 dark:text-violet-300 border border-violet-300/40 dark:border-violet-700/40"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}
        {(!profile?.skills || profile.skills.length === 0) && (
          <section className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm p-6 border border-dashed border-gray-300 dark:border-zinc-700">
            <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Skills</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No skills added yet.{' '}
              <Link
                href="/profile/update"
                className="text-violet-600 dark:text-violet-400 hover:underline"
              >
                Add some
              </Link>{' '}
              to showcase your strengths.
            </p>
          </section>
        )}

        {/* Bio */}
        {profile?.bio && (
          <section className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-zinc-800">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">About Me</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{profile.bio}</p>
          </section>
        )}

        {/* Resume */}
        {profile?.resumeUrl && (
          <section className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-zinc-800">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Resume</h2>
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition font-medium"
            >
              View Resume
            </a>
          </section>
        )}

        {/* Experiences */}
        {profile?.experiences && profile.experiences.length > 0 && (
          <section className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-zinc-800">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Experience</h2>
            <div className="space-y-5">
              {profile.experiences.map((exp, idx) => (
                <div
                  key={idx}
                  className="p-4 border border-gray-200 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 hover:shadow-sm transition"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {exp.title} <span className="text-violet-600">@ {exp.company}</span>
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {exp.employmentType} | {exp.location}
                  </p>
                  <p className="text-gray-500 dark:text-gray-500 text-xs mt-1">
                    {exp.startDate ? format(new Date(exp.startDate), 'MMM yyyy') : '—'}
                    {' - '}
                    {exp.isCurrent
                      ? 'Present'
                      : exp.endDate
                        ? format(new Date(exp.endDate), 'MMM yyyy')
                        : '—'}
                  </p>
                  {exp.description && (
                    <p className="text-gray-700 dark:text-gray-300 mt-2">{exp.description}</p>
                  )}
                  {exp.skillsUsed && exp.skillsUsed.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {exp.skillsUsed.map((s) => (
                        <span
                          key={s}
                          className="px-2 py-0.5 text-[11px] rounded bg-violet-600/10 text-violet-700 dark:text-violet-300 dark:bg-violet-500/15 border border-violet-300/40 dark:border-violet-700/40"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
        {(!profile?.experiences || profile.experiences.length === 0) && (
          <section className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm p-6 border border-dashed border-gray-300 dark:border-zinc-700">
            <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Experience</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No experience added yet. Share internships, projects, or roles to strengthen your
              profile.
            </p>
            <Link
              href="/profile/update"
              className="inline-block mt-4 px-4 py-2 text-sm bg-violet-600 text-white rounded-md hover:bg-violet-700"
            >
              Add Experience
            </Link>
          </section>
        )}

        {/* Recruiter Info */}
        {profile?.role === 'recruiter' && profile.companyHiringFor && (
          <section className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-zinc-800">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              Company Hiring For
            </h2>
            <p className="text-gray-700 dark:text-gray-300">{profile.companyHiringFor}</p>
          </section>
        )}
        {profile?.role === 'recruiter' && !profile.companyHiringFor && (
          <section className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm p-6 border border-amber-400 dark:border-amber-500">
            <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
              Recruiter Details Incomplete
            </h2>
            <p className="text-sm text-amber-500">
              Add the company you are hiring for to complete your recruiter profile.
            </p>
            <Link
              href="/profile/update"
              className="inline-block mt-4 px-5 py-2 bg-violet-600 text-white rounded-md text-sm hover:bg-violet-700"
            >
              Update Now
            </Link>
          </section>
        )}
      </div>
    </div>
  );
}