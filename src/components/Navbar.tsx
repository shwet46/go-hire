"use client";
import React from "react";
import { FloatingNav } from "./ui/floating-navbar";
import { IconHome, IconUser } from "@tabler/icons-react";

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
      icon: <IconUser className="h-5 w-5 text-neutral-500 dark:text-white" />,
    },
      {
      name: "Internships",
      link: "/internships",
      icon: <IconUser className="h-5 w-5 text-neutral-500 dark:text-white" />,
    },
     {
      name: "Practice",
      link: "/practice",
      icon: <IconUser className="h-5 w-5 text-neutral-500 dark:text-white" />,
    },
     {
      name: "Dashboard",
      link: "/dashboard",
      icon: <IconUser className="h-5 w-5 text-neutral-500 dark:text-white" />,
    },
  ];

  return <FloatingNav navItems={navItems} />;
}