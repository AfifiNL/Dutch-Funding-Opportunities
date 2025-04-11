'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getFundingOpportunityById } from '@/api/fundingOpportunities';
import { IFundingOpportunity } from '@/features/funding-display/types';
import { ArrowLeftIcon, CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ApplyForFunding() {
  const params = useParams<{ id: string }>();
  const id = params?.id || '';
  const router = useRouter();
  const [opportunity, setOpportunity] = useState<IFundingOpportunity | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    async function loadOpportunity() {
      try {
        setLoading(true);
        const data = await getFundingOpportunityById(id);
        if (data) {
          setOpportunity(data as unknown as IFundingOpportunity);
        } else {
          setError('Funding opportunity not found');
        }
      } catch (err) {
        setError('Failed to load funding opportunity');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadOpportunity();
    } else {
      setError('Invalid funding ID');
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-700 rounded w-3/4"></div>
            <div className="h-6 bg-gray-700 rounded w-1/2"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-700 rounded w-5/6"></div>
              <div className="h-4 bg-gray-700 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !opportunity) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-6">Something went wrong</h1>
          <p className="text-xl mb-8">{error || "Funding opportunity not found"}</p>
          <Link href="/funding" className="inline-flex items-center text-teal-400 hover:text-teal-300 font-medium">
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Browse All Funding Opportunities
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Back button */}
        <div className="mb-8">
          <Link href={`/funding/${opportunity.id}`} className="inline-flex items-center text-teal-400 hover:text-teal-300 font-medium">
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Back to Funding Details
          </Link>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">Apply for {opportunity.title}</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Check your eligibility and start your application process
            </p>
          </div>

          {/* Application status section */}
          <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 mb-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center bg-yellow-500 bg-opacity-20 w-16 h-16 rounded-full mb-4">
                <ClockIcon className="w-8 h-8 text-yellow-400" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Application Coming Soon</h2>
              <p className="text-gray-300">
                We're currently working on integrating the application process for this funding opportunity. 
                Check back soon or sign up for notifications.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-700 bg-opacity-50 rounded-lg p-4 text-center">
                <h3 className="font-semibold mb-1">Provider</h3>
                <p className="text-gray-300">{opportunity.fundProvider}</p>
              </div>
              <div className="bg-gray-700 bg-opacity-50 rounded-lg p-4 text-center">
                <h3 className="font-semibold mb-1">Amount</h3>
                <p className="text-gray-300">{opportunity.amountDescription}</p>
              </div>
              <div className="bg-gray-700 bg-opacity-50 rounded-lg p-4 text-center">
                <h3 className="font-semibold mb-1">Location</h3>
                <p className="text-gray-300">{opportunity.location}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href={opportunity.relevantLinks[0] || '#'} 
                target="_blank"
                className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-6 rounded-lg text-center"
              >
                Visit Official Website
              </Link>
              <Link 
                href="/profile/wizard"
                className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg text-center"
              >
                Complete Your Profile First
              </Link>
            </div>
          </div>

          {/* Information about application process */}
          <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
            <h2 className="text-xl font-bold mb-6">What to Expect in the Application Process</h2>
            
            <div className="space-y-6">
              <div className="flex">
                <div className="flex-shrink-0 w-10 h-10 bg-teal-500 bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                  <span className="text-teal-400 font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Eligibility Check</h3>
                  <p className="text-gray-300">
                    The system will evaluate your startup profile against the funding requirements to determine your eligibility.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 w-10 h-10 bg-teal-500 bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                  <span className="text-teal-400 font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Application Form</h3>
                  <p className="text-gray-300">
                    Fill out the required information specific to this funding opportunity.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 w-10 h-10 bg-teal-500 bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                  <span className="text-teal-400 font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Document Submission</h3>
                  <p className="text-gray-300">
                    Upload required documents such as business plans, financial statements, and other supporting materials.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 w-10 h-10 bg-teal-500 bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                  <span className="text-teal-400 font-bold">4</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Application Review</h3>
                  <p className="text-gray-300">
                    Track your application status as our team reviews your submission and provides feedback.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 