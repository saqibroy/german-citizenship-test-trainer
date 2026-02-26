// Question Types
export interface Question {
  id: number;
  question_de: string;
  question_en: string;
  options_de: string[];
  options_en: string[];
  correct_index: number;
  category: string;
  img?: {
    url: string;
  };
}

// Progress Types
export type SRSLevel = 'new' | 'learning' | 'young' | 'mature' | 'mastered';
export type ConfidenceRating = 'again' | 'hard' | 'good' | 'easy';

export interface QuestionProgress {
  correct: number;
  incorrect: number;
  lastSeen: string;
  strength: 'weak' | 'medium' | 'strong';
  // Enhanced SRS fields
  srsLevel: SRSLevel;
  easeFactor: number;  // 1.3-2.5 (SuperMemo algorithm)
  interval: number;    // Days until next review
  repetitions: number; // Number of successful reviews
  lapses: number;      // Number of times forgotten
  averageTime: number; // Average answer time in seconds
  lastConfidence?: ConfidenceRating;
}

export interface VocabProgress {
  correct: number;
  incorrect: number;
  lastSeen: string;
  easeFactor: number;
  interval: number;
  repetitions: number;
  // Enhanced SRS fields
  srsLevel: SRSLevel;
  lapses: number;
  averageTime: number;
  lastConfidence?: ConfidenceRating;
  // Backward compatibility
  strength: 'weak' | 'medium' | 'strong';
}

// Quiz Types
export interface QuizResult {
  date: string;
  score: number;
  total: number;
  percentage?: number;
  categoryBreakdown: CategoryBreakdown;
}

export interface CategoryBreakdown {
  [category: string]: {
    correct: number;
    total: number;
  };
}

// Vocabulary Types
export interface VocabularyItem {
  de: string;
  en: string;
  category: string;
  tier: number;
  tier_name: string;
  example_de: string;
  example_en: string;
  // Enhanced vocabulary fields for better highlighting and display
  word?: string;              // Core word without article (e.g., "Regierung")
  forms?: string[];           // All grammatical forms for matching and display
  meaning?: string;           // Optional enhanced meaning with grammar notes
  gender?: 'masculine' | 'feminine' | 'neuter' | 'none';  // Noun gender
  wordType?: 'noun' | 'verb' | 'adjective' | 'preposition' | 'conjunction' | 'other';
}

// Gender type for vocabulary
export type VocabGender = 'masculine' | 'feminine' | 'neuter' | 'dative' | 'none';

// Badge Types
export type BadgeName = string;

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  progress?: number;
  requirement?: number;
}

// Quiz History Type (for Firestore)
export interface Quiz {
  id?: string;
  score: number;
  total: number;
  date: Date | any;
  categoryBreakdown: CategoryBreakdown;
}

// Component Props Types
export interface HomePageProps {
  lang: string;
  badges: BadgeName[];
  progress: Record<number, QuestionProgress>;
  setPage: (page: string) => void;
  studyStreak: number;
  quizHistory?: QuizResult[];
  onStartTraining?: (mode?: string) => void;
}

export interface QuizPageProps {
  lang: string;
  questions: Question[];
  updateProgress: (qId: number, correct: boolean, answerTime?: number) => void;
  progress: Record<number, QuestionProgress>;
  saveQuizResult: (score: number, total: number, categoryBreakdown: CategoryBreakdown) => void;
  onSessionChange?: (active: boolean) => void;
  onQuizComplete?: (score: number, total: number) => void;
}

export interface TrainingPageProps {
  lang: string;
  questions: Question[];
  updateProgress: (qId: number, correct: boolean, answerTime?: number) => void;
  progress: Record<number, QuestionProgress>;
  onSessionChange?: (active: boolean) => void;
  autoStartMode?: string | null;
  onAutoStartConsumed?: () => void;
  onTrainingComplete?: (accuracy: number) => void;
}

export interface CardsPageProps {
  lang: string;
  questions: Question[];
  updateProgress: (qId: number, correct: boolean, answerTime?: number) => void;
  progress: Record<number, QuestionProgress>;
}

export interface ProgressPageProps {
  lang: string;
  questions: Question[];
  progress: Record<number, QuestionProgress>;
  badges: BadgeName[];
  quizHistory: QuizResult[];
}

export interface VocabPageProps {
  lang: string;
  vocabulary: VocabularyItem[];
  updateVocabProgress: (word: string, correct: boolean) => void;
  vocabProgress: Record<string, VocabProgress>;
  favoriteVocab: string[];
  toggleFavoriteVocab: (word: string) => void;
}

export interface StudyPlanPageProps {
  lang: string;
  progress: Record<number, QuestionProgress>;
  questions: Question[];
  quizHistory: QuizResult[];
  studyStreak: number;
  startDate: string | null;
}

export interface VocabTrainingPageProps {
  lang: string;
  vocabProgress: Record<string, VocabProgress>;
  updateVocabProgress: (word: string, correct: boolean) => void;
}

export interface VocabPopupProps {
  word: string;
  onClose: () => void;
  lang: string;
}

export interface HighlightedTextProps {
  text: string;
  onClick: (word: string) => void;
  lang: string;
}
