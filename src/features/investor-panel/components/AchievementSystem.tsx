'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Define achievement types
interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  progress?: number; // For achievements with progress (e.g. 3/5)
  maxProgress?: number;
  category: 'pitch' | 'feedback' | 'funding' | 'special';
  xpReward: number;
  dateUnlocked?: string;
}

// New interface for achievement notifications
interface AchievementNotification {
  achievement: Achievement;
  id: string; // Unique id for the notification
}

// Achievement icons
const AchievementIcons = {
  Pitch: (
    <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  ),
  Star: (
    <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  ),
  Money: (
    <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Trophy: (
    <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  )
};

// Sample achievements data
const sampleAchievements = [
  {
    id: 'first-pitch',
    title: 'First Pitch',
    description: 'Create your first pitch',
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
    </svg>,
    unlocked: true,
    category: 'pitch',
    xpReward: 25
  },
  {
    id: 'pitch-master',
    title: 'Pitch Master',
    description: 'Create 5 successful pitches',
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>,
    unlocked: false,
    progress: 1,
    maxProgress: 5,
    category: 'pitch',
    xpReward: 100
  },
  {
    id: 'feedback-collector',
    title: 'Feedback Collector',
    description: 'Receive feedback from 3 different investors',
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
    </svg>,
    unlocked: false,
    progress: 1,
    maxProgress: 3,
    category: 'feedback',
    xpReward: 50
  },
  {
    id: 'high-scorer',
    title: 'High Scorer',
    description: 'Get a pitch score of 4.5 or higher',
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>,
    unlocked: false,
    category: 'pitch',
    xpReward: 75
  },
  {
    id: 'validation-champion',
    title: 'Validation Champion',
    description: 'Complete the validation stage',
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>,
    unlocked: false,
    category: 'pitch',
    xpReward: 100
  },
  // New funding-related achievements
  {
    id: 'discover-early-funding',
    title: 'Early Bird',
    description: 'Discovered your first pre-seed funding opportunity',
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>,
    unlocked: false,
    category: 'funding',
    xpReward: 50
  },
  {
    id: 'impact-investor',
    title: 'Impact Champion',
    description: 'Matched with an impact-focused investor',
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>,
    unlocked: false,
    category: 'funding',
    xpReward: 75
  },
  {
    id: 'grant-master',
    title: 'Grant Master',
    description: 'Unlock 3 different grant opportunities',
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>,
    unlocked: false,
    progress: 0,
    maxProgress: 3,
    category: 'funding',
    xpReward: 100
  },
  {
    id: 'funding-explorer',
    title: 'Funding Explorer',
    description: 'View 10 different funding opportunities',
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
    </svg>,
    unlocked: false,
    progress: 2,
    maxProgress: 10,
    category: 'funding',
    xpReward: 50
  },
  {
    id: 'accelerator-accepted',
    title: 'Accelerator Ready',
    description: 'Qualify for an accelerator program',
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>,
    unlocked: false,
    category: 'funding',
    xpReward: 150
  }
];

// Level rewards data
const levelRewards = [
  {
    level: 2,
    reward: 'Unlock Pitch Templates'
  },
  {
    level: 3,
    reward: 'Access to Angel Investor Network'
  },
  {
    level: 4,
    reward: 'Personalized Funding Recommendations'
  },
  {
    level: 5,
    reward: 'Exclusive Accelerator Application Guides'
  },
  {
    level: 6,
    reward: 'Venture Capital Pitching Masterclass'
  }
];

interface AchievementSystemProps {
  currentLevel: number;
  xpPoints: number;
  onClose: () => void;
}

const AchievementSystem: React.FC<AchievementSystemProps> = ({ 
  currentLevel = 1,
  xpPoints = 150,
  onClose
}) => {
  const [achievements, setAchievements] = useState<Achievement[]>(sampleAchievements as Achievement[]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [notifications, setNotifications] = useState<AchievementNotification[]>([]);
  const [showRecent, setShowRecent] = useState<boolean>(false);
  
  // Filter achievements by category
  const filteredAchievements = selectedCategory === 'all' 
    ? achievements 
    : achievements.filter(a => a.category === selectedCategory);
  
  // Get recently unlocked achievements (last 7 days)
  const recentAchievements = achievements.filter(a => 
    a.unlocked && a.dateUnlocked && 
    new Date(a.dateUnlocked) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  );
  
  // Calculate XP needed for next level (simple formula: level * 100)
  const xpForNextLevel = currentLevel * 100;
  const xpProgress = (xpPoints / xpForNextLevel) * 100;
  
  // Next level reward
  const nextLevelReward = levelRewards.find(r => r.level === currentLevel + 1)?.reward || 'Max level reached';
  
  // Function to add a notification
  const addNotification = (achievement: Achievement) => {
    const notificationId = `notification-${Date.now()}-${achievement.id}`;
    setNotifications(prev => [...prev, { achievement, id: notificationId }]);
    
    // Auto-remove notification after 4 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notificationId));
    }, 4000);
  };
  
  // Function to unlock an achievement
  const unlockAchievement = (achievementId: string) => {
    const achievement = achievements.find(a => a.id === achievementId && !a.unlocked);
    if (achievement) {
      // Update the achievement with unlock date
      const updatedAchievement = { 
        ...achievement, 
        unlocked: true,
        dateUnlocked: new Date().toISOString()
      };
      
      // Update achievements list
      setAchievements(prev => 
        prev.map(a => a.id === achievementId ? updatedAchievement : a)
      );
      
      // Show notification
      addNotification(updatedAchievement);
    }
  };
  
  // Simulate unlocking a new achievement after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      // Find first locked achievement
      const lockedAchievement = achievements.find(a => !a.unlocked);
      if (lockedAchievement) {
        unlockAchievement(lockedAchievement.id);
      }
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <motion.div 
        className="relative w-full max-w-2xl max-h-[80vh] bg-gray-900 rounded-xl border border-gray-700 shadow-2xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
          aria-label="Close achievements panel"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Dutch Funding Expert</h2>
            
            {/* Recent achievements toggle */}
            {recentAchievements.length > 0 && (
              <button 
                onClick={() => setShowRecent(!showRecent)}
                className="flex items-center gap-1 px-2 py-1 bg-indigo-800/50 hover:bg-indigo-800/70 rounded text-xs text-indigo-200 border border-indigo-700/50"
              >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3.586l2.707 2.707a1 1 0 01-1.414 1.414l-3-3A1 1 0 019 10V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Recent
                <span className="inline-flex items-center justify-center w-4 h-4 ml-1 bg-indigo-700 rounded-full text-[10px]">
                  {recentAchievements.length}
                </span>
              </button>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            {/* Level indicator */}
            <div className="flex flex-col items-center justify-center h-16 w-16 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-lg text-white font-bold">
              <span className="text-xs uppercase opacity-70">Level</span>
              <span className="text-2xl">{currentLevel}</span>
            </div>
            
            {/* XP progress */}
            <div className="flex-1">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-blue-300">{xpPoints} XP</span>
                <span className="text-gray-400">{xpForNextLevel} XP</span>
              </div>
              <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
                  style={{ width: `${xpProgress}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                {xpForNextLevel - xpPoints} XP until level {currentLevel + 1}
              </p>
            </div>
          </div>
          
          {/* Next level reward */}
          <div className="mt-4 p-2 bg-indigo-950/50 rounded-md border border-indigo-900">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-xs font-medium text-yellow-300">Level {currentLevel + 1} Reward:</span>
            </div>
            <p className="text-xs text-gray-300 ml-6 mt-1">{nextLevelReward}</p>
          </div>
        </div>
        
        {/* Recent achievements panel */}
        <AnimatePresence>
          {showRecent && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden bg-indigo-950/30 border-b border-indigo-900"
            >
              <div className="p-3">
                <h3 className="text-sm font-medium text-blue-300 mb-2">Recently Unlocked</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {recentAchievements.map(achievement => (
                    <div 
                      key={`recent-${achievement.id}`}
                      className="flex items-center gap-2 p-2 bg-indigo-900/20 rounded border border-indigo-900/30"
                    >
                      <div className={`h-8 w-8 rounded flex items-center justify-center ${
                        achievement.category === 'pitch' ? 'bg-blue-900/50 text-blue-400' :
                        achievement.category === 'feedback' ? 'bg-amber-900/50 text-amber-400' :
                        achievement.category === 'funding' ? 'bg-green-900/50 text-green-400' :
                                                         'bg-purple-900/50 text-purple-400'
                      }`}>
                        {achievement.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-medium text-white truncate">{achievement.title}</h4>
                        <p className="text-xs text-gray-400 truncate">{achievement.description}</p>
                      </div>
                      <span className="text-xs text-blue-300 whitespace-nowrap">+{achievement.xpReward} XP</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Category filter */}
        <div className="flex p-4 border-b border-gray-800 overflow-x-auto">
          <button
            className={`px-3 py-1 rounded-full text-xs font-medium mr-2 whitespace-nowrap ${
              selectedCategory === 'all' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-gray-300'
            }`}
            onClick={() => setSelectedCategory('all')}
          >
            All Achievements
          </button>
          <button
            className={`px-3 py-1 rounded-full text-xs font-medium mr-2 whitespace-nowrap ${
              selectedCategory === 'pitch' ? 'bg-blue-900/70 text-blue-300' : 'text-gray-400 hover:text-gray-300'
            }`}
            onClick={() => setSelectedCategory('pitch')}
          >
            Pitch Mastery
          </button>
          <button
            className={`px-3 py-1 rounded-full text-xs font-medium mr-2 whitespace-nowrap ${
              selectedCategory === 'feedback' ? 'bg-amber-900/70 text-amber-300' : 'text-gray-400 hover:text-gray-300'
            }`}
            onClick={() => setSelectedCategory('feedback')}
          >
            Investor Feedback
          </button>
          <button
            className={`px-3 py-1 rounded-full text-xs font-medium mr-2 whitespace-nowrap ${
              selectedCategory === 'funding' ? 'bg-green-900/70 text-green-300' : 'text-gray-400 hover:text-gray-300'
            }`}
            onClick={() => setSelectedCategory('funding')}
          >
            Funding Matches
          </button>
          <button
            className={`px-3 py-1 rounded-full text-xs font-medium mr-2 whitespace-nowrap ${
              selectedCategory === 'special' ? 'bg-purple-900/70 text-purple-300' : 'text-gray-400 hover:text-gray-300'
            }`}
            onClick={() => setSelectedCategory('special')}
          >
            Special
          </button>
        </div>
        
        {/* Achievements list */}
        <div className="p-4 max-h-[300px] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredAchievements.map(achievement => (
              <div 
                key={achievement.id}
                className={`p-3 rounded-lg border ${
                  achievement.unlocked 
                    ? 'bg-gray-800/70 border-gray-700' 
                    : 'bg-gray-900/50 border-gray-800 opacity-70'
                }`}
              >
                <div className="flex gap-3">
                  <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                    achievement.unlocked 
                      ? achievement.category === 'pitch' ? 'bg-blue-900/50 text-blue-400' :
                        achievement.category === 'feedback' ? 'bg-amber-900/50 text-amber-400' :
                        achievement.category === 'funding' ? 'bg-green-900/50 text-green-400' :
                                                         'bg-purple-900/50 text-purple-400'
                      : 'bg-gray-800 text-gray-500'
                  }`}>
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className={`text-sm font-medium ${achievement.unlocked ? 'text-white' : 'text-gray-500'}`}>
                        {achievement.title}
                      </h3>
                      {achievement.unlocked && (
                        <span className="bg-blue-900/30 text-blue-400 px-2 py-0.5 rounded text-xs">
                          +{achievement.xpReward} XP
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">{achievement.description}</p>
                    
                    {achievement.progress !== undefined && achievement.maxProgress !== undefined && (
                      <div className="mt-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-500">Progress</span>
                          <span className="text-gray-500">
                            {achievement.progress}/{achievement.maxProgress}
                          </span>
                        </div>
                        <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${
                              achievement.unlocked 
                                ? 'bg-blue-500' 
                                : 'bg-gray-700'
                            }`}
                            style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                    
                    {/* Unlock date for unlocked achievements */}
                    {achievement.unlocked && achievement.dateUnlocked && (
                      <p className="text-[10px] text-gray-600 mt-1">
                        Unlocked: {new Date(achievement.dateUnlocked).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
      
      {/* Achievement notifications */}
      <div className="fixed top-10 right-10 z-50 space-y-3 pointer-events-none">
        <AnimatePresence>
          {notifications.map(({ achievement, id }) => (
            <motion.div 
              key={id}
              className="bg-gradient-to-r from-indigo-900 to-blue-900 p-4 rounded-lg border border-blue-700 shadow-lg max-w-md"
              initial={{ y: -50, opacity: 0, x: 50 }}
              animate={{ y: 0, opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            >
              <div className="flex gap-3 items-start">
                <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${
                  achievement.category === 'pitch' ? 'bg-blue-800 text-blue-300' :
                  achievement.category === 'feedback' ? 'bg-amber-800 text-amber-300' :
                  achievement.category === 'funding' ? 'bg-green-800 text-green-300' :
                                                'bg-purple-800 text-purple-300'
                }`}>
                  {achievement.icon}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-bold text-white">Achievement Unlocked!</h3>
                    <div className="px-2 py-0.5 bg-blue-800 text-blue-300 rounded text-xs">
                      +{achievement.xpReward} XP
                    </div>
                  </div>
                  <p className="text-yellow-300 font-medium mb-1">{achievement.title}</p>
                  <p className="text-sm text-gray-300">{achievement.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AchievementSystem; 