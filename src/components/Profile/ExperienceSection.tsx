import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../styles/datepicker-dark.css';

interface ExperienceForm {
  title: string;
  company: string;
  employmentType:
    | 'full-time'
    | 'part-time'
    | 'internship'
    | 'freelance'
    | 'contract'
    | 'temporary'
    | 'volunteer'
    | 'other';
  location?: string;
  startDate: string;
  endDate?: string;
  isCurrent?: boolean;
  description?: string;
  skillsUsed?: string;
}

interface Props {
  experiences: ExperienceForm[];
  setExperiences: (exps: ExperienceForm[]) => void;
}

export default function ExperienceSection({ experiences, setExperiences }: Props) {
  return (
    <div className="border-b border-gray-200 dark:border-zinc-800 pb-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Experience</h2>
      {experiences.map((exp, idx) => (
        <div
          key={idx}
          className="mb-6 p-4 bg-gray-50 dark:bg-zinc-800 rounded-lg border border-gray-200 dark:border-zinc-700"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input
              type="text"
              name="title"
              placeholder="Title (required)"
              value={exp.title}
              required
              onChange={(e) => {
                const newExps = [...experiences];
                newExps[idx].title = e.target.value;
                setExperiences(newExps);
              }}
              className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-200"
            />
            <input
              type="text"
              name="company"
              placeholder="Company (required)"
              value={exp.company}
              required
              onChange={(e) => {
                const newExps = [...experiences];
                newExps[idx].company = e.target.value;
                setExperiences(newExps);
              }}
              className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-200"
            />
            <select
              name="employmentType"
              value={exp.employmentType}
              required
              onChange={(e) => {
                const newExps = [...experiences];
                newExps[idx].employmentType = e.target.value as ExperienceForm['employmentType'];
                setExperiences(newExps);
              }}
              className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-200"
            >
              <option value="">Employment Type (required)</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="internship">Internship</option>
              <option value="freelance">Freelance</option>
              <option value="contract">Contract</option>
              <option value="temporary">Temporary</option>
              <option value="volunteer">Volunteer</option>
              <option value="other">Other</option>
            </select>
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={exp.location || ''}
              onChange={(e) => {
                const newExps = [...experiences];
                newExps[idx].location = e.target.value;
                setExperiences(newExps);
              }}
              className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-200"
            />
            <div>
              <label className="block text-gray-600 dark:text-gray-300 mb-1">Start Date</label>
              <DatePicker
                selected={exp.startDate ? new Date(exp.startDate) : null}
                onChange={(date) => {
                  const newExps = [...experiences];
                  newExps[idx].startDate = date ? date.toISOString().split('T')[0] : '';
                  setExperiences(newExps);
                }}
                dateFormat="yyyy-MM-dd"
                className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-200"
                calendarClassName="react-datepicker-dark"
                placeholderText="Select start date"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 dark:text-gray-300 mb-1">End Date</label>
              <DatePicker
                selected={exp.endDate ? new Date(exp.endDate) : null}
                onChange={(date) => {
                  const newExps = [...experiences];
                  newExps[idx].endDate = date ? date.toISOString().split('T')[0] : '';
                  setExperiences(newExps);
                }}
                dateFormat="yyyy-MM-dd"
                className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-200"
                calendarClassName="react-datepicker-dark"
                placeholderText="Select end date"
              />
            </div>
          </div>
          <div className="flex items-center gap-4 mt-2">
            <label className="text-gray-600 dark:text-gray-300 text-sm">
              <input
                type="checkbox"
                checked={exp.isCurrent || false}
                onChange={(e) => {
                  const newExps = [...experiences];
                  newExps[idx].isCurrent = e.target.checked;
                  setExperiences(newExps);
                }}
                className="mr-1"
              />
              Current Position
            </label>
          </div>
          <div className="mt-2">
            <textarea
              name="description"
              placeholder="Description"
              value={exp.description || ''}
              onChange={(e) => {
                const newExps = [...experiences];
                newExps[idx].description = e.target.value;
                setExperiences(newExps);
              }}
              className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-200"
              rows={2}
            />
          </div>
          <div className="mt-2">
            <input
              type="text"
              name="skillsUsed"
              placeholder="Skills Used (comma separated)"
              value={exp.skillsUsed || ''}
              onChange={(e) => {
                const newExps = [...experiences];
                newExps[idx].skillsUsed = e.target.value;
                setExperiences(newExps);
              }}
              className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-200"
            />
          </div>
          <div className="flex justify-end mt-2">
            <button
              type="button"
              className="text-xs text-red-500 hover:underline px-2 py-1"
              onClick={() => setExperiences(experiences.filter((_, i) => i !== idx))}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          setExperiences([
            ...experiences,
            {
              title: '',
              company: '',
              employmentType: 'full-time',
              location: '',
              startDate: '',
              endDate: '',
              isCurrent: false,
              description: '',
              skillsUsed: '',
            },
          ])
        }
        className="mt-2 px-5 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors font-medium shadow-sm"
      >
        Add Experience
      </button>
    </div>
  );
}
