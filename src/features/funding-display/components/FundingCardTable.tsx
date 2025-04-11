'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { IFundingOpportunity } from '../types';
import clsx from 'clsx';

interface Props {
  opportunity: IFundingOpportunity;
  className?: string;
}

// Type for the details items
type DetailItem = {
  key: string;
  value: string;
};

const FundingCardTable: React.FC<Props> = ({ opportunity, className }) => {
  if (!Array.isArray(opportunity.details)) {
    console.warn('FundingCardTable requires details to be an array', opportunity);
    return null; // Or render a default message
  }

  // Explicitly type and cast details after the check
  const detailsArray = opportunity.details as DetailItem[];

  // Assuming details array has groups of 5 items per entry (Provider, Sector, Amount, Equity, Location)
  const numEntries = detailsArray.length / 5;
  const entries: DetailItem[][] = [];
  
  for (let i = 0; i < numEntries; i++) {
    entries.push(detailsArray.slice(i * 5, (i + 1) * 5));
  }

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
       whileHover={{ scale: 1.02, boxShadow: '0px 8px 18px rgba(0, 255, 255, 0.08)' }}
      className={clsx(
        'bg-gray-800/60 backdrop-blur-sm p-6 rounded-lg border border-gray-700 shadow-lg',
        className
      )}
      data-funding-id={opportunity.id}
    >
      <h3 className="text-xl font-semibold text-teal-300 mb-4">{opportunity.title}</h3>

      <div className="overflow-x-auto mb-4">
        <table className="min-w-full text-sm">
          <thead className="text-left text-gray-400">
            <tr>
              {detailsArray.slice(0, 5).map((item, index) => (
                <th key={`header-${index}`} className="pb-2 font-medium px-2 first:pl-0 last:pr-0">{item.key}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {entries.map((entry, entryIndex) => (
              <tr key={`row-${entryIndex}`}>
                 {entry.map((item, itemIndex) => (
                    <td key={`cell-${entryIndex}-${itemIndex}`} className="py-2 text-gray-200 px-2 first:pl-0 last:pr-0">{item.value}</td>
                 ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

       <p className="text-gray-300 mb-4 text-sm leading-relaxed">{opportunity.description}</p>

      <div>
        <p className="text-gray-400 text-xs mb-1">Relevant Links:</p>
        {opportunity.relevantLinks.map((link, index) => (
          <a
            key={`link-${index}`}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-400 hover:text-teal-300 hover:underline text-xs break-all inline-block mr-4"
          >
            {link}
          </a>
        ))}
      </div>
    </motion.div>
  );
};

export default FundingCardTable; 