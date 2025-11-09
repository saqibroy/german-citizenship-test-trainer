import {
  collection,
  doc,
  getDocs,
  setDoc,
  query,
  orderBy,
  limit,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Progress } from '../types';

/**
 * Alternative SDK-based approach using setDoc with timeout
 * This bypasses the batch write issues
 */

/**
 * Sync user progress to Firestore using individual setDoc calls with timeout
 */
export const syncProgressToCloud = async (
  userId: string,
  progress: Progress
): Promise<void> => {
  try {
    console.log('Syncing progress via SDK with timeout...');
    
    // Create an array of promises for parallel writes
    const writes = Object.entries(progress).map(async ([questionId, data]) => {
      const docRef = doc(db, `users/${userId}/progress/${questionId}`);
      
      // Race between setDoc and timeout
      return Promise.race([
        setDoc(docRef, data, { merge: true }),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Write timeout')), 5000)
        )
      ]);
    });

    // Also write user profile
    const userRef = doc(db, `users/${userId}`);
    const userWrite = Promise.race([
      setDoc(userRef, { lastSyncedAt: new Date() }, { merge: true }),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Write timeout')), 5000)
      )
    ]);

    writes.push(userWrite);

    // Wait for all writes with overall timeout
    await Promise.race([
      Promise.all(writes),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Overall sync timeout')), 10000)
      )
    ]);

    console.log('✓ Progress synced via SDK successfully');
  } catch (error) {
    console.error('Error syncing progress via SDK:', error);
    // Don't throw - allow app to continue
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
    console.log('Syncing quiz history via SDK with timeout...');
    
    const writes = quizHistory.map(async (result) => {
      const docRef = doc(db, `users/${userId}/quizHistory/${result.id}`);
      return Promise.race([
        setDoc(docRef, result, { merge: true }),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Write timeout')), 5000)
        )
      ]);
    });

    await Promise.race([
      Promise.all(writes),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Overall sync timeout')), 10000)
      )
    ]);

    console.log('✓ Quiz history synced via SDK successfully');
  } catch (error) {
    console.error('Error syncing quiz history via SDK:', error);
    // Don't throw - allow app to continue
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
    console.log('Syncing vocab progress via SDK with timeout...');
    
    const writes = Object.entries(vocabProgress).map(async ([wordId, data]) => {
      const docRef = doc(db, `users/${userId}/vocabProgress/${wordId}`);
      return Promise.race([
        setDoc(docRef, data as any, { merge: true }),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Write timeout')), 5000)
        )
      ]);
    });

    await Promise.race([
      Promise.all(writes),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Overall sync timeout')), 10000)
      )
    ]);

    console.log('✓ Vocab progress synced via SDK successfully');
  } catch (error) {
    console.error('Error syncing vocab progress via SDK:', error);
    // Don't throw - allow app to continue
  }
};

/**
 * Load user progress from Firestore
 */
export const loadProgressFromCloud = async (userId: string): Promise<Progress> => {
  try {
    const progressRef = collection(db, `users/${userId}/progress`);
    const snapshot = await getDocs(progressRef);

    const progress: Record<string, any> = {};
    snapshot.forEach((doc) => {
      progress[doc.id] = doc.data();
    });

    console.log('Progress loaded from cloud successfully');
    return progress as Progress;
  } catch (error) {
    console.error('Error loading progress from cloud:', error);
    return {};
  }
};

/**
 * Load quiz history from Firestore
 */
export const loadQuizHistoryFromCloud = async (userId: string): Promise<any[]> => {
  try {
    const quizHistoryRef = collection(db, `users/${userId}/quizHistory`);
    
    // Try with ordering first
    try {
      const q = query(quizHistoryRef, orderBy('completedAt', 'desc'), limit(50));
      const snapshot = await getDocs(q);
      const history = snapshot.docs.map((doc) => doc.data());
      console.log('Quiz history loaded from cloud successfully (with ordering)');
      return history;
    } catch (indexError) {
      // If index doesn't exist, load without ordering
      console.log('Loading quiz history without ordering (index not ready)');
      const snapshot = await getDocs(quizHistoryRef);
      const history = snapshot.docs.map((doc) => doc.data());
      console.log('Quiz history loaded from cloud successfully (without ordering)');
      return history;
    }
  } catch (error) {
    console.error('Error loading quiz history from cloud:', error);
    return [];
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
