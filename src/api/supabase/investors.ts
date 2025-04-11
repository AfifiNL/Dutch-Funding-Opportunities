import { supabase, handleSupabaseError } from '@/utils/supabase';
import { Investor } from '../investors';

/**
 * Fetches all investors from Supabase
 * @returns Array of investors
 */
export async function fetchInvestors(): Promise<Investor[]> {
  try {
    // First get profiles with investor type
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('id, full_name, email, avatar_url, bio, company_name, linkedin_url, created_at')
      .eq('user_type', 'investor');

    if (profilesError) {
      handleSupabaseError(profilesError, 'fetching investor profiles');
    }

    if (!profiles || profiles.length === 0) {
      return [];
    }

    // Get detailed investor information
    const { data: investorProfiles, error: investorError } = await supabase
      .from('investor_profiles')
      .select('profile_id, investment_thesis, investment_stages, investment_sizes, preferred_industries, portfolio');

    if (investorError) {
      handleSupabaseError(investorError, 'fetching investor details');
    }

    // Combine the data
    return profiles.map(profile => {
      const investorProfile = investorProfiles?.find(inv => inv.profile_id === profile.id);
      
      // Map portfolio data if it exists
      const portfolioCompanies = investorProfile?.portfolio 
        ? investorProfile.portfolio.map((item: any) => item.company_name)
        : [];
        
      // Extract investment range from the sizes object
      let investmentRange = '';
      if (investorProfile?.investment_sizes) {
        const sizes = investorProfile.investment_sizes as any;
        if (sizes.min && sizes.max) {
          const currency = sizes.currency || '€';
          investmentRange = `${currency}${sizes.min} - ${currency}${sizes.max}`;
        }
      }
      
      // Convert investment stages from string array to number array
      const stages: number[] = investorProfile?.investment_stages 
        ? investorProfile.investment_stages.map((stage: any) => {
            if (typeof stage === 'number') return stage;
            // Try to parse as number if it's a string
            const parsed = parseInt(stage, 10);
            return isNaN(parsed) ? 0 : parsed; // Default to 0 if parsing fails
          })
        : [];
      
      return {
        id: profile.id,
        name: profile.full_name,
        type: 'Investor', // Can be refined based on additional data
        stages,
        description: profile.bio || '',
        logoUrl: profile.avatar_url || undefined,
        website: '', // Could be added to profile or investor_profile later
        focusSectors: investorProfile?.preferred_industries || [],
        investmentRange,
        location: '', // Could be added to profile later
        email: profile.email,
        investmentThesis: investorProfile?.investment_thesis || '',
        portfolioCompanies,
        linkedinUrl: profile.linkedin_url || '',
        companyName: profile.company_name || ''
      };
    });
  } catch (error) {
    console.error('Error in fetchInvestors:', error);
    throw error;
  }
}

/**
 * Fetches investors filtered by investment stage
 * @param stageId The investment stage ID to filter by
 * @returns Array of investors that invest in the specified stage
 */
export async function fetchInvestorsByStage(stageId: number): Promise<Investor[]> {
  try {
    // First get all investors
    const investors = await fetchInvestors();
    
    // Filter by the specified stage
    return investors.filter(investor => 
      investor.stages && investor.stages.includes(stageId)
    );
  } catch (error) {
    console.error(`Error in fetchInvestorsByStage for stage ${stageId}:`, error);
    throw error;
  }
}

/**
 * Fetches a single investor by ID
 * @param id The investor ID
 * @returns The investor object or null
 */
export async function fetchInvestorById(id: string): Promise<Investor | null> {
  try {
    // Get the profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id, full_name, email, avatar_url, bio, company_name, linkedin_url, created_at')
      .eq('id', id)
      .eq('user_type', 'investor')
      .single();

    if (profileError) {
      if (profileError.code === 'PGRST116') { // 'no rows returned' error code
        return null;
      }
      handleSupabaseError(profileError, `fetching investor profile with ID ${id}`);
    }

    if (!profile) {
      return null;
    }

    // Get the investor details
    const { data: investorProfile, error: investorError } = await supabase
      .from('investor_profiles')
      .select('profile_id, investment_thesis, investment_stages, investment_sizes, preferred_industries, portfolio')
      .eq('profile_id', id)
      .single();

    if (investorError && investorError.code !== 'PGRST116') {
      handleSupabaseError(investorError, `fetching investor details with ID ${id}`);
    }

    // Map portfolio data if it exists
    const portfolioCompanies = investorProfile?.portfolio 
      ? investorProfile.portfolio.map((item: any) => item.company_name)
      : [];
      
    // Extract investment range from the sizes object
    let investmentRange = '';
    if (investorProfile?.investment_sizes) {
      const sizes = investorProfile.investment_sizes as any;
      if (sizes.min && sizes.max) {
        const currency = sizes.currency || '€';
        investmentRange = `${currency}${sizes.min} - ${currency}${sizes.max}`;
      }
    }

    // Convert investment stages from string array to number array
    const stages: number[] = investorProfile?.investment_stages 
      ? investorProfile.investment_stages.map((stage: any) => {
          if (typeof stage === 'number') return stage;
          // Try to parse as number if it's a string
          const parsed = parseInt(stage, 10);
          return isNaN(parsed) ? 0 : parsed; // Default to 0 if parsing fails
        })
      : [];

    return {
      id: profile.id,
      name: profile.full_name,
      type: 'Investor', // Can be refined based on additional data
      stages,
      description: profile.bio || '',
      logoUrl: profile.avatar_url || undefined,
      website: '', // Could be added to profile or investor_profile later
      focusSectors: investorProfile?.preferred_industries || [],
      investmentRange,
      location: '', // Could be added to profile later
      email: profile.email,
      investmentThesis: investorProfile?.investment_thesis || '',
      portfolioCompanies,
      linkedinUrl: profile.linkedin_url || '',
      companyName: profile.company_name || ''
    };
  } catch (error) {
    console.error(`Error in fetchInvestorById for ID ${id}:`, error);
    throw error;
  }
}

/**
 * Fetches investors filtered by investor type
 * @param type The investor type to filter by
 * @returns Array of investors of the specified type
 */
export async function fetchInvestorsByType(type: string): Promise<Investor[]> {
  try {
    // First get all investors
    const investors = await fetchInvestors();
    
    // Filter by the specified type
    return investors.filter(investor => investor.type === type);
  } catch (error) {
    console.error(`Error in fetchInvestorsByType for type ${type}:`, error);
    throw error;
  }
}

/**
 * Fetches opportunities linked to a specific investor
 * @param investorId The investor ID
 * @returns Array of opportunity IDs linked to the investor
 */
export async function fetchLinkedOpportunitiesForInvestor(investorId: string): Promise<string[]> {
  try {
    // Get linked opportunities from investor_opportunity_links table
    const { data, error } = await supabase
      .from('investor_opportunity_links')
      .select('opportunity_id')
      .eq('investor_id', investorId);

    if (error) {
      handleSupabaseError(error, `fetching opportunities for investor ${investorId}`);
    }

    return data ? data.map(item => item.opportunity_id) : [];
  } catch (error) {
    console.error(`Error in fetchLinkedOpportunitiesForInvestor for investor ${investorId}:`, error);
    throw error;
  }
} 