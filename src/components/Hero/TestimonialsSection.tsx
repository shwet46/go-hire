'use client';
import React from 'react';
import { Star, Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Arjun Mehta',
      role: 'Founder & CEO',
      company: 'EcoTech Solutions',
      content:
        'Found our lead developer and two interns within 2 weeks. The talent quality exceeded our expectations for early-stage hiring.',
      rating: 5,
      badge: 'Startup Success',
      avatar: 'AM',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      name: 'Kavya Iyer',
      role: 'Co-founder',
      company: 'HealthFirst AI',
      content:
        'The pre-vetted students saved us hours of screening. Hired 3 passionate interns who became full-time team members.',
      rating: 5,
      badge: 'Team Builder',
      avatar: 'KI',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      name: 'Rohan Sharma',
      role: 'Tech Lead',
      company: 'GreenSpace Startup',
      content:
        'Cost-effective hiring solution perfect for startups. The talent pool is genuinely motivated and skilled.',
      rating: 5,
      badge: 'Budget Saver',
      avatar: 'RS',
      gradient: 'from-green-500 to-teal-500',
    },
    {
      name: 'Priya Singh',
      role: 'CS Student',
      company: 'IIT Mumbai',
      content:
        'Got an amazing internship opportunity that turned into a founding team position. The platform connects real talent with real startups.',
      rating: 5,
      badge: 'Dream Achieved',
      avatar: 'PS',
      gradient: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <div className="mt-20 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-2xl"></div>
      </div>

      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6 border border-neutral-700 bg-neutral-900/50 backdrop-blur-sm">
          <Quote size={16} className="text-indigo-400" />
          <span className="text-sm font-medium text-neutral-300">Testimonials</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-center bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent mb-4 leading-tight">
          Success Stories from Our Community
        </h2>
        <p className="text-neutral-400 text-lg max-w-2xl mx-auto leading-relaxed">
          Hear from startup founders and talented individuals who found their perfect match
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="group relative p-8 rounded-2xl bg-gradient-to-br from-neutral-900/80 to-neutral-800/80 backdrop-blur-xl border border-neutral-700/50 hover:border-neutral-600/80 transition-all duration-500 hover:transform hover:scale-[1.02] overflow-hidden"
          >
            {/* Floating gradient orb */}
            <div
              className={`absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br ${testimonial.gradient} opacity-5 group-hover:opacity-10 rounded-full blur-xl transition-all duration-500 group-hover:scale-125`}
            ></div>

            {/* Rating and Badge */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 fill-current drop-shadow-sm" size={18} />
                ))}
              </div>
              <div
                className={`bg-gradient-to-r ${testimonial.gradient} bg-opacity-20 text-transparent bg-clip-text px-3 py-1.5 rounded-full text-xs font-semibold border border-white/10 backdrop-blur-sm`}
              >
                <span className="text-white">{testimonial.badge}</span>
              </div>
            </div>

            {/* Testimonial Content */}
            <blockquote className="text-neutral-200 mb-6 text-base leading-relaxed font-medium relative z-10">
              &quot;{testimonial.content}&quot;
            </blockquote>

            {/* Author Info */}
            <div className="flex items-center relative z-10">
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-r ${testimonial.gradient} flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:scale-110 transition-transform duration-300`}
              >
                {testimonial.avatar}
              </div>
              <div className="ml-4">
                <div className="text-white font-semibold text-base group-hover:text-neutral-100 transition-colors">
                  {testimonial.name}
                </div>
                <div className="text-neutral-400 text-sm group-hover:text-neutral-300 transition-colors">
                  {testimonial.role} • {testimonial.company}
                </div>
              </div>
            </div>

            {/* Bottom accent line */}
            <div
              className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${testimonial.gradient} group-hover:w-full transition-all duration-500 ease-out`}
            ></div>
          </div>
        ))}
      </div>

      {/* Bottom CTA or Social Proof */}
      <div className="mt-16 text-center">
        <div className="inline-flex items-center gap-8 text-sm text-neutral-500">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {testimonials.slice(0, 3).map((t, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 rounded-full bg-gradient-to-r ${t.gradient} border-2 border-neutral-900 flex items-center justify-center text-white text-xs font-semibold`}
                >
                  {t.avatar}
                </div>
              ))}
            </div>
            <span>Join 800+ startups</span>
          </div>
          <div className="h-4 w-px bg-neutral-700"></div>
          <div className="flex items-center gap-2">
            <Star className="text-yellow-400 fill-current" size={16} />
            <span>4.8/5 average rating</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
