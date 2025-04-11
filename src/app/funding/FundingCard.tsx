import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FundingOpportunity } from '@/types/funding';
import { useSupabase } from '@/hooks/useSupabase';

interface FundingCardProps {
  opportunity: FundingOpportunity;
}

export default function FundingCard({ opportunity }: FundingCardProps) {
  const { supabase } = useSupabase();
  const [isSaved, setIsSaved] = React.useState(false);
  
  // Check if the opportunity is saved by the user
  React.useEffect(() => {
    const checkIfSaved = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      
      const { data } = await supabase
        .from('saved_opportunities')
        .select('id')
        .eq('user_id', user.id)
        .eq('opportunity_id', opportunity.id)
        .single();
      
      setIsSaved(!!data);
    };
    
    checkIfSaved();
  }, [opportunity.id, supabase]);
  
  // Toggle save status
  const toggleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      // Redirect to login or show login modal
      return;
    }
    
    if (isSaved) {
      // Remove from saved
      await supabase
        .from('saved_opportunities')
        .delete()
        .eq('user_id', user.id)
        .eq('opportunity_id', opportunity.id);
    } else {
      // Add to saved
      await supabase
        .from('saved_opportunities')
        .insert({
          user_id: user.id,
          opportunity_id: opportunity.id
        });
    }
    
    setIsSaved(!isSaved);
  };
  
  // Format amount range for display
  const amountRange = React.useMemo(() => {
    if (opportunity.amount_min && opportunity.amount_max) {
      return `€${opportunity.amount_min.toLocaleString()} - €${opportunity.amount_max.toLocaleString()}`;
    } else if (opportunity.amount_min) {
      return `From €${opportunity.amount_min.toLocaleString()}`;
    } else if (opportunity.amount_max) {
      return `Up to €${opportunity.amount_max.toLocaleString()}`;
    }
    return 'Amount varies';
  }, [opportunity]);
  
  // Get badge color based on funding type
  const getBadgeColor = (type: string) => {
    switch(type) {
      case 'grant': return 'bg-green-100 text-green-800';
      case 'venture_capital': return 'bg-blue-100 text-blue-800';
      case 'angel': return 'bg-purple-100 text-purple-800';
      case 'loan': return 'bg-orange-100 text-orange-800';
      case 'subsidy': return 'bg-teal-100 text-teal-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <Link href={`/funding/${opportunity.id}`}>
      <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full flex flex-col">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center">
              {opportunity.logo_url ? (
                <div className="w-12 h-12 rounded-md overflow-hidden mr-4 bg-gray-50 flex-shrink-0">
                  <Image 
                    src={opportunity.logo_url} 
                    alt={opportunity.organization || 'Organization logo'} 
                    width={48} 
                    height={48} 
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-md mr-4 bg-primary-50 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-700 text-lg font-semibold">
                    {opportunity.organization && opportunity.organization.charAt(0) || 'O'}
                  </span>
                </div>
              )}
              <div>
                <h3 className="text-lg font-medium text-gray-900">{opportunity.name}</h3>
                <p className="text-sm text-gray-600">{opportunity.organization || 'Unknown organization'}</p>
              </div>
            </div>
            <button 
              onClick={toggleSave}
              className="text-gray-400 hover:text-primary-500 transition-colors"
              aria-label={isSaved ? 'Unsave opportunity' : 'Save opportunity'}
            >
              {isSaved ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-primary-500">
                  <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                </svg>
              )}
            </button>
          </div>
          
          <div className="mb-4">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getBadgeColor(opportunity.type)}`}>
              {opportunity.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </span>
            {opportunity.deadline && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 ml-2">
                Deadline: {new Date(opportunity.deadline).toLocaleDateString()}
              </span>
            )}
          </div>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">{opportunity.description}</p>
          
          <div className="mt-auto pt-4 border-t border-gray-100">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Amount:</span>
              <span className="font-medium text-gray-900">{amountRange}</span>
            </div>
            {opportunity.industry_focus && opportunity.industry_focus.length > 0 && (
              <div className="flex justify-between text-sm mt-2">
                <span className="text-gray-500">Industries:</span>
                <span className="font-medium text-gray-900">
                  {opportunity.industry_focus.slice(0, 2).join(', ')}
                  {opportunity.industry_focus.length > 2 && ' +'+(opportunity.industry_focus.length-2)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}