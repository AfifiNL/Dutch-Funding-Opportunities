'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export function HomeClient() {
  return (
    <>
      <Header />
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
                <Link href="/auth" className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg border border-gray-600 transition-colors">
                  Sign Up for Free
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-800/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Your Complete Funding Solution
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Tools and resources to navigate the Dutch funding landscape with confidence
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-800 rounded-xl p-6">
                <div className="bg-blue-500 bg-opacity-20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Funding Guide</h3>
                <p className="text-gray-300">
                  Comprehensive catalog of 300+ Dutch funding opportunities, from grants to venture capital.
                </p>
              </div>
              
              <div className="bg-gray-800 rounded-xl p-6">
                <div className="bg-purple-500 bg-opacity-20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Pitch Advisor</h3>
                <p className="text-gray-300">
                  Expert guidance on building compelling funding applications that stand out.
                </p>
              </div>
              
              <div className="bg-gray-800 rounded-xl p-6">
                <div className="bg-teal-500 bg-opacity-20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Progress Tracking</h3>
                <p className="text-gray-300">
                  Monitor your application progress and get insights into your funding journey.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
} 