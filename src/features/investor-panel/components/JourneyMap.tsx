'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface StageType {
  id: number;
  name: string;
  description: string;
}

interface JourneyMapProps {
  stages: StageType[];
  activeStage: number;
  onStageSelect: (stageId: number) => void;
  completedStages?: number[];
}

const JourneyMap: React.FC<JourneyMapProps> = ({ 
  stages, 
  activeStage, 
  onStageSelect,
  completedStages = []
}) => {
  return (
    <div className="relative">
      {/* Vertical line connecting all stages */}
      <div className="absolute left-4 top-6 bottom-6 w-0.5 bg-gray-700"></div>
      
      {/* Stages list */}
      <div className="space-y-8 relative">
        {stages.map((stage, index) => {
          const isActive = stage.id === activeStage;
          const isPast = stage.id < activeStage;
          const isCompleted = completedStages.includes(stage.id);
          
          return (
            <motion.div 
              key={stage.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`relative pl-10 cursor-pointer group ${isActive ? '' : 'opacity-70 hover:opacity-100'}`}
              onClick={() => onStageSelect(stage.id)}
            >
              {/* Stage dot */}
              <motion.div 
                className={`absolute left-0 top-1 h-8 w-8 rounded-full flex items-center justify-center z-10 border-2 transition-colors duration-300
                  ${isActive 
                    ? 'bg-blue-600 border-blue-400' 
                    : isCompleted 
                      ? 'bg-green-600 border-green-400' 
                      : 'bg-gray-800 border-gray-700 group-hover:border-gray-500'
                  }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-sm font-medium text-white">{stage.id + 1}</span>
                
                {/* Completed check mark */}
                {isCompleted && (
                  <motion.svg 
                    className="absolute h-3 w-3 text-green-300" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </motion.svg>
                )}
              </motion.div>
              
              {/* Stage content */}
              <div>
                <h4 className={`font-medium text-sm mb-1 transition-colors duration-300
                  ${isActive ? 'text-blue-400' : isCompleted ? 'text-green-400' : 'text-gray-400 group-hover:text-gray-300'}`}
                >
                  {stage.name}
                </h4>
                <p className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors duration-300">
                  {stage.description}
                </p>
              </div>
              
              {/* Active indicator */}
              {isActive && (
                <motion.div 
                  className="absolute -right-1 top-1/2 transform -translate-y-1/2 h-5 w-1.5 bg-blue-500 rounded-full"
                  layoutId="activeIndicator"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </motion.div>
          );
        })}
      </div>
      
      {/* Progress percentage */}
      <div className="mt-6 flex items-center justify-between text-xs text-gray-500">
        <span>Progress</span>
        <span>{Math.round((completedStages.length / stages.length) * 100)}%</span>
      </div>
      
      {/* Progress bar */}
      <div className="mt-2 h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-to-r from-blue-600 to-teal-500"
          initial={{ width: 0 }}
          animate={{ width: `${(completedStages.length / stages.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
};

export default JourneyMap; 