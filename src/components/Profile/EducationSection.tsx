import React from 'react';

interface Props {
  university: string;
  degree: string;
  graduationYear: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function EducationSection({ university, degree, graduationYear, onChange }: Props) {
  return (
    <div className="border-b border-gray-200 dark:border-zinc-800 pb-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Education</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <input
          type="text"
          name="university"
          value={university}
          onChange={onChange}
          placeholder="University"
          className="w-full px-4 py-3 border border-gray-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-200"
        />
        <input
          type="text"
          name="degree"
          value={degree}
          onChange={onChange}
          placeholder="Degree"
          className="w-full px-4 py-3 border border-gray-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-200"
        />
        <input
          type="text"
          name="graduationYear"
          value={graduationYear}
          onChange={onChange}
          placeholder="Graduation Year"
          className="w-full px-4 py-3 border border-gray-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-200"
        />
      </div>
    </div>
  );
}
