'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FeedbackType } from '../types';
import { Feedback } from '@/api/pitch';

// Define pitch components for each stage
const pitchComponentsByStage: Record<number, { id: string; title: string; description: string }[]> = {
  0: [ // Ideation
    { 
      id: 'value-proposition', 
      title: 'Value Proposition', 
      description: 'Clearly articulate the unique value your product or service provides to customers.'
    },
    { 
      id: 'target-market', 
      title: 'Target Market', 
      description: 'Define your specific customer segments and estimate the market size.'
    },
    { 
      id: 'business-model', 
      title: 'Business Model', 
      description: 'Explain how your business will generate revenue and the pricing strategy.'
    },
    { 
      id: 'problem-solution', 
      title: 'Problem & Solution', 
      description: "Describe the problem you're solving and how your solution addresses it."
    }
  ],
  1: [ // Validation
    { 
      id: 'customer-interviews', 
      title: 'Customer Validation', 
      description: 'Summarize feedback from potential customers and how it shaped your concept.'
    },
    { 
      id: 'prototype-results', 
      title: 'Prototype Results', 
      description: 'Share results and learnings from early prototypes or MVPs.'
    },
    { 
      id: 'market-research', 
      title: 'Market Research', 
      description: 'Present findings from competitor analysis and market research.'
    },
    { 
      id: 'early-traction', 
      title: 'Early Traction', 
      description: 'Highlight any early adopters, LOIs, or pre-orders.'
    }
  ],
  2: [ // Seed Funding
    { 
      id: 'mvp-roadmap', 
      title: 'Product Roadmap', 
      description: 'Detail your MVP features and development timeline.'
    },
    { 
      id: 'traction-metrics', 
      title: 'Traction Metrics', 
      description: 'Share key performance indicators and early user/revenue data.'
    },
    { 
      id: 'funding-allocation', 
      title: 'Funding Allocation', 
      description: 'Break down how the requested funding will be used.'
    },
    { 
      id: 'team-overview', 
      title: 'Team Overview', 
      description: 'Present the founding team and key advisors with relevant expertise.'
    }
  ],
  3: [ // Growth
    { 
      id: 'growth-metrics', 
      title: 'Growth Metrics', 
      description: 'Showcase key growth metrics and KPIs over time.'
    },
    { 
      id: 'acquisition-strategy', 
      title: 'Acquisition Strategy', 
      description: 'Detail your customer acquisition channels and costs.'
    },
    { 
      id: 'revenue-projections', 
      title: 'Revenue Model', 
      description: 'Present revenue projections and unit economics.'
    },
    { 
      id: 'scaling-challenges', 
      title: 'Scaling Strategy', 
      description: 'Address potential challenges and how you plan to overcome them.'
    }
  ],
  4: [ // Expansion
    { 
      id: 'expansion-strategy', 
      title: 'International Expansion', 
      description: 'Detail your plans for entering new markets or territories.'
    },
    { 
      id: 'team-scaling', 
      title: 'Team Scaling', 
      description: 'Present your organizational structure and hiring plans.'
    },
    { 
      id: 'long-term-vision', 
      title: 'Long-term Vision', 
      description: 'Share your 5-year vision and potential exit strategies.'
    },
    { 
      id: 'investment-returns', 
      title: 'Investment Returns', 
      description: 'Outline the potential ROI for investors.'
    }
  ]
};

