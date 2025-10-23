/**
 * Enhanced Spaced Repetition System (SRS) Algorithm
 * 
 * Combines best practices from:
 * - Anki (SuperMemo SM-2 algorithm)
 * - Duolingo (skill strength & decay)
 * - Leitner System (progressive boxes)
 * 
 * This provides optimal learning retention for the German citizenship test.
 */

import type { QuestionProgress, VocabProgress, SRSLevel, ConfidenceRating } from './types';

// ===== SRS CONFIGURATION =====
// OPTIMIZED FOR EXAM ON DECEMBER 2, 2025 (40 days away)
// Max interval: 7 days to ensure all items reviewed before exam

export const SRS_CONFIG = {
  // Interval multipliers for each confidence rating (Anki-style)
  EASE_FACTORS: {
    again: -0.2,  // Decrease ease, reset to learning
    hard: -0.15,  // Slight decrease
    good: 0.0,    // Maintain ease
    easy: +0.15   // Increase ease for easier future reviews
  },
  
  // Base intervals (in days) for each SRS level
  // EXAM-FOCUSED: Shorter intervals to ensure regular review before Dec 2
  INTERVALS: {
    new: 0,           // Not yet learned
    learning: 0.007,  // 10 minutes (0.007 days)
    young: 1,         // 1 day
    mature: 3,        // 3 days (reduced from 7)
    mastered: 5       // 5 days (reduced from 30) - keeps mastered items fresh
  },
  
  // Graduation requirements (correct answers needed to advance)
  GRADUATION: {
    newToLearning: 1,     // 1 correct answer
    learningToYoung: 2,   // 2 consecutive correct answers
    youngToMature: 3,     // 3 more correct answers (5 total)
    matureToMastered: 5   // 5 more correct answers (10 total)
  },
  
  // Lapse (forget) thresholds
  LAPSE_THRESHOLD: 2,  // 2 incorrect answers triggers demotion
  
  // Minimum/Maximum ease factors
  MIN_EASE: 1.3,
  MAX_EASE: 2.5,
  DEFAULT_EASE: 2.5,
  
  // EXAM-FOCUSED: Maximum interval cap (7 days for Dec 2 exam)
  MAX_INTERVAL: 7  // No item should go more than 7 days without review
};

// ===== HELPER FUNCTIONS =====

/**
 * Calculate days since last review
 */
export function daysSinceLastSeen(lastSeen: string | undefined): number {
  if (!lastSeen) return 999;
  const lastSeenDate = new Date(lastSeen);
  const now = new Date();
  return Math.floor((now.getTime() - lastSeenDate.getTime()) / (1000 * 60 * 60 * 24));
}

/**
 * Determine SRS level based on progress
 */
export function calculateSRSLevel(progress: QuestionProgress | VocabProgress | undefined): SRSLevel {
  if (!progress) return 'new';
  
  const { correct, incorrect, repetitions } = progress;
  const total = correct + incorrect;
  const accuracy = total > 0 ? correct / total : 0;
  
  // NEW: Never seen or very little experience
  if (total === 0) return 'new';
  
  // LEARNING: Just starting out, needs frequent review
  if (total < 3 || accuracy < 0.5 || repetitions < 2) return 'learning';
  
  // YOUNG: Getting the hang of it
  if (total < 6 || accuracy < 0.75 || repetitions < 5) return 'young';
  
  // MATURE: Solid understanding
  if (total < 10 || accuracy < 0.85 || repetitions < 10) return 'mature';
  
  // MASTERED: Excellent retention
  return 'mastered';
}

/**
 * Calculate next review interval based on confidence rating
 * Uses SuperMemo SM-2 algorithm principles
 */
