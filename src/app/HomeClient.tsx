'use client';

import React, { useState, useEffect } from 'react';
import HeroSection from "@/features/hero/HeroSection";
import InteractiveCharacter from "@/features/interactive-character/components/InteractiveCharacter";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import Image from 'next/image';
import { ArrowRightIcon, CheckCircleIcon, ChartBarIcon, DocumentTextIcon, LightBulbIcon } from '@heroicons/react/24/outline';
import dynamic from 'next/dynamic';

// Import the new section using the standard alias path
import InvestorPanelSection from "@/features/investor-panel/InvestorPanelSection";

// Dynamically import the DatabaseDebugger to avoid issues in production
const DatabaseDebugger = dynamic(() => import('@/components/DatabaseDebugger'), {
  ssr: false,
});

export default function HomeClient() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { user, isLoading } = useAuth();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
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
          </motion.div>
        </div>
      </section>
      
      {/* Interactive Character Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <InteractiveCharacter />
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-4xl font-bold mb-4"
            >
              Your Complete Funding Solution
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-gray-300 max-w-3xl mx-auto"
            >
              Tools and resources to navigate the Dutch funding landscape with confidence
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gray-800 rounded-xl p-6"
            >
              <div className="bg-blue-500 bg-opacity-20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-5">
                <DocumentTextIcon className="w-7 h-7 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Funding Guide</h3>
              <p className="text-gray-300">
                Comprehensive catalog of 300+ Dutch funding opportunities, from grants to venture capital.
              </p>
              
              <ul className="mt-4">
                <li className="flex items-center mb-2">
                  <CheckCircleIcon className="w-5 h-5 text-blue-400 mr-2" />
                  <span className="text-gray-300">Government grants</span>
                </li>
                <li className="flex items-center mb-2">
                  <CheckCircleIcon className="w-5 h-5 text-blue-400 mr-2" />
                  <span className="text-gray-300">Venture capital</span>
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="w-5 h-5 text-blue-400 mr-2" />
                  <span className="text-gray-300">Angel networks</span>
                </li>
              </ul>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-gray-800 rounded-xl p-6"
            >
              <div className="bg-purple-500 bg-opacity-20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-5">
                <LightBulbIcon className="w-7 h-7 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Pitch Advisor</h3>
              <p className="text-gray-300">
                Expert guidance on building compelling funding applications that stand out.
              </p>
              
              <ul className="mt-4">
                <li className="flex items-center mb-2">
                  <CheckCircleIcon className="w-5 h-5 text-purple-400 mr-2" />
                  <span className="text-gray-300">Step-by-step pitch builder</span>
                </li>
                <li className="flex items-center mb-2">
                  <CheckCircleIcon className="w-5 h-5 text-purple-400 mr-2" />
                  <span className="text-gray-300">Tailored templates</span>
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="w-5 h-5 text-purple-400 mr-2" />
                  <span className="text-gray-300">Expert review and feedback</span>
                </li>
              </ul>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-gray-800 rounded-xl p-6"
            >
              <div className="bg-teal-500 bg-opacity-20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-5">
                <ChartBarIcon className="w-7 h-7 text-teal-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Progress Tracking</h3>
              <p className="text-gray-300">
                Monitor your application progress and get insights into your funding journey.
              </p>
              
              <ul className="mt-4">
                <li className="flex items-center mb-2">
                  <CheckCircleIcon className="w-5 h-5 text-teal-400 mr-2" />
                  <span className="text-gray-300">Application timeline</span>
                </li>
                <li className="flex items-center mb-2">
                  <CheckCircleIcon className="w-5 h-5 text-teal-400 mr-2" />
                  <span className="text-gray-300">Success probability</span>
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="w-5 h-5 text-teal-400 mr-2" />
                  <span className="text-gray-300">Next step recommendations</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Investor Panel Section */}
      <InvestorPanelSection />
      
      {/* Featured Funding Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-4xl font-bold mb-4"
            >
              Featured Funding Opportunities
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-gray-300 max-w-3xl mx-auto"
            >
              Discover some of the top funding options currently available in the Netherlands
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-teal-500 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-blue-500 bg-opacity-20 p-3 rounded-full">
                  <span className="text-blue-400 font-bold">RVO</span>
                </div>
                <span className="bg-teal-500 bg-opacity-20 text-teal-400 text-xs px-3 py-1 rounded-full">
                  GRANT
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2">WBSO - R&D Tax Credit</h3>
              <p className="text-gray-300 mb-3">
                Tax incentives for companies developing technological innovations in the Netherlands.
              </p>
              <div className="flex justify-between text-sm text-gray-400 mb-4">
                <span>Tax Credits</span>
                <span>Phase: R&D</span>
              </div>
              <Link href="/funding/wbso" className="block text-center text-teal-400 hover:text-teal-300 font-semibold py-2 border border-teal-500 border-opacity-30 rounded-lg">
                View Details
              </Link>
            </div>
            
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-teal-500 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-purple-500 bg-opacity-20 p-3 rounded-full">
                  <span className="text-purple-400 font-bold">MIT</span>
                </div>
                <span className="bg-teal-500 bg-opacity-20 text-teal-400 text-xs px-3 py-1 rounded-full">
                  SUBSIDY
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2">MIT - SME Innovation Stimulus</h3>
              <p className="text-gray-300 mb-3">
                Support for innovative SMEs with research and development projects.
              </p>
              <div className="flex justify-between text-sm text-gray-400 mb-4">
                <span>€25K - €200K</span>
                <span>Phase: Early R&D</span>
              </div>
              <Link href="/funding/mit" className="block text-center text-teal-400 hover:text-teal-300 font-semibold py-2 border border-teal-500 border-opacity-30 rounded-lg">
                View Details
              </Link>
            </div>
            
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-teal-500 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-green-500 bg-opacity-20 p-3 rounded-full">
                  <span className="text-green-400 font-bold">EU</span>
                </div>
                <span className="bg-teal-500 bg-opacity-20 text-teal-400 text-xs px-3 py-1 rounded-full">
                  GRANT
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Horizon Europe</h3>
              <p className="text-gray-300 mb-3">
                EU research and innovation funding program with opportunities for startups.
              </p>
              <div className="flex justify-between text-sm text-gray-400 mb-4">
                <span>€50K - €2.5M</span>
                <span>Phase: Multiple</span>
              </div>
              <Link href="/funding/horizon-europe" className="block text-center text-teal-400 hover:text-teal-300 font-semibold py-2 border border-teal-500 border-opacity-30 rounded-lg">
                View Details
              </Link>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Link href="/funding" className="inline-flex items-center bg-teal-600 hover:bg-teal-500 text-white font-medium py-3 px-6 rounded-lg shadow-lg shadow-teal-900/20 transition-colors">
              Browse All Opportunities 
              <ArrowRightIcon className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Partners & Trust Signals */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Trusted Partners</h2>
            <p className="text-gray-300 mt-3">
              Working with leading organizations in the Dutch startup ecosystem
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            <div className="flex flex-col items-center space-y-3">
              <div className="h-16 w-40 bg-gray-800 rounded-md flex items-center justify-center p-3">
                <Image src="/images/partners/techleap.svg" alt="TechLeap.NL" width={150} height={50} />
              </div>
              <span className="text-sm text-gray-300">TechLeap.NL</span>
            </div>
            
            <div className="flex flex-col items-center space-y-3">
              <div className="h-16 w-40 bg-gray-800 rounded-md flex items-center justify-center p-3">
                <Image src="/images/partners/startupDelta.svg" alt="StartupDelta" width={150} height={50} />
              </div>
              <span className="text-sm text-gray-300">StartupDelta</span>
            </div>
            
            <div className="flex flex-col items-center space-y-3">
              <div className="h-16 w-40 bg-gray-800 rounded-md flex items-center justify-center p-3">
                <Image src="/images/partners/innovation.svg" alt="NL Innovation" width={150} height={50} />
              </div>
              <span className="text-sm text-gray-300">NL Innovation</span>
            </div>
            
            <div className="flex flex-col items-center space-y-3">
              <div className="h-16 w-40 bg-gray-800 rounded-md flex items-center justify-center p-3">
                <Image src="/images/partners/dutch-vc.svg" alt="Dutch VC" width={150} height={50} />
              </div>
              <span className="text-sm text-gray-300">Dutch VC</span>
            </div>
          </div>
          
          {/* Call to Action */}
          <div className="mt-24 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Find Your Perfect Funding Match?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/funding" className="bg-teal-600 hover:bg-teal-500 text-white font-medium py-3 px-6 rounded-lg shadow-lg shadow-teal-900/20 transition-colors">
                Get Started
              </Link>
              <Link href="/auth?view=signup" className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg border border-gray-600 transition-colors">
                Create Free Account
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Add the DatabaseDebugger component (only displayed in development) */}
      {process.env.NODE_ENV === 'development' && <DatabaseDebugger />}
    </div>
  );
} 