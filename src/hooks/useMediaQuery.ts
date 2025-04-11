'use client';

import { useState, useEffect } from 'react';

/**
 * Custom hook for responsive media queries
 * @param query - CSS media query string (e.g., '(min-width: 768px)')
 * @returns boolean indicating if the media query matches
 */
export default function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  
  useEffect(() => {
    // Check for browser environment
    if (typeof window === 'undefined' || typeof window.matchMedia === 'undefined') {
      return;
    }
    
    const media = window.matchMedia(query);
    
    // Initial check
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    
    // Add listener for subsequent changes
    const listener = (): void => setMatches(media.matches);
    
    // Modern API
    if (media.addEventListener) {
      media.addEventListener('change', listener);
      return () => media.removeEventListener('change', listener);
    } 
    // Legacy API
    else {
      media.addListener(listener);
      return () => media.removeListener(listener);
    }
  }, [matches, query]);
  
  return matches;
} 