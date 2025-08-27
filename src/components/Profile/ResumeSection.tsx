import React from "react";

interface Props {
  resumeUrl: string;
  handleResumeUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ResumeSection({ resumeUrl, handleResumeUpload }: Props) {
  return (
    <div>
      <label className="block text-gray-600 dark:text-gray-300 mb-2 text-lg font-medium">Resume (PDF)</label>
      <div className="flex items-center gap-4">
        <label htmlFor="resume-upload" className="px-5 py-2 bg-violet-600 text-white rounded-lg cursor-pointer hover:bg-violet-700 transition-colors font-medium shadow-sm">
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
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-violet-600 hover:underline"
          >
            View Uploaded Resume
          </a>
        )}
      </div>
    </div>
  );
}
