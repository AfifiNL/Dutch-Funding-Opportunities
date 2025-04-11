'use client'; // Add client directive for Framer Motion usage

import React from 'react';
import { motion } from 'framer-motion';
import { IFundingOpportunity } from '../types';
import clsx from 'clsx';

interface Props {
  opportunity: IFundingOpportunity;
  className?: string;
}

const FundingCardStats: React.FC<Props> = ({ opportunity, className }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } }, // Stagger children animation
  };

  const statVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  // Ensure details is an array for this card type
  const detailsArray = Array.isArray(opportunity.details) ? opportunity.details : [];

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ scale: 1.03, boxShadow: '0px 10px 20px rgba(0, 255, 255, 0.1)' }}
      className={clsx(
        'bg-gray-800/60 backdrop-blur-sm p-6 rounded-lg border border-gray-700 shadow-lg',
        className
      )}
      data-funding-id={opportunity.id}
    >
      <h3 className="text-xl font-semibold text-teal-300 mb-6 text-center">{opportunity.title}</h3>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6 text-center">
        {detailsArray.map((stat, index) => (
          <motion.div key={index} variants={statVariants}>
            <p className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</p>
            <p className="text-sm text-gray-400">{stat.key}</p>
          </motion.div>
        ))}
      </div>

      {/* Text Section Below Stats */}
      <p className="text-gray-300 mb-4 text-sm leading-relaxed">{opportunity.description}</p>

      <div className="text-sm space-y-2 mb-4">
         <div>
           <span className="text-gray-400 font-medium mr-2">Fund Provider:</span>
           <span className="text-gray-200">{opportunity.fundProvider}</span>
         </div>
         <div>
           <span className="text-gray-400 font-medium mr-2">Sector:</span>
           <span className="text-gray-200">{opportunity.sector}</span>
         </div>
          <div>
           <span className="text-gray-400 font-medium mr-2">Amount:</span>
           <span className="text-gray-200">{opportunity.amountDescription}</span>
         </div>
         <div>
           <span className="text-gray-400 font-medium mr-2">Location:</span>
           <span className="text-gray-200">{opportunity.location}</span>
         </div>
      </div>

      <div>
        <p className="text-gray-400 text-xs mb-1">Relevant Links:</p>
        {opportunity.relevantLinks.map((link, index) => (
          <a
            key={index}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-400 hover:text-teal-300 hover:underline text-xs break-all block"
          >
            {link}
          </a>
        ))}
      </div>
    </motion.div>
  );
};

export default FundingCardStats; 