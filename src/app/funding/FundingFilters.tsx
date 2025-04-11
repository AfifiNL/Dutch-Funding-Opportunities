import React, { useState } from 'react';
import { FundingFilter } from '@/types/funding';

interface FundingFiltersProps {
  onFilterChange: (filters: Partial<FundingFilter>) => void;
}

export default function FundingFilters({ onFilterChange }: FundingFiltersProps) {
  const [filters, setFilters] = useState<Partial<FundingFilter>>({
    type: [],
    industry: [],
    stage: [],
    location: [],
  });

  // Handle checkbox changes for array-based filters
  const handleCheckboxChange = (filterType: keyof FundingFilter, value: string) => {
    setFilters(prev => {
      const currentValues = prev[filterType] as string[] || [];
      let newValues: string[];
      
      if (currentValues.includes(value)) {
        newValues = currentValues.filter(v => v !== value);
      } else {
        newValues = [...currentValues, value];
      }
      
      const updatedFilters = { ...prev, [filterType]: newValues };
      onFilterChange(updatedFilters);
      return updatedFilters;
    });
  };

  // Available filter options
  const fundingTypes = [
    { id: 'grant', label: 'Grants' },
    { id: 'venture_capital', label: 'Venture Capital' },
    { id: 'angel', label: 'Angel Investment' },
    { id: 'loan', label: 'Loans' },
    { id: 'subsidy', label: 'Subsidies' },
    { id: 'other', label: 'Other' },
  ];
  
  const industries = [
    { id: 'technology', label: 'Technology' },
    { id: 'healthcare', label: 'Healthcare' },
    { id: 'energy', label: 'Energy' },
    { id: 'fintech', label: 'Fintech' },
    { id: 'agritech', label: 'AgriTech' },
    { id: 'education', label: 'Education' },
    { id: 'sustainability', label: 'Sustainability' },
  ];
  
  const stages = [
    { id: 'idea', label: 'Idea Stage' },
    { id: 'pre_seed', label: 'Pre-Seed' },
    { id: 'seed', label: 'Seed' },
    { id: 'series_a', label: 'Series A' },
    { id: 'series_b', label: 'Series B+' },
    { id: 'growth', label: 'Growth' },
  ];
  
  const locations = [
    { id: 'amsterdam', label: 'Amsterdam' },
    { id: 'rotterdam', label: 'Rotterdam' },
    { id: 'utrecht', label: 'Utrecht' },
    { id: 'eindhoven', label: 'Eindhoven' },
    { id: 'nationwide', label: 'Nationwide' },
    { id: 'eu', label: 'EU-wide' },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Filters</h2>
      
      <div className="space-y-6">
        {/* Funding Type Filter */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-2">Funding Type</h3>
          <div className="space-y-2">
            {fundingTypes.map(type => (
              <div key={type.id} className="flex items-center">
                <input
                  id={`type-${type.id}`}
                  name={`type-${type.id}`}
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  checked={(filters.type || []).includes(type.id)}
                  onChange={() => handleCheckboxChange('type', type.id)}
                />
                <label htmlFor={`type-${type.id}`} className="ml-2 text-sm text-gray-700">
                  {type.label}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Industry Filter */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-2">Industry</h3>
          <div className="space-y-2">
            {industries.map(industry => (
              <div key={industry.id} className="flex items-center">
                <input
                  id={`industry-${industry.id}`}
                  name={`industry-${industry.id}`}
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  checked={(filters.industry || []).includes(industry.id)}
                  onChange={() => handleCheckboxChange('industry', industry.id)}
                />
                <label htmlFor={`industry-${industry.id}`} className="ml-2 text-sm text-gray-700">
                  {industry.label}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Stage Filter */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-2">Startup Stage</h3>
          <div className="space-y-2">
            {stages.map(stage => (
              <div key={stage.id} className="flex items-center">
                <input
                  id={`stage-${stage.id}`}
                  name={`stage-${stage.id}`}
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  checked={(filters.stage || []).includes(stage.id)}
                  onChange={() => handleCheckboxChange('stage', stage.id)}
                />
                <label htmlFor={`stage-${stage.id}`} className="ml-2 text-sm text-gray-700">
                  {stage.label}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Location Filter */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-2">Location</h3>
          <div className="space-y-2">
            {locations.map(location => (
              <div key={location.id} className="flex items-center">
                <input
                  id={`location-${location.id}`}
                  name={`location-${location.id}`}
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  checked={(filters.location || []).includes(location.id)}
                  onChange={() => handleCheckboxChange('location', location.id)}
                />
                <label htmlFor={`location-${location.id}`} className="ml-2 text-sm text-gray-700">
                  {location.label}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Reset Filters Button */}
        <button
          type="button"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          onClick={() => {
            const resetFilters = {
              type: [],
              industry: [],
              stage: [],
              location: [],
            };
            setFilters(resetFilters);
            onFilterChange(resetFilters);
          }}
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}