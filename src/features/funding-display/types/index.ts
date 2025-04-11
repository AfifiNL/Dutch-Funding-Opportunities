// Define the core data structure for funding opportunities
export interface IFundingOpportunity {
  id: string; // Unique identifier (e.g., 'wbso-tax-credit')
  title: string;
  fundProvider: string;
  sector: string;
  amountDescription: string; // e.g., "Varies by project", "Up to €125,000", "€135k investment"
  amountMin?: number; // Optional numeric minimum
  amountMax?: number; // Optional numeric maximum
  location: string; // e.g., "EU/Netherlands", "Amsterdam", "Various cities"
  description: string; // Paragraph description
  relevantLinks: string[];
  displayType: 'default' | 'table' | 'pyramid' | 'stats' | 'list'; // To hint at layout
  imageUrl?: string; // Optional image for cards like Rubio or Accelerators
  equity?: string; // e.g. "for 6% equity"
  programSupport?: boolean; // For non-dilutive/program support
  funding_type?: string; // Type of funding (e.g. 'venture capital', 'grant', 'loan')
  is_early_stage?: boolean; // Whether it's for early-stage startups
  is_impact_focused?: boolean; // Whether it's focused on impact/sustainability
  // Use Array for ordered key-value pairs (like tables), Record for unordered
  details?: Array<{ key: string; value: string }> | Record<string, string>;
} 