'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CharacterAvatar from './CharacterAvatar';
import CharacterDialogue from './CharacterDialogue';
import { useCharacterBehavior } from '../hooks/useCharacterBehavior';
import { FundingChallenge } from '../data/characterDialogues';

interface GameOverlayProps {
  level: number;
  points: number;
  achievementsUnlocked: number;
  totalAchievements: number;
  activeChallenge: FundingChallenge | null;
  isExpanded: boolean;
}

const GameOverlay = ({ level, points, achievementsUnlocked, totalAchievements, activeChallenge, isExpanded }: GameOverlayProps) => {
  if (!isExpanded) return null;
  
  // Calculate level progress percentage
  const progressPercentage = (points % 100) / 100 * 100;
  
  return (
    <motion.div 
      className="absolute -top-24 left-0 transform -translate-x-0 bg-gradient-to-br from-gray-900/95 to-indigo-900/95 text-white text-xs rounded-lg border border-blue-500/30 p-3 w-72 backdrop-blur-sm shadow-xl"
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center text-xs font-bold">
            {level}
          </div>
          <span className="font-semibold text-sm text-yellow-300">Funding Expert</span>
        </div>
        
        <div className="text-xs text-gray-400">
          <span className="text-green-400 font-medium">{points}</span> points
        </div>
      </div>
      
      {/* Level progress bar */}
      <div className="relative h-2 w-full bg-gray-800 rounded-full overflow-hidden mb-3">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-amber-400 to-yellow-300 origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: progressPercentage / 100 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
      
      {/* Achievements section */}
      <div className="flex justify-between items-center mb-2">
        <div className="text-xs text-gray-400">
          <span className="text-green-400 font-medium">{achievementsUnlocked}</span> of {totalAchievements} achievements
        </div>
        
        <div className="flex">
          {Array.from({ length: Math.min(5, achievementsUnlocked) }).map((_, idx) => (
            <div 
              key={idx} 
              className="h-4 w-4 rounded-full border border-green-400 bg-green-400/20 -mr-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 m-0.5 text-green-400">
                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
              </svg>
            </div>
          ))}
          {Array.from({ length: Math.min(5, totalAchievements - achievementsUnlocked) }).map((_, idx) => (
            <div 
              key={idx} 
              className="h-4 w-4 rounded-full border border-gray-600 bg-gray-800/50 -mr-1"
            />
          ))}
        </div>
      </div>
      
      {/* Active challenge */}
      {activeChallenge && (
        <motion.div 
          className="mt-2 p-2 bg-amber-900/40 border border-amber-700/40 rounded-md"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2 text-xs text-amber-300 font-medium mb-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-amber-400">
              <path fillRule="evenodd" d="M10.362 1.093a.75.75 0 00-.724 0L2.523 5.018a.75.75 0 00.387 1.398h14.18a.75.75 0 00.387-1.398l-7.115-3.925zM13.97 4.66L10 6.75l-3.97-2.09.001-.001 3.97-2.089 3.97 2.09z" clipRule="evenodd" />
            </svg>
            <span>Active Challenge</span>
          </div>
          <p className="text-amber-100 text-xs">
            {activeChallenge.hint}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

const InteractiveCharacter = () => {
  const { 
    message, 
    isVisible, 
    handleCharacterClick, 
    gameState 
  } = useCharacterBehavior();
  
  const [isMinimized, setIsMinimized] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  
  // Calculate achievements unlocked
  const achievementsUnlocked = gameState.achievements.filter(a => a.unlocked).length;
  const totalAchievements = gameState.achievements.length;
  
  // Toggle expanded state (showing game UI)
  const toggleExpanded = () => {
    if (isMinimized) return;
    setIsExpanded(!isExpanded);
  };
  
  // Track new messages
  useEffect(() => {
    if (message && !isMinimized) {
      setHasNewMessage(true);
      const timer = setTimeout(() => {
        setHasNewMessage(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [message, isMinimized]);
  
  return (
    <div className="fixed bottom-10 right-10 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isVisible && !isMinimized && (
          <>
            <GameOverlay 
              level={gameState.level} 
              points={gameState.points}
              achievementsUnlocked={achievementsUnlocked}
              totalAchievements={totalAchievements}
              activeChallenge={gameState.activeChallenge}
              isExpanded={isExpanded}
            />
            <CharacterDialogue 
              message={message} 
              isVisible={true}
              onMinimize={(e) => {
                e.preventDefault();
                setIsMinimized(true);
                setHasNewMessage(false);
              }}
              onDoubleClick={toggleExpanded}
            />
          </>
        )}
      </AnimatePresence>
      <CharacterAvatar 
        onClick={isMinimized ? () => setIsMinimized(false) : handleCharacterClick} 
        isEnhanced={gameState.level > 2}
        isPulsing={gameState.activeChallenge !== null}
        playerLevel={gameState.level}
        hasNewMessage={hasNewMessage || gameState.activeChallenge !== null}
      />
    </div>
  );
};

export default InteractiveCharacter; 