import React from 'react';
import { Briefcase, Users, Target, Zap, Star, ArrowRight, CheckCircle, Building, TrendingUp, Trophy, Gift, UserPlus, Upload } from 'lucide-react';
import { BackgroundBeams } from "./ui/background-beams";
import Link from "next/link";
import Image from "next/image";

const StatsSection = () => {
  const stats = [
    { icon: Users, label: "Active Students", value: "10K+" },
    { icon: Building, label: "Partner Companies", value: "500+" },
    { icon: Briefcase, label: "Jobs Available", value: "2K+" },
    { icon: Trophy, label: "Points Awarded", value: "5M+" }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 mb-12">
      {stats.map((stat, index) => (
        <div key={index} className="text-center p-4 rounded-lg bg-neutral-900/50 backdrop-blur-sm border border-neutral-800">
          <stat.icon className="mx-auto mb-2 text-indigo-400" size={24} />
          <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
          <div className="text-sm text-neutral-400">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

const GameMechanicsSection = () => {
  const tasks = [
    {
      icon: CheckCircle,
      title: "Daily Sign-In",
      points: "10 pts",
      description: "Check in daily to earn consistent points and maintain your streak"
    },
    {
      icon: UserPlus,
      title: "Refer Friends",
      points: "200 pts",
      description: "Invite peers to join and earn points when they successfully register"
    },
    {
      icon: Briefcase,
      title: "Apply for Jobs",
      points: "5 pts",
      description: "Each job application through our portal earns you points"
    },
    {
      icon: Upload,
      title: "Upload Resume",
      points: "20 pts",
      description: "Keep your profile updated with your latest resume"
    },
    {
      icon: Target,
      title: "Complete Profile",
      points: "50 pts",
      description: "Fill out all profile fields including education and skills"
    },
    {
      icon: Trophy,
      title: "Climb Leaderboard",
      points: "Bonus",
      description: "Compete with peers and unlock milestone rewards"
    }
  ];

  return (
    <div className="mt-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4">
        Earn Points, Get Rewarded
      </h2>
      <p className="text-center text-neutral-400 mb-12 max-w-2xl mx-auto">
        Complete career-building tasks to earn points, climb the leaderboard, and unlock exclusive rewards
      </p>
      <div className="grid md:grid-cols-3 gap-6">
        {tasks.map((task, index) => (
          <div key={index} className="p-6 rounded-xl bg-gradient-to-br from-neutral-900/80 to-neutral-800/80 backdrop-blur-sm border border-neutral-700 hover:border-indigo-500/50 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <task.icon className="text-white" size={24} />
              </div>
              <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-semibold">
                {task.points}
              </div>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">{task.title}</h3>
            <p className="text-neutral-400 text-sm">{task.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      icon: Target,
      title: "Smart Job Matching",
      description: "Get matched with jobs that fit your skills, experience, and career goals"
    },
    {
      icon: Users,
      title: "Peer Competition",
      description: "Compete with classmates and peers on skill-based leaderboards"
    },
    {
      icon: TrendingUp,
      title: "Track Progress",
      description: "Monitor your career development with detailed analytics and milestones"
    },
    {
      icon: Building,
      title: "Direct Recruiter Access",
      description: "Connect directly with recruiters from top companies actively hiring"
    },
    {
      icon: Zap,
      title: "Real-time Updates",
      description: "Get instant notifications about new opportunities and point earnings"
    },
    {
      icon: Star,
      title: "Practice & Skill Development",
      description: "Sharpen your skills with our practice feature and prepare for real-world challenges"
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-8 mt-16">
      {features.map((feature, index) => (
        <div key={index} className="p-6 rounded-xl bg-gradient-to-br from-neutral-900/80 to-neutral-800/80 backdrop-blur-sm border border-neutral-700 hover:border-indigo-500/50 transition-all duration-300 group">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
            <feature.icon className="text-white" size={24} />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
          <p className="text-neutral-400">{feature.description}</p>
        </div>
      ))}
    </div>
  );
};

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Computer Science Student",
      company: "IIT Delhi",
      content: "I earned 1,500 points in my first week! The gamification made job searching actually fun and engaging.",
      rating: 5,
      points: "Top 10 on leaderboard"
    },
    {
      name: "Rahul Gupta",
      role: "Final Year Student",
      company: "NIT Trichy",
      content: "Referred 5 friends and earned 1,000 bonus points. The referral system is amazing!",
      rating: 5,
      points: "Referral Champion"
    },
    {
      name: "Sneha Patel",
      role: "Fresher",
      company: "Recently Placed",
      content: "Got my first job through the portal and the points I earned helped me access premium interview prep!",
      rating: 5,
      points: "Mission Accomplished"
    },
    {
      name: "Arjun Singh",
      role: "HR Manager",
      company: "TechStart Inc",
      content: "The point-based ranking helps us identify the most engaged and motivated candidates quickly.",
      rating: 5,
      points: "Recruiter Verified"
    }
  ];

  return (
    <div className="mt-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
        Success Stories from Our Community
      </h2>
      <div className="grid md:grid-cols-2 gap-8">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="p-6 rounded-xl bg-neutral-900/60 backdrop-blur-sm border border-neutral-800 hover:border-indigo-500/30 transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <div className="flex">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 fill-current" size={16} />
                ))}
              </div>
              <div className="bg-indigo-500/20 text-indigo-400 px-2 py-1 rounded text-xs">
                {testimonial.points}
              </div>
            </div>
            <p className="text-neutral-300 mb-4 italic">"{testimonial.content}"</p>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                {testimonial.name.charAt(0)}
              </div>
              <div className="ml-3">
                <div className="text-white font-medium">{testimonial.name}</div>
                <div className="text-neutral-400 text-sm">{testimonial.role} • {testimonial.company}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CTASection = () => {
  return (
    <div className="mt-20 text-center">
      <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 rounded-2xl p-8 md:p-12 backdrop-blur-sm border border-indigo-500/20">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Start Your Career Journey Today
        </h2>
        <p className="text-xl text-neutral-300 mb-8 max-w-2xl mx-auto">
          Join thousands of students earning points, building careers, and landing dream jobs. Your journey to success starts with a single click.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/auth/signin">
            <button className="p-[3px] relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
              <div className="px-8 py-3 bg-black rounded-[6px] relative transition duration-200 text-white hover:bg-transparent flex items-center space-x-2">
                <Trophy size={18} />
                <span>Start Earning Points</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </Link>
          <Link href="/jobs">
            <button className="px-8 py-3 border border-neutral-600 rounded-lg text-white hover:border-indigo-500 transition-colors duration-200 flex items-center space-x-2 justify-center">
              <Briefcase size={18} />
              <span>Browse Jobs</span>
            </button>
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="bg-neutral-800/50 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-400 mb-1">Free</div>
            <div className="text-sm text-neutral-400">Always free for students</div>
          </div>
          <div className="bg-neutral-800/50 rounded-lg p-4">
            <div className="text-2xl font-bold text-indigo-400 mb-1">Instant</div>
            <div className="text-sm text-neutral-400">Start earning points immediately</div>
          </div>
          <div className="bg-neutral-800/50 rounded-lg p-4">
            <div className="text-2xl font-bold text-purple-400 mb-1">Rewarding</div>
            <div className="text-sm text-neutral-400">Unlock exclusive career tools</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TrustIndicators = () => {
  const partners = [
    "Student Placement Cell", "Career Development Centers", "University Partners", "Industry Leaders", "Startup Ecosystem"
  ];

  return (
    <div className="mt-16">
      <p className="text-center text-neutral-500 mb-8">Trusted by educational institutions and industry partners</p>
      <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
        {partners.map((partner, index) => (
          <div key={index} className="text-neutral-400 font-medium text-sm">
            {partner}
          </div>
        ))}
      </div>
    </div>
  );
};

function Hero() {
  return (
    <div className="min-h-screen w-full rounded-md bg-neutral-950 relative flex flex-col antialiased">
      <div className="w-full max-w-6xl mx-auto px-6 sm:px-10 md:px-16 pt-28 pb-20 z-10 relative">
        {/* Main Hero Section */}
        <div className="text-center mb-16">
          <h1 className="flex items-center justify-center gap-3 text-4xl md:text-6xl font-extrabold bg-gradient-to-r pb-4 from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-6">
            <Image src="/gohire.png" alt="GoHire Logo" width={48} height={48} />
            GoHire
          </h1>

          <p className="text-base md:text-xl font-normal text-neutral-300 mb-8 max-w-3xl mx-auto">
            Transform your job search into an engaging game! Earn points by completing career tasks, compete on leaderboards, refer friends, and unlock exclusive rewards while landing your dream job.
          </p>

          <div className="flex justify-center mb-8">
            <Link href="/auth/signin">
              <button className="p-[3px] relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                <div className="px-8 py-3 bg-black rounded-[6px] relative transition duration-200 text-white hover:bg-transparent flex items-center space-x-2">
                  <Star size={18} />
                  <span>Join the Game</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </Link>
          </div>

          {/* Key Benefits */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-neutral-400">
            <div className="flex items-center space-x-1">
              <CheckCircle size={16} className="text-green-400" />
              <span>Earn points for every action</span>
            </div>
            <div className="flex items-center space-x-1">
              <CheckCircle size={16} className="text-green-400" />
              <span>Compete with peers</span>
            </div>
            <div className="flex items-center space-x-1">
              <CheckCircle size={16} className="text-green-400" />
              <span>Unlock exclusive rewards</span>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <StatsSection />

        {/* Trust Indicators */}
        <TrustIndicators />

        {/* Game Mechanics Section */}
        <GameMechanicsSection />

        {/* Features Section */}
        <FeaturesSection />

        {/* Testimonials */}
        <TestimonialsSection />

        {/* Final CTA */}
        <CTASection />
      </div>
      
      <BackgroundBeams className="z-0" />
    </div>
  );
}

export default Hero;