'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FundingCardPyramid from '@/features/funding-display/components/FundingCardPyramid';

// Define funding stages
export const fundingStages = [
  {
    id: 0,
    name: 'Ideation',
    description: 'Define your initial business concept and value proposition',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    )
  },
  {
    id: 1,
    name: 'Validation',
    description: 'Test your concept with potential customers and early prototypes',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    id: 2,
    name: 'Seed',
    description: 'Launch your MVP and secure initial funding for growth',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )
  },
  {
    id: 3,
    name: 'Growth',
    description: 'Scale your business with Series A funding and team expansion',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    )
  },
  {
    id: 4,
    name: 'Expansion',
    description: 'Expand to new markets and secure later-stage funding',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    )
  }
];

interface JourneyProgressProps {
  currentStage: number;
  completedStages: number[];
  onStageSelect: (stageId: number) => void;
  pitchScores?: Record<number, number>; // Stores the best pitch score for each stage
  showFundingPyramid?: boolean;
}

const JourneyProgress: React.FC<JourneyProgressProps> = ({
  currentStage,
  completedStages,
  onStageSelect,
  pitchScores = {},
  showFundingPyramid = true
}) => {
  const [showPyramidDetails, setShowPyramidDetails] = useState(false);
  
  return (
    <div className="relative">
      {/* Stage progression visualization */}
      <div className="relative flex flex-col">
        {fundingStages.map((stage, index) => {
          const isCompleted = completedStages.includes(stage.id);
          const isActive = currentStage === stage.id;
          const isLocked = index > Math.max(...completedStages) + 1;
          
          // Calculate colors based on state
          const bgColor = isActive 
            ? 'bg-blue-500' 
            : isCompleted 
              ? 'bg-green-500' 
              : isLocked 
                ? 'bg-gray-700' 
                : 'bg-gray-600';
          
          const textColor = isActive 
            ? 'text-blue-100' 
            : isCompleted 
              ? 'text-green-100' 
              : isLocked 
                ? 'text-gray-500'
                : 'text-gray-300';
          
          // Get pitch score if available
          const stageScore = pitchScores[stage.id];
          
          return (
            <div key={stage.id} className="relative">
              {/* Connector line (except for first item) */}
              {index > 0 && (
                <div className={`absolute left-6 -top-6 h-6 w-0.5 ${
                  completedStages.includes(stage.id - 1) ? 'bg-green-500' : 'bg-gray-700'
                }`} />
              )}
              
              <div 
                className={`flex items-start mb-8 cursor-pointer transition-all duration-200 ${
                  isLocked ? 'opacity-50 pointer-events-none' : 'hover:brightness-110'
                }`}
                onClick={() => !isLocked && onStageSelect(stage.id)}
              >
                {/* Stage circle */}
                <div className={`relative flex-shrink-0 h-12 w-12 rounded-full ${bgColor} flex items-center justify-center shadow-lg overflow-hidden`}>
                  <div className={`${textColor} z-10`}>
                    {stage.icon}
                  </div>
                  
                  {/* Animated highlight for active stage */}
                  {isActive && (
                    <motion.div 
                      className="absolute inset-0 bg-white opacity-20"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 2,
                        ease: "easeInOut"
                      }}
                    />
                  )}
                  
                  {/* Lock icon for locked stages */}
                  {isLocked && (
                    <div className="absolute inset-0 bg-gray-900/70 flex items-center justify-center">
                      <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                  )}
                </div>
                
                {/* Stage details */}
                <div className="ml-4 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className={`font-medium ${isActive ? 'text-white' : isLocked ? 'text-gray-500' : 'text-gray-300'}`}>
                      {stage.name}
                    </h3>
                    
                    {/* Show check icon for completed stages */}
                    {isCompleted && (
                      <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    
                    {/* Show score if available */}
                    {stageScore !== undefined && (
                      <span className={`px-1.5 py-0.5 rounded-md text-xs ${
                        stageScore >= 4.0 
                          ? 'bg-green-900/50 text-green-300' 
                          : stageScore >= 3.0 
                            ? 'bg-blue-900/50 text-blue-300'
                            : 'bg-amber-900/50 text-amber-300'
                      }`}>
                        {stageScore.toFixed(1)}/5
                      </span>
                    )}
                  </div>
                  
                  <p className="text-xs text-gray-500 mt-1">
                    {stage.description}
                  </p>
                  
                  {/* Progress indicator */}
                  {isActive && (
                    <div className="mt-2">
                      <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-blue-500"
                          initial={{ width: 0 }}
                          animate={{ width: stageScore ? `${(stageScore / 5) * 100}%` : '25%' }}
                          transition={{ duration: 0.8 }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Funding Pyramid Visualization */}
      {showFundingPyramid && (
        <motion.div 
          className="mt-8 bg-gray-800/50 p-4 rounded-lg border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-center text-teal-300">Dutch Funding Progression</h3>
            <button 
              onClick={() => setShowPyramidDetails(!showPyramidDetails)}
              className="text-xs text-teal-400 hover:text-teal-300 flex items-center"
            >
              {showPyramidDetails ? (
                <>
                  Hide Details
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </>
              ) : (
                <>
                  Show Details
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </>
              )}
            </button>
          </div>
          
          <FundingCardPyramid 
            opportunity={{
              id: 'funding-journey',
              title: 'Dutch Funding Progression',
              fundProvider: 'Multiple Sources',
              sector: 'All Sectors',
              amountDescription: '€10K → €10M+',
              location: 'Netherlands',
              description: showPyramidDetails 
                ? 'The Dutch funding ecosystem offers a structured progression path for startups at different stages. Starting with grants and pre-seed funding for ideation (€10K-€50K), moving to seed capital for validated ideas (€50K-€250K), growth capital for scaling businesses (€250K-€2M), and finally expansion funding for established companies (€2M-€10M+).'
                : 'Your journey from early grants to major investment rounds',
              relevantLinks: [],
              displayType: 'pyramid'
            }} 
          />
          
          {showPyramidDetails && (
            <div className="mt-4 grid grid-cols-1 gap-2 text-xs text-gray-400">
              <div className="border-t border-gray-700 pt-2">
                <span className="text-teal-400 font-medium">Ideation (€10K-€50K):</span> Grants, innovation vouchers, angel investments, incubator programs
              </div>
              <div className="border-t border-gray-700 pt-2">
                <span className="text-teal-400 font-medium">Validation (€50K-€250K):</span> Angels, accelerators, early-stage VCs, innovation loans
              </div>
              <div className="border-t border-gray-700 pt-2">
                <span className="text-teal-400 font-medium">Seed (€250K-€1M):</span> Seed VCs, growth programs, crowdfunding, impact investors
              </div>
              <div className="border-t border-gray-700 pt-2">
                <span className="text-teal-400 font-medium">Growth (€1M-€5M):</span> Series A VCs, strategic investors, scale-up programs, bank loans
              </div>
              <div className="border-t border-gray-700 pt-2">
                <span className="text-teal-400 font-medium">Expansion (€5M+):</span> Later-stage VCs, private equity, strategic partnerships, international funds
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default JourneyProgress; 