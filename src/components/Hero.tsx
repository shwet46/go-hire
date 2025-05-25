import React from 'react';
import { Briefcase, Users, Target, Zap, Star, ArrowRight, CheckCircle, Building, TrendingUp } from 'lucide-react';
import { BackgroundBeams } from "./ui/background-beams";
import Link from "next/link";
import Image from "next/image";

const StatsSection = () => {
  const stats = [
    { icon: Users, label: "Active Users", value: "50K+" },
    { icon: Building, label: "Companies", value: "2K+" },
    { icon: Briefcase, label: "Jobs Posted", value: "15K+" },
    { icon: TrendingUp, label: "Success Rate", value: "95%" }
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

const FeaturesSection = () => {
  const features = [
    {
      icon: Target,
      title: "Smart Matching",
      description: "AI-powered algorithm matches candidates with perfect job opportunities"
    },
    {
      icon: Zap,
      title: "Interview Prep",
      description: "Practice and prepare for interviews with our comprehensive training tools"
    },
    {
      icon: Users,
      title: "Global Network",
      description: "Connect with talent and opportunities worldwide"
    },
    {
      icon: Briefcase,
      title: "Student Internships",
      description: "Students can discover and apply for internships to kickstart their careers"
    },
    {
      icon: Star,
      title: "Earn & Redeem Points",
      description: "Earn points for your activity and redeem them for rewards (T&C apply)"
    }
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
      name: "Sarah Chen",
      role: "Software Engineer",
      company: "TechCorp",
      content: "Found my dream job in just 2 weeks! The matching system is incredibly accurate.",
      rating: 5
    },
    {
      name: "Michael Rodriguez",
      role: "HR Director",
      company: "StartupXYZ",
      content: "GoHire helped us find top-tier talent 3x faster than traditional methods.",
      rating: 5
    },
    {
      name: "Priya Patel",
      role: "Student Intern",
      company: "InnovateLab",
      content: "As a student, I landed my first internship through GoHire. The process was smooth and supportive!",
      rating: 5
    },
    {
      name: "David Kim",
      role: "Product Manager",
      company: "CloudWorks",
      content: "The points system is a great motivator! I redeemed my points for exclusive resources.",
      rating: 5
    },
    {
      name: "Emily Nguyen",
      role: "Data Analyst",
      company: "DataStream",
      content: "The interview prep tools gave me the confidence I needed. Highly recommended!",
      rating: 5
    }
  ];

  return (
    <div className="mt-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
        What Our Users Say
      </h2>
      <div className="grid md:grid-cols-2 gap-8">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="p-6 rounded-xl bg-neutral-900/60 backdrop-blur-sm border border-neutral-800">
            <div className="flex mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="text-yellow-400 fill-current" size={20} />
              ))}
            </div>
            <p className="text-neutral-300 mb-4 italic">"{testimonial.content}"</p>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                {testimonial.name.charAt(0)}
              </div>
              <div className="ml-3">
                <div className="text-white font-medium">{testimonial.name}</div>
                <div className="text-neutral-400 text-sm">{testimonial.role} at {testimonial.company}</div>
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
          Ready to Transform Your Career?
        </h2>
        <p className="text-xl text-neutral-300 mb-8 max-w-2xl mx-auto">
          Join thousands of professionals and students who've found their perfect match with GoHire.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/jobs">
            <button className="p-[3px] relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
              <div className="px-8 py-3 bg-black rounded-[6px] relative transition duration-200 text-white hover:bg-transparent flex items-center space-x-2">
                <Briefcase size={18} />
                <span>Find Jobs</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </Link>
          <Link href="/employers">
            <button className="px-8 py-3 border border-neutral-600 rounded-lg text-white hover:border-indigo-500 transition-colors duration-200 flex items-center space-x-2 justify-center">
              <Users size={18} />
              <span>For Employers</span>
            </button>
          </Link>
        </div>
        <div className="mt-6 text-neutral-400 text-sm">
          <span>
            Students can also apply for internships and earn points for their activity. Points can be redeemed for rewards. <span className="text-neutral-500 italic">Terms and conditions apply.</span>
          </span>
        </div>
      </div>
    </div>
  );
};

const TrustIndicators = () => {
  const companies = [
    "TechCorp", "InnovateLab", "DataStream", "CloudWorks", "StartupXYZ"
  ];

  return (
    <div className="mt-16">
      <p className="text-center text-neutral-500 mb-8">Trusted by leading companies</p>
      <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
        {companies.map((company, index) => (
          <div key={index} className="text-neutral-400 font-medium text-lg">
            {company}
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
            GoHire is your gateway to top talent and dream jobs. Discover opportunities, connect with employers, and streamline your hiring or job search process. Plus, prepare and practice for interviews with our comprehensive tools. Whether you're looking to build your team or advance your career, GoHire makes recruitment simple, fast, and effective.
          </p>

          <div className="flex justify-center mb-8">
            <Link href="/create">
              <button className="p-[3px] relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                <div className="px-8 py-3 bg-black rounded-[6px] relative transition duration-200 text-white hover:bg-transparent flex items-center space-x-2">
                  <Briefcase size={18} />
                  <span>Get Started</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </Link>
          </div>

          {/* Key Benefits */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-neutral-400">
            <div className="flex items-center space-x-1">
              <CheckCircle size={16} className="text-green-400" />
              <span>Free to start</span>
            </div>
            <div className="flex items-center space-x-1">
              <CheckCircle size={16} className="text-green-400" />
              <span>No setup fees</span>
            </div>
            <div className="flex items-center space-x-1">
              <CheckCircle size={16} className="text-green-400" />
              <span>24/7 support</span>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <StatsSection />

        {/* Trust Indicators */}
        <TrustIndicators />

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