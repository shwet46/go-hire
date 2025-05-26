"use client";
import React, { useState } from "react";
import {
  IconHome,
  IconBriefcase,
  IconBook,
  IconTarget,
  IconLayoutDashboard,
} from "@tabler/icons-react";
import { FloatingNav } from "./ui/floating-navbar";

export function Navbar() {
  // Simulate authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("student"); 

  const handleSignInOut = () => {
    setIsLoggedIn(!isLoggedIn);
    if (!isLoggedIn) {
      const roles = ["student", "recruiter", "admin"];
      const randomRole = roles[Math.floor(Math.random() * roles.length)];
      setUserRole(randomRole);
      console.log(`User signed in as: ${randomRole}`);
    } else {
      setUserRole(""); 
      console.log("User signed out");
    }
  };

  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <IconHome className="h-5 w-5 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Jobs",
      link: "/jobs",
      icon: <IconBriefcase className="h-5 w-5 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Internships",
      link: "/internships",
      icon: <IconBook className="h-5 w-5 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Practice",
      link: "/practice",
      icon: <IconTarget className="h-5 w-5 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Dashboard",
      link: "/dashboard",
      icon: <IconLayoutDashboard className="h-5 w-5 text-neutral-500 dark:text-white" />,
    },
  ];

  return (
    <FloatingNav
      navItems={navItems}
      isLoggedIn={isLoggedIn}
      onSignInOut={handleSignInOut}
      userRole={userRole}
    />
  );
}
