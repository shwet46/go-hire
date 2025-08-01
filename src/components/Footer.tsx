"use client";
import React, { useState, useEffect } from 'react';

const Footer = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="bg-gradient-to-t from-zinc-950 via-zinc-900 to-zinc-950 border-t border-transparent mt-16 relative overflow-hidden">
      {/* Decorative Gradient Glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-pink-600/20 blur-3xl rounded-full pointer-events-none z-0" />
      <div className="max-w-6xl mx-auto py-14 px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Logo and description */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">GoHire</h2>
            <p className="text-zinc-400 mt-2 max-w-md text-center md:text-left">
              Connecting top talent with leading employers. Your journey to the perfect job or hire starts here.
            </p>
          </div>
          <div className="flex space-x-4 justify-center md:justify-end mt-4 md:mt-0">
            <a href="https://github.com/shwet46" className="text-zinc-400 hover:text-indigo-400 transition-colors" aria-label="GitHub">
              <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/shweta-behera/" className="text-zinc-400 hover:text-indigo-400 transition-colors" aria-label="LinkedIn">
              <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a href="https://youtube.com/@shwet-46?si=0O9mNnLb6xF2VKuG" className="text-zinc-400 hover:text-indigo-400 transition-colors" aria-label="YouTube">
              <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
            <a href="https://x.com/shwet46" className="text-zinc-400 hover:text-indigo-400 transition-colors" aria-label="X (Twitter)">
              <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-10">
          {/* For Students */}
          <div>
            <h3 className="text-lg font-semibold text-zinc-200 mb-4">For Students</h3>
            <ul className="space-y-2">
              <li><a href="/jobs" className="text-zinc-400 hover:text-indigo-400 transition-colors">Jobs</a></li>
              <li><a href="/internships" className="text-zinc-400 hover:text-indigo-400 transition-colors">Internships</a></li>
              <li><a href="/practice" className="text-zinc-400 hover:text-indigo-400 transition-colors">Practice</a></li>
            </ul>
          </div>
          {/* For Recruiters */}
          <div>
            <h3 className="text-lg font-semibold text-zinc-200 mb-4">For Recruiters</h3>
            <ul className="space-y-2">
              <li><a href="/post-job" className="text-zinc-400 hover:text-indigo-400 transition-colors">Post a Job</a></li>
              <li><a href="/post-internship" className="text-zinc-400 hover:text-indigo-400 transition-colors">Post an Internship</a></li>
            </ul>
          </div>
          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold text-zinc-200 mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-zinc-400 hover:text-indigo-400 transition-colors">About Us</a></li>
              <li><a href="/contact" className="text-zinc-400 hover:text-indigo-400 transition-colors">Contact</a></li>
              <li><a href="/faq" className="text-zinc-400 hover:text-indigo-400 transition-colors">FAQ</a></li>
            </ul>
          </div>
          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold text-zinc-200 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="/privacy" className="text-zinc-400 hover:text-indigo-400 transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="text-zinc-400 hover:text-indigo-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-zinc-800" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-500 text-sm">
            &copy; {currentDate.getFullYear()} GoHire. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;