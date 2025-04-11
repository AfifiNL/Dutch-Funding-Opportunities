import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import {
  getUserConnections,
  getConnectionStatus,
  sendConnectionRequest,
  updateConnectionStatus,
  getPendingConnectionRequests,
  deleteConnection,
  ConnectionWithProfile
} from '@/api/supabase/connections';

export const useConnections = () => {
  const { user } = useAuth();
  const [connections, setConnections] = useState<ConnectionWithProfile[]>([]);
  const [pendingRequests, setPendingRequests] = useState<ConnectionWithProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all connections for the current user
  const fetchConnections = useCallback(async () => {
    if (!user?.id) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await getUserConnections(user.id);
      setConnections(data);
    } catch (err) {
      console.error('Error fetching connections:', err);
      setError('Failed to load connections');
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  // Fetch pending connection requests
  const fetchPendingRequests = useCallback(async () => {
    if (!user?.id) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await getPendingConnectionRequests(user.id);
      setPendingRequests(data);
    } catch (err) {
      console.error('Error fetching pending requests:', err);
      setError('Failed to load pending requests');
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  // Check connection status between current user and another user
  const checkConnectionStatus = useCallback(async (otherUserId: string) => {
    if (!user?.id) return 'none';
    
    try {
      return await getConnectionStatus(user.id, otherUserId);
    } catch (err) {
      console.error('Error checking connection status:', err);
      return 'none';
    }
  }, [user?.id]);

  // Send a connection request
  const sendRequest = useCallback(async (recipientId: string, message?: string) => {
    if (!user?.id) return false;
    
    setLoading(true);
    setError(null);
    
    try {
      const success = await sendConnectionRequest(user.id, recipientId, message);
      if (success) {
        await fetchConnections(); // Refresh connections list
      }
      return success;
    } catch (err) {
      console.error('Error sending connection request:', err);
      setError('Failed to send connection request');
      return false;
    } finally {
      setLoading(false);
    }
  }, [user?.id, fetchConnections]);

  // Accept a connection request
  const acceptRequest = useCallback(async (connectionId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const success = await updateConnectionStatus(connectionId, 'accepted');
      if (success) {
        await Promise.all([
          fetchConnections(),
          fetchPendingRequests()
        ]);
      }
      return success;
    } catch (err) {
      console.error('Error accepting connection request:', err);
      setError('Failed to accept connection request');
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchConnections, fetchPendingRequests]);

  // Reject a connection request
  const rejectRequest = useCallback(async (connectionId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const success = await updateConnectionStatus(connectionId, 'rejected');
      if (success) {
        await Promise.all([
          fetchConnections(),
          fetchPendingRequests()
        ]);
      }
      return success;
    } catch (err) {
      console.error('Error rejecting connection request:', err);
      setError('Failed to reject connection request');
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchConnections, fetchPendingRequests]);

  // Remove a connection
  const removeConnection = useCallback(async (connectionId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const success = await deleteConnection(connectionId);
      if (success) {
        await fetchConnections();
      }
      return success;
    } catch (err) {
      console.error('Error removing connection:', err);
      setError('Failed to remove connection');
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchConnections]);

  // Load connections on initial render and when user changes
  useEffect(() => {
    if (user?.id) {
      fetchConnections();
      fetchPendingRequests();
    } else {
      setConnections([]);
      setPendingRequests([]);
    }
  }, [user?.id, fetchConnections, fetchPendingRequests]);

  return {
    connections,
    pendingRequests,
    loading,
    error,
    fetchConnections,
    fetchPendingRequests,
    checkConnectionStatus,
    sendRequest,
    acceptRequest,
    rejectRequest,
    removeConnection
  };
}; 