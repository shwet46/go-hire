'use client';
import React, { useState } from 'react';
import { Book, Code, Globe, Trophy, Smartphone, Star } from 'lucide-react';
import CategoryFilter from '@/components/practice/CategoryFilter';
import DifficultyFilter from '@/components/practice/DifficultyFilter';
import ResourceGrid from '@/components/practice/ResourceGrid';
import { useResourcesData } from '@/hooks/useResourcesData';

export default function PracticePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const { getAllResources } = useResourcesData();

  const categories = [
    { id: 'all', name: 'All Resources', icon: Book },
    { id: 'dsa', name: 'DSA & Algorithms', icon: Code },
    { id: 'system_design', name: 'System Design', icon: Globe },
    { id: 'web_dev', name: 'Web Development', icon: Globe },
    { id: 'mobile_dev', name: 'Mobile Development', icon: Smartphone },
    { id: 'competitive', name: 'Competitive Programming', icon: Trophy },
    { id: 'interview', name: 'Interview Prep', icon: Star },
  ];

  const filteredResources = getAllResources().filter(
    (r) =>
      (selectedCategory === 'all' || r.category === selectedCategory) &&
      (selectedDifficulty === 'all' ||
        r.difficulty?.toLowerCase().includes(selectedDifficulty.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-violet-950/20 pt-20 text-sm sm:text-base">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-64 md:-left-96 top-10 w-96 h-96 bg-violet-600/30 rounded-full blur-3xl"></div>
        <div className="absolute -right-64 md:-right-96 bottom-10 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-400 via-purple-500 to-indigo-500 bg-clip-text text-transparent mb-3">
            Practice & Learn
          </h1>
          <p className="text-zinc-400 text-base sm:text-lg max-w-3xl mx-auto">
            Master coding skills with curated resources, tutorials, and practice platforms.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-10 space-y-6">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
          <DifficultyFilter
            selectedDifficulty={selectedDifficulty}
            onDifficultyChange={setSelectedDifficulty}
          />
        </div>

        {/* Resource Grid */}
        <ResourceGrid resources={filteredResources} />
      </div>
    </div>
  );
}