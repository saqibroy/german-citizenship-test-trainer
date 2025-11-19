import { useState, useEffect, lazy, Suspense, useCallback } from 'react';
import { Globe, BookOpen } from 'lucide-react';
import { QUESTIONS } from './data.js';
import { CITIZENSHIP_VOCABULARY } from './vacabulary.js';
import { VocabPage, VocabTrainingPage } from './components.tsx';
import { updateProgress as updateSRSProgress } from './srsAlgorithm';
import { OnboardingModal } from './components/OnboardingModal.tsx';
import { SkeletonLoader } from './components/SkeletonLoader.tsx';
import { BottomNav } from './components/BottomNav';
import { safeGetItem, safeSetItem, validateVocabProgress } from './utils/storage';
import type { QuestionProgress, CategoryBreakdown, VocabProgress } from './types';

// Import custom hooks
import { useProgress } from './hooks/useProgress';
import { useQuizHistory } from './hooks/useQuizHistory';
import { useStudyStreak } from './hooks/useStudyStreak';
import { useBadges } from './hooks/useBadges';
import { useFirestoreSync } from './hooks/useFirestoreSync';
import { useDataMigration } from './hooks/useDataMigration';
import { useAuth } from './contexts/AuthContext';

// Lazy load page components for code splitting
const HomePage = lazy(() => import('./pages/HomePage.tsx').then(m => ({ default: m.HomePage })));
const QuizPage = lazy(() => import('./pages/QuizPage.tsx').then(m => ({ default: m.QuizPage })));
const TrainingPage = lazy(() => import('./pages/TrainingPage.tsx').then(m => ({ default: m.TrainingPage })));
const CardsPage = lazy(() => import('./pages/CardsPage.tsx').then(m => ({ default: m.CardsPage })));
const GrammarLessonsPage = lazy(() => import('./GrammarLessons.tsx').then(m => ({ default: m.GrammarLessonsPage })));
const StatsPage = lazy(() => import('./StatsPage.tsx').then(m => ({ default: m.StatsPage })));
const SettingsPage = lazy(() => import('./SettingsPage.tsx').then(m => ({ default: m.SettingsPage })));
const LandingPage = lazy(() => import('./pages/LandingPage.tsx'));
const FAQPage = lazy(() => import('./pages/FAQPage.tsx'));

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

export default function AppContent() {
  // Check if first visit before component mount
  const hasVisited = safeGetItem<boolean>('hasVisited', false);
  const [page, setPage] = useState(hasVisited ? 'home' : 'landing');
  const [lang, setLang] = useState('de');
  const [vocabProgress, setVocabProgress] = useState<Record<string, VocabProgress>>({});
  const [favoriteVocab, setFavoriteVocab] = useState<string[]>([]);
  const [vocabMode, setVocabMode] = useState('learn'); // 'learn' or 'training'
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Get auth state
  const { user } = useAuth();

  // Use custom hooks for cleaner state management
  const { progress, updateProgress: updateProgressHook, getProgress } = useProgress(QUESTIONS);
  const { quizHistory, addQuizResult } = useQuizHistory();
  const { studyStreak, totalStudyDays, updateStreak } = useStudyStreak();
  const { badges, checkBadges } = useBadges(progress, quizHistory, studyStreak, totalStudyDays);
  
  // Firebase sync hook (now safe because we're inside AuthProvider)
  const { syncProgress: syncToFirestore } = useFirestoreSync({
    progress,
    studyStreak,
    totalStudyDays,
  });

  // Automatic data migration from localStorage to Firestore on first login
  const { isMigrating, migrationComplete, migrationError } = useDataMigration();

  useEffect(() => {
    // Mark as visited after first load
    if (!hasVisited) {
      safeSetItem('hasVisited', true);
    }

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
    
    // Sync to Firestore if user is logged in
    syncToFirestore(qId, updated);
  }, [getProgress, updateProgressHook, updateStreak, checkBadges, syncToFirestore]);

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
    <>
      {showOnboarding && <OnboardingModal onComplete={handleOnboardingComplete} lang={lang as 'de' | 'en'} />}
      
      {/* Migration Status Banner */}
      {isMigrating && (
        <div className="fixed top-0 left-0 right-0 z-[100] bg-blue-600 text-white p-3 text-center animate-pulse">
          <div className="flex items-center justify-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
            <span className="font-semibold">
              {lang === 'de' ? '🔄 Daten werden migriert...' : '🔄 Migrating your data...'}
            </span>
          </div>
        </div>
      )}
      
      {migrationComplete && user && !isMigrating && (
        <div className="fixed top-0 left-0 right-0 z-[100] bg-green-600 text-white p-3 text-center animate-[slideDown_0.3s_ease-out,slideUp_0.3s_ease-in_3s_forwards]">
          <span className="font-semibold">
            {lang === 'de' ? '✅ Alle Daten erfolgreich synchronisiert!' : '✅ All data synced successfully!'}
          </span>
        </div>
      )}
      
      {migrationError && (
        <div className="fixed top-0 left-0 right-0 z-[100] bg-red-600 text-white p-3 text-center">
          <span className="font-semibold">
            {lang === 'de' ? '⚠️ Fehler beim Synchronisieren (Lokale Daten sind sicher)' : '⚠️ Sync error (Your local data is safe)'}
          </span>
        </div>
      )}
      
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        {/* Header - Only show on non-landing/FAQ pages */}
        {!['landing', 'faq'].includes(page) && (
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
                className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full font-semibold text-sm shadow-lg hover:shadow-xl transition-shadow active:scale-95 touch-target"
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
        )}

        <main className={!['landing', 'faq'].includes(page) ? 'main-content' : ''}>
          <Suspense fallback={<PageLoader page={page} />}>
            {page === 'landing' && <LandingPage lang={lang as 'de' | 'en'} onGetStarted={() => setPage('home')} />}
            {page === 'faq' && <FAQPage lang={lang as 'de' | 'en'} />}
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
            {page === 'settings' && <SettingsPage lang={lang as 'de' | 'en'} setPage={setPage} />}
          </Suspense>
        </main>

        {/* New Bottom Navigation - Only show on main pages */}
        {!['landing', 'faq'].includes(page) && (
          <BottomNav 
            currentPage={page}
            onNavigate={setPage}
            lang={lang}
          />
        )}
      </div>
    </>
  );
}
