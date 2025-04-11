import { supabase, handleSupabaseError } from '@/utils/supabase';
import { Database } from '@/types/supabase';

export type Connection = {
  id: string;
  requester_id: string;
  recipient_id: string;
  status: 'pending' | 'accepted' | 'rejected';
  message?: string;
  created_at: string;
  updated_at: string;
  // UI helper properties
  requesterName?: string;
  requesterAvatar?: string;
  recipientName?: string;
  recipientAvatar?: string;
};

export type ConnectionWithProfile = {
  connection_id: string;
  connected_user_id: string;
  connected_user_name: string;
  connected_user_avatar: string | null;
  status: string;
  is_requester: boolean;
  created_at: string;
};

/**
 * Get all connections for the current user
 * @param userId The user ID to get connections for
 * @returns Array of connections with profile information
 */
export async function getUserConnections(userId: string): Promise<ConnectionWithProfile[]> {
  try {
    // Get connections where user is the requester
    const { data: sentConnections, error: sentError } = await supabase
      .from('connections')
      .select(`
        id,
        requester_id,
        recipient_id,
        status,
        created_at,
        profiles!connections_recipient_id_fkey (
          id,
          full_name,
          avatar_url
        )
      `)
      .eq('requester_id', userId);

    if (sentError) {
      handleSupabaseError(sentError, 'getUserConnections - sent');
      return [];
    }

    // Get connections where user is the recipient
    const { data: receivedConnections, error: receivedError } = await supabase
      .from('connections')
      .select(`
        id,
        requester_id,
        recipient_id,
        status,
        created_at,
        profiles!connections_requester_id_fkey (
          id,
          full_name,
          avatar_url
        )
      `)
      .eq('recipient_id', userId);

    if (receivedError) {
      handleSupabaseError(receivedError, 'getUserConnections - received');
      return [];
    }

    // Transform sent connections
    const sentConnectionsFormatted: ConnectionWithProfile[] = (sentConnections || []).map((conn) => ({
      connection_id: conn.id,
      connected_user_id: conn.recipient_id,
      connected_user_name: conn.profiles?.full_name || 'Unknown User',
      connected_user_avatar: conn.profiles?.avatar_url,
      status: conn.status,
      is_requester: true,
      created_at: conn.created_at
    }));

    // Transform received connections
    const receivedConnectionsFormatted: ConnectionWithProfile[] = (receivedConnections || []).map((conn) => ({
      connection_id: conn.id,
      connected_user_id: conn.requester_id,
      connected_user_name: conn.profiles?.full_name || 'Unknown User',
      connected_user_avatar: conn.profiles?.avatar_url,
      status: conn.status,
      is_requester: false,
      created_at: conn.created_at
    }));

    // Combine both lists
    return [...sentConnectionsFormatted, ...receivedConnectionsFormatted].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  } catch (error) {
    console.error('Error in getUserConnections:', error);
    return [];
  }
}

/**
 * Check the connection status between two users
 * @param user1Id First user ID
 * @param user2Id Second user ID
 * @returns Connection status (none, pending, accepted, rejected)
 */
export async function getConnectionStatus(user1Id: string, user2Id: string): Promise<string> {
  try {
    // Check for connection in either direction
    const { data: connections, error } = await supabase
      .from('connections')
      .select('status')
      .or(`requester_id.eq.${user1Id},requester_id.eq.${user2Id}`)
      .or(`recipient_id.eq.${user1Id},recipient_id.eq.${user2Id}`)
      .order('created_at', { ascending: false });

    if (error) {
      handleSupabaseError(error, 'getConnectionStatus');
      return 'none';
    }

    // If no connections found, return 'none'
    if (!connections || connections.length === 0) {
      return 'none';
    }

    // Return the status of the most recent connection
    return connections[0].status;
  } catch (error) {
    console.error('Error in getConnectionStatus:', error);
    return 'none';
  }
}

/**
 * Send a connection request to another user
 * @param requesterId The requester user ID
 * @param recipientId The recipient user ID
 * @param message Optional message to send with the request
 * @returns Whether the connection request was successful
 */
export async function sendConnectionRequest(
  requesterId: string,
  recipientId: string,
  message?: string
): Promise<boolean> {
  try {
    const { error } = await supabase.from('connections').insert({
      requester_id: requesterId,
      recipient_id: recipientId,
      status: 'pending',
      message: message || null
    });

    if (error) {
      handleSupabaseError(error, 'sendConnectionRequest');
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in sendConnectionRequest:', error);
    return false;
  }
}

/**
 * Update a connection status (accept/reject)
 * @param connectionId The connection ID to update
 * @param status The new status (accepted/rejected)
 * @returns Whether the update was successful
 */
export async function updateConnectionStatus(
  connectionId: string,
  status: 'accepted' | 'rejected'
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('connections')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', connectionId);

    if (error) {
      handleSupabaseError(error, 'updateConnectionStatus');
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in updateConnectionStatus:', error);
    return false;
  }
}

/**
 * Get pending connection requests for a user
 * @param userId The user ID to get pending requests for
 * @returns Array of pending connection requests with requester profile info
 */
export async function getPendingConnectionRequests(userId: string): Promise<ConnectionWithProfile[]> {
  try {
    const { data: pendingConnections, error } = await supabase
      .from('connections')
      .select(`
        id,
        requester_id,
        status,
        created_at,
        profiles!connections_requester_id_fkey (
          id,
          full_name,
          avatar_url
        )
      `)
      .eq('recipient_id', userId)
      .eq('status', 'pending');

    if (error) {
      handleSupabaseError(error, 'getPendingConnectionRequests');
      return [];
    }

    // Transform the data to the ConnectionWithProfile format
    return (pendingConnections || []).map((conn) => ({
      connection_id: conn.id,
      connected_user_id: conn.requester_id,
      connected_user_name: conn.profiles?.full_name || 'Unknown User',
      connected_user_avatar: conn.profiles?.avatar_url,
      status: conn.status,
      is_requester: false,
      created_at: conn.created_at
    }));
  } catch (error) {
    console.error('Error in getPendingConnectionRequests:', error);
    return [];
  }
}

/**
 * Delete a connection
 * @param connectionId The connection ID to delete
 * @returns Whether the deletion was successful
 */
export async function deleteConnection(connectionId: string): Promise<boolean> {
  try {
    const { error } = await supabase.from('connections').delete().eq('id', connectionId);

    if (error) {
      handleSupabaseError(error, 'deleteConnection');
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in deleteConnection:', error);
    return false;
  }
} 