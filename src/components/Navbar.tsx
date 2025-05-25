"use client";
import React from "react";
import { FloatingNav } from "./ui/floating-navbar";
import {
  IconHome,
  IconBriefcase,
  IconUsers,
  IconTrophy,
  IconLayoutDashboard,
  IconGift,
  IconUserPlus,
  IconSettings,
} from "@tabler/icons-react";

export function Navbar() {
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
      name: "Leaderboard",
      link: "/leaderboard",
      icon: <IconTrophy className="h-5 w-5 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Referrals",
      link: "/referrals",
      icon: <IconUserPlus className="h-5 w-5 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Rewards",
      link: "/rewards",
      icon: <IconGift className="h-5 w-5 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Dashboard",
      link: "/dashboard",
      icon: <IconLayoutDashboard className="h-5 w-5 text-neutral-500 dark:text-white" />,
    },
  ];

  // Alternative version with role-based navigation (uncomment if needed)
  /*
  const studentNavItems = [
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
      name: "Tasks",
      link: "/tasks",
      icon: <IconTarget className="h-5 w-5 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Leaderboard",
      link: "/leaderboard",
      icon: <IconTrophy className="h-5 w-5 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Referrals",
      link: "/referrals",
      icon: <IconUserPlus className="h-5 w-5 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Dashboard",
      link: "/dashboard/student",
      icon: <IconLayoutDashboard className="h-5 w-5 text-neutral-500 dark:text-white" />,
    },
  ];

  const recruiterNavItems = [
    {
      name: "Home",
      link: "/",
      icon: <IconHome className="h-5 w-5 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Post Jobs",
      link: "/post-job",
      icon: <IconBriefcase className="h-5 w-5 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Candidates",
      link: "/candidates",
      icon: <IconUsers className="h-5 w-5 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Dashboard",
      link: "/dashboard/recruiter",
      icon: <IconLayoutDashboard className="h-5 w-5 text-neutral-500 dark:text-white" />,
    },
  ];

  const adminNavItems = [
    {
      name: "Home",
      link: "/",
      icon: <IconHome className="h-5 w-5 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Users",
      link: "/admin/users",
      icon: <IconUsers className="h-5 w-5 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Jobs",
      link: "/admin/jobs",
      icon: <IconBriefcase className="h-5 w-5 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Tasks",
      link: "/admin/tasks",
      icon: <IconTarget className="h-5 w-5 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Analytics",
      link: "/admin/analytics",
      icon: <IconTrophy className="h-5 w-5 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Settings",
      link: "/admin/settings",
      icon: <IconSettings className="h-5 w-5 text-neutral-500 dark:text-white" />,
    },
  ];
  */

  return <FloatingNav navItems={navItems} />;
}