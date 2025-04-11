'use client'; // Add client directive for Framer Motion usage

import React from 'react';
import { motion } from 'framer-motion';

interface CharacterAvatarProps {
  onClick?: () => void;
  isEnhanced?: boolean;
  isPulsing?: boolean;
  playerLevel?: number;
  hasNewMessage?: boolean;
}

// SVG Icon representing a Dutch funding advisor
const AdvisorIcon: React.FC = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Face/head circle */}
    <motion.circle
      cx="12"
      cy="9"
      r="3.5"
      stroke="currentColor"
      strokeWidth="1.5"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1, delay: 0.2 }}
    />
    
    {/* Outer circle (globe/world) */}
    <motion.path
      d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z"
      stroke="currentColor"
      strokeWidth="1.5"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1 }}
    />
    
    {/* Netherlands flag elements (simplified stripes) */}
    <motion.path
      d="M7 6h10"
      stroke="#FF5F5F"
      strokeWidth="1.5"
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 1.2 }}
    />
    
    <motion.path
      d="M7 8h10"
      stroke="#FFFFFF"
      strokeWidth="1.5"
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 1.3 }}
    />
    
    <motion.path
      d="M7 4h10"
      stroke="#3D7DD8"
      strokeWidth="1.5"
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 1.4 }}
    />
    
    {/* Euro symbol */}
    <motion.path
      d="M14.5 16c-1 0.667-2.167 1-3.5 1-1.333 0-2.5-0.333-3.5-1"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.8, delay: 0.9 }}
    />
    
    <motion.path
      d="M14 13H8.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
    />
    
    <motion.path
      d="M13 18H9"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.5, delay: 1.1 }}
    />
    
    {/* Connection points representing network */}
    <motion.path 
      d="M18 12.5L17 12" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
    />
    
    <motion.path 
      d="M7 12L6 12.5" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 1.1 }}
    />
  </svg>
);

const CharacterAvatar = ({ 
  onClick, 
  isEnhanced = false, 
  isPulsing = false,
  playerLevel = 1,
  hasNewMessage = false
}: CharacterAvatarProps) => {
  return (
    <motion.div
      className="relative cursor-pointer group"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 via-indigo-500/10 to-violet-500/20 rounded-full blur-xl transform scale-125 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Pulsing ring for notifications */}
      {hasNewMessage && (
        <motion.div
          className="absolute inset-0 rounded-full bg-amber-500/30"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: [0.8, 1.2, 0.8],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
      
      {/* Primary pulse ring - active when isPulsing or on hover */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-blue-400/40"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={isPulsing || hasNewMessage ? {
          scale: [0.6, 1.1, 0.6],
          opacity: [0, 0.5, 0],
        } : {}}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
      
      {/* Secondary pulse ring - active on hover */}
      <motion.div
        className="absolute inset-0 rounded-full border border-blue-300/30 opacity-0 group-hover:opacity-100"
        animate={{
          scale: [0.8, 1.15, 0.8],
          opacity: [0, 0.3, 0],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Level indicator */}
      <div className="absolute -left-1 -top-1 z-20 h-6 w-6 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 shadow-lg flex items-center justify-center text-xs font-bold text-white border-2 border-white">
        {playerLevel}
      </div>
      
      {/* New message indicator */}
      {hasNewMessage && (
        <div className="absolute -right-1 -top-1 z-20 h-5 w-5 rounded-full bg-red-500 shadow-lg border-2 border-white" />
      )}
      
      {/* Main avatar bobbing animation */}
      <motion.div 
        className="relative z-10 h-16 w-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full shadow-lg flex items-center justify-center overflow-hidden"
        animate={{
          y: [0, -5, 0],
          rotate: [0, 3, 0, -3, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-blue-600/50 to-transparent" />
        
        {/* Shine effect */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          animate={{ 
            x: ["-100%", "100%"],
            opacity: [0, 0.4, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 8,
            ease: "easeInOut",
          }}
        />
        
        {/* Dutch Funding Expert SVG */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          className="w-11 h-11"
        >
          {/* Enhanced version with more complex elements */}
          {isEnhanced ? (
            <>
              {/* Enhanced glow effects */}
              <motion.circle
                cx="50"
                cy="50"
                r="30"
                fill="rgba(59, 130, 246, 0.3)"
                animate={{
                  r: [30, 32, 30],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              {/* Network connections */}
              <motion.path
                d="M50,20 L80,10 M50,20 L90,30 M50,80 L80,90 M50,80 L90,70 M20,50 L10,20 M20,50 L10,80"
                stroke="#fff"
                strokeWidth="1"
                strokeDasharray="2,3"
                initial={{ pathLength: 0, opacity: 0.2 }}
                animate={{ 
                  pathLength: 1,
                  opacity: [0.2, 0.6, 0.2]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              
              {/* Outer globe circle */}
              <motion.circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                }}
              />
              
              {/* Face/head circle */}
              <motion.circle
                cx="50"
                cy="50"
                r="15"
                fill="#fff"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              {/* Netherlands flag colors (simplified) */}
              <motion.rect 
                x="65" 
                y="35" 
                width="10" 
                height="3" 
                fill="#AE1C28"
                animate={{
                  rotate: [0, 5, 0, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.rect 
                x="65" 
                y="38" 
                width="10" 
                height="3" 
                fill="#fff"
                animate={{
                  rotate: [0, 5, 0, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.1,
                }}
              />
              <motion.rect 
                x="65" 
                y="41" 
                width="10" 
                height="3" 
                fill="#21468B"
                animate={{
                  rotate: [0, 5, 0, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.2,
                }}
              />
              
              {/* Euro symbol */}
              <motion.text
                x="45"
                y="55"
                fontSize="12"
                fontWeight="bold"
                fill="#21468B"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                €
              </motion.text>
              
              {/* Data points around the globe */}
              {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                <motion.circle
                  key={`data-point-${i}`}
                  cx={50 + 30 * Math.cos((angle * Math.PI) / 180)}
                  cy={50 + 30 * Math.sin((angle * Math.PI) / 180)}
                  r="2"
                  fill="#60a5fa"
                  animate={{
                    r: [2, 3, 2],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 2 + i * 0.3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.2,
                  }}
                />
              ))}
            </>
          ) : (
            <>
              {/* Base version with simple elements */}
              <circle cx="50" cy="50" r="30" fill="rgba(59, 130, 246, 0.3)" />
              
              {/* Outer circle */}
              <circle
                cx="50"
                cy="50"
                r="20"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="1.5"
              />
              
              {/* Face/head circle */}
              <circle cx="50" cy="50" r="15" fill="#fff" />
              
              {/* Euro symbol */}
              <text
                x="45"
                y="55"
                fontSize="12"
                fontWeight="bold"
                fill="#21468B"
              >
                €
              </text>
              
              {/* Dutch flag colors simplified */}
              <rect x="65" y="38" width="10" height="3" fill="#AE1C28" />
              <rect x="65" y="41" width="10" height="3" fill="#fff" />
              <rect x="65" y="44" width="10" height="3" fill="#21468B" />
            </>
          )}
        </svg>
        
        {/* Glow effect */}
        <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay" />
      </motion.div>
      
      {/* Title tooltip */}
      <motion.div 
        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white text-blue-600 text-xs font-medium px-3 py-1 rounded-full shadow-md border border-blue-200 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
        initial={{ y: -10, opacity: 0 }}
        whileHover={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        Dutch Funding Advisor
      </motion.div>
    </motion.div>
  );
};

export default CharacterAvatar; 