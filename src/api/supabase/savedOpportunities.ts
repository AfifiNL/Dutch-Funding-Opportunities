import { supabase, handleSupabaseError } from '@/utils/supabase';
import { fetchFundingOpportunityById } from './fundingOpportunities';
import { IFundingOpportunity } from '@/features/funding-display/types';

/**
 * Interface for saved opportunity data
 */
export interface SavedOpportunity {
  id: string;
  userId: string;
  fundingId: string;
  notes?: string | null;
  createdAt: string; // Required and must be a string (non-nullable)
  updatedAt: string; // Required and must be a string (non-nullable)
  opportunity?: IFundingOpportunity;
}

/**
 * Fetches all saved opportunities for a specific user
 * @param userId The user ID
 * @returns Array of saved opportunities with full opportunity details
 */
export async function fetchUserSavedOpportunities(userId: string): Promise<SavedOpportunity[]> {
  try {
    const { data, error } = await supabase
      .from('saved_opportunities')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      handleSupabaseError(error, 'fetchUserSavedOpportunities');
    }

    if (!data || data.length === 0) {
      return [];
    }

    // Map database column names to camelCase fields
    const mappedResults = data.map(item => ({
      id: item.id,
      userId: item.user_id,
      fundingId: item.funding_id,
      notes: item.notes,
      createdAt: item.created_at || new Date().toISOString(),
      updatedAt: item.updated_at || new Date().toISOString()
    }));

    // Fetch complete funding opportunity details for each saved item
    const resultsWithDetails = await Promise.all(
      mappedResults.map(async (item) => {
        const opportunity = await fetchFundingOpportunityById(item.fundingId);
        return {
          ...item,
          opportunity: opportunity || undefined
        };
      })
    );

    return resultsWithDetails;
  } catch (error) {
    console.error(`Error fetching saved opportunities for user ${userId}:`, error);
    throw error;
  }
}

/**
 * Checks if a funding opportunity is saved by a user
 * @param userId The user ID
 * @param fundingId The funding opportunity ID
 * @returns Boolean indicating if the opportunity is saved
 */
export async function isOpportunitySaved(userId: string, fundingId: string): Promise<boolean> {
  try {
    const { data, error, count } = await supabase
      .from('saved_opportunities')
      .select('id', { count: 'exact' })
      .eq('user_id', userId)
      .eq('funding_id', fundingId);
    
    if (error) {
      handleSupabaseError(error, 'isOpportunitySaved');
    }
    
    return count !== null && count > 0;
  } catch (error) {
    console.error(`Error checking if opportunity ${fundingId} is saved by user ${userId}:`, error);
    throw error;
  }
}

/**
 * Saves a funding opportunity for a user
 * @param userId The user ID
 * @param fundingId The funding opportunity ID
 * @param notes Optional notes about the saved opportunity
 * @returns The saved opportunity if successful
 */
export async function saveOpportunity(userId: string, fundingId: string, notes?: string): Promise<SavedOpportunity> {
  try {
    // Check if already saved to avoid duplicates
    const isAlreadySaved = await isOpportunitySaved(userId, fundingId);
    
    if (isAlreadySaved) {
      throw new Error(`Opportunity ${fundingId} is already saved by user ${userId}`);
    }
    
    const now = new Date().toISOString();
    const newSavedOpportunity = {
      user_id: userId,
      funding_id: fundingId,
      notes: notes || null,
      created_at: now,
      updated_at: now
    };
    
    const { data, error } = await supabase
      .from('saved_opportunities')
      .insert(newSavedOpportunity)
      .select()
      .single();
    
    if (error) {
      handleSupabaseError(error, 'saveOpportunity');
    }
    
    if (!data) {
      throw new Error('Failed to save opportunity, no data returned');
    }
    
    // Map to camelCase
    return {
      id: data.id,
      userId: data.user_id,
      fundingId: data.funding_id,
      notes: data.notes,
      createdAt: data.created_at || now,
      updatedAt: data.updated_at || now
    };
  } catch (error) {
    console.error(`Error saving opportunity ${fundingId} for user ${userId}:`, error);
    throw error;
  }
}

/**
 * Updates the notes for a saved opportunity
 * @param id The saved opportunity ID
 * @param notes The new notes
 * @returns The updated saved opportunity
 */
export async function updateSavedOpportunityNotes(id: string, notes: string): Promise<SavedOpportunity> {
  try {
    const now = new Date().toISOString();
    
    const { data, error } = await supabase
      .from('saved_opportunities')
      .update({ 
        notes, 
        updated_at: now
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      handleSupabaseError(error, 'updateSavedOpportunityNotes');
    }
    
    if (!data) {
      throw new Error(`Failed to update notes for saved opportunity ${id}`);
    }
    
    // Map to camelCase
    return {
      id: data.id,
      userId: data.user_id,
      fundingId: data.funding_id,
      notes: data.notes,
      createdAt: data.created_at || now,
      updatedAt: data.updated_at || now
    };
  } catch (error) {
    console.error(`Error updating notes for saved opportunity ${id}:`, error);
    throw error;
  }
}

/**
 * Deletes a saved opportunity
 * @param id The saved opportunity ID
 * @returns True if deleted successfully
 */
export async function deleteSavedOpportunity(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('saved_opportunities')
      .delete()
      .eq('id', id);
    
    if (error) {
      handleSupabaseError(error, 'deleteSavedOpportunity');
    }
    
    return true;
  } catch (error) {
    console.error(`Error deleting saved opportunity ${id}:`, error);
    throw error;
  }
}

/**
 * Unsaves a funding opportunity for a user
 * @param userId The user ID
 * @param fundingId The funding opportunity ID
 * @returns True if unsaved successfully
 */
export async function unsaveOpportunity(userId: string, fundingId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('saved_opportunities')
      .delete()
      .eq('user_id', userId)
      .eq('funding_id', fundingId);
    
    if (error) {
      handleSupabaseError(error, 'unsaveOpportunity');
    }
    
    return true;
  } catch (error) {
    console.error(`Error unsaving opportunity ${fundingId} for user ${userId}:`, error);
    throw error;
  }
} 