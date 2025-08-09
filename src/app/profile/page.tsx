"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface UserProfile {
  name: string;
  email: string;
  university?: string;
  degree?: string;
  graduationYear?: string;
  skills?: string[];
  bio?: string;
  resumeUrl?: string;
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
    // eslint-disable-next-line
  }, [session, status]);

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-950 via-zinc-900 to-violet-950/20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-violet-950/20 pt-20">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-white mb-6">Your Profile</h1>
        <div className="bg-zinc-900/80 rounded-xl p-8 border border-zinc-700/50 space-y-4">
          <div>
            <span className="font-semibold text-zinc-300">Name:</span>{" "}
            <span className="text-white">{profile?.name}</span>
          </div>
          <div>
            <span className="font-semibold text-zinc-300">Email:</span>{" "}
            <span className="text-white">{profile?.email}</span>
          </div>
          {profile?.university && (
            <div>
              <span className="font-semibold text-zinc-300">University:</span>{" "}
              <span className="text-white">{profile.university}</span>
            </div>
          )}
          {profile?.degree && (
            <div>
              <span className="font-semibold text-zinc-300">Degree:</span>{" "}
              <span className="text-white">{profile.degree}</span>
            </div>
          )}
          {profile?.graduationYear && (
            <div>
              <span className="font-semibold text-zinc-300">Graduation Year:</span>{" "}
              <span className="text-white">{profile.graduationYear}</span>
            </div>
          )}
          {profile?.skills && profile.skills.length > 0 && (
            <div>
              <span className="font-semibold text-zinc-300">Skills:</span>{" "}
              <span className="text-white">{profile.skills.join(", ")}</span>
            </div>
          )}
          {profile?.bio && (
            <div>
              <span className="font-semibold text-zinc-300">Bio:</span>{" "}
              <span className="text-white">{profile.bio}</span>
            </div>
          )}
          {profile?.resumeUrl && (
            <div>
              <span className="font-semibold text-zinc-300">Resume:</span>{" "}
              <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-violet-400 underline">
                View Resume
              </a>
            </div>
          )}
        </div>
        <div className="flex justify-end mt-8">
          <Link href="/profile/update">
            <button className="px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-lg hover:from-violet-700 hover:to-indigo-700 transition-all duration-200 shadow-lg shadow-violet-900/30">
              Update Profile
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
