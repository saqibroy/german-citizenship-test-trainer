import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { PRICING } from '../config/stripe';
import { getTodayUsage, trackDailyUsage } from '../services/dataService';

interface UsageLimits {
  questionsAnswered: number;
  quizzesTaken: number;
  canAnswerQuestion: boolean;
  canTakeQuiz: boolean;
  questionsRemaining: number;
  quizzesRemaining: number;
}

export const useUsageLimits = () => {
  const { currentUser, userProfile } = useAuth();
  const [usage, setUsage] = useState<UsageLimits>({
    questionsAnswered: 0,
    quizzesTaken: 0,
    canAnswerQuestion: true,
    canTakeQuiz: true,
    questionsRemaining: Infinity,
    quizzesRemaining: Infinity,
  });
  const [loading, setLoading] = useState(true);

  const subscription = userProfile?.subscription || 'free';
  const limits = PRICING[subscription].limits;

  useEffect(() => {
    const loadUsage = async () => {
      if (!currentUser) {
        setLoading(false);
        return;
      }

      try {
        const todayUsage = await getTodayUsage(currentUser.uid);
        
        const questionsRemaining = limits.questionsPerDay - todayUsage.questionsAnswered;
        const quizzesRemaining = limits.quizzesPerDay - todayUsage.quizzesTaken;

        setUsage({
          questionsAnswered: todayUsage.questionsAnswered,
          quizzesTaken: todayUsage.quizzesTaken,
          canAnswerQuestion: todayUsage.questionsAnswered < limits.questionsPerDay,
          canTakeQuiz: todayUsage.quizzesTaken < limits.quizzesPerDay,
          questionsRemaining: Math.max(0, questionsRemaining),
          quizzesRemaining: Math.max(0, quizzesRemaining),
        });
      } catch (error) {
        console.error('Error loading usage:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUsage();
  }, [currentUser, subscription, limits.questionsPerDay, limits.quizzesPerDay]);

  const trackQuestion = async () => {
    if (!currentUser) return;

    try {
      await trackDailyUsage(currentUser.uid, 'question');
      
      setUsage((prev) => {
        const newQuestionsAnswered = prev.questionsAnswered + 1;
        const questionsRemaining = limits.questionsPerDay - newQuestionsAnswered;
        
        return {
          ...prev,
          questionsAnswered: newQuestionsAnswered,
          canAnswerQuestion: newQuestionsAnswered < limits.questionsPerDay,
          questionsRemaining: Math.max(0, questionsRemaining),
        };
      });
    } catch (error) {
      console.error('Error tracking question:', error);
    }
  };

  const trackQuiz = async () => {
    if (!currentUser) return;

    try {
      await trackDailyUsage(currentUser.uid, 'quiz');
      
      setUsage((prev) => {
        const newQuizzesTaken = prev.quizzesTaken + 1;
        const quizzesRemaining = limits.quizzesPerDay - newQuizzesTaken;
        
        return {
          ...prev,
          quizzesTaken: newQuizzesTaken,
          canTakeQuiz: newQuizzesTaken < limits.quizzesPerDay,
          quizzesRemaining: Math.max(0, quizzesRemaining),
        };
      });
    } catch (error) {
      console.error('Error tracking quiz:', error);
    }
  };

  return {
    usage,
    loading,
    trackQuestion,
    trackQuiz,
  };
};
