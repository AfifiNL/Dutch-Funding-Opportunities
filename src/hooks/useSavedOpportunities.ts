import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import { 
  fetchUserSavedOpportunities, 
  saveOpportunity as saveOpportunityApi, 
  unsaveOpportunity as unsaveOpportunityApi,
  updateSavedOpportunityNotes as updateNotesApi,
  isOpportunitySaved as checkOpportunitySaved,
  SavedOpportunity
} from '@/api/supabase/savedOpportunities';

interface UseSavedOpportunitiesResult {
  savedOpportunities: SavedOpportunity[];
  loading: boolean;
  error: Error | null;
  saveOpportunity: (fundingId: string, notes?: string) => Promise<SavedOpportunity>;
  unsaveOpportunity: (fundingId: string) => Promise<boolean>;
  updateNotes: (savedId: string, notes: string) => Promise<SavedOpportunity>;
  refetch: () => Promise<void>;
  isSaved: (fundingId: string) => Promise<boolean>;
}

/**
 * Custom hook for managing saved funding opportunities
 * @returns Object with saved opportunities data and utility functions
 */
export function useSavedOpportunities(): UseSavedOpportunitiesResult {
  const { user, isLoading: authLoading } = useAuth();
  const [savedOpportunities, setSavedOpportunities] = useState<SavedOpportunity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Fetch all saved opportunities for the current user
  const fetchSavedOpportunities = useCallback(async () => {
    if (!user?.id) return;

    try {
      setLoading(true);
      setError(null);
      const data = await fetchUserSavedOpportunities(user.id);
      setSavedOpportunities(data);
    } catch (err) {
      console.error('Error fetching saved opportunities:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch saved opportunities'));
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  // Check if an opportunity is saved
  const isSaved = useCallback(async (fundingId: string): Promise<boolean> => {
    if (!user?.id) return false;
    
    try {
      // First check local state to avoid unnecessary API calls
      const existsLocally = savedOpportunities.some(item => item.fundingId === fundingId);
      if (existsLocally) return true;
      
      // If not found locally, check with the API
      return await checkOpportunitySaved(user.id, fundingId);
    } catch (err) {
      console.error(`Error checking if opportunity ${fundingId} is saved:`, err);
      return false;
    }
  }, [user?.id, savedOpportunities]);

  // Save a funding opportunity
  const saveOpportunity = useCallback(async (fundingId: string, notes?: string): Promise<SavedOpportunity> => {
    if (!user?.id) {
      throw new Error('You must be logged in to save opportunities');
    }

    try {
      const savedOpportunity = await saveOpportunityApi(user.id, fundingId, notes);
      // Update local state
      setSavedOpportunities(prev => [savedOpportunity, ...prev]);
      return savedOpportunity;
    } catch (err) {
      console.error(`Error saving opportunity ${fundingId}:`, err);
      throw err;
    }
  }, [user?.id]);

  // Unsave a funding opportunity
  const unsaveOpportunity = useCallback(async (fundingId: string): Promise<boolean> => {
    if (!user?.id) {
      throw new Error('You must be logged in to unsave opportunities');
    }

    try {
      const success = await unsaveOpportunityApi(user.id, fundingId);
      if (success) {
        // Update local state by removing the unsaved opportunity
        setSavedOpportunities(prev => prev.filter(item => item.fundingId !== fundingId));
      }
      return success;
    } catch (err) {
      console.error(`Error unsaving opportunity ${fundingId}:`, err);
      throw err;
    }
  }, [user?.id]);

  // Update notes for a saved opportunity
  const updateNotes = useCallback(async (savedId: string, notes: string): Promise<SavedOpportunity> => {
    try {
      const updatedOpportunity = await updateNotesApi(savedId, notes);
      // Update local state
      setSavedOpportunities(prev => 
        prev.map(item => 
          item.id === savedId ? { ...item, notes, updatedAt: updatedOpportunity.updatedAt } : item
        )
      );
      return updatedOpportunity;
    } catch (err) {
      console.error(`Error updating notes for saved opportunity ${savedId}:`, err);
      throw err;
    }
  }, []);

  // Fetch saved opportunities when auth is loaded or user changes
  useEffect(() => {
    if (!authLoading && user?.id) {
      fetchSavedOpportunities();
    } else if (!authLoading && !user) {
      // Clear saved opportunities if user is not logged in
      setSavedOpportunities([]);
      setLoading(false);
    }
  }, [authLoading, user, fetchSavedOpportunities]);

  return {
    savedOpportunities,
    loading,
    error,
    saveOpportunity,
    unsaveOpportunity,
    updateNotes,
    refetch: fetchSavedOpportunities,
    isSaved
  };
} 