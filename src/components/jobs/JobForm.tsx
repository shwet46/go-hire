'use client';
import React from 'react';
import { Plus, X, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface JobFormData {
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  description: string;
}

interface JobFormProps {
  formData: JobFormData;
  tags: string[];
  tagInput: string;
  loading: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onTypeChange: (type: string) => void;
  onTagInputChange: (value: string) => void;
  onAddTag: () => void;
  onRemoveTag: (tag: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function JobForm({
  formData,
  tags,
  tagInput,
  loading,
  onInputChange,
  onTypeChange,
  onTagInputChange,
  onAddTag,
  onRemoveTag,
  onSubmit,
}: JobFormProps) {
  const jobTypes = [
    { value: 'full-time', label: 'Full-time' },
    { value: 'part-time', label: 'Part-time' },
    { value: 'contract', label: 'Contract' },
    { value: 'internship', label: 'Internship' },
  ];

  return (
    <form
      onSubmit={onSubmit}
      className="bg-gradient-to-br from-zinc-900/90 via-zinc-800/70 to-violet-900/20 backdrop-blur-2xl rounded-xl p-8 border border-zinc-700/50"
    >
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">Job Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={onInputChange}
            className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all duration-200"
            placeholder="e.g. Senior Frontend Developer"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">Company</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={onInputChange}
            className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all duration-200"
            placeholder="Your company name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={onInputChange}
            className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all duration-200"
            placeholder="e.g. San Francisco, CA"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">Job Type</label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="appearance-none w-full px-4 py-3 pr-10 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all duration-200 flex items-center justify-between"
              >
                <span className="capitalize">{formData.type.replace('-', ' ')}</span>
                <ChevronDown size={20} className="text-zinc-400" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-zinc-800 border-zinc-700 w-full">
              {jobTypes.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => onTypeChange(option.value)}
                  className={`cursor-pointer ${
                    formData.type === option.value
                      ? 'bg-violet-600 text-white'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-700'
                  }`}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-zinc-300 mb-2">Salary Range</label>
          <input
            type="text"
            name="salary"
            value={formData.salary}
            onChange={onInputChange}
            className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all duration-200"
            placeholder="e.g. $80,000 - $120,000"
            required
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-zinc-300 mb-2">Job Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={onInputChange}
          rows={6}
          className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all duration-200"
          placeholder="Describe the job role, what you're looking for..."
          required
        />
      </div>

      {/* Skills/Tags */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-zinc-300 mb-2">
          Skills & Technologies
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => onTagInputChange(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), onAddTag())}
            className="flex-1 px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all duration-200"
            placeholder="Add a skill (press Enter)"
          />
          <button
            type="button"
            onClick={onAddTag}
            className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors"
          >
            <Plus size={20} />
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="flex items-center space-x-1 bg-zinc-700 text-zinc-300 px-3 py-1 rounded-full text-sm"
            >
              <span>{tag}</span>
              <button
                type="button"
                onClick={() => onRemoveTag(tag)}
                className="text-zinc-400 hover:text-red-400"
              >
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          className="px-6 py-3 border border-zinc-600 text-zinc-300 rounded-lg hover:border-zinc-500 transition-colors"
          onClick={() => window.history.back()}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-lg hover:from-violet-700 hover:to-indigo-700 transition-all duration-200 shadow-lg shadow-violet-900/30 disabled:opacity-50"
        >
          {loading ? 'Posting...' : 'Post Job'}
        </button>
      </div>
    </form>
  );
}
