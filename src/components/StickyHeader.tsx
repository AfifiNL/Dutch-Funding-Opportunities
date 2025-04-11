'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import UserMenu from './UserMenu';
import NotificationBell from './NotificationBell';
import { supabase } from '@/utils/supabase';

// Animation variants
const headerVariants: Variants = {
  hidden: { y: -100, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { 
      type: 'spring', 
      stiffness: 100, 
      damping: 20 
    }
  },
  exit: { 
    y: -100, 
    opacity: 0,
    transition: { 
      duration: 0.2 
    }
  }
};

const StickyHeader: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Initial check
    handleScroll();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Direct sign out function
  const handleDirectSignOut = async () => {
    try {
      // Close the mobile menu
      setIsMobileMenuOpen(false);
      
      // Use the context's signOut method
      await signOut();
      
      // Force a complete page reload to clear all state
      window.location.href = '/';
    } catch (error) {
      console.error('Error during sign out:', error);
      
      // Fallback to direct signout
      try {
        await supabase.auth.signOut();
        window.location.href = '/';
      } catch (e) {
        console.error('Fallback signout failed:', e);
      }
    }
  };

  return (
    <>
      {/* Static header that's always present */}
      <header className="bg-gray-800/90 backdrop-blur-sm shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-white">
                Dutch Funding
              </Link>
              
              <nav className="ml-10 space-x-4 hidden md:flex">
                <Link href="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">
                  Home
                </Link>
                <Link href="/funding" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">
                  Funding Opportunities
                </Link>
                {user && (
                  <>
                    <Link href="/profile" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">
                      My Profile
                    </Link>
                    <Link href="/saved" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">
                      Saved Opportunities
                    </Link>
                    <Link href="/connections" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">
                      My Network
                    </Link>
                  </>
                )}
              </nav>
            </div>
            
            <div className="flex items-center">
              {user && <NotificationBell />}
              <UserMenu />
              
              {/* Mobile menu button */}
              <button 
                className="md:hidden ml-4 text-gray-300 hover:text-white"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle mobile menu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="md:hidden bg-gray-800 shadow-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link 
                href="/"
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/funding"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Funding Opportunities
              </Link>
              {user && (
                <>
                  <Link 
                    href="/profile"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    My Profile
                  </Link>
                  <Link 
                    href="/saved"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Saved Opportunities
                  </Link>
                  <Link 
                    href="/connections"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    My Network
                  </Link>
                </>
              )}
              <Link 
                href={user ? "/profile" : "/auth"}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {user ? "Account Settings" : "Sign In / Register"}
              </Link>
              
              {/* Add sign out button for logged in users */}
              {user && (
                <button
                  onClick={handleDirectSignOut}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-300 hover:bg-gray-700 hover:text-red-200"
                >
                  Sign Out
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Floating/Sticky header that appears on scroll */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            className="fixed top-0 left-0 right-0 z-50"
            variants={headerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="bg-gray-900/90 backdrop-blur-md shadow-lg border-b border-teal-500/20">
              <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
                <div className="flex items-center">
                  <Link href="/" className="text-white font-bold text-lg">
                    Dutch Funding
                  </Link>
                </div>
                
                <div className="flex items-center space-x-4">
                  <Link 
                    href="/funding" 
                    className="hidden sm:inline-flex items-center text-sm font-medium rounded-md text-teal-400 hover:text-teal-300 px-3 py-2 hover:bg-teal-800/10"
                  >
                    Find Funding
                  </Link>
                  {user ? (
                    <>
                      {user && <NotificationBell />}
                      <UserMenu />
                      <Link 
                        href="/profile" 
                        className="bg-teal-500 hover:bg-teal-600 text-white font-medium py-1.5 px-4 rounded-md text-sm shadow-lg hover:shadow-xl transition-all"
                      >
                        My Dashboard
                      </Link>
                    </>
                  ) : (
                    <Link 
                      href="/auth" 
                      className="bg-teal-500 hover:bg-teal-600 text-white font-medium py-1.5 px-4 rounded-md text-sm shadow-lg hover:shadow-xl transition-all"
                    >
                      Get Started
                    </Link>
                  )}
                  
                  <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full shadow transition"
                    aria-label="Scroll to top"
                  >
                    <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default StickyHeader; 