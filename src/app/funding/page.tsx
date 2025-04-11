"use client";

import { useState, useEffect } from 'react';
import { useSupabase } from '@/hooks/useSupabase';
import { FundingOpportunity } from '@/types/funding';
import FundingList from './FundingList';
import FundingFilters from './FundingFilters';

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
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Funding Opportunities</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <FundingFilters onFilterChange={setFilters} />
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
  );
}