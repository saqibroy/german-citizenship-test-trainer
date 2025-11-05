import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  writeBatch,
  query,
  orderBy,
  limit,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Progress } from '../types';

/**
 * Sync user progress to Firestore
 */
export const syncProgressToCloud = async (
  userId: string,
  progress: Progress
): Promise<void> => {
  try {
    const batch = writeBatch(db);

    Object.entries(progress).forEach(([questionId, data]) => {
      const ref = doc(db, `users/${userId}/progress/${questionId}`);
      batch.set(ref, data as any, { merge: true });
    });

    await batch.commit();

    // Update last synced timestamp
    await updateDoc(doc(db, 'users', userId), {
      lastSyncedAt: new Date().toISOString(),
    });

    console.log('Progress synced to cloud successfully');
  } catch (error) {
    console.error('Error syncing progress to cloud:', error);
    throw error;
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
 * Sync quiz history to Firestore
 */
export const syncQuizHistoryToCloud = async (
  userId: string,
  quizHistory: any[]
): Promise<void> => {
  try {
    const batch = writeBatch(db);

    quizHistory.forEach((quiz, index) => {
      const ref = doc(db, `users/${userId}/quizHistory/${quiz.date || index}`);
      batch.set(ref, quiz, { merge: true });
    });

    await batch.commit();
    console.log('Quiz history synced to cloud successfully');
  } catch (error) {
    console.error('Error syncing quiz history to cloud:', error);
    throw error;
  }
};

/**
 * Load quiz history from Firestore
 */
export const loadQuizHistoryFromCloud = async (userId: string): Promise<any[]> => {
  try {
    const quizHistoryRef = collection(db, `users/${userId}/quizHistory`);
    const q = query(quizHistoryRef, orderBy('date', 'desc'), limit(50));
    const snapshot = await getDocs(q);

    const quizHistory: any[] = [];
    snapshot.forEach((doc) => {
      quizHistory.push(doc.data());
    });

    console.log('Quiz history loaded from cloud successfully');
    return quizHistory;
  } catch (error) {
    console.error('Error loading quiz history from cloud:', error);
    throw error;
  }
};

/**
 * Sync vocabulary progress to Firestore
 */
export const syncVocabProgressToCloud = async (
  userId: string,
  vocabProgress: any
): Promise<void> => {
  try {
    const batch = writeBatch(db);

    Object.entries(vocabProgress).forEach(([wordId, data]) => {
      const ref = doc(db, `users/${userId}/vocabProgress/${wordId}`);
      batch.set(ref, data as any, { merge: true });
    });

    await batch.commit();
    console.log('Vocabulary progress synced to cloud successfully');
  } catch (error) {
    console.error('Error syncing vocabulary progress to cloud:', error);
    throw error;
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
 * Track daily usage for free tier limits
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
      await updateDoc(usageRef, {
        [type === 'question' ? 'questionsAnswered' : 'quizzesTaken']:
          (data[type === 'question' ? 'questionsAnswered' : 'quizzesTaken'] || 0) + 1,
      });
    } else {
      await setDoc(usageRef, {
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
