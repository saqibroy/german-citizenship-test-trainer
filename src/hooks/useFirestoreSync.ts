import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  saveProgressToFirestore,
  saveStatsToFirestore,
} from '../services/firestoreService';
import type { QuestionProgress } from '../types';

interface UseFirestoreSyncProps {
  progress: Record<number, QuestionProgress>;
  studyStreak: number;
  totalStudyDays: number;
}

interface UseFirestoreSyncReturn {
  isSyncing: boolean;
  lastSynced: Date | null;
  syncError: string | null;
  syncProgress: (questionId: number, questionProgress: QuestionProgress) => Promise<void>;
}

/**
 * Hook to sync user data with Firestore
 * Provides real-time synchronization of progress and stats
 */
export function useFirestoreSync({
  studyStreak,
  totalStudyDays,
}: UseFirestoreSyncProps): UseFirestoreSyncReturn {
  const { user } = useAuth();
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSynced, setLastSynced] = useState<Date | null>(null);
  const [syncError, setSyncError] = useState<string | null>(null);

  // Sync individual progress update
  const syncProgress = useCallback(async (questionId: number, questionProgress: QuestionProgress) => {
    if (!user) return;

    try {
      await saveProgressToFirestore(user.uid, questionId, questionProgress);
      setLastSynced(new Date());
      setSyncError(null);
    } catch (error) {
      console.error('Error syncing progress:', error);
      setSyncError('Failed to sync');
    }
  }, [user]);

  // Auto-sync stats periodically
  useEffect(() => {
    if (!user) return;

    const syncStats = async () => {
      try {
        setIsSyncing(true);
        await saveStatsToFirestore(user.uid, {
          studyStreak,
          totalStudyDays,
          lastStudyDate: new Date().toISOString(),
        });
        setLastSynced(new Date());
        setSyncError(null);
      } catch (error) {
        console.error('Error syncing stats:', error);
        setSyncError('Failed to sync stats');
      } finally {
        setIsSyncing(false);
      }
    };

    // Debounce - sync 3 seconds after stats change
    const timer = setTimeout(syncStats, 3000);
    return () => clearTimeout(timer);
  }, [user, studyStreak, totalStudyDays]);

  return {
    isSyncing,
    lastSynced,
    syncError,
    syncProgress,
  };
}
