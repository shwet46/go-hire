import React from 'react';
import { Briefcase } from 'lucide-react'; 
import { BackgroundBeams } from "./ui/background-beams";
import Link from "next/link";
import Image from "next/image";

function Hero() {
  return (
    <div className="h-screen w-full rounded-md bg-neutral-950 relative flex flex-col justify-start antialiased">
      <div className="w-full max-w-4xl px-6 sm:px-10 mt-10 md:px-16 pt-28 z-10 relative">
        <h1 className="flex items-center gap-3 text-4xl md:text-6xl font-extrabold bg-gradient-to-r pb-4 from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-6">
          <Image src="/gohire.png" alt="GoHire Logo" width={48} height={48} />
          GoHire
        </h1>

        <p className="text-base md:text-lg font-normal text-neutral-300 mb-6">
          GoHire is your gateway to top talent and dream jobs. Discover opportunities, connect with employers, and streamline your hiring or job search process. Whether you're looking to build your team or advance your career, GoHire makes recruitment simple, fast, and effective.
        </p>

        <Link href="/create">
          <button className="p-[3px] relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
            <div className="px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent flex items-center space-x-2">
              <Briefcase size={18} /> 
              <span>Get Started</span>
            </div>
          </button>
        </Link>
      </div>
      <BackgroundBeams className="z-0" />
    </div>
  );
}

export default Hero;