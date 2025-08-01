"use client";
import React from "react";
import { Briefcase, Users, Building, Trophy, TrendingUp, Star, Zap, Target } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    { 
      icon: Users, 
      label: "Active Students", 
      value: "50K+", 
      description: "Gamifying their career journey",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
      hoverBorder: "hover:border-blue-400/40"
    },
    { 
      icon: Building, 
      label: "Partner Companies", 
      value: "1,200+", 
      description: "Fortune 500 & startups",
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20",
      hoverBorder: "hover:border-green-400/40"
    },
    { 
      icon: Briefcase, 
      label: "Dream Jobs", 
      value: "15K+", 
      description: "Matched every month",
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
      hoverBorder: "hover:border-purple-400/40"
    },
    { 
      icon: Trophy, 
      label: "Points Earned", 
      value: "50M+", 
      description: "By our community",
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/20",
      hoverBorder: "hover:border-yellow-400/40"
    }
  ];

  return (
    <div className="mt-26 mb-16">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-4 border border-neutral-700">
          <TrendingUp size={16} className="text-indigo-400" />
          <span className="text-sm font-medium text-neutral-300">Real Impact</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Powering Career Success
        </h2>
        <p className="text-neutral-400 max-w-2xl mx-auto">
          Join a thriving community where students turn career building into an engaging game
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, index) => {
          const StatIcon = stat.icon;
          return (
            <div 
              key={index} 
              className={`group relative overflow-hidden text-center p-6 md:p-8 rounded-2xl border transition-all duration-300 hover:transform hover:scale-105 ${stat.borderColor} ${stat.hoverBorder}`}
            >
              {/* Background glow effect on hover */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${stat.bgColor}`}></div>
              
              {/* Icon container */}
              <div className={`relative flex items-center justify-center w-14 h-14 mx-auto mb-4 rounded-xl transition-all duration-300 ${stat.bgColor} group-hover:scale-110`}>
                <StatIcon className={`${stat.color} transition-all duration-300 group-hover:scale-110`} size={28} />
              </div>
              
              {/* Stats content */}
              <div className="relative">
                <div className={`text-3xl md:text-4xl font-extrabold mb-1 transition-colors duration-300 ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-sm md:text-base font-semibold text-white mb-1 transition-colors duration-300">
                  {stat.label}
                </div>
                <div className="text-xs md:text-sm text-neutral-400 group-hover:text-neutral-300 transition-colors duration-300">
                  {stat.description}
                </div>
              </div>

              {/* Subtle corner accent */}
              <div className={`absolute top-0 right-0 w-16 h-16 opacity-10 group-hover:opacity-20 transition-opacity duration-300`}>
                <div className={`w-full h-full rounded-bl-2xl ${stat.bgColor.replace('/10', '/30')}`}></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom achievement indicators */}
      <div className="mt-12 flex flex-wrap justify-center items-center gap-6 text-sm text-neutral-500">
        <div className="flex items-center gap-2">
          <Star size={16} className="text-yellow-400" />
          <span>4.9/5 Student Rating</span>
        </div>
        <div className="flex items-center gap-2">
          <Zap size={16} className="text-indigo-400" />
          <span>95% Job Match Success</span>
        </div>
        <div className="flex items-center gap-2">
          <Target size={16} className="text-green-400" />
          <span>3x Faster Hiring</span>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;