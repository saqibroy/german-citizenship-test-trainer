import React, { useState, useEffect, useMemo } from 'react';
import { 
  Globe, BookOpen, Award, ChevronRight, Check, X, Eye, EyeOff, BarChart3,
  Calendar, Target, Clock, Lightbulb, Flame,
  AlertCircle, CheckCircle2, Brain, Sparkles, BookMarked, Zap
} from 'lucide-react';
import { QUESTIONS, CATEGORY_ICONS } from './data.js';
import { CITIZENSHIP_VOCABULARY } from './vacabulary.js';
import { VocabPage, StudyPlanPage, VocabPopup, HighlightedText, VocabTrainingPage } from './components.tsx';
import type { Question, QuestionProgress, QuizResult, CategoryBreakdown, VocabProgress, HomePageProps, QuizPageProps, TrainingPageProps, CardsPageProps, ProgressPageProps } from './types';

// Shuffle array function
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Enhanced Spaced Repetition Algorithm (Anki/SM-2 style)
// This algorithm determines when items should appear based on:
// 1. NEW items: Never seen (highest priority after due items)
// 2. LEARNING: Recently incorrect or weak (shown frequently - intervals: 1min, 10min, 1day)
// 3. REVIEW: Items that need review based on interval (strong items with increasing intervals)
// 4. Known/Strong items appear less frequently with exponentially increasing intervals

const calculateQuestionWeight = (progress: QuestionProgress | undefined): number => {
  if (!progress) return 8000; // NEW - Never seen, high priority (but lower than due items)
  
  const { correct, incorrect, lastSeen, strength } = progress;
  const total = correct + incorrect;
  const accuracy = total > 0 ? correct / total : 0;
  
  // Calculate days since last seen
  const daysSinceLastSeen = lastSeen ? 
    Math.floor((Date.now() - new Date(lastSeen).getTime()) / (1000 * 60 * 60 * 24)) : 999;
  
  let weight = 100;
  
  // Determine review interval based on strength (Anki-style)
  let reviewInterval = 1; // days
  
  if (strength === 'strong') {
    // Strong items: exponential backoff (1 → 3 → 7 → 14 → 30 days)
    if (correct >= 8) reviewInterval = 30;
    else if (correct >= 6) reviewInterval = 14;
    else if (correct >= 4) reviewInterval = 7;
    else if (correct >= 3) reviewInterval = 3;
    else reviewInterval = 1;
  } else if (strength === 'medium') {
    // Medium items: slower progression (1 → 2 days)
    reviewInterval = correct >= 3 ? 2 : 1;
  } else if (strength === 'weak') {
    // Weak items: keep reviewing frequently (0.5 days = 12 hours)
    reviewInterval = 0.5;
  } else {
    // Unanswered/new in learning phase
    reviewInterval = 0.1; // Review very soon
  }
  
  // PRIORITY 1: DUE for review (items past their interval) - HIGHEST
  if (daysSinceLastSeen >= reviewInterval) {
    const overdueDays = daysSinceLastSeen - reviewInterval;
    weight = 9000 + (overdueDays * 100); // Most important: overdue items
  }
  
  // PRIORITY 2: WEAK items (need practice) - Even if not due yet, weak items get priority
  else if (strength === 'weak' || accuracy < 0.5) {
    weight = 7000 + (daysSinceLastSeen * 10);
  }
  
  // PRIORITY 3: MEDIUM items (moderate priority)
  else if (strength === 'medium') {
    weight = 3000 + (daysSinceLastSeen * 5);
  }
  
  // PRIORITY 4: STRONG items (lower priority, only when due or occasionally for review)
  else if (strength === 'strong') {
    // Strong items only show up when due or occasionally
    if (daysSinceLastSeen >= reviewInterval * 0.8) {
      weight = 1000 + (daysSinceLastSeen * 2);
    } else {
      weight = 50; // Very low priority - not due yet
    }
  }
  
  // NEW items (never seen) - high priority but let due items go first
  if (total === 0) {
    weight = 8000;
  }
  
  // Boost for items with more incorrect than correct
  if (incorrect > correct) {
    weight *= 1.3;
  }
  
  return weight;
};

// Target exam date - December 2, 2025
const EXAM_DATE = new Date('2025-12-02');

