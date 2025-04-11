import { API_CONFIG } from './config';
import { mockFundingData } from '../data/fundingOpportunities';
import { 
  fetchFundingOpportunities as fetchSupabaseFundingOpportunities,
  fetchFundingOpportunityById as fetchSupabaseFundingOpportunityById, 
  fetchFundingOpportunitiesBySector,
  fetchEarlyStageOpportunities as fetchSupabaseEarlyStageOpportunities,
  fetchImpactOpportunities as fetchSupabaseImpactOpportunities,
  fetchLinkedInvestorsForOpportunity as fetchSupabaseLinkedInvestorsForOpportunity
} from './supabase/fundingOpportunities';
import { IFundingOpportunity } from '@/features/funding-display/types';
import { slugToUuid } from '@/utils/slugs';

// Define a type for funding opportunity
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

export async function getFundingOpportunities(): Promise<FundingOpportunity[]> {
  // Use Supabase if configured
  if (API_CONFIG.USE_SUPABASE) {
    return fetchSupabaseFundingOpportunities() as unknown as FundingOpportunity[];
  }
  
  // Use mock data as fallback
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, API_CONFIG.MOCK_DATA_DELAY));
  
  // Return all mock funding opportunities
  return mockFundingData as unknown as FundingOpportunity[];
}

export async function getFundingOpportunitiesByStage(stage: string): Promise<FundingOpportunity[]> {
  // Use Supabase if configured
  if (API_CONFIG.USE_SUPABASE) {
    // For Supabase, map stage to sector for now (can implement more specific function later)
    const stageLabel = `Stage ${stage}`;
    return fetchFundingOpportunitiesBySector(stageLabel) as unknown as FundingOpportunity[];
  }
  
  // Use mock data as fallback
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, API_CONFIG.MOCK_DATA_DELAY));
  
  // Filter mock data to match the stage
  const stageNumber = parseInt(stage);
  const stageKey = isNaN(stageNumber) ? stage : stageNumber;
  
  return (mockFundingData as unknown as FundingOpportunity[]).filter(
    opportunity => opportunity.stage === stageKey || opportunity.stage === stage
  );
}

export async function getFundingOpportunityById(id: string): Promise<FundingOpportunity | null> {
  // Use Supabase if configured
  if (API_CONFIG.USE_SUPABASE) {
    return fetchSupabaseFundingOpportunityById(id) as unknown as FundingOpportunity | null;
  }
  
  // Use mock data as fallback
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, API_CONFIG.MOCK_DATA_DELAY));
  
  // Find opportunity by ID in mock data
  const opportunity = (mockFundingData as unknown as FundingOpportunity[]).find(
    item => item.id === id
  );
  
  return opportunity || null;
}

export async function getEarlyStageOpportunities(): Promise<FundingOpportunity[]> {
  // Use Supabase if configured
  if (API_CONFIG.USE_SUPABASE) {
    return fetchSupabaseEarlyStageOpportunities() as unknown as FundingOpportunity[];
  }
  
  // Use mock data as fallback
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, API_CONFIG.MOCK_DATA_DELAY));
  
  // Filter mock data for early stage opportunities
  return (mockFundingData as unknown as FundingOpportunity[]).filter(
    opportunity => opportunity.isEarlyStage === true
  );
}

export async function getImpactOpportunities(): Promise<FundingOpportunity[]> {
  // Use Supabase if configured
  if (API_CONFIG.USE_SUPABASE) {
    return fetchSupabaseImpactOpportunities() as unknown as FundingOpportunity[];
  }
  
  // Use mock data as fallback
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, API_CONFIG.MOCK_DATA_DELAY));
  
  // Filter mock data for impact-focused opportunities
  return (mockFundingData as unknown as FundingOpportunity[]).filter(
    opportunity => opportunity.isImpactFocused === true
  );
}

export async function getLinkedInvestorsForOpportunity(opportunityId: string): Promise<any[]> {
  // Use Supabase if configured
  if (API_CONFIG.USE_SUPABASE) {
    return fetchSupabaseLinkedInvestorsForOpportunity(opportunityId);
  }
  
  // Use mock data as fallback
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, API_CONFIG.MOCK_DATA_DELAY));
  
  // For mock data, return empty array
  return [];
}

/**
 * Finds a funding opportunity by slug - uses the slug mapping utility to convert to UUID first
 * @param slug The friendly URL slug to search for
 * @returns The funding opportunity details or null if not found
 */
export async function getFundingOpportunityBySlug(slug: string): Promise<FundingOpportunity | null> {
  const uuid = slugToUuid(slug);
  
  // If the slug mapped to a UUID, use that to fetch by ID
  if (uuid !== slug) {
    return getFundingOpportunityById(uuid);
  }
  
  // For mock data, we can also search directly by slug ID
  if (!API_CONFIG.USE_SUPABASE) {
    // Use mock data to find by slug ID
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, API_CONFIG.MOCK_DATA_DELAY));
    
    // Find opportunity by slug ID in mock data
    const opportunity = (mockFundingData as unknown as FundingOpportunity[]).find(
      item => item.id === slug
    );
    
    return opportunity || null;
  }
  
  // If we're using Supabase and no UUID mapping was found, the slug is invalid
  return null;
} 