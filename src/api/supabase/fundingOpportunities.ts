import { supabase, handleSupabaseError } from '@/utils/supabase';
import { IFundingOpportunity } from '@/features/funding-display/types';
import { Database } from '@/types/supabase';

/**
 * Fetches all funding opportunities from Supabase
 * Combines data from the 'funding_opportunities' table
 * @returns Array of funding opportunities
 */
export async function fetchFundingOpportunities(): Promise<IFundingOpportunity[]> {
  try {
    // Fetch all funding opportunities
    const { data: fundingData, error: fundingError } = await supabase
      .from('funding_opportunities')
      .select('*');

    if (fundingError) {
      handleSupabaseError(fundingError, 'fetchFundingOpportunities');
    }

    // Map data to match IFundingOpportunity interface
    return (fundingData || []).map(opportunity => mapFundingOpportunityData(opportunity));
  } catch (error) {
    console.error('Error in fetchFundingOpportunities:', error);
    throw error;
  }
}

/**
 * Fetches funding opportunities filtered by funding type
 * @param type The type of funding to filter by
 * @returns Array of filtered funding opportunities
 */
export async function fetchFundingOpportunitiesByType(type: string): Promise<IFundingOpportunity[]> {
  try {
    const { data: fundingData, error: fundingError } = await supabase
      .from('funding_opportunities')
      .select('*')
      .eq('funding_type', type);

    if (fundingError) {
      handleSupabaseError(fundingError, 'fetchFundingOpportunitiesByType');
    }

    return (fundingData || []).map(opportunity => mapFundingOpportunityData(opportunity));
  } catch (error) {
    console.error(`Error in fetchFundingOpportunitiesByType for type ${type}:`, error);
    throw error;
  }
}

/**
 * Fetches a specific funding opportunity by ID
 * @param id The ID of the funding opportunity to fetch
 * @returns The funding opportunity details or null if not found
 */
export async function fetchFundingOpportunityById(id: string): Promise<IFundingOpportunity | null> {
  try {
    // Validate if id is in UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      console.error(`Invalid UUID format for ID: ${id}`);
      throw new Error(`Invalid UUID format: "${id}". Funding opportunity IDs must be valid UUIDs.`);
    }

    // First check if the ID exists in the database by counting records
    // This avoids the 406 Not Acceptable error when querying with non-existing UUIDs
    const { count, error: countError } = await supabase
      .from('funding_opportunities')
      .select('*', { count: 'exact', head: true })
      .eq('id', id);
    
    if (countError) {
      // If there's an error with the count query, handle it
      if (countError.code === '22P02') { // Invalid UUID syntax
        console.error(`Invalid UUID syntax for ID: ${id}`);
        throw new Error(`Invalid UUID syntax: "${id}". Please provide a valid UUID.`);
      }
      handleSupabaseError(countError, 'fetchFundingOpportunityById [count]');
    }
    
    // If no records found with this ID, return null immediately
    if (count === 0) {
      console.warn(`No funding opportunity found with ID: ${id}`);
      return null;
    }

    // Proceed with the full query since we know the ID exists
    const { data: opportunity, error } = await supabase
      .from('funding_opportunities')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // PGRST116 means "No rows returned" - it's not a true error, just no results
        return null;
      }
      
      // Handle UUID type errors more gracefully
      if (error.code === '22P02') {
        console.error(`Invalid UUID syntax for ID: ${id}`);
        throw new Error(`Invalid UUID syntax: "${id}". Please provide a valid UUID.`);
      }
      
      handleSupabaseError(error, 'fetchFundingOpportunityById');
    }

    if (!opportunity) {
      return null;
    }

    return mapFundingOpportunityData(opportunity);
  } catch (error) {
    console.error(`Error in fetchFundingOpportunityById for ID ${id}:`, error);
    throw error;
  }
}

/**
 * Fetches funding opportunities filtered by sector
 * @param sector The sector to filter by
 * @returns Array of filtered funding opportunities
 */
export async function fetchFundingOpportunitiesBySector(sector: string): Promise<IFundingOpportunity[]> {
  try {
    const { data: fundingData, error: fundingError } = await supabase
      .from('funding_opportunities')
      .select('*')
      .ilike('sector', `%${sector}%`);

    if (fundingError) {
      handleSupabaseError(fundingError, 'fetchFundingOpportunitiesBySector');
    }

    return (fundingData || []).map(opportunity => mapFundingOpportunityData(opportunity));
  } catch (error) {
    console.error(`Error in fetchFundingOpportunitiesBySector for sector ${sector}:`, error);
    throw error;
  }
}

