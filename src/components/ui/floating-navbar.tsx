"use client";
import React from "react";
import { motion } from "framer-motion";
import { IconLogin, IconLogout } from "@tabler/icons-react"; // Only include icons relevant to this component
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
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "flex max-w-fit fixed top-4 inset-x-0 mx-auto z-50 border border-transparent dark:border-zinc-600/[0.2] rounded-full bg-white/60 dark:bg-zinc-800/60 backdrop-blur-md shadow-md pr-4 pl-6 py-2 items-center justify-center space-x-4",
        className
      )}
    >
      {navItems.map((navItem, idx) => (
        <a
          key={`link-${idx}`}
          href={navItem.link}
          className="relative dark:text-neutral-50 flex items-center space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
        >
          <span className="block sm:hidden">{navItem.icon}</span>
          <span className="hidden sm:block text-sm">{navItem.name}</span>
        </a>
      ))}

      {/* Display user role if logged in */}
      {isLoggedIn && userRole && (
        <span className="text-sm font-medium text-blue-600 dark:text-blue-400 ml-4">
          Role: {userRole}
        </span>
      )}

      <button
        onClick={onSignInOut}
        className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full flex items-center space-x-2"
      >
        {isLoggedIn ? (
          <>
            <IconLogout className="h-4 w-4" />
            <span>Sign Out</span>
          </>
        ) : (
          <>
            <IconLogin className="h-4 w-4" />
            <span>Sign In</span>
          </>
        )}
        <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
      </button>
    </motion.div>
  );
};