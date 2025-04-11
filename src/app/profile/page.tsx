'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useSavedOpportunities } from '@/hooks';
import Link from 'next/link';
import AuthenticatedLayout from '@/components/AuthenticatedLayout';
import { supabase } from '@/utils/supabase';
import { SavedOpportunitiesDashboard } from '@/features/saved-opportunities';

export default function ProfilePage() {
  const router = useRouter();
  const { user, isLoading, signOut } = useAuth();
  const { savedOpportunities, loading: loadingSaved, error: savedError } = useSavedOpportunities();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth?redirectTo=/profile');
    }
  }, [user, isLoading, router]);
  
  // Handle sign out
  const handleSignOut = async () => {
    try {
      // Use the auth context's signOut method
      await signOut();
      
      // Force a complete page reload to clear all state
      window.location.href = '/';
    } catch (error) {
      console.error('Error during sign out:', error);
      
      // Fallback to direct signout if context method fails
      try {
        await supabase.auth.signOut();
        window.location.href = '/';
      } catch (e) {
        console.error('Fallback signout failed:', e);
      }
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }
  
  if (!user) {
    return null; // will redirect due to the effect
  }
  
  return (
    <AuthenticatedLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-white mb-4">Your Profile</h1>
          <p className="text-gray-300">
            Manage your account settings and view your funding matches
          </p>
        </div>
        
        {/* Profile content */}
        <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-lg shadow-xl overflow-hidden">
          {/* Tabs navigation */}
          <div className="border-b border-gray-700">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  activeTab === 'overview'
                    ? 'border-teal-500 text-teal-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('saved')}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  activeTab === 'saved'
                    ? 'border-teal-500 text-teal-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600'
                }`}
              >
                Saved Funding
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  activeTab === 'settings'
                    ? 'border-teal-500 text-teal-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600'
                }`}
              >
                Settings
              </button>
            </nav>
          </div>
          
          {/* Tab content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div>
                <div className="flex items-center space-x-4 mb-8">
                  <div className="h-20 w-20 rounded-full bg-teal-600 flex items-center justify-center text-2xl font-bold text-white">
                    {user.email?.[0].toUpperCase() || 'U'}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{user.email?.split('@')[0] || 'User'}</h2>
                    <p className="text-gray-400">{user.email}</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600">
                    <h3 className="text-lg font-medium text-white mb-4">Account Summary</h3>
                    <ul className="space-y-3">
                      <li className="flex justify-between">
                        <span className="text-gray-400">Email</span>
                        <span className="text-white">{user.email}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-400">Account Type</span>
                        <span className="text-white">Free Tier</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-400">Saved Funding Opportunities</span>
                        <span className="text-white">{savedOpportunities.length}</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600">
                    <h3 className="text-lg font-medium text-white mb-4">Funding Match Summary</h3>
                    <div className="space-y-4">
                      {savedOpportunities.length > 0 ? (
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-gray-400">Your Saved Opportunities</span>
                            <span className="text-teal-400 font-medium">{savedOpportunities.length}</span>
                          </div>
                          <div className="w-full bg-gray-600 rounded-full h-2">
                            <div className="bg-teal-500 rounded-full h-2" style={{ width: `${Math.min(100, savedOpportunities.length * 10)}%` }}></div>
                          </div>
                        </div>
                      ) : (
                        <p className="text-gray-400">Save opportunities to see your funding matches.</p>
                      )}
                      
                      <Link 
                        href="/funding" 
                        className="block mt-6 text-center bg-teal-600 hover:bg-teal-500 text-white font-medium py-2 px-4 rounded-md"
                      >
                        Find More Funding
                      </Link>
                    </div>
                  </div>
                </div>
                
                {/* Resources Section */}
                <div className="mt-8 bg-gray-700/50 p-6 rounded-lg border border-gray-600">
                  <h3 className="text-lg font-medium text-white mb-4">Exclusive Resources</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                          <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <Link href="/case-studies/isystem-ai" className="text-blue-400 hover:text-blue-300 font-medium">
                          iSystem.ai Case Study
                        </Link>
                        <p className="text-sm text-gray-400 mt-1">
                          Comprehensive analysis of Dutch funding options for AI-driven startups in civic integration.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'saved' && (
              <div>
                <SavedOpportunitiesDashboard />
              </div>
            )}
            
            {activeTab === 'settings' && (
              <div>
                <h3 className="text-xl font-bold text-white mb-6">Account Settings</h3>
                
                <div className="space-y-6">
                  <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600">
                    <h4 className="text-lg font-medium text-white mb-4">Email Preferences</h4>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <input
                          id="notifications"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-600 text-teal-600 focus:ring-teal-500 bg-gray-800"
                          defaultChecked
                        />
                        <label htmlFor="notifications" className="ml-2 block text-sm text-gray-300">
                          Receive funding opportunity notifications
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="updates"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-600 text-teal-600 focus:ring-teal-500 bg-gray-800"
                          defaultChecked
                        />
                        <label htmlFor="updates" className="ml-2 block text-sm text-gray-300">
                          Receive product updates and newsletters
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600">
                    <h4 className="text-lg font-medium text-white mb-4">Account Management</h4>
                    <div className="space-y-4">
                      <button
                        className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium"
                      >
                        Change Password
                      </button>
                      <button
                        onClick={handleSignOut}
                        className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-sm font-medium"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AuthenticatedLayout>
  );
} 