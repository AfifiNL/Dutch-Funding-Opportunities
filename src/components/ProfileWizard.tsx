'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { useProfileCompletion } from '@/hooks/useProfileCompletion';
import { supabase } from '@/utils/supabase';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { ChevronLeftIcon, ChevronRightIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { Database } from '@/types/supabase';

type ProfileType = Database['public']['Tables']['profiles']['Row'];
type StartupType = Database['public']['Tables']['startups']['Row'];
type InvestorProfileType = Database['public']['Tables']['investor_profiles']['Row'];

type StepType = {
  id: string;
  title: string;
  description: string;
  fields: string[];
};

// Define the wizard steps for different user types
const founderSteps: StepType[] = [
  {
    id: 'basic',
    title: 'Basic Information',
    description: 'Let\'s start with your basic information',
    fields: ['full_name', 'avatar_url']
  },
  {
    id: 'bio',
    title: 'Your Background',
    description: 'Tell us about yourself',
    fields: ['bio', 'linkedin_url']
  },
  {
    id: 'company',
    title: 'Company Details',
    description: 'Tell us about your startup',
    fields: ['company_name', 'company_website', 'company_logo']
  },
  {
    id: 'startup',
    title: 'Startup Information',
    description: 'Provide details about your startup',
    fields: ['startup_sector', 'startup_stage', 'startup_description']
  }
];

const investorSteps: StepType[] = [
  {
    id: 'basic',
    title: 'Basic Information',
    description: 'Let\'s start with your basic information',
    fields: ['full_name', 'avatar_url']
  },
  {
    id: 'bio',
    title: 'Your Background',
    description: 'Tell us about yourself',
    fields: ['bio', 'linkedin_url']
  },
  {
    id: 'investment',
    title: 'Investment Preferences',
    description: 'Tell us about your investment strategy',
    fields: ['investment_thesis', 'investment_stages']
  },
  {
    id: 'industries',
    title: 'Industry Focus',
    description: 'Which industries do you invest in?',
    fields: ['preferred_industries']
  }
];

// Default empty state for form data
const defaultFormData = {
  full_name: '',
  avatar_url: '',
  bio: '',
  linkedin_url: '',
  company_name: '',
  company_website: '',
  company_logo: '',
  startup_sector: '',
  startup_stage: '',
  startup_description: '',
  investment_thesis: '',
  investment_stages: [] as string[],
  preferred_industries: [] as string[]
};

interface ProfileWizardProps {
  initialStep?: number;
  onComplete?: () => void;
}

const ProfileWizard: React.FC<ProfileWizardProps> = ({ 
  initialStep = 0,
  onComplete 
}) => {
  const router = useRouter();
  const { user } = useAuth();
  const { completionPercentage, missingFields, userType, calculateCompletion } = useProfileCompletion();
  
  const [currentStep, setCurrentStep] = useState<number>(initialStep);
  const [formData, setFormData] = useState(defaultFormData);
  const [steps, setSteps] = useState<StepType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [hasProgress, setHasProgress] = useState(false);
  const [helpTip, setHelpTip] = useState<string | null>(null);

  // Set steps based on user type
  useEffect(() => {
    if (userType === 'founder') {
      setSteps(founderSteps);
    } else if (userType === 'investor') {
      setSteps(investorSteps);
    }
  }, [userType]);

  // Load existing profile data
  useEffect(() => {
    const loadProfileData = async () => {
      if (!user?.id) return;
      
      setLoading(true);
      try {
        // Load basic profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
          
        if (profileError) {
          console.error('Error loading profile:', profileError);
          throw profileError;
        }
        
        // Load additional data based on user type
        let additionalData: Record<string, any> = {};
        if (profileData.user_type === 'founder') {
          // Load startup data
          const { data: startupData, error: startupError } = await supabase
            .from('startups')
            .select('*')
            .eq('founder_id', user.id)
            .single();
            
          if (!startupError && startupData) {
            const startup = startupData as StartupType;
            additionalData = {
              startup_sector: startup.industry?.[0] || '',
              startup_stage: startup.funding_stage || '',
              startup_description: startup.description || '',
              company_website: startup.website_url || '',
              company_logo: startup.logo_url || ''
            };
          }
        } else if (profileData.user_type === 'investor') {
          // Load investor profile
          const { data: investorData, error: investorError } = await supabase
            .from('investor_profiles')
            .select('*')
            .eq('profile_id', user.id)
            .single();
            
          if (!investorError && investorData) {
            additionalData = {
              investment_thesis: investorData.investment_thesis,
              investment_stages: investorData.investment_stages || [],
              preferred_industries: investorData.preferred_industries || []
            };
          }
        }
        
        // Merge all data with proper null handling
        setFormData({
          ...defaultFormData,
          full_name: profileData.full_name || '',
          avatar_url: profileData.avatar_url || '',
          bio: profileData.bio || '',
          linkedin_url: profileData.linkedin_url || '',
          company_name: profileData.company_name || '',
          ...additionalData
        });
        
        // Set hasProgress flag if we have any non-empty fields
        const hasAnyData = Object.values(profileData).some(
          value => value && value !== '' && 
          // Skip these fields when determining if there's progress
          !['id', 'created_at', 'updated_at', 'user_type'].includes(value as string)
        );
        setHasProgress(hasAnyData);
        
      } catch (error) {
        console.error('Error loading profile data:', error);
        setError('Failed to load your profile data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    loadProfileData();
  }, [user?.id, userType]);

  // Get current step fields
  const currentStepData = steps[currentStep] || { fields: [] };
  
  // Check if current step is complete (all required fields are filled)
  const isCurrentStepComplete = () => {
    return currentStepData.fields.every(field => {
      const value = formData[field as keyof typeof formData];
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      return !!value;
    });
  };
  
  // Handle input changes
  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  // Navigate to next step
  const handleNext = async () => {
    // Save current step data first
    await saveCurrentStep();
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    } else {
      // Last step completed
      await finalizeProfile();
    }
  };
  
  // Navigate to previous step
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };
  
  // Show contextual help tips
  const showHelp = (field: string) => {
    const helpTips: Record<string, string> = {
      full_name: 'Use your full professional name',
      avatar_url: 'A professional photo helps build trust and recognition',
      bio: 'Provide a brief summary of your background and expertise',
      linkedin_url: 'Your LinkedIn profile helps verify your professional history',
      company_name: 'The official name of your startup',
      company_website: 'Your company\'s website URL',
      startup_sector: 'The main sector your startup operates in',
      startup_stage: 'Your startup\'s current development stage',
      investment_thesis: 'Describe your overall investment strategy and focus',
      investment_stages: 'Select the stages you typically invest in',
      preferred_industries: 'Select the industries you prefer to invest in'
    };
    
    setHelpTip(helpTips[field] || null);
  };
  
  // Save current step data
  const saveCurrentStep = async () => {
    if (!user?.id) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Determine which fields to update based on current step
      const currentFields = currentStepData.fields;
      const updateData: Record<string, any> = {};
      
      currentFields.forEach(field => {
        // Only include fields from the current step
        if (formData[field as keyof typeof formData] !== undefined) {
          updateData[field] = formData[field as keyof typeof formData];
        }
      });
      
      // Update profile table with common fields
      const profileFields = ['full_name', 'avatar_url', 'bio', 'linkedin_url', 'company_name'];
      const profileUpdateData: Record<string, any> = {};
      
      Object.keys(updateData).forEach(key => {
        if (profileFields.includes(key)) {
          profileUpdateData[key] = updateData[key];
        }
      });
      
      if (Object.keys(profileUpdateData).length > 0) {
        const { error: profileError } = await supabase
          .from('profiles')
          .update(profileUpdateData)
          .eq('id', user.id);
          
        if (profileError) throw profileError;
      }
      
      // Handle user type specific updates
      if (userType === 'founder' && 
          (updateData.startup_sector || updateData.startup_stage || updateData.startup_description)) {
        // Check if startup exists
        const { data: existingStartup, error: checkError } = await supabase
          .from('startups')
          .select('id')
          .eq('founder_id', user.id)
          .single();
          
        if (checkError && checkError.code !== 'PGRST116') { // Not found error
          throw checkError;
        }
        
        const startupData = {
          founder_id: user.id,
          name: formData.company_name || 'My Startup',
          sector: updateData.startup_sector,
          stage: updateData.startup_stage,
          description: updateData.startup_description,
          website: updateData.company_website,
          logo_url: updateData.company_logo
        };
        
        if (existingStartup) {
          // Update existing startup
          const { error: updateError } = await supabase
            .from('startups')
            .update(startupData)
            .eq('id', existingStartup.id);
            
          if (updateError) throw updateError;
        } else {
          // Create new startup
          const { error: insertError } = await supabase
            .from('startups')
            .insert(startupData);
            
          if (insertError) throw insertError;
        }
      } else if (userType === 'investor' && 
                (updateData.investment_thesis || updateData.investment_stages || updateData.preferred_industries)) {
        // Check if investor profile exists
        const { data: existingProfile, error: checkError } = await supabase
          .from('investor_profiles')
          .select('profile_id')
          .eq('profile_id', user.id)
          .single();
          
        if (checkError && checkError.code !== 'PGRST116') { // Not found error
          throw checkError;
        }
        
        const investorData = {
          profile_id: user.id,
          investment_thesis: updateData.investment_thesis,
          investment_stages: updateData.investment_stages,
          preferred_industries: updateData.preferred_industries
        };
        
        if (existingProfile) {
          // Update existing profile
          const { error: updateError } = await supabase
            .from('investor_profiles')
            .update(investorData)
            .eq('profile_id', existingProfile.profile_id);
            
          if (updateError) throw updateError;
        } else {
          // Create new profile
          const { error: insertError } = await supabase
            .from('investor_profiles')
            .insert(investorData);
            
          if (insertError) throw insertError;
        }
      }
      
      // Recalculate profile completion after saving
      await calculateCompletion();
      
    } catch (error: any) {
      console.error('Error saving profile data:', error);
      setError(error.message || 'Failed to save your profile data. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Finalize the profile completion process
  const finalizeProfile = async () => {
    await saveCurrentStep();
    
    // Update user progress to mark the profile completion workflow as done
    if (user?.id) {
      try {
        await supabase
          .from('user_progress')
          .update({ 
            profile_completion: completionPercentage
          })
          .eq('user_id', user.id);
          
        // After database migration runs, this will work
        // For now, we'll skip setting these fields
        console.log('Updated profile completion to', completionPercentage);
          
        // Show success message
        setSuccess(true);
        
        // Call onComplete callback if provided
        if (onComplete) {
          setTimeout(() => {
            onComplete();
          }, 1500);
        } else {
          // Default redirect to dashboard
          setTimeout(() => {
            router.push('/dashboard');
          }, 1500);
        }
      } catch (error) {
        console.error('Error finalizing profile:', error);
      }
    }
  };
  
  // Render field based on its type
  const renderField = (field: string) => {
    const fieldLabel = getFieldLabel(field);
    
    // Check if field is an array type
    const isArrayField = Array.isArray(formData[field as keyof typeof formData]);
    
    if (field === 'avatar_url') {
      return (
        <div key={field} className="mb-6">
          <div className="flex items-center justify-between">
            <label htmlFor={field} className="block text-sm font-medium text-gray-300 mb-2">
              {fieldLabel}
            </label>
            <button 
              type="button"
              onClick={() => showHelp(field)}
              className="text-gray-400 hover:text-indigo-300"
              aria-label={`Show help for ${fieldLabel}`}
              title={`Show help for ${fieldLabel}`}
            >
              <InformationCircleIcon className="h-5 w-5" />
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 rounded-full bg-gray-700 overflow-hidden">
              {formData.avatar_url ? (
                <img 
                  src={formData.avatar_url} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <span className="text-3xl">
                    {formData.full_name ? formData.full_name.charAt(0).toUpperCase() : '?'}
                  </span>
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <input
                type="text"
                id={field}
                placeholder="Enter image URL"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                value={formData[field as keyof typeof formData] as string || ''}
                onChange={(e) => handleInputChange(field, e.target.value)}
              />
              <p className="text-xs text-gray-400 mt-1">
                Enter URL to your profile image
              </p>
            </div>
          </div>
        </div>
      );
    } else if (isArrayField) {
      // Handle multi-select fields
      const options = getOptionsForField(field);
      const values = formData[field as keyof typeof formData] as string[];
      
      return (
        <div key={field} className="mb-6">
          <div className="flex items-center justify-between">
            <label htmlFor={field} className="block text-sm font-medium text-gray-300 mb-2">
              {fieldLabel}
            </label>
            <button 
              type="button"
              onClick={() => showHelp(field)}
              className="text-gray-400 hover:text-indigo-300"
              aria-label={`Show help for ${fieldLabel}`}
              title={`Show help for ${fieldLabel}`}
            >
              <InformationCircleIcon className="h-5 w-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            {options.map(option => (
              <div key={option.value} className="flex items-center">
                <input
                  id={`${field}-${option.value}`}
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-700 text-indigo-600 focus:ring-indigo-500"
                  checked={values.includes(option.value)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      handleInputChange(field, [...values, option.value]);
                    } else {
                      handleInputChange(field, values.filter(v => v !== option.value));
                    }
                  }}
                />
                <label
                  htmlFor={`${field}-${option.value}`}
                  className="ml-2 block text-sm text-gray-300"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      );
    } else if (field === 'bio' || field === 'investment_thesis' || field === 'startup_description') {
      // Textarea fields
      return (
        <div key={field} className="mb-6">
          <div className="flex items-center justify-between">
            <label htmlFor={field} className="block text-sm font-medium text-gray-300 mb-2">
              {fieldLabel}
            </label>
            <button 
              type="button"
              onClick={() => showHelp(field)}
              className="text-gray-400 hover:text-indigo-300"
              aria-label={`Show help for ${fieldLabel}`}
              title={`Show help for ${fieldLabel}`}
            >
              <InformationCircleIcon className="h-5 w-5" />
            </button>
          </div>
          
          <textarea
            id={field}
            rows={4}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
            placeholder={`Enter your ${fieldLabel.toLowerCase()}`}
            value={formData[field as keyof typeof formData] as string || ''}
            onChange={(e) => handleInputChange(field, e.target.value)}
          />
        </div>
      );
    } else if (field === 'startup_stage') {
      // Select field
      const options = getOptionsForField(field);
      
      return (
        <div key={field} className="mb-6">
          <div className="flex items-center justify-between">
            <label htmlFor={field} className="block text-sm font-medium text-gray-300 mb-2">
              {fieldLabel}
            </label>
            <button 
              type="button"
              onClick={() => showHelp(field)}
              className="text-gray-400 hover:text-indigo-300"
              aria-label={`Show help for ${fieldLabel}`}
              title={`Show help for ${fieldLabel}`}
            >
              <InformationCircleIcon className="h-5 w-5" />
            </button>
          </div>
          
          <select
            id={field}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
            value={formData[field as keyof typeof formData] as string || ''}
            onChange={(e) => handleInputChange(field, e.target.value)}
          >
            <option value="">Select stage</option>
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      );
    } else {
      // Default input field
      return (
        <div key={field} className="mb-6">
          <div className="flex items-center justify-between">
            <label htmlFor={field} className="block text-sm font-medium text-gray-300 mb-2">
              {fieldLabel}
            </label>
            <button 
              type="button"
              onClick={() => showHelp(field)}
              className="text-gray-400 hover:text-indigo-300"
              aria-label={`Show help for ${fieldLabel}`}
              title={`Show help for ${fieldLabel}`}
            >
              <InformationCircleIcon className="h-5 w-5" />
            </button>
          </div>
          
          <input
            type="text"
            id={field}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
            placeholder={`Enter your ${fieldLabel.toLowerCase()}`}
            value={formData[field as keyof typeof formData] as string || ''}
            onChange={(e) => handleInputChange(field, e.target.value)}
          />
        </div>
      );
    }
  };
  
  // Get user-friendly field label
  const getFieldLabel = (field: string): string => {
    const labels: Record<string, string> = {
      full_name: 'Full Name',
      avatar_url: 'Profile Picture',
      bio: 'Bio',
      linkedin_url: 'LinkedIn URL',
      company_name: 'Company Name',
      company_website: 'Company Website',
      company_logo: 'Company Logo',
      startup_sector: 'Sector',
      startup_stage: 'Stage',
      startup_description: 'Description',
      investment_thesis: 'Investment Thesis',
      investment_stages: 'Investment Stages',
      preferred_industries: 'Preferred Industries'
    };
    
    return labels[field] || field.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };
  
  // Get options for multi-select fields
  const getOptionsForField = (field: string) => {
    switch (field) {
      case 'investment_stages':
        return [
          { value: 'pre-seed', label: 'Pre-seed' },
          { value: 'seed', label: 'Seed' },
          { value: 'early-stage', label: 'Early Stage (Series A)' },
          { value: 'growth', label: 'Growth (Series B+)' },
          { value: 'late-stage', label: 'Late Stage' },
          { value: 'pre-ipo', label: 'Pre-IPO' }
        ];
      case 'preferred_industries':
        return [
          { value: 'software', label: 'Software' },
          { value: 'fintech', label: 'Fintech' },
          { value: 'healthtech', label: 'Healthtech' },
          { value: 'ai', label: 'AI / ML' },
          { value: 'cleantech', label: 'Cleantech' },
          { value: 'edtech', label: 'Edtech' },
          { value: 'hardware', label: 'Hardware' },
          { value: 'ecommerce', label: 'E-commerce' },
          { value: 'saas', label: 'SaaS' },
          { value: 'mobility', label: 'Mobility' }
        ];
      case 'startup_stage':
        return [
          { value: 'ideation', label: 'Ideation' },
          { value: 'mvp', label: 'MVP' },
          { value: 'pre-revenue', label: 'Pre-revenue' },
          { value: 'revenue', label: 'Revenue' },
          { value: 'scaling', label: 'Scaling' },
          { value: 'profitable', label: 'Profitable' }
        ];
      case 'startup_sector':
        return [
          { value: 'software', label: 'Software' },
          { value: 'finance', label: 'Finance' },
          { value: 'healthcare', label: 'Healthcare' },
          { value: 'education', label: 'Education' },
          { value: 'energy', label: 'Energy' },
          { value: 'retail', label: 'Retail' },
          { value: 'manufacturing', label: 'Manufacturing' },
          { value: 'agriculture', label: 'Agriculture' },
          { value: 'transportation', label: 'Transportation' }
        ];
      default:
        return [];
    }
  };
  
  // If no steps available yet, show loading
  if (steps.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }
  
  // Show success state when complete
  if (success) {
    return (
      <div className="text-center py-12">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <CheckCircleIcon className="mx-auto h-20 w-20 text-green-500" />
        </motion.div>
        <h2 className="mt-6 text-2xl font-bold text-white">Profile Completed!</h2>
        <p className="mt-2 text-gray-300">
          Your profile is now complete. You'll be redirected to your dashboard shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Profile completion progress */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-bold text-white">Complete Your Profile</h2>
          <span className="text-sm text-indigo-300">{completionPercentage}% Complete</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-indigo-500 h-2 rounded-full transition-all duration-500" 
            style={{ width: `${completionPercentage}%` }}
            role="progressbar" 
            aria-label="Profile completion progress"
          >
            <span className="sr-only">{completionPercentage}% complete</span>
          </div>
        </div>
      </div>
      
      {/* Wizard steps navigation */}
      <div className="flex items-center mb-8 overflow-x-auto pb-2">
        {steps.map((step, index) => (
          <button
            key={step.id}
            onClick={() => setCurrentStep(index)}
            disabled={loading}
            className={`flex flex-col items-center mr-4 px-4 py-2 rounded-lg transition-colors duration-200 min-w-[80px] ${
              index === currentStep
                ? 'bg-indigo-600 text-white'
                : index < currentStep
                ? 'bg-indigo-900 text-indigo-300'
                : 'bg-gray-800 text-gray-400'
            }`}
          >
            <span className="text-sm font-medium">{index + 1}</span>
            <span className="text-xs mt-1 whitespace-nowrap">{step.title}</span>
          </button>
        ))}
      </div>
      
      {/* Current step content */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg mb-8">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-white mb-2">{currentStepData.title}</h3>
          <p className="text-gray-300">{currentStepData.description}</p>
        </div>
        
        {/* Error message */}
        {error && (
          <div className="mb-6 bg-red-900/30 border border-red-500 text-red-300 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}
        
        {/* Help tip */}
        <AnimatePresence>
          {helpTip && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 bg-indigo-900/30 border border-indigo-500 text-indigo-300 px-4 py-3 rounded-lg"
            >
              <div className="flex">
                <InformationCircleIcon className="h-5 w-5 mr-2 flex-shrink-0" />
                <span>{helpTip}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Fields for current step */}
        {currentStepData.fields.map(field => renderField(field))}
        
        {/* Navigation buttons */}
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentStep === 0 || loading}
            className={`px-4 py-2 rounded-lg flex items-center ${
              currentStep === 0
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-gray-700 text-white hover:bg-gray-600'
            }`}
          >
            <ChevronLeftIcon className="h-5 w-5 mr-1" />
            Previous
          </button>
          
          <button
            type="button"
            onClick={handleNext}
            disabled={loading || !isCurrentStepComplete()}
            className={`px-4 py-2 rounded-lg flex items-center ${
              loading
                ? 'bg-indigo-700 text-indigo-300 cursor-wait'
                : !isCurrentStepComplete()
                ? 'bg-indigo-700 text-indigo-300 cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-500'
            }`}
          >
            {loading ? (
              <span className="mr-2">
                <div className="animate-spin h-4 w-4 border-2 border-indigo-300 border-t-transparent rounded-full"></div>
              </span>
            ) : null}
            {currentStep < steps.length - 1 ? (
              <>
                Next
                <ChevronRightIcon className="h-5 w-5 ml-1" />
              </>
            ) : (
              'Complete Profile'
            )}
          </button>
        </div>
      </div>
      
      {/* Skip option if user has some progress already */}
      {hasProgress && (
        <div className="text-center mb-8">
          <button
            type="button"
            onClick={() => router.push('/dashboard')}
            className="text-gray-400 hover:text-indigo-300 text-sm"
          >
            Complete this later
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileWizard; 