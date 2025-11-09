import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  query,
  orderBy,
  limit,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Progress } from '../types';
import { writeDocument } from './firestoreREST';

/**
 * Sync user progress to Firestore using simple batch writes (no merge)
 */
export const syncProgressToCloud = async (
  userId: string,
  progress: Progress
): Promise<void> => {
  try {
    console.log('Syncing progress to Firestore...');
    const start = Date.now();
    
    // Use setDoc with individual calls in parallel (faster than batch)
    const writes = Object.entries(progress).map(([questionId, data]) =>
      setDoc(doc(db, `users/${userId}/progress/${questionId}`), data)
    );

    // Also update user profile
    writes.push(
      setDoc(doc(db, `users/${userId}`), { lastSyncedAt: new Date() }, { merge: true })
    );

    await Promise.all(writes);
    
    const duration = Date.now() - start;
    console.log(`✓ Progress synced successfully in ${duration}ms`);
  } catch (error) {
    console.error('Error syncing progress:', error);
    // Don't throw - allow app to continue with local data
  }
};

/**
 * Load user progress from Firestore
 */
export const loadProgressFromCloud = async (userId: string): Promise<Progress> => {
  try {
    const progressRef = collection(db, `users/${userId}/progress`);
    const snapshot = await getDocs(progressRef);

    const progress: Progress = {};
    snapshot.forEach((doc) => {
      const questionId = parseInt(doc.id, 10);
      if (!isNaN(questionId)) {
        progress[questionId] = doc.data() as any;
      }
    });

    console.log('Progress loaded from cloud successfully');
    return progress;
  } catch (error) {
    console.error('Error loading progress from cloud:', error);
    throw error;
  }
};

/**
 * Sync quiz history to Firestore using parallel writes
 */
export const syncQuizHistoryToCloud = async (
  userId: string,
  quizHistory: any[]
): Promise<void> => {
  try {
    console.log('Syncing quiz history to Firestore...');
    const start = Date.now();
    
    const writes = quizHistory.map((result) =>
      setDoc(doc(db, `users/${userId}/quizHistory/${result.id}`), result)
    );

    await Promise.all(writes);
    
    const duration = Date.now() - start;
    console.log(`✓ Quiz history synced successfully in ${duration}ms`);
  } catch (error) {
    console.error('Error syncing quiz history:', error);
    // Don't throw - allow app to continue
  }
};

/**
 * Load quiz history from Firestore
 */
