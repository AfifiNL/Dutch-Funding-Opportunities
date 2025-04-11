'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useProfileCompletion } from '@/hooks/useProfileCompletion';
import AuthenticatedLayout from '@/components/AuthenticatedLayout';
import { supabase } from '@/utils/supabase';
import { motion } from 'framer-motion';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { XCircleIcon } from '@heroicons/react/24/outline';

export default function ProfileEditPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { completionPercentage, missingFields, userType, calculateCompletion } = useProfileCompletion();

  const [formData, setFormData] = useState({
    full_name: '',
    bio: '',
    avatar_url: '',
    linkedin_url: '',
    company_name: '',
    investment_thesis: '',
    investment_stages: [] as string[],
    preferred_industries: [] as string[]
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Fetch current profile data
  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user?.id) return;

      try {
        // Get basic profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileError) throw profileError;

        // Update form with basic profile data
        setFormData(prev => ({
          ...prev,
          full_name: profileData.full_name || '',
          bio: profileData.bio || '',
          avatar_url: profileData.avatar_url || '',
          linkedin_url: profileData.linkedin_url || '',
          company_name: profileData.company_name || ''
        }));

        // If investor, get investor profile data too
        if (profileData.user_type === 'investor') {
          const { data: investorData, error: investorError } = await supabase
            .from('investor_profiles')
            .select('*')
            .eq('profile_id', user.id)
            .single();

          if (!investorError && investorData) {
            setFormData(prev => ({
              ...prev,
              investment_thesis: investorData.investment_thesis || '',
              investment_stages: investorData.investment_stages || [],
              preferred_industries: investorData.preferred_industries || []
            }));
          }
        }
      } catch (err) {
        console.error('Error fetching profile data:', err);
        setError('Failed to load your profile data. Please try again.');
      }
    };

    fetchProfileData();
  }, [user?.id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayInputChange = (name: string, value: string[]) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Update basic profile in profiles table
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          full_name: formData.full_name,
          bio: formData.bio,
          avatar_url: formData.avatar_url,
          linkedin_url: formData.linkedin_url,
          company_name: formData.company_name
        })
        .eq('id', user.id);

      if (profileError) throw profileError;

      // If investor type, update or create investor profile
      if (userType === 'investor') {
        // Check if investor profile exists
        const { data: existingProfile } = await supabase
          .from('investor_profiles')
          .select('profile_id')
          .eq('profile_id', user.id)
          .single();

        if (existingProfile) {
          // Update existing profile
          const { error: investorError } = await supabase
            .from('investor_profiles')
            .update({
              investment_thesis: formData.investment_thesis,
              investment_stages: formData.investment_stages,
              preferred_industries: formData.preferred_industries
            })
            .eq('profile_id', user.id);

          if (investorError) throw investorError;
        } else {
          // Create new investor profile
          const { error: createError } = await supabase
            .from('investor_profiles')
            .insert({
              profile_id: user.id,
              investment_thesis: formData.investment_thesis,
              investment_stages: formData.investment_stages,
              preferred_industries: formData.preferred_industries
            });

          if (createError) throw createError;
        }
      }

      // Recalculate profile completion
      await calculateCompletion();
      
      setSuccess(true);
      
      // Redirect to profile after short delay
      setTimeout(() => {
        router.push('/profile');
      }, 2000);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update your profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Helper to check if a field is in the missing fields list
  const isMissingField = (fieldName: string) => {
    return missingFields.includes(fieldName);
  };

  return (
    <AuthenticatedLayout showProfileNotice={false}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Complete Your Profile</h1>
          <p className="text-gray-300">
            Your profile is {completionPercentage}% complete. Fill in the missing information to get the most out of our platform.
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-700 rounded-full h-2 mb-8">
          <div 
            className="bg-teal-500 h-2 rounded-full transition-all duration-500" 
            style={{ width: `${completionPercentage}%` }}
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-lg shadow-xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">Basic Information</h2>
            
            <div className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Full Name {isMissingField('full_name') && <span className="text-red-400">*</span>}
                </label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 bg-gray-700 border ${isMissingField('full_name') ? 'border-red-400' : 'border-gray-600'} rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-500`}
                  placeholder="Your full name"
                />
                {isMissingField('full_name') && (
                  <p className="mt-1 text-sm text-red-400">Please enter your full name</p>
                )}
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Bio {isMissingField('bio') && <span className="text-red-400">*</span>}
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={4}
                  className={`w-full px-4 py-2 bg-gray-700 border ${isMissingField('bio') ? 'border-red-400' : 'border-gray-600'} rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-500`}
                  placeholder="Tell us about yourself or your company"
                />
                {isMissingField('bio') && (
                  <p className="mt-1 text-sm text-red-400">Please add a short bio</p>
                )}
              </div>

              {/* Avatar URL */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Profile Picture URL {isMissingField('avatar_url') && <span className="text-red-400">*</span>}
                </label>
                <input
                  type="text"
                  name="avatar_url"
                  value={formData.avatar_url}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 bg-gray-700 border ${isMissingField('avatar_url') ? 'border-red-400' : 'border-gray-600'} rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-500`}
                  placeholder="https://example.com/your-image.jpg"
                />
                {isMissingField('avatar_url') && (
                  <p className="mt-1 text-sm text-red-400">Please add a profile picture URL</p>
                )}
              </div>

              {/* LinkedIn URL */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  LinkedIn Profile {isMissingField('linkedin_url') && <span className="text-red-400">*</span>}
                </label>
                <input
                  type="text"
                  name="linkedin_url"
                  value={formData.linkedin_url}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 bg-gray-700 border ${isMissingField('linkedin_url') ? 'border-red-400' : 'border-gray-600'} rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-500`}
                  placeholder="https://linkedin.com/in/yourprofile"
                />
                {isMissingField('linkedin_url') && (
                  <p className="mt-1 text-sm text-red-400">Please add your LinkedIn profile URL</p>
                )}
              </div>
            </div>
          </div>

          {/* Founder specific fields */}
          {userType === 'founder' && (
            <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-lg shadow-xl p-6">
              <h2 className="text-xl font-bold text-white mb-6">Founder Information</h2>
              
              <div className="space-y-6">
                {/* Company Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Company Name {isMissingField('company_name') && <span className="text-red-400">*</span>}
                  </label>
                  <input
                    type="text"
                    name="company_name"
                    value={formData.company_name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 bg-gray-700 border ${isMissingField('company_name') ? 'border-red-400' : 'border-gray-600'} rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-500`}
                    placeholder="Your company name"
                  />
                  {isMissingField('company_name') && (
                    <p className="mt-1 text-sm text-red-400">Please enter your company name</p>
                  )}
                </div>

                {/* Startup information */}
                {isMissingField('startup') && (
                  <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-md p-4">
                    <p className="text-yellow-400 mb-2">You need to create a startup profile</p>
                    <button
                      type="button"
                      onClick={() => router.push('/startups/create')}
                      className="bg-yellow-600 hover:bg-yellow-700 text-white text-sm font-medium py-2 px-4 rounded-md transition-colors"
                    >
                      Create Startup Profile
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Investor specific fields */}
          {userType === 'investor' && (
            <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-lg shadow-xl p-6">
              <h2 className="text-xl font-bold text-white mb-6">Investor Information</h2>
              
              <div className="space-y-6">
                {/* Investment Thesis */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Investment Thesis {isMissingField('investment_thesis') && <span className="text-red-400">*</span>}
                  </label>
                  <textarea
                    name="investment_thesis"
                    value={formData.investment_thesis}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full px-4 py-2 bg-gray-700 border ${isMissingField('investment_thesis') ? 'border-red-400' : 'border-gray-600'} rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-500`}
                    placeholder="Describe your investment strategy and what you look for in startups"
                  />
                  {isMissingField('investment_thesis') && (
                    <p className="mt-1 text-sm text-red-400">Please describe your investment thesis</p>
                  )}
                </div>

                {/* Investment Stages */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Investment Stages {isMissingField('investment_stages') && <span className="text-red-400">*</span>}
                  </label>
                  <select
                    name="investment_stages"
                    multiple
                    aria-label="Investment Stages"
                    className={`w-full px-4 py-2 bg-gray-700 border ${isMissingField('investment_stages') ? 'border-red-400' : 'border-gray-600'} rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-500`}
                    onChange={(e) => {
                      const selected = Array.from(e.target.selectedOptions).map(option => option.value);
                      handleArrayInputChange('investment_stages', selected);
                    }}
                  >
                    <option value="pre-seed">Pre-seed</option>
                    <option value="seed">Seed</option>
                    <option value="early-stage">Early-stage</option>
                    <option value="series-a">Series A</option>
                    <option value="series-b">Series B</option>
                    <option value="growth">Growth</option>
                    <option value="late-stage">Late-stage</option>
                  </select>
                  <p className="mt-1 text-xs text-gray-400">Hold Ctrl/Cmd to select multiple options</p>
                  {isMissingField('investment_stages') && (
                    <p className="mt-1 text-sm text-red-400">Please select your preferred investment stages</p>
                  )}
                </div>

                {/* Preferred Industries */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Preferred Industries {isMissingField('preferred_industries') && <span className="text-red-400">*</span>}
                  </label>
                  <select
                    name="preferred_industries"
                    multiple
                    aria-label="Preferred Industries"
                    className={`w-full px-4 py-2 bg-gray-700 border ${isMissingField('preferred_industries') ? 'border-red-400' : 'border-gray-600'} rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-500`}
                    onChange={(e) => {
                      const selected = Array.from(e.target.selectedOptions).map(option => option.value);
                      handleArrayInputChange('preferred_industries', selected);
                    }}
                  >
                    <option value="technology">Technology</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="fintech">Fintech</option>
                    <option value="sustainability">Sustainability</option>
                    <option value="education">Education</option>
                    <option value="e-commerce">E-commerce</option>
                    <option value="saas">SaaS</option>
                    <option value="ai">AI/ML</option>
                    <option value="biotech">Biotech</option>
                    <option value="logistics">Logistics</option>
                  </select>
                  <p className="mt-1 text-xs text-gray-400">Hold Ctrl/Cmd to select multiple options</p>
                  {isMissingField('preferred_industries') && (
                    <p className="mt-1 text-sm text-red-400">Please select your preferred industries</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Submit button */}
          <div className="flex items-center justify-between pt-6">
            <button
              type="button"
              onClick={() => router.push('/profile')}
              className="px-6 py-2 border border-gray-600 text-gray-300 rounded-md hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-md shadow-sm hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : 'Save Profile'}
            </button>
          </div>

          {/* Error message */}
          {error && (
            <div className="flex items-center p-4 bg-red-500/20 border border-red-400 rounded-md mt-4">
              <XCircleIcon className="h-5 w-5 text-red-400 mr-2" />
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          {/* Success message */}
          {success && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center p-4 bg-emerald-500/20 border border-emerald-400 rounded-md mt-4"
            >
              <CheckCircleIcon className="h-5 w-5 text-emerald-400 mr-2" />
              <p className="text-emerald-300 text-sm">Profile updated successfully! Redirecting to your profile...</p>
            </motion.div>
          )}
        </form>
      </motion.div>
    </AuthenticatedLayout>
  );
} 