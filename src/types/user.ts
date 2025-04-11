export interface UserProfile {
  id: string;
  user_id: string;
  full_name?: string;
  company_name?: string;
  position?: string;
  industry?: string;
  company_stage?: string;
  funding_needed?: boolean;
  funding_amount_min?: number;
  funding_amount_max?: number;
  company_description?: string;
  website?: string;
  linkedin?: string;
  twitter?: string;
  avatar_url?: string;
  email?: string;
  profile_completion?: number;
  created_at: string;
  updated_at: string;
}