// Star rating component
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg 
          key={star} 
          className={`w-4 h-4 ${star <= rating ? 'text-amber-400' : 'text-gray-600'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

interface PitchBuilderProps {
  currentStage: number;
  existingFeedback?: Feedback[];
  onSubmitPitch: (data: Record<string, string>) => void;
  isSubmitting?: boolean;
  savedPitchData?: Record<string, string>;
  isFinalStage?: boolean;
}

const PitchBuilder: React.FC<PitchBuilderProps> = ({
  currentStage,
  existingFeedback,
  onSubmitPitch,
  isSubmitting = false,
  savedPitchData = {},
  isFinalStage = false
}) => {
  // Fields for each stage
  const stageFields = {
    0: [ // Ideation
      { id: 'value_proposition', label: 'Value Proposition', placeholder: 'What problem does your product solve? How is it unique?' },
      { id: 'target_market', label: 'Target Market', placeholder: 'Who are your users or customers? How large is this market?' },
      { id: 'business_model', label: 'Business Model', placeholder: 'How will you make money? What\'s your pricing strategy?' }
    ],
    1: [ // Validation
      { id: 'problem_validation', label: 'Problem Validation', placeholder: 'How have you validated the problem exists? Share customer insights.' },
      { id: 'solution_validation', label: 'Solution Validation', placeholder: 'What prototypes have you tested? Share results.' },
      { id: 'market_research', label: 'Market Research', placeholder: 'What market research have you conducted? Share key findings.' }
    ],
    2: [ // Seed Funding
      { id: 'traction_metrics', label: 'Traction Metrics', placeholder: 'What traction metrics can you share? (Users, revenue, growth)' },
      { id: 'mvp_roadmap', label: 'MVP Development', placeholder: 'What\'s your MVP roadmap and timeline?' },
      { id: 'funding_use', label: 'Use of Funds', placeholder: 'How will you use the seed funding?' }
    ],
    3: [ // Growth
      { id: 'growth_strategy', label: 'Growth Strategy', placeholder: 'What is your strategy for scaling the business?' },
      { id: 'financials', label: 'Financial Projections', placeholder: 'Share revenue projections and unit economics.' },
      { id: 'competitive_advantage', label: 'Competitive Advantage', placeholder: 'What is your sustainable competitive advantage?' }
    ],
    4: [ // Expansion
      { id: 'expansion_plan', label: 'Expansion Plan', placeholder: 'How do you plan to expand to new markets or products?' },
      { id: 'team_scaling', label: 'Team Scaling', placeholder: 'What is your plan for growing your team and organization?' },
      { id: 'long_term_vision', label: 'Long-term Vision', placeholder: 'What is your 5-year vision for the company?' }
    ]
  };
  
  // Get the fields for the current stage
  const currentFields = stageFields[currentStage as keyof typeof stageFields] || [];
  
  // State for form values
  const [formValues, setFormValues] = useState<Record<string, string>>(() => {
    // Initialize with empty values for all fields
    const initialValues: Record<string, string> = {};
    currentFields.forEach(field => {
      // Use saved data if available, otherwise empty string
      initialValues[field.id] = savedPitchData[field.id] || '';
    });
    return initialValues;
  });
  
  // Update form values when currentStage or savedPitchData changes
  useEffect(() => {
    const updatedValues: Record<string, string> = {};
    currentFields.forEach(field => {
      // Preserve existing values if possible, use saved data as fallback, or empty string
      updatedValues[field.id] = savedPitchData[field.id] || '';
    });
    setFormValues(updatedValues);
  }, [currentStage, savedPitchData]);
  
  // Handle input changes
  const handleInputChange = (fieldId: string, value: string) => {
    setFormValues(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitPitch(formValues);
  };
  
  // Calculate form completeness (%)
  const calculateCompleteness = () => {
    const totalFields = currentFields.length;
    if (totalFields === 0) return 0;
    
    const filledFields = currentFields.filter(field => 
      formValues[field.id] && formValues[field.id].length > 10
    ).length;
    
    return Math.round((filledFields / totalFields) * 100);
  };
  
  const completeness = calculateCompleteness();
  
  return (
    <div>
      {/* Stage title and completeness */}
      <div className="mb-5 flex justify-between items-center">
        <h3 className="text-lg font-medium text-white">
          {getStageName(currentStage)} Pitch
        </h3>
        <div className="flex items-center text-sm">
          <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden mr-2">
            <div 
              className={`h-full ${getCompletenessColor(completeness)}`}
              style={{ width: `${completeness}%` }}
            />
          </div>
          <span className="text-gray-400">{completeness}%</span>
        </div>
      </div>
      
      {/* Feedback section if available */}
      {existingFeedback && existingFeedback.length > 0 && (
        <div className="mb-5 bg-gray-800/50 p-3 rounded-lg border border-gray-700">
          <h4 className="text-sm font-medium text-white mb-2">Previous Feedback</h4>
          <div className="space-y-2">
            {existingFeedback.filter(f => f.stage === currentStage).map(feedback => (
              <div key={feedback.id} className="text-xs text-gray-300 p-2 bg-gray-800 rounded">
                <div className="flex justify-between mb-1">
                  <span className="text-blue-400">{feedback.reviewerName || 'Anonymous Investor'}</span>
                  <span className="text-gray-500">
                    {new Date(feedback.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p>{feedback.message}</p>
              </div>
            ))}
            {existingFeedback.filter(f => f.stage === currentStage).length === 0 && (
              <p className="text-sm text-gray-500 italic">
                No feedback yet for this stage. Submit your pitch to receive investor feedback.
              </p>
            )}
          </div>
        </div>
      )}
      
      {/* Pitch form */}
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {currentFields.map(field => (
            <div key={field.id}>
              <label htmlFor={field.id} className="block text-sm font-medium text-gray-300 mb-1">
                {field.label}
              </label>
              <textarea
                id={field.id}
                value={formValues[field.id]}
                onChange={e => handleInputChange(field.id, e.target.value)}
                placeholder={field.placeholder}
                rows={3}
                className="w-full bg-gray-800 border border-gray-700 rounded-md text-gray-200 text-sm p-2.5 focus:ring-blue-500 focus:border-blue-500"
              />
              {formValues[field.id] && formValues[field.id].length < 10 && (
                <p className="mt-1 text-xs text-orange-400">
                  Please provide more details (at least 10 characters)
                </p>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-5">
          <button
            type="submit"
            disabled={isSubmitting || completeness < 50}
            className={`w-full py-2.5 rounded-md text-sm font-medium ${
              isSubmitting || completeness < 50
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isSubmitting 
              ? 'Submitting...' 
              : isFinalStage 
                ? 'Complete Funding Journey' 
                : 'Continue to Next Stage'}
          </button>
          {completeness < 50 && (
            <p className="text-xs text-gray-500 text-center mt-2">
              Please complete at least 50% of the pitch before submitting
            </p>
          )}
          <div className="mt-3 flex justify-center">
            <div className="flex space-x-1 items-center">
              {[0, 1, 2, 3, 4].map((stage) => (
                <div 
                  key={stage}
                  className={`w-2 h-2 rounded-full ${
                    stage < currentStage 
                      ? 'bg-blue-500' 
                      : stage === currentStage 
                        ? 'bg-teal-400' 
                        : 'bg-gray-600'
                  }`}
                />
              ))}
              <span className="ml-2 text-xs text-gray-400">
                Stage {currentStage + 1} of 5
              </span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

function getStageName(stageId: number): string {
  const stageNames = [
    'Ideation',
    'Validation',
    'Seed Funding',
    'Growth',
    'Expansion'
  ];
  
  return stageNames[stageId] || 'Unknown Stage';
}

function getCompletenessColor(percentage: number): string {
  if (percentage < 33) return 'bg-red-500';
  if (percentage < 66) return 'bg-yellow-500';
  return 'bg-green-500';
}

export default PitchBuilder; 