/**
 * Fetches funding opportunities for early stage startups
 * @returns Array of early stage funding opportunities
 */
export async function fetchEarlyStageOpportunities(): Promise<IFundingOpportunity[]> {
  try {
    const { data: fundingData, error: fundingError } = await supabase
      .from('funding_opportunities')
      .select('*')
      .eq('is_early_stage', true);

    if (fundingError) {
      handleSupabaseError(fundingError, 'fetchEarlyStageOpportunities');
    }

    return (fundingData || []).map(opportunity => mapFundingOpportunityData(opportunity));
  } catch (error) {
    console.error('Error in fetchEarlyStageOpportunities:', error);
    throw error;
  }
}

/**
 * Fetches funding opportunities that focus on impact
 * @returns Array of impact-focused funding opportunities
 */
export async function fetchImpactOpportunities(): Promise<IFundingOpportunity[]> {
  try {
    const { data: fundingData, error: fundingError } = await supabase
      .from('funding_opportunities')
      .select('*')
      .eq('is_impact_focused', true);

    if (fundingError) {
      handleSupabaseError(fundingError, 'fetchImpactOpportunities');
    }

    return (fundingData || []).map(opportunity => mapFundingOpportunityData(opportunity));
  } catch (error) {
    console.error('Error in fetchImpactOpportunities:', error);
    throw error;
  }
}

/**
 * Maps raw database funding opportunity data to the IFundingOpportunity interface
 * @param data Raw funding opportunity data from the database
 * @returns Formatted funding opportunity object
 */
function mapFundingOpportunityData(data: Database['public']['Tables']['funding_opportunities']['Row']): IFundingOpportunity {
  // Parse details if stored as JSON string
  let mappedDetails: Array<{ key: string; value: string }> | Record<string, string> | undefined;
  
  // Handle details field properly
  if (data.details) {
    if (Array.isArray(data.details)) {
      // If it's already an array, ensure it has the correct structure
      mappedDetails = data.details.map(item => {
        if (typeof item === 'object' && item !== null && 'key' in item && 'value' in item) {
          return { 
            key: String(item.key), 
            value: String(item.value) 
          };
        }
        return { key: 'unknown', value: JSON.stringify(item) };
      });
    } else if (typeof data.details === 'object' && data.details !== null) {
      // If it's an object, convert to Record<string, string>
      mappedDetails = Object.entries(data.details).reduce((acc, [key, value]) => {
        acc[key] = String(value);
        return acc;
      }, {} as Record<string, string>);
    }
  }
  
  // Handle displayType - ensure it's one of the valid types or default to 'default'
  const validDisplayTypes = ['default', 'table', 'pyramid', 'stats', 'list'] as const;
  const displayType = data.display_type && 
    validDisplayTypes.includes(data.display_type as any) 
      ? (data.display_type as 'default' | 'table' | 'pyramid' | 'stats' | 'list') 
      : 'default';

  // Convert null values to undefined for optional properties
  return {
    id: data.id,
    title: data.title,
    fundProvider: data.fund_provider,
    sector: data.sector,
    amountDescription: data.amount_description,
    amountMin: data.amount_min || undefined,
    amountMax: data.amount_max || undefined,
    location: data.location,
    description: data.description,
    relevantLinks: Array.isArray(data.relevant_links) ? data.relevant_links : [],
    displayType: displayType,
    imageUrl: data.image_url || undefined,
    equity: data.equity || undefined,
    programSupport: data.program_support || false,
    funding_type: data.funding_type || undefined,
    is_early_stage: data.is_early_stage || false,
    is_impact_focused: data.is_impact_focused || false,
    details: mappedDetails
  };
}

/**
 * Fetches investors linked to a specific funding opportunity
 * @param opportunityId The ID of the funding opportunity
 * @returns Array of linked investors
 */
export async function fetchLinkedInvestorsForOpportunity(opportunityId: string): Promise<any[]> {
  try {
    // Fetch links between investors and opportunities
    const { data: links, error } = await supabase
      .from('investor_opportunity_links')
      .select(`
        *,
        investor_id (*)
      `)
      .eq('opportunity_id', opportunityId);

    if (error) {
      handleSupabaseError(error, 'fetchLinkedInvestorsForOpportunity');
    }

    // Extract and format investor data from links
    return (links || []).map(link => {
      if (!link.investor_id) return {};
      
      return {
        ...(link.investor_id as any),
        relationshipType: link.relationship_type,
        relevanceScore: link.relevance_score,
        notes: link.notes
      };
    });
  } catch (error) {
    console.error(`Error in fetchLinkedInvestorsForOpportunity for opportunityId ${opportunityId}:`, error);
    return [];
  }
} 