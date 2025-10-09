import React from 'react';
import { LucideIcon } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  icon: LucideIcon;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
      {categories.map(({ id, name, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onCategoryChange(id)}
          className={`flex items-center space-x-2 px-4 py-2 sm:px-6 sm:py-3 rounded-xl transition-all duration-200 text-sm sm:text-base ${
            selectedCategory === id
              ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-900/30'
              : 'bg-zinc-800/50 text-zinc-300 hover:bg-zinc-700/50 border border-zinc-700'
          }`}
        >
          <Icon size={18} />
          <span>{name}</span>
        </button>
      ))}
    </div>
  );
}