export function calculateNextInterval(
  currentInterval: number,
  easeFactor: number,
  confidence: ConfidenceRating,
  srsLevel: SRSLevel
): { newInterval: number; newEase: number } {
  let newEase = easeFactor;
  let newInterval = currentInterval;
  
  switch (confidence) {
    case 'again':
      // Forgot it - reset to learning phase
      newInterval = SRS_CONFIG.INTERVALS.learning;
      newEase = Math.max(SRS_CONFIG.MIN_EASE, easeFactor + SRS_CONFIG.EASE_FACTORS.again);
      break;
      
    case 'hard':
      // Remembered but struggled
      newInterval = currentInterval * 1.2; // Slight increase
      newEase = Math.max(SRS_CONFIG.MIN_EASE, easeFactor + SRS_CONFIG.EASE_FACTORS.hard);
      break;
      
    case 'good':
      // Normal recall
      if (srsLevel === 'learning') {
        newInterval = SRS_CONFIG.INTERVALS.young; // Graduate to 1 day
      } else {
        newInterval = currentInterval * newEase; // Standard progression
      }
      break;
      
    case 'easy':
      // Perfect recall
      if (srsLevel === 'learning') {
        newInterval = SRS_CONFIG.INTERVALS.mature; // Skip to mature (7 days)
      } else {
        newInterval = currentInterval * (newEase * 1.3); // Bonus multiplier
      }
      newEase = Math.min(SRS_CONFIG.MAX_EASE, easeFactor + SRS_CONFIG.EASE_FACTORS.easy);
      break;
  }
  
  // Ensure minimum intervals per level
  if (srsLevel === 'learning') {
    newInterval = Math.max(SRS_CONFIG.INTERVALS.learning, newInterval);
  } else if (srsLevel === 'young') {
    newInterval = Math.max(SRS_CONFIG.INTERVALS.young, newInterval);
  } else if (srsLevel === 'mature') {
    newInterval = Math.max(SRS_CONFIG.INTERVALS.mature, newInterval);
  }
  
  // EXAM-FOCUSED: Cap maximum interval at 7 days
  newInterval = Math.min(SRS_CONFIG.MAX_INTERVAL, newInterval);
  
  return { newInterval, newEase };
}

/**
 * Calculate priority weight for SRS scheduling
 * Higher weight = higher priority for review
 */
export function calculateSRSWeight(
  progress: QuestionProgress | VocabProgress | undefined,
  tierBonus: number = 0
): number {
  if (!progress) return 8000 + tierBonus; // NEW items - high priority
  
  const { correct, incorrect, lastSeen, interval, srsLevel } = progress;
  const total = correct + incorrect;
  const accuracy = total > 0 ? correct / total : 0;
  const daysSince = daysSinceLastSeen(lastSeen);
  
  let weight = 100;
  
  // OVERDUE: Past the review interval - HIGHEST PRIORITY
  if (daysSince >= interval) {
    const overdueDays = daysSince - interval;
    weight = 10000 + (overdueDays * 200) + tierBonus;
    
    // Extra boost for weak overdue items
    if (srsLevel === 'learning' || accuracy < 0.5) {
      weight += 2000;
    }
    return weight;
  }
  
  // Level-based priority
  switch (srsLevel) {
    case 'learning':
      // Needs frequent practice
      weight = 7000 + (daysSince * 100) + tierBonus;
      break;
      
    case 'young':
      // Still solidifying
      const youngProgress = daysSince / interval;
      if (youngProgress >= 0.7) {
        weight = 5000 + (daysSince * 50) + tierBonus;
      } else {
        weight = 3000 + tierBonus;
      }
      break;
      
    case 'mature':
      // Well-learned, but check periodically
      const matureProgress = daysSince / interval;
      if (matureProgress >= 0.8) {
        weight = 2000 + (daysSince * 20) + tierBonus;
      } else {
        weight = 500 + tierBonus;
      }
      break;
      
    case 'mastered':
      // Only review occasionally
      const masteredProgress = daysSince / interval;
      if (masteredProgress >= 0.9) {
        weight = 1000 + (daysSince * 10) + tierBonus;
      } else {
        weight = 50 + tierBonus;
      }
      break;
      
    case 'new':
    default:
      weight = 8000 + tierBonus;
  }
  
  return weight;
}

/**
 * Update progress after answering (simplified confidence detection)
 * Maps correct/incorrect to confidence ratings
 */
