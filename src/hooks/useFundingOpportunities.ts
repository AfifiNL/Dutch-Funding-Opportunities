import { useState, useEffect } from 'react';
import { 
  getFundingOpportunities, 
  getFundingOpportunitiesByStage, 
  getEarlyStageOpportunities,
  getImpactOpportunities
} from '@/api/fundingOpportunities';

interface FundingOpportunity {
  id: string;
  name?: string;
  title?: string;
  description: string;
  stage?: string | number;
  fundingAmount?: string;
  amountDescription?: string;
  deadline?: string;
  requirements?: string[];
  applicationUrl?: string;
  isEarlyStage?: boolean;
  isImpactFocused?: boolean;
  sector?: string | string[];
  fundingType?: string;
  successRate?: number;
  [key: string]: any;
}

interface FundingOptions {
  stage?: string | number;
  isEarlyStage?: boolean;
  isImpactFocused?: boolean;
}

interface UseFundingOpportunitiesResult {
  opportunities: FundingOpportunity[];
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

/**
 * Custom hook for fetching funding opportunities
 * @param options Optional filters (stage, isEarlyStage, isImpactFocused)
 * @returns Object containing opportunities, loading state, and error
 */
export function useFundingOpportunities(options: FundingOptions = {}): UseFundingOpportunitiesResult {
  const [opportunities, setOpportunities] = useState<FundingOpportunity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  
  const { stage, isEarlyStage, isImpactFocused } = options;
  
  const fetchOpportunities = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let data: FundingOpportunity[];
      
      if (stage !== undefined) {
        data = await getFundingOpportunitiesByStage(stage.toString());
      } else if (isEarlyStage) {
        data = await getEarlyStageOpportunities();
      } else if (isImpactFocused) {
        data = await getImpactOpportunities();
      } else {
        data = await getFundingOpportunities();
      }
      
      setOpportunities(data);
    } catch (err) {
      console.error("Error fetching funding opportunities:", err);
      setError(err instanceof Error ? err : new Error('Failed to fetch funding opportunities'));
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchOpportunities();
  }, [stage, isEarlyStage, isImpactFocused]);
  
  return { opportunities, loading, error, refetch: fetchOpportunities };
} 