export interface GrammarLesson {
  id: string;
  title: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  description: string;
  content: any;
}

export declare const GERMAN_GRAMMAR_LESSONS: GrammarLesson[];
export declare const LESSON_CATEGORIES: string[];
export declare const LESSON_LEVELS: string[];
