import React from "react";

interface Props {
  bio: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function BioSection({ bio, onChange }: Props) {
  return (
    <div className="border-b border-gray-200 dark:border-zinc-800 pb-6">
      <label className="block text-gray-600 dark:text-gray-300 mb-2 text-lg font-medium">Bio</label>
      <textarea
        name="bio"
        value={bio}
        onChange={onChange}
        rows={4}
        placeholder="Write a short bio about yourself"
        className="w-full px-4 py-3 border border-gray-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-200"
      />
    </div>
  );
}
