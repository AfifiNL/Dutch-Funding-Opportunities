import { supabase, handleSupabaseError } from '@/utils/supabase';
import { Database } from '@/types/supabase';
import { PostgrestSingleResponse } from '@supabase/supabase-js';

export type Pitch = Database['public']['Tables']['pitches']['Row'];
export type PitchInsert = Database['public']['Tables']['pitches']['Insert'];
export type PitchUpdate = Database['public']['Tables']['pitches']['Update'];

// Define custom interfaces for the pitch_feedback table since it's not in the TypeScript definitions
export interface PitchFeedback {
  id: string;
  pitch_id: string;
  investor_id: string;
  overall_rating: number;
  problem_feedback: string | null;
  solution_feedback: string | null;
  market_feedback: string | null;
  business_model_feedback: string | null;
  competition_feedback: string | null;
  traction_feedback: string | null;
  team_feedback: string | null;
  funding_feedback: string | null;
  general_comments: string | null;
  investment_interest: string | null;
  created_at: string;
  updated_at: string;
  investor?: {
    id: string;
    full_name: string;
  }
}

export interface PitchFeedbackInsert extends Omit<PitchFeedback, 'id' | 'created_at' | 'updated_at' | 'investor'> {
  id?: string;
  created_at?: string;
  updated_at?: string;
}

export type PitchFeedbackUpdate = Partial<PitchFeedbackInsert>;

// Create a type-safe supabase client for the pitch_feedback table
// This is a workaround for not having the table in the type definitions
type SupabaseClient = typeof supabase;

/**
 * Fetches all pitches from a specific startup
 * @param startupId The startup ID to fetch pitches for
 * @returns Array of pitches for the specified startup
 */
export async function fetchPitchesByStartup(startupId: string): Promise<Pitch[]> {
  try {
    const { data, error } = await supabase
      .from('pitches')
      .select('*')
      .eq('startup_id', startupId)
      .order('created_at', { ascending: false });

    if (error) {
      handleSupabaseError(error, 'fetchPitchesByStartup');
      return [];
    }

    return data || [];
  } catch (error) {
    console.error(`Error in fetchPitchesByStartup for startupId ${startupId}:`, error);
    throw error;
  }
}

/**
 * Fetches a single pitch by ID
 * @param pitchId The pitch ID to fetch
 * @returns The pitch or null if not found
 */
export async function fetchPitchById(pitchId: string): Promise<Pitch | null> {
  try {
    const { data, error } = await supabase
      .from('pitches')
      .select('*')
      .eq('id', pitchId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') { // No rows returned
        return null;
      }
      handleSupabaseError(error, 'fetchPitchById');
      return null;
    }

    return data;
  } catch (error) {
    console.error(`Error in fetchPitchById for pitchId ${pitchId}:`, error);
    throw error;
  }
}

/**
 * Creates a new pitch
 * @param pitch The pitch data to insert
 * @returns The created pitch
 */
export async function createPitch(pitch: PitchInsert): Promise<Pitch | null> {
  try {
    const { data, error } = await supabase
      .from('pitches')
      .insert(pitch)
      .select()
      .single();

    if (error) {
      handleSupabaseError(error, 'createPitch');
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in createPitch:', error);
    throw error;
  }
}

/**
 * Updates an existing pitch
 * @param pitchId The ID of the pitch to update
 * @param updates The pitch data to update
 * @returns The updated pitch
 */
export async function updatePitch(pitchId: string, updates: PitchUpdate): Promise<Pitch | null> {
  try {
    const { data, error } = await supabase
      .from('pitches')
      .update(updates)
      .eq('id', pitchId)
      .select()
      .single();

    if (error) {
      handleSupabaseError(error, 'updatePitch');
      return null;
    }

    return data;
  } catch (error) {
    console.error(`Error in updatePitch for pitchId ${pitchId}:`, error);
    throw error;
  }
}

/**
 * Deletes a pitch
 * @param pitchId The ID of the pitch to delete
 * @returns Boolean indicating success
 */
export async function deletePitch(pitchId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('pitches')
      .delete()
      .eq('id', pitchId);

    if (error) {
      handleSupabaseError(error, 'deletePitch');
      return false;
    }

    return true;
  } catch (error) {
    console.error(`Error in deletePitch for pitchId ${pitchId}:`, error);
    throw error;
  }
}

/**
 * Fetches feedback for a specific pitch
 * @param pitchId The pitch ID to fetch feedback for
 * @returns Array of feedback for the specified pitch
 */
export async function fetchPitchFeedback(pitchId: string): Promise<PitchFeedback[]> {
  try {
    // First try casting to unknown, then to the desired type
    const result = await (supabase as any)
      .from('pitch_feedback')
      .select(`
        *,
        investor:investor_id(id, full_name)
      `)
      .eq('pitch_id', pitchId)
      .order('created_at', { ascending: false });
      
    const { data, error } = result as PostgrestSingleResponse<PitchFeedback[]>;

    if (error) {
      handleSupabaseError(error, 'fetchPitchFeedback');
      return [];
    }

    return data || [];
  } catch (error) {
    console.error(`Error in fetchPitchFeedback for pitchId ${pitchId}:`, error);
    throw error;
  }
}

/**
 * Creates new feedback for a pitch
 * @param feedback The feedback data to insert
 * @returns The created feedback
 */
export async function createPitchFeedback(feedback: PitchFeedbackInsert): Promise<PitchFeedback | null> {
  try {
    // First try casting to unknown, then to the desired type
    const result = await (supabase as any)
      .from('pitch_feedback')
      .insert(feedback)
      .select()
      .single();
      
    const { data, error } = result as PostgrestSingleResponse<PitchFeedback>;

    if (error) {
      handleSupabaseError(error, 'createPitchFeedback');
      return null;
    }

    return data || null;
  } catch (error) {
    console.error('Error in createPitchFeedback:', error);
    throw error;
  }
}

/**
 * Updates existing feedback
 * @param feedbackId The ID of the feedback to update
 * @param updates The feedback data to update
 * @returns The updated feedback
 */
export async function updatePitchFeedback(feedbackId: string, updates: PitchFeedbackUpdate): Promise<PitchFeedback | null> {
  try {
    // First try casting to unknown, then to the desired type
    const result = await (supabase as any)
      .from('pitch_feedback')
      .update(updates)
      .eq('id', feedbackId)
      .select()
      .single();
      
    const { data, error } = result as PostgrestSingleResponse<PitchFeedback>;

    if (error) {
      handleSupabaseError(error, 'updatePitchFeedback');
      return null;
    }

    return data || null;
  } catch (error) {
    console.error(`Error in updatePitchFeedback for feedbackId ${feedbackId}:`, error);
    throw error;
  }
}

/**
 * Fetches all pitches with pagination
 * @param limit Number of pitches to fetch
 * @param offset Offset for pagination
 * @returns Array of pitches
 */
export async function fetchPitches(limit = 10, offset = 0): Promise<Pitch[]> {
  try {
    const { data, error } = await supabase
      .from('pitches')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      handleSupabaseError(error, 'fetchPitches');
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in fetchPitches:', error);
    throw error;
  }
}

/**
 * Fetches all active pitches
 * @returns Array of active pitches
 */
export async function fetchActivePitches(): Promise<Pitch[]> {
  try {
    const { data, error } = await supabase
      .from('pitches')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      handleSupabaseError(error, 'fetchActivePitches');
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in fetchActivePitches:', error);
    throw error;
  }
} 