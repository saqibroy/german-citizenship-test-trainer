 import { useState, useEffect, lazy, Suspense, useCallback } from 'react';
import { Globe, BookOpen, LogOut, User } from 'lucide-react';
import { QUESTIONS } from './data.js';
import { CITIZENSHIP_VOCABULARY } from './vacabulary.js';
import { VocabPage, VocabTrainingPage } from './components.tsx';
import { updateProgress as updateSRSProgress } from './srsAlgorithm';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import { OnboardingModal } from './components/OnboardingModal.tsx';
import { SkeletonLoader } from './components/SkeletonLoader.tsx';
import { safeGetItem, safeSetItem, validateVocabProgress } from './utils/storage';
import type { QuestionProgress, CategoryBreakdown, VocabProgress } from './types';
import { useAuth } from './contexts/AuthContext';

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
const LandingPage = lazy(() => import('./pages/LandingPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const ForgotPasswordPage = lazy(() => import('./pages/ForgotPasswordPage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const UpgradePage = lazy(() => import('./pages/UpgradePage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const DiagnosticPage = lazy(() => import('./pages/DiagnosticPage').then(m => ({ default: m.DiagnosticPage })));

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

// Auth wrapper component
function AuthenticatedApp() {
  const { currentUser, logout } = useAuth();
  const [page, setPage] = useState('landing');

  // If user is not logged in, show landing/login/signup pages
  if (!currentUser) {
    return (
      <Suspense fallback={<PageLoader page={page} />}>
        {page === 'signup' && <SignupPage onNavigate={setPage} />}
        {page === 'forgot-password' && <ForgotPasswordPage onNavigate={setPage} />}
        {page === 'login' && <LoginPage onNavigate={setPage} />}
        {(page === 'landing' || page === 'home') && (
          <LandingPage 
            lang="de" 
            onGetStarted={() => setPage('signup')} 
          />
        )}
      </Suspense>
    );
  }

  return <MainApp currentUser={currentUser} logout={logout} />;
}

// Main app component (only rendered when authenticated)
function MainApp({ currentUser, logout }: { currentUser: any; logout: () => Promise<void> }) {
  const { syncDataToCloud } = useAuth();
  const [page, setPage] = useState('home');
  const [lang, setLang] = useState('de');
  const [vocabProgress, setVocabProgress] = useState<Record<string, VocabProgress>>({});
  const [favoriteVocab, setFavoriteVocab] = useState<string[]>([]);
  const [vocabMode, setVocabMode] = useState('learn'); // 'learn' or 'training'
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = async () => {
    try {
      // Sync data before logout
      await syncDataToCloud();
      await logout();
      setShowLogoutConfirm(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

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
    faq: { de: 'FAQ', en: 'FAQ' },
    upgrade: { de: 'Premium', en: 'Upgrade' },
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
      
      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                <LogOut className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {lang === 'de' ? 'Abmelden?' : 'Logout?'}
              </h2>
              <p className="text-gray-600">
                {lang === 'de' 
                  ? 'Deine Fortschritte werden automatisch gespeichert.' 
                  : 'Your progress will be automatically saved.'}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
              >
                {lang === 'de' ? 'Abbrechen' : 'Cancel'}
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-colors"
              >
                {lang === 'de' ? 'Abmelden' : 'Logout'}
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 pb-20 md:pb-6">
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <BookOpen className="text-indigo-600" size={24} />
            <h1 className="text-base md:text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {lang === 'de' ? 'Einbürgerungstest' : 'Citizenship Test'}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            {currentUser && (
              <button
                onClick={() => setShowLogoutConfirm(true)}
                className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
                title={lang === 'de' ? 'Abmelden' : 'Logout'}
              >
                <User size={18} onClick={() => setPage('profile')} className="cursor-pointer" />
                <LogOut size={16} className="hidden sm:inline" />
              </button>
            )}
            <button 
              onClick={() => setLang(lang === 'de' ? 'en' : 'de')} 
              className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full font-semibold text-sm shadow-lg hover:shadow-xl transition-shadow active:scale-95"
            >
              <Globe size={16} />
              <span className="hidden sm:inline">{lang === 'de' ? 'EN' : 'DE'}</span>
            </button>
          </div>
        </div>
        
        {/* Desktop Navigation - Hidden on mobile */}
        <nav className="hidden md:flex border-t overflow-x-auto">
          {['home', 'training', 'quiz', 'vocab', 'grammar', 'stats', 'faq', 'settings'].map(p => (
            <button key={p} onClick={() => setPage(p)} className={`flex-1 py-3 text-sm font-semibold whitespace-nowrap px-2 transition-colors ${page === p ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}>
              {t[p as keyof typeof t][lang as 'de' | 'en']}
            </button>
          ))}
        </nav>
      </header>

      <main className="pb-2">
        <Suspense fallback={<PageLoader page={page} />}>
          {page === 'home' && <HomePage lang={lang} badges={badges} progress={progress} setPage={setPage} studyStreak={studyStreak} userName={currentUser?.displayName || ''} />}
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
          {page === 'faq' && <FAQPage lang={lang as 'de' | 'en'} />}
          {page === 'upgrade' && <UpgradePage onNavigate={setPage} />}
          {page === 'profile' && <ProfilePage lang={lang as 'de' | 'en'} onNavigate={setPage} userName={currentUser?.displayName || ''} userEmail={currentUser?.email || ''} />}
          {page === 'settings' && <SettingsPage lang={lang as 'de' | 'en'} onNavigate={setPage} />}
          {page === 'diagnostic' && <DiagnosticPage />}
        </Suspense>
      </main>

      {/* Modern Mobile Bottom Navigation - 5 items only */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50 safe-area-inset-bottom">
        <div className="grid grid-cols-5 gap-0">
          {[
            { id: 'home', icon: '🏠', label: lang === 'de' ? 'Home' : 'Home' },
            { id: 'training', icon: '📚', label: lang === 'de' ? 'Üben' : 'Train' },
            { id: 'quiz', icon: '📝', label: lang === 'de' ? 'Quiz' : 'Quiz' },
            { id: 'stats', icon: '📊', label: lang === 'de' ? 'Stats' : 'Stats' },
            { id: 'settings', icon: '⚙️', label: lang === 'de' ? 'Mehr' : 'More' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className={`flex flex-col items-center justify-center py-3 transition-all active:scale-95 ${
                page === item.id
                  ? 'text-indigo-600 bg-indigo-50'
                  : 'text-gray-500 active:bg-gray-100'
              }`}
            >
              <span className="text-2xl mb-1">{item.icon}</span>
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
    </ErrorBoundary>
  );
}

// Export the auth wrapper as default
export default function App() {
  return <AuthenticatedApp />;
}
