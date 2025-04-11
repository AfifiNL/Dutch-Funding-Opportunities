'use client';

import { motion } from 'framer-motion';
import { IFundingOpportunity } from '../types';
import { Icons } from '@/components/IconSet';
import SaveButton from './SaveButton';
import Link from 'next/link';

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5,
      ease: 'easeOut'
    }
  },
  hover: { 
    y: -5,
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
    transition: { 
      duration: 0.2,
      ease: 'easeOut'
    }
  }
};

interface FundingCardProps {
  opportunity: IFundingOpportunity;
  delay?: number;
}

const FundingCard = ({ opportunity, delay = 0 }: FundingCardProps) => {
  // Get funding details
  const fundingDetails = opportunity.details || {};
  const hasEquityInfo = 'equityRequired' in fundingDetails;
  
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 h-full"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      transition={{ delay }}
      data-funding-id={opportunity.id}
    >
      <div className="p-5 h-full flex flex-col">
        <div className="flex-shrink-0 flex items-start justify-between">
          <div>
            <p className="text-sm text-blue-600 font-medium">{opportunity.fundProvider}</p>
            <h3 className="mt-1 text-xl font-semibold text-gray-900">{opportunity.title}</h3>
          </div>
          <div className="flex items-center space-x-2">
            <SaveButton fundingId={opportunity.id} iconOnly />
            <div className="bg-blue-50 p-2 rounded-full">
              <Icons.Currency className="h-5 w-5 text-blue-500" />
            </div>
          </div>
        </div>
        
        <div className="flex-grow mt-3">
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              {opportunity.sector}
            </span>
            {opportunity.location && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {opportunity.location}
              </span>
            )}
          </div>
          
          <p className="text-gray-600 text-sm line-clamp-3">{opportunity.description}</p>
        </div>
        
        <div className="mt-4 flex-shrink-0">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm">
              <p className="text-gray-500">Available funding:</p>
              <p className="font-semibold text-gray-800">{opportunity.amountDescription}</p>
            </div>
            {hasEquityInfo && (
              <div className="text-sm text-right">
                <p className="text-gray-500">Equity required:</p>
                <p className="font-semibold text-gray-800">
                  {typeof fundingDetails.equityRequired === 'boolean' 
                    ? (fundingDetails.equityRequired ? 'Yes' : 'No') 
                    : fundingDetails.equityRequired}
                </p>
              </div>
            )}
          </div>
          
          <div className="flex gap-2">
            <Link 
              href={`/funding/${opportunity.id}`}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md text-sm transition-colors text-center"
            >
              Learn More
            </Link>
            <SaveButton 
              fundingId={opportunity.id} 
              className="flex-none bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FundingCard; 