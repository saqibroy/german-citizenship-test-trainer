import { useState, useEffect, useCallback } from 'react';
import { safeGetItem, safeSetItem } from '../utils/storage';

interface StreakData {
  streak: number;
  lastStudyDate: string;
  longestStreak: number;
  totalStudyDays: number;
}

/**
 * Custom hook to manage study streak with proper date handling
 * Includes 4-hour grace period for late-night studying
 */
export function useStudyStreak() {
  const [studyStreak, setStudyStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [totalStudyDays, setTotalStudyDays] = useState(0);

  // Load streak data on mount
  useEffect(() => {
    const streakData = safeGetItem<StreakData | null>('studyStreak', null);
    if (streakData && typeof streakData.streak === 'number') {
      const today = getStudyDay(new Date());
      const yesterday = getStudyDay(new Date(Date.now() - 24 * 60 * 60 * 1000));
      const lastStudy = streakData.lastStudyDate;

      if (lastStudy === today) {
        // Already studied today
        setStudyStreak(streakData.streak);
      } else if (lastStudy === yesterday) {
        // Studied yesterday, maintain streak
        setStudyStreak(streakData.streak);
      } else {
        // Streak broken
        setStudyStreak(0);
      }

      setLongestStreak(streakData.longestStreak || 0);
      setTotalStudyDays(streakData.totalStudyDays || 0);
    }
  }, []);

  // Get study day with 4-hour grace period
  // If it's before 4 AM, consider it part of previous day
  const getStudyDay = (date: Date): string => {
    const adjustedDate = new Date(date);
    if (adjustedDate.getHours() < 4) {
      adjustedDate.setDate(adjustedDate.getDate() - 1);
    }
    return adjustedDate.toDateString();
  };

  // Update streak when user studies
  const updateStreak = useCallback(() => {
    const today = getStudyDay(new Date());
    const streakData = safeGetItem<StreakData | null>('studyStreak', null);

    if (!streakData) {
      // First time studying
      const newData: StreakData = {
        streak: 1,
        lastStudyDate: today,
        longestStreak: 1,
        totalStudyDays: 1
      };
      setStudyStreak(1);
      setLongestStreak(1);
      setTotalStudyDays(1);
      safeSetItem('studyStreak', newData);
      return;
    }

    const lastStudy = streakData.lastStudyDate;

    if (lastStudy === today) {
      // Already studied today, no change
      return;
    }

    const yesterday = getStudyDay(new Date(Date.now() - 24 * 60 * 60 * 1000));

    let newStreak: number;
    if (lastStudy === yesterday) {
      // Continuing streak
      newStreak = streakData.streak + 1;
    } else {
      // Streak broken, start fresh
      newStreak = 1;
    }

    const newLongest = Math.max(newStreak, streakData.longestStreak || 0);
    const newTotal = (streakData.totalStudyDays || 0) + 1;

    const newData: StreakData = {
      streak: newStreak,
      lastStudyDate: today,
      longestStreak: newLongest,
      totalStudyDays: newTotal
    };

    setStudyStreak(newStreak);
    setLongestStreak(newLongest);
    setTotalStudyDays(newTotal);
    safeSetItem('studyStreak', newData);
  }, []);

  // Reset streak (for testing or user request)
  const resetStreak = useCallback(() => {
    const newData: StreakData = {
      streak: 0,
      lastStudyDate: '',
      longestStreak,
      totalStudyDays
    };
    setStudyStreak(0);
    safeSetItem('studyStreak', newData);
  }, [longestStreak, totalStudyDays]);

  return {
    studyStreak,
    longestStreak,
    totalStudyDays,
    updateStreak,
    resetStreak
  };
}
