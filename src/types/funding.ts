export interface FundingOpportunity {
  id: string;
  name: string;
  description: string;
  type: 'grant' | 'venture_capital' | 'angel' | 'loan' | 'subsidy' | 'other';
  organization: string;
  amount_min?: number;
  amount_max?: number;
  deadline?: string;
  eligibility_criteria?: string;
  application_process?: string;
  website?: string;
  logo_url?: string;
  industry_focus?: string[];
  geographic_focus?: string[];
  stage_focus?: string[];
  created_at: string;
  updated_at: string;
}

export interface FundingFilter {
  type?: string[];
  industry?: string[];
  stage?: string[];
  amount_range?: [number, number];
  location?: string[];
}