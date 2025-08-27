"use client";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
}

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

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
    <div className="min-h-screen my-10 bg-gray-100 dark:bg-zinc-950 pt-28 px-6">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 bg-white dark:bg-zinc-900 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-zinc-800">
          {/* Profile Picture */}
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-zinc-800 flex items-center justify-center text-gray-400 text-2xl font-bold">
              {profile?.name?.[0] || "U"}
            </div>
            <div>
              <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
                {profile?.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">{profile?.email}</p>
            </div>
          </div>

          <Link href="/profile/update">
            <button className="px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition font-medium">
              Edit Profile
            </button>
          </Link>
        </div>

        {/* Basic Info */}
        <section className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-zinc-800">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Basic Information</h2>
          <div className="grid md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
            <div><span className="font-medium">University:</span> {profile?.university || "—"}</div>
            <div><span className="font-medium">Degree:</span> {profile?.degree || "—"}</div>
            <div><span className="font-medium">Graduation Year:</span> {profile?.graduationYear || "—"}</div>
          </div>
        </section>

        {/* Skills */}
        {profile?.skills && profile.skills.length > 0 && (
          <section className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-zinc-800">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Skills</h2>
            <div className="flex flex-wrap gap-3">
              {profile.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-4 py-1 text-sm rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-zinc-700"
                >
                  {skill}
                </span>
              ))}
            </div>
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
                  className="p-4 border border-gray-200 dark:border-zinc-700 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800 transition"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {exp.title} <span className="text-violet-600">@ {exp.company}</span>
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{exp.employmentType} | {exp.location}</p>
                  <p className="text-gray-500 dark:text-gray-500 text-xs mt-1">
                    {exp.startDate ? format(new Date(exp.startDate), "MMM yyyy") : "—"}
                    {" - "}
                    {exp.isCurrent ? "Present" : (exp.endDate ? format(new Date(exp.endDate), "MMM yyyy") : "—")}
                  </p>
                  {exp.description && (
                    <p className="text-gray-700 dark:text-gray-300 mt-2">{exp.description}</p>
                  )}
                  {exp.skillsUsed && exp.skillsUsed.length > 0 && (
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                      Skills: {exp.skillsUsed.join(", ")}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Recruiter Info */}
        {profile?.role === "recruiter" && profile.companyHiringFor && (
          <section className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-zinc-800">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Company Hiring For</h2>
            <p className="text-gray-700 dark:text-gray-300">{profile.companyHiringFor}</p>
          </section>
        )}
      </div>
    </div>
  );
}