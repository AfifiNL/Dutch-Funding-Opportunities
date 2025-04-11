'use client'; // Add client directive for Framer Motion usage

import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/Button'; // Using alias for src/

// Floating Element Component
const FloatingElement: React.FC<{ 
  delay?: number, 
  duration?: number, 
  x?: number, 
  y?: number, 
  children: React.ReactNode,
  className?: string 
}> = ({ delay = 0, duration = 6, x = 10, y = 10, children, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: 1,
        x: [0, x, 0, -x, 0] as number[],
        y: [0, -y, 0, y, 0] as number[]
      }}
      transition={{ 
        opacity: { duration: 1, delay },
        x: { duration, repeat: Infinity, ease: "easeInOut", delay },
        y: { duration: duration * 1.2, repeat: Infinity, ease: "easeInOut", delay }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Particle backgrounds
const ParticleBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="dot-pattern absolute inset-0 opacity-30"></div>
      <div className="noise-overlay"></div>
      
      {/* Decorative circles */}
      <FloatingElement delay={0} x={15} y={20} className="absolute top-[10%] left-[15%] w-32 h-32 rounded-full bg-teal-500/5 blur-xl">
        <div className="w-full h-full"></div>
      </FloatingElement>
      <FloatingElement delay={1} x={25} y={10} className="absolute top-[40%] right-[10%] w-48 h-48 rounded-full bg-blue-500/5 blur-xl">
        <div className="w-full h-full"></div>
      </FloatingElement>
      <FloatingElement delay={0.5} x={10} y={15} className="absolute bottom-[15%] left-[20%] w-40 h-40 rounded-full bg-purple-500/5 blur-xl">
        <div className="w-full h-full"></div>
      </FloatingElement>
      
      {/* Euro symbols */}
      <FloatingElement delay={0.2} y={15} className="absolute top-[20%] right-[20%] text-teal-500/20 text-4xl font-bold">€</FloatingElement>
      <FloatingElement delay={1.2} y={20} className="absolute bottom-[30%] right-[30%] text-teal-400/10 text-6xl font-bold">€</FloatingElement>
      <FloatingElement delay={0.7} y={10} className="absolute top-[40%] left-[10%] text-teal-300/15 text-5xl font-bold">€</FloatingElement>
    </div>
  );
};

const HeroBanner: React.FC = () => {
  return (
    <div className="relative overflow-hidden">
      <ParticleBackground />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-center py-32 px-4 relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-6 inline-block"
        >
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-teal-500 rounded-full blur-3xl opacity-10"></div>
            <div className="relative bg-gray-800/50 backdrop-blur-sm px-6 py-2 rounded-full border border-teal-500/30 shadow-lg">
              <span className="text-sm font-medium text-teal-400">Discover the perfect funding for your startup</span>
            </div>
          </div>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight"
        >
          Dutch Funding Opportunities
          <br /> for <span className="gradient-text">Startups and Innovators</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed"
        >
          Comprehensive guide to funding sources in the Netherlands for startups,
          innovators, and social impact ventures
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="flex flex-col sm:flex-row justify-center gap-4 px-6"
        >
          <Button 
            variant="primary" 
            icon={<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>}
          >
            Find Your Funding
          </Button>
          <Button 
            variant="secondary"
            icon={<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path></svg>}
          >
            Contact an Advisor
          </Button>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-900 to-transparent pointer-events-none"
        />
      </motion.div>
    </div>
  );
};

export default HeroBanner; 