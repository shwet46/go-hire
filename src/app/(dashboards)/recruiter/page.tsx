import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Plus, Users, Eye, CheckCircle, Clock, Briefcase, TrendingUp } from "lucide-react";

interface UserSession {
  name?: string;
  role?: string;
  referralCode?: string;
}

export default async function RecruiterDashboard() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as UserSession).role !== 'recruiter') {
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
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-400 via-purple-500 to-indigo-500 bg-clip-text text-transparent mb-4">
              Recruiter Dashboard
            </h1>
            <p className="text-zinc-400 text-lg">
              Welcome back, <span className="text-violet-400 font-semibold">{user.name}</span>
            </p>
          </div>
          <Link href="/jobs/post">
            <button className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-violet-700 hover:to-indigo-700 transition-all duration-200 shadow-lg shadow-violet-900/30 flex items-center space-x-2">
              <Plus size={20} />
              <span>Post New Job</span>
            </button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-br from-zinc-900/90 via-zinc-800/70 to-violet-900/20 backdrop-blur-2xl rounded-xl p-6 border border-zinc-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-400 text-sm">Active Jobs</p>
                <p className="text-2xl font-bold text-violet-400">8</p>
              </div>
              <Briefcase className="text-violet-500" size={32} />
            </div>
          </div>

          <div className="bg-gradient-to-br from-zinc-900/90 via-zinc-800/70 to-violet-900/20 backdrop-blur-2xl rounded-xl p-6 border border-zinc-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-400 text-sm">Total Applications</p>
                <p className="text-2xl font-bold text-indigo-400">156</p>
              </div>
              <Users className="text-indigo-500" size={32} />
            </div>
          </div>

          <div className="bg-gradient-to-br from-zinc-900/90 via-zinc-800/70 to-violet-900/20 backdrop-blur-2xl rounded-xl p-6 border border-zinc-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-400 text-sm">Profile Views</p>
                <p className="text-2xl font-bold text-emerald-400">1,240</p>
              </div>
              <Eye className="text-emerald-500" size={32} />
            </div>
          </div>

          <div className="bg-gradient-to-br from-zinc-900/90 via-zinc-800/70 to-violet-900/20 backdrop-blur-2xl rounded-xl p-6 border border-zinc-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-400 text-sm">Hires Made</p>
                <p className="text-2xl font-bold text-cyan-400">23</p>
              </div>
              <CheckCircle className="text-cyan-500" size={32} />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Link href="/jobs/manage" className="group">
            <div className="bg-gradient-to-br from-zinc-900/90 via-zinc-800/70 to-violet-900/20 backdrop-blur-2xl rounded-xl p-6 border border-zinc-700/50 hover:border-violet-500/50 transition-all duration-300">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-violet-500/20 rounded-lg">
                  <Briefcase className="text-violet-400" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-violet-300 transition-colors">Manage Jobs</h3>
                  <p className="text-zinc-400">Edit and track your postings</p>
                </div>
              </div>
              <p className="text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors">
                View, edit, and manage all your job postings in one place
              </p>
            </div>
          </Link>

          <Link href="/applications" className="group">
            <div className="bg-gradient-to-br from-zinc-900/90 via-zinc-800/70 to-violet-900/20 backdrop-blur-2xl rounded-xl p-6 border border-zinc-700/50 hover:border-indigo-500/50 transition-all duration-300">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-indigo-500/20 rounded-lg">
                  <Users className="text-indigo-400" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">View Applications</h3>
                  <p className="text-zinc-400">Review candidate profiles</p>
                </div>
              </div>
              <p className="text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors">
                Review applications and manage your hiring pipeline
              </p>
            </div>
          </Link>

          <div className="bg-gradient-to-br from-zinc-900/90 via-zinc-800/70 to-violet-900/20 backdrop-blur-2xl rounded-xl p-6 border border-zinc-700/50">
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 bg-emerald-500/20 rounded-lg">
                <TrendingUp className="text-emerald-400" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Analytics</h3>
                <p className="text-zinc-400">Track performance</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Response Rate</span>
                <span className="text-emerald-400">78%</span>
              </div>
              <div className="w-full bg-zinc-700 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full w-[78%]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Applications */}
        <div className="bg-gradient-to-br from-zinc-900/90 via-zinc-800/70 to-violet-900/20 backdrop-blur-2xl rounded-xl p-6 border border-zinc-700/50">
          <h3 className="text-xl font-bold text-white mb-6">Recent Applications</h3>
          <div className="space-y-4">
            {[
              { name: "John Doe", position: "Frontend Developer", status: "pending", time: "2 hours ago" },
              { name: "Jane Smith", position: "Backend Engineer", status: "accepted", time: "4 hours ago" },
              { name: "Mike Johnson", position: "UI/UX Designer", status: "reviewing", time: "1 day ago" },
            ].map((application, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                    {application.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-white font-medium">{application.name}</p>
                    <p className="text-zinc-400 text-sm">{application.position}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    {application.status === 'pending' && <Clock className="text-yellow-500" size={16} />}
                    {application.status === 'accepted' && <CheckCircle className="text-green-500" size={16} />}
                    {application.status === 'reviewing' && <Eye className="text-blue-500" size={16} />}
                    <span className={`text-sm capitalize ${
                      application.status === 'pending' ? 'text-yellow-400' :
                      application.status === 'accepted' ? 'text-green-400' :
                      'text-blue-400'
                    }`}>
                      {application.status}
                    </span>
                  </div>
                  <span className="text-zinc-500 text-sm">{application.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
