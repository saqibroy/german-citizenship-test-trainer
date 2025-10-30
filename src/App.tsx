 import { useState, useEffect, lazy, Suspense, useCallback } from 'react';
import { Globe, BookOpen } from 'lucide-react';
import { QUESTIONS } from './data.js';
import { CITIZENSHIP_VOCABULARY } from './vacabulary.js';
import { VocabPage, VocabTrainingPage } from './components.tsx';
import { updateProgress as updateSRSProgress } from './srsAlgorithm';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import { OnboardingModal } from './components/OnboardingModal.tsx';
import { SkeletonLoader } from './components/SkeletonLoader.tsx';
import { safeGetItem, safeSetItem, validateVocabProgress } from './utils/storage';
import type { QuestionProgress, CategoryBreakdown, VocabProgress } from './types';

// Import custom hooks
import { useProgress } from './hooks/useProgress';
import { useQuizHistory } from './hooks/useQuizHistory';
import { useStudyStreak } from './hooks/useStudyStreak';
import { useBadges } from './hooks/useBadges';

// Lazy load page components for code splitting
const HomePage = lazy(() => import('./pages/HomePage.tsx').then(m => ({ default: m.HomePage })));
const QuizPage = lazy(() => import('./pages/QuizPage.tsx').then(m => ({ default: m.QuizPage })));
const TrainingPage = lazy(() => import('./pages/TrainingPage.tsx').then(m => ({ default: m.TrainingPage })));
const CardsPage = lazy(() => import('./pages/CardsPage.tsx').then(m => ({ default: m.CardsPage })));
const GrammarLessonsPage = lazy(() => import('./GrammarLessons.tsx').then(m => ({ default: m.GrammarLessonsPage })));
const StatsPage = lazy(() => import('./StatsPage.tsx').then(m => ({ default: m.StatsPage })));
const SettingsPage = lazy(() => import('./SettingsPage.tsx').then(m => ({ default: m.SettingsPage })));

