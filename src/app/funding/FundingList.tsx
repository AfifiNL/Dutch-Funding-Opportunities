import React from 'react';
import { FundingOpportunity, FundingFilter } from '@/types/funding';
import FundingCard from './FundingCard';
import LoadingSpinner from '@/components/LoadingSpinner';

interface FundingListProps {
  opportunities: FundingOpportunity[];
  loading: boolean;
  filters: Partial<FundingFilter>;
}

export default function FundingList({ opportunities, loading, filters }: FundingListProps) {
  const filteredOpportunities = React.useMemo(() => {
    if (!opportunities.length) return [];
    
    return opportunities.filter(opportunity => {
      // Apply type filter
      if (filters.type?.length && !filters.type.includes(opportunity.type)) {
        return false;
      }
      
      // Apply industry filter
      if (filters.industry?.length && 
          opportunity.industry_focus && 
          !opportunity.industry_focus.some(ind => filters.industry?.includes(ind))) {
        return false;
      }
      
      // Apply stage filter
      if (filters.stage?.length && 
          opportunity.stage_focus && 
          !opportunity.stage_focus.some(stage => filters.stage?.includes(stage))) {
        return false;
      }
      
      // Apply amount range filter
      if (filters.amount_range) {
        const [min, max] = filters.amount_range;
        if (opportunity.amount_min && opportunity.amount_min > max) {
          return false;
        }
        if (opportunity.amount_max && opportunity.amount_max < min) {
          return false;
        }
      }
      
      // Apply location filter
      if (filters.location?.length && 
          opportunity.geographic_focus && 
          !opportunity.geographic_focus.some(loc => filters.location?.includes(loc))) {
        return false;
      }
      
      return true;
    });
  }, [opportunities, filters]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  if (!filteredOpportunities.length) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-2">No opportunities found</h3>
        <p className="text-gray-600">Try adjusting your filters to see more results</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      {filteredOpportunities.map(opportunity => (
        <FundingCard key={opportunity.id} opportunity={opportunity} />
      ))}
    </div>
  );
}