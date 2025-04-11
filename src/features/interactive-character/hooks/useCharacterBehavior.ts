'use client';

import { useState, useEffect, useCallback } from 'react';
import { dialogues, DialogueKey, achievements as initialAchievements, AchievementData, fundingChallenges as initialChallenges, FundingChallenge } from '../data/characterDialogues';
import { getFundingById } from '@/data/fundingOpportunities';

interface CharacterBehaviorState {
  message: string;
  isVisible: boolean;
  currentKey: DialogueKey;
}

interface CharacterGameState {
  achievements: AchievementData[];
  discoveredFunding: string[];
  activeChallenge: FundingChallenge | null;
  completedChallenges: string[];
  points: number;
  level: number;
  showRoadmap: boolean;
  roadmapStage: 'intro' | 'early' | 'prototype' | 'growth' | 'complete' | null;
}

export const useCharacterBehavior = () => {
  // State for character behavior
  const [state, setState] = useState<CharacterBehaviorState>({
    message: dialogues.greeting,
    isVisible: true,
    currentKey: 'greeting'
  });
  
  // State for game mechanics
  const [gameState, setGameState] = useState<CharacterGameState>({
    achievements: initialAchievements,
    discoveredFunding: [],
    activeChallenge: null,
    completedChallenges: [],
    points: 0,
    level: 1,
    showRoadmap: false,
    roadmapStage: null
  });
  
  // State for tracking user interactions
  const [lastInteraction, setLastInteraction] = useState<number>(Date.now());
  const [hasScrolled, setHasScrolled] = useState<boolean>(false);
  const [currentSection, setCurrentSection] = useState<string | null>(null);
  const [viewCount, setViewCount] = useState<number>(0);
  
  // Function to update message
  const updateMessage = useCallback((dialogueKey: DialogueKey, customMessage?: string) => {
    if (state.currentKey === dialogueKey && !customMessage) return; // Don't update if already showing this message
    
    setState({
      message: customMessage || dialogues[dialogueKey],
      isVisible: true,
      currentKey: dialogueKey
    });
    
    setLastInteraction(Date.now());
  }, [state.currentKey]);
  
  // Function to discover a funding item
  const discoverFunding = useCallback((fundingId: string) => {
    if (gameState.discoveredFunding.includes(fundingId)) return;
    
    setGameState(prev => {
      const newDiscovered = [...prev.discoveredFunding, fundingId];
      const fundingItem = getFundingById(fundingId);
      const points = prev.points + 10; // Base points for discovering any funding
      
      // Check for sector-based achievements
      const publicFunding = newDiscovered.filter(id => {
        const item = getFundingById(id);
        return item?.sector.toLowerCase().includes('public');
      });
      
      const privateFunding = newDiscovered.filter(id => {
        const item = getFundingById(id);
        return item?.sector.toLowerCase().includes('private');
      });
      
      const acceleratorFunding = newDiscovered.filter(id => {
        const item = getFundingById(id);
        return item?.sector.toLowerCase().includes('accelerator') || 
               item?.sector.toLowerCase().includes('incubator');
      });
      
      const impactFunding = newDiscovered.filter(id => {
        const item = getFundingById(id);
        return item?.sector.toLowerCase().includes('impact') || 
               item?.sector.toLowerCase().includes('sdg');
      });
      
      const aiFunding = newDiscovered.filter(id => {
        const item = getFundingById(id);
        return item?.title.toLowerCase().includes('ai') || 
               item?.sector.toLowerCase().includes('ai');
      });
      
      // Update achievements based on discoveries
      const updatedAchievements = prev.achievements.map(achievement => {
        if (achievement.unlocked) return achievement;
        
        switch(achievement.id) {
          case 'discover_public':
            if (publicFunding.length >= 5) {
              updateMessage('achievement_unlocked', `🏆 Achievement Unlocked: ${achievement.title}! ${achievement.description}`);
              return { ...achievement, unlocked: true };
            }
            break;
          case 'discover_private':
            if (privateFunding.length >= 5) {
              updateMessage('achievement_unlocked', `🏆 Achievement Unlocked: ${achievement.title}! ${achievement.description}`);
              return { ...achievement, unlocked: true };
            }
            break;
          case 'discover_accelerator':
            if (acceleratorFunding.length >= 3) {
              updateMessage('achievement_unlocked', `🏆 Achievement Unlocked: ${achievement.title}! ${achievement.description}`);
              return { ...achievement, unlocked: true };
            }
            break;
          case 'discover_impact':
            if (impactFunding.length >= 3) {
              updateMessage('achievement_unlocked', `🏆 Achievement Unlocked: ${achievement.title}! ${achievement.description}`);
              return { ...achievement, unlocked: true };
            }
            break;
          case 'ai_specialist':
            if (aiFunding.length >= 3) {
              updateMessage('achievement_unlocked', `🏆 Achievement Unlocked: ${achievement.title}! ${achievement.description}`);
              return { ...achievement, unlocked: true };
            }
            break;
          case 'discover_all':
            if (publicFunding.length > 0 && 
                privateFunding.length > 0 && 
                acceleratorFunding.length > 0 && 
                impactFunding.length > 0) {
              updateMessage('achievement_unlocked', `🏆 Achievement Unlocked: ${achievement.title}! ${achievement.description}`);
              return { ...achievement, unlocked: true };
            }
            break;
          case 'discover_2025':
            // Check if this is a 2025 funding (simple heuristic: contains 2025 in title)
            if (fundingItem?.title.includes('2025') || 
                fundingId === 'wbso-2025' ||
                fundingId === 'innovation-box-2025' ||
                fundingId === 'robust-ai-programme' ||
                fundingId === 'ained-programme') {
              updateMessage('achievement_unlocked', `🏆 Achievement Unlocked: ${achievement.title}! ${achievement.description}`);
              return { ...achievement, unlocked: true };
            }
            break;
          default:
            return achievement;
        }
        
        return achievement;
      });
      
      // Check active challenge success
      let completedChallenges = [...prev.completedChallenges];
      if (prev.activeChallenge && fundingId.includes(prev.activeChallenge.targetFunding)) {
        updateMessage('challenge_success');
        completedChallenges.push(prev.activeChallenge.id);
      }
      
      // Calculate level based on points
      const level = Math.floor(points / 50) + 1;
      
      return {
        ...prev,
        discoveredFunding: newDiscovered,
        achievements: updatedAchievements,
        points,
        level,
        activeChallenge: prev.activeChallenge && fundingId.includes(prev.activeChallenge.targetFunding) ? null : prev.activeChallenge,
        completedChallenges
      };
    });
  }, [gameState.discoveredFunding, updateMessage]);
  
  // Track scrolling behavior
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(true);
      setLastInteraction(Date.now());
      
      // Detect which section is currently in view
      const sections = document.querySelectorAll('section');
      let visibleSection: string | null = null;
      
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        
        if (isVisible) {
          // Get section ID or other identifier
          visibleSection = section.id || section.getAttribute('data-section') || null;
        }
      });
      
      if (visibleSection !== currentSection) {
        setCurrentSection(visibleSection);
      }
    };
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentSection]);
  
  // Monitor filter usage
  useEffect(() => {
    const filterButtons = document.querySelectorAll('[data-filter-category]');
    
    const handleFilterClick = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      const category = target.getAttribute('data-filter-category');
      
      if (category) {
        // Show different messages based on filter category
        switch(category) {
          case 'public':
            updateMessage('public_grants');
            break;
          case 'private':
            updateMessage('private_funding');
            break;
          case 'accelerator':
            updateMessage('accelerators');
            break;
          case 'eu':
            updateMessage('eu_programs');
            break;
          case 'impact':
            updateMessage('impact_funding');
            break;
          case 'early':
            updateMessage('early_stage');
            break;
          default:
            updateMessage('filter_used');
        }
      }
    };
    
    filterButtons.forEach(button => {
      button.addEventListener('click', handleFilterClick);
    });
    
    return () => {
      filterButtons.forEach(button => {
        button.removeEventListener('click', handleFilterClick);
      });
    };
  }, [updateMessage]);
  
  // Monitor funding card clicks
  useEffect(() => {
    const fundingCards = document.querySelectorAll('[data-funding-id]');
    
    const handleCardClick = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      const fundingId = target.getAttribute('data-funding-id');
      
      if (fundingId) {
        discoverFunding(fundingId);
      }
    };
    
    fundingCards.forEach(card => {
      card.addEventListener('click', handleCardClick);
    });
    
    return () => {
      fundingCards.forEach(card => {
        card.removeEventListener('click', handleCardClick);
      });
    };
  }, [discoverFunding]);
  
  // Initial greeting
  useEffect(() => {
    updateMessage('greeting');
    
    // After 5 seconds, show scroll hint if user hasn't scrolled
    const timer = setTimeout(() => {
      if (!hasScrolled) {
        updateMessage('scroll_hint');
      }
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [hasScrolled, updateMessage]);
  
  // Show idle message after some time of inactivity
  useEffect(() => {
    const inactivityTimeout = setTimeout(() => {
      // If more than 30 seconds since last interaction, show random content
      const randomChoice = Math.random();
      
      if (randomChoice < 0.4) {
        // Show a random tip
        const tips: DialogueKey[] = ['tip_application', 'tip_combination', 'tip_deadlines'];
        const randomTip = tips[Math.floor(Math.random() * tips.length)];
        updateMessage(randomTip);
      } else if (randomChoice < 0.7 && !gameState.activeChallenge && initialChallenges.length > gameState.completedChallenges.length) {
        // Start a challenge if none is active
        const availableChallenges = initialChallenges.filter(
          challenge => !gameState.completedChallenges.includes(challenge.id)
        );
        
        if (availableChallenges.length > 0) {
          const randomChallenge = availableChallenges[Math.floor(Math.random() * availableChallenges.length)];
          setGameState(prev => ({...prev, activeChallenge: randomChallenge}));
          
          updateMessage('challenge_intro', dialogues.challenge_intro.replace('{clue}', randomChallenge.hint));
          setTimeout(() => {
            updateMessage('challenge_intro', randomChallenge.question);
          }, 4000);
        }
      } else if (randomChoice < 0.85) {
        // Show progress
        const progressPercent = Math.min(
          Math.round((gameState.discoveredFunding.length / 20) * 100), 
          100
        );
        updateMessage('progress_update', dialogues.progress_update.replace('{percent}', progressPercent.toString()));
      } else {
        // Show info about a 2025 funding option
        const options: DialogueKey[] = ['ai_funding', 'growth_fund', 'specialized_funds', 'creative_industry', 'academic_collaboration', 'corporate_ventures'];
        const randomOption = options[Math.floor(Math.random() * options.length)];
        updateMessage(randomOption);
      }
      
      // After showing content, go back to idle state
      const idleTimeout = setTimeout(() => {
        updateMessage('idle');
      }, 12000);
      
      return () => clearTimeout(idleTimeout);
    }, 30000);
    
    return () => clearTimeout(inactivityTimeout);
  }, [lastInteraction, updateMessage, gameState.activeChallenge, gameState.completedChallenges, gameState.discoveredFunding.length]);
  
  // Start funding roadmap flow
  const startFundingRoadmap = useCallback(() => {
    setGameState(prev => ({...prev, showRoadmap: true, roadmapStage: 'intro'}));
    updateMessage('roadmap_intro');
    
    // Mark achievement as unlocked
    setGameState(prev => ({
      ...prev,
      achievements: prev.achievements.map(achievement => 
        achievement.id === 'create_roadmap' 
          ? {...achievement, unlocked: true} 
          : achievement
      )
    }));
  }, [updateMessage]);
  
  // Advance funding roadmap
  const advanceRoadmap = useCallback((stage: 'early' | 'prototype' | 'growth' | 'complete') => {
    setGameState(prev => ({...prev, roadmapStage: stage}));
    updateMessage(`roadmap_${stage}` as DialogueKey);
  }, [updateMessage]);
  
  // Method to trigger when character is clicked
  const handleCharacterClick = useCallback(() => {
    // If we have a roadmap showing, keep that conversation going
    if (gameState.showRoadmap && gameState.roadmapStage) {
      if (gameState.roadmapStage === 'intro') {
        advanceRoadmap('early');
      } else if (gameState.roadmapStage === 'early') {
        advanceRoadmap('prototype');
      } else if (gameState.roadmapStage === 'prototype') {
        advanceRoadmap('growth');
      } else if (gameState.roadmapStage === 'growth') {
        advanceRoadmap('complete');
      } else {
        // End the roadmap flow
        setGameState(prev => ({...prev, showRoadmap: false, roadmapStage: null}));
        updateMessage('clicked');
      }
      return;
    }
    
    // If we've discovered a good number of funding options but haven't started the roadmap
    if (gameState.discoveredFunding.length >= 5 && !gameState.achievements.find(a => a.id === 'create_roadmap')?.unlocked) {
      startFundingRoadmap();
      return;
    }
    
    // Otherwise show the standard clicked message
    updateMessage('clicked');
    setViewCount(viewCount + 1);
  }, [updateMessage, viewCount, gameState.showRoadmap, gameState.roadmapStage, gameState.discoveredFunding.length, gameState.achievements, startFundingRoadmap, advanceRoadmap]);
  
  // Check if we should suggest a funding path based on exploration patterns
  useEffect(() => {
    if (gameState.discoveredFunding.length >= 3 && Math.random() < 0.3) {
      // Determine most explored category
      const publicCount = gameState.discoveredFunding.filter(id => {
        const item = getFundingById(id);
        return item?.sector.toLowerCase().includes('public');
      }).length;
      
      const privateCount = gameState.discoveredFunding.filter(id => {
        const item = getFundingById(id);
        return item?.sector.toLowerCase().includes('private');
      }).length;
      
      const acceleratorCount = gameState.discoveredFunding.filter(id => {
        const item = getFundingById(id);
        return item?.sector.toLowerCase().includes('accelerator');
      }).length;
      
      const impactCount = gameState.discoveredFunding.filter(id => {
        const item = getFundingById(id);
        return item?.sector.toLowerCase().includes('impact') || 
               item?.sector.toLowerCase().includes('sdg');
      }).length;
      
      // Find the predominant interest
      const categories = [
        { name: 'public grants', count: publicCount },
        { name: 'private investment', count: privateCount },
        { name: 'accelerator programs', count: acceleratorCount },
        { name: 'impact funding', count: impactCount }
      ];
      
      categories.sort((a, b) => b.count - a.count);
      
      if (categories[0].count >= 2) {
        const message = dialogues.funding_path_hint.replace('{category}', categories[0].name);
        updateMessage('funding_path_hint', message);
      }
    }
  }, [gameState.discoveredFunding, updateMessage]);
  
  return {
    ...state,
    handleCharacterClick,
    viewCount,
    gameState,
    discoverFunding,
    startFundingRoadmap,
    advanceRoadmap
  };
}; 