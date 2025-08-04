import React from 'react';
import { Clock, ExternalLink } from 'lucide-react';

export interface Resource {
  name: string;
  url?: string;
  type: string;
  difficulty?: string;
  price?: string;
  duration?: string;
  description: string;
  technologies?: string[];
  author?: string;
}

interface ResourceCardProps {
  resource: Resource;
}

export default function ResourceCard({ resource }: ResourceCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    const d = difficulty?.toLowerCase();
    if (d.includes('beginner') || d.includes('easy')) return 'bg-green-500/20 text-green-300 border-green-500/30';
    if (d.includes('intermediate') || d.includes('medium')) return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
    if (d.includes('advanced') || d.includes('hard')) return 'bg-red-500/20 text-red-300 border-red-500/30';
    return 'bg-violet-500/20 text-violet-300 border-violet-500/30';
  };

  const getPriceColor = (price: string) => {
    return price?.toLowerCase().includes('free')
      ? 'bg-emerald-500/20 text-emerald-300'
      : 'bg-orange-500/20 text-orange-300';
  };

  return (
    <div className="bg-gradient-to-br from-zinc-900/90 via-zinc-800/70 to-violet-900/20 backdrop-blur-2xl rounded-xl p-4 sm:p-5 md:p-6 border border-zinc-700/50 hover:border-violet-500/50 transition-all duration-300 group">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg sm:text-xl font-semibold text-white group-hover:text-violet-300 transition-colors">
          {resource.name}
        </h3>
        {resource.url && (
          <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-violet-400">
            <ExternalLink size={18} />
          </a>
        )}
      </div>
      
      <p className="text-zinc-400 text-sm mb-3 line-clamp-3">{resource.description}</p>

      <div className="flex flex-wrap gap-2 mb-3">
        <span className="text-xs bg-zinc-700/50 text-zinc-300 px-2 py-1 rounded-md">{resource.type}</span>
        {resource.difficulty && (
          <span className={`text-xs px-2 py-1 rounded-md border ${getDifficultyColor(resource.difficulty)}`}>
            {resource.difficulty}
          </span>
        )}
        {resource.price && (
          <span className={`text-xs px-2 py-1 rounded-md ${getPriceColor(resource.price)}`}>{resource.price}</span>
        )}
      </div>

      {resource.technologies && (
        <div className="flex flex-wrap gap-1 mb-3">
          {resource.technologies.map((tech, j) => (
            <span key={j} className="text-xs bg-violet-500/20 text-violet-300 px-2 py-1 rounded-md">
              {tech}
            </span>
          ))}
        </div>
      )}

      <div className="flex justify-between text-xs text-zinc-500">
        {resource.duration && (
          <span className="flex items-center">
            <Clock size={14} className="mr-1" />
            {resource.duration}
          </span>
        )}
        {resource.author && <span>by {resource.author}</span>}
      </div>

      {resource.url && (
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center space-x-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:from-violet-700 hover:to-indigo-700 transition-all duration-200 shadow-lg shadow-violet-900/30 text-sm"
        >
          <span>Start Learning</span>
          <ExternalLink size={16} />
        </a>
      )}
    </div>
  );
}
