import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { UserProfile, DEFAULT_USER_SETTINGS } from '../types/user';
import {
  loadProgressFromCloud,
  loadQuizHistoryFromCloud,
  loadVocabProgressFromCloud,
  syncProgressToCloud,
  syncQuizHistoryToCloud,
  syncVocabProgressToCloud,
} from '../services/dataService';

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signup: (email: string, password: string, displayName: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<void>;
  syncDataToCloud: () => Promise<void>;
  loadDataFromCloud: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Create user profile in Firestore
  const createUserProfile = async (user: User, displayName?: string): Promise<void> => {
    const userRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      const newProfile: UserProfile = {
        uid: user.uid,
        email: user.email!,
        displayName: displayName || user.displayName || '',
        photoURL: user.photoURL,
        subscription: 'free',
        dailyGoal: 10,
        createdAt: new Date(),
        settings: DEFAULT_USER_SETTINGS,
      };

      await setDoc(userRef, {
        ...newProfile,
        createdAt: new Date().toISOString(),
      });

      setUserProfile(newProfile);
    } else {
      const data = userDoc.data();
      setUserProfile({
        ...data,
        createdAt: new Date(data.createdAt),
        lastSyncedAt: data.lastSyncedAt ? new Date(data.lastSyncedAt) : undefined,
      } as UserProfile);
    }
  };

  // Load user profile from Firestore
  const loadUserProfile = async (user: User): Promise<void> => {
    // Set basic profile immediately so app works right away
    const fallbackProfile: UserProfile = {
      uid: user.uid,
      email: user.email!,
      displayName: user.displayName || '',
      photoURL: user.photoURL,
      subscription: 'free',
      dailyGoal: 10,
      createdAt: new Date(),
      settings: DEFAULT_USER_SETTINGS,
    };
    
    setUserProfile(fallbackProfile);

    try {
      // Then try to load from Firestore in background
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const data = userDoc.data();
        setUserProfile({
          ...data,
          createdAt: new Date(data.createdAt),
          lastSyncedAt: data.lastSyncedAt ? new Date(data.lastSyncedAt) : undefined,
        } as UserProfile);
      } else {
        // Create profile in Firestore for future
        await createUserProfile(user);
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
      // Keep using fallback profile - already set above
    }
  };

  // Sign up with email and password
  const signup = async (email: string, password: string, displayName: string): Promise<void> => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Update display name
    await updateProfile(userCredential.user, { displayName });
    
    // Create user profile
    await createUserProfile(userCredential.user, displayName);
  };

  // Login with email and password
  const login = async (email: string, password: string): Promise<void> => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  // Login with Google
  const loginWithGoogle = async (): Promise<void> => {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    await createUserProfile(userCredential.user);
  };

  // Sync local data to Firestore
  const syncDataToCloud = async (): Promise<void> => {
    if (!currentUser) return;

    try {
      // Get data from localStorage
      const progress: any = {};
      const quizHistory: any[] = [];
      const vocabProgress: any = {};

      // Collect progress data
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('q_')) {
          const qId = key.replace('q_', '');
          try {
            progress[qId] = JSON.parse(localStorage.getItem(key) || '{}');
          } catch (e) {
            console.error(`Error parsing ${key}:`, e);
          }
        }
      });

      // Get quiz history
      const savedQuizHistory = localStorage.getItem('quizHistory');
      if (savedQuizHistory) {
        quizHistory.push(...JSON.parse(savedQuizHistory));
      }

      // Get vocab progress
      const savedVocabProgress = localStorage.getItem('vocabProgress');
      if (savedVocabProgress) {
        Object.assign(vocabProgress, JSON.parse(savedVocabProgress));
      }

      // Sync to cloud
      await Promise.all([
        Object.keys(progress).length > 0 ? syncProgressToCloud(currentUser.uid, progress) : Promise.resolve(),
        quizHistory.length > 0 ? syncQuizHistoryToCloud(currentUser.uid, quizHistory) : Promise.resolve(),
        Object.keys(vocabProgress).length > 0 ? syncVocabProgressToCloud(currentUser.uid, vocabProgress) : Promise.resolve(),
      ]);

      console.log('Data synced to cloud successfully');
    } catch (error) {
      console.error('Error syncing data to cloud:', error);
    }
  };

  // Load data from Firestore
  const loadDataFromCloud = async (): Promise<void> => {
    if (!currentUser) return;

    try {
      // Load data from cloud
      const [progress, quizHistory, vocabProgress] = await Promise.all([
        loadProgressFromCloud(currentUser.uid),
        loadQuizHistoryFromCloud(currentUser.uid),
        loadVocabProgressFromCloud(currentUser.uid),
      ]);

      // Save to localStorage
      Object.entries(progress).forEach(([qId, data]) => {
        localStorage.setItem(`q_${qId}`, JSON.stringify(data));
      });

      if (quizHistory.length > 0) {
        localStorage.setItem('quizHistory', JSON.stringify(quizHistory));
      }

      if (Object.keys(vocabProgress).length > 0) {
        localStorage.setItem('vocabProgress', JSON.stringify(vocabProgress));
      }

      console.log('Data loaded from cloud successfully');
      
      // Reload the page to reflect the new data
      window.location.reload();
    } catch (error) {
      console.error('Error loading data from cloud:', error);
    }
  };

  // Logout
  const logout = async (): Promise<void> => {
    try {
      // Sync data before logout
      await syncDataToCloud();
      
      // Sign out from Firebase
      await signOut(auth);
      
      // Clear all user data from localStorage
      const keysToRemove: string[] = [];
      Object.keys(localStorage).forEach(key => {
        if (
          key.startsWith('q_') ||
          key === 'quizHistory' ||
          key === 'badges' ||
          key === 'studyStreak' ||
          key === 'vocabProgress' ||
          key === 'favoriteVocab' ||
          key === 'appSettings'
        ) {
          keysToRemove.push(key);
        }
      });
      
      keysToRemove.forEach(key => localStorage.removeItem(key));
      
      setUserProfile(null);
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  };

  // Reset password
  const resetPassword = async (email: string): Promise<void> => {
    await sendPasswordResetEmail(auth, email);
  };

  // Update user profile
  const updateUserProfile = async (updates: Partial<UserProfile>): Promise<void> => {
    if (!currentUser) throw new Error('No user logged in');

    const userRef = doc(db, 'users', currentUser.uid);
    await updateDoc(userRef, updates);

    setUserProfile((prev) => (prev ? { ...prev, ...updates } : null));
  };

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false); // Set loading false immediately
      
      if (user) {
        // Load profile in background - don't block UI
        loadUserProfile(user).catch((error) => {
          console.error('Error loading user profile:', error);
        });
        
        // Load user's data from cloud in background
        loadDataFromCloud().catch((error) => {
          console.error('Error loading data from cloud:', error);
        });
      } else {
        setUserProfile(null);
      }
    });

    return unsubscribe;
  }, []);

  const value: AuthContextType = {
    currentUser,
    userProfile,
    loading,
    signup,
    login,
    logout,
    loginWithGoogle,
    resetPassword,
    updateUserProfile,
    syncDataToCloud,
    loadDataFromCloud,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-indigo-500 border-t-transparent mb-4"></div>
            <p className="text-gray-600 font-semibold text-lg">Loading...</p>
          </div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
