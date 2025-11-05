export type SubscriptionTier = 'free' | 'premium' | 'lifetime';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  subscription: SubscriptionTier;
  subscriptionId?: string;
  examDate?: string;
  dailyGoal: number;
  createdAt: Date;
  lastSyncedAt?: Date;
  settings: UserSettings;
}

export interface UserSettings {
  language: 'de' | 'en';
  notifications: boolean;
  dailyReminder: boolean;
  reminderTime?: string;
  soundEnabled: boolean;
  darkMode: boolean;
}

export interface UsageStats {
  questionsAnsweredToday: number;
  quizzesTakenToday: number;
  lastResetDate: string;
}

export const DEFAULT_USER_SETTINGS: UserSettings = {
  language: 'de',
  notifications: false,
  dailyReminder: false,
  soundEnabled: true,
  darkMode: false,
};
