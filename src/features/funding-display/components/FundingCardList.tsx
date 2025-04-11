'use client'; // Add client directive for Framer Motion usage

import React from 'react';
import { motion } from 'framer-motion';
import { IFundingOpportunity } from '../types';
import clsx from 'clsx';

interface Props {
  opportunity: IFundingOpportunity;
  className?: string;
}

interface SubItemData {
  'Fund Provider': string;
  'Sector': string;
  'Amount of Fund': string;
  'Location': string;
  // Add other potential keys if needed
  [key: string]: string | string[]; // Allow other string keys, plus relevantLinks
  relevantLinks: string[];
}

const FundingCardList: React.FC<Props> = ({ opportunity, className }) => {
  // Check if details is an array, otherwise log warning and return null or default
  if (!Array.isArray(opportunity.details)) {
    console.warn('FundingCardList requires details to be an array of key-value pairs.', opportunity);
    return null;
  }

  // Group details into sub-items (assuming structure from mock data)
  // Each sub-item should have Fund Provider, Sector, Amount, Location, Links
  const subItems: SubItemData[] = [];
  const itemsPerGroup = 5; // Adjust if data structure changes
  const detailsArray = opportunity.details as Array<{ key: string; value: string }>;

  for (let i = 0; i < detailsArray.length; i += itemsPerGroup) {
    const group = detailsArray.slice(i, i + itemsPerGroup);
    const itemData: Partial<SubItemData> = {}; // Use Partial initially
    let links: string[] = [];
    group.forEach(pair => {
      if (pair.key === 'Relevant Links') {
        links = pair.value.includes(',') ? pair.value.split(',').map(s => s.trim()) : [pair.value.trim()];
      } else {
        // Safely assign known keys
        (itemData as any)[pair.key] = pair.value;
      }
    });
    // Assert the final object matches SubItemData (assuming data is consistent)
    subItems.push({ ...itemData, relevantLinks: links } as SubItemData);
  }

  const cardVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={clsx(
        'bg-gray-800/60 backdrop-blur-sm p-6 rounded-lg border border-gray-700 shadow-lg',
        className
      )}
    >
      <h3 className="text-xl font-semibold text-teal-300 mb-6">{opportunity.title}</h3>

      <div className="space-y-6">
        {subItems.map((item, index) => (
          <motion.div
            key={`item-${index}`}
            variants={itemVariants}
            className="border-b border-gray-700 pb-4 last:border-b-0 hover:bg-gray-50 transition-colors"
            data-funding-id={item.id}
          >
            <h4 className="font-semibold text-teal-400 mb-2">{item['Fund Provider']}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-sm">
              <div>
                <span className="text-gray-400 mr-2">Sector:</span>
                <span className="text-gray-200">{item['Sector']}</span>
              </div>
              <div>
                <span className="text-gray-400 mr-2">Amount:</span>
                <span className="text-gray-200">{item['Amount of Fund']}</span>
              </div>
               <div>
                <span className="text-gray-400 mr-2">Location:</span>
                <span className="text-gray-200">{item['Location']}</span>
              </div>
              <div className="sm:col-span-2 mt-1">
                 <p className="text-gray-400 text-xs mb-1">Links:</p>
                 {item.relevantLinks.map((link: string, linkIndex: number) => (
                  <a
                    key={`link-${index}-${linkIndex}`}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-400 hover:text-teal-300 hover:underline text-xs break-all mr-3 inline-block"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Optional: Add top-level description if needed */}
      {/* <p className="text-gray-300 mt-6 text-sm leading-relaxed">{opportunity.description}</p> */}

    </motion.div>
  );
};

export default FundingCardList; 