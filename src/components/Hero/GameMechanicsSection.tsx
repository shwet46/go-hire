'use client';
import React from 'react';
import { Briefcase, Target, CheckCircle, Trophy, UserPlus, Upload } from 'lucide-react';

const GameMechanicsSection = () => {
  const tasks = [
    {
      icon: CheckCircle,
      title: 'Post Your First Job',
      points: 'Free',
      description: 'Create your startup profile and post your first internship or project role',
    },
    {
      icon: UserPlus,
      title: 'Invite Team Members',
      points: 'Collaborate',
      description: 'Add co-founders and team members to review candidates together',
    },
    {
      icon: Briefcase,
      title: 'Browse Talent Pool',
      points: 'Unlimited',
      description: 'Search through our curated database of students and freelancers',
    },
    {
      icon: Upload,
      title: 'Share Job Requirements',
      points: 'Detailed',
      description: 'Upload project briefs and detailed role descriptions for better matches',
    },
    {
      icon: Target,
      title: 'Set Budget & Timeline',
      points: 'Flexible',
      description: 'Define your hiring budget and project timeline to attract right candidates',
    },
    {
      icon: Trophy,
      title: 'Hire Top Talent',
      points: 'Success',
      description: 'Connect with pre-vetted candidates and build your dream team',
    },
  ];

  return (
    <section className="mt-20 relative py-16">
      {/* Professional background effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-violet-600/5 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-violet-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent mb-4">
            Simple Hiring Process
          </h2>
          <p className="text-center text-neutral-400 mb-4 max-w-2xl mx-auto text-lg">
            From posting your first job to hiring your perfect candidate - we make it simple for
            startups
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-violet-500 to-indigo-500 mx-auto rounded-full opacity-70"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {tasks.map((task, index) => {
            const TaskIcon = task.icon;
            return (
              <div
                key={index}
                className="p-7 rounded-xl bg-gradient-to-br from-neutral-900/90 to-neutral-800/90 backdrop-blur-md border border-neutral-700/50 hover:border-violet-500/40 transition-all duration-300 group shadow-xl hover:shadow-violet-500/5"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="bg-gradient-to-r from-violet-600 to-indigo-600 w-14 h-14 rounded-lg flex items-center justify-center group-hover:scale-105 transition-all duration-300 shadow-lg shadow-indigo-900/30">
                    <TaskIcon className="text-white" size={26} />
                  </div>
                  <div className="bg-emerald-500/10 text-emerald-400 px-4 py-1.5 rounded-full text-sm font-medium border border-emerald-500/20 tracking-wide">
                    {task.points}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-violet-300 transition-colors">
                  {task.title}
                </h3>
                <p className="text-neutral-400 leading-relaxed">{task.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Professional bottom divider */}
      <div className="mt-16 flex justify-center opacity-50">
        <div className="h-px w-48 bg-gradient-to-r from-transparent via-violet-500 to-transparent"></div>
      </div>
    </section>
  );
};

export default GameMechanicsSection;
