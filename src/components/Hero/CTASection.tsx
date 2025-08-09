"use client";
import React from "react";
import Link from "next/link";
import { Users, ArrowRight, Briefcase } from 'lucide-react';

const CTASection = () => {
  return (
    <div className="mt-20 text-center">
      <div className="bg-transparent p-8 md:p-12 backdrop-blur-sm">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Find Your Perfect Team Today
        </h2>
        <p className="text-xl text-neutral-300 mb-8 max-w-2xl mx-auto">
          Connect with talented students and passionate freelancers ready to help build your startup. Quality talent, affordable rates, perfect for early-stage companies.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/auth/signin">
            <button className="p-[3px] relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
              <div className="px-8 py-3 bg-black rounded-[6px] relative transition duration-200 text-white hover:bg-transparent flex items-center space-x-2">
                <Users size={18} />
                <span>Get Started</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </Link>
          <Link href="/talent">
            <button className="px-8 py-3 border border-neutral-600 rounded-lg text-white hover:border-indigo-500 transition-colors duration-200 flex items-center space-x-2 justify-center">
              <Briefcase size={18} />
              <span>Browse</span>
            </button>
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="bg-neutral-800/50 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-400 mb-1">Affordable</div>
            <div className="text-sm text-neutral-400">Budget-friendly for startups</div>
          </div>
          <div className="bg-neutral-800/50 rounded-lg p-4">
            <div className="text-2xl font-bold text-indigo-400 mb-1">Quick</div>
            <div className="text-sm text-neutral-400">Post jobs and get applicants fast</div>
          </div>
          <div className="bg-neutral-800/50 rounded-lg p-4">
            <div className="text-2xl font-bold text-purple-400 mb-1">Quality</div>
            <div className="text-sm text-neutral-400">Pre-vetted students and freelancers</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;