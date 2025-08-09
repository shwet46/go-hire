export default function JobsStats({ jobsCount }: { jobsCount: number }) {
  return (
    <div className="grid md:grid-cols-3 gap-6 mb-8">
      <div className="bg-gradient-to-br from-zinc-900/90 via-zinc-800/70 to-violet-900/20 backdrop-blur-2xl rounded-xl p-6 border border-zinc-700/50 text-center">
        <div className="text-3xl font-bold text-violet-400 mb-2">{jobsCount}</div>
        <div className="text-zinc-400">Available Jobs</div>
      </div>
      <div className="bg-gradient-to-br from-zinc-900/90 via-zinc-800/70 to-violet-900/20 backdrop-blur-2xl rounded-xl p-6 border border-zinc-700/50 text-center">
        <div className="text-3xl font-bold text-indigo-400 mb-2">150+</div>
        <div className="text-zinc-400">Companies Hiring</div>
      </div>
      <div className="bg-gradient-to-br from-zinc-900/90 via-zinc-800/70 to-violet-900/20 backdrop-blur-2xl rounded-xl p-6 border border-zinc-700/50 text-center">
        <div className="text-3xl font-bold text-emerald-400 mb-2">2,500+</div>
        <div className="text-zinc-400">Successful Hires</div>
      </div>
    </div>
  );
}
