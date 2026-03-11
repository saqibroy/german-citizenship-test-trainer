import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

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

// ===== Confetti launcher functions using canvas-confetti =====
function fireSmallConfetti() {
  confetti({
    particleCount: 40,
    spread: 60,
    startVelocity: 20,
    origin: { x: 0.5, y: 0.3 },
    colors: ['#a855f7', '#c084fc', '#e9d5ff', '#f0abfc'],
    ticks: 120,
    gravity: 0.8,
    scalar: 0.9,
    disableForReducedMotion: true,
  });
}

function fireMediumConfetti() {
  const colors = ['#a855f7', '#ec4899', '#22c55e', '#fbbf24', '#c084fc'];
  confetti({
    particleCount: 60,
    spread: 80,
    startVelocity: 30,
    origin: { x: 0.5, y: 0.35 },
    colors,
    ticks: 150,
    gravity: 0.7,
    scalar: 1,
    disableForReducedMotion: true,
  });
}

function fireBigConfetti(type: CelebrationType) {
  const isPerfect = type === 'quiz-perfect' || type === 'training-perfect';
  const colors = isPerfect
    ? ['#fbbf24', '#f59e0b', '#a855f7', '#ec4899', '#22c55e', '#f472b6', '#60a5fa', '#c084fc']
    : ['#22c55e', '#a855f7', '#fbbf24', '#ec4899', '#60a5fa'];

  // Main burst from center-top
  confetti({
    particleCount: isPerfect ? 100 : 70,
    spread: isPerfect ? 120 : 90,
    startVelocity: isPerfect ? 45 : 35,
    origin: { x: 0.5, y: 0.25 },
    colors,
    ticks: 200,
    gravity: 0.6,
    scalar: 1.1,
    disableForReducedMotion: true,
  });

  // Side bursts for perfect scores
  if (isPerfect) {
    setTimeout(() => {
      confetti({
        particleCount: 40,
        angle: 60,
        spread: 55,
        startVelocity: 40,
        origin: { x: 0, y: 0.5 },
        colors,
        ticks: 180,
        gravity: 0.7,
        disableForReducedMotion: true,
      });
      confetti({
        particleCount: 40,
        angle: 120,
        spread: 55,
        startVelocity: 40,
        origin: { x: 1, y: 0.5 },
        colors,
        ticks: 180,
        gravity: 0.7,
        disableForReducedMotion: true,
      });
    }, 300);

    // A second wave
    setTimeout(() => {
      confetti({
        particleCount: 50,
        spread: 100,
        startVelocity: 35,
        origin: { x: 0.5, y: 0.3 },
        colors,
        ticks: 160,
        gravity: 0.8,
        disableForReducedMotion: true,
      });
    }, 700);
  }
}

// Auto-dismiss durations per type
const DISMISS_DELAY: Record<CelebrationType, number> = {
  'level-up': 1400,
  'question-strong': 1600,
  'badge-earned': 3000,
  'training-great': 3500,
  'training-perfect': 4000,
  'quiz-passed': 3500,
  'quiz-perfect': 4500,
};

// ===== Celebration Overlay Component =====
// Only handles in-session celebrations (level-up, question-strong).
// Badge/training/quiz celebrations fire confetti only — text is shown
// on the completion screen itself.
export function CelebrationOverlay({ event, onComplete }: CelebrationOverlayProps) {
  const firedRef = useRef<string | null>(null);

  useEffect(() => {
    if (!event) {
      firedRef.current = null;
      return;
    }

    // Prevent double-firing for the same event
    const eventKey = `${event.type}-${event.title}`;
    if (firedRef.current === eventKey) return;
    firedRef.current = eventKey;

    // Fire confetti based on type
    const isSmall = event.type === 'level-up';
    const isMedium = event.type === 'question-strong';

    if (isSmall) {
      fireSmallConfetti();
    } else if (isMedium) {
      fireMediumConfetti();
    } else {
      // Big celebrations: fire confetti only, no overlay text
      fireBigConfetti(event.type);
    }

    // Auto-dismiss
    const dismissTime = DISMISS_DELAY[event.type];
    const timer = setTimeout(() => {
      onComplete();
    }, dismissTime);
    return () => clearTimeout(timer);
  }, [event, onComplete]);

  if (!event) return null;

  const isSmall = event.type === 'level-up';
  const isMedium = event.type === 'question-strong';

  // Only show overlay text for in-session celebrations
  // Big ones (badge, training, quiz) just fire confetti — no overlay
  if (!isSmall && !isMedium) return null;

  // Small celebrations: subtle toast at the top
  if (isSmall) {
    return (
      <AnimatePresence>
        <motion.div
          key={event.title}
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-[200] pointer-events-none"
        >
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/80 backdrop-blur-sm shadow-lg border border-purple-100/60">
            <motion.span
              className="text-xl"
              animate={{ scale: [1, 1.25, 1] }}
              transition={{ duration: 0.4 }}
            >
              {event.icon || '⬆️'}
            </motion.span>
            <div className="flex items-baseline gap-1.5">
              <span className="font-semibold text-sm text-gray-800">{event.title}</span>
              {event.subtitle && (
                <span className="text-xs text-purple-500 font-medium">{event.subtitle}</span>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  // Medium celebrations (question-strong): same toast style, slightly bigger
  return (
    <AnimatePresence>
      <motion.div
        key={event.title}
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -60, opacity: 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-[200] pointer-events-none"
      >
        <div className="flex items-center gap-3 px-5 py-3 rounded-full bg-white/85 backdrop-blur-sm shadow-lg border border-green-200/60">
          <motion.span
            className="text-2xl"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 0.5 }}
          >
            {event.icon || '💪'}
          </motion.span>
          <div>
            <span className="font-bold text-sm text-gray-900">{event.title}</span>
            {event.subtitle && (
              <p className="text-xs text-green-600 font-medium">{event.subtitle}</p>
            )}
          </div>
        </div>
      </motion.div>
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
