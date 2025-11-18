import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  signInAnonymously,
  linkWithCredential,
  EmailAuthProvider
} from 'firebase/auth';
import { auth } from '../lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signup: (email: string, password: string, name: string) => Promise<User>;
  login: (email: string, password: string) => Promise<User>;
  loginWithGoogle: () => Promise<User>;
  loginAnonymously: () => Promise<User>;
  upgradeAnonymousAccount: (email: string, password: string, name: string) => Promise<User>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (displayName: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Sign up with email and password
  const signup = async (email: string, password: string, name: string): Promise<User> => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      // Update display name
      if (result.user) {
        await updateProfile(result.user, { displayName: name });
      }
      return result.user;
    } catch (error: any) {
      console.error('Signup error:', error);
      throw new Error(getErrorMessage(error.code));
    }
  };

  // Login with email and password
  const login = async (email: string, password: string): Promise<User> => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result.user;
    } catch (error: any) {
      console.error('Login error:', error);
      throw new Error(getErrorMessage(error.code));
    }
  };

  // Login with Google
  const loginWithGoogle = async (): Promise<User> => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      return result.user;
    } catch (error: any) {
      console.error('Google login error:', error);
      throw new Error(getErrorMessage(error.code));
    }
  };

  // Login anonymously (for trying the app without account)
  const loginAnonymously = async (): Promise<User> => {
    try {
      const result = await signInAnonymously(auth);
      return result.user;
    } catch (error: any) {
      console.error('Anonymous login error:', error);
      throw new Error(getErrorMessage(error.code));
    }
  };

  // Upgrade anonymous account to permanent account
  const upgradeAnonymousAccount = async (email: string, password: string, name: string): Promise<User> => {
    try {
      if (!user || !user.isAnonymous) {
        throw new Error('No anonymous user to upgrade');
      }

      const credential = EmailAuthProvider.credential(email, password);
      const result = await linkWithCredential(user, credential);
      
      if (result.user) {
        await updateProfile(result.user, { displayName: name });
      }
      
      return result.user;
    } catch (error: any) {
      console.error('Upgrade account error:', error);
      throw new Error(getErrorMessage(error.code));
    }
  };

  // Logout
  const logout = async (): Promise<void> => {
    try {
      await signOut(auth);
    } catch (error: any) {
      console.error('Logout error:', error);
      throw new Error(getErrorMessage(error.code));
    }
  };

  // Reset password
  const resetPassword = async (email: string): Promise<void> => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      console.error('Password reset error:', error);
      throw new Error(getErrorMessage(error.code));
    }
  };

  // Update user profile
  const updateUserProfile = async (displayName: string): Promise<void> => {
    try {
      if (!user) throw new Error('No user logged in');
      await updateProfile(user, { displayName });
    } catch (error: any) {
      console.error('Update profile error:', error);
      throw new Error(getErrorMessage(error.code));
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    signup,
    login,
    loginWithGoogle,
    loginAnonymously,
    upgradeAnonymousAccount,
    logout,
    resetPassword,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Helper function to get user-friendly error messages
function getErrorMessage(errorCode: string): string {
  const errorMessages: Record<string, string> = {
    'auth/email-already-in-use': 'This email is already registered. Please login instead.',
    'auth/invalid-email': 'Invalid email address.',
    'auth/operation-not-allowed': 'Operation not allowed. Please contact support.',
    'auth/weak-password': 'Password should be at least 6 characters.',
    'auth/user-disabled': 'This account has been disabled.',
    'auth/user-not-found': 'No account found with this email.',
    'auth/wrong-password': 'Incorrect password.',
    'auth/invalid-credential': 'Invalid email or password.',
    'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
    'auth/network-request-failed': 'Network error. Please check your connection.',
    'auth/popup-closed-by-user': 'Sign-in popup was closed.',
    'auth/cancelled-popup-request': 'Sign-in was cancelled.',
    'auth/popup-blocked': 'Sign-in popup was blocked. Please allow popups.',
    'auth/credential-already-in-use': 'This account is already linked to another user.',
    'auth/email-already-exists': 'This email is already in use.'
  };

  return errorMessages[errorCode] || 'An error occurred. Please try again.';
}
