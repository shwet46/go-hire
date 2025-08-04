import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  backUrl?: string;
}

export default function PageHeader({ title, backUrl = '/jobs' }: PageHeaderProps) {
  return (
    <div className="flex items-center mb-8">
      <Link href={backUrl}>
        <button className="mr-4 p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors">
          <ArrowLeft className="text-zinc-400" size={20} />
        </button>
      </Link>
      <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-400 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
        {title}
      </h1>
    </div>
  );
}
