"use client";
import React from "react";
import {Users, Target, Zap, Star, Building, TrendingUp} from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Target,
      title: "Smart Talent Matching",
      description: "Get matched with candidates that fit your startup's needs, culture, and budget"
    },
    {
      icon: Users,
      title: "Student & Freelancer Pool",
      description: "Access a curated network of motivated students and skilled freelancers"
    },
    {
      icon: TrendingUp,
      title: "Track Hiring Progress",
      description: "Monitor your recruitment pipeline with detailed analytics and hiring insights"
    },
    {
      icon: Building,
      title: "Startup-Friendly Pricing",
      description: "Affordable hiring solutions designed specifically for early-stage companies"
    },
    {
      icon: Zap,
      title: "Quick Application Process",
      description: "Post jobs and receive applications within hours, not weeks"
    },
    {
      icon: Star,
      title: "Pre-Vetted Candidates",
      description: "All talent is screened for skills and commitment to ensure quality matches"
    },
  ];

  return (
    <div className="mt-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Powerful Features for Smart Hiring
        </h2>
        <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
          Everything you need to find and hire the perfect talent for your startup
        </p>
      </div>
            
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {features.map((feature, index) => {
          const FeatureIcon = feature.icon;
          return (
            <div 
              key={index}
              className="relative p-6 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-white/20 transition-all duration-300 group overflow-hidden"
            >
              {/* Decorative gradient blob in background */}
              <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
              
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center p-2 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg mb-4 shadow-lg shadow-blue-900/20">
                  <FeatureIcon className="text-white" size={22} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-neutral-400 leading-relaxed">{feature.description}</p>
              </div>
              
              {/* Bottom highlight line */}
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:w-full transition-all duration-300 ease-out"></div>
            </div>
          );
        })}
      </div>
      
      {/* Subtle connector element */}
      <div className="flex justify-center mt-16">
        <div className="flex space-x-2">
          <span className="block w-2 h-2 rounded-full bg-blue-500"></span>
          <span className="block w-2 h-2 rounded-full bg-cyan-500"></span>
          <span className="block w-2 h-2 rounded-full bg-blue-500"></span>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;