'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { getFundingOpportunities } from '@/api/fundingOpportunities';
import { IFundingOpportunity } from '@/features/funding-display/types';
import { ExclamationTriangleIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import SaveButton from '@/features/funding-display/components/SaveButton';

// Define funding types
const fundingTypes = [
  { id: 'all', name: 'All Opportunities' },
  { id: 'grants', name: 'Grants' },
  { id: 'venture', name: 'Venture Capital' },
  { id: 'angels', name: 'Angel Investors' },
  { id: 'accelerators', name: 'Accelerators' },
  { id: 'loans', name: 'Government Loans' },
  { id: 'crowdfunding', name: 'Crowdfunding' },
];

// Create a separate component for the actual content
function FundingPageContent() {
  const [selectedType, setSelectedType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [opportunities, setOpportunities] = useState<IFundingOpportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  
  // Check for error messages from URL parameters
  const error = searchParams?.get('error');
  const searchTerm = searchParams?.get('search');
  
  useEffect(() => {
    // If there's a search term in the URL, use it
    if (searchTerm) {
      setSearchQuery(searchTerm);
    }
    
    async function loadOpportunities() {
      try {
        setLoading(true);
        const data = await getFundingOpportunities();
        setOpportunities(data as unknown as IFundingOpportunity[]);
      } catch (err) {
        console.error('Failed to load funding opportunities:', err);
      } finally {
        setLoading(false);
      }
    }
    
    loadOpportunities();
  }, [searchTerm]);
  
  // Map funding types to our opportunity data
  const getTypeFromFundingData = (opportunity: IFundingOpportunity) => {
    // First check the funding_type field (which is the preferred field)
    if (opportunity.funding_type) {
      const lowerFundingType = opportunity.funding_type.toLowerCase();
      if (lowerFundingType === 'grant') return 'grants';
      if (lowerFundingType === 'venture capital') return 'venture';
      if (lowerFundingType === 'angel investment') return 'angels';
      if (lowerFundingType === 'accelerator') return 'accelerators';
      if (lowerFundingType === 'loan') return 'loans';
      if (lowerFundingType === 'crowdfunding') return 'crowdfunding';
    }
    
    // Fallback to sector field for backward compatibility
    const lowerSector = opportunity.sector.toLowerCase();
    if (lowerSector.includes('grant')) return 'grants';
    if (lowerSector.includes('private') || lowerSector.includes('venture')) return 'venture';
    if (lowerSector.includes('angel')) return 'angels';
    if (lowerSector.includes('accelerator') || lowerSector.includes('incubator')) return 'accelerators';
    if (lowerSector.includes('loan')) return 'loans';
    if (lowerSector.includes('crowd')) return 'crowdfunding';
    return 'all';
  };
  
  // Filter opportunities based on type and search query
  const filteredOpportunities = opportunities.filter(opportunity => {
    const opportunityType = getTypeFromFundingData(opportunity);
    const matchesType = selectedType === 'all' || opportunityType === selectedType;
    const matchesSearch = 
      opportunity.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      opportunity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opportunity.fundProvider.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Funding Opportunities</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover the perfect funding source for your innovative Dutch startup
          </p>
        </div>

        {/* Error message if redirected from a failed details page */}
        {error === 'not_found' && (
          <div className="mb-8 max-w-3xl mx-auto bg-yellow-900/30 border border-yellow-800 rounded-lg p-4 flex items-start">
            <ExclamationTriangleIcon className="w-6 h-6 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-yellow-200 mb-1">Funding opportunity not found</h3>
              <p className="text-yellow-100/70">
                We couldn't find the funding opportunity you were looking for. 
                {searchTerm && ` We've searched for "${searchTerm}" below.`}
              </p>
            </div>
          </div>
        )}

        {/* Search and filters */}
        <div className="mb-8 max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search funding opportunities..."
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-white"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              aria-label="Filter by funding type"
            >
              {fundingTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Loading state */}
        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <div key={index} className="bg-gray-800 rounded-xl p-6 border border-gray-700 animate-pulse">
                <div className="h-4 bg-gray-700 rounded w-1/4 mb-4"></div>
                <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-700 rounded w-1/2 mb-4"></div>
                <div className="space-y-2 mb-4">
                  <div className="h-4 bg-gray-700 rounded"></div>
                  <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                </div>
                <div className="flex justify-between mb-4">
                  <div className="h-4 bg-gray-700 rounded w-2/5"></div>
                  <div className="h-4 bg-gray-700 rounded w-2/5"></div>
                </div>
                <div className="h-4 bg-gray-700 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        ) : (
          // Funding opportunities list
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredOpportunities.map((opportunity) => (
              <motion.div
                key={opportunity.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-teal-500 transition-colors group"
              >
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-teal-900/50 text-teal-400 border border-teal-800/50">
                    {opportunity.sector}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-teal-400 transition-colors">
                  {opportunity.title}
                </h3>
                <p className="text-sm text-gray-400 mb-3">
                  By {opportunity.fundProvider}
                </p>
                <p className="text-gray-300 mb-4 line-clamp-3">
                  {opportunity.description}
                </p>
                <div className="flex justify-between text-sm mb-6">
                  <div>
                    <span className="text-gray-400">Amount:</span> 
                    <span className="ml-1 text-white">{opportunity.amountDescription}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Stage:</span> 
                    <span className="ml-1 text-white">{opportunity.funding_type || 'Various'}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Link 
                    href={`/funding/${opportunity.id}`}
                    className="text-teal-400 hover:text-teal-300 font-medium"
                  >
                    View Details
                  </Link>
                  <SaveButton fundingId={opportunity.id} />
                </div>
              </motion.div>
            ))}
          </div>
        )}
        
        {/* Empty state */}
        {!loading && filteredOpportunities.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-block p-3 bg-yellow-900/30 rounded-full mb-4">
              <ExclamationTriangleIcon className="w-8 h-8 text-yellow-500" />
            </div>
            <h3 className="text-xl font-medium mb-2">No funding opportunities found</h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              We couldn't find any funding opportunities matching your filters. 
              Try adjusting your search criteria.
            </p>
            <button
              onClick={() => {
                setSelectedType('all');
                setSearchQuery('');
              }}
              className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg border border-gray-600 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default function FundingClient() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="h-10 bg-gray-800 w-1/3 mx-auto mb-4 animate-pulse rounded"></div>
            <div className="h-6 bg-gray-800 w-1/2 mx-auto animate-pulse rounded"></div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <div key={index} className="bg-gray-800 rounded-xl p-6 border border-gray-700 animate-pulse">
                <div className="h-4 bg-gray-700 rounded w-1/4 mb-4"></div>
                <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-700 rounded w-1/2 mb-4"></div>
                <div className="space-y-2 mb-4">
                  <div className="h-4 bg-gray-700 rounded"></div>
                  <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                </div>
                <div className="flex justify-between mb-4">
                  <div className="h-4 bg-gray-700 rounded w-2/5"></div>
                  <div className="h-4 bg-gray-700 rounded w-2/5"></div>
                </div>
                <div className="h-4 bg-gray-700 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    }>
      <FundingPageContent />
    </Suspense>
  );
} 