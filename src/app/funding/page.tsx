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
      <main className="bg-gray-50 min-h-screen">
        <div className="container mx-auto py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Funding Opportunities</h1>
              <p className="mt-2 text-gray-600">Discover grants, investments, and other funding sources in the Netherlands</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-1">
                <div className="sticky top-24 bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Filters</h2>
                  <FundingFilters onFilterChange={setFilters} />
                </div>
              </div>
              <div className="lg:col-span-3">
                <FundingList 
                  opportunities={opportunities} 
                  loading={loading} 
                  filters={filters}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}