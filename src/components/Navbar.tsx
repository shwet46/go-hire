'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  IconHome,
  IconBriefcase,
  IconTarget,
  IconLayoutDashboard,
  IconLogin,
  IconLogout,
  IconMenu2,
  IconX,
  IconUser,
  IconSettings,
  IconChevronDown,
} from '@tabler/icons-react';
import dynamic from 'next/dynamic';

const SettingsMenu = dynamic(() => import('./Settings/SettingsMenu'), { ssr: false });

function cn(...inputs: (string | undefined | null | boolean)[]) {
  return inputs.filter(Boolean).join(' ');
}

export function Navbar({ className }: { className?: string }) {
  const { data: session, status } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleSignInOut = async () => {
    if (session) {
      setIsSigningOut(true);
      try {
        await signOut({
          redirect: false,
          callbackUrl: '/',
        });
        // Clear any local storage or session data
        localStorage.clear();
        sessionStorage.clear();

        // Force a page reload to clear all state
        window.location.href = '/';
      } catch (error) {
        console.error('Sign out error:', error);
      } finally {
        setIsSigningOut(false);
      }
    } else {
      router.push('/login');
    }
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target as Node)
      ) {
        setProfileDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuRef, profileDropdownRef]);

  const navItems = [
    {
      name: 'Home',
      link: '/',
      icon: <IconHome className="h-5 w-5" />,
    },
    {
      name: 'Practice',
      link: '/practice',
      icon: <IconTarget className="h-5 w-5" />,
    },
    {
      name: 'Jobs',
      link: '/jobs',
      icon: <IconBriefcase className="h-5 w-5" />,
    },
  ];

  // Add profile menu items
  const profileMenuItems = [
    {
      name: 'Dashboard',
      link: (session?.user as { role?: string })?.role === 'student' ? '/student' : '/recruiter',
      icon: <IconLayoutDashboard className="h-4 w-4" />,
    },
    {
      name: 'Profile',
      link: '/profile',
      icon: <IconUser className="h-4 w-4" />,
    },
    {
      name: 'Settings',
      link: '/settings',
      icon: <IconSettings className="h-4 w-4" />,
    },
  ];

  const mobileProfileNavItems = [
    {
      name: 'Dashboard',
      link: (session?.user as { role?: string })?.role === 'student' ? '/student' : '/recruiter',
      icon: <IconLayoutDashboard className="h-5 w-5" />,
    },
    {
      name: 'Profile',
      link: '/profile',
      icon: <IconUser className="h-5 w-5" />,
    },
    {
      name: 'Settings',
      link: '/settings',
      icon: <IconSettings className="h-5 w-5" />,
      onClick: () => setShowSettings(true),
    },
  ];

  // Don't render navbar content while session is loading
  if (status === 'loading') {
    return (
      <div
        className={cn(
          'w-full fixed top-0 left-0 right-0 z-50 bg-white dark:bg-zinc-900 border-b border-neutral-200 dark:border-zinc-700 shadow-sm',
          className
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
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
            <div className="animate-pulse bg-gray-300 h-8 w-20 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        'w-full fixed top-0 left-0 right-0 z-50 bg-white dark:bg-zinc-900 border-b border-neutral-200 dark:border-zinc-700 shadow-sm',
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
              <Link key={`link-${idx}`} href={navItem.link} className="relative group py-2">
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                  {navItem.name}
                </span>
                <span className="absolute -bottom-[1px] left-0 w-0 h-0.5 bg-violet-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>

          {/* Right side - User Role and Sign In/Out */}
          <div className="flex items-center space-x-4">
            {/* Authenticated user dropdown (desktop only) */}
            {session?.user ? (
              <>
                <div className="relative hidden md:block" ref={profileDropdownRef}>
                  <button
                    onClick={() => setProfileDropdownOpen((v) => !v)}
                    className="flex items-center space-x-2 px-3 py-1 bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 rounded-full font-medium hover:bg-violet-200 dark:hover:bg-violet-800 transition-colors"
                  >
                    <span>{session.user.name || 'User'}</span>
                    <IconChevronDown
                      className={`h-4 w-4 transition-transform ${profileDropdownOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <AnimatePresence>
                    {profileDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.98 }}
                        transition={{ duration: 0.18 }}
                        className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-900 rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-700 py-2 z-50"
                      >
                        {profileMenuItems.map((item) =>
                          item.name === 'Settings' ? (
                            <button
                              key={item.name}
                              onClick={() => {
                                setShowSettings(true);
                                setProfileDropdownOpen(false);
                              }}
                              className="flex items-center w-full px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-violet-50 dark:hover:bg-violet-800 transition-colors"
                            >
                              <span className="mr-2">{item.icon}</span>
                              {item.name}
                            </button>
                          ) : (
                            <Link
                              key={item.name}
                              href={item.link}
                              className="flex items-center px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-violet-50 dark:hover:bg-violet-800 transition-colors"
                              onClick={() => setProfileDropdownOpen(false)}
                            >
                              <span className="mr-2">{item.icon}</span>
                              {item.name}
                            </Link>
                          )
                        )}
                        <button
                          onClick={() => {
                            setProfileDropdownOpen(false);
                            handleSignInOut();
                          }}
                          disabled={isSigningOut}
                          className="w-full flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <IconLogout className="h-4 w-4 mr-2" />
                          {isSigningOut ? 'Signing Out...' : 'Sign Out'}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {/* Settings Modal/Drawer */}
                  {showSettings && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40">
                      <div className="relative">
                        <SettingsMenu onClose={() => setShowSettings(false)} />
                      </div>
                    </div>
                  )}
                </div>
                {/* Show settings modal for mobile as well */}
                {showSettings && (
                  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 md:hidden">
                    <div className="relative">
                      <SettingsMenu onClose={() => setShowSettings(false)} />
                    </div>
                  </div>
                )}
              </>
            ) : (
              <button
                onClick={handleSignInOut}
                disabled={isSigningOut}
                className="hidden sm:flex border text-sm font-medium relative border-neutral-200 dark:border-zinc-700 text-black dark:text-white px-4 py-2 rounded-full items-center space-x-2 hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-colors group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <IconLogin className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                <span>Sign In</span>
              </button>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-neutral-700 dark:text-neutral-200 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-neutral-100 dark:hover:bg-zinc-800 focus:outline-none"
            >
              {mobileMenuOpen ? <IconX className="h-6 w-6" /> : <IconMenu2 className="h-6 w-6" />}
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
              {navItems.map((navItem) => (
                <Link
                  key={`mobile-link-${navItem.name}`}
                  href={navItem.link}
                  className="px-3 py-3 text-base font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-zinc-700 hover:text-violet-600 dark:hover:text-violet-400 rounded-md transition-colors flex items-center space-x-3"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="text-violet-600 dark:text-violet-400">{navItem.icon}</span>
                  <span>{navItem.name}</span>
                </Link>
              ))}

              {/* Mobile profile nav items for authenticated user */}
              {session?.user && (
                <div className="pt-4 space-y-1">
                  {mobileProfileNavItems.map((item) =>
                    item.name === 'Settings' ? (
                      <button
                        key={`mobile-profile-link-${item.name}`}
                        onClick={() => {
                          setMobileMenuOpen(false);
                          if (item.onClick) item.onClick();
                        }}
                        className="w-full flex items-center px-3 py-3 text-base font-medium text-neutral-700 dark:text-neutral-200 hover:bg-violet-50 dark:hover:bg-violet-800 hover:text-violet-600 dark:hover:text-violet-400 rounded-md transition-colors space-x-3"
                      >
                        <span className="text-violet-600 dark:text-violet-400">{item.icon}</span>
                        <span>{item.name}</span>
                      </button>
                    ) : (
                      <Link
                        key={item.name}
                        href={item.link}
                        className="block px-3 py-3 text-base font-medium text-neutral-700 dark:text-neutral-200 hover:bg-violet-50 dark:hover:bg-violet-800 hover:text-violet-600 dark:hover:text-violet-400 rounded-md transition-colors flex items-center space-x-3"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span className="text-violet-600 dark:text-violet-400">{item.icon}</span>
                        <span>{item.name}</span>
                      </Link>
                    )
                  )}
                </div>
              )}

              <div className="pt-4">
                {session?.user && (
                  <div className="px-3 py-2 mb-2 text-sm font-medium text-neutral-500 dark:text-neutral-400">
                    Welcome,{' '}
                    <span className="text-violet-600 dark:text-violet-400">
                      {session.user.name || 'User'}
                    </span>
                  </div>
                )}
                <button
                  onClick={async () => {
                    setMobileMenuOpen(false);
                    await handleSignInOut();
                  }}
                  disabled={isSigningOut}
                  className="w-full mt-1 flex items-center px-3 py-3 text-base font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-zinc-700 hover:text-violet-600 dark:hover:text-violet-400 rounded-md transition-colors space-x-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {session ? (
                    <>
                      <IconLogout className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                      <span>{isSigningOut ? 'Signing Out...' : 'Sign Out'}</span>
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
}
