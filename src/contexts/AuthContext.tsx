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
    try {
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
        await createUserProfile(user);
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
      // If offline or error, set a basic profile so app can still work
      setUserProfile({
        uid: user.uid,
        email: user.email!,
        displayName: user.displayName || '',
        photoURL: user.photoURL,
        subscription: 'free',
        dailyGoal: 10,
        createdAt: new Date(),
        settings: DEFAULT_USER_SETTINGS,
      });
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

  // Logout
  const logout = async (): Promise<void> => {
    await signOut(auth);
    setUserProfile(null);
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
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        try {
          await loadUserProfile(user);
        } catch (error) {
          console.error('Error loading user profile:', error);
        }
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
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
