"use client";
import React from "react";
import { Star } from 'lucide-react';

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
            <p className="text-neutral-300 mb-4 italic">&quot;{testimonial.content}&quot;</p>
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

export default TestimonialsSection;