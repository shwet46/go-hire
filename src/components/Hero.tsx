import React from 'react';
import {ArrowRight, CheckCircle, Users, Trophy, Gift} from 'lucide-react';
import { BackgroundBeams } from "./ui/background-beams";
import Link from "next/link";
import Image from "next/image";
import TrustIndicators from "./Hero/TrustIndicators";
import GameMechanicsSection from './Hero/GameMechanicsSection';
import FeaturesSection from './Hero/FeaturesSection';
import StatsSection from './Hero/StatsSection';
import TestimonialsSection from './Hero/TestimonialsSection';
import CTASection from './Hero/CTASection';

function Hero() {
  return (
    <div className="min-h-screen w-full mt-10 rounded-md bg-neutral-950 relative flex flex-col antialiased">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 md:px-16 pt-28 pb-20 z-10 relative">
        {/* Main Hero Section - Left/Right Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left Side - Content */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 mb-6">
              <Image src="/gohire.png" alt="GoHire Logo" width={56} height={56} />
              <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                GoHire
              </h1>
            </div>
            
            <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight">
              Transform your job search into an 
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"> engaging game</span>
            </h2>
            
            <p className="text-lg text-neutral-300 leading-relaxed max-w-xl">
              Earn points by completing career tasks, compete on leaderboards, refer friends, and unlock exclusive rewards while landing your dream job.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/auth/signin">
                <button className="p-[3px] relative group w-full sm:w-auto">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                  <div className="px-8 py-4 bg-black rounded-[6px] relative transition duration-200 text-white hover:bg-transparent flex items-center justify-center space-x-2 font-semibold">
                    <span>Get Started </span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              </Link>
            </div>
            
            {/* Key Benefits */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-neutral-300">
                <CheckCircle size={20} className="text-green-400 flex-shrink-0" />
                <span className="text-base">Earn points for every career action you take</span>
              </div>
              <div className="flex items-center space-x-3 text-neutral-300">
                <CheckCircle size={20} className="text-green-400 flex-shrink-0" />
                <span className="text-base">Compete with peers on global leaderboards</span>
              </div>
              <div className="flex items-center space-x-3 text-neutral-300">
                <CheckCircle size={20} className="text-green-400 flex-shrink-0" />
                <span className="text-base">Unlock exclusive rewards and job opportunities</span>
              </div>
            </div>
          </div>
          
          {/* Right Side - Visual Elements */}
          <div className="relative lg:pl-8">
            {/* Floating Cards */}
            <div className="relative h-96 lg:h-[500px]">
              {/* Main Card */}
              <div className="absolute top-0 right-0 w-80 h-64 bg-gradient-to-br from-indigo-900/40 to-purple-900/40 rounded-2xl border border-indigo-500/20 backdrop-blur-sm p-6 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-bold text-lg">Your Progress</h3>
                  <Trophy className="text-yellow-400" size={24} />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-300">Points Earned</span>
                    <span className="text-indigo-400 font-bold">2,847</span>
                  </div>
                  <div className="w-full bg-neutral-800 rounded-full h-2">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full w-3/4"></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-300">Rank</span>
                    <span className="text-purple-400 font-bold">#47</span>
                  </div>
                </div>
              </div>
              
              {/* Secondary Card */}
              <div className="absolute top-12 left-0 w-72 h-48 bg-gradient-to-br from-purple-900/40 to-pink-900/40 rounded-2xl border border-purple-500/20 backdrop-blur-sm p-6 transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-bold">Achievements</h3>
                  <Gift className="text-pink-400" size={24} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-sm text-neutral-300">Profile 100% Complete</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span className="text-sm text-neutral-300">5 Applications Sent</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-sm text-neutral-300">First Interview Booked</span>
                  </div>
                </div>
              </div>
              
              {/* Leaderboard Card */}
              <div className="absolute bottom-0 right-8 w-64 h-40 bg-gradient-to-br from-green-900/40 to-teal-900/40 rounded-2xl border border-green-500/20 backdrop-blur-sm p-4 transform rotate-1 hover:rotate-0 transition-transform duration-300">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-white font-bold text-sm">Leaderboard</h3>
                  <Users className="text-green-400" size={20} />
                </div>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between items-center py-1">
                    <span className="text-neutral-300">1. Sarah Chen</span>
                    <span className="text-green-400 font-bold">5,234</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-neutral-300">2. Mike Johnson</span>
                    <span className="text-green-400 font-bold">4,876</span>
                  </div>
                  <div className="flex justify-between items-center py-1 bg-indigo-500/20 px-2 rounded">
                    <span className="text-white">47. You</span>
                    <span className="text-indigo-400 font-bold">2,847</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <StatsSection />
        <TrustIndicators />
        <GameMechanicsSection />
        <FeaturesSection />
        <TestimonialsSection />
        <CTASection />
      </div>
      <BackgroundBeams className="z-0" />
    </div>
  );
}

export default Hero;