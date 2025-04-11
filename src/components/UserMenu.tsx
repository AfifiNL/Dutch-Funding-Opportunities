'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSupabase } from '@/hooks/useSupabase';

export function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [userInitial, setUserInitial] = useState('U');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const { supabase } = useSupabase();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setIsLoggedIn(!!user);
      if (user?.email) {
        setUserInitial(user.email.charAt(0).toUpperCase());
      }
    };
    
    checkUser();
  }, [supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  const handleSignIn = () => {
    router.push('/auth?view=login');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close the menu when clicking outside
  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 focus:outline-none"
        aria-label="User menu"
        aria-expanded={isOpen ? 'true' : 'false'}
        aria-controls="user-menu"
      >
        <div className="w-9 h-9 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400">
          <span className="text-sm font-medium">{userInitial}</span>
        </div>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={closeMenu}
            aria-hidden="true"
          />
          <div 
            id="user-menu"
            className="absolute right-0 z-20 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 dark:ring-gray-700 border border-gray-100 dark:border-gray-700"
          >
            <div className="py-1" role="menu" aria-orientation="vertical">
              {isLoggedIn ? (
                <>
                  <Link 
                    href="/profile" 
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={closeMenu}
                    role="menuitem"
                  >
                    Your Profile
                  </Link>
                  <Link 
                    href="/saved" 
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={closeMenu}
                    role="menuitem"
                  >
                    Saved Opportunities
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    role="menuitem"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleSignIn}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    role="menuitem"
                  >
                    Sign In / Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
} 