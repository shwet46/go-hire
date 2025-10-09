'use client';
import React, { useEffect, useState, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import PersonalInfoSection from '../../../components/Profile/PersonalInfoSection';
import EducationSection from '../../../components/Profile/EducationSection';
import SkillsSection from '../../../components/Profile/SkillsSection';
import BioSection from '../../../components/Profile/BioSection';
import ExperienceSection from '../../../components/Profile/ExperienceSection';
import ResumeSection from '../../../components/Profile/ResumeSection';
import FormActionsSection from '../../../components/Profile/FormActionsSection';

interface ExperienceForm {
  title: string;
  company: string;
  employmentType:
    | 'full-time'
    | 'part-time'
    | 'internship'
    | 'freelance'
    | 'contract'
    | 'temporary'
    | 'volunteer'
    | 'other';
  location?: string;
  startDate: string;
  endDate?: string;
  isCurrent?: boolean;
  description?: string;
  skillsUsed?: string;
}

interface ProfileForm {
  name: string;
  email: string;
  university: string;
  degree: string;
  graduationYear: string;
  skills: string;
  bio: string;
  resumeUrl: string;
  experiences: ExperienceForm[];
  companyHiringFor: string;
  role?: string;
}

export default function UpdateProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [form, setForm] = useState<ProfileForm>({
    name: '',
    email: '',
    university: '',
    degree: '',
    graduationYear: '',
    skills: '',
    bio: '',
    resumeUrl: '',
    experiences: [],
    companyHiringFor: '',
    role: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const completionPercent = useMemo(() => {
    let needed = 0;
    let have = 0;
    if (form.role === 'student') {
      const fields = [
        form.university,
        form.degree,
        form.graduationYear,
        form.skills,
        form.resumeUrl,
      ];
      needed = fields.length;
      have = fields.filter(Boolean).length;
    } else if (form.role === 'recruiter') {
      needed = 1;
      have = form.companyHiringFor ? 1 : 0;
    }
    return needed === 0 ? 0 : Math.round((have / needed) * 100);
  }, [form]);

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
        setForm({
          name: data.name || '',
          email: data.email || '',
          university: data.university || '',
          degree: data.degree || '',
          graduationYear: data.graduationYear || '',
          skills: (data.skills || []).join(', '),
          bio: data.bio || '',
          resumeUrl: data.resumeUrl || '',
          experiences: (data.experiences || []).map((exp: ExperienceForm) => ({
            ...exp,
            skillsUsed: Array.isArray(exp.skillsUsed)
              ? exp.skillsUsed.join(', ')
              : exp.skillsUsed || '',
          })),
          companyHiringFor: data.companyHiringFor || '',
          role: data.role || '',
        });
      }
    } catch {
      // ignore
    }
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleResumeUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/upload/resume', {
      method: 'POST',
      body: formData,
    });
    if (res.ok) {
      const data = await res.json();
      setForm((prev) => ({ ...prev, resumeUrl: data.url }));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          university: form.university,
          degree: form.degree,
          graduationYear: form.graduationYear,
          skills: form.skills
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean),
          bio: form.bio,
          resumeUrl: form.resumeUrl,
          experiences: form.experiences.map((exp) => ({
            ...exp,
            skillsUsed: exp.skillsUsed
              ? exp.skillsUsed
                  .split(',')
                  .map((s) => s.trim())
                  .filter(Boolean)
              : [],
          })),
          companyHiringFor: form.companyHiringFor,
        }),
      });
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => router.push('/profile'), 1200);
      } else {
        setSuccess(false);
      }
    } catch {
      setSuccess(false);
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-950">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-zinc-950 pt-24 pb-32 px-4 md:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm p-6 md:p-8 border border-gray-200 dark:border-zinc-800 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_30%_20%,rgba(124,58,237,0.15),transparent_60%)]" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">Edit Profile</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Keep your information up to date for better matches.
              </p>
            </div>
            <div className="w-full md:w-64">
              <div className="flex justify-between text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                <span>Completion</span>
                <span>{completionPercent}%</span>
              </div>
              <div className="h-2 rounded-full bg-gray-200 dark:bg-zinc-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500"
                  style={{ width: `${completionPercent}%` }}
                />
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="relative z-10 space-y-10 mt-10">
            {/* Personal Info */}
            <div className="rounded-xl border border-gray-200 dark:border-zinc-800 p-5 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm">
              <PersonalInfoSection name={form.name} email={form.email} />
            </div>

            {/* Education */}
            <div className="rounded-xl border border-gray-200 dark:border-zinc-800 p-5 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm">
              <EducationSection
                university={form.university}
                degree={form.degree}
                graduationYear={form.graduationYear}
                onChange={handleChange}
              />
            </div>

            {/* Recruiter Specific - Company Hiring For */}
            {form.role === 'recruiter' && (
              <div className="rounded-xl border border-gray-200 dark:border-zinc-800 p-5 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                  Recruiter Details
                </h2>
                <div className="space-y-3">
                  <div>
                    <label className="block text-gray-600 dark:text-gray-300 mb-1 text-sm font-medium">
                      Company Hiring For
                    </label>
                    <input
                      type="text"
                      name="companyHiringFor"
                      value={form.companyHiringFor}
                      onChange={handleChange}
                      placeholder="Company or Organization"
                      className="w-full px-4 py-2.5 border border-gray-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-200"
                    />
                    {!form.companyHiringFor && (
                      <p className="text-xs text-amber-500 mt-1">
                        Add the company to complete your recruiter profile.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Skills */}
            <div className="rounded-xl border border-gray-200 dark:border-zinc-800 p-5 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm">
              <SkillsSection skills={form.skills} onChange={handleChange} />
              {form.role === 'student' &&
                (!form.university || !form.degree || !form.graduationYear) && (
                  <p className="text-xs text-amber-500 mt-2">
                    Complete your academic info so recruiters can find you.
                  </p>
                )}
            </div>

            {/* Bio */}
            <div className="rounded-xl border border-gray-200 dark:border-zinc-800 p-5 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm">
              <BioSection bio={form.bio} onChange={handleChange} />
            </div>

            {/* Experience Section */}
            <div className="rounded-xl border border-gray-200 dark:border-zinc-800 p-5 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm">
              <ExperienceSection
                experiences={form.experiences}
                setExperiences={(exps) => setForm((f) => ({ ...f, experiences: exps }))}
              />
            </div>

            {/* Resume */}
            <div className="rounded-xl border border-gray-200 dark:border-zinc-800 p-5 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm">
              <ResumeSection resumeUrl={form.resumeUrl} handleResumeUpload={handleResumeUpload} />
            </div>

            {/* Buttons */}
            <div className="h-16" />
            <div className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border-t border-gray-200 dark:border-zinc-800 px-4 md:px-8 py-4 flex justify-end">
              <div className="max-w-6xl w-full mx-auto">
                <FormActionsSection
                  isLoading={saving}
                  onCancel={() => router.push('/(dashboards)/student')}
                />
              </div>
            </div>
            {success && <div className="text-emerald-500 mt-4">Profile updated successfully!</div>}
          </form>
        </div>
      </div>
    </div>
  );
}