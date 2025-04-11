'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useMediaQuery from '@/hooks/useMediaQuery';
import { cn } from '@/utils/cn';
import { Icons } from '@/components/IconSet';

export interface FilterCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  count?: number;
}

interface Props {
  categories: FilterCategory[];
  onFilterChange: (categoryId: string) => void;
  className?: string;
}

const FundingFilterBar: React.FC<Props> = ({ categories, onFilterChange, className }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    onFilterChange(categoryId);
    if (isMobile) {
      setShowMobileMenu(false);
    }
  };

  // Add "All" category at the beginning
  const allCategories: FilterCategory[] = [
    {
      id: 'all',
      name: 'All Funding',
      icon: <Icons.Tag className="w-5 h-5" />,
    },
    ...categories,
  ];

  // Desktop filter bar
  const desktopFilterBar = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="p-2 bg-gray-800/70 backdrop-blur-sm rounded-lg border border-gray-700 shadow-lg overflow-x-auto"
    >
      <div className="flex flex-wrap gap-2 min-w-max md:flex-nowrap">
        {allCategories.map((category) => (
          <motion.button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={cn(
              'px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center space-x-2 whitespace-nowrap',
              activeCategory === category.id
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                : 'text-gray-400 hover:text-gray-300 hover:bg-gray-700/50 border border-transparent'
            )}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            data-filter-category={category.id}
          >
            <span className="text-teal-400">{category.icon}</span>
            <span>{category.name}</span>
            {category.count !== undefined && (
              <span className={cn(
                'inline-flex items-center justify-center w-5 h-5 text-xs rounded-full', 
                activeCategory === category.id 
                  ? 'bg-teal-500/30 text-teal-300' 
                  : 'bg-gray-700/70 text-gray-400'
              )}>
                {category.count}
              </span>
            )}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );

  // Mobile filter menu button
  const mobileFilterButton = (
    <div className="flex justify-between items-center bg-gray-800/70 p-3 rounded-lg border border-gray-700 shadow-lg">
      <div className="flex items-center space-x-2">
        <span className="text-teal-400">
          <Icons.Tag className="w-5 h-5" />
        </span>
        <span className="text-teal-300 font-medium">
          {allCategories.find(cat => cat.id === activeCategory)?.name || 'All Funding'}
        </span>
      </div>
      <button 
        onClick={() => setShowMobileMenu(!showMobileMenu)}
        className="p-2 text-gray-400 hover:text-teal-300 transition-colors"
        aria-label={showMobileMenu ? "Close filter menu" : "Open filter menu"}
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={showMobileMenu ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
        </svg>
      </button>
    </div>
  );

  // Mobile dropdown menu
  const mobileDropdownMenu = (
    <AnimatePresence>
      {showMobileMenu && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-gray-800/90 mt-2 p-2 rounded-lg border border-gray-700 shadow-lg overflow-hidden"
        >
          <div className="flex flex-col space-y-2">
            {allCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={cn(
                  'px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center justify-between',
                  activeCategory === category.id
                    ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                    : 'text-gray-400 hover:text-gray-300 hover:bg-gray-700/50 border border-transparent'
                )}
                data-filter-category={category.id}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-teal-400">{category.icon}</span>
                  <span>{category.name}</span>
                </div>
                {category.count !== undefined && (
                  <span className={cn(
                    'inline-flex items-center justify-center w-5 h-5 text-xs rounded-full', 
                    activeCategory === category.id 
                      ? 'bg-teal-500/30 text-teal-300' 
                      : 'bg-gray-700/70 text-gray-400'
                  )}>
                    {category.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className={cn('mb-8', className)}>
      {/* Show different UI based on screen size */}
      {isMobile ? (
        <>
          {mobileFilterButton}
          {mobileDropdownMenu}
        </>
      ) : (
        desktopFilterBar
      )}
    </div>
  );
};

export default FundingFilterBar; 