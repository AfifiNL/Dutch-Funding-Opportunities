'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { IFundingOpportunity } from '../types';
import clsx from 'clsx';

interface Props {
  opportunity: IFundingOpportunity;
  className?: string;
}

// Simple SVG pyramid for visual representation
const PyramidIcon: React.FC<{}> = () => (
  <svg viewBox="0 0 100 100" width="80" height="80" className="mx-auto mb-4 text-teal-400/50">
    <polygon points="50,10 90,90 10,90" fill="currentColor" />
    {/* You could add inner lines or icons here if desired */}
    <line x1="10" y1="90" x2="90" y2="90" stroke="#99f6e4" strokeWidth="2" />
    <line x1="30" y1="50" x2="70" y2="50" stroke="#99f6e4" strokeWidth="2" />
    <line x1="40" y1="30" x2="60" y2="30" stroke="#99f6e4" strokeWidth="2" />
  </svg>
);

const FundingCardPyramid: React.FC<Props> = ({ opportunity, className }) => {
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ y: -5, boxShadow: '0px 10px 20px rgba(0, 255, 255, 0.1)' }}
      className={clsx(
        'bg-gray-800/60 backdrop-blur-sm p-6 rounded-lg border border-gray-700 shadow-lg text-center',
        className
      )}
      data-funding-id={opportunity.id}
    >
      <h3 className="text-xl font-semibold text-teal-300 mb-4">{opportunity.title}</h3>

      <PyramidIcon />

      <div className="space-y-3 text-sm mb-4">
        <div>
          <p className="text-gray-400 font-medium">Fund Provider</p>
          <p className="text-gray-200 text-base">{opportunity.fundProvider}</p>
        </div>
        <div>
          <p className="text-gray-400 font-medium">Sector</p>
          <p className="text-gray-200">{opportunity.sector}</p>
        </div>
        <div>
          <p className="text-gray-400 font-medium">Amount of Fund</p>
          <p className="text-gray-200 font-semibold text-lg">{opportunity.amountDescription}</p>
        </div>
        <div>
          <p className="text-gray-400 font-medium">Location</p>
          <p className="text-gray-200">{opportunity.location}</p>
        </div>
      </div>

      <p className="text-gray-300 mb-4 text-sm leading-relaxed text-left">{opportunity.description}</p>

      <div className="text-left">
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

export default FundingCardPyramid; 