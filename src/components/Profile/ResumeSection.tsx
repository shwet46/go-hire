import React from 'react';

interface Props {
  resumeUrl: string;
  handleResumeUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove?: () => void;
  filename?: string;
}

export default function ResumeSection({
  resumeUrl,
  handleResumeUpload,
  onRemove,
  filename,
}: Props) {
  return (
    <div>
      <label className="block text-gray-600 dark:text-gray-300 mb-2 text-lg font-medium">
        Resume (PDF)
      </label>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-4 flex-wrap">
          <label
            htmlFor="resume-upload"
            className="px-5 py-2 bg-violet-600 text-white rounded-lg cursor-pointer hover:bg-violet-700 transition-colors font-medium shadow-sm"
          >
            {resumeUrl ? 'Replace Resume' : 'Upload Resume'}
            <input
              id="resume-upload"
              type="file"
              accept="application/pdf"
              onChange={handleResumeUpload}
              className="hidden"
            />
          </label>
          {resumeUrl && (
            <>
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-violet-600 dark:text-violet-400 hover:underline text-sm"
              >
                View Resume
              </a>
              {onRemove && (
                <button
                  type="button"
                  onClick={onRemove}
                  className="text-xs text-red-500 hover:underline"
                >
                  Remove
                </button>
              )}
            </>
          )}
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">PDF only. Max 5MB.</p>
        {filename && (
          <p className="text-xs text-gray-600 dark:text-gray-300 flex items-center gap-1">
            Current:{' '}
            <span className="font-medium text-gray-800 dark:text-gray-200">{filename}</span>
          </p>
        )}
      </div>
    </div>
  );
}
