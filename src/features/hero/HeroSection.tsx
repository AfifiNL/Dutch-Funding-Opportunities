import React from 'react';
import HeroBanner from './components/HeroBanner';

const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Placeholder for potential background image/video later */}
      {/* <div className="absolute inset-0 z-0">...</div> */}
      <div className="relative z-10">
        <HeroBanner />
      </div>
    </section>
  );
};

export default HeroSection; 