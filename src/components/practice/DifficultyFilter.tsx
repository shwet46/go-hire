import React from 'react';
import { Filter, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DifficultyFilterProps {
  selectedDifficulty: string;
  onDifficultyChange: (difficulty: string) => void;
}

export default function DifficultyFilter({ selectedDifficulty, onDifficultyChange }: DifficultyFilterProps) {
  const difficulties = ['all', 'beginner', 'intermediate', 'advanced'];

  return (
    <div className="flex justify-center">
      <div className="flex items-center space-x-3 sm:space-x-4 bg-zinc-800/50 rounded-xl p-2 border border-zinc-700">
        <Filter className="text-zinc-400" size={20} />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center space-x-2 px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base text-zinc-400 hover:text-white hover:bg-zinc-700">
              <span>{selectedDifficulty === 'all' ? 'All Difficulties' : selectedDifficulty}</span>
              <ChevronDown size={16} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-zinc-800 border-zinc-700">
            {difficulties.map((diff) => (
              <DropdownMenuItem
                key={diff}
                onClick={() => onDifficultyChange(diff)}
                className={`capitalize cursor-pointer ${
                  selectedDifficulty === diff
                    ? 'bg-violet-600 text-white'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-700'
                }`}
              >
                {diff === 'all' ? 'All Difficulties' : diff}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