// Calculate days remaining until exam
const getDaysRemaining = () => {
  const today = new Date();
  const diff = EXAM_DATE.getTime() - today.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

// Calculate weeks remaining
// const getWeeksRemaining = () => {
//   return Math.ceil(getDaysRemaining() / 7);
// };

// Get current week number (1-8) based on 8-week study plan
// const getCurrentWeek = () => {
//   const totalWeeks = 8;
//   const weeksRemaining = getWeeksRemaining();
//   return Math.max(1, Math.min(totalWeeks, totalWeeks - weeksRemaining + 1));
// };

export default function App() {
  const [page, setPage] = useState('home');
  const [lang, setLang] = useState('de');
  const [progress, setProgress] = useState<Record<number, any>>({});
  const [badges, setBadges] = useState<string[]>([]);
  const [quizHistory, setQuizHistory] = useState<QuizResult[]>([]);
  const [studyStreak, setStudyStreak] = useState(0);
  const [vocabProgress, setVocabProgress] = useState<Record<string, VocabProgress>>({});
  const [favoriteVocab, setFavoriteVocab] = useState<string[]>([]);
  // const [startDate, setStartDate] = useState<string | null>(null);
  const [vocabMode, setVocabMode] = useState('learn'); // 'learn' or 'training'

  useEffect(() => {
    // Load question progress
    const savedProgress: Record<number, QuestionProgress> = {};
    QUESTIONS.forEach((q: Question) => {
      const data = localStorage.getItem(`q_${q.id}`);
      if (data) {
        try {
          savedProgress[q.id] = JSON.parse(data);
        } catch (e) {
          console.error('Error parsing progress:', e);
        }
      }
    });
    setProgress(savedProgress);

    // Load badges
    const badgesData = localStorage.getItem('badges');
    if (badgesData) {
      try {
        setBadges(JSON.parse(badgesData));
      } catch (e) {
        console.error('Error parsing badges:', e);
      }
    }

    // Load quiz history
    const historyData = localStorage.getItem('quizHistory');
    if (historyData) {
      try {
        setQuizHistory(JSON.parse(historyData));
      } catch (e) {
        console.error('Error parsing quiz history:', e);
      }
    }

    // Load study streak
    const streakData = localStorage.getItem('studyStreak');
    if (streakData) {
      try {
        const { streak, lastStudyDate } = JSON.parse(streakData);
        const today = new Date().toDateString();
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        
        if (lastStudyDate === today) {
          setStudyStreak(streak);
        } else if (lastStudyDate === yesterday) {
          setStudyStreak(streak);
        } else {
          setStudyStreak(0);
        }
      } catch (e) {
        console.error('Error parsing study streak:', e);
      }
    }

    // Load vocabulary progress
    const vocabData = localStorage.getItem('vocabProgress');
    if (vocabData) {
      try {
        setVocabProgress(JSON.parse(vocabData));
      } catch (e) {
        console.error('Error parsing vocab progress:', e);
      }
    }

    // Load favorite vocabulary
    const favData = localStorage.getItem('favoriteVocab');
    if (favData) {
      try {
        setFavoriteVocab(JSON.parse(favData));
      } catch (e) {
        console.error('Error parsing favorite vocab:', e);
      }
    }

    // Load or set start date
    /* Unused for now
    const savedStartDate = localStorage.getItem('startDate');
    if (savedStartDate) {
      setStartDate(savedStartDate);
    } else {
      const today = new Date().toISOString();
      localStorage.setItem('startDate', today);
      setStartDate(today);
    }
    */
  }, []);

  const calculateStrength = (correct: number, incorrect: number): 'weak' | 'medium' | 'strong' | 'unanswered' => {
    const total = correct + incorrect;
    if (total === 0) return 'unanswered';
    const ratio = correct / total;
    if (ratio >= 0.8 && correct >= 3) return 'strong';
    if (ratio >= 0.5) return 'medium';
    return 'weak';
  };

  const updateProgress = (qId: number, correct: boolean) => {
    const newProgress = {
      ...progress,
      [qId]: {
        correct: (progress[qId]?.correct || 0) + (correct ? 1 : 0),
        incorrect: (progress[qId]?.incorrect || 0) + (correct ? 0 : 1),
        lastSeen: new Date().toISOString(),
        strength: calculateStrength(
          (progress[qId]?.correct || 0) + (correct ? 1 : 0),
          (progress[qId]?.incorrect || 0) + (correct ? 0 : 1)
        )
      }
    };
    setProgress(newProgress);
    localStorage.setItem(`q_${qId}`, JSON.stringify(newProgress[qId]));
    updateStudyStreak();
    checkBadges(newProgress);
  };

  const updateStudyStreak = () => {
    const today = new Date().toDateString();
    const streakData = localStorage.getItem('studyStreak');
    
    if (streakData) {
      try {
        const { streak, lastStudyDate } = JSON.parse(streakData);
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        
        if (lastStudyDate === today) {
          // Already studied today
          return;
        } else if (lastStudyDate === yesterday) {
          // Continuing streak
          const newStreak = streak + 1;
          setStudyStreak(newStreak);
          localStorage.setItem('studyStreak', JSON.stringify({ streak: newStreak, lastStudyDate: today }));
        } else {
          // Streak broken, start new
          setStudyStreak(1);
          localStorage.setItem('studyStreak', JSON.stringify({ streak: 1, lastStudyDate: today }));
        }
      } catch (e) {
        console.error('Error updating study streak:', e);
      }
    } else {
      // First study session
      setStudyStreak(1);
      localStorage.setItem('studyStreak', JSON.stringify({ streak: 1, lastStudyDate: today }));
    }
  };

  const saveQuizResult = (score: number, total: number, categoryBreakdown: CategoryBreakdown) => {
    const newResult: QuizResult = {
      date: new Date().toISOString(),
      score,
      total,
      categoryBreakdown
    };
    const newHistory = [newResult, ...quizHistory].slice(0, 10); // Keep last 10 results
    setQuizHistory(newHistory);
    localStorage.setItem('quizHistory', JSON.stringify(newHistory));
  };

  const checkBadges = (prog: Record<number, QuestionProgress>) => {
    const newBadges = [...badges];
    const answered = Object.keys(prog).length;
    if (answered >= 10 && !newBadges.includes('Beginner')) newBadges.push('Beginner');
    if (answered >= QUESTIONS.length && !newBadges.includes('Complete')) newBadges.push('Complete');
    const strong = Object.values(prog).filter((p: QuestionProgress) => p.strength === 'strong').length;
    if (strong >= 20 && !newBadges.includes('Expert')) newBadges.push('Expert');
    if (newBadges.length > badges.length) {
      setBadges(newBadges);
      localStorage.setItem('badges', JSON.stringify(newBadges));
    }
  };

  const t = {
    home: { de: 'Start', en: 'Home' },
    quiz: { de: 'Quiz', en: 'Quiz' },
    training: { de: 'Training', en: 'Training' },
    cards: { de: 'Karten', en: 'Cards' },
    vocab: { de: 'Vokabeln', en: 'Vocab' },
    studyplan: { de: 'Plan', en: 'Plan' },
    progress: { de: 'Stats', en: 'Stats' }
  };

  const updateVocabProgress = (word: string, known: boolean) => {
    const newVocabProgress: Record<string, VocabProgress> = {
      ...vocabProgress,
      [word]: {
        correct: (vocabProgress[word]?.correct || 0) + (known ? 1 : 0),
        incorrect: (vocabProgress[word]?.incorrect || 0) + (known ? 0 : 1),
        lastSeen: new Date().toISOString(),
        easeFactor: vocabProgress[word]?.easeFactor || 2.5,
        interval: vocabProgress[word]?.interval || 0,
        repetitions: vocabProgress[word]?.repetitions || 0
      }
    };
    setVocabProgress(newVocabProgress);
    localStorage.setItem('vocabProgress', JSON.stringify(newVocabProgress));
  };

  const toggleFavoriteVocab = (word: string) => {
    const newFavorites = favoriteVocab.includes(word)
      ? favoriteVocab.filter(w => w !== word)
      : [...favoriteVocab, word];
    setFavoriteVocab(newFavorites);
    localStorage.setItem('favoriteVocab', JSON.stringify(newFavorites));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <BookOpen className="text-indigo-600" size={24} />
            <h1 className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {lang === 'de' ? 'Einbürgerungstest' : 'Citizenship Test'}
            </h1>
          </div>
          <button onClick={() => setLang(lang === 'de' ? 'en' : 'de')} className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full font-semibold text-sm shadow-lg">
            <Globe size={16} />
            {lang === 'de' ? 'EN' : 'DE'}
          </button>
        </div>
        <nav className="flex border-t overflow-x-auto">
          {['home', 'training', 'quiz', 'vocab', 'studyplan', 'progress'].map(p => (
            <button key={p} onClick={() => setPage(p)} className={`flex-1 py-3 text-xs font-semibold whitespace-nowrap px-2 ${page === p ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}>
              {t[p as keyof typeof t][lang as 'de' | 'en']}
            </button>
          ))}
        </nav>
      </header>

      <main className="pb-6">
        {page === 'home' && <HomePage lang={lang} badges={badges} progress={progress} setPage={setPage} studyStreak={studyStreak} quizHistory={quizHistory} />}
        {page === 'training' && <TrainingPage lang={lang} questions={QUESTIONS} updateProgress={updateProgress} progress={progress} />}
        {page === 'quiz' && <QuizPage lang={lang} questions={QUESTIONS} updateProgress={updateProgress} progress={progress} saveQuizResult={saveQuizResult} />}
        {page === 'cards' && <CardsPage lang={lang} questions={QUESTIONS} updateProgress={updateProgress} progress={progress} />}
        {page === 'vocab' && (
          <div>
            <div className="bg-white border-b sticky top-0 z-10">
              <div className="flex">
                <button 
                  onClick={() => setVocabMode('learn')}
                  className={`flex-1 py-3 font-semibold ${vocabMode === 'learn' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                >
                  {lang === 'de' ? '📚 Lernen' : '📚 Learn'}
                </button>
                <button 
                  onClick={() => setVocabMode('training')}
                  className={`flex-1 py-3 font-semibold ${vocabMode === 'training' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                >
                  {lang === 'de' ? '🧠 Training' : '🧠 Training'}
                </button>
              </div>
            </div>
            {vocabMode === 'learn' && <VocabPage lang={lang} vocabulary={CITIZENSHIP_VOCABULARY} updateVocabProgress={updateVocabProgress} vocabProgress={vocabProgress} favoriteVocab={favoriteVocab} toggleFavoriteVocab={toggleFavoriteVocab} />}
            {vocabMode === 'training' && <VocabTrainingPage lang={lang} vocabProgress={vocabProgress} updateVocabProgress={updateVocabProgress} />}
          </div>
        )}
        {page === 'studyplan' && <StudyPlanPage lang={lang} progress={progress} questions={QUESTIONS} quizHistory={quizHistory} studyStreak={studyStreak} />}
        {page === 'progress' && <ProgressPage lang={lang} questions={QUESTIONS} progress={progress} badges={badges} quizHistory={quizHistory} />}
      </main>
    </div>
  );
}

function HomePage({ lang, badges, progress, setPage, studyStreak, quizHistory }: HomePageProps) {
  const answered = Object.keys(progress).length;
  const strong = Object.values(progress).filter((p: any) => p.strength === 'strong').length;
  const daysRemaining = getDaysRemaining();
  const latestQuiz = quizHistory[0];
  
  return (
    <div className="p-4 space-y-4">
      {/* Exam Countdown Banner */}
      <div className="bg-gradient-to-br from-red-500 to-pink-600 text-white rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-2">
          <Calendar size={28} />
          <div>
            <h2 className="text-2xl font-bold">{lang === 'de' ? 'Prüfung in' : 'Exam in'}</h2>
            <p className="text-3xl font-black mt-1">{daysRemaining} {lang === 'de' ? 'Tagen' : 'Days'}</p>
          </div>
        </div>
        <p className="opacity-90 text-sm mt-2">📅 {lang === 'de' ? 'Zieldatum: 2. Dezember 2025' : 'Target Date: December 2, 2025'}</p>
      </div>

      {/* Welcome Card */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-2xl p-6 shadow-xl">
        <h2 className="text-2xl font-bold mb-2">{lang === 'de' ? 'Willkommen zurück!' : 'Welcome back!'}</h2>
        <p className="opacity-90 text-sm">{lang === 'de' ? 'Bereite dich auf den offiziellen Einbürgerungstest vor mit intelligentem Lernsystem!' : 'Prepare for the official citizenship test with intelligent learning system!'}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white rounded-xl p-4 shadow-md border-l-4 border-indigo-500">
          <div className="text-3xl font-bold text-indigo-600">{answered}/{QUESTIONS.length}</div>
          <div className="text-xs text-gray-600 mt-1">{lang === 'de' ? '✓ Fragen geübt' : '✓ Questions Practiced'}</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-md border-l-4 border-green-500">
          <div className="text-3xl font-bold text-green-600">{strong}</div>
          <div className="text-xs text-gray-600 mt-1">{lang === 'de' ? '💪 Starke Bereiche' : '💪 Strong Areas'}</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-md border-l-4 border-orange-500">
          <div className="flex items-center gap-2">
            <Flame className="text-orange-500" size={24} />
            <div className="text-3xl font-bold text-orange-600">{studyStreak}</div>
          </div>
          <div className="text-xs text-gray-600 mt-1">{lang === 'de' ? '🔥 Tage Streak' : '🔥 Day Streak'}</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-md border-l-4 border-purple-500">
          <div className="text-3xl font-bold text-purple-600">{latestQuiz ? `${Math.round((latestQuiz.score / latestQuiz.total) * 100)}%` : '--'}</div>
          <div className="text-xs text-gray-600 mt-1">{lang === 'de' ? '📊 Letztes Quiz' : '📊 Latest Quiz'}</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button onClick={() => setPage('training')} className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl p-4 font-bold shadow-lg flex items-center justify-between hover:shadow-xl transition-all">
          <div className="flex items-center gap-3">
            <Brain size={24} />
            <span>{lang === 'de' ? '🧠 Training Mode (Anki-Stil)' : '🧠 Training Mode (Anki-style)'}</span>
          </div>
          <ChevronRight />
        </button>
        <button onClick={() => setPage('quiz')} className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl p-4 font-bold shadow-lg flex items-center justify-between hover:shadow-xl transition-all">
          <div className="flex items-center gap-3">
            <Target size={24} />
            <span>{lang === 'de' ? 'Quiz starten (33 Fragen)' : 'Start Quiz (33 Questions)'}</span>
          </div>
          <ChevronRight />
        </button>
        <button onClick={() => setPage('cards')} className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl p-4 font-bold shadow-lg flex items-center justify-between hover:shadow-xl transition-all">
          <div className="flex items-center gap-3">
            <BookOpen size={24} />
            <span>{lang === 'de' ? 'Kartenset üben' : 'Practice Flashcards'}</span>
          </div>
          <ChevronRight />
        </button>
        <button onClick={() => setPage('vocab')} className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl p-4 font-bold shadow-lg flex items-center justify-between hover:shadow-xl transition-all">
          <div className="flex items-center gap-3">
            <BookMarked size={24} />
            <span>{lang === 'de' ? 'Vokabeln lernen' : 'Learn Vocabulary'}</span>
          </div>
          <ChevronRight />
        </button>
        <button onClick={() => setPage('studyplan')} className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl p-4 font-bold shadow-lg flex items-center justify-between hover:shadow-xl transition-all">
          <div className="flex items-center gap-3">
            <Calendar size={24} />
            <span>{lang === 'de' ? 'Lernplan ansehen' : 'View Study Plan'}</span>
          </div>
          <ChevronRight />
        </button>
      </div>

      {/* Badges */}
      {badges.length > 0 && (
        <div className="bg-white rounded-xl p-4 shadow-md">
          <div className="flex items-center gap-2 mb-3">
            <Award className="text-yellow-500" size={20} />
            <h3 className="font-bold text-gray-800">{lang === 'de' ? 'Abzeichen' : 'Badges'}</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {badges.map((b: any, i: any) => (
              <span key={i} className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md">🏆 {b}</span>
            ))}
          </div>
        </div>
      )}

      {/* Quick Tip */}
      <div className="bg-blue-50 border-l-4 border-blue-500 rounded-xl p-4 shadow-sm">
        <div className="flex items-start gap-3">
          <Lightbulb className="text-blue-500 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <h4 className="font-bold text-blue-900 mb-1">{lang === 'de' ? 'Tipp des Tages' : 'Daily Tip'}</h4>
            <p className="text-sm text-blue-800">
              {lang === 'de' 
                ? 'Klicke auf hervorgehobene Wörter in Quizfragen, um sofortige Übersetzungen und Definitionen zu sehen!' 
                : 'Click on highlighted words in quiz questions to see instant translations and definitions!'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface Answer {
  selectedIndex: number;
  isCorrect: boolean;
}

function QuizPage({ lang, questions, updateProgress, progress, saveQuizResult }: QuizPageProps) {
  const [started, setStarted] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [showTranslation, setShowTranslation] = useState(false);
  const [selectedVocab, setSelectedVocab] = useState<string | null>(null);

  // Create shuffled options with original indices - CALL HOOKS FIRST, BEFORE ANY RETURNS!
  const shuffledOptions = useMemo(() => {
    if (!quizQuestions[currentIdx]) return [];
    const q = quizQuestions[currentIdx];
    const opts = (lang === 'de' ? q.options_de : q.options_en).map((opt: string, idx: number) => ({
      text: opt,
      originalIndex: idx
    }));
    return shuffleArray(opts);
  }, [quizQuestions, currentIdx, lang]);

  // Smart question selection using spaced repetition
  const selectSmartQuestions = () => {
    const weightedQuestions = questions.map((q: Question) => ({
      ...q,
      weight: calculateQuestionWeight(progress[q.id])
    })).sort((a: { weight: number }, b: { weight: number }) => b.weight - a.weight);

    // Take top 50 weighted questions, then randomly select 33 from them
    const topWeighted = weightedQuestions.slice(0, Math.min(50, questions.length));
    return shuffleArray(topWeighted).slice(0, 33);
  };

  const startQuiz = () => {
    const selected = selectSmartQuestions();
    setQuizQuestions(selected);
    setStarted(true);
    setCurrentIdx(0);
    setAnswers([]);
    setShowTranslation(false);
  };

  // NOW it's safe to have conditional returns
  if (!started) {
    return (
      <div className="p-4">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-indigo-100 p-3 rounded-full">
              <BookOpen className="text-indigo-600" size={24} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">{lang === 'de' ? 'Quiz Modus' : 'Quiz Mode'}</h2>
          </div>
          <div className="space-y-3 mb-6">
            <p className="text-gray-700">{lang === 'de' ? '✓ 33 zufällige Fragen pro Quiz' : '✓ 33 random questions per quiz'}</p>
            <p className="text-gray-700">{lang === 'de' ? '✓ Schwache Bereiche werden priorisiert' : '✓ Weak areas are prioritized'}</p>
            <p className="text-gray-700">{lang === 'de' ? '✓ Mindestens 17 richtig zum Bestehen' : '✓ At least 17 correct to pass'}</p>
            <p className="text-gray-700">{lang === 'de' ? '✓ Antworten werden jedes Mal gemischt' : '✓ Answers are shuffled each time'}</p>
          </div>
          <button onClick={startQuiz} className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl py-4 font-bold shadow-lg">
            {lang === 'de' ? 'Quiz starten' : 'Start Quiz'}
          </button>
        </div>
      </div>
    );
  }

  if (currentIdx >= quizQuestions.length) {
    const score = answers.filter((ans: Answer) => ans?.isCorrect).length;
    const passed = score >= 17;
    
    // Calculate category breakdown
    const categoryBreakdown: CategoryBreakdown = {};
    quizQuestions.forEach((q: Question, idx: number) => {
      const cat = q.category;
      if (!categoryBreakdown[cat]) {
        categoryBreakdown[cat] = { correct: 0, total: 0 };
      }
      categoryBreakdown[cat].total++;
      if (answers[idx]?.isCorrect) {
        categoryBreakdown[cat].correct++;
      }
    });
    
    // Save quiz result on first render
    React.useEffect(() => {
      saveQuizResult(score, 33, categoryBreakdown);
    }, []);
    
    return (
      <div className="p-4">
        <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
          <div className="text-6xl mb-4">{passed ? '🎉' : '📚'}</div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">{lang === 'de' ? 'Quiz abgeschlossen' : 'Quiz Completed'}</h2>
          <div className={`text-6xl font-bold mb-4 ${passed ? 'text-green-600' : 'text-orange-600'}`}>{score}/33</div>
          <p className="text-xl mb-6 font-semibold">{passed ? (lang === 'de' ? '✓ BESTANDEN' : '✓ PASSED') : (lang === 'de' ? 'Weiter üben!' : 'Keep practicing!')}</p>
          
          {/* Performance Breakdown */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
            <h3 className="font-bold text-gray-800 mb-3 text-sm">{lang === 'de' ? 'Leistung nach Kategorie' : 'Performance by Category'}</h3>
            <div className="space-y-2">
              {Object.entries(categoryBreakdown).map(([cat, stats]: [string, { correct: number; total: number }]) => (
                <div key={cat} className="flex justify-between text-sm">
                  <span className="text-gray-600">{cat}</span>
                  <span className={`font-bold ${stats.correct / stats.total >= 0.7 ? 'text-green-600' : 'text-orange-600'}`}>
                    {stats.correct}/{stats.total} ({Math.round((stats.correct / stats.total) * 100)}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <button onClick={() => setStarted(false)} className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl py-3 font-bold shadow-lg">
            {lang === 'de' ? 'Neues Quiz' : 'New Quiz'}
          </button>
        </div>
      </div>
    );
  }

  const q = quizQuestions[currentIdx];
  if (!q) return null; // Safety check

  const answered = answers[currentIdx] !== undefined;
  const userAnswer = answers[currentIdx];

  const handleAnswer = (originalIndex: number) => {
    const isCorrect = originalIndex === q.correct_index;
    const newAnswers = [...answers];
    newAnswers[currentIdx] = { selectedIndex: originalIndex, isCorrect };
    setAnswers(newAnswers);
    updateProgress(q.id, isCorrect);
  };

  const CategoryIcon = CATEGORY_ICONS[q.category] || BookOpen;
  const strengthColor = !progress[q.id] ? 'gray' : 
    progress[q.id].strength === 'strong' ? 'green' :
    progress[q.id].strength === 'medium' ? 'yellow' : 'red';

  return (
    <div className="p-4 space-y-4">
      <div className="bg-white rounded-xl p-4 shadow-md">
        <div className="flex justify-between items-center mb-3">
          <span className="font-bold text-gray-800">{currentIdx + 1}/{quizQuestions.length}</span>
          <div className="flex gap-2 items-center">
            <div className={`w-2 h-2 rounded-full bg-${strengthColor}-400`}></div>
            <CategoryIcon size={16} className="text-indigo-600" />
            <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full font-semibold">
              {q.category}
            </span>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all" style={{ width: `${((currentIdx + 1) / quizQuestions.length) * 100}%` }}></div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-bold text-gray-800 flex-1">
            <HighlightedText 
              text={lang === 'de' ? q.question_de : q.question_en}
              onClick={(word: string) => setSelectedVocab(word)}
            />
          </h3>
          <button onClick={() => setShowTranslation(!showTranslation)} className="ml-2 p-2 text-gray-500 hover:text-indigo-600 transition">
            {showTranslation ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        
        {showTranslation && (
          <p className="text-sm text-gray-600 mb-4 italic border-l-2 border-indigo-300 pl-3 bg-indigo-50 p-2 rounded">
            {lang === 'de' ? q.question_en : q.question_de}
          </p>
        )}
        
        {/* Vocabulary Popup */}
        {selectedVocab && (
          <VocabPopup 
            word={selectedVocab}
            onClose={() => setSelectedVocab(null)}
            lang={lang}
          />
        )}

        <div className="space-y-3">
          {shuffledOptions.map((opt, idx) => {
            const isSelected = userAnswer?.selectedIndex === opt.originalIndex;
            const isCorrectAnswer = opt.originalIndex === q.correct_index;
            const showAsCorrect = answered && isCorrectAnswer;
            const showAsWrong = answered && isSelected && !isCorrectAnswer;

            return (
              <button
                key={idx}
                onClick={() => !answered && handleAnswer(opt.originalIndex)}
                disabled={answered}
                className={`w-full text-left p-4 rounded-xl border-2 font-semibold transition-all ${
                  showAsWrong ? 'bg-red-50 border-red-500 shadow-md' :
                  showAsCorrect ? 'bg-green-50 border-green-500 shadow-md' :
                  'border-gray-200 hover:border-indigo-400 hover:shadow-md active:scale-98'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    showAsWrong ? 'bg-red-500 text-white' :
                    showAsCorrect ? 'bg-green-500 text-white' :
                    'bg-gray-200 text-gray-600'
                  }`}>
                    {answered && (showAsCorrect || showAsWrong) ? (
                      isCorrectAnswer ? <Check size={16} /> : <X size={16} />
                    ) : (
                      String.fromCharCode(65 + idx)
                    )}
                  </span>
                  <span className="flex-1">{opt.text}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {answered && (
        <div className={`rounded-2xl p-4 shadow-lg ${userAnswer.isCorrect ? 'bg-green-50 border-l-4 border-green-500' : 'bg-orange-50 border-l-4 border-orange-500'}`}>
          <div className="flex items-center gap-2 mb-2">
            {userAnswer.isCorrect ? <Check className="text-green-600" size={24} /> : <X className="text-orange-600" size={24} />}
            <span className={`font-bold text-lg ${userAnswer.isCorrect ? 'text-green-800' : 'text-orange-800'}`}>
              {userAnswer.isCorrect ? (lang === 'de' ? 'Richtig!' : 'Correct!') : (lang === 'de' ? 'Falsch' : 'Wrong')}
            </span>
          </div>
          {!userAnswer.isCorrect && (
            <p className="text-sm text-gray-700 mt-2">
              {lang === 'de' ? '✓ Richtige Antwort: ' : '✓ Correct answer: '}
              <span className="font-semibold">{(lang === 'de' ? q.options_de : q.options_en)[q.correct_index]}</span>
            </p>
          )}
        </div>
      )}

      <button
        onClick={() => { 
          if (answered) { 
            setCurrentIdx(currentIdx + 1); 
            setShowTranslation(false); 
          } 
        }}
        disabled={!answered}
        className={`w-full py-4 rounded-xl font-bold shadow-lg transition ${answered ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
      >
        {currentIdx === quizQuestions.length - 1 ? (lang === 'de' ? 'Ergebnis anzeigen' : 'Show Result') : (lang === 'de' ? 'Weiter →' : 'Next →')}
      </button>
    </div>
  );
}

// Training Page - Anki-style Spaced Repetition System
function TrainingPage({ lang, questions, updateProgress, progress }: TrainingPageProps) {
  const [started, setStarted] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [trainingQuestions, setTrainingQuestions] = useState<Question[]>([]);
  const [showTranslation, setShowTranslation] = useState(false);
  const [selectedVocab, setSelectedVocab] = useState<string | null>(null);
  const [sessionStats, setSessionStats] = useState({ correct: 0, incorrect: 0, total: 0 });

  // Shuffled options with original indices
  const shuffledOptions = useMemo(() => {
    if (!trainingQuestions[currentIdx]) return [];
    const q = trainingQuestions[currentIdx];
    const opts = (lang === 'de' ? q.options_de : q.options_en).map((opt: any, idx: any) => ({
      text: opt,
      originalIndex: idx
    }));
    return shuffleArray(opts);
  }, [trainingQuestions, currentIdx, lang]);

  // Advanced Anki-style spaced repetition algorithm
  const calculateSRSWeight = (qProgress: any) => {
    if (!qProgress) return 10000; // New cards - highest priority
    
    const { correct, incorrect, lastSeen, strength } = qProgress;
    const total = correct + incorrect;
    const accuracy = total > 0 ? correct / total : 0;
    
    // Calculate days since last seen
    const daysSince = lastSeen ? 
      Math.floor((Date.now() - new Date(lastSeen).getTime()) / (1000 * 60 * 60 * 24)) : 999;
    
    // Base interval based on strength (like Anki)
    let interval = 1;
    if (strength === 'strong' && correct >= 5) interval = 7; // Week 1: Review weekly
    else if (strength === 'strong' && correct >= 3) interval = 3; // Strong but new
    else if (strength === 'medium') interval = 1.5; // Review every 1.5 days
    else if (strength === 'weak') interval = 0.5; // Review same day
    
    // Calculate weight (lower = more urgent to review)
    let weight = 100;
    
    // Priority 1: Due for review (hasn't been seen in longer than interval)
    if (daysSince >= interval) {
      weight = 10 + (daysSince * 10); // Overdue items get high priority
    }
    
    // Priority 2: Weak items that need reinforcement
    if (strength === 'weak') {
      weight += 1000;
    } else if (strength === 'medium') {
      weight += 500;
    }
    
    // Priority 3: New cards (never seen)
    if (total === 0) {
      weight += 5000;
    }
    
    // Priority 4: Items with low accuracy
    if (accuracy < 0.5 && total >= 2) {
      weight += 800;
    }
    
    // Reduce priority for well-known items
    if (strength === 'strong' && daysSince < interval) {
      weight = Math.max(1, weight - 500);
    }
    
    return weight;
  };

  // Calculate dynamic session size (like Anki's new cards system)
  const calculateSessionSize = () => {
    const totalQuestions = questions.length;
    const answeredCount = Object.keys(progress).length;
    const strongCount = Object.values(progress).filter((p: any) => p.strength === 'strong').length;
    const accuracyRate = answeredCount > 0 ? strongCount / answeredCount : 0;
    
    // Start with 20 questions for beginners
    let baseSize = 20;
    
    // Increase gradually as user progresses
    if (answeredCount > 50 && accuracyRate > 0.6) baseSize = 25;
    if (answeredCount > 100 && accuracyRate > 0.7) baseSize = 30;
    if (answeredCount > 150 && accuracyRate > 0.75) baseSize = 35;
    if (answeredCount > 200 && accuracyRate > 0.8) baseSize = 40;
    
    // Don't exceed remaining questions
    const remaining = totalQuestions - strongCount;
    return Math.min(baseSize, Math.max(10, remaining));
  };

  // Smart question selection for training
  const selectTrainingQuestions = (count: number) => {
    const weightedQuestions = questions.map((q: any) => ({
      ...q,
      srsWeight: calculateSRSWeight(progress[q.id])
    })).sort((a: any, b: any) => b.srsWeight - a.srsWeight);

    // Mix of question types:
    // - 40% New questions (never seen)
    // - 30% Weak questions (need reinforcement)
    // - 20% Due for review (based on interval)
    // - 10% Random (for variety)
    
    const newQuestions = weightedQuestions.filter((q: any) => !progress[q.id]).slice(0, Math.ceil(count * 0.4));
    const weakQuestions = weightedQuestions.filter((q: any) => progress[q.id]?.strength === 'weak').slice(0, Math.ceil(count * 0.3));
    const dueQuestions = weightedQuestions.filter((q: any) => {
      if (!progress[q.id]) return false;
      const daysSince = Math.floor((Date.now() - new Date(progress[q.id].lastSeen).getTime()) / (1000 * 60 * 60 * 24));
      return daysSince >= 1;
    }).slice(0, Math.ceil(count * 0.2));
    const randomQuestions = shuffleArray(weightedQuestions).slice(0, Math.ceil(count * 0.1));

    // Combine and shuffle
    const combined = [...newQuestions, ...weakQuestions, ...dueQuestions, ...randomQuestions];
    const unique = Array.from(new Set(combined.map((q: any) => q.id))).map(id => 
      combined.find((q: any) => q.id === id)
    );
    
    return shuffleArray(unique).slice(0, count);
  };

  const startTraining = () => {
    const sessionSize = calculateSessionSize();
    const selected = selectTrainingQuestions(sessionSize);
    setTrainingQuestions(selected);
    setStarted(true);
    setCurrentIdx(0);
    setAnswers([]);
    setShowTranslation(false);
    setSessionStats({ correct: 0, incorrect: 0, total: 0 });
  };

  if (!started) {
    // Calculate session recommendations
    const newCount = questions.filter((q: any) => !progress[q.id]).length;
    const weakCount = questions.filter((q: any) => progress[q.id]?.strength === 'weak').length;
    const mediumCount = questions.filter((q: any) => progress[q.id]?.strength === 'medium').length;
    const strongCount = questions.filter((q: any) => progress[q.id]?.strength === 'strong').length;
    const dueCount = questions.filter((q: any) => {
      if (!progress[q.id]) return false;
      const daysSince = Math.floor((Date.now() - new Date(progress[q.id].lastSeen).getTime()) / (1000 * 60 * 60 * 24));
      return daysSince >= 1;
    }).length;
    
    const sessionSize = calculateSessionSize();
    const answeredCount = Object.keys(progress).length;
    const accuracyRate = answeredCount > 0 ? (strongCount / answeredCount * 100).toFixed(0) : 0;

    return (
      <div className="p-4">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-full">
              <Brain className="text-white" size={24} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">{lang === 'de' ? 'Training Modus' : 'Training Mode'}</h2>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 mb-6 border-l-4 border-purple-500">
            <h3 className="font-bold text-purple-900 mb-2 flex items-center gap-2">
              <Sparkles size={18} />
              {lang === 'de' ? 'Intelligentes Lern-System (wie Anki)' : 'Smart Learning System (like Anki)'}
            </h3>
            <p className="text-sm text-purple-800 mb-3">
              {lang === 'de' 
                ? 'Adaptives Wiederholungssystem das sich an deinen Fortschritt anpasst. Schwache Bereiche werden häufiger wiederholt!' 
                : 'Adaptive spaced repetition system that adjusts to your progress. Weak areas are repeated more frequently!'}
            </p>
            <div className="flex items-center gap-4 text-sm">
              <div className="bg-white px-3 py-2 rounded-lg">
                <span className="text-purple-600 font-bold text-2xl">{sessionSize}</span>
                <span className="text-purple-800 ml-2">{lang === 'de' ? 'Fragen' : 'questions'}</span>
              </div>
              <div className="text-purple-700">
                {sessionSize > 20 && (
                  <div className="flex items-center gap-1">
                    <BarChart3 size={16} />
                    <span className="text-xs font-semibold">
                      {lang === 'de' ? `Erhöht! ${accuracyRate}% Genauigkeit` : `Increased! ${accuracyRate}% accuracy`}
                    </span>
                  </div>
                )}
                {sessionSize === 20 && (
                  <span className="text-xs">{lang === 'de' ? 'Standard-Sitzung' : 'Standard session'}</span>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <div className="bg-blue-50 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                  {newCount}
                </div>
                <div>
                  <p className="font-semibold text-blue-900">{lang === 'de' ? 'Neue Fragen' : 'New Questions'}</p>
                  <p className="text-xs text-blue-700">{lang === 'de' ? 'Noch nie gesehen' : 'Never seen before'}</p>
                </div>
              </div>
              <Zap className="text-blue-500" size={24} />
            </div>

            <div className="bg-red-50 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-red-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                  {weakCount}
                </div>
                <div>
                  <p className="font-semibold text-red-900">{lang === 'de' ? 'Schwache Bereiche' : 'Weak Areas'}</p>
                  <p className="text-xs text-red-700">{lang === 'de' ? 'Brauchen Wiederholung' : 'Need reinforcement'}</p>
                </div>
              </div>
              <AlertCircle className="text-red-500" size={24} />
            </div>

            <div className="bg-yellow-50 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-yellow-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                  {mediumCount}
                </div>
                <div>
                  <p className="font-semibold text-yellow-900">{lang === 'de' ? 'In Bearbeitung' : 'Learning'}</p>
                  <p className="text-xs text-yellow-700">{lang === 'de' ? 'Mittlere Genauigkeit' : 'Medium accuracy'}</p>
                </div>
              </div>
              <Target className="text-yellow-500" size={24} />
            </div>

            <div className="bg-orange-50 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-orange-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                  {dueCount}
                </div>
                <div>
                  <p className="font-semibold text-orange-900">{lang === 'de' ? 'Zur Wiederholung fällig' : 'Due for Review'}</p>
                  <p className="text-xs text-orange-700">{lang === 'de' ? 'Basierend auf Zeitintervallen' : 'Based on time intervals'}</p>
                </div>
              </div>
              <Clock className="text-orange-500" size={24} />
            </div>

            <div className="bg-green-50 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-green-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                  {strongCount}
                </div>
                <div>
                  <p className="font-semibold text-green-900">{lang === 'de' ? 'Bekannte Fragen' : 'Known Questions'}</p>
                  <p className="text-xs text-green-700">{lang === 'de' ? 'Stark gemeistert' : 'Strong mastery'}</p>
                </div>
              </div>
              <CheckCircle2 className="text-green-500" size={24} />
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <h4 className="font-bold text-gray-800 mb-3">{lang === 'de' ? '🎯 Wie funktioniert Training?' : '🎯 How Training Works'}</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">1.</span>
                <span>{lang === 'de' ? `${sessionSize} Fragen ausgewählt nach deinem Fortschritt` : `${sessionSize} questions selected based on your progress`}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">2.</span>
                <span>{lang === 'de' ? 'Schwache Fragen kommen öfter zurück' : 'Weak questions come back more often'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">3.</span>
                <span>{lang === 'de' ? 'Starke Fragen werden nach Tagen wiederholt' : 'Strong questions reviewed after days'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">4.</span>
                <span>{lang === 'de' ? 'Sitzungsgröße steigt mit deinem Fortschritt (bis 40!)' : 'Session size grows with your progress (up to 40!)'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">5.</span>
                <span>{lang === 'de' ? 'Vokabel-Highlighting für sofortiges Lernen' : 'Vocabulary highlighting for instant learning'}</span>
              </li>
            </ul>
          </div>

          <button onClick={startTraining} className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl py-4 font-bold shadow-lg flex items-center justify-center gap-2">
            <Brain size={24} />
            {lang === 'de' ? `Training starten (${sessionSize} Fragen)` : `Start Training (${sessionSize} Questions)`}
          </button>
        </div>
      </div>
    );
  }

  if (currentIdx >= trainingQuestions.length) {
    const score = answers.filter((ans: any) => ans?.isCorrect).length;
    const accuracy = Math.round((score / trainingQuestions.length) * 100);
    
    return (
      <div className="p-4">
        <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
          <div className="text-6xl mb-4">
            {accuracy >= 80 ? '🎉' : accuracy >= 60 ? '👍' : '📚'}
          </div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            {lang === 'de' ? 'Training abgeschlossen!' : 'Training Completed!'}
          </h2>
          <div className={`text-6xl font-bold mb-4 ${
            accuracy >= 80 ? 'text-green-600' : 
            accuracy >= 60 ? 'text-yellow-600' : 'text-orange-600'
          }`}>
            {score}/{trainingQuestions.length}
          </div>
          <p className="text-xl mb-6 font-semibold text-gray-700">
            {lang === 'de' ? 'Genauigkeit' : 'Accuracy'}: {accuracy}%
          </p>

          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <h3 className="font-bold text-gray-800 mb-3">{lang === 'de' ? 'Sitzungsstatistik' : 'Session Stats'}</h3>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <div className="text-3xl font-bold text-green-600">{sessionStats.correct}</div>
                <div className="text-xs text-gray-600">{lang === 'de' ? 'Richtig' : 'Correct'}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-red-600">{sessionStats.incorrect}</div>
                <div className="text-xs text-gray-600">{lang === 'de' ? 'Falsch' : 'Wrong'}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600">{trainingQuestions.length}</div>
                <div className="text-xs text-gray-600">{lang === 'de' ? 'Gesamt' : 'Total'}</div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button onClick={() => setStarted(false)} className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl py-3 font-bold shadow-lg">
              {lang === 'de' ? 'Neue Training-Sitzung' : 'New Training Session'}
            </button>
            <p className="text-sm text-gray-600">
              {lang === 'de' 
                ? '💡 Tipp: Komme morgen zurück für optimale Wiederholung!' 
                : '💡 Tip: Come back tomorrow for optimal review!'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const q = trainingQuestions[currentIdx];
  if (!q) return null;

  const answered = answers[currentIdx] !== undefined;
  const userAnswer = answers[currentIdx];

  const handleAnswer = (originalIndex: any) => {
    const isCorrect = originalIndex === q.correct_index;
    const newAnswers = [...answers];
    newAnswers[currentIdx] = { selectedIndex: originalIndex, isCorrect };
    setAnswers(newAnswers);
    updateProgress(q.id, isCorrect);
    
    // Update session stats
    setSessionStats(prev => ({
      ...prev,
      correct: prev.correct + (isCorrect ? 1 : 0),
      incorrect: prev.incorrect + (isCorrect ? 0 : 1),
      total: prev.total + 1
    }));
  };

  const CategoryIcon = CATEGORY_ICONS[q.category] || BookOpen;
  const strengthColor = !progress[q.id] ? 'gray' : 
    progress[q.id].strength === 'strong' ? 'green' :
    progress[q.id].strength === 'medium' ? 'yellow' : 'red';

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="bg-white rounded-xl p-4 shadow-md">
        <div className="flex justify-between items-center mb-3">
          <span className="font-bold text-gray-800">{currentIdx + 1}/{trainingQuestions.length}</span>
          <div className="flex gap-2 items-center">
            <div className={`w-2 h-2 rounded-full bg-${strengthColor}-400`}></div>
            <CategoryIcon size={16} className="text-purple-600" />
            <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full font-semibold">
              {q.category}
            </span>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all" style={{ width: `${((currentIdx + 1) / trainingQuestions.length) * 100}%` }}></div>
        </div>
      </div>

      {/* Session Stats */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-3 shadow-sm flex justify-around text-center">
        <div>
          <div className="text-lg font-bold text-green-600">{sessionStats.correct}</div>
          <div className="text-xs text-gray-600">✓</div>
        </div>
        <div>
          <div className="text-lg font-bold text-red-600">{sessionStats.incorrect}</div>
          <div className="text-xs text-gray-600">✗</div>
        </div>
        <div>
          <div className="text-lg font-bold text-purple-600">{Math.round((sessionStats.correct / Math.max(1, sessionStats.total)) * 100)}%</div>
          <div className="text-xs text-gray-600">{lang === 'de' ? 'Genauigkeit' : 'Accuracy'}</div>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-bold text-gray-800 flex-1">
            <HighlightedText 
              text={lang === 'de' ? q.question_de : q.question_en}
              onClick={(word: string) => setSelectedVocab(word)}
            />
          </h3>
          <button onClick={() => setShowTranslation(!showTranslation)} className="ml-2 p-2 text-gray-500 hover:text-purple-600 transition">
            {showTranslation ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        
        {showTranslation && (
          <p className="text-sm text-gray-600 mb-4 italic border-l-2 border-purple-300 pl-3 bg-purple-50 p-2 rounded">
            {lang === 'de' ? q.question_en : q.question_de}
          </p>
        )}
        
        {selectedVocab && (
          <VocabPopup 
            word={selectedVocab}
            onClose={() => setSelectedVocab(null)}
            lang={lang}
          />
        )}

        <div className="space-y-3">
          {shuffledOptions.map((opt: any, idx: number) => {
            const isSelected = userAnswer?.selectedIndex === opt.originalIndex;
            const isCorrectAnswer = opt.originalIndex === q.correct_index;
            const showAsCorrect = answered && isCorrectAnswer;
            const showAsWrong = answered && isSelected && !isCorrectAnswer;

            return (
              <button
                key={idx}
                onClick={() => !answered && handleAnswer(opt.originalIndex)}
                disabled={answered}
                className={`w-full text-left p-4 rounded-xl border-2 font-semibold transition-all ${
                  showAsWrong ? 'bg-red-50 border-red-500 shadow-md' :
                  showAsCorrect ? 'bg-green-50 border-green-500 shadow-md' :
                  'border-gray-200 hover:border-purple-400 hover:shadow-md active:scale-98'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    showAsWrong ? 'bg-red-500 text-white' :
                    showAsCorrect ? 'bg-green-500 text-white' :
                    'bg-gray-200 text-gray-600'
                  }`}>
                    {answered && (showAsCorrect || showAsWrong) ? (
                      isCorrectAnswer ? <Check size={16} /> : <X size={16} />
                    ) : (
                      String.fromCharCode(65 + idx)
                    )}
                  </span>
                  <span className="flex-1">{opt.text}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Feedback */}
      {answered && (
        <div className={`rounded-2xl p-4 shadow-lg ${userAnswer.isCorrect ? 'bg-green-50 border-l-4 border-green-500' : 'bg-orange-50 border-l-4 border-orange-500'}`}>
          <div className="flex items-center gap-2 mb-2">
            {userAnswer.isCorrect ? <CheckCircle2 className="text-green-600" size={24} /> : <X className="text-orange-600" size={24} />}
            <span className={`font-bold text-lg ${userAnswer.isCorrect ? 'text-green-800' : 'text-orange-800'}`}>
              {userAnswer.isCorrect ? (lang === 'de' ? 'Richtig! ✓' : 'Correct! ✓') : (lang === 'de' ? 'Falsch ✗' : 'Wrong ✗')}
            </span>
          </div>
          {!userAnswer.isCorrect && (
            <p className="text-sm text-gray-700 mt-2">
              {lang === 'de' ? '✓ Richtige Antwort: ' : '✓ Correct answer: '}
              <span className="font-semibold">{(lang === 'de' ? q.options_de : q.options_en)[q.correct_index]}</span>
            </p>
          )}
        </div>
      )}

      {/* Next Button */}
      <button
        onClick={() => { 
          if (answered) { 
            setCurrentIdx(currentIdx + 1); 
            setShowTranslation(false); 
            setSelectedVocab(null);
          } 
        }}
        disabled={!answered}
        className={`w-full py-4 rounded-xl font-bold shadow-lg transition ${answered ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
      >
        {currentIdx === trainingQuestions.length - 1 ? (lang === 'de' ? 'Ergebnis anzeigen' : 'Show Result') : (lang === 'de' ? 'Weiter →' : 'Next →')}
      </button>
    </div>
  );
}

function CardsPage({ lang, questions, updateProgress, progress }: CardsPageProps) {
  const [started, setStarted] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [cards, setCards] = useState<Question[]>([]);

  const startCards = () => {
    const weightedCards = questions.map((q: Question) => ({
      ...q,
      weight: calculateQuestionWeight(progress[q.id])
    })).sort((a: { weight: number }, b: { weight: number }) => b.weight - a.weight);
    
    setCards(weightedCards);
    setStarted(true);
    setCurrentIdx(0);
    setFlipped(false);
  };

  if (!started) {
    return (
      <div className="p-4">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">{lang === 'de' ? 'Kartenset Modus' : 'Flashcard Mode'}</h2>
          <div className="space-y-3 mb-6">
            <p className="text-gray-700">{lang === 'de' ? '✓ Intelligente Reihenfolge basiert auf deinen Schwächen' : '✓ Smart order based on your weaknesses'}</p>
            <p className="text-gray-700">{lang === 'de' ? '✓ Tippe auf die Karte zum Umdrehen' : '✓ Tap card to flip'}</p>
            <p className="text-gray-700">{lang === 'de' ? '✓ Bewerte dein Wissen selbst' : '✓ Self-assess your knowledge'}</p>
          </div>
          <button onClick={startCards} className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl py-4 font-bold shadow-lg">{lang === 'de' ? 'Kartenset starten' : 'Start Flashcards'}</button>
        </div>
      </div>
    );
  }

  if (currentIdx >= cards.length) {
    return (
      <div className="p-4">
        <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
          <div className="text-6xl mb-4">🎊</div>
          <h2 className="text-2xl font-bold mb-4">{lang === 'de' ? 'Alle Karten durchgegangen!' : 'All cards reviewed!'}</h2>
          <p className="text-gray-700 mb-6">{lang === 'de' ? 'Ausgezeichnete Arbeit!' : 'Excellent work!'}</p>
          <button onClick={() => setStarted(false)} className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl py-3 font-bold shadow-lg">{lang === 'de' ? 'Neu starten' : 'Restart'}</button>
        </div>
      </div>
    );
  }

  const q = cards[currentIdx];
  if (!q) return null;

  const CategoryIcon = CATEGORY_ICONS[q.category] || BookOpen;
  const strengthColor = !progress[q.id] ? 'bg-gray-400' : 
    progress[q.id].strength === 'strong' ? 'bg-green-400' :
    progress[q.id].strength === 'medium' ? 'bg-yellow-400' : 'bg-red-400';

  return (
    <div className="p-4 space-y-4">
      <div className="bg-white rounded-xl p-4 shadow-md flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="font-bold text-gray-800">{currentIdx + 1}/{cards.length}</span>
          <div className={`w-3 h-3 rounded-full ${strengthColor}`}></div>
        </div>
        <div className="flex items-center gap-2">
          <CategoryIcon size={16} className="text-green-600" />
          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-semibold">{q.category}</span>
        </div>
      </div>

      <div onClick={() => setFlipped(!flipped)} className={`rounded-2xl p-8 min-h-72 cursor-pointer flex items-center justify-center text-center shadow-xl transition-all duration-500 transform ${flipped ? 'bg-gradient-to-br from-green-500 to-emerald-600' : 'bg-gradient-to-br from-blue-500 to-purple-600'} text-white hover:scale-105`}>
        <div className="w-full">
          <div className="text-sm opacity-80 mb-4 font-semibold uppercase tracking-wide">
            {flipped ? (lang === 'de' ? 'Antwort' : 'Answer') : (lang === 'de' ? 'Frage' : 'Question')}
          </div>
          <div className="text-xl font-bold leading-relaxed">
            {flipped ? (lang === 'de' ? q.options_de[q.correct_index] : q.options_en[q.correct_index]) : (lang === 'de' ? q.question_de : q.question_en)}
          </div>
          <div className="mt-6 text-sm opacity-75">
            {flipped ? '✓' : (lang === 'de' ? '👆 Tippen zum Umdrehen' : '👆 Tap to flip')}
          </div>
        </div>
      </div>

      {flipped ? (
        <div className="flex gap-3">
          <button onClick={(e) => { e.stopPropagation(); updateProgress(q.id, false); setFlipped(false); setCurrentIdx(currentIdx + 1); }} className="flex-1 bg-red-500 hover:bg-red-600 text-white py-4 rounded-xl font-bold shadow-lg transition">
            {lang === 'de' ? '✗ Nicht gewusst' : '✗ Didn\'t Know'}
          </button>
          <button onClick={(e) => { e.stopPropagation(); updateProgress(q.id, true); setFlipped(false); setCurrentIdx(currentIdx + 1); }} className="flex-1 bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-bold shadow-lg transition">
            {lang === 'de' ? '✓ Gewusst' : '✓ Knew It'}
          </button>
        </div>
      ) : (
        <button onClick={() => setFlipped(true)} className="w-full bg-white text-gray-800 py-4 rounded-xl font-bold shadow-md border-2 border-gray-200 hover:border-indigo-400 transition">
          {lang === 'de' ? '🔄 Karte umdrehen' : '🔄 Flip Card'}
        </button>
      )}
    </div>
  );
}

/* InfoPage is declared but never used - commented out
function InfoPage({ lang }: { lang: string }) {
  return (
    <div className="p-4 space-y-4">
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">{lang === 'de' ? 'Über den Test' : 'About the Test'}</h2>
        <div className="space-y-4 text-gray-700">
          <div>
            <h3 className="font-bold text-lg mb-2">{lang === 'de' ? '📋 Test-Format' : '📋 Test Format'}</h3>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>{lang === 'de' ? '33 Multiple-Choice-Fragen' : '33 multiple-choice questions'}</li>
              <li>{lang === 'de' ? '4 Antwortmöglichkeiten pro Frage' : '4 answer options per question'}</li>
              <li>{lang === 'de' ? '60 Minuten Zeit' : '60 minutes time'}</li>
              <li>{lang === 'de' ? 'Mindestens 17 richtige Antworten zum Bestehen' : 'At least 17 correct answers to pass'}</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">{lang === 'de' ? '🎯 Lern-Features' : '🎯 Learning Features'}</h3>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>{lang === 'de' ? 'Intelligentes Lernsystem priorisiert schwache Bereiche' : 'Smart learning system prioritizes weak areas'}</li>
              <li>{lang === 'de' ? 'Antworten werden zufällig gemischt' : 'Answers are randomly shuffled'}</li>
              <li>{lang === 'de' ? 'Fortschritt wird automatisch gespeichert' : 'Progress is automatically saved'}</li>
              <li>{lang === 'de' ? 'Zweisprachig: Deutsch & Englisch' : 'Bilingual: German & English'}</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">{lang === 'de' ? '🏆 Abzeichen' : '🏆 Badges'}</h3>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li><span className="font-semibold">Beginner:</span> {lang === 'de' ? '10 Fragen beantwortet' : '10 questions answered'}</li>
              <li><span className="font-semibold">Complete:</span> {lang === 'de' ? 'Alle Fragen beantwortet' : 'All questions answered'}</li>
              <li><span className="font-semibold">Expert:</span> {lang === 'de' ? '20+ starke Bereiche' : '20+ strong areas'}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
*/

function ProgressPage({ lang, questions, progress, badges, quizHistory }: ProgressPageProps) {
  const categories = [...new Set(questions.map((q: any) => q.category))];

  const getStats = (category: any) => {
    const catQs = questions.filter((q: any) => q.category === category);
    const correct = catQs.reduce((sum: number, q: any) => sum + (progress[q.id]?.correct || 0), 0);
    const attempts = catQs.reduce((sum: number, q: any) => sum + ((progress[q.id]?.correct || 0) + (progress[q.id]?.incorrect || 0)), 0);
    return { correct, attempts, total: catQs.length };
  };

  const strengthGroups = {
    strong: questions.filter((q: any) => progress[q.id]?.strength === 'strong'),
    medium: questions.filter((q: any) => progress[q.id]?.strength === 'medium'),
    weak: questions.filter((q: any) => progress[q.id]?.strength === 'weak'),
    unanswered: questions.filter((q: any) => !progress[q.id])
  };

  const avgScore = quizHistory.length > 0 
    ? Math.round(quizHistory.reduce((sum: number, q: any) => sum + q.percentage, 0) / quizHistory.length)
    : 0;

  return (
    <div className="p-4 space-y-4">
      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-2">
          <BarChart3 size={28} />
          <h2 className="text-2xl font-bold">{lang === 'de' ? 'Dein Fortschritt' : 'Your Progress'}</h2>
        </div>
        <p className="opacity-90 text-sm">{lang === 'de' ? 'Verfolge deine Lernfortschritte' : 'Track your learning progress'}</p>
      </div>

      {/* Quiz History */}
      {quizHistory.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <BarChart3 size={20} />
            {lang === 'de' ? 'Quiz-Verlauf' : 'Quiz History'}
          </h3>
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">{lang === 'de' ? 'Durchschnittliche Punktzahl' : 'Average Score'}</span>
              <span className={`text-2xl font-bold ${
                avgScore >= 75 ? 'text-green-600' : 
                avgScore >= 60 ? 'text-yellow-600' : 'text-red-600'
              }`}>{avgScore}%</span>
            </div>
          </div>
          <div className="space-y-2">
            {quizHistory.slice(0, 5).map((quiz: any, idx: number) => (
              <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <span className="text-sm text-gray-600">
                    {new Date(quiz.date).toLocaleDateString(lang === 'de' ? 'de-DE' : 'en-US')}
                  </span>
                  <span className="text-xs text-gray-500 ml-2">
                    {new Date(quiz.date).toLocaleTimeString(lang === 'de' ? 'de-DE' : 'en-US', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-lg font-bold ${
                    quiz.percentage >= 75 ? 'text-green-600' : 
                    quiz.percentage >= 52 ? 'text-yellow-600' : 'text-red-600'
                  }`}>{quiz.score}/{quiz.total}</span>
                  <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
                    quiz.percentage >= 75 ? 'bg-green-100 text-green-800' : 
                    quiz.percentage >= 52 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                  }`}>{quiz.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white rounded-xl p-4 shadow-md border-l-4 border-green-500">
          <div className="text-3xl font-bold text-green-600">{strengthGroups.strong.length}</div>
          <div className="text-xs text-gray-600 mt-1">{lang === 'de' ? '💪 Stark' : '💪 Strong'}</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-md border-l-4 border-yellow-500">
          <div className="text-3xl font-bold text-yellow-600">{strengthGroups.medium.length}</div>
          <div className="text-xs text-gray-600 mt-1">{lang === 'de' ? '📚 Mittel' : '📚 Medium'}</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-md border-l-4 border-red-500">
          <div className="text-3xl font-bold text-red-600">{strengthGroups.weak.length}</div>
          <div className="text-xs text-gray-600 mt-1">{lang === 'de' ? '🔄 Schwach' : '🔄 Weak'}</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-md border-l-4 border-gray-400">
          <div className="text-3xl font-bold text-gray-600">{strengthGroups.unanswered.length}</div>
          <div className="text-xs text-gray-600 mt-1">{lang === 'de' ? '❓ Neu' : '❓ New'}</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-lg font-bold mb-4 text-gray-800">{lang === 'de' ? 'Nach Kategorie' : 'By Category'}</h3>
        <div className="space-y-4">
          {categories.map(cat => {
            const stats = getStats(cat);
            const pct = stats.attempts > 0 ? Math.round((stats.correct / stats.attempts) * 100) : 0;
            const CategoryIcon = CATEGORY_ICONS[cat] || BookOpen;
            return (
              <div key={cat}>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <CategoryIcon size={16} className="text-indigo-600" />
                    <span className="font-semibold text-sm">{cat}</span>
                  </div>
                  <span className="text-xs text-gray-600 font-semibold">{stats.correct}/{stats.attempts} ({pct}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all" style={{ width: `${pct}%` }}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {badges.length > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <Award className="text-yellow-500" size={24} />
            <h3 className="text-lg font-bold text-gray-800">{lang === 'de' ? 'Abzeichen' : 'Badges'} ({badges.length})</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {badges.map((b, i) => (
              <div key={i} className="bg-gradient-to-br from-yellow-400 to-orange-400 text-white px-4 py-2 rounded-xl font-bold shadow-md flex items-center gap-2">
                <span className="text-2xl">🏆</span>
                <span>{b}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
