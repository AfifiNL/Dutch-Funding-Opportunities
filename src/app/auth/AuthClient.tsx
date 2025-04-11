'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';

type AuthView = 'login' | 'signup' | 'reset-password';

// Create the content component that uses useSearchParams
function AuthPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, signIn, signUp, resetPassword, error } = useAuth();
  
  const [view, setView] = useState<AuthView>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  // Set initial view based on URL query parameter
  useEffect(() => {
    const viewParam = searchParams?.get('view') as AuthView | null;
    if (viewParam && ['login', 'signup', 'reset-password'].includes(viewParam)) {
      setView(viewParam);
    }
  }, [searchParams]);
  
  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      router.push('/profile');
    }
  }, [user, router]);
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setSuccessMessage(null);
    
    // Basic validation
    if (!email) {
      setFormError('Email is required');
      return;
    }
    
    if (view !== 'reset-password' && !password) {
      setFormError('Password is required');
      return;
    }
    
    if (view === 'signup') {
      if (password !== confirmPassword) {
        setFormError('Passwords do not match');
        return;
      }
      
      if (password.length < 8) {
        setFormError('Password must be at least 8 characters');
        return;
      }
    }
    
    try {
      setIsSubmitting(true);
      
      if (view === 'login') {
        await signIn(email, password);
      } else if (view === 'signup') {
        await signUp(email, password);
        setSuccessMessage('Account created! Please verify your email address.');
        // Switch to login view after signup
        setTimeout(() => setView('login'), 2000);
      } else if (view === 'reset-password') {
        const success = await resetPassword(email);
        if (success) {
          setSuccessMessage('Password reset link sent to your email');
          // Switch to login view after password reset
          setTimeout(() => setView('login'), 2000);
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      setFormError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md space-y-8 bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-gray-700"
      >
        <div>
          <div className="mx-auto w-12 h-12 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
            {view === 'login' && 'Sign in to your account'}
            {view === 'signup' && 'Create your account'}
            {view === 'reset-password' && 'Reset your password'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            {view === 'login' && "Don't have an account?"}
            {view === 'signup' && 'Already have an account?'}
            {view === 'reset-password' && 'Remembered your password?'}
            {' '}
            <button
              className="font-medium text-teal-400 hover:text-teal-300"
              onClick={() => setView(view === 'login' ? 'signup' : 'login')}
            >
              {view === 'login' && 'Sign up'}
              {view === 'signup' && 'Sign in'}
              {view === 'reset-password' && 'Sign in'}
            </button>
          </p>
        </div>
        
        {/* Error message */}
        {(error || formError) && (
          <div className="rounded-md bg-red-900/50 p-4 border border-red-800">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-300">{formError || error}</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Success message */}
        {successMessage && (
          <div className="rounded-md bg-green-900/50 p-4 border border-green-800">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-300">{successMessage}</p>
              </div>
            </div>
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full rounded-md border-0 bg-gray-700 p-3 text-white ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-500"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            {view !== 'reset-password' && (
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete={view === 'login' ? 'current-password' : 'new-password'}
                  required
                  className="relative block w-full rounded-md border-0 bg-gray-700 p-3 text-white ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-500"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            )}
            
            {view === 'signup' && (
              <div>
                <label htmlFor="confirm-password" className="sr-only">
                  Confirm Password
                </label>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="relative block w-full rounded-md border-0 bg-gray-700 p-3 text-white ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-500"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            )}
          </div>
          
          {view === 'login' && (
            <div className="flex items-center justify-end">
              <div className="text-sm">
                <button
                  type="button"
                  className="font-medium text-teal-400 hover:text-teal-300"
                  onClick={() => setView('reset-password')}
                >
                  Forgot your password?
                </button>
              </div>
            </div>
          )}
          
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative flex w-full justify-center rounded-md bg-teal-600 px-3 py-3 text-sm font-semibold text-white hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                <span>
                  {view === 'login' && 'Sign in'}
                  {view === 'signup' && 'Sign up'}
                  {view === 'reset-password' && 'Reset password'}
                </span>
              )}
            </button>
          </div>
          
          <div className="mt-6">
            <p className="text-center text-xs text-gray-400">
              By signing up, you agree to our{' '}
              <Link href="/terms" className="text-teal-400 hover:text-teal-300">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-teal-400 hover:text-teal-300">
                Privacy Policy
              </Link>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

// Wrapper component to handle server-side rendering
export default function AuthClient() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthPageContent />
    </Suspense>
  );
}