'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IFundingOpportunity } from '../types';
import { Icons } from '@/components/IconSet';
import Button from '@/components/Button';

interface FundingCardEarlyStageProps {
  opportunity: IFundingOpportunity;
  className?: string;
}

const FundingCardEarlyStage: React.FC<FundingCardEarlyStageProps> = ({ opportunity, className = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Extract key terms from description for badges
  const keyTerms = [
    { term: 'pre-seed', label: 'Pre-Seed' },
    { term: 'seed', label: 'Seed' },
    { term: 'mvp', label: 'MVP' },
    { term: 'prototype', label: 'Prototype' },
    { term: 'proof of concept', label: 'PoC' },
    { term: 'incubator', label: 'Incubator' },
    { term: 'accelerator', label: 'Accelerator' },
    { term: 'angel', label: 'Angel Investor' },
    { term: 'validation', label: 'Validation' },
  ];
  
  // Extract funding stage badges based on description and title
  const stageLabels = keyTerms
    .filter(({ term }) => 
      opportunity.description.toLowerCase().includes(term) || 
      opportunity.title.toLowerCase().includes(term))
    .map(({ label }) => label);
    
  // Card animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: 'spring',
        stiffness: 260,
        damping: 20,
        duration: 0.5 
      }
    },
    hover: { 
      y: -5,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
      transition: { type: 'spring', stiffness: 400, damping: 17 }
    }
  };
  
  // Progress bar animation
  const progressVariants = {
    hidden: { width: 0 },
    visible: { 
      width: '100%',
      transition: { 
        duration: 1.5,
        ease: "easeOut" 
      }
    }
  };
  
  // Create a simple startup progress indicator
  // This is just a visual element that shows different stages
  const startupStages = [
    { id: 'idea', label: 'Idea', icon: <Icons.Sparkles className="w-3.5 h-3.5" /> },
    { id: 'mvp', label: 'MVP', icon: <Icons.Lightning className="w-3.5 h-3.5" /> },
    { id: 'revenue', label: 'Revenue', icon: <Icons.Currency className="w-3.5 h-3.5" /> },
    { id: 'scale', label: 'Scale', icon: <Icons.Graph className="w-3.5 h-3.5" /> },
  ];
  
  // Determine which stages this funding opportunity is for
  const isForIdea = opportunity.description.toLowerCase().includes('idea') || opportunity.title.toLowerCase().includes('idea');
  const isForMVP = opportunity.description.toLowerCase().includes('mvp') || 
                  opportunity.description.toLowerCase().includes('prototype') || 
                  opportunity.title.toLowerCase().includes('mvp');
  const isForRevenue = opportunity.description.toLowerCase().includes('revenue') || 
                      opportunity.description.toLowerCase().includes('sales') || 
                      opportunity.title.toLowerCase().includes('revenue');
  const isForScale = opportunity.description.toLowerCase().includes('scale') || 
                    opportunity.description.toLowerCase().includes('growth') || 
                    opportunity.title.toLowerCase().includes('scale');
  
  return (
    <motion.div
      className="bg-gradient-to-r from-sky-50 to-white rounded-xl overflow-hidden shadow-md border border-sky-100 h-full flex flex-col"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      data-funding-id={opportunity.id}
    >
      {/* Early Stage badge */}
      <div className="absolute right-4 top-4 flex items-center">
        <div className="bg-blue-500/20 backdrop-blur-sm text-blue-300 text-xs font-medium px-2.5 py-1 rounded-full border border-blue-500/30 flex items-center gap-1.5">
          <Icons.Tag className="w-3.5 h-3.5" />
          <span>Early Stage</span>
        </div>
      </div>
      
      <div className="p-6">
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-blue-50 mb-1 pr-16">
            {opportunity.title}
          </h3>
          <p className="text-blue-300/80 text-sm flex items-center gap-1.5">
            <Icons.Building className="w-4 h-4 opacity-70" />
            {opportunity.fundProvider}
          </p>
        </div>
        
        {/* Stage Tags */}
        {stageLabels.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {stageLabels.map((label, index) => (
              <span
                key={index}
                className="bg-blue-900/40 text-blue-300 text-xs py-1 px-2.5 rounded-full border border-blue-700/30"
              >
                {label}
              </span>
            ))}
          </div>
        )}
        
        {/* Description - expandable */}
        <div className="mb-5">
          <motion.p 
            className={`text-gray-300 text-sm ${isExpanded ? '' : 'line-clamp-2'}`}
            initial={{ height: 'auto' }}
            animate={{ height: 'auto' }}
          >
            {opportunity.description}
          </motion.p>
          
          {/* Toggle expand/collapse */}
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-400 text-xs mt-1 flex items-center hover:text-blue-300 transition-colors"
          >
            {isExpanded ? (
              <>Show less <Icons.ChevronUp className="w-3 h-3 ml-1" /></>
            ) : (
              <>Show more <Icons.ChevronDown className="w-3 h-3 ml-1" /></>
            )}
          </button>
        </div>
        
        {/* Startup Stage Visual Indicator */}
        <div className="mb-6">
          <div className="text-xs uppercase text-blue-400/70 mb-2 font-medium tracking-wider">
            Suitable For Startup Stages
          </div>
          <div className="relative">
            {/* Progress Track */}
            <div className="h-1 bg-blue-900/50 rounded-full mb-3 relative overflow-hidden">
              <motion.div
                variants={progressVariants}
                initial="hidden"
                animate="visible"
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
              />
            </div>
            
            {/* Stage Markers */}
            <div className="grid grid-cols-4 gap-1">
              {startupStages.map((stage, index) => {
                const isActive = 
                  (stage.id === 'idea' && isForIdea) ||
                  (stage.id === 'mvp' && isForMVP) ||
                  (stage.id === 'revenue' && isForRevenue) ||
                  (stage.id === 'scale' && isForScale);
                
                return (
                  <div key={stage.id} className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-blue-400' : 'bg-blue-900'} mb-1`} />
                    <div className={`flex items-center justify-center text-xs ${isActive ? 'text-blue-300' : 'text-blue-700'}`}>
                      {stage.icon}
                      <span className="ml-1">{stage.label}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Funding Details */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <div className="text-xs uppercase text-blue-400/70 mb-1 font-medium tracking-wider">
              Funding Amount
            </div>
            <div className="font-bold text-white text-base">
              {opportunity.amountDescription}
            </div>
          </div>
          
          <div>
            <div className="text-xs uppercase text-blue-400/70 mb-1 font-medium tracking-wider">
              Equity Required
            </div>
            <div className="font-medium text-white text-base">
              {opportunity.equity || 'Not specified'}
            </div>
          </div>
        </div>
        
        {/* Program Support */}
        {opportunity.programSupport && (
          <div className="mb-6 bg-blue-900/30 rounded-md p-3 text-sm text-blue-200 flex items-center gap-2">
            <Icons.Lightning className="w-4 h-4 text-blue-400" />
            <span>Includes program support & mentorship</span>
          </div>
        )}
        
        {/* CTA */}
        <div className="flex justify-center">
          <Button variant="primary" className="w-full bg-blue-600 hover:bg-blue-500">
            Apply Now
          </Button>
        </div>
        
        {/* Location */}
        <div className="mt-4 text-center text-xs text-blue-400">
          <span className="flex items-center justify-center gap-1">
            <Icons.Location className="w-3 h-3" />
            {opportunity.location}
          </span>
        </div>
      </div>
      
      {/* Animated gradient border */}
      <div className="h-1 w-full bg-gradient-to-r from-blue-500/0 via-blue-500/70 to-blue-500/0 absolute bottom-0">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-indigo-400 to-blue-500/0"
          animate={{ 
            x: ['100%', '-100%'] 
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 3,
            ease: 'linear'
          }}
        />
      </div>
    </motion.div>
  );
};

export default FundingCardEarlyStage; 