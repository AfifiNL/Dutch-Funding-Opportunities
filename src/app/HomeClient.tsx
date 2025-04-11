'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export const HomeClient = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <span className="inline-block bg-teal-500 bg-opacity-20 text-teal-400 text-sm font-semibold px-4 py-2 rounded-full mb-6">
              300+ Funding Opportunities · Personalized Matching · Expert Guidance
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Dutch Funding <span className="text-teal-400">Simplified</span> <br className="hidden sm:block" />
              For Ambitious Startups
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Save 80% of research time with our intelligent platform that matches your startup 
              with the perfect Dutch funding sources in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Link href="/funding" className="bg-teal-600 hover:bg-teal-500 text-white font-medium py-3 px-6 rounded-lg shadow-lg shadow-teal-900/20 transition-colors flex items-center justify-center">
                Browse Funding Opportunities 
                <ArrowRightIcon className="ml-2 w-5 h-5" />
              </Link>
              <Link href="/auth?view=signup" className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg border border-gray-600 transition-colors">
                Sign Up for Free
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}; 