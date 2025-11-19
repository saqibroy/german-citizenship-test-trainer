import { useState } from 'react';
import { 
  Award, ChevronRight, AlertCircle, Brain, Target, BookMarked, BookOpen, Flame, LogIn, User
} from 'lucide-react';
import { QUESTIONS } from '../data.js';
import { daysSinceLastSeen } from '../srsAlgorithm';
import type { HomePageProps } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { AuthModal } from '../components/AuthModal';
import { UserProfile } from '../components/UserProfile';

export function HomePage({ lang, badges, progress, setPage, studyStreak }: HomePageProps) {
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  
  const answered = Object.keys(progress).length;
  const totalQuestions = QUESTIONS.length;
  
  // Calculate due questions
  const dueCount = Object.entries(progress).filter(([_, p]) => {
    const daysSince = daysSinceLastSeen(p.lastSeen);
    return daysSince >= (p.interval || 0);
  }).length;
  
  // Simple progress calculation
  const progressPercentage = totalQuestions > 0 ? Math.round((answered / totalQuestions) * 100) : 0;
  const masteredCount = Object.values(progress).filter((p: any) => p.srsLevel === 'mastered').length;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 space-y-4">
      {/* Auth & Profile Modals */}
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
      {showProfile && <UserProfile onClose={() => setShowProfile(false)} />}
      
      {/* Welcome Message */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {user 
                ? `👋 ${lang === 'de' ? 'Hallo' : 'Hello'}, ${user.displayName || user.email?.split('@')[0] || 'User'}!`
                : (lang === 'de' ? '👋 Willkommen zurück!' : '👋 Welcome back!')
              }
            </h1>
            <p className="text-lg opacity-90">
              {answered === 0 
                ? (lang === 'de' ? 'Beginne deine Reise zur deutschen Staatsbürgerschaft!' : 'Start your journey to German citizenship!')
                : (lang === 'de' ? 'Weiter so! Du machst Fortschritte.' : 'Keep going! You\'re making progress.')}
            </p>
          </div>
          
          {/* Auth Button */}
          {user ? (
            <button 
              onClick={() => setShowProfile(true)}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-full transition-all active:scale-95"
            >
              <User size={20} />
              <span className="hidden sm:inline font-semibold">{lang === 'de' ? 'Profil' : 'Profile'}</span>
            </button>
          ) : (
            <button 
              onClick={() => setShowAuthModal(true)}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-full transition-all active:scale-95"
            >
              <LogIn size={20} />
              <span className="hidden sm:inline font-semibold">{lang === 'de' ? 'Anmelden' : 'Login'}</span>
            </button>
          )}
        </div>
        
        {/* Sync Status for logged in users */}
        {user && (
          <div className="mt-4 flex items-center gap-2 text-sm opacity-80">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>{lang === 'de' ? 'Daten werden synchronisiert' : 'Data syncing across devices'}</span>
          </div>
        )}
      </div>

      {/* Study Streak Card */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-orange-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-orange-400 to-red-500 p-3 rounded-full">
              <Flame className="text-white" size={28} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">{lang === 'de' ? 'Lern-Streak' : 'Study Streak'}</h3>
              <p className="text-sm text-gray-600">{lang === 'de' ? 'Bleib dran!' : 'Keep it up!'}</p>
            </div>
          </div>
          <div className="text-5xl font-black text-orange-600">{studyStreak}</div>
        </div>
        <p className="text-sm text-gray-700">
          {studyStreak === 0 
            ? (lang === 'de' ? '🔥 Starte heute deinen Streak!' : '🔥 Start your streak today!')
            : studyStreak === 1
            ? (lang === 'de' ? '🎉 Erster Tag! Mach weiter!' : '🎉 First day! Keep going!')
            : studyStreak < 7
            ? (lang === 'de' ? `💪 ${studyStreak} Tage in Folge!` : `💪 ${studyStreak} days in a row!`)
            : studyStreak < 30
            ? (lang === 'de' ? `🔥 Großartig! ${studyStreak} Tage!` : `🔥 Amazing! ${studyStreak} days!`)
            : (lang === 'de' ? `🏆 Unglaublich! ${studyStreak} Tage!` : `🏆 Incredible! ${studyStreak} days!`)}
        </p>
      </div>

      {/* Progress Overview - MODERNIZED */}
      <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-indigo-100">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-xl font-black text-gray-900">{lang === 'de' ? 'Dein Fortschritt' : 'Your Progress'}</h3>
            <p className="text-sm text-gray-600 mt-0.5">{lang === 'de' ? 'Bis zur Prüfung' : 'Until exam ready'}</p>
          </div>
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-3 rounded-xl shadow-lg">
            <div className="text-3xl font-black">{progressPercentage}%</div>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden mb-5 shadow-inner">
          <div 
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500 shadow-lg"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center bg-indigo-50 rounded-xl p-3">
            <div className="text-2xl font-black text-indigo-600 mb-1">{answered}</div>
            <div className="text-xs text-gray-700 font-semibold">{lang === 'de' ? 'Beantwortet' : 'Answered'}</div>
          </div>
          <div className="text-center bg-green-50 rounded-xl p-3">
            <div className="text-2xl font-black text-green-600 mb-1">{masteredCount}</div>
            <div className="text-xs text-gray-700 font-semibold">{lang === 'de' ? 'Gemeistert' : 'Mastered'}</div>
          </div>
          <div className="text-center bg-red-50 rounded-xl p-3">
            <div className="text-2xl font-black text-red-600 mb-1">{dueCount}</div>
            <div className="text-xs text-gray-700 font-semibold">{lang === 'de' ? 'Fällig' : 'Due'}</div>
          </div>
        </div>
      </div>

      {/* Quick Actions - MODERN MOBILE-FIRST DESIGN */}
      <div className="space-y-3">
        {dueCount > 0 && (
          <button 
            onClick={() => setPage('training')} 
            className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-2xl p-5 font-bold shadow-xl hover:shadow-2xl transition-all active:scale-98 touch-target"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                  <AlertCircle size={28} />
                </div>
                <div className="text-left">
                  <div className="text-lg font-black">{lang === 'de' ? 'Fällige Fragen' : 'Review Due'}</div>
                  <div className="text-sm opacity-90 font-medium">{dueCount} {lang === 'de' ? 'warten auf dich' : 'waiting for you'}</div>
                </div>
              </div>
              <ChevronRight size={24} className="flex-shrink-0" />
            </div>
          </button>
        )}
        
        <button 
          onClick={() => setPage('training')} 
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl p-5 font-bold shadow-xl hover:shadow-2xl transition-all active:scale-98 touch-target"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                <Brain size={28} />
              </div>
              <div className="text-left">
                <div className="text-lg font-black">{lang === 'de' ? 'Training' : 'Training'}</div>
                <div className="text-sm opacity-90 font-medium">{lang === 'de' ? 'Intelligentes Lernen' : 'Smart Learning'}</div>
              </div>
            </div>
            <ChevronRight size={24} className="flex-shrink-0" />
          </div>
        </button>

        <button 
          onClick={() => setPage('quiz')} 
          className="w-full bg-gradient-to-r from-amber-500 to-red-500 text-white rounded-2xl p-5 font-bold shadow-xl hover:shadow-2xl transition-all active:scale-98 touch-target"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                <Target size={28} />
              </div>
              <div className="text-left">
                <div className="text-lg font-black">{lang === 'de' ? 'Prüfungs-Quiz' : 'Exam Quiz'}</div>
                <div className="text-sm opacity-90 font-medium">33 {lang === 'de' ? 'echte Fragen' : 'real questions'}</div>
              </div>
            </div>
            <ChevronRight size={24} className="flex-shrink-0" />
          </div>
        </button>

        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => setPage('vocab')} 
            className="bg-white text-gray-800 rounded-2xl p-5 font-bold shadow-lg hover:shadow-xl border-2 border-purple-200 hover:border-purple-400 transition-all active:scale-98 touch-target"
          >
            <div className="bg-purple-50 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-3">
              <BookMarked className="text-purple-600" size={32} />
            </div>
            <div className="text-base font-bold">{lang === 'de' ? 'Vokabeln' : 'Vocabulary'}</div>
            <div className="text-xs text-gray-600 mt-1 font-medium">{lang === 'de' ? 'Wortschatz' : 'Learn words'}</div>
          </button>
          <button 
            onClick={() => setPage('cards')} 
            className="bg-white text-gray-800 rounded-2xl p-5 font-bold shadow-lg hover:shadow-xl border-2 border-green-200 hover:border-green-400 transition-all active:scale-98 touch-target"
          >
            <div className="bg-green-50 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-3">
              <BookOpen className="text-green-600" size={32} />
            </div>
            <div className="text-base font-bold">{lang === 'de' ? 'Karten' : 'Cards'}</div>
            <div className="text-xs text-gray-600 mt-1 font-medium">{lang === 'de' ? 'Karteikarten' : 'Flashcards'}</div>
          </button>
        </div>
      </div>

      {/* Badges - MODERNIZED */}
      {badges.length > 0 && (
        <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-5 shadow-xl border-2 border-amber-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-2.5 rounded-xl shadow-lg">
              <Award className="text-white" size={24} />
            </div>
            <div>
              <h3 className="font-black text-gray-900 text-lg">{lang === 'de' ? 'Erfolge' : 'Achievements'}</h3>
              <p className="text-xs text-gray-600">{badges.length} {lang === 'de' ? 'freigeschaltet' : 'unlocked'}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {badges.map((b: any, i: any) => (
              <span key={i} className="bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg border-2 border-yellow-300">
                {b}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
