import { supabase, handleSupabaseError } from '@/utils/supabase';
import { Database } from '@/types/supabase';

export type Notification = {
  id: string;
  user_id: string;
  type: string;
  title: string;
  message: string;
  data?: any;
  is_read: boolean;
  created_at: string;
};

/**
 * Get notifications for a user
 * @param userId The user ID to get notifications for
 * @param limit Maximum number of notifications to retrieve
 * @param includeRead Whether to include read notifications
 * @returns Array of notifications
 */
export async function getUserNotifications(
  userId: string,
  limit = 20,
  includeRead = false
): Promise<Notification[]> {
  try {
    let query = supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (!includeRead) {
      query = query.eq('is_read', false);
    }

    const { data, error } = await query;

    if (error) {
      handleSupabaseError(error, 'getUserNotifications');
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getUserNotifications:', error);
    return [];
  }
}

/**
 * Mark a notification as read
 * @param notificationId The notification ID to mark as read
 * @returns Whether the update was successful
 */
export async function markNotificationAsRead(notificationId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', notificationId);

    if (error) {
      handleSupabaseError(error, 'markNotificationAsRead');
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in markNotificationAsRead:', error);
    return false;
  }
}

/**
 * Mark all notifications as read for a user
 * @param userId The user ID to mark all notifications as read for
 * @returns The number of notifications marked as read
 */
export async function markAllNotificationsAsRead(userId: string): Promise<number> {
  try {
    // First count how many unread notifications we have
    const { count: unreadCount } = await supabase
      .from('notifications')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('is_read', false);
    
    // Then update them
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('user_id', userId)
      .eq('is_read', false);

    if (error) {
      handleSupabaseError(error, 'markAllNotificationsAsRead');
      return 0;
    }

    // Return count of updated notifications
    return unreadCount || 0;
  } catch (error) {
    console.error('Error in markAllNotificationsAsRead:', error);
    return 0;
  }
}

/**
 * Get unread notification count for a user
 * @param userId The user ID to get the count for
 * @returns The number of unread notifications
 */
export async function getUnreadNotificationCount(userId: string): Promise<number> {
  try {
    const { count, error } = await supabase
      .from('notifications')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('is_read', false);

    if (error) {
      handleSupabaseError(error, 'getUnreadNotificationCount');
      return 0;
    }

    return count || 0;
  } catch (error) {
    console.error('Error in getUnreadNotificationCount:', error);
    return 0;
  }
}

/**
 * Delete a notification
 * @param notificationId The notification ID to delete
 * @returns Whether the deletion was successful
 */
export async function deleteNotification(notificationId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('id', notificationId);

    if (error) {
      handleSupabaseError(error, 'deleteNotification');
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in deleteNotification:', error);
    return false;
  }
}

/**
 * Delete all notifications for a user
 * @param userId The user ID to delete all notifications for
 * @returns Whether the deletion was successful
 */
export async function deleteAllNotifications(userId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('user_id', userId);

    if (error) {
      handleSupabaseError(error, 'deleteAllNotifications');
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in deleteAllNotifications:', error);
    return false;
  }
} 