export function updateProgress(
  progress: QuestionProgress | VocabProgress | undefined,
  isCorrect: boolean,
  answerTime: number = 0
): QuestionProgress | VocabProgress {
  const now = new Date().toISOString();
  
  // Initialize new progress
  if (!progress) {
    return {
      correct: isCorrect ? 1 : 0,
      incorrect: isCorrect ? 0 : 1,
      lastSeen: now,
      strength: isCorrect ? 'weak' : 'weak',
      srsLevel: isCorrect ? 'learning' : 'new',
      easeFactor: SRS_CONFIG.DEFAULT_EASE,
      interval: isCorrect ? SRS_CONFIG.INTERVALS.learning : 0,
      repetitions: isCorrect ? 1 : 0,
      lapses: isCorrect ? 0 : 1,
      averageTime: answerTime,
      lastConfidence: isCorrect ? 'good' : 'again'
    };
  }
  
  // Update existing progress
  const newCorrect = progress.correct + (isCorrect ? 1 : 0);
  const newIncorrect = progress.incorrect + (isCorrect ? 0 : 1);
  const total = newCorrect + newIncorrect;
  const accuracy = total > 0 ? newCorrect / total : 0;
  
  // Calculate average time
  const newAvgTime = progress.averageTime 
    ? (progress.averageTime * (total - 1) + answerTime) / total
    : answerTime;
  
  // Determine confidence based on correctness and time
  let confidence: ConfidenceRating;
  if (!isCorrect) {
    confidence = 'again';
  } else if (answerTime < 3) {
    confidence = 'easy';  // Fast correct answer
  } else if (answerTime < 8) {
    confidence = 'good';  // Normal speed
  } else {
    confidence = 'hard';  // Slow but correct
  }
  
  // Calculate new interval and ease
  const { newInterval, newEase } = calculateNextInterval(
    progress.interval,
    progress.easeFactor,
    confidence,
    progress.srsLevel
  );
  
  // Update repetitions and lapses
  const newRepetitions = isCorrect ? progress.repetitions + 1 : 0;
  const newLapses = isCorrect ? progress.lapses : progress.lapses + 1;
  
  // Calculate new SRS level
  const newProgress = {
    correct: newCorrect,
    incorrect: newIncorrect,
    lastSeen: now,
    strength: accuracy >= 0.75 ? 'strong' : accuracy >= 0.5 ? 'medium' : 'weak',
    easeFactor: newEase,
    interval: newInterval,
    repetitions: newRepetitions,
    lapses: newLapses,
    averageTime: newAvgTime,
    lastConfidence: confidence
  } as QuestionProgress | VocabProgress;
  
  newProgress.srsLevel = calculateSRSLevel(newProgress);
  
  return newProgress;
}

/**
 * Get human-readable description of SRS level
 */
export function getSRSLevelInfo(level: SRSLevel, lang: 'de' | 'en' = 'en'): {
  name: string;
  color: string;
  description: string;
  emoji: string;
} {
  const info = {
    new: {
      name: lang === 'de' ? 'Neu' : 'New',
      color: 'blue',
      description: lang === 'de' 
        ? 'Noch nicht gelernt' 
        : 'Not yet learned',
      emoji: '🆕'
    },
    learning: {
      name: lang === 'de' ? 'Lerne' : 'Learning',
      color: 'orange',
      description: lang === 'de'
        ? 'Gerade dabei zu lernen'
        : 'Currently learning',
      emoji: '📚'
    },
    young: {
      name: lang === 'de' ? 'Jung' : 'Young',
      color: 'yellow',
      description: lang === 'de'
        ? 'Kürzlich gelernt'
        : 'Recently learned',
      emoji: '🌱'
    },
    mature: {
      name: lang === 'de' ? 'Reif' : 'Mature',
      color: 'green',
      description: lang === 'de'
        ? 'Gut gelernt (alle 3 Tage)'
        : 'Well learned (every 3 days)',
      emoji: '🌿'
    },
    mastered: {
      name: lang === 'de' ? 'Gemeistert' : 'Mastered',
      color: 'purple',
      description: lang === 'de'
        ? 'Perfekt beherrscht (alle 5-7 Tage)'
        : 'Perfectly mastered (every 5-7 days)',
      emoji: '🏆'
    }
  };
  
  return info[level];
}

/**
 * Calculate test readiness score (0-100%)
 */
export function calculateTestReadiness(
  questionProgress: Record<number, QuestionProgress>,
  totalQuestions: number
): {
  score: number;
  breakdown: {
    coverage: number;      // % of questions seen
    mastery: number;       // % of questions mastered
    averageAccuracy: number;
    readyQuestions: number; // Questions at mature/mastered level
  };
} {
  const seen = Object.keys(questionProgress).length;
  const coverage = (seen / totalQuestions) * 100;
  
  let totalAccuracy = 0;
  let masteredCount = 0;
  let readyCount = 0;
  
  Object.values(questionProgress).forEach(p => {
    const total = p.correct + p.incorrect;
    const accuracy = total > 0 ? p.correct / total : 0;
    totalAccuracy += accuracy;
    
    if (p.srsLevel === 'mastered') masteredCount++;
    if (p.srsLevel === 'mature' || p.srsLevel === 'mastered') readyCount++;
  });
  
  const averageAccuracy = seen > 0 ? (totalAccuracy / seen) * 100 : 0;
  const mastery = (masteredCount / totalQuestions) * 100;
  
  // Weighted score: 40% coverage + 40% mastery + 20% accuracy
  const score = (coverage * 0.4) + (mastery * 0.4) + (averageAccuracy * 0.2);
  
  return {
    score: Math.round(score),
    breakdown: {
      coverage: Math.round(coverage),
      mastery: Math.round(mastery),
      averageAccuracy: Math.round(averageAccuracy),
      readyQuestions: readyCount
    }
  };
}
