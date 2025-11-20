import { useState } from 'react';
import { 
  Award, ChevronRight, AlertCircle, Brain, Target, BookMarked, BookOpen, Flame, LogIn, User, Clock, Zap
} from 'lucide-react';
import { QUESTIONS } from '../data.js';
import { daysSinceLastSeen, calculateTestReadiness } from '../srsAlgorithm';
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
  
  // Calculate test readiness
  const readiness = calculateTestReadiness(progress, totalQuestions);
  
  // Calculate strength groups
  const strongCount = Object.values(progress).filter((p: any) => p.strength === 'strong').length;
  const weakCount = Object.values(progress).filter((p: any) => p.strength === 'weak').length;
  const masteredCount = Object.values(progress).filter((p: any) => p.srsLevel === 'mastered').length;
  
  // Calculate study time estimate (0.5 min per attempt)
  const totalAttempts = Object.values(progress).reduce(
    (sum, p: any) => sum + p.correct + p.incorrect, 
    0
  );
  const studyMinutes = Math.round(totalAttempts * 0.5);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 space-y-4">
      {/* Auth & Profile Modals */}
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
      {showProfile && <UserProfile onClose={() => setShowProfile(false)} />}
      
      {/* Welcome Message */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <img src="/logo.svg" alt="Einbürger Coach" className="w-16 h-16" />
              <div>
                <h1 className="text-3xl font-bold">
                  {user 
                    ? `👋 ${lang === 'de' ? 'Hallo' : 'Hello'}, ${user.displayName || user.email?.split('@')[0] || 'User'}!`
                    : (lang === 'de' ? '👋 Willkommen!' : '👋 Welcome!')
                  }
                </h1>
              </div>
            </div>
            <p className="text-lg opacity-90">
              {answered === 0 
                ? (lang === 'de' ? 'Dein persönlicher Coach für den Einbürgerungstest' : 'Your personal coach for the citizenship test')
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

      {/* Test Readiness - MAIN STATS CARD */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-6 text-white shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold mb-1">
              {lang === 'de' ? 'Testbereitschaft' : 'Test Readiness'}
            </h2>
            <p className="text-sm text-indigo-100">
              {lang === 'de' ? 'Wie gut bist du vorbereitet?' : 'How prepared are you?'}
            </p>
          </div>
          <Target className="text-white opacity-80" size={40} />
        </div>
        
        <div className="text-center mb-5">
          <div className="text-6xl font-bold mb-2">{readiness.score}%</div>
          <div className="text-lg font-semibold mb-2">
            {readiness.score >= 80 ? '🎉 ' + (lang === 'de' ? 'Bereit!' : 'Ready!') :
             readiness.score >= 60 ? '👍 ' + (lang === 'de' ? 'Fast geschafft' : 'Almost There') :
             readiness.score >= 40 ? '📚 ' + (lang === 'de' ? 'Weiter üben' : 'Keep Practicing') :
             '🌱 ' + (lang === 'de' ? 'Guter Start' : 'Good Start')}
          </div>
          <div className="w-full bg-white/20 rounded-full h-3 shadow-inner">
            <div 
              className="bg-gradient-to-r from-yellow-300 via-green-400 to-green-500 h-3 rounded-full transition-all duration-700 shadow-lg"
              style={{ width: `${readiness.score}%` }}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-white bg-opacity-95 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-indigo-700">{readiness.breakdown.coverage}%</div>
            <div className="text-xs text-indigo-900 font-bold">{lang === 'de' ? 'Abdeckung' : 'Coverage'}</div>
            <div className="text-xs text-gray-600 mt-1">{answered}/{totalQuestions}</div>
          </div>
          <div className="bg-white bg-opacity-95 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-purple-700">{readiness.breakdown.mastery}%</div>
            <div className="text-xs text-purple-900 font-bold">{lang === 'de' ? 'Meisterung' : 'Mastery'}</div>
            <div className="text-xs text-gray-600 mt-1">{masteredCount} {lang === 'de' ? 'gemeistert' : 'mastered'}</div>
          </div>
          <div className="bg-white bg-opacity-95 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-pink-700">{readiness.breakdown.averageAccuracy}%</div>
            <div className="text-xs text-pink-900 font-bold">{lang === 'de' ? 'Genauigkeit' : 'Accuracy'}</div>
            <div className="text-xs text-gray-600 mt-1">{lang === 'de' ? 'Durchschnitt' : 'Average'}</div>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 shadow-lg border-2 border-green-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-lg">
              <Brain className="text-white" size={20} />
            </div>
            <div className="text-xs font-bold text-gray-700">{lang === 'de' ? 'Stark' : 'Strong'}</div>
          </div>
          <div className="text-3xl font-black text-green-600">{strongCount}</div>
          <div className="text-xs text-gray-600 mt-1">{lang === 'de' ? 'Fragen' : 'questions'}</div>
        </div>
        
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-4 shadow-lg border-2 border-yellow-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-2 rounded-lg">
              <AlertCircle className="text-white" size={20} />
            </div>
            <div className="text-xs font-bold text-gray-700">{lang === 'de' ? 'Schwach' : 'Weak'}</div>
          </div>
          <div className="text-3xl font-black text-orange-600">{weakCount}</div>
          <div className="text-xs text-gray-600 mt-1">{lang === 'de' ? 'üben!' : 'practice!'}</div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 shadow-lg border-2 border-blue-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-2 rounded-lg">
              <Clock className="text-white" size={20} />
            </div>
            <div className="text-xs font-bold text-gray-700">{lang === 'de' ? 'Lernzeit' : 'Study Time'}</div>
          </div>
          <div className="text-3xl font-black text-blue-600">{studyMinutes}</div>
          <div className="text-xs text-gray-600 mt-1">{lang === 'de' ? 'Minuten' : 'minutes'}</div>
        </div>
        
        <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl p-4 shadow-lg border-2 border-red-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-gradient-to-r from-red-500 to-rose-500 p-2 rounded-lg">
              <Zap className="text-white" size={20} />
            </div>
            <div className="text-xs font-bold text-gray-700">{lang === 'de' ? 'Fällig' : 'Due'}</div>
          </div>
          <div className="text-3xl font-black text-red-600">{dueCount}</div>
          <div className="text-xs text-gray-600 mt-1">{lang === 'de' ? 'jetzt' : 'now'}</div>
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