// Loading component with skeleton based on current page
function PageLoader({ page }: { page: string }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4">
      {page === 'training' && <SkeletonLoader type="question" />}
      {page === 'quiz' && <SkeletonLoader type="quiz" />}
      {page === 'cards' && <SkeletonLoader type="card" />}
      {page === 'stats' && <SkeletonLoader type="stats" />}
      {!['training', 'quiz', 'cards', 'stats'].includes(page) && (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent mb-4"></div>
            <p className="text-gray-600 font-semibold">Loading...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState('home');
  const [lang, setLang] = useState('de');
  const [vocabProgress, setVocabProgress] = useState<Record<string, VocabProgress>>({});
  const [favoriteVocab, setFavoriteVocab] = useState<string[]>([]);
  const [vocabMode, setVocabMode] = useState('learn'); // 'learn' or 'training'
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Use custom hooks for cleaner state management
  const { progress, updateProgress: updateProgressHook, getProgress } = useProgress(QUESTIONS);
  const { quizHistory, addQuizResult } = useQuizHistory();
  const { studyStreak, totalStudyDays, updateStreak } = useStudyStreak();
  const { badges, checkBadges } = useBadges(progress, quizHistory, studyStreak, totalStudyDays);

  useEffect(() => {
    // Check if user has seen onboarding
    const hasSeenOnboarding = safeGetItem<boolean>('hasSeenOnboarding', false);
    if (!hasSeenOnboarding) {
      setShowOnboarding(true);
    }

    // Load vocabulary progress with validation
    const vocabData = safeGetItem<Record<string, VocabProgress>>('vocabProgress', {});
    if (validateVocabProgress(vocabData)) {
      setVocabProgress(vocabData);
    }

    // Load favorite vocabulary
    const favData = safeGetItem<string[]>('favoriteVocab', []);
    if (Array.isArray(favData)) {
      setFavoriteVocab(favData);
    }
  }, []);

  // Memoize callbacks for performance
  const updateProgress = useCallback((qId: number, correct: boolean, answerTime: number = 5) => {
    const existing = getProgress(qId);
    
    // Use the proper SRS algorithm to calculate new progress
    const updated = updateSRSProgress(existing, correct, answerTime) as QuestionProgress;
    
    // Update using the hook
    updateProgressHook(qId, updated);
    
    // Update study streak
    updateStreak();
    
    // Check for new badges
    checkBadges();
  }, [getProgress, updateProgressHook, updateStreak, checkBadges]);

  const saveQuizResult = useCallback((score: number, total: number, categoryBreakdown: CategoryBreakdown) => {
    // Use the hook to add quiz result
    addQuizResult({
      date: new Date().toISOString(),
      score,
      total,
      percentage: (score / total) * 100,
      categoryBreakdown
    });
    
    // Check for new badges after quiz
    checkBadges();
  }, [addQuizResult, checkBadges]);

  const t = {
    home: { de: 'Start', en: 'Home' },
    quiz: { de: 'Quiz', en: 'Quiz' },
    training: { de: 'Training', en: 'Training' },
    cards: { de: 'Karten', en: 'Cards' },
    vocab: { de: 'Vokabeln', en: 'Vocab' },
    grammar: { de: 'Grammatik', en: 'Grammar' },
    stats: { de: 'Statistik', en: 'Stats' },
    settings: { de: 'Einstellungen', en: 'Settings' }
  };

  const updateVocabProgress = useCallback((word: string, known: boolean, answerTime: number = 5) => {
    const existing = vocabProgress[word];
    
    // Use the new SRS algorithm
    const updated = updateSRSProgress(existing, known, answerTime) as VocabProgress;
    
    const newVocabProgress: Record<string, VocabProgress> = {
      ...vocabProgress,
      [word]: updated
    };
    
    setVocabProgress(newVocabProgress);
    safeSetItem('vocabProgress', newVocabProgress);
    updateStreak();
  }, [vocabProgress, updateStreak]);

  const toggleFavoriteVocab = useCallback((word: string) => {
    const newFavorites = favoriteVocab.includes(word)
      ? favoriteVocab.filter(w => w !== word)
      : [...favoriteVocab, word];
    setFavoriteVocab(newFavorites);
    safeSetItem('favoriteVocab', newFavorites);
  }, [favoriteVocab]);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    safeSetItem('hasSeenOnboarding', true);
  };

  return (
    <ErrorBoundary>
      {showOnboarding && <OnboardingModal onComplete={handleOnboardingComplete} lang={lang as 'de' | 'en'} />}
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 pb-20 md:pb-6">
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <BookOpen className="text-indigo-600" size={24} />
            <h1 className="text-base md:text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {lang === 'de' ? 'Einbürgerungstest' : 'Citizenship Test'}
            </h1>
          </div>
          <button 
            onClick={() => setLang(lang === 'de' ? 'en' : 'de')} 
            className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full font-semibold text-sm shadow-lg hover:shadow-xl transition-shadow active:scale-95"
          >
            <Globe size={16} />
            <span className="hidden sm:inline">{lang === 'de' ? 'EN' : 'DE'}</span>
          </button>
        </div>
        
        {/* Desktop Navigation - Hidden on mobile */}
        <nav className="hidden md:flex border-t overflow-x-auto">
          {['home', 'training', 'quiz', 'vocab', 'grammar', 'stats', 'settings'].map(p => (
            <button key={p} onClick={() => setPage(p)} className={`flex-1 py-3 text-sm font-semibold whitespace-nowrap px-2 transition-colors ${page === p ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}>
              {t[p as keyof typeof t][lang as 'de' | 'en']}
            </button>
          ))}
        </nav>
      </header>

      <main className="pb-2">
        <Suspense fallback={<PageLoader page={page} />}>
          {page === 'home' && <HomePage lang={lang} badges={badges} progress={progress} setPage={setPage} studyStreak={studyStreak} />}
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
          {page === 'grammar' && <GrammarLessonsPage lang={lang as 'de' | 'en'} />}
          {page === 'stats' && <StatsPage lang={lang as 'de' | 'en'} progress={progress} questions={QUESTIONS} badges={badges} quizHistory={quizHistory} studyStreak={studyStreak} />}
          {page === 'settings' && <SettingsPage lang={lang as 'de' | 'en'} />}
        </Suspense>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
        <div className="flex justify-around items-center h-16">
          {[
            { id: 'home', icon: '🏠', label: lang === 'de' ? 'Start' : 'Home' },
            { id: 'training', icon: '📚', label: lang === 'de' ? 'Üben' : 'Train' },
            { id: 'quiz', icon: '📝', label: lang === 'de' ? 'Quiz' : 'Quiz' },
            { id: 'vocab', icon: '📖', label: lang === 'de' ? 'Wörter' : 'Vocab' },
            { id: 'stats', icon: '📊', label: lang === 'de' ? 'Stats' : 'Stats' },
            { id: 'settings', icon: '⚙️', label: lang === 'de' ? 'Mehr' : 'More' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-all active:scale-95 ${
                page === item.id
                  ? 'text-indigo-600 bg-indigo-50'
                  : 'text-gray-500 active:bg-gray-100'
              }`}
            >
              <span className="text-xl mb-0.5">{item.icon}</span>
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
    </ErrorBoundary>
  );
}

