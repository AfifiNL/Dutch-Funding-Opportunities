'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InvestorType } from '../types';
import FundingCardStats from '@/features/funding-display/components/FundingCardStats';
import { useFundingOpportunities } from '@/hooks';
import { Investor } from '@/api/investors';

// SVG Icons for investor personalities
const PersonalityIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'analytical':
      return (
        <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    case 'visionary':
      return (
        <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    case 'conservative':
      return (
        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      );
    case 'risk-taker':
      return (
        <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      );
    case 'impact-focused':
      return (
        <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      );
    case 'constructive':
      return (
        <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      );
    default:
      return null;
  }
};

// Enhanced SVG-based avatar component
const InvestorAvatar = ({ type }: { type: string }) => {
  // Get background color for avatar
  const bgColor = (() => {
    switch (type) {
      case 'public-grant-officer': return 'bg-blue-600';
      case 'vc-partner': return 'bg-purple-600';
      case 'angel-investor': return 'bg-amber-600';
      case 'accelerator-director': return 'bg-teal-600';
      case 'impact-investor': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  })();
  
  // Get lighter accent color for details
  const accentColor = (() => {
    switch (type) {
      case 'public-grant-officer': return 'text-blue-300';
      case 'vc-partner': return 'text-purple-300';
      case 'angel-investor': return 'text-amber-300';
      case 'accelerator-director': return 'text-teal-300';
      case 'impact-investor': return 'text-green-300';
      default: return 'text-gray-300';
    }
  })();
  
  return (
    <div className={`relative h-12 w-12 rounded-full ${bgColor} flex items-center justify-center text-white overflow-hidden`}>
      {/* Public Grant Officer - Government/Official */}
      {type === 'public-grant-officer' && (
        <svg viewBox="0 0 100 100" className="w-16 h-16 absolute -bottom-2" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="35" y="60" width="30" height="40" className="fill-blue-300/30" />
          <rect x="25" y="20" width="50" height="10" rx="2" className="fill-blue-300/60" />
          <rect x="40" y="30" width="20" height="30" className="fill-blue-300/40" />
          <rect x="30" y="50" width="40" height="10" className="fill-blue-300/50" />
          <circle cx="50" cy="15" r="8" className="fill-white" />
          <path d="M35 70 L65 70 M35 80 L65 80 M35 90 L65 90" stroke="white" strokeWidth="1.5" />
          <path d="M40 35 L60 35 M40 40 L60 40 M40 45 L60 45" stroke="white" strokeWidth="1" />
        </svg>
      )}
      
      {/* VC Partner - Finance/Business */}
      {type === 'vc-partner' && (
        <svg viewBox="0 0 100 100" className="w-16 h-16 absolute -bottom-1" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="35" y="45" width="30" height="55" rx="2" className="fill-purple-300/40" />
          <circle cx="50" cy="20" r="12" className="fill-purple-300/60" />
          <path d="M40 20 L60 20" stroke="white" strokeWidth="2" />
          <path d="M50 10 L50 30" stroke="white" strokeWidth="2" />
          <path d="M40 55 L60 55 M40 65 L60 65 M40 75 L60 75 M40 85 L50 85" stroke="white" strokeWidth="1.5" />
          <path d="M30 45 L35 35 L65 35 L70 45" stroke="white" strokeWidth="1.5" fill="none" />
          <circle cx="50" cy="28" r="5" className="fill-white" />
        </svg>
      )}
      
      {/* Angel Investor - Individual/Wings */}
      {type === 'angel-investor' && (
        <svg viewBox="0 0 100 100" className="w-16 h-16 absolute -bottom-2" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="30" r="12" className="fill-amber-300/60" />
          <path d="M20 60 Q35 40 50 55 Q65 40 80 60" stroke="white" strokeWidth="2" fill="none" />
          <path d="M20 50 Q35 30 50 45 Q65 30 80 50" stroke="white" strokeWidth="2" fill="none" />
          <path d="M40 30 L60 30" stroke="white" strokeWidth="1.5" />
          <rect x="40" y="42" width="20" height="35" rx="10" className="fill-amber-300/40" />
          <path d="M45 55 L55 55 M45 60 L55 60" stroke="white" strokeWidth="1" />
        </svg>
      )}
      
      {/* Accelerator Director - Tech/Rocket */}
      {type === 'accelerator-director' && (
        <svg viewBox="0 0 100 100" className="w-16 h-16 absolute -bottom-2" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 90 L40 70 L60 70 Z" className="fill-teal-300/50" />
          <path d="M45 70 L40 50 L60 50 L55 70 Z" className="fill-teal-300/60" />
          <path d="M45 50 L50 20 L55 50 Z" className="fill-teal-300/40" />
          <circle cx="50" cy="20" r="8" className="fill-teal-300/70" />
          <path d="M35 60 L30 50 L35 40" stroke="white" strokeWidth="1.5" fill="none" />
          <path d="M65 60 L70 50 L65 40" stroke="white" strokeWidth="1.5" fill="none" />
          <path d="M40 80 L35 90 M60 80 L65 90" stroke="white" strokeWidth="1.5" fill="none" />
          <circle cx="50" cy="35" r="3" className="fill-white" />
        </svg>
      )}
      
      {/* Impact Investor - Sustainability/Leaf */}
      {type === 'impact-investor' && (
        <svg viewBox="0 0 100 100" className="w-16 h-16 absolute -bottom-1" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="25" r="12" className="fill-green-300/60" />
          <path d="M45 37 Q20 50 30 80" stroke="white" strokeWidth="1.5" fill="none" />
          <path d="M55 37 Q80 50 70 80" stroke="white" strokeWidth="1.5" fill="none" />
          <path d="M30 80 Q50 75 70 80" stroke="white" strokeWidth="1.5" fill="none" />
          <path d="M50 37 L50 65" stroke="white" strokeWidth="1.5" />
          <path d="M40 50 Q50 45 60 50" stroke="white" strokeWidth="1" fill="none" />
          <path d="M35 60 Q50 55 65 60" stroke="white" strokeWidth="1" fill="none" />
          <path d="M33 70 Q50 65 67 70" stroke="white" strokeWidth="1" fill="none" />
          <circle cx="50" cy="25" r="5" className="fill-white" />
        </svg>
      )}
      
      {/* Fallback for unknown types */}
      {!['public-grant-officer', 'vc-partner', 'angel-investor', 'accelerator-director', 'impact-investor'].includes(type) && (
        <svg viewBox="0 0 100 100" className="w-14 h-14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="30" r="15" className="fill-gray-300/50" />
          <rect x="35" y="45" width="30" height="40" rx="15" className="fill-gray-300/30" />
        </svg>
      )}
    </div>
  );
};

interface InvestorProfilesProps {
  investors: Investor[];
  activeStage: number;
}

const InvestorProfiles: React.FC<InvestorProfilesProps> = ({ investors, activeStage }) => {
  const [expandedInvestor, setExpandedInvestor] = useState<string | null>(null);
  const [showAssociatedFunding, setShowAssociatedFunding] = useState<string | null>(null);
  
  // Get funding opportunities from the hook
  const { opportunities: fundingOpportunities, loading: fundingLoading, error: fundingError } = useFundingOpportunities();
  
  // Log for validation
  useEffect(() => {
    console.log('Funding Opportunities Validation:');
    console.log('- Loading:', fundingLoading);
    console.log('- Error:', fundingError);
    console.log('- Data:', fundingOpportunities?.length || 0, 'records loaded');
    if (fundingOpportunities && fundingOpportunities.length > 0) {
      console.log('- Sample:', fundingOpportunities[0]);
    }
  }, [fundingOpportunities, fundingLoading, fundingError]);
  
  const toggleInvestor = (investorId: string) => {
    setExpandedInvestor(expandedInvestor === investorId ? null : investorId);
    // Reset the associated funding view when toggling investors
    setShowAssociatedFunding(null);
  };
  
  const toggleAssociatedFunding = (investorId: string) => {
    setShowAssociatedFunding(showAssociatedFunding === investorId ? null : investorId);
  };
  
  // Get funding opportunities for a specific investor
  const getInvestorFunding = (investor: Investor) => {
    if (!fundingOpportunities || fundingLoading) {
      return [];
    }
    
    // Match funding opportunities to investor based on sector and stage
    // Note: In a real implementation, this would use a more sophisticated matching algorithm
    // or preferably use direct relations from the database
    return fundingOpportunities.filter(opportunity => {
      // Match by investor type if available
      if (investor.type && opportunity.fundProvider) {
        const investorType = investor.type;
        // Ensure we have a string before calling toLowerCase
        const provider = typeof opportunity.fundProvider === 'string' 
          ? opportunity.fundProvider.toLowerCase() 
          : '';
        
        if (
          (investorType === 'public-grant-officer' && (provider.includes('rvo') || provider.includes('grant'))) ||
          (investorType === 'vc-partner' && (provider.includes('capital') || provider.includes('venture'))) ||
          (investorType === 'angel-investor' && (provider.includes('angel') || provider.includes('network'))) ||
          (investorType === 'accelerator-director' && (provider.includes('accelerator') || provider.includes('bootcamp'))) ||
          (investorType === 'impact-investor' && (provider.includes('impact') || provider.includes('social')))
        ) {
          return true;
        }
      }
      
      // Match by sector if available
      if (investor.focusSectors && opportunity.sector) {
        // Get investor sector as string or array of strings
        const investorSectors = investor.focusSectors;
        
        // Handle the opportunity sector based on its type
        if (typeof opportunity.sector === 'string') {
          // Opportunity sector is a string
          const opportunitySectorLower = opportunity.sector.toLowerCase();
          
          // Check against investor sector (string or array)
          if (typeof investorSectors === 'string') {
            // Use type assertion to tell TypeScript that investorSectors is a string
            return opportunitySectorLower.includes((investorSectors as string).toLowerCase());
          } else if (Array.isArray(investorSectors)) {
            return investorSectors.some(sector => 
              typeof sector === 'string' && opportunitySectorLower.includes(sector.toLowerCase())
            );
          }
          // Fallback if neither condition matches
          return false;
        } 
        else if (Array.isArray(opportunity.sector)) {
          // Opportunity sector is an array
          // Convert to lowercase strings for comparison
          const opportunitySectors = opportunity.sector
            .filter((sector): sector is string => typeof sector === 'string')
            .map(sector => sector.toLowerCase());
          
          // Check against investor sector (string or array)
          if (typeof investorSectors === 'string') {
            // Use type assertion to tell TypeScript that investorSectors is a string
            const investorSectorsLower = (investorSectors as string).toLowerCase();
            return opportunitySectors.some(sector => sector.includes(investorSectorsLower));
          } else if (Array.isArray(investorSectors)) {
            // Check if any investor sector matches any opportunity sector
            return investorSectors.some(invSector => {
              if (typeof invSector !== 'string') return false;
              const invSectorLower = invSector.toLowerCase();
              return opportunitySectors.some(opSector => opSector.includes(invSectorLower));
            });
          }
          // Fallback if neither condition matches
          return false;
        }
      }
      
      // Default fallback - show at least one funding opportunity per investor
      return true;
    }).slice(0, 2); // Limit to 2 opportunities per investor for UI simplicity
  };
  
  // Map investor personality to description
  const getPersonalityDescription = (personality: string) => {
    const personalityMap: Record<string, string> = {
      'analytical': 'Focused on data and metrics, values detailed business plans',
      'visionary': 'Interested in big ideas and market transformation potential',
      'conservative': 'Cautious investor seeking proven business models with clear returns',
      'risk-taker': 'Willing to bet on innovative but unproven concepts',
      'impact-focused': 'Prioritizes social and environmental impact alongside returns',
      'constructive': 'Offers helpful feedback and guidance for improvement'
    };
    
    return personalityMap[personality] || personality;
  };
  
  // Map feedback style to description
  const getFeedbackStyleDescription = (style: string) => {
    const styleMap: Record<string, string> = {
      'detailed': 'Provides comprehensive, point-by-point analysis',
      'direct': 'Gives straightforward, unfiltered opinions',
      'methodical': 'Uses systematic approach to evaluate pitches',
      'structured': 'Follows consistent evaluation framework',
      'encouraging': 'Highlights positives while suggesting improvements',
      'collaborative': 'Works with founders to refine concepts',
      'constructive': 'Focuses on actionable improvements',
      'challenging': 'Tests ideas with difficult questions',
      'thorough': 'Examines all aspects in detail'
    };
    
    return styleMap[style] || style;
  };
  
  if (investors.length === 0) {
    return (
      <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 text-center text-gray-400">
        No investors available for this funding stage
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {investors.map((investor) => (
        <div 
          key={investor.id} 
          className="bg-gray-800/50 rounded-lg border border-gray-700 overflow-hidden hover:border-blue-500 transition-colors"
        >
          <div className="p-4">
            <div className="flex items-center mb-3">
              {investor.logoUrl ? (
                <div className="w-10 h-10 bg-gray-700 rounded-md overflow-hidden mr-3">
                  <img src={investor.logoUrl} alt={investor.name} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-10 h-10 bg-gray-700 rounded-md flex items-center justify-center mr-3">
                  <span className="text-gray-400 text-xs font-bold">
                    {investor.name.split(' ').map(word => word[0]).join('')}
                  </span>
                </div>
              )}
              <div>
                <h4 className="text-white font-medium">{investor.name}</h4>
                <div className="text-xs text-blue-400">{investor.type}</div>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-3 line-clamp-2">{investor.description}</p>
            
            <div className="grid grid-cols-2 gap-2 text-xs">
              {investor.location && (
                <div className="text-gray-500">
                  <span className="block text-gray-400">Location</span>
                  {investor.location}
                </div>
              )}
              {investor.investmentRange && (
                <div className="text-gray-500">
                  <span className="block text-gray-400">Investment</span>
                  {investor.investmentRange}
                </div>
              )}
            </div>
            
            {investor.focusSectors && investor.focusSectors.length > 0 && (
              <div className="mt-3">
                <div className="text-xs text-gray-400 mb-1">Focus Sectors</div>
                <div className="flex flex-wrap gap-1">
                  {investor.focusSectors.map((sector, index) => (
                    <span key={index} className="text-xs bg-gray-700 rounded-full px-2 py-0.5 text-gray-300">
                      {sector}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <div className="mt-3 pt-3 border-t border-gray-700 flex justify-between items-center">
              <div className="text-xs text-gray-500">
                Stage: <span className="text-blue-400">{getStageLabel(investor.stages)}</span>
              </div>
              {investor.website && (
                <a 
                  href={investor.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-blue-400 hover:text-blue-300"
                >
                  Visit Website
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

function getStageLabel(stages: number[]): string {
  if (!stages || stages.length === 0) return 'Unknown';
  
  const stageNames = ['Ideation', 'Validation', 'Seed', 'Growth', 'Expansion'];
  const stageLabels = stages.map(s => stageNames[s] || `Stage ${s}`);
  
  if (stageLabels.length === 1) return stageLabels[0];
  if (stageLabels.length === 2) return `${stageLabels[0]} & ${stageLabels[1]}`;
  return `${stageLabels[0]}-${stageLabels[stageLabels.length - 1]}`;
}

export default InvestorProfiles; 