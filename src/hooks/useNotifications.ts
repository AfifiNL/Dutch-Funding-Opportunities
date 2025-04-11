import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import {
  getUserNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
  getUnreadNotificationCount,
  Notification
} from '@/api/supabase/notifications';

export const useNotifications = (limit = 20, autoRefresh = true) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch notifications for the current user
  const fetchNotifications = useCallback(async (includeRead = false) => {
    if (!user?.id) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await getUserNotifications(user.id, limit, includeRead);
      setNotifications(data);
    } catch (err) {
      console.error('Error fetching notifications:', err);
      setError('Failed to load notifications');
    } finally {
      setLoading(false);
    }
  }, [user?.id, limit]);

  // Fetch unread notification count
  const fetchUnreadCount = useCallback(async () => {
    if (!user?.id) return;
    
    try {
      const count = await getUnreadNotificationCount(user.id);
      setUnreadCount(count);
    } catch (err) {
      console.error('Error fetching unread count:', err);
    }
  }, [user?.id]);

  // Mark a notification as read
  const markAsRead = useCallback(async (notificationId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const success = await markNotificationAsRead(notificationId);
      if (success) {
        // Update the notification in state
        setNotifications(prev => 
          prev.map(notif => 
            notif.id === notificationId 
              ? { ...notif, is_read: true } 
              : notif
          )
        );
        // Update the unread count
        await fetchUnreadCount();
      }
      return success;
    } catch (err) {
      console.error('Error marking notification as read:', err);
      setError('Failed to mark notification as read');
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchUnreadCount]);

  // Mark all notifications as read
  const markAllAsRead = useCallback(async () => {
    if (!user?.id) return 0;
    
    setLoading(true);
    setError(null);
    
    try {
      const count = await markAllNotificationsAsRead(user.id);
      if (count > 0) {
        // Update all notifications in state
        setNotifications(prev => 
          prev.map(notif => ({ ...notif, is_read: true }))
        );
        // Set unread count to 0
        setUnreadCount(0);
      }
      return count;
    } catch (err) {
      console.error('Error marking all notifications as read:', err);
      setError('Failed to mark all notifications as read');
      return 0;
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  // Delete a notification
  const removeNotification = useCallback(async (notificationId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const success = await deleteNotification(notificationId);
      if (success) {
        // Remove the notification from state
        setNotifications(prev => 
          prev.filter(notif => notif.id !== notificationId)
        );
        // Update the unread count if needed
        const wasUnread = notifications.find(n => n.id === notificationId)?.is_read === false;
        if (wasUnread) {
          await fetchUnreadCount();
        }
      }
      return success;
    } catch (err) {
      console.error('Error removing notification:', err);
      setError('Failed to remove notification');
      return false;
    } finally {
      setLoading(false);
    }
  }, [notifications, fetchUnreadCount]);

  // Set up auto refresh
  useEffect(() => {
    if (!user?.id || !autoRefresh) return;

    // Initial fetch
    fetchNotifications();
    fetchUnreadCount();

    // Set up interval to check for new notifications every minute
    const interval = setInterval(() => {
      fetchUnreadCount();
      // Only refresh visible notifications if they aren't already loaded
      if (notifications.length < limit) {
        fetchNotifications();
      }
    }, 60000); // 1 minute

    return () => clearInterval(interval);
  }, [user?.id, autoRefresh, fetchNotifications, fetchUnreadCount, notifications.length, limit]);

  return {
    notifications,
    unreadCount,
    loading,
    error,
    fetchNotifications,
    fetchUnreadCount,
    markAsRead,
    markAllAsRead,
    removeNotification
  };
}; 