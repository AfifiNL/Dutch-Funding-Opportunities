import { API_CONFIG } from './config';
import { fetchInvestors, fetchInvestorsByStage, fetchInvestorById, fetchInvestorsByType, fetchLinkedOpportunitiesForInvestor } from './supabase/investors';

// Define a type for investor
export interface Investor {
  id: string;
  name: string;
  type: string;
  stages: number[];
  description: string;
  logoUrl?: string;
  website?: string;
  focusSectors?: string[];
  investmentRange?: string;
  location?: string;
  [key: string]: any; // For any additional fields
}

// Mock data for testing
const mockInvestors: Investor[] = [
  {
    id: 'inv-001',
    name: 'Dutch Ventures Capital',
    type: 'Venture Capital',
    stages: [0, 1, 2],
    description: 'Early-stage VC firm focused on Dutch tech startups with international potential.',
    logoUrl: 'https://placehold.co/100x100?text=DVC',
    website: 'https://example.com/dvc',
    focusSectors: ['Software', 'FinTech', 'HealthTech'],
    investmentRange: '€300K - €2M',
    location: 'Amsterdam'
  },
  {
    id: 'inv-002',
    name: 'Innovation Angels NL',
    type: 'Angel Investor',
    stages: [0, 1],
    description: 'Network of angel investors supporting pre-seed and seed stage startups.',
    logoUrl: 'https://placehold.co/100x100?text=IANL',
    website: 'https://example.com/ianl',
    focusSectors: ['E-commerce', 'MedTech', 'Consumer Apps'],
    investmentRange: '€50K - €500K',
    location: 'Utrecht'
  },
  {
    id: 'inv-003',
    name: 'Growth Partners BV',
    type: 'Venture Capital',
    stages: [2, 3, 4],
    description: 'Focused on Series A and B rounds for scaling Dutch technology companies.',
    logoUrl: 'https://placehold.co/100x100?text=GP',
    website: 'https://example.com/gp',
    focusSectors: ['SaaS', 'Clean Energy', 'Enterprise Solutions'],
    investmentRange: '€1M - €10M',
    location: 'Rotterdam'
  },
  {
    id: 'inv-004',
    name: 'Startup Accelerator NL',
    type: 'Accelerator',
    stages: [0, 1],
    description: 'Offering seed funding, mentorship, and a 3-month acceleration program.',
    logoUrl: 'https://placehold.co/100x100?text=SANL',
    website: 'https://example.com/sanl',
    focusSectors: ['Digital', 'Impact', 'AgTech'],
    investmentRange: '€50K - €150K',
    location: 'Eindhoven'
  }
];

export async function getInvestors() {
  try {
    // Use mock data if configured
    if (API_CONFIG.USE_MOCK_DATA) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, API_CONFIG.MOCK_DATA_DELAY));
      
      return mockInvestors;
    }
    
    return fetchInvestors();
  } catch (error) {
    console.error("Error fetching investors:", error);
    return [];
  }
}

export async function getInvestorsByStage(stage: number) {
  try {
    // Use mock data if configured
    if (API_CONFIG.USE_MOCK_DATA) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, API_CONFIG.MOCK_DATA_DELAY));
      
      return mockInvestors.filter(investor => investor.stages.includes(stage));
    }
    
    return fetchInvestorsByStage(stage);
  } catch (error) {
    console.error(`Error fetching investors for stage ${stage}:`, error);
    return [];
  }
}

export async function getInvestorById(id: string) {
  try {
    // Use mock data if configured
    if (API_CONFIG.USE_MOCK_DATA) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, API_CONFIG.MOCK_DATA_DELAY));
      
      const investor = mockInvestors.find(inv => inv.id === id);
      if (!investor) {
        throw new Error(`Investor with ID ${id} not found`);
      }
      
      return investor;
    }
    
    return fetchInvestorById(id);
  } catch (error) {
    console.error(`Error fetching investor ${id}:`, error);
    throw error;
  }
}

export async function getInvestorsByType(type: string): Promise<Investor[]> {
  if (API_CONFIG.USE_MOCK_DATA) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, API_CONFIG.MOCK_DATA_DELAY));
    
    // Find investors by type in mock data
    const allInvestors = Object.values(mockInvestors).flat() as Investor[];
    return allInvestors.filter(investor => investor.type === type);
  }
  
  return fetchInvestorsByType(type);
}

export async function getLinkedOpportunitiesForInvestor(investorId: string): Promise<any[]> {
  if (API_CONFIG.USE_MOCK_DATA) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, API_CONFIG.MOCK_DATA_DELAY));
    
    // For mock data, we could return some placeholder linked opportunities
    // In a real implementation, we would have mock linked data
    return [];
  }
  
  return fetchLinkedOpportunitiesForInvestor(investorId);
} 