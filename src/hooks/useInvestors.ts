import { useState, useEffect } from 'react';
import { getInvestors, getInvestorsByStage } from '@/api/investors';

interface Investor {
  id: string;
  name: string;
  type: string;
  description: string;
  logo?: string;
  website?: string;
  email?: string;
  location?: string;
  fundingRange?: string;
  stages: string[] | number[];
  investmentThesis?: string;
  portfolioCompanies?: string[];
  successStories?: string[];
  preferredSectors?: string[];
  [key: string]: any;
}

interface UseInvestorsResult {
  investors: Investor[];
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

/**
 * Custom hook for fetching investors
 * @param stage Optional stage filter
 * @returns Object containing investors, loading state, and error
 */
export function useInvestors(stage?: string | number): UseInvestorsResult {
  const [investors, setInvestors] = useState<Investor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  
  const fetchInvestors = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = stage !== undefined
        ? await getInvestorsByStage(typeof stage === 'string' ? parseInt(stage, 10) : stage)
        : await getInvestors();
        
      setInvestors(data);
    } catch (err) {
      console.error("Error fetching investors:", err);
      setError(err instanceof Error ? err : new Error('Failed to fetch investors'));
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchInvestors();
  }, [stage]);
  
  return { investors, loading, error, refetch: fetchInvestors };
} 