'use client';

import { signIn, getProviders, ClientSafeProvider } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function SignInPage() {
  const [providers, setProviders] = useState<Record<string, ClientSafeProvider> | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res ?? null); // Defensive fallback
    };
    fetchProviders();
  }, []);

  if (!providers) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading providers...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-50">
      <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
        <Image src="/logo.svg" alt="Job Portal Logo" width={100} height={100} className="mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Welcome to the Gamified Job Portal!</h1>
        {Object.values(providers).map((provider) => (
          <div key={provider.id} className="mb-4">
            <button
              onClick={() => signIn(provider.id, { callbackUrl: '/' })}
              type="button"
              className="flex items-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {provider.name.toLowerCase().includes('google') && (
                <svg className="w-5 h-5 mr-3" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path d="M44.5 20H24V28.5H35.25C34.72 31.25 33.02 33.56 30.56 35.11V40.35H36.21C39.99 36.85 42.5 31.84 42.5 26C42.5 24.32 42.27 22.75 41.83 21.25L44.5 20Z" fill="#4285F4"/>
                  <path d="M24 44C29.47 44 34.19 42.13 37.89 39.04L30.56 35.11C28.53 36.46 26.04 37.3 24 37.3C19.74 37.3 16.03 34.42 14.73 30.57L8.47 33.01V38.5C10.74 41.56 14.9 44 24 44Z" fill="#34A853"/>
                  <path d="M14.73 30.57C14.28 29.28 14.02 27.91 14.02 26.5C14.02 25.09 14.28 23.72 14.73 22.43L8.47 19.99V14.5C6.15 17.58 4.72 21.84 4.72 26.5C4.72 31.16 6.15 35.42 8.47 38.5L14.73 30.57Z" fill="#FBBC05"/>
                  <path d="M24 11.51C26.55 11.51 28.87 12.44 30.63 14.02L36.32 8.35C33.6 5.86 29.83 4.5 24 4.5C14.9 4.5 10.74 6.94 8.47 9.99L14.73 15.48C16.03 11.63 19.74 8.75 24 8.75C26.04 8.75 28.01 9.4 29.56 10.51L24 11.51Z" fill="#EA4335"/>
                </svg>
              )}
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}