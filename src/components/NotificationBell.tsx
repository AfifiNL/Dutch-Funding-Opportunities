'use client';

import React, { useState } from 'react';
import { BellIcon } from '@heroicons/react/24/outline';

export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New funding opportunity available', time: '2 hours ago', unread: true },
    { id: 2, message: 'Your profile is 80% complete', time: '1 day ago', unread: false }
  ]);

  const unreadCount = notifications.filter(notification => notification.unread).length;

  const toggleNotifications = () => {
    setIsOpen(!isOpen);
    // Mark as read when opened
    if (!isOpen && unreadCount > 0) {
      setNotifications(
        notifications.map(notification => ({ ...notification, unread: false }))
      );
    }
  };

  const closeNotifications = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleNotifications}
        className="relative p-1 rounded-full text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 focus:outline-none"
        aria-label="Notifications"
        aria-expanded={isOpen ? 'true' : 'false'}
        aria-controls="notification-panel"
      >
        <BellIcon className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 dark:bg-red-400 ring-2 ring-white dark:ring-gray-800" />
        )}
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={closeNotifications}
            aria-hidden="true"
          />
          <div 
            id="notification-panel"
            className="absolute right-0 z-20 mt-2 w-80 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 dark:ring-gray-700 border border-gray-100 dark:border-gray-700"
          >
            <div className="py-2 px-4 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Notifications</h3>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <p className="py-4 px-4 text-sm text-gray-500 dark:text-gray-400 text-center">No notifications</p>
              ) : (
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {notifications.map(notification => (
                    <div 
                      key={notification.id} 
                      className={`px-4 py-3 ${notification.unread ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
                    >
                      <p className="text-sm text-gray-800 dark:text-gray-200">{notification.message}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.time}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {notifications.length > 0 && (
              <div className="py-2 px-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                <button
                  className="text-xs text-teal-600 hover:text-teal-500 dark:text-teal-400 dark:hover:text-teal-300 font-medium"
                  onClick={() => setNotifications([])}
                >
                  Clear all notifications
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
} 