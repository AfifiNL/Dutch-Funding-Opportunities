'use client';

import React, { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getFundingOpportunities } from '@/api/fundingOpportunities';
import { mockFundingData } from '@/data/fundingOpportunities';

export default function FundingDetailsBySlug() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug || '';
  const router = useRouter();

  // Helper function to normalize strings for comparison
  const normalizeString = (str: string): string => {
    return str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  useEffect(() => {
    async function redirectToIdBasedPage() {
      // Try to map the slug to an actual funding ID
      try {
        // First check if we can find a direct match by ID
        const directMatch = mockFundingData.find(item => item.id === slug);
        if (directMatch) {
          router.push(`/funding/${directMatch.id}`);
          return;
        }

        // If not found directly, fetch all opportunities and try to find a match
        const allOpportunities = await getFundingOpportunities();
        
        // Find an opportunity that matches the slug (either by ID or by a normalized title)
        const opportunity = allOpportunities.find(
          item => item.id === slug || 
                 (item.title && normalizeString(item.title) === normalizeString(slug))
        );

        if (opportunity) {
          router.push(`/funding/${opportunity.id}`);
        } else {
          // If still not found, redirect to the funding page with a not found message
          router.push(`/funding?error=not_found&search=${encodeURIComponent(slug)}`);
        }
      } catch (error) {
        console.error('Error redirecting:', error);
        router.push('/funding');
      }
    }

    if (slug) {
      redirectToIdBasedPage();
    } else {
      router.push('/funding');
    }
  }, [slug, router]);

  // Show a loading state while redirecting
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-700 rounded w-3/4"></div>
          <div className="h-6 bg-gray-700 rounded w-1/2"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-700 rounded w-5/6"></div>
            <div className="h-4 bg-gray-700 rounded w-4/6"></div>
          </div>
          <div className="text-center text-gray-400 mt-8">
            Loading funding details...
          </div>
        </div>
      </div>
    </div>
  );
} 