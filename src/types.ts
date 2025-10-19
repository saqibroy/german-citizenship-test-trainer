// Question Types
export interface Question {
  id: number;
  question_de: string;
  question_en: string;
  options_de: string[];
  options_en: string[];
  correct_index: number;
  category: string;
}

// Progress Types
export interface QuestionProgress {
  correct: number;
  incorrect: number;
  lastSeen: string;
  strength: 'weak' | 'medium' | 'strong';
}

export interface VocabProgress {
  correct: number;
  incorrect: number;
  lastSeen: string;
  easeFactor: number;
  interval: number;
  repetitions: number;
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
}

// Badge Types
export type BadgeName = string;

// Component Props Types
export interface HomePageProps {
  lang: string;
  badges: BadgeName[];
  progress: Record<number, QuestionProgress>;
  setPage: (page: string) => void;
  studyStreak: number;
  quizHistory: QuizResult[];
}

export interface QuizPageProps {
  lang: string;
  questions: Question[];
  updateProgress: (qId: number, correct: boolean) => void;
  progress: Record<number, QuestionProgress>;
  saveQuizResult: (score: number, total: number, categoryBreakdown: CategoryBreakdown) => void;
}

export interface TrainingPageProps {
  lang: string;
  questions: Question[];
  updateProgress: (qId: number, correct: boolean) => void;
  progress: Record<number, QuestionProgress>;
}

export interface CardsPageProps {
  lang: string;
  questions: Question[];
  updateProgress: (qId: number, correct: boolean) => void;
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
