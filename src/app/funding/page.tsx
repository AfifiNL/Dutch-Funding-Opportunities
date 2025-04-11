"use client";

import { useState, useEffect } from 'react';
import { useSupabase } from '@/hooks/useSupabase';
import { FundingOpportunity } from '@/types/funding';
import FundingList from './FundingList';
import FundingFilters from './FundingFilters';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function FundingPage() {
  const [opportunities, setOpportunities] = useState<FundingOpportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});
  const { supabase } = useSupabase();

  useEffect(() => {
    const fetchFundingOpportunities = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('funding_opportunities')
          .select('*');

        if (error) throw error;
        setOpportunities(data || []);
      } catch (error) {
        console.error('Error fetching funding opportunities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFundingOpportunities();
  }, [supabase]);

  return (
    <>
      <Header />
      <main className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen">
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10 text-center">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Funding Opportunities</h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Discover grants, investments, and other funding sources tailored for startups and innovators in the Netherlands
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-1">
                <div className="sticky top-24 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Refine Results</h2>
                  <FundingFilters onFilterChange={setFilters} />
                </div>
              </div>
              <div className="lg:col-span-3">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700 mb-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2 sm:mb-0">
                      {loading ? 'Loading opportunities...' : `${opportunities.length} Opportunities Available`}
                    </h3>
                    <div className="flex items-center">
                      <label htmlFor="sort-options" className="text-sm text-gray-500 dark:text-gray-400 mr-2">Sort by:</label>
                      <select 
                        id="sort-options"
                        aria-label="Sort funding opportunities"
                        className="block w-full sm:w-auto rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-teal-500 focus:border-teal-500 text-sm"
                        defaultValue="newest"
                      >
                        <option value="newest">Newest First</option>
                        <option value="deadline">Upcoming Deadline</option>
                        <option value="amount">Amount (High to Low)</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <FundingList 
                  opportunities={opportunities} 
                  loading={loading} 
                  filters={filters}
                />
                
                {/* Pagination placeholder */}
                {!loading && opportunities.length > 0 && (
                  <div className="mt-8 flex justify-center">
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <a
                        href="#"
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <span className="sr-only">Previous</span>
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </a>
                      <a
                        href="#"
                        aria-current="page"
                        className="relative inline-flex items-center px-4 py-2 border border-teal-500 bg-teal-50 dark:bg-teal-900/30 text-sm font-medium text-teal-600 dark:text-teal-400"
                      >
                        1
                      </a>
                      <a
                        href="#"
                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        2
                      </a>
                      <a
                        href="#"
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <span className="sr-only">Next</span>
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </a>
                    </nav>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}