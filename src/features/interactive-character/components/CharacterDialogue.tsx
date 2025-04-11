'use client';

import React, { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/cn';
import { useEffect, useState, useRef } from 'react';

interface Props {
  message: string;
  isVisible: boolean;
  onMinimize?: (e: React.MouseEvent) => void;
  onDoubleClick?: () => void;
}

// Helper function type definitions
type TextOrElement = string | JSX.Element;
type TextOrElementArray = TextOrElement[];

const CharacterDialogue: React.FC<Props> = ({ message, isVisible, onMinimize, onDoubleClick }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [showFullText, setShowFullText] = useState(false);
  const typingSpeed = 30; // milliseconds per character
  const dialogueRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Reset state for new message
    setDisplayedText('');
    setShowFullText(false);
    
    let index = 0;
    let typingTimer: NodeJS.Timeout;
    
    // If message is the same, show it immediately
    if (displayedText === message) {
      setShowFullText(true);
      return;
    }
    
    // Type out the message one character at a time
    const typeNextCharacter = () => {
      if (index < message.length && !showFullText) {
        setDisplayedText(prev => prev + message.charAt(index));
        index++;
        typingTimer = setTimeout(typeNextCharacter, typingSpeed);
      }
    };
    
    // Start typing animation
    typeNextCharacter();
    
    // Clean up timer on unmount or message change
    return () => {
      clearTimeout(typingTimer);
    };
  }, [message]);
  
  // Show full text immediately when clicked
  const handleDialogueClick = () => {
    setShowFullText(true);
    setDisplayedText(message);
  };
  
  // Set up animation variants
  const dialogueVariants = {
    hidden: { 
      opacity: 0,
      y: 10,
      scale: 0.95
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0,
      y: 10,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && message && (
        <motion.div
          ref={dialogueRef}
          className={cn(
            "relative mb-3 min-w-[280px] max-w-sm bg-gradient-to-br from-gray-900/95 to-indigo-900/90",
            "text-white p-5 rounded-xl rounded-br-none shadow-xl text-sm border border-blue-500/30 backdrop-blur-md"
          )}
          variants={dialogueVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onDoubleClick={onDoubleClick}
        >
          {/* Header decoration */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 rounded-t-xl" />
          
          {/* Minimize button */}
          {onMinimize && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onMinimize(e);
              }}
              className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700/50 transition-colors"
              aria-label="Minimize dialogue"
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          
          {/* Source indicator */}
          <div className="flex items-center mb-3">
            <div className="h-5 w-5 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mr-2">
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <span className="text-xs font-medium text-blue-300">Dutch Funding Advisor</span>
          </div>
          
          {/* Animated Message Text */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="ml-7" // Indent to align with the avatar icon
          >
            {/* Typing indicator animation before message appears */}
            <motion.div 
              className="flex gap-1 mb-2 opacity-30"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.2, delay: 0.6 }}
            >
              <motion.span 
                className="w-2 h-2 rounded-full bg-blue-400"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 0.1 }}
              />
              <motion.span 
                className="w-2 h-2 rounded-full bg-blue-400"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 0.2, delay: 0.1 }}
              />
              <motion.span 
                className="w-2 h-2 rounded-full bg-blue-400"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 0.3, delay: 0.2 }}
              />
            </motion.div>
            
            {/* Message text with subtle highlight for keywords */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="leading-relaxed pr-4 text-gray-300"
              onClick={handleDialogueClick}
            >
              {formatMessageWithHighlights(showFullText ? message : displayedText)}
            </motion.p>
            
            {/* Blinking cursor at the end of text if still typing */}
            {!showFullText && displayedText.length < message.length && (
              <motion.span
                className="inline-block w-2 h-4 ml-0.5 bg-blue-400"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            )}
            
            {/* Action hints */}
            <motion.div
              className="flex justify-end gap-2 mt-3 text-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: displayedText.length * typingSpeed / 1000 + 0.5 }}
            >
              <button 
                className="text-gray-400 hover:text-blue-300 transition-colors flex items-center gap-1"
                onClick={handleDialogueClick}
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Skip</span>
              </button>
              
              <button 
                className="text-gray-400 hover:text-blue-300 transition-colors flex items-center gap-1"
                onClick={onDoubleClick}
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Status</span>
              </button>
            </motion.div>
          </motion.div>
          
          {/* Triangle pointing to avatar with glow */}
          <div className="absolute -bottom-[10px] right-4 w-0 h-0 
                         border-l-[10px] border-l-transparent 
                         border-t-[10px] border-t-indigo-900 
                         drop-shadow-lg"></div>
          
          {/* Decorative elements */}
          <div className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-blue-500/30"></div>
          <div className="absolute -top-1 left-3 w-1 h-1 rounded-full bg-blue-500/20"></div>
          <div className="absolute top-3 right-10 w-1 h-1 rounded-full bg-blue-500/30"></div>
          <div className="absolute top-6 left-1 w-1 h-1 rounded-full bg-blue-500/20"></div>
          
          {/* Subtle shimmer effect */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-xl overflow-hidden pointer-events-none"
            animate={{ 
              x: ['-100%', '100%'],
            }}
            transition={{ 
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 3
            }}
            style={{ originX: 0 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Helper function to highlight keywords
const formatMessageWithHighlights = (message: string): ReactNode => {
  // Keywords to highlight
  const keywords = [
    'funding', 'grant', 'venture', 'startup', 'investment', 'accelerator', 
    'incubator', 'R&D', 'innovation', 'Netherlands', 'Dutch', 'Rockstart',
    'YES!Delft', 'WBSO', 'SIDN', 'Oneplanetcrowd', 'Forward Incubator', 
    'Impact Hub', 'Startup in Residence', 'Rubio', '4impact', 'UtrechtInc',
    'AMIF', 'EIC Accelerator', 'MIT Haalbaarheid', 'Vroegefasefinanciering',
    'Innovatiekrediet', 'angel', 'equity', 'loan', 'tax credit', 'EU',
    'impact', 'integration', 'social', 'proof-of-concept', 'feasibility',
    'Seed Business Angel', 'achievement', 'challenge', 'level', 'points',
    'discover', 'unlocked', 'complete', 'mission', 'milestone', 'reward',
    'progress', 'LUMO Labs', 'AiNed', 'ROBUST', 'Circular Batteries',
    'PhotonDelta', 'Cybersecurity', 'Antler Amsterdam', 'Techstars',
    'Invest-NL', '2025', 'expanded'
  ];
  
  // Split the message into parts to be highlighted
  let parts: TextOrElementArray = [message];
  
  keywords.forEach(keyword => {
    // Case insensitive search
    const regex = new RegExp(`(${keyword})`, 'gi');
    
    parts = parts.flatMap((part): TextOrElementArray => {
      if (typeof part !== 'string') return [part];
      
      // Split the string part and create elements for matches
      return part.split(regex).map((text, i) => {
        if (i % 2 === 1) { // This is a match
          return <span key={`${keyword}-${i}`} className="text-blue-300 font-medium">{text}</span>;
        }
        return text;
      });
    });
  });
  
  return <>{parts}</>;
};

export default CharacterDialogue; 