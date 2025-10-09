'use client';
import React, { useState, useEffect } from 'react';

//const THEME_KEY = "go-hire-theme";

function setDocumentTheme(theme: 'dark' | 'light') {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  } else {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
  }
  // Note: localStorage is not available in this environment
  // In a real app, you would use: localStorage.setItem(THEME_KEY, theme);
}

const SettingsMenu = ({ onClose }: { onClose?: () => void }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeTab, setActiveTab] = useState<'general' | 'appearance'>('general');

  useEffect(() => {
    // In a real app, you would load from localStorage:
    // const stored = localStorage.getItem(THEME_KEY) as "dark" | "light" | null;
    // For now, we'll use system preference detection
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      setDocumentTheme('dark');
    } else {
      setTheme('light');
      setDocumentTheme('light');
    }
  }, []);

  const handleThemeToggle = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    setDocumentTheme(nextTheme);
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl mt-10 text-zinc-900 dark:text-zinc-100 overflow-hidden">
      {/* Close Option in Top Right */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 px-3 py-1 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition font-medium text-sm"
          aria-label="Close settings"
          type="button"
        >
          Close
        </button>
      )}

      {/* Header */}
      <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Settings</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">Customize your experience</p>
      </div>

      {/* Navigation */}
      <nav className="flex border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <button
          className={`w-1/2 py-4 px-6 font-semibold text-sm transition-all relative ${
            activeTab === 'general'
              ? 'text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-500/10'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
          }`}
          onClick={() => setActiveTab('general')}
        >
          General
          {activeTab === 'general' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-violet-600 dark:bg-violet-400"></div>
          )}
        </button>
        <button
          className={`w-1/2 py-4 px-6 font-semibold text-sm transition-all relative ${
            activeTab === 'appearance'
              ? 'text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-500/10'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
          }`}
          onClick={() => setActiveTab('appearance')}
        >
          Appearance
          {activeTab === 'appearance' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-violet-600 dark:bg-violet-400"></div>
          )}
        </button>
      </nav>

      {/* Tab Content */}
      <div
        className={`
          p-4 sm:p-6
          ${activeTab === 'appearance' ? 'min-w-0 sm:min-w-[600px]' : ''}
        `}
        style={{
          width: '100%',
          maxWidth: '100vw',
        }}
      >
        {activeTab === 'general' && (
          <div className="space-y-6 w-full">
            <div>
              <h2 className="text-xl font-bold mb-2 text-zinc-900 dark:text-zinc-100">
                General Settings
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                Configure your basic preferences and account settings.
              </p>
            </div>

            <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-4 border border-zinc-200 dark:border-zinc-700">
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Notifications</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                Control how you receive updates
              </p>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-zinc-300 dark:border-zinc-600"
                    defaultChecked
                  />
                  <span className="ml-2 text-sm text-zinc-700 dark:text-zinc-300">
                    Email notifications
                  </span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-zinc-300 dark:border-zinc-600" />
                  <span className="ml-2 text-sm text-zinc-700 dark:text-zinc-300">
                    Push notifications
                  </span>
                </label>
              </div>
            </div>

            <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-4 border border-zinc-200 dark:border-zinc-700">
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Privacy</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                Manage your privacy preferences
              </p>
              <button className="text-sm text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 font-medium">
                Review privacy settings →
              </button>
            </div>
          </div>
        )}

        {activeTab === 'appearance' && (
          <div className="space-y-6 w-full">
            <div>
              <h2 className="text-xl font-bold mb-2 text-zinc-900 dark:text-zinc-100">
                Appearance
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                Customize the look and feel of your interface.
              </p>
            </div>

            <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-4 border border-zinc-200 dark:border-zinc-700">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Theme</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Choose between light and dark mode
                  </p>
                </div>
                <button
                  onClick={handleThemeToggle}
                  className="px-4 py-2 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors font-medium text-sm min-w-[100px]"
                >
                  {theme === 'dark' ? 'Dark' : 'Light'}
                </button>
              </div>

              <div className="flex gap-4 mt-4">
                <div
                  className={`flex-1 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    theme === 'light'
                      ? 'border-violet-500 bg-violet-50 dark:bg-violet-500/10'
                      : 'border-zinc-300 dark:border-zinc-600 hover:border-zinc-400 dark:hover:border-zinc-500'
                  }`}
                  onClick={() => {
                    setTheme('light');
                    setDocumentTheme('light');
                  }}
                >
                  <div className="bg-white border border-zinc-200 rounded p-2 mb-2">
                    <div className="h-2 bg-zinc-900 rounded mb-1"></div>
                    <div className="h-1 bg-zinc-400 rounded mb-1"></div>
                    <div className="h-1 bg-zinc-300 rounded"></div>
                  </div>
                  <p className="text-sm font-medium text-center text-zinc-900 dark:text-zinc-100">
                    Light
                  </p>
                </div>

                <div
                  className={`flex-1 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    theme === 'dark'
                      ? 'border-violet-500 bg-violet-50 dark:bg-violet-500/10'
                      : 'border-zinc-300 dark:border-zinc-600 hover:border-zinc-400 dark:hover:border-zinc-500'
                  }`}
                  onClick={() => {
                    setTheme('dark');
                    setDocumentTheme('dark');
                  }}
                >
                  <div className="bg-zinc-800 border border-zinc-700 rounded p-2 mb-2">
                    <div className="h-2 bg-zinc-100 rounded mb-1"></div>
                    <div className="h-1 bg-zinc-400 rounded mb-1"></div>
                    <div className="h-1 bg-zinc-500 rounded"></div>
                  </div>
                  <p className="text-sm font-medium text-center text-zinc-900 dark:text-zinc-100">
                    Dark
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-4 border border-zinc-200 dark:border-zinc-700">
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                Display Options
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                Additional display customizations
              </p>
              <div className="space-y-3">
                <label className="flex items-center justify-between">
                  <span className="text-sm text-zinc-700 dark:text-zinc-300">Compact mode</span>
                  <input type="checkbox" className="rounded border-zinc-300 dark:border-zinc-600" />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-sm text-zinc-700 dark:text-zinc-300">
                    Reduce animations
                  </span>
                  <input type="checkbox" className="rounded border-zinc-300 dark:border-zinc-600" />
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsMenu;
