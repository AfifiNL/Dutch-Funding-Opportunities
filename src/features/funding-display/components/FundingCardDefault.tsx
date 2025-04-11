'use client'; // Add client directive for Framer Motion usage

import React from 'react';
import { motion } from 'framer-motion';
import { IFundingOpportunity } from '../types';
import clsx from 'clsx';

interface Props {
  opportunity: IFundingOpportunity;
  className?: string;
}

// SVG Icons for different sections
const Icons = {
  provider: (
    <svg className="w-5 h-5 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  sector: (
    <svg className="w-5 h-5 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
    </svg>
  ),
  amount: (
    <svg className="w-5 h-5 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  location: (
    <svg className="w-5 h-5 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  link: (
    <svg className="w-4 h-4 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
  )
};

const FundingCardDefault: React.FC<Props> = ({ opportunity, className }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ scale: 1.03, y: -5 }}
      className={clsx('funding-card', className)}
    >
      {/* Card Header */}
      <div className="relative mb-5">
        <h3 className="text-xl font-semibold text-teal-300 mb-1 pr-12">{opportunity.title}</h3>
        <div className="absolute top-0 right-0 w-10 h-10 rounded-full bg-gray-700/50 flex items-center justify-center">
          <span className="text-teal-400 text-xl font-bold">€</span>
        </div>
        <div className="w-16 h-1 bg-gradient-to-r from-teal-500 to-teal-300"></div>
      </div>

      {/* Card Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="flex items-start space-x-2">
          <div className="mt-0.5">{Icons.provider}</div>
          <div>
            <p className="text-gray-400 font-medium text-xs uppercase tracking-wider">Fund Provider</p>
            <p className="text-gray-200">{opportunity.fundProvider}</p>
          </div>
        </div>
        <div className="flex items-start space-x-2">
          <div className="mt-0.5">{Icons.sector}</div>
          <div>
            <p className="text-gray-400 font-medium text-xs uppercase tracking-wider">Sector</p>
            <p className="text-gray-200">{opportunity.sector}</p>
          </div>
        </div>
        <div className="flex items-start space-x-2">
          <div className="mt-0.5">{Icons.amount}</div>
          <div>
            <p className="text-gray-400 font-medium text-xs uppercase tracking-wider">Amount of Fund</p>
            <p className="text-gray-200 font-medium">{opportunity.amountDescription}</p>
          </div>
        </div>
        <div className="flex items-start space-x-2">
          <div className="mt-0.5">{Icons.location}</div>
          <div>
            <p className="text-gray-400 font-medium text-xs uppercase tracking-wider">Location</p>
            <p className="text-gray-200">{opportunity.location}</p>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="p-3 bg-gray-800/50 rounded border border-gray-700/50 mb-4">
        <p className="text-gray-300 text-sm leading-relaxed">{opportunity.description}</p>
      </div>

      {/* Links Section */}
      <div className="pt-2 border-t border-gray-700/50">
        <p className="text-gray-400 text-xs uppercase tracking-wider mb-2 flex items-center">
          <span className="mr-1">{Icons.link}</span> Relevant Links:
        </p>
        <div className="space-y-1">
          {opportunity.relevantLinks.map((link, index) => (
            <a
              key={index}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-400 hover:text-teal-300 hover:underline text-sm break-all block transition-colors duration-200 flex items-center"
            >
              <span className="w-1 h-1 bg-teal-500 rounded-full mr-2"></span>
              {link}
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default FundingCardDefault; 