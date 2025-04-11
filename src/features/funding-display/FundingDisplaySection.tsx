'use client'; // Mark as client component for hooks and event handlers

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IFundingOpportunity } from './types';
import FundingCard from './components/FundingCard';
import FundingCardImpact from './components/FundingCardImpact';
import FundingCardEarlyStage from './components/FundingCardEarlyStage';
import FundingFilterBar, { FilterCategory } from './components/FundingFilterBar';
import { Icons } from '@/components/IconSet';

// Secondary filter types
type SecondaryFilterType = 'equity' | 'noEquity' | 'withProgram' | 'ai' | 'impact' | null;

interface Props {
  fundingData: IFundingOpportunity[];
}

const FundingDisplaySection: React.FC<Props> = ({ fundingData }) => {
  const [filter, setFilter] = useState<string>('all');
  const [secondaryFilter, setSecondaryFilter] = useState<SecondaryFilterType>(null);
  const [filteredData, setFilteredData] = useState<IFundingOpportunity[]>(fundingData);
  const [activeAnimation, setActiveAnimation] = useState<boolean>(true);

  // Calculate counts for each category
  const publicCount = fundingData.filter(item => 
    item.sector.toLowerCase().includes('public')).length;
  
  const privateCount = fundingData.filter(item => 
    item.sector.toLowerCase().includes('private')).length;
  
  const acceleratorCount = fundingData.filter(item => 
    (item.sector.toLowerCase().includes('accelerator') || 
     item.sector.toLowerCase().includes('incubator'))).length;
  
  const euCount = fundingData.filter(item => 
    item.sector.toLowerCase().includes('eu')).length;
  
  const impactCount = fundingData.filter(item => 
    item.sector.toLowerCase().includes('impact') || 
    item.sector.toLowerCase().includes('sdg') ||
    item.description.toLowerCase().includes('sustainability')).length;
  
  const earlyStageCount = fundingData.filter(item => 
    item.sector.toLowerCase().includes('early') || 
    item.sector.toLowerCase().includes('seed') ||
    item.description.toLowerCase().includes('early stage')).length;
  
  const innovationCount = fundingData.filter(item => 
    item.sector.toLowerCase().includes('innovation') || 
    item.description.toLowerCase().includes('innovation')).length;
  
  const angelCount = fundingData.filter(item => 
    item.sector.toLowerCase().includes('angel') || 
    item.description.toLowerCase().includes('angel investor')).length;

  // Filter categories
  const filterCategories: FilterCategory[] = [
    { id: 'public', name: 'Public Grants', count: publicCount, icon: <Icons.Building className="w-5 h-5" /> },
    { id: 'private', name: 'Private Funding', count: privateCount, icon: <Icons.Currency className="w-5 h-5" /> },
    { id: 'accelerator', name: 'Accelerators', count: acceleratorCount, icon: <Icons.Lightning className="w-5 h-5" /> },
    { id: 'eu', name: 'EU Programs', count: euCount, icon: <Icons.Globe className="w-5 h-5" /> },
    { id: 'impact', name: 'Impact Funding', count: impactCount, icon: <Icons.Heart className="w-5 h-5" /> },
    { id: 'early', name: 'Early Stage', count: earlyStageCount, icon: <Icons.Sparkles className="w-5 h-5" /> },
    { id: 'innovation', name: 'Innovation', count: innovationCount, icon: <Icons.Sparkles className="w-5 h-5" /> },
    { id: 'angel', name: 'Angel Investors', count: angelCount, icon: <Icons.People className="w-5 h-5" /> },
  ];

  // Handle filter changes
  const handleFilterChange = (category: string) => {
    setActiveAnimation(false);
    
    // Small delay to ensure clean animation
    setTimeout(() => {
      setFilter(category);
      setActiveAnimation(true);
    }, 50);
  };
  
  // Handle secondary filter changes
  const handleSecondaryFilterChange = (type: SecondaryFilterType) => {
    setSecondaryFilter(prev => prev === type ? null : type);
  };

  // Filter data based on selected filter
  useEffect(() => {
    let result = fundingData;
    
    // Apply primary filter
    if (filter !== 'all') {
      result = result.filter(item => {
        const sector = item.sector.toLowerCase();
        const title = item.title.toLowerCase();
        const description = item.description.toLowerCase();
        
        switch (filter) {
          case 'public':
            return sector.includes('public') || sector.includes('government');
          case 'private':
            return sector.includes('private') || sector.includes('venture');
          case 'accelerator':
            return sector.includes('accelerator') || sector.includes('incubator');
          case 'eu':
            return sector.includes('eu') || sector.includes('europe');
          case 'impact':
            return sector.includes('impact') || sector.includes('sdg') || 
                   description.includes('sustainability') || description.includes('climate');
          case 'early':
            return sector.includes('early') || sector.includes('seed') || 
                   description.includes('early stage') || description.includes('startup');
          case 'innovation':
            return sector.includes('innovation') || description.includes('innovation');
          case 'angel':
            return sector.includes('angel') || description.includes('angel investor');
          default:
            return true;
        }
      });
    }
    
    // Apply secondary filter
    if (secondaryFilter) {
      result = result.filter(item => {
        // Get funding details
        const fundingDetails = item.details || {};
        const hasEquityInfo = typeof fundingDetails === 'object' && 
                             'equityRequired' in fundingDetails;
        
        switch (secondaryFilter) {
          case 'equity':
            return hasEquityInfo && 
                  (fundingDetails as Record<string, any>).equityRequired === true;
          case 'noEquity':
            return hasEquityInfo && 
                  (fundingDetails as Record<string, any>).equityRequired === false;
          case 'withProgram':
            return item.programSupport === true;
          case 'ai':
            return item.title.toLowerCase().includes('ai') || 
                   item.description.toLowerCase().includes('artificial intelligence');
          case 'impact':
            return item.title.toLowerCase().includes('impact') || 
                   item.description.toLowerCase().includes('sustainability');
          default:
            return true;
        }
      });
    }
    
    setFilteredData(result);
  }, [filter, secondaryFilter, fundingData]);

  // Is the opportunity impact-focused?
  const isImpactFunding = (opportunity: IFundingOpportunity): boolean => {
    const lowerTitle = opportunity.title.toLowerCase();
    const lowerDescription = opportunity.description.toLowerCase();
    const lowerSector = opportunity.sector.toLowerCase();
    
    return lowerSector.includes('impact') || 
           lowerSector.includes('sdg') || 
           lowerTitle.includes('impact') || 
           lowerTitle.includes('sustainable') || 
           lowerDescription.includes('sustainability') || 
           lowerDescription.includes('climate') ||
           lowerDescription.includes('circular');
  };
  
  // Is the opportunity early-stage focused?
  const isEarlyStageFunding = (opportunity: IFundingOpportunity): boolean => {
    const lowerTitle = opportunity.title.toLowerCase();
    const lowerDescription = opportunity.description.toLowerCase();
    
    return lowerTitle.includes('early') || 
           lowerTitle.includes('seed') || 
           lowerTitle.includes('startup') || 
           lowerDescription.includes('early stage') || 
           lowerDescription.includes('prototype') ||
           lowerDescription.includes('mvp') ||
           lowerDescription.includes('proof of concept');
  };

  return (
    <div className="relative py-16 px-4">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-20 left-20 w-48 h-48 bg-blue-900/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-10 w-48 h-48 bg-teal-900/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-96 left-1/4 w-40 h-40 bg-purple-900/10 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-1/4 w-36 h-36 bg-amber-900/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500">
            Dutch Funding Opportunities
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover the perfect funding match for your startup or innovation project in the Netherlands. 
            Filter by category to find exactly what you need.
          </p>
        </div>

        {/* Filter bar */}
        <div className="max-w-5xl mx-auto">
          <FundingFilterBar 
            categories={filterCategories} 
            onFilterChange={handleFilterChange}
            className="mb-8"
          />
          
          {/* Secondary filter options */}
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            <div className="text-gray-400 text-sm my-auto mr-2">Refine:</div>
            
            <button
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors border ${
                secondaryFilter === 'equity' 
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' 
                  : 'border-gray-700 text-gray-400 hover:text-gray-300'
              }`}
              onClick={() => handleSecondaryFilterChange('equity')}
              data-filter-refine="equity"
            >
              Requires Equity
            </button>
            
            <button
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors border ${
                secondaryFilter === 'noEquity' 
                  ? 'bg-green-500/20 text-green-300 border-green-500/30' 
                  : 'border-gray-700 text-gray-400 hover:text-gray-300'
              }`}
              onClick={() => handleSecondaryFilterChange('noEquity')}
              data-filter-refine="noEquity"
            >
              No Equity Required
            </button>
            
            <button
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors border ${
                secondaryFilter === 'withProgram' 
                  ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' 
                  : 'border-gray-700 text-gray-400 hover:text-gray-300'
              }`}
              onClick={() => handleSecondaryFilterChange('withProgram')}
              data-filter-refine="withProgram"
            >
              With Program Support
            </button>
            
            <button
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors border ${
                secondaryFilter === 'ai' 
                  ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' 
                  : 'border-gray-700 text-gray-400 hover:text-gray-300'
              }`}
              onClick={() => handleSecondaryFilterChange('ai')}
              data-filter-refine="ai"
            >
              AI & Machine Learning
            </button>
            
            <button
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors border ${
                secondaryFilter === 'impact' 
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' 
                  : 'border-gray-700 text-gray-400 hover:text-gray-300'
              }`}
              onClick={() => handleSecondaryFilterChange('impact')}
              data-filter-refine="impact"
            >
              Sustainability Focus
            </button>
          </div>
        </div>

        {/* Results count */}
        <div className="text-center mb-8">
          <div className="inline-block px-4 py-1 bg-gray-800/50 rounded-full border border-gray-700">
            <span className="text-gray-400 text-sm">
              Showing <span className="text-white font-medium">{filteredData.length}</span> funding opportunities
            </span>
          </div>
        </div>

        {/* Funding cards grid */}
        <AnimatePresence mode="wait">
          {activeAnimation && (
            <motion.div
              key={filter + (secondaryFilter || 'none')}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredData.map((opportunity, index) => {
                // Decide which card type to use based on content
                if (isImpactFunding(opportunity)) {
                  return (
                    <motion.div
                      key={opportunity.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0, 
                        transition: { delay: index * 0.07, duration: 0.4 } 
                      }}
                      data-funding-id={opportunity.id}
                      className="h-full"
                    >
                      <FundingCardImpact opportunity={opportunity} />
                    </motion.div>
                  );
                } else if (isEarlyStageFunding(opportunity)) {
                  return (
                    <motion.div
                      key={opportunity.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0, 
                        transition: { delay: index * 0.07, duration: 0.4 } 
                      }}
                      data-funding-id={opportunity.id}
                      className="h-full"
                    >
                      <FundingCardEarlyStage opportunity={opportunity} />
                    </motion.div>
                  );
                } else {
                  // Default card
                  return (
                    <motion.div
                      key={opportunity.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0, 
                        transition: { delay: index * 0.07, duration: 0.4 } 
                      }}
                      data-funding-id={opportunity.id}
                      className="h-full"
                    >
                      <FundingCard opportunity={opportunity} />
                    </motion.div>
                  );
                }
              })}
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Empty state */}
        {filteredData.length === 0 && (
          <div className="text-center py-16 border border-gray-800 rounded-lg bg-gray-900/50 max-w-2xl mx-auto">
            <svg className="w-12 h-12 mx-auto text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-300 mb-2">No funding opportunities found</h3>
            <p className="text-gray-500 max-w-md mx-auto mb-6">Try adjusting your filters or explore other categories</p>
            <button 
              onClick={() => {
                setFilter('all');
                setSecondaryFilter(null);
              }}
              className="inline-flex items-center px-4 py-2 border border-gray-700 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-800 transition-colors"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FundingDisplaySection; 