import { useState, useEffect, useCallback } from 'react';
import { safeGetItem, safeSetItem } from '../utils/storage';
import type { QuestionProgress } from '../types';

/**
 * Custom hook to manage badge system
 * Tracks achievements and unlocks badges based on progress
 */
export function useBadges(
  progress: Record<number, QuestionProgress>,
  quizHistory: any[],
  studyStreak: number,
  totalStudyDays: number
) {
  const [badges, setBadges] = useState<string[]>([]);
  const [newBadges, setNewBadges] = useState<string[]>([]);

  // Load badges on mount
  useEffect(() => {
    const savedBadges = safeGetItem<string[]>('badges', []);
    if (Array.isArray(savedBadges)) {
      setBadges(savedBadges);
    }
  }, []);

  // Check for new badges
  const checkBadges = useCallback(() => {
    const currentBadges = safeGetItem<string[]>('badges', []);
    const earnedBadges: string[] = [];

    // Question-based badges
    const totalCorrect = Object.values(progress).reduce((sum, p) => sum + p.correct, 0);
    const totalQuestions = Object.keys(progress).length;
    const masteredCount = Object.values(progress).filter(p => p.srsLevel === 'mastered').length;

    // First steps
    if (totalQuestions >= 1 && !currentBadges.includes('first_question')) {
      earnedBadges.push('first_question');
    }
    if (totalQuestions >= 10 && !currentBadges.includes('explorer')) {
      earnedBadges.push('explorer');
    }
    if (totalQuestions >= 50 && !currentBadges.includes('dedicated')) {
      earnedBadges.push('dedicated');
    }
    if (totalQuestions >= 100 && !currentBadges.includes('committed')) {
      earnedBadges.push('committed');
    }
    if (totalQuestions >= 310 && !currentBadges.includes('completionist')) {
      earnedBadges.push('completionist');
    }

    // Correct answers
    if (totalCorrect >= 10 && !currentBadges.includes('rookie')) {
      earnedBadges.push('rookie');
    }
    if (totalCorrect >= 50 && !currentBadges.includes('learner')) {
      earnedBadges.push('learner');
    }
    if (totalCorrect >= 100 && !currentBadges.includes('scholar')) {
      earnedBadges.push('scholar');
    }
    if (totalCorrect >= 500 && !currentBadges.includes('expert')) {
      earnedBadges.push('expert');
    }

    // Mastery badges
    if (masteredCount >= 10 && !currentBadges.includes('master_10')) {
      earnedBadges.push('master_10');
    }
    if (masteredCount >= 50 && !currentBadges.includes('master_50')) {
      earnedBadges.push('master_50');
    }
    if (masteredCount >= 100 && !currentBadges.includes('master_100')) {
      earnedBadges.push('master_100');
    }
    if (masteredCount >= 310 && !currentBadges.includes('grandmaster')) {
      earnedBadges.push('grandmaster');
    }

    // Streak badges
    if (studyStreak >= 3 && !currentBadges.includes('streak_3')) {
      earnedBadges.push('streak_3');
    }
    if (studyStreak >= 7 && !currentBadges.includes('week_warrior')) {
      earnedBadges.push('week_warrior');
    }
    if (studyStreak >= 14 && !currentBadges.includes('fortnight_fighter')) {
      earnedBadges.push('fortnight_fighter');
    }
    if (studyStreak >= 30 && !currentBadges.includes('month_master')) {
      earnedBadges.push('month_master');
    }
    if (studyStreak >= 100 && !currentBadges.includes('centurion')) {
      earnedBadges.push('centurion');
    }

    // Total study days
    if (totalStudyDays >= 10 && !currentBadges.includes('consistent_10')) {
      earnedBadges.push('consistent_10');
    }
    if (totalStudyDays >= 30 && !currentBadges.includes('consistent_30')) {
      earnedBadges.push('consistent_30');
    }
    if (totalStudyDays >= 60 && !currentBadges.includes('consistent_60')) {
      earnedBadges.push('consistent_60');
    }

    // Quiz badges
    const passedQuizzes = quizHistory.filter(q => q.score >= 17).length;
    if (quizHistory.length >= 1 && !currentBadges.includes('first_quiz')) {
      earnedBadges.push('first_quiz');
    }
    if (passedQuizzes >= 1 && !currentBadges.includes('quiz_passer')) {
      earnedBadges.push('quiz_passer');
    }
    if (passedQuizzes >= 5 && !currentBadges.includes('quiz_master')) {
      earnedBadges.push('quiz_master');
    }
    if (passedQuizzes >= 10 && !currentBadges.includes('quiz_champion')) {
      earnedBadges.push('quiz_champion');
    }

    // Perfect score
    const perfectQuiz = quizHistory.find(q => q.score === q.total);
    if (perfectQuiz && !currentBadges.includes('perfectionist')) {
      earnedBadges.push('perfectionist');
    }

    // Speed badges
    const avgTime = Object.values(progress)
      .filter(p => p.averageTime > 0)
      .reduce((sum, p, _, arr) => sum + p.averageTime / arr.length, 0);
    if (avgTime < 5 && totalQuestions >= 50 && !currentBadges.includes('speed_demon')) {
      earnedBadges.push('speed_demon');
    }

    // Category mastery would go here if we had category data
    // For now, simplified - can be enhanced later when questions have category metadata

    // Update badges if we earned new ones
    if (earnedBadges.length > 0) {
      const updatedBadges = [...currentBadges, ...earnedBadges];
      setBadges(updatedBadges);
      setNewBadges(earnedBadges);
      safeSetItem('badges', updatedBadges);

      // Clear new badges after showing them
      setTimeout(() => setNewBadges([]), 5000);
    }
  }, [progress, quizHistory, studyStreak, totalStudyDays]);

  // Get badge details
  const getBadgeInfo = (badgeId: string) => {
    const badgeData: Record<string, { name: string; description: string; icon: string }> = {
      first_question: { name: 'First Steps', description: 'Answered your first question', icon: '🎯' },
      explorer: { name: 'Explorer', description: 'Answered 10 questions', icon: '🗺️' },
      dedicated: { name: 'Dedicated', description: 'Answered 50 questions', icon: '💪' },
      committed: { name: 'Committed', description: 'Answered 100 questions', icon: '🔥' },
      completionist: { name: 'Completionist', description: 'Attempted all 310 questions', icon: '🏆' },
      rookie: { name: 'Rookie', description: '10 correct answers', icon: '⭐' },
      learner: { name: 'Learner', description: '50 correct answers', icon: '📚' },
      scholar: { name: 'Scholar', description: '100 correct answers', icon: '🎓' },
      expert: { name: 'Expert', description: '500 correct answers', icon: '👨‍🎓' },
      master_10: { name: 'Master I', description: 'Mastered 10 questions', icon: '🥉' },
      master_50: { name: 'Master II', description: 'Mastered 50 questions', icon: '🥈' },
      master_100: { name: 'Master III', description: 'Mastered 100 questions', icon: '🥇' },
      grandmaster: { name: 'Grandmaster', description: 'Mastered all 310 questions', icon: '👑' },
      streak_3: { name: '3-Day Streak', description: 'Studied 3 days in a row', icon: '🔥' },
      week_warrior: { name: 'Week Warrior', description: '7-day streak', icon: '⚔️' },
      fortnight_fighter: { name: 'Fortnight Fighter', description: '14-day streak', icon: '🛡️' },
      month_master: { name: 'Month Master', description: '30-day streak', icon: '👑' },
      centurion: { name: 'Centurion', description: '100-day streak', icon: '🏛️' },
      consistent_10: { name: 'Consistent', description: 'Studied on 10 different days', icon: '📅' },
      consistent_30: { name: 'Regular', description: 'Studied on 30 different days', icon: '📆' },
      consistent_60: { name: 'Dedicated Student', description: 'Studied on 60 different days', icon: '📊' },
      first_quiz: { name: 'Quiz Taker', description: 'Completed your first quiz', icon: '📝' },
      quiz_passer: { name: 'Quiz Passer', description: 'Passed a quiz (17/33)', icon: '✅' },
      quiz_master: { name: 'Quiz Master', description: 'Passed 5 quizzes', icon: '🎯' },
      quiz_champion: { name: 'Quiz Champion', description: 'Passed 10 quizzes', icon: '🏅' },
      perfectionist: { name: 'Perfectionist', description: 'Got a perfect quiz score (33/33)', icon: '💯' },
      speed_demon: { name: 'Speed Demon', description: 'Average answer time under 5 seconds', icon: '⚡' }
    };

    return badgeData[badgeId] || { name: badgeId, description: '', icon: '🏆' };
  };

  return {
    badges,
    newBadges,
    checkBadges,
    getBadgeInfo
  };
}
