"use client";
import React from "react";
import Link from "next/link";
import { Trophy, ArrowRight, Briefcase } from 'lucide-react';

const CTASection = () => {
  return (
    <div className="mt-20 text-center">
      <div className="bg-transparent  p-8 md:p-12 backdrop-blur-sm">
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

export default CTASection;