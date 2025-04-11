'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/utils/supabase';

const UserMenu: React.FC = () => {
  const { user, isLoading, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Simple function to close the menu
  const closeMenu = () => setMenuOpen(false);

  // Updated approach to sign-out using the context
  const handleSignOutClick = async () => {
    console.log('Sign-out clicked');
    closeMenu();
    
    try {
      // Use the context's signOut method
      const success = await signOut();
      console.log('Sign-out completed, success:', success);
      
      // Force reload as a safety measure
      window.location.href = '/';
    } catch (error) {
      console.error('Sign-out error:', error);
      // Try redirect anyway
      window.location.href = '/';
    }
  };

  if (isLoading) {
    return (
      <div className="h-10 w-10 rounded-full bg-gray-700 animate-pulse"></div>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="flex items-center space-x-2 focus:outline-none"
        aria-label="User menu"
      >
        <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
          {user ? user.email?.charAt(0).toUpperCase() || 'U' : 'G'}
        </div>
        <span className="hidden md:inline-block text-gray-200">
          {user ? (user.email || 'User') : 'Guest'}
        </span>
      </button>

      {menuOpen && (
        <div 
          className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-50"
          style={{ pointerEvents: 'auto' }}
        >
          {user ? (
            <>
              <Link 
                href="/profile"
                onClick={closeMenu}
                className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
              >
                Profile
              </Link>
              <Link 
                href="/saved"
                onClick={closeMenu}
                className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
              >
                Saved Opportunities
              </Link>
              <button 
                className="w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 cursor-pointer"
                onClick={handleSignOutClick}
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link 
                href="/auth?view=login" 
                className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
                onClick={closeMenu}
              >
                Log In
              </Link>
              <Link 
                href="/auth?view=signup" 
                className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
                onClick={closeMenu}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UserMenu; 