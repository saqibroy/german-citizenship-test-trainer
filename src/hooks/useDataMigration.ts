import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  saveProgressToFirestore, 
  saveQuizToFirestore,
  saveBadgesToFirestore,
  saveStatsToFirestore,
  loadProgressFromFirestore
} from '../services/firestoreService';
import { safeGetItem } from '../utils/storage';
import type { QuestionProgress, Quiz, Badge } from '../types';

/**
 * Hook to automatically migrate localStorage data to Firestore on first login
 * This ensures existing users don't lose their progress when they create an account
 */
export function useDataMigration() {
  const { user } = useAuth();
  const [isMigrating, setIsMigrating] = useState(false);
  const [migrationComplete, setMigrationComplete] = useState(false);
  const [migrationError, setMigrationError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const migrateData = async () => {
      try {
        // Check if migration was already done for this user
        const migrationKey = `migrated_${user.uid}`;
        const alreadyMigrated = localStorage.getItem(migrationKey);
        
        if (alreadyMigrated) {
          console.log('✅ Data already migrated for this user');
          // Don't show banner if already migrated
          return;
        }

        setIsMigrating(true);
        console.log('🔄 Starting localStorage → Firestore migration...');

        // Check if user already has data in Firestore
        const existingProgress = await loadProgressFromFirestore(user.uid);
        const hasCloudData = Object.keys(existingProgress).length > 0;

        if (hasCloudData) {
          console.log('📦 User already has data in cloud, skipping migration');
          localStorage.setItem(migrationKey, 'true');
          // Don't show banner - just mark as done silently
          setIsMigrating(false);
          return;
        }

        // Load all localStorage data
        const localProgress = safeGetItem<Record<string, QuestionProgress>>('progress', {});
        const localQuizHistory = safeGetItem<Quiz[]>('quizHistory', []);
        const localBadges = safeGetItem<string[]>('badges', []);
        const localStudyStreak = safeGetItem<number>('studyStreak', 0);
        const localTotalStudyDays = safeGetItem<number>('totalStudyDays', 0);
        const localLastStudyDate = safeGetItem<string>('lastStudyDate', new Date().toISOString());

        // Check if there's any data to migrate
        const hasLocalData = 
          Object.keys(localProgress).length > 0 || 
          localQuizHistory.length > 0 || 
          localBadges.length > 0 ||
          localStudyStreak > 0;

        if (!hasLocalData) {
          console.log('📭 No local data to migrate');
          localStorage.setItem(migrationKey, 'true');
          setMigrationComplete(true);
          setIsMigrating(false);
          return;
        }

        console.log('📊 Found local data:', {
          progress: Object.keys(localProgress).length,
          quizzes: localQuizHistory.length,
          badges: localBadges.length,
          streak: localStudyStreak
        });

        // Migrate progress (batch operation)
        if (Object.keys(localProgress).length > 0) {
          console.log('📤 Migrating progress...');
          const progressPromises = Object.entries(localProgress).map(([qId, progress]) =>
            saveProgressToFirestore(user.uid, parseInt(qId), progress)
          );
          await Promise.all(progressPromises);
          console.log('✅ Progress migrated');
        }

        // Migrate quiz history
        if (localQuizHistory.length > 0) {
          console.log('📤 Migrating quiz history...');
          const quizPromises = localQuizHistory.map(quiz => {
            const { id, ...quizData } = quiz as any;
            return saveQuizToFirestore(user.uid, quizData);
          });
          await Promise.all(quizPromises);
          console.log('✅ Quiz history migrated');
        }

        // Migrate badges (convert strings to Badge objects)
        if (localBadges.length > 0) {
          console.log('📤 Migrating badges...');
          const badgeObjects: Badge[] = localBadges.map((name, index) => ({
            id: `badge_${index}`,
            name,
            description: name,
            icon: '🏆',
            unlocked: true,
            unlockedAt: new Date().toISOString()
          }));
          await saveBadgesToFirestore(user.uid, badgeObjects);
          console.log('✅ Badges migrated');
        }

        // Migrate stats
        if (localStudyStreak > 0 || localTotalStudyDays > 0) {
          console.log('📤 Migrating stats...');
          await saveStatsToFirestore(user.uid, {
            studyStreak: localStudyStreak,
            totalStudyDays: localTotalStudyDays,
            lastStudyDate: localLastStudyDate
          });
          console.log('✅ Stats migrated');
        }

        // Mark migration as complete
        localStorage.setItem(migrationKey, 'true');
        setMigrationComplete(true);
        console.log('🎉 Migration complete!');

        // Auto-hide success banner after 3.5 seconds
        setTimeout(() => {
          setMigrationComplete(false);
        }, 3500);

      } catch (error) {
        console.error('❌ Migration error:', error);
        setMigrationError('Failed to migrate data. Your local data is safe.');
      } finally {
        setIsMigrating(false);
      }
    };

    migrateData();
  }, [user]);

  return {
    isMigrating,
    migrationComplete,
    migrationError
  };
}