export const loadQuizHistoryFromCloud = async (userId: string): Promise<any[]> => {
  try {
    const quizHistoryRef = collection(db, `users/${userId}/quizHistory`);
    
    // Try with orderBy first
    try {
      const q = query(quizHistoryRef, orderBy('date', 'desc'), limit(50));
      const snapshot = await getDocs(q);

      const quizHistory: any[] = [];
      snapshot.forEach((doc) => {
        quizHistory.push(doc.data());
      });

      console.log('Quiz history loaded from cloud successfully (with ordering)');
      return quizHistory;
    } catch (queryError: any) {
      // If orderBy fails (index missing or other issue), fallback to simple query
      console.warn('OrderBy query failed, falling back to simple query:', queryError.code);
      
      const snapshot = await getDocs(quizHistoryRef);
      const quizHistory: any[] = [];
      snapshot.forEach((doc) => {
        quizHistory.push(doc.data());
      });

      // Sort in memory if we have date field
      quizHistory.sort((a, b) => {
        if (a.date && b.date) {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
        return 0;
      });

      console.log('Quiz history loaded from cloud successfully (fallback, sorted in memory)');
      return quizHistory.slice(0, 50); // Limit to 50 like the query would
    }
  } catch (error) {
    console.error('Error loading quiz history from cloud:', error);
    // Return empty array instead of throwing to prevent blocking the app
    return [];
  }
};

/**
 * Sync vocabulary progress to Firestore using parallel writes
 */
export const syncVocabProgressToCloud = async (
  userId: string,
  vocabProgress: any
): Promise<void> => {
  try {
    console.log('Syncing vocab progress to Firestore...');
    const start = Date.now();
    
    const writes = Object.entries(vocabProgress).map(([wordId, data]) =>
      setDoc(doc(db, `users/${userId}/vocabProgress/${wordId}`), data as any)
    );

    await Promise.all(writes);
    
    const duration = Date.now() - start;
    console.log(`✓ Vocab progress synced successfully in ${duration}ms`);
  } catch (error) {
    console.error('Error syncing vocab progress:', error);
    // Don't throw - allow app to continue
  }
};

/**
 * Load vocabulary progress from Firestore
 */
export const loadVocabProgressFromCloud = async (userId: string): Promise<any> => {
  try {
    const vocabProgressRef = collection(db, `users/${userId}/vocabProgress`);
    const snapshot = await getDocs(vocabProgressRef);

    const vocabProgress: any = {};
    snapshot.forEach((doc) => {
      vocabProgress[doc.id] = doc.data();
    });

    console.log('Vocabulary progress loaded from cloud successfully');
    return vocabProgress;
  } catch (error) {
    console.error('Error loading vocabulary progress from cloud:', error);
    throw error;
  }
};

/**
 * Migrate local storage data to Firestore (for existing users)
 */
export const migrateLocalDataToCloud = async (userId: string): Promise<void> => {
  try {
    // Load from localStorage
    const progressStr = localStorage.getItem('progress');
    const quizHistoryStr = localStorage.getItem('quizHistory');
    const vocabProgressStr = localStorage.getItem('vocabProgress');

    // Sync to cloud
    if (progressStr) {
      const progress = JSON.parse(progressStr);
      await syncProgressToCloud(userId, progress);
    }

    if (quizHistoryStr) {
      const quizHistory = JSON.parse(quizHistoryStr);
      await syncQuizHistoryToCloud(userId, quizHistory);
    }

    if (vocabProgressStr) {
      const vocabProgress = JSON.parse(vocabProgressStr);
      await syncVocabProgressToCloud(userId, vocabProgress);
    }

    console.log('Local data migrated to cloud successfully');
  } catch (error) {
    console.error('Error migrating local data to cloud:', error);
    throw error;
  }
};

/**
 * Track daily usage for free tier limits via REST API
 */
export const trackDailyUsage = async (
  userId: string,
  type: 'question' | 'quiz'
): Promise<void> => {
  const today = new Date().toISOString().split('T')[0];
  const usageRef = doc(db, `users/${userId}/usage/${today}`);

  try {
    const usageDoc = await getDoc(usageRef);

    if (usageDoc.exists()) {
      const data = usageDoc.data();
      await writeDocument(`users/${userId}/usage`, today, {
        [type === 'question' ? 'questionsAnswered' : 'quizzesTaken']:
          (data[type === 'question' ? 'questionsAnswered' : 'quizzesTaken'] || 0) + 1,
      });
    } else {
      await writeDocument(`users/${userId}/usage`, today, {
        date: today,
        questionsAnswered: type === 'question' ? 1 : 0,
        quizzesTaken: type === 'quiz' ? 1 : 0,
      });
    }
  } catch (error) {
    console.error('Error tracking daily usage:', error);
  }
};

/**
 * Get today's usage stats
 */
export const getTodayUsage = async (
  userId: string
): Promise<{ questionsAnswered: number; quizzesTaken: number }> => {
  const today = new Date().toISOString().split('T')[0];
  const usageRef = doc(db, `users/${userId}/usage/${today}`);

  try {
    const usageDoc = await getDoc(usageRef);

    if (usageDoc.exists()) {
      const data = usageDoc.data();
      return {
        questionsAnswered: data.questionsAnswered || 0,
        quizzesTaken: data.quizzesTaken || 0,
      };
    }

    return { questionsAnswered: 0, quizzesTaken: 0 };
  } catch (error) {
    console.error('Error getting today usage:', error);
    return { questionsAnswered: 0, quizzesTaken: 0 };
  }
};
