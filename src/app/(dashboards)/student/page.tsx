import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Briefcase, Trophy, BookOpen, Users, TrendingUp, Target } from "lucide-react";
import { CopyButton } from "@/components/CopyButton";

interface UserSession {
  name?: string;
  role?: string;
  referralCode?: string;
}

export default async function StudentDashboard() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as UserSession).role !== 'student') {
    redirect("/login");
  }

  const user = session.user as UserSession;

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-violet-950/20 pt-20">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-64 md:-left-96 top-10 w-96 h-96 bg-violet-600/30 rounded-full blur-3xl"></div>
        <div className="absolute -right-64 md:-right-96 bottom-10 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-400 via-purple-500 to-indigo-500 bg-clip-text text-transparent mb-4">
            Student Dashboard
          </h1>
          <p className="text-zinc-400 text-lg">
            Welcome back, <span className="text-violet-400 font-semibold">{user.name}</span>
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-br from-zinc-900/90 via-zinc-800/70 to-violet-900/20 backdrop-blur-2xl rounded-xl p-6 border border-zinc-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-400 text-sm">Total Points</p>
                <p className="text-2xl font-bold text-violet-400">2,450</p>
              </div>
              <Trophy className="text-violet-500" size={32} />
            </div>
          </div>

          <div className="bg-gradient-to-br from-zinc-900/90 via-zinc-800/70 to-violet-900/20 backdrop-blur-2xl rounded-xl p-6 border border-zinc-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-400 text-sm">Applications</p>
                <p className="text-2xl font-bold text-indigo-400">12</p>
              </div>
              <Briefcase className="text-indigo-500" size={32} />
            </div>
          </div>

          <div className="bg-gradient-to-br from-zinc-900/90 via-zinc-800/70 to-violet-900/20 backdrop-blur-2xl rounded-xl p-6 border border-zinc-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-400 text-sm">Skills Practiced</p>
                <p className="text-2xl font-bold text-emerald-400">8</p>
              </div>
              <Target className="text-emerald-500" size={32} />
            </div>
          </div>

          <div className="bg-gradient-to-br from-zinc-900/90 via-zinc-800/70 to-violet-900/20 backdrop-blur-2xl rounded-xl p-6 border border-zinc-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-400 text-sm">Referrals</p>
                <p className="text-2xl font-bold text-cyan-400">3</p>
              </div>
              <Users className="text-cyan-500" size={32} />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Link href="/jobs" className="group">
            <div className="bg-gradient-to-br from-zinc-900/90 via-zinc-800/70 to-violet-900/20 backdrop-blur-2xl rounded-xl p-6 border border-zinc-700/50 hover:border-violet-500/50 transition-all duration-300">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-violet-500/20 rounded-lg">
                  <Briefcase className="text-violet-400" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-violet-300 transition-colors">Browse Jobs</h3>
                  <p className="text-zinc-400">Find your next opportunity</p>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/practice" className="group">
            <div className="bg-gradient-to-br from-zinc-900/90 via-zinc-800/70 to-violet-900/20 backdrop-blur-2xl rounded-xl p-6 border border-zinc-700/50 hover:border-indigo-500/50 transition-all duration-300">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-indigo-500/20 rounded-lg">
                  <BookOpen className="text-indigo-400" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">Practice Skills</h3>
                  <p className="text-zinc-400">Improve your abilities</p>
                </div>
              </div>
            </div>
          </Link>

          <div className="bg-gradient-to-br from-zinc-900/90 via-zinc-800/70 to-violet-900/20 backdrop-blur-2xl rounded-xl p-6 border border-zinc-700/50">
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 bg-emerald-500/20 rounded-lg">
                <TrendingUp className="text-emerald-400" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Progress Tracking</h3>
                <p className="text-zinc-400">Monitor your growth</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Profile Completion</span>
                <span className="text-emerald-400">85%</span>
              </div>
              <div className="w-full bg-zinc-700 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full w-[85%]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Referral Section */}
        {user.referralCode && (
          <div className="bg-gradient-to-br from-zinc-900/90 via-zinc-800/70 to-violet-900/20 backdrop-blur-2xl rounded-xl p-6 border border-zinc-700/50">
            <h3 className="text-xl font-bold text-white mb-4">Invite Friends & Earn Points</h3>
            <p className="text-zinc-400 mb-4">Share your referral code and earn 200 points for each successful referral!</p>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <label className="block text-sm text-zinc-400 mb-1">Your Referral Code</label>
                <div className="flex">
                  <input 
                    type="text" 
                    value={user.referralCode} 
                    readOnly 
                    className="flex-1 px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-l-lg text-white font-mono"
                  />
                  <CopyButton text={user.referralCode} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}