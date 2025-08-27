import React from "react";

interface Props {
  skills: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SkillsSection({ skills, onChange }: Props) {
  return (
    <div className="border-b border-gray-200 dark:border-zinc-800 pb-6">
      <label className="block text-gray-600 dark:text-gray-300 mb-2 text-lg font-medium">Skills</label>
      <input
        type="text"
        name="skills"
        value={skills}
        onChange={onChange}
        placeholder="e.g. React, Node.js, Python"
        className="w-full px-4 py-3 border border-gray-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-200"
      />
    </div>
  );
}
