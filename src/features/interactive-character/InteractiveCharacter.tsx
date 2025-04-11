'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/cn';
import CharacterAvatar from './components/CharacterAvatar';
import CharacterDialogue from './components/CharacterDialogue';
import { useCharacterBehavior } from './hooks/useCharacterBehavior';

const InteractiveCharacter: React.FC = () => {
  const { message, isVisible, handleCharacterClick, viewCount } = useCharacterBehavior();
  const [isHovering, setIsHovering] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);
  
  // Animation to draw attention after periods of inactivity
  useEffect(() => {
    const bouncingInterval = setInterval(() => {
      if (!isHovering && !isVisible) {
        setIsBouncing(true);
        setTimeout(() => setIsBouncing(false), 1000);
      }
    }, 30000); // Bounce every 30 seconds if inactive
    
    return () => clearInterval(bouncingInterval);
  }, [isHovering, isVisible]);
  
  // Toggle minimized state for mobile devices
  const toggleMinimized = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent click from bubbling to parent
    setIsMinimized(!isMinimized);
  };
  
  return (
    <motion.div
      className={cn(
        "fixed z-50 flex flex-col items-end space-y-2",
        isMinimized ? "bottom-4 right-4" : "bottom-6 right-6",
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <AnimatePresence>
        {(isVisible || isHovering) && !isMinimized && (
          <CharacterDialogue 
            message={message} 
            isVisible={true} 
            onMinimize={toggleMinimized}
          />
        )}
      </AnimatePresence>
      
      <div 
        className="relative cursor-pointer"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={() => {
          handleCharacterClick();
          if (isMinimized) setIsMinimized(false);
        }}
      >
        {/* Badge for new messages or features */}
        {viewCount === 0 && (
          <motion.div 
            className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border border-gray-800"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring" }}
          />
        )}
        
        <motion.div
          animate={isBouncing ? { 
            y: [0, -15, 0], 
            scale: [1, 1.1, 1],
            rotate: [0, -5, 0, 5, 0]
          } : {}}
          transition={isBouncing ? { duration: 1, times: [0, 0.5, 1] } : {}}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <CharacterAvatar />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default InteractiveCharacter; 