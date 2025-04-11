'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getFundingOpportunityById } from '@/api/fundingOpportunities';
import { IFundingOpportunity } from '@/features/funding-display/types';
import { ArrowLeftIcon, CalendarIcon, DocumentTextIcon, CurrencyEuroIcon, CheckCircleIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { slugToUuid } from '@/utils/slugs';

export default function FundingDetailsClient() {
  const params = useParams<{ id: string }>();
  const id = params?.id ? slugToUuid(params.id as string) : '';
  const router = useRouter();
  const [opportunity, setOpportunity] = useState<IFundingOpportunity | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadOpportunity() {
      try {
        setLoading(true);
        setError(null);
        
        // Additional validation of ID format
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        const rawId = params?.id as string;
        
        if (id && !uuidRegex.test(id)) {
          console.warn(`Non-UUID format detected: ${rawId} → ${id}. This may be a slug that needs mapping.`);
        }
        
        const data = await getFundingOpportunityById(id);
        if (data) {
          setOpportunity(data as unknown as IFundingOpportunity);
        } else {
          setError('Funding opportunity not found');
        }
      } catch (err: any) {
        console.error('Error loading funding opportunity:', err);
        
        // Check for specific UUID-related errors
        if (err.message && (
          err.message.includes('Invalid UUID format') || 
          err.message.includes('Invalid UUID syntax') ||
          err.message.includes('invalid input syntax for type uuid')
        )) {
          setError(`Invalid funding ID format. Please check the URL and try again.`);
        } else {
          setError('Failed to load funding opportunity');
        }
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
  }, [id, params?.id]);

  // Handle loading state
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-32 bg-gray-700 rounded"></div>
              <div className="h-32 bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-6">Oops! Something went wrong</h1>
          <p className="text-xl mb-8">{error}</p>
          <Link href="/funding" className="inline-flex items-center text-teal-400 hover:text-teal-300 font-medium">
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Back to Funding Opportunities
          </Link>
        </div>
      </div>
    );
  }

  // No opportunity found
  if (!opportunity) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-6">Funding Opportunity Not Found</h1>
          <p className="text-xl mb-8">The funding opportunity you're looking for doesn't exist or has been removed.</p>
          <Link href="/funding" className="inline-flex items-center text-teal-400 hover:text-teal-300 font-medium">
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Browse All Funding Opportunities
          </Link>
        </div>
      </div>
    );
  }

  // Render the opportunity details
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Back button */}
        <div className="mb-8">
          <Link href="/funding" className="inline-flex items-center text-teal-400 hover:text-teal-300 font-medium">
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Back to Funding Opportunities
          </Link>
        </div>

        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <div className="inline-block bg-teal-500 bg-opacity-20 text-teal-400 text-sm font-semibold px-4 py-2 rounded-full mb-4">
            {opportunity.sector}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{opportunity.title}</h1>
          <div className="flex flex-wrap items-center text-gray-300 mb-6">
            <span className="mr-6 mb-2">
              <span className="font-semibold">Provider:</span> {opportunity.fundProvider}
            </span>
            <span className="mr-6 mb-2">
              <span className="font-semibold">Location:</span> {opportunity.location}
            </span>
          </div>
          <p className="text-xl text-gray-300">{opportunity.description}</p>
        </motion.div>

        {/* Details Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        >
          {/* Funding Information */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <CurrencyEuroIcon className="w-6 h-6 mr-2 text-teal-400" />
              Funding Information
            </h2>
            <div className="space-y-4">
              <div>
                <div className="text-gray-400 text-sm">Amount</div>
                <div className="font-medium">{opportunity.amountDescription}</div>
              </div>
              {opportunity.equity && (
                <div>
                  <div className="text-gray-400 text-sm">Equity Requirement</div>
                  <div className="font-medium">{opportunity.equity}</div>
                </div>
              )}
              {opportunity.programSupport && (
                <div className="flex items-start">
                  <CheckCircleIcon className="w-5 h-5 text-teal-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Includes program support and mentorship</span>
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <DocumentTextIcon className="w-6 h-6 mr-2 text-teal-400" />
              Application Details
            </h2>
            <div className="space-y-4">
              {opportunity.details && Array.isArray(opportunity.details) ? (
                opportunity.details.map((detail, index) => (
                  <div key={index}>
                    <div className="text-gray-400 text-sm">{detail.key}</div>
                    <div className="font-medium">{detail.value}</div>
                  </div>
                ))
              ) : opportunity.details && typeof opportunity.details === 'object' ? (
                Object.entries(opportunity.details).map(([key, value]) => (
                  <div key={key}>
                    <div className="text-gray-400 text-sm">{key}</div>
                    <div className="font-medium">{value as string}</div>
                  </div>
                ))
              ) : (
                <div>
                  <div className="text-gray-400 text-sm">Application Process</div>
                  <div className="font-medium">Contact provider for details</div>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Relevant Links */}
        {opportunity.relevantLinks && opportunity.relevantLinks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-xl font-semibold mb-4">Relevant Links</h2>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <ul className="space-y-3">
                {opportunity.relevantLinks.map((link, index) => {
                  // Since relevantLinks is defined as string[] in the interface
                  const href = link as string;
                  return (
                    <li key={index}>
                      <a 
                        href={href}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-teal-400 hover:text-teal-300"
                      >
                        <ArrowTopRightOnSquareIcon className="w-4 h-4 mr-2" />
                        {href}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-teal-900/30 rounded-xl p-8 border border-teal-800/50 text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Ready to Pursue This Opportunity?</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Save this opportunity to your profile or explore more funding options to find the perfect match for your startup.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/funding"
              className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg border border-gray-600 transition-colors"
            >
              Explore More Opportunities
            </Link>
            {opportunity.relevantLinks && opportunity.relevantLinks.length > 0 && (
              <a
                href={opportunity.relevantLinks[0] as string}
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-teal-600 hover:bg-teal-500 text-white font-medium py-3 px-6 rounded-lg shadow-lg shadow-teal-900/20 transition-colors"
              >
                Visit Official Website
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
} 