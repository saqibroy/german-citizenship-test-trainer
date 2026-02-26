import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ConfettiExplosion from 'react-confetti-explosion';

// ===== Types =====
export type CelebrationType = 
  | 'level-up'        // Question strength went up (weak→medium, medium→strong)
  | 'question-strong'  // Question became strong
  | 'badge-earned'     // Trophy/badge unlocked
  | 'training-great'   // Training completed with good results (≥80%)
  | 'training-perfect' // Training completed with perfect/near-perfect (≥95%)
  | 'quiz-passed'      // Quiz passed (≥17/33)
  | 'quiz-perfect';    // Perfect quiz score

export interface CelebrationEvent {
  type: CelebrationType;
  title: string;
  subtitle?: string;
  icon?: string;
  badgeName?: string;
}

interface CelebrationOverlayProps {
  event: CelebrationEvent | null;
  onComplete: () => void;
}

// ===== Confetti configs per celebration type =====
const CONFETTI_CONFIG: Record<CelebrationType, {
  particleCount: number;
  duration: number;
  force: number;
  width: number;
  colors: string[];
} | null> = {
  'level-up': {
    particleCount: 30,
    duration: 2200,
    force: 0.4,
    width: 300,
    colors: ['#a855f7', '#c084fc', '#e9d5ff', '#f0abfc'],
  },
  'question-strong': {
    particleCount: 60,
    duration: 2800,
    force: 0.5,
    width: 400,
    colors: ['#a855f7', '#ec4899', '#22c55e', '#fbbf24', '#c084fc'],
  },
  'badge-earned': {
    particleCount: 100,
    duration: 3500,
    force: 0.7,
    width: 600,
    colors: ['#fbbf24', '#f59e0b', '#a855f7', '#ec4899', '#f472b6', '#c084fc'],
  },
  'training-great': {
    particleCount: 80,
    duration: 3000,
    force: 0.6,
    width: 500,
    colors: ['#22c55e', '#a855f7', '#ec4899', '#fbbf24', '#60a5fa'],
  },
  'training-perfect': {
    particleCount: 150,
    duration: 4000,
    force: 0.8,
    width: 700,
    colors: ['#fbbf24', '#f59e0b', '#a855f7', '#ec4899', '#22c55e', '#f472b6', '#60a5fa'],
  },
  'quiz-passed': {
    particleCount: 100,
    duration: 3500,
    force: 0.7,
    width: 600,
    colors: ['#22c55e', '#a855f7', '#fbbf24', '#ec4899', '#60a5fa'],
  },
  'quiz-perfect': {
    particleCount: 200,
    duration: 5000,
    force: 0.9,
    width: 800,
    colors: ['#fbbf24', '#f59e0b', '#a855f7', '#ec4899', '#22c55e', '#f472b6', '#60a5fa', '#c084fc'],
  },
};

// Auto-dismiss durations per type
const DISMISS_DELAY: Record<CelebrationType, number> = {
  'level-up': 2000,
  'question-strong': 2500,
  'badge-earned': 3500,
  'training-great': 4000,
  'training-perfect': 5000,
  'quiz-passed': 4000,
  'quiz-perfect': 5000,
};

