"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconLogin, IconLogout, IconMenu2, IconX } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import type { JSX } from "react";

// cn utility function (assuming it's from "@/lib/utils")
// This function is typically used to conditionally join Tailwind CSS classes.
function cn(...inputs: (string | undefined | null | boolean)[]) {
  return inputs.filter(Boolean).join(" ");
}

export const FloatingNav = ({
  navItems,
  className,
  isLoggedIn,
  onSignInOut,
  userRole, // Added userRole prop
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
  isLoggedIn: boolean;
  onSignInOut: () => void;
  userRole: string; // Added userRole prop type
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Close mobile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuRef]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "w-full fixed top-0 left-0 right-0 z-50 bg-white dark:bg-zinc-900 border-b border-neutral-200 dark:border-zinc-700 shadow-sm backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <Image 
                src="/gohire.png" 
                alt="GoHire Logo" 
                width={32}
                height={32}
                className="h-8 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((navItem, idx) => (
              <Link
                key={`link-${idx}`}
                href={navItem.link}
                className="relative group py-2"
              >
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                  {navItem.name}
                </span>
                <span className="absolute -bottom-[1px] left-0 w-0 h-0.5 bg-violet-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>

          {/* Right side - User Role and Sign In/Out */}
          <div className="flex items-center space-x-4">
            {/* Display user role if logged in */}
            {isLoggedIn && userRole && (
              <span className="hidden sm:block text-sm font-medium px-3 py-1 bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 rounded-full">
                {userRole}
              </span>
            )}

            <button
              onClick={onSignInOut}
              className="hidden sm:flex border text-sm font-medium relative border-neutral-200 dark:border-zinc-700 text-black dark:text-white px-4 py-2 rounded-full items-center space-x-2 hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-colors group"
            >
              {isLoggedIn ? (
                <>
                  <IconLogout className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                  <span>Sign Out</span>
                </>
              ) : (
                <>
                  <IconLogin className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                  <span>Sign In</span>
                </>
              )}
              <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-violet-500 to-transparent h-px opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-neutral-700 dark:text-neutral-200 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-neutral-100 dark:hover:bg-zinc-800 focus:outline-none"
            >
              {mobileMenuOpen ? (
                <IconX className="h-6 w-6" />
              ) : (
                <IconMenu2 className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white dark:bg-zinc-800 shadow-lg border-b border-neutral-200 dark:border-zinc-700"
          >
            <div className="px-4 pt-2 pb-3 space-y-1 divide-y divide-neutral-100 dark:divide-zinc-700">
              {navItems.map((navItem, idx) => (
                <Link
                  key={`mobile-link-${idx}`}
                  href={navItem.link}
                  className="block px-3 py-3 text-base font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-zinc-700 hover:text-violet-600 dark:hover:text-violet-400 rounded-md transition-colors flex items-center space-x-3"
                >
                  {navItem.icon && <span className="text-violet-600 dark:text-violet-400">{navItem.icon}</span>}
                  <span>{navItem.name}</span>
                </Link>
              ))}
              
              <div className="pt-4">
                {isLoggedIn && userRole && (
                  <div className="px-3 py-2 mb-2 text-sm font-medium text-neutral-500 dark:text-neutral-400">
                    Signed in as: <span className="text-violet-600 dark:text-violet-400">{userRole}</span>
                  </div>
                )}
                
                <button
                  onClick={onSignInOut}
                  className="w-full mt-1 flex items-center px-3 py-3 text-base font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-zinc-700 hover:text-violet-600 dark:hover:text-violet-400 rounded-md transition-colors space-x-3"
                >
                  {isLoggedIn ? (
                    <>
                      <IconLogout className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                      <span>Sign Out</span>
                    </>
                  ) : (
                    <>
                      <IconLogin className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                      <span>Sign In</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};