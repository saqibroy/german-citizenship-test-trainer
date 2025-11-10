import { useState, useEffect, useCallback } from 'react';
import { safeGetItem, safeSetItem, validateProgressData } from '../utils/storage';
import type { QuestionProgress, Question } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { syncProgressViaREST } from '../services/firestoreREST'; // Use REST API
import { debounce } from 'lodash';

/**
 * Custom hook to manage question progress
 * Handles loading, saving, and updating progress data
 */
export function useProgress(questions: Question[]) {
  const { currentUser } = useAuth();
  const [progress, setProgress] = useState<Record<number, QuestionProgress>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Debounced sync function using the REST API
  const debouncedSync = useCallback(
    debounce((userId: string, newProgress: Record<number, QuestionProgress>) => {
      if (Object.keys(newProgress).length > 0) {
        console.log('Syncing progress via REST...');
        // Create a clean copy of the progress data to avoid sending undefined values
        const cleanProgress = JSON.parse(JSON.stringify(newProgress));
        syncProgressViaREST(userId, cleanProgress).catch(err => {
          console.error("REST sync failed:", err);
        });
      }
    }, 3000),
    []
  );

  // Load progress on mount
  useEffect(() => {
    const savedProgress: Record<number, QuestionProgress> = {};
    questions.forEach((q) => {
      const data = safeGetItem<QuestionProgress | null>(`q_${q.id}`, null);
      if (data && validateProgressData({ [q.id]: data })) {
        savedProgress[q.id] = data;
      }
    });
    setProgress(savedProgress);
    setIsLoaded(true);
  }, [questions]);

  // Sync progress to cloud when it changes
  useEffect(() => {
    if (currentUser && isLoaded && Object.keys(progress).length > 0) {
      debouncedSync(currentUser.uid, progress);
    }
  }, [progress, currentUser, isLoaded, debouncedSync]);

  // Update progress for a single question
  const updateProgress = (questionId: number, newProgress: QuestionProgress) => {
    setProgress(prev => ({
      ...prev,
      [questionId]: newProgress
    }));
    safeSetItem(`q_${questionId}`, newProgress);
  };

  // Get progress for a specific question
  const getProgress = (questionId: number): QuestionProgress | undefined => {
    return progress[questionId];
  };

  // Get total stats
  const getTotalStats = () => {
    const stats = {
      total: questions.length,
      attempted: 0,
      correct: 0,
      incorrect: 0,
      mastered: 0,
      mature: 0,
      young: 0,
      learning: 0,
      new: 0
    };

    questions.forEach(q => {
      const p = progress[q.id];
      if (p) {
        stats.attempted++;
        stats.correct += p.correct;
        stats.incorrect += p.incorrect;
        
        switch (p.srsLevel) {
          case 'mastered': stats.mastered++; break;
          case 'mature': stats.mature++; break;
          case 'young': stats.young++; break;
          case 'learning': stats.learning++; break;
          default: stats.new++; break;
        }
      } else {
        stats.new++;
      }
    });

    return stats;
  };

  return {
    progress,
    updateProgress,
    getProgress,
    getTotalStats
  };
}
