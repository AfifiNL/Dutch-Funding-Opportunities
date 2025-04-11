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
        className="relative p-1 rounded-full text-gray-600 hover:text-primary-600 focus:outline-none"
        aria-label="Notifications"
      >
        <BellIcon className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        )}
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={closeNotifications}
            aria-hidden="true"
          />
          <div className="absolute right-0 z-20 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div className="py-2 px-4 bg-gray-50 border-b border-gray-200">
              <h3 className="text-sm font-medium text-gray-700">Notifications</h3>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <p className="py-4 px-4 text-sm text-gray-500 text-center">No notifications</p>
              ) : (
                <div className="divide-y divide-gray-200">
                  {notifications.map(notification => (
                    <div 
                      key={notification.id} 
                      className={`px-4 py-3 ${notification.unread ? 'bg-blue-50' : ''}`}
                    >
                      <p className="text-sm text-gray-800">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {notifications.length > 0 && (
              <div className="py-2 px-4 border-t border-gray-200 bg-gray-50">
                <button
                  className="text-xs text-primary-600 hover:text-primary-500 font-medium"
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