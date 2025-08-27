import React from "react";

interface Props {
  name: string;
  email: string;
}

export default function PersonalInfoSection({ name, email }: Props) {
  return (
    <div className="border-b border-gray-200 dark:border-zinc-800 pb-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Personal Information</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-gray-600 dark:text-gray-300 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            disabled
            className="w-full px-4 py-3 bg-gray-100 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-lg text-gray-700 dark:text-gray-200"
          />
        </div>
        <div>
          <label className="block text-gray-600 dark:text-gray-300 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            disabled
            className="w-full px-4 py-3 bg-gray-100 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-lg text-gray-700 dark:text-gray-200"
          />
        </div>
      </div>
    </div>
  );
}
