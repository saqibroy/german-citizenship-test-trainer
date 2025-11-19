import {
  doc,
  setDoc,
  getDoc,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  getDocs,
  onSnapshot,
  Timestamp,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { QuestionProgress, Quiz, Badge } from '../types';

// ============================================
// USER PROGRESS SYNC
// ============================================

export async function saveProgressToFirestore(
  userId: string,
  questionId: number,
  progress: QuestionProgress
): Promise<void> {
  try {
    const progressRef = doc(db, `users/${userId}/progress/${questionId}`);
    await setDoc(progressRef, {
      ...progress,
      updatedAt: serverTimestamp()
    }, { merge: true });
  } catch (error) {
    console.error('Error saving progress:', error);
    throw error;
  }
}

export async function loadProgressFromFirestore(
  userId: string
): Promise<Record<number, QuestionProgress>> {
  try {
    const progressCollection = collection(db, `users/${userId}/progress`);
    const snapshot = await getDocs(progressCollection);
    
    const progress: Record<number, QuestionProgress> = {};
    snapshot.forEach((doc) => {
      const data = doc.data();
      progress[parseInt(doc.id)] = {
        correct: data.correct || 0,
        incorrect: data.incorrect || 0,
        strength: data.strength || 'new',
        lastSeen: data.lastSeen || new Date().toISOString(),
        easeFactor: data.easeFactor || 2.5,
        interval: data.interval || 0,
        repetitions: data.repetitions || 0,
        srsLevel: data.srsLevel || 'new',
        lapses: data.lapses || 0,
        averageTime: data.averageTime || 5
      };
    });
    
    return progress;
  } catch (error) {
    console.error('Error loading progress:', error);
    throw error;
  }
}

export function subscribeToProgressUpdates(
  userId: string,
  callback: (progress: Record<number, QuestionProgress>) => void
): () => void {
  const progressCollection = collection(db, `users/${userId}/progress`);
  
  return onSnapshot(progressCollection, (snapshot) => {
    const progress: Record<number, QuestionProgress> = {};
    snapshot.forEach((doc) => {
      const data = doc.data();
      progress[parseInt(doc.id)] = {
        correct: data.correct || 0,
        incorrect: data.incorrect || 0,
        strength: data.strength || 'new',
        lastSeen: data.lastSeen || new Date().toISOString(),
        easeFactor: data.easeFactor || 2.5,
        interval: data.interval || 0,
        repetitions: data.repetitions || 0,
        srsLevel: data.srsLevel || 'new',
        lapses: data.lapses || 0,
        averageTime: data.averageTime || 5
      };
    });
    callback(progress);
  });
}

// ============================================
// QUIZ HISTORY SYNC
// ============================================

export async function saveQuizToFirestore(
  userId: string,
  quiz: Omit<Quiz, 'id'>
): Promise<string> {
  try {
    const quizzesCollection = collection(db, `users/${userId}/quizzes`);
    const docRef = await addDoc(quizzesCollection, {
      ...quiz,
      date: quiz.date || Timestamp.now(),
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error saving quiz:', error);
    throw error;
  }
}

export async function loadQuizzesFromFirestore(
  userId: string,
  limitCount: number = 10
): Promise<Quiz[]> {
  try {
    const quizzesCollection = collection(db, `users/${userId}/quizzes`);
    const q = query(quizzesCollection, orderBy('date', 'desc'), limit(limitCount));
    const snapshot = await getDocs(q);
    
    const quizzes: Quiz[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      quizzes.push({
        id: doc.id,
        score: data.score,
        total: data.total,
        date: data.date?.toDate?.() || new Date(),
        categoryBreakdown: data.categoryBreakdown || {}
      });
    });
    
    return quizzes;
  } catch (error) {
    console.error('Error loading quizzes:', error);
    throw error;
  }
}

// ============================================
// STUDY STATS SYNC
// ============================================

export async function saveStatsToFirestore(
  userId: string,
  stats: {
    studyStreak: number;
    totalStudyDays: number;
    lastStudyDate: string;
  }
): Promise<void> {
  try {
    const statsRef = doc(db, `users/${userId}/stats/general`);
    await setDoc(statsRef, {
      ...stats,
      updatedAt: serverTimestamp()
    }, { merge: true });
  } catch (error) {
    console.error('Error saving stats:', error);
    throw error;
  }
}

export async function loadStatsFromFirestore(userId: string): Promise<{
  studyStreak: number;
  totalStudyDays: number;
  lastStudyDate: string;
} | null> {
  try {
    const statsRef = doc(db, `users/${userId}/stats/general`);
    const snapshot = await getDoc(statsRef);
    
    if (!snapshot.exists()) {
      return null;
    }
    
    const data = snapshot.data();
    return {
      studyStreak: data.studyStreak || 0,
      totalStudyDays: data.totalStudyDays || 0,
      lastStudyDate: data.lastStudyDate || new Date().toISOString()
    };
  } catch (error) {
    console.error('Error loading stats:', error);
    throw error;
  }
}

// ============================================
// BADGES SYNC
// ============================================

export async function saveBadgesToFirestore(
  userId: string,
  badges: Badge[]
): Promise<void> {
  try {
    const badgesRef = doc(db, `users/${userId}/achievements/badges`);
    await setDoc(badgesRef, {
      badges: badges.map(b => ({
        id: b.id,
        name: b.name,
        description: b.description,
        icon: b.icon,
        unlocked: b.unlocked,
        unlockedAt: b.unlockedAt,
        progress: b.progress,
        requirement: b.requirement
      })),
      updatedAt: serverTimestamp()
    }, { merge: true });
  } catch (error) {
    console.error('Error saving badges:', error);
    throw error;
  }
}

export async function loadBadgesFromFirestore(userId: string): Promise<Badge[] | null> {
  try {
    const badgesRef = doc(db, `users/${userId}/achievements/badges`);
    const snapshot = await getDoc(badgesRef);
    
    if (!snapshot.exists()) {
      return null;
    }
    
    const data = snapshot.data();
    return data.badges || null;
  } catch (error) {
    console.error('Error loading badges:', error);
    throw error;
  }
}

// ============================================
// USER PROFILE
// ============================================

export async function saveUserProfile(
  userId: string,
  profile: {
    displayName?: string;
    language?: string;
    preferences?: any;
  }
): Promise<void> {
  try {
    const profileRef = doc(db, `users/${userId}`);
    await setDoc(profileRef, {
      ...profile,
      updatedAt: serverTimestamp()
    }, { merge: true });
  } catch (error) {
    console.error('Error saving profile:', error);
    throw error;
  }
}

export async function loadUserProfile(userId: string): Promise<any | null> {
  try {
    const profileRef = doc(db, `users/${userId}`);
    const snapshot = await getDoc(profileRef);
    
    if (!snapshot.exists()) {
      return null;
    }
    
    return snapshot.data();
  } catch (error) {
    console.error('Error loading profile:', error);
    throw error;
  }
}

// ============================================
// MIGRATION HELPERS
// ============================================

export async function migrateLocalDataToFirestore(
  userId: string,
  localData: {
    progress: Record<number, QuestionProgress>;
    quizHistory: Quiz[];
    badges: Badge[];
    studyStreak: number;
    totalStudyDays: number;
    lastStudyDate: string;
  }
): Promise<void> {
  try {
    console.log('🔄 Starting data migration to Firestore...');

    // Migrate progress (batch operation)
    const progressPromises = Object.entries(localData.progress).map(([id, prog]) =>
      saveProgressToFirestore(userId, parseInt(id), prog)
    );
    await Promise.all(progressPromises);
    console.log('✅ Progress migrated');

    // Migrate quiz history
    const quizPromises = localData.quizHistory.map(quiz => {
      const { id, ...quizData } = quiz;
      return saveQuizToFirestore(userId, quizData);
    });
    await Promise.all(quizPromises);
    console.log('✅ Quiz history migrated');

    // Migrate badges
    await saveBadgesToFirestore(userId, localData.badges);
    console.log('✅ Badges migrated');

    // Migrate stats
    await saveStatsToFirestore(userId, {
      studyStreak: localData.studyStreak,
      totalStudyDays: localData.totalStudyDays,
      lastStudyDate: localData.lastStudyDate
    });
    console.log('✅ Study stats migrated');

    console.log('🎉 Migration complete!');
  } catch (error) {
    console.error('❌ Migration error:', error);
    throw error;
  }
}

// ============================================
// VOCABULARY PROGRESS (if needed)
// ============================================

export async function saveVocabProgressToFirestore(
  userId: string,
  vocabProgress: Record<string, any>
): Promise<void> {
  try {
    const vocabRef = doc(db, `users/${userId}/vocabulary/progress`);
    await setDoc(vocabRef, {
      progress: vocabProgress,
      updatedAt: serverTimestamp()
    }, { merge: true });
  } catch (error) {
    console.error('Error saving vocab progress:', error);
    throw error;
  }
}

export async function loadVocabProgressFromFirestore(
  userId: string
): Promise<Record<string, any> | null> {
  try {
    const vocabRef = doc(db, `users/${userId}/vocabulary/progress`);
    const snapshot = await getDoc(vocabRef);
    
    if (!snapshot.exists()) {
      return null;
    }
    
    return snapshot.data().progress || null;
  } catch (error) {
    console.error('Error loading vocab progress:', error);
    throw error;
  }
}