// ===== Celebration Overlay Component =====
export function CelebrationOverlay({ event, onComplete }: CelebrationOverlayProps) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (event) {
      setShowConfetti(true);
      const dismissTime = DISMISS_DELAY[event.type];
      const timer = setTimeout(() => {
        onComplete();
      }, dismissTime);
      return () => clearTimeout(timer);
    } else {
      setShowConfetti(false);
    }
  }, [event, onComplete]);

  if (!event) return null;

  const confettiConfig = CONFETTI_CONFIG[event.type];
  const isSmall = event.type === 'level-up';
  const isMedium = event.type === 'question-strong';
  const isBig = ['badge-earned', 'training-great', 'training-perfect', 'quiz-passed', 'quiz-perfect'].includes(event.type);

  return (
    <AnimatePresence>
      {event && (
        <>
          {/* Small celebrations: Toast-style from top */}
          {isSmall && (
            <motion.div
              initial={{ y: -100, opacity: 0, scale: 0.8 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -100, opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', damping: 15, stiffness: 300 }}
              className="fixed top-4 left-1/2 -translate-x-1/2 z-[200] pointer-events-none"
            >
              <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl px-5 py-3 flex items-center gap-3 border border-purple-200/50">
                {showConfetti && confettiConfig && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <ConfettiExplosion
                      particleCount={confettiConfig.particleCount}
                      duration={confettiConfig.duration}
                      force={confettiConfig.force}
                      width={confettiConfig.width}
                      colors={confettiConfig.colors}
                    />
                  </div>
                )}
                <motion.span 
                  className="text-3xl"
                  animate={{ rotate: [0, -10, 10, -5, 5, 0], scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6 }}
                >
                  {event.icon || '⬆️'}
                </motion.span>
                <div>
                  <p className="font-bold text-sm text-gray-900">{event.title}</p>
                  {event.subtitle && (
                    <p className="text-xs text-purple-600 font-semibold">{event.subtitle}</p>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Medium celebrations: Center card with confetti */}
          {isMedium && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none"
            >
              {showConfetti && confettiConfig && (
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2">
                  <ConfettiExplosion
                    particleCount={confettiConfig.particleCount}
                    duration={confettiConfig.duration}
                    force={confettiConfig.force}
                    width={confettiConfig.width}
                    colors={confettiConfig.colors}
                  />
                </div>
              )}
              
              <motion.div
                initial={{ scale: 0.3, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: -20 }}
                transition={{ type: 'spring', damping: 12, stiffness: 200 }}
                className="relative bg-white/90 backdrop-blur-md rounded-3xl shadow-xl px-8 py-6 text-center max-w-xs mx-4 border border-green-200/50"
              >
                <motion.div 
                  className="text-6xl mb-3"
                  animate={{ 
                    scale: [1, 1.3, 1, 1.15, 1],
                    rotate: [0, -5, 5, -3, 0]
                  }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                  {event.icon || '💪'}
                </motion.div>
                <h3 className="font-extrabold text-lg text-gray-900">{event.title}</h3>
                {event.subtitle && (
                  <p className="text-sm text-green-600 font-bold mt-1">{event.subtitle}</p>
                )}
              </motion.div>
            </motion.div>
          )}

          {/* Big celebrations: Full overlay with confetti, text floats freely */}
          {isBig && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] flex items-center justify-center"
              onClick={onComplete}
            >
              {/* Subtle dark vignette — no blur, keeps confetti crisp */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/30"
              />
              
              {/* Confetti from multiple points */}
              {showConfetti && confettiConfig && (
                <>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2">
                    <ConfettiExplosion
                      particleCount={confettiConfig.particleCount}
                      duration={confettiConfig.duration}
                      force={confettiConfig.force}
                      width={confettiConfig.width}
                      colors={confettiConfig.colors}
                    />
                  </div>
                  {(event.type === 'quiz-perfect' || event.type === 'training-perfect') && (
                    <>
                      <div className="absolute top-1/4 left-1/4">
                        <ConfettiExplosion
                          particleCount={Math.floor(confettiConfig.particleCount * 0.5)}
                          duration={confettiConfig.duration}
                          force={confettiConfig.force * 0.7}
                          width={confettiConfig.width * 0.6}
                          colors={confettiConfig.colors}
                        />
                      </div>
                      <div className="absolute top-1/4 right-1/4">
                        <ConfettiExplosion
                          particleCount={Math.floor(confettiConfig.particleCount * 0.5)}
                          duration={confettiConfig.duration}
                          force={confettiConfig.force * 0.7}
                          width={confettiConfig.width * 0.6}
                          colors={confettiConfig.colors}
                        />
                      </div>
                    </>
                  )}
                </>
              )}
              
              {/* Card with subtle background */}
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0, y: 50 }}
                transition={{ type: 'spring', damping: 10, stiffness: 150, delay: 0.1 }}
                className="relative flex flex-col items-center text-center px-8 py-8 bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-purple-100 max-w-sm mx-auto"
              >
                {/* Floating sparkles around the card */}
                <motion.div 
                  className="absolute -top-4 -right-2 text-2xl"
                  animate={{ rotate: 360, scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  ✨
                </motion.div>
                <motion.div 
                  className="absolute -top-2 -left-4 text-xl"
                  animate={{ rotate: -360, scale: [1, 0.8, 1], opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  ⭐
                </motion.div>
                <motion.div 
                  className="absolute -bottom-2 right-0 text-lg"
                  animate={{ rotate: 180, scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  💫
                </motion.div>
                
                {/* Icon */}
                <motion.div 
                  className="text-8xl mb-4"
                  animate={{ 
                    scale: [1, 1.2, 0.95, 1.1, 1],
                    rotate: [0, -8, 8, -4, 0]
                  }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                >
                  {event.icon || '🏆'}
                </motion.div>
                
                {/* Title */}
                <motion.h2 
                  className="text-3xl font-black text-gray-900 mb-2"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {event.title}
                </motion.h2>
                
                {/* Subtitle */}
                {event.subtitle && (
                  <motion.p 
                    className="text-purple-600 font-bold text-base"
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.35 }}
                  >
                    {event.subtitle}
                  </motion.p>
                )}

                {/* Badge name pill */}
                {event.badgeName && (
                  <motion.div 
                    className="mt-4 inline-flex items-center gap-2 bg-purple-100 rounded-full px-5 py-2.5 border border-purple-200"
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.45 }}
                  >
                    <span className="text-lg">{event.icon}</span>
                    <span className="font-bold text-purple-700 text-sm">{event.badgeName}</span>
                  </motion.div>
                )}
                
                {/* Tap to dismiss hint */}
                <motion.p 
                  className="mt-6 text-xs text-gray-400 font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                >
                  tap to dismiss
                </motion.p>
              </motion.div>
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  );
}

// ===== Hook: useCelebration =====
// Manages the celebration queue and provides trigger functions

export function useCelebration() {
  const [queue, setQueue] = useState<CelebrationEvent[]>([]);
  const [current, setCurrent] = useState<CelebrationEvent | null>(null);

  // Process queue
  useEffect(() => {
    if (!current && queue.length > 0) {
      setCurrent(queue[0]);
      setQueue(prev => prev.slice(1));
    }
  }, [current, queue]);

  const dismiss = useCallback(() => {
    setCurrent(null);
  }, []);

  const celebrate = useCallback((event: CelebrationEvent) => {
    setQueue(prev => [...prev, event]);
  }, []);

  // Helper: Detect level change and trigger appropriate celebration
  const celebrateLevelChange = useCallback((
    oldProgress: { strength: string; srsLevel?: string } | undefined,
    newProgress: { strength: string; srsLevel?: string },
    lang: string
  ) => {
    const oldStrength = oldProgress?.strength || 'weak';
    const newStrength = newProgress.strength;
    const oldSRS = oldProgress?.srsLevel || 'new';
    const newSRS = newProgress.srsLevel || 'new';

    // Question became strong
    if (newStrength === 'strong' && oldStrength !== 'strong') {
      celebrate({
        type: 'question-strong',
        title: lang === 'de' ? 'Frage gemeistert!' : 'Question Mastered!',
        subtitle: lang === 'de' ? 'Diese Frage ist jetzt stark 💪' : 'This question is now strong 💪',
        icon: '💪',
      });
      return;
    }

    // SRS level upgrade (not to strong — that's handled above)
    if (newSRS !== oldSRS) {
      const levelNames: Record<string, { de: string; en: string; icon: string }> = {
        learning: { de: 'Lernend', en: 'Learning', icon: '📖' },
        young: { de: 'Bekannt', en: 'Familiar', icon: '🌱' },
        mature: { de: 'Gefestigt', en: 'Solid', icon: '🌳' },
        mastered: { de: 'Gemeistert', en: 'Mastered', icon: '⭐' },
      };

      const levelOrder = ['new', 'learning', 'young', 'mature', 'mastered'];
      const oldIdx = levelOrder.indexOf(oldSRS);
      const newIdx = levelOrder.indexOf(newSRS);

      // Only celebrate upgrades
      if (newIdx > oldIdx && newSRS !== 'learning') {
        const levelInfo = levelNames[newSRS];
        if (levelInfo) {
          celebrate({
            type: 'level-up',
            title: lang === 'de' ? 'Level aufgestiegen!' : 'Level Up!',
            subtitle: `→ ${lang === 'de' ? levelInfo.de : levelInfo.en}`,
            icon: levelInfo.icon,
          });
        }
      }
    }
  }, [celebrate]);

  // Helper: Celebrate badge earned
  const celebrateBadge = useCallback((
    badgeName: string,
    badgeIcon: string,
    badgeDescription: string,
    lang: string
  ) => {
    celebrate({
      type: 'badge-earned',
      title: lang === 'de' ? 'Neue Auszeichnung!' : 'New Trophy!',
      subtitle: badgeDescription,
      icon: badgeIcon,
      badgeName: badgeName,
    });
  }, [celebrate]);

  // Helper: Celebrate training completion
  const celebrateTrainingComplete = useCallback((accuracy: number, lang: string) => {
    if (accuracy >= 95) {
      celebrate({
        type: 'training-perfect',
        title: lang === 'de' ? 'Perfekt!' : 'Perfect!',
        subtitle: lang === 'de' ? `${accuracy}% – Hervorragende Leistung!` : `${accuracy}% – Outstanding performance!`,
        icon: '🌟',
      });
    } else if (accuracy >= 80) {
      celebrate({
        type: 'training-great',
        title: lang === 'de' ? 'Großartig!' : 'Awesome!',
        subtitle: lang === 'de' ? `${accuracy}% – Toll gemacht!` : `${accuracy}% – Great job!`,
        icon: '🎉',
      });
    }
  }, [celebrate]);

  // Helper: Celebrate quiz completion
  const celebrateQuizComplete = useCallback((score: number, total: number, lang: string) => {
    if (score === total) {
      celebrate({
        type: 'quiz-perfect',
        title: lang === 'de' ? 'Perfekte Punktzahl!' : 'Perfect Score!',
        subtitle: lang === 'de' ? `${score}/${total} – Unglaublich!` : `${score}/${total} – Incredible!`,
        icon: '👑',
      });
    } else if (score >= 17) {
      celebrate({
        type: 'quiz-passed',
        title: lang === 'de' ? 'Quiz bestanden!' : 'Quiz Passed!',
        subtitle: lang === 'de' ? `${score}/${total} richtig` : `${score}/${total} correct`,
        icon: '🏆',
      });
    }
  }, [celebrate]);

  return {
    currentCelebration: current,
    dismissCelebration: dismiss,
    celebrate,
    celebrateLevelChange,
    celebrateBadge,
    celebrateTrainingComplete,
    celebrateQuizComplete,
  };
}
