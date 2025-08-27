import React from "react";

interface Props {
  isLoading: boolean;
  onCancel: () => void;
}

export default function FormActionsSection({ isLoading, onCancel }: Props) {
  return (
    <div className="flex justify-end gap-4 mt-8">
      <button
        type="button"
        onClick={onCancel}
        className="px-5 py-2 bg-gray-200 dark:bg-zinc-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-zinc-600 transition-colors font-medium shadow-sm"
      >
        Cancel
      </button>
      <button
        type="submit"
        disabled={isLoading}
        className="px-5 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors font-medium shadow-sm disabled:opacity-60"
      >
        {isLoading ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  );
}
