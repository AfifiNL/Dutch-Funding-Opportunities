'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { IFundingOpportunity } from '../types';
import { Icons } from '@/components/IconSet';
import Button from '@/components/Button';

interface FundingCardImpactProps {
  opportunity: IFundingOpportunity;
  className?: string;
}

// Impact areas for categorization
const IMPACT_AREAS = [
  'climate', 'sustainability', 'social', 'education', 'healthcare', 
  'inclusion', 'diversity', 'renewable', 'circular', 'community',
  'food', 'water', 'equality', 'poverty', 'agriculture'
];

// Animation variants
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
    y: -8,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
    transition: { type: 'spring', stiffness: 400, damping: 17 }
  }
};

const tagVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({ 
    opacity: 1, 
    scale: 1,
    transition: { 
      delay: 0.1 + (i * 0.05),
      duration: 0.3
    }
  })
};

const FundingCardImpact: React.FC<FundingCardImpactProps> = ({ opportunity, className = '' }) => {
  // Extract impact areas from the description
  const impactAreas = IMPACT_AREAS
    .map(area => opportunity.description.toLowerCase().includes(area) ? area : null)
    .filter(area => area !== null)
    .slice(0, 3); // Limit to top 3 areas for clean UI
    
  // Calculate impact score (simple heuristic based on funding amount and impact areas)
  const fundingAmount = opportunity.amountMax || opportunity.amountMin || 50000;
  const baseScore = Math.min(Math.floor(fundingAmount / 20000), 5);
  const impactScore = Math.min(baseScore + impactAreas.length, 10);
  
  // Get SDG goals from sector or default to general sustainability
  const sdgGoalsText = opportunity.sector.includes('SDG') 
    ? opportunity.sector.split('SDG')[1].trim().substring(0, 15)
    : 'Sustainability';
    
  return (
    <motion.div
      className="bg-gradient-to-tr from-emerald-50 to-white rounded-xl overflow-hidden shadow-md p-5 border border-emerald-100 relative h-full flex flex-col"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      layout
      data-funding-id={opportunity.id}
    >
      {/* Impact badge */}
      <div className="absolute right-4 top-4 flex items-center">
        <div className="bg-emerald-500/20 backdrop-blur-sm text-emerald-300 text-xs font-medium px-2.5 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1.5">
          <Icons.Heart className="w-3.5 h-3.5" />
          <span>Impact Focused</span>
        </div>
      </div>
      
      {/* Decorative Impact Icon */}
      <div className="absolute -left-6 top-1/2 -translate-y-1/2 opacity-5">
        <svg width="120" height="120" viewBox="0 0 24 24" className="text-emerald-300">
          <path fill="currentColor" d="M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M15.6,8.34C16.67,8.34 17.53,9.2 17.53,10.27C17.53,11.34 16.67,12.2 15.6,12.2A1.93,1.93 0 0,1 13.67,10.27C13.66,9.2 14.53,8.34 15.6,8.34M9.6,6.76C10.9,6.76 11.96,7.82 11.96,9.12C11.96,10.42 10.9,11.5 9.6,11.5C8.3,11.5 7.24,10.42 7.24,9.12C7.24,7.81 8.29,6.76 9.6,6.76M9.6,15.89V19.64C7.2,18.89 5.3,17.04 4.46,14.68C5.5,13.56 8.13,13 9.6,13C10.13,13 10.8,13.07 11.5,13.21C9.86,14.08 9.6,15.23 9.6,15.89M12,20C11.72,20 11.46,19.98 11.2,19.94V15.89C11.2,14.47 14.18,13.76 15.6,13.76C16.67,13.76 18.5,14.15 19.44,14.91C18.27,17.88 15.38,20 12,20Z" />
        </svg>
      </div>
      
      <div className="p-6">
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-emerald-50 mb-1 pr-16">
            {opportunity.title}
          </h3>
          <p className="text-emerald-300/80 text-sm flex items-center gap-1.5">
            <Icons.Building className="w-4 h-4 opacity-70" />
            {opportunity.fundProvider}
          </p>
        </div>
        
        {/* Description */}
        <p className="text-gray-300 text-sm mb-5 line-clamp-3">
          {opportunity.description}
        </p>
        
        {/* Impact Areas */}
        <div className="mb-5">
          <div className="text-xs uppercase text-emerald-400/70 mb-2 font-medium tracking-wider">
            Impact Areas
          </div>
          <div className="flex flex-wrap gap-2">
            {impactAreas.length > 0 ? (
              impactAreas.map((area, index) => (
                <motion.span
                  key={area}
                  custom={index}
                  variants={tagVariants}
                  initial="hidden"
                  animate="visible"
                  className="bg-emerald-500/10 text-emerald-300 text-xs py-1 px-2.5 rounded-full border border-emerald-500/20 capitalize"
                >
                  {area}
                </motion.span>
              ))
            ) : (
              <span className="bg-emerald-500/10 text-emerald-300 text-xs py-1 px-2.5 rounded-full border border-emerald-500/20">
                Sustainable Development
              </span>
            )}
          </div>
        </div>
        
        {/* Funding Details */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <div className="text-xs uppercase text-emerald-400/70 mb-1 font-medium tracking-wider">
              Funding Amount
            </div>
            <div className="font-bold text-white text-lg">
              €{opportunity.amountDescription ? opportunity.amountDescription : (fundingAmount).toLocaleString()}
            </div>
          </div>
          
          <div>
            <div className="text-xs uppercase text-emerald-400/70 mb-1 font-medium tracking-wider">
              Impact Score
            </div>
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} className={`w-4 h-4 ${i < impactScore/2 ? 'text-emerald-400' : 'text-emerald-900'}`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
        </div>
        
        {/* SDG Alignment */}
        <div className="mb-6">
          <div className="text-xs uppercase text-emerald-400/70 mb-1 font-medium tracking-wider">
            SDG Alignment
          </div>
          <div className="bg-emerald-900/30 rounded-md p-2 text-xs text-emerald-200 flex items-center gap-2">
            <Icons.Globe className="w-4 h-4" />
            {sdgGoalsText}
          </div>
        </div>
        
        {/* CTA */}
        <div className="flex justify-center">
          <Button variant="primary" className="w-full border-emerald-500/30 hover:bg-emerald-500/20 text-emerald-200">
            Learn More
          </Button>
        </div>
      </div>
      
      {/* Animated gradient border at bottom */}
      <div className="h-1 w-full bg-gradient-to-r from-emerald-500/0 via-emerald-500/70 to-emerald-500/0 absolute bottom-0">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-400 to-emerald-500/0"
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

export default FundingCardImpact; 