"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


import PersonalInfoSection from "../../../components/Profile/PersonalInfoSection";
import EducationSection from "../../../components/Profile/EducationSection";
import SkillsSection from "../../../components/Profile/SkillsSection";
import BioSection from "../../../components/Profile/BioSection";
import ExperienceSection from "../../../components/Profile/ExperienceSection";
import ResumeSection from "../../../components/Profile/ResumeSection";
import FormActionsSection from "../../../components/Profile/FormActionsSection";

interface ExperienceForm {
  title: string;
  company: string;
  employmentType: 'full-time' | 'part-time' | 'internship' | 'freelance' | 'contract' | 'temporary' | 'volunteer' | 'other';
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
    name: "",
    email: "",
    university: "",
    degree: "",
    graduationYear: "",
    skills: "",
    bio: "",
    resumeUrl: "",
    experiences: [],
    companyHiringFor: "",
    role: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/login");
      return;
    }
    fetchProfile();
  }, [session, status, router]);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/user/profile");
      if (res.ok) {
        const data = await res.json();
        setForm({
          name: data.name || "",
          email: data.email || "",
          university: data.university || "",
          degree: data.degree || "",
          graduationYear: data.graduationYear || "",
          skills: (data.skills || []).join(", "),
          bio: data.bio || "",
          resumeUrl: data.resumeUrl || "",
          experiences: (data.experiences || []).map((exp: ExperienceForm) => ({
            ...exp,
            skillsUsed: Array.isArray(exp.skillsUsed)
              ? exp.skillsUsed.join(", ")
              : (exp.skillsUsed || ""),
          })),
          companyHiringFor: data.companyHiringFor || "",
          role: data.role || "",
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
    formData.append("file", file);
    const res = await fetch("/api/upload/resume", {
      method: "POST",
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
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          university: form.university,
          degree: form.degree,
          graduationYear: form.graduationYear,
          skills: form.skills.split(",").map((s) => s.trim()).filter(Boolean),
          bio: form.bio,
          resumeUrl: form.resumeUrl,
          experiences: form.experiences.map((exp) => ({
            ...exp,
            skillsUsed: exp.skillsUsed
              ? exp.skillsUsed.split(",").map((s) => s.trim()).filter(Boolean)
              : [],
          })),
          companyHiringFor: form.companyHiringFor,
        }),
      });
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => router.push("/profile"), 1200);
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
    <div className="min-h-screen bg-gray-100 dark:bg-zinc-950 py-28 px-6">
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-zinc-800">
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-white mb-8">Update Your Profile</h1>
          <form onSubmit={handleSubmit} className="space-y-8">

            {/* Personal Info */}
            <PersonalInfoSection name={form.name} email={form.email} />


            {/* Education */}
            <EducationSection
              university={form.university}
              degree={form.degree}
              graduationYear={form.graduationYear}
              onChange={handleChange}
            />


            {/* Skills */}
            <SkillsSection skills={form.skills} onChange={handleChange} />


            {/* Bio */}
            <BioSection bio={form.bio} onChange={handleChange} />



            {/* Experience Section */}
            <ExperienceSection
              experiences={form.experiences}
              setExperiences={(exps) => setForm(f => ({ ...f, experiences: exps }))}
            />


            {/* Resume */}
            <ResumeSection resumeUrl={form.resumeUrl} handleResumeUpload={handleResumeUpload} />


            {/* Buttons */}
            <FormActionsSection isLoading={saving} onCancel={() => router.push("/(dashboards)/student")} />
            {success && <div className="text-emerald-500 mt-4">Profile updated successfully!</div>}
          </form>
        </div>
      </div>
    </div>
  );
}