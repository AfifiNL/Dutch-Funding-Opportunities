'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSavedOpportunities } from '@/hooks';
import Link from 'next/link';

// Filter types
type FilterOption = 'all' | 'grants' | 'investments' | 'loans' | 'other';

const SavedOpportunitiesDashboard: React.FC = () => {
  const { savedOpportunities, loading, error, updateNotes, refetch } = useSavedOpportunities();
  const [activeFilter, setActiveFilter] = useState<FilterOption>('all');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState<string>('');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  // Filter opportunities based on active filter
  const filteredOpportunities = savedOpportunities.filter(item => {
    if (activeFilter === 'all') return true;
    
    const fundingType = item.opportunity?.displayType?.toLowerCase() || '';
    
    switch(activeFilter) {
      case 'grants':
        return fundingType.includes('grant');
      case 'investments':
        return fundingType.includes('invest') || fundingType.includes('equity');
      case 'loans':
        return fundingType.includes('loan') || fundingType.includes('debt');
      case 'other':
        return !fundingType.includes('grant') && 
               !fundingType.includes('invest') && 
               !fundingType.includes('equity') && 
               !fundingType.includes('loan') && 
               !fundingType.includes('debt');
      default:
        return true;
    }
  });

  // Start editing a note
  const handleEditNote = (id: string, currentNote: string | null | undefined) => {
    setEditingNoteId(id);
    setNoteText(currentNote || '');
  };

  // Save note changes
  const handleSaveNote = async (id: string) => {
    try {
      await updateNotes(id, noteText);
      setEditingNoteId(null);
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  // Calculate category distribution for analytics
  const calculateCategoryDistribution = () => {
    const categories: Record<string, number> = {};
    
    savedOpportunities.forEach(item => {
      const sector = item.opportunity?.sector || 'Uncategorized';
      categories[sector] = (categories[sector] || 0) + 1;
    });
    
    return Object.entries(categories)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5); // Top 5 categories
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-700 text-red-100 p-4 rounded-lg">
        <p>Error loading saved opportunities. Please try again later.</p>
        <button 
          onClick={() => refetch()}
          className="mt-2 px-4 py-2 bg-red-700 hover:bg-red-600 rounded-md text-white"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with filter controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Your Saved Opportunities
          </h2>
          <p className="text-gray-400 mt-1">
            {filteredOpportunities.length} {filteredOpportunities.length === 1 ? 'opportunity' : 'opportunities'} saved
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="bg-gray-800 rounded-lg p-1 flex">
            <button
              onClick={() => setView('grid')}
              className={`p-2 rounded ${view === 'grid' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-gray-300'}`}
              aria-label="Grid view"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setView('list')}
              className={`p-2 rounded ${view === 'list' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-gray-300'}`}
              aria-label="List view"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          <Link 
            href="/funding" 
            className="bg-teal-600 hover:bg-teal-500 text-white py-2 px-4 rounded-md flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 00-1 1v4H5a1 1 0 100 2h4v4a1 1 0 102 0v-4h4a1 1 0 100-2h-4V4a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Find More
          </Link>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex overflow-x-auto scrollbar-hide pb-2 mb-4">
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              activeFilter === 'all' 
                ? 'bg-teal-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            All Opportunities
          </button>
          <button
            onClick={() => setActiveFilter('grants')}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              activeFilter === 'grants' 
                ? 'bg-teal-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Grants
          </button>
          <button
            onClick={() => setActiveFilter('investments')}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              activeFilter === 'investments' 
                ? 'bg-teal-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Investments
          </button>
          <button
            onClick={() => setActiveFilter('loans')}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              activeFilter === 'loans' 
                ? 'bg-teal-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Loans
          </button>
          <button
            onClick={() => setActiveFilter('other')}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              activeFilter === 'other' 
                ? 'bg-teal-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Other
          </button>
        </div>
      </div>

      {/* Analytical summary if we have saved opportunities */}
      {savedOpportunities.length > 0 && (
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-5 mb-6">
          <h3 className="text-lg font-medium text-white mb-3">Your Funding Portfolio</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-2">By Category</h4>
              <div className="space-y-2">
                {calculateCategoryDistribution().map(([category, count]) => (
                  <div key={category} className="flex items-center">
                    <div className="w-full bg-gray-700 rounded-full h-2.5 mr-2">
                      <div 
                        className="bg-teal-600 h-2.5 rounded-full" 
                        style={{ width: `${(count / savedOpportunities.length) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between min-w-[120px]">
                      <span className="text-xs text-gray-400">{category}</span>
                      <span className="text-xs font-medium text-white">{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-2">Quick Actions</h4>
              <div className="grid grid-cols-2 gap-2">
                <Link 
                  href="/funding"
                  className="flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-gray-200 py-2 px-3 rounded-md text-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Discover More
                </Link>
                <Link 
                  href="/profile?tab=settings"
                  className="flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-gray-200 py-2 px-3 rounded-md text-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                  Preferences
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* No saved opportunities message */}
      {filteredOpportunities.length === 0 && (
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-10 text-center">
          <svg className="w-16 h-16 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
          
          {savedOpportunities.length === 0 ? (
            <>
              <h3 className="text-xl font-medium text-white mb-2">No saved opportunities yet</h3>
              <p className="text-gray-400 mb-6">Save opportunities to keep track of the funding options you're interested in.</p>
            </>
          ) : (
            <>
              <h3 className="text-xl font-medium text-white mb-2">No matching opportunities</h3>
              <p className="text-gray-400 mb-6">Try selecting a different filter to see your other saved opportunities.</p>
            </>
          )}
          
          <Link 
            href="/funding" 
            className="inline-block bg-teal-600 hover:bg-teal-500 text-white font-medium py-2 px-6 rounded-md"
          >
            Browse Funding Opportunities
          </Link>
        </div>
      )}

      {/* Opportunities display - Grid view */}
      {filteredOpportunities.length > 0 && view === 'grid' && (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredOpportunities.map((item) => (
            <motion.div 
              key={item.id} 
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg overflow-hidden hover:border-teal-500/50 transition duration-300"
              variants={itemVariants}
            >
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-teal-900/50 text-teal-400 border border-teal-800/50 mb-2">
                      {item.opportunity?.sector || 'Funding'}
                    </span>
                    <h3 className="text-lg font-medium text-white leading-tight">
                      {item.opportunity?.title}
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">{item.opportunity?.fundProvider}</p>
                  </div>
                  
                  <div className="flex-shrink-0 bg-gray-700 text-gray-300 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" stroke="none">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                  </div>
                </div>
                
                {item.opportunity?.amountDescription && (
                  <div className="mb-3 text-sm">
                    <span className="text-gray-400">Funding: </span>
                    <span className="text-white">{item.opportunity.amountDescription}</span>
                  </div>
                )}
                
                {/* Notes section */}
                <div className="border-t border-gray-700 pt-3 mt-3">
                  <p className="text-xs text-gray-400 mb-2">Your Notes</p>
                  
                  {editingNoteId === item.id ? (
                    <div className="space-y-2">
                      <textarea
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-md text-white text-sm p-2 focus:ring-teal-500 focus:border-teal-500"
                        rows={3}
                        placeholder="Add notes about this opportunity..."
                      />
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => setEditingNoteId(null)}
                          className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-gray-300 text-xs rounded"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleSaveNote(item.id)}
                          className="px-3 py-1 bg-teal-600 hover:bg-teal-500 text-white text-xs rounded"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="min-h-[40px]">
                      {item.notes ? (
                        <p className="text-sm text-gray-300">{item.notes}</p>
                      ) : (
                        <p className="text-sm text-gray-500 italic">No notes added yet.</p>
                      )}
                      <button
                        onClick={() => handleEditNote(item.id, item.notes)}
                        className="text-teal-400 hover:text-teal-300 text-xs flex items-center mt-2"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        {item.notes ? 'Edit notes' : 'Add notes'}
                      </button>
                    </div>
                  )}
                </div>
                
                <div className="mt-4 flex justify-between items-center">
                  <div className="text-xs text-gray-400">
                    Saved on {new Date(item.createdAt).toLocaleDateString()}
                  </div>
                  <Link 
                    href={`/funding/${item.fundingId}`}
                    className="text-teal-400 hover:text-teal-300 text-sm font-medium flex items-center"
                  >
                    Details
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Opportunities display - List view */}
      {filteredOpportunities.length > 0 && view === 'list' && (
        <motion.div 
          className="space-y-4" 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredOpportunities.map((item) => (
            <motion.div 
              key={item.id} 
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg overflow-hidden hover:border-teal-500/50 transition duration-300"
              variants={itemVariants}
            >
              <div className="p-5">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="mb-4 md:mb-0 md:mr-6">
                    <div className="flex items-center mb-1">
                      <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-teal-900/50 text-teal-400 border border-teal-800/50 mr-2">
                        {item.opportunity?.sector || 'Funding'}
                      </span>
                      <span className="text-xs text-gray-400">
                        Saved on {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-lg font-medium text-white">
                      {item.opportunity?.title}
                    </h3>
                    <p className="text-sm text-gray-400">{item.opportunity?.fundProvider}</p>
                    
                    {item.opportunity?.amountDescription && (
                      <div className="mt-1 text-sm">
                        <span className="text-gray-400">Funding: </span>
                        <span className="text-white">{item.opportunity.amountDescription}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Link 
                      href={`/funding/${item.fundingId}`}
                      className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded text-sm"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() => handleEditNote(item.id, item.notes)}
                      className="bg-teal-700 hover:bg-teal-600 text-white py-2 px-4 rounded text-sm flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      {item.notes ? 'Edit Notes' : 'Add Notes'}
                    </button>
                  </div>
                </div>
                
                {/* Notes section - Only shown if there are notes or if editing */}
                {(item.notes || editingNoteId === item.id) && (
                  <div className="border-t border-gray-700 mt-4 pt-3">
                    {editingNoteId === item.id ? (
                      <div className="space-y-2">
                        <textarea
                          value={noteText}
                          onChange={(e) => setNoteText(e.target.value)}
                          className="w-full bg-gray-700 border border-gray-600 rounded-md text-white text-sm p-2 focus:ring-teal-500 focus:border-teal-500"
                          rows={3}
                          placeholder="Add notes about this opportunity..."
                        />
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => setEditingNoteId(null)}
                            className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-gray-300 text-xs rounded"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleSaveNote(item.id)}
                            className="px-3 py-1 bg-teal-600 hover:bg-teal-500 text-white text-xs rounded"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="text-xs text-gray-400 mb-1">Your Notes</p>
                        <p className="text-sm text-gray-300">{item.notes}</p>
                      </>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default SavedOpportunitiesDashboard; 