import { useState, useEffect } from 'react';
import { safeGetItem, safeSetItem, validateQuizHistory } from '../utils/storage';
import type { QuizResult } from '../types';

/**
 * Custom hook to manage quiz history
 * Handles loading, saving, and analyzing quiz results
 */
export function useQuizHistory() {
  const [quizHistory, setQuizHistory] = useState<QuizResult[]>([]);

  // Load quiz history on mount
  useEffect(() => {
    const historyData = safeGetItem<QuizResult[]>('quizHistory', []);
    if (validateQuizHistory(historyData)) {
      setQuizHistory(historyData);
    }
  }, []);

  // Add a new quiz result
  const addQuizResult = (result: QuizResult) => {
    const newHistory = [result, ...quizHistory].slice(0, 10); // Keep last 10
    setQuizHistory(newHistory);
    safeSetItem('quizHistory', newHistory);
  };

  // Get stats from quiz history
  const getQuizStats = () => {
    if (quizHistory.length === 0) {
      return {
        totalQuizzes: 0,
        averageScore: 0,
        bestScore: 0,
        passRate: 0,
        recentTrend: 'none' as 'improving' | 'declining' | 'stable' | 'none'
      };
    }

    const totalQuizzes = quizHistory.length;
    const scores = quizHistory.map(q => (q.score / q.total) * 100);
    const averageScore = scores.reduce((a, b) => a + b, 0) / scores.length;
    const bestScore = Math.max(...scores);
    const passed = quizHistory.filter(q => q.score >= 17).length;
    const passRate = (passed / totalQuizzes) * 100;

    // Calculate trend (last 3 vs previous 3)
    let recentTrend: 'improving' | 'declining' | 'stable' | 'none' = 'none';
    if (quizHistory.length >= 6) {
      const recent = scores.slice(0, 3).reduce((a, b) => a + b, 0) / 3;
      const previous = scores.slice(3, 6).reduce((a, b) => a + b, 0) / 3;
      if (recent > previous + 5) recentTrend = 'improving';
      else if (recent < previous - 5) recentTrend = 'declining';
      else recentTrend = 'stable';
    }

    return {
      totalQuizzes,
      averageScore: Math.round(averageScore),
      bestScore: Math.round(bestScore),
      passRate: Math.round(passRate),
      recentTrend
    };
  };

  // Get most recent quiz
  const getLatestQuiz = (): QuizResult | null => {
    return quizHistory.length > 0 ? quizHistory[0] : null;
  };

  // Clear all history
  const clearHistory = () => {
    setQuizHistory([]);
    safeSetItem('quizHistory', []);
  };

  return {
    quizHistory,
    addQuizResult,
    getQuizStats,
    getLatestQuiz,
    clearHistory
  };
}
