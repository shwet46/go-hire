"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface ProfileForm {
  name: string;
  email: string;
  university: string;
  degree: string;
  graduationYear: string;
  skills: string;
  bio: string;
  resumeUrl: string;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, status]);

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
          // profileCompleted is NOT set here, so update is optional
        }),
      });
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => router.push("/student"), 1200);
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-950 via-zinc-900 to-violet-950/20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-violet-950/20 pt-20">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-white mb-6">Update Your Profile</h1>
        <form onSubmit={handleSubmit} className="space-y-6 bg-zinc-900/80 rounded-xl p-8 border border-zinc-700/50">
          <div>
            <label className="block text-zinc-300 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              disabled
              className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white"
            />
          </div>
          <div>
            <label className="block text-zinc-300 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              disabled
              className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white"
            />
          </div>
          <div>
            <label className="block text-zinc-300 mb-2">University</label>
            <input
              type="text"
              name="university"
              value={form.university}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white"
            />
          </div>
          <div>
            <label className="block text-zinc-300 mb-2">Degree</label>
            <input
              type="text"
              name="degree"
              value={form.degree}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white"
            />
          </div>
          <div>
            <label className="block text-zinc-300 mb-2">Graduation Year</label>
            <input
              type="text"
              name="graduationYear"
              value={form.graduationYear}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white"
            />
          </div>
          <div>
            <label className="block text-zinc-300 mb-2">Skills (comma separated)</label>
            <input
              type="text"
              name="skills"
              value={form.skills}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white"
              placeholder="e.g. React, Node.js, Python"
            />
          </div>
          <div>
            <label className="block text-zinc-300 mb-2">Bio</label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white"
              rows={4}
            />
          </div>
          <div>
            <label className="block text-zinc-300 mb-2">Resume (PDF, max 2MB)</label>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleResumeUpload}
              className="block w-full text-zinc-300"
            />
            {form.resumeUrl && (
              <div className="mt-2">
                <a href={form.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-violet-400 underline">
                  View Uploaded Resume
                </a>
              </div>
            )}
          </div>
          <div className="flex justify-end gap-4">
            <Link href="/(dashboards)/student">
              <button type="button" className="px-6 py-3 border border-zinc-600 text-zinc-300 rounded-lg hover:border-zinc-500 transition-colors">
                Cancel
              </button>
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-lg hover:from-violet-700 hover:to-indigo-700 transition-all duration-200 shadow-lg shadow-violet-900/30 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Profile"}
            </button>
          </div>
          {success && <div className="text-emerald-400 mt-4">Profile updated successfully!</div>}
        </form>
      </div>
    </div>
  );
}
