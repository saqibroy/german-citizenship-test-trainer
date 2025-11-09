import { 
  Award, ChevronRight, AlertCircle, Brain, Target, BookMarked, BookOpen, Flame
} from 'lucide-react';
import { QUESTIONS } from '../data.js';
import { daysSinceLastSeen } from '../srsAlgorithm';
import type { HomePageProps } from '../types';

export function HomePage({ lang, badges, progress, setPage, studyStreak, userName }: HomePageProps) {
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

  // Get first name from displayName
  const firstName = userName ? userName.split(' ')[0] : '';
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 space-y-4">
      {/* Welcome Message */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-3xl p-8 shadow-2xl">
        <h1 className="text-3xl font-bold mb-2">
          {firstName 
            ? (lang === 'de' ? `👋 Willkommen zurück, ${firstName}!` : `👋 Welcome back, ${firstName}!`)
            : (lang === 'de' ? '👋 Willkommen zurück!' : '👋 Welcome back!')}
        </h1>
        <p className="text-lg opacity-90">
          {answered === 0 
            ? (lang === 'de' ? 'Beginne deine Reise zur deutschen Staatsbürgerschaft!' : 'Start your journey to German citizenship!')
            : (lang === 'de' ? `Weiter so! Du hast ${answered} von ${totalQuestions} Fragen bearbeitet.` : `Keep going! You've answered ${answered} of ${totalQuestions} questions.`)}
        </p>
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

      {/* Simple Progress Bar */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-bold text-gray-800">{lang === 'de' ? 'Gesamtfortschritt' : 'Overall Progress'}</h3>
          <span className="text-2xl font-bold text-indigo-600">{progressPercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden mb-3">
          <div 
            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-4 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <div className="text-2xl font-bold text-indigo-600">{answered}</div>
            <div className="text-xs text-gray-600">{lang === 'de' ? 'Beantwortet' : 'Answered'}</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">{masteredCount}</div>
            <div className="text-xs text-gray-600">{lang === 'de' ? 'Gemeistert' : 'Mastered'}</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-600">{dueCount}</div>
            <div className="text-xs text-gray-600">{lang === 'de' ? 'Fällig' : 'Due'}</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-3">
        {dueCount > 0 && (
          <button onClick={() => setPage('training')} className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl p-4 font-bold shadow-lg flex items-center justify-between hover:shadow-xl transition-all">
            <div className="flex items-center gap-3">
              <AlertCircle size={24} />
              <div className="text-left">
                <div className="font-black">{lang === 'de' ? '🔄 Fällige Fragen' : '🔄 Review Due'}</div>
                <div className="text-xs opacity-90">{dueCount} {lang === 'de' ? 'warten' : 'waiting'}</div>
              </div>
            </div>
            <ChevronRight />
          </button>
        )}
        
        <button onClick={() => setPage('training')} className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl p-4 font-bold shadow-lg flex items-center justify-between hover:shadow-xl transition-all">
          <div className="flex items-center gap-3">
            <Brain size={24} />
            <div className="text-left">
              <div className="font-black">{lang === 'de' ? '🧠 Training' : '🧠 Training'}</div>
              <div className="text-xs opacity-90">{lang === 'de' ? 'SRS Lernen' : 'SRS Learning'}</div>
            </div>
          </div>
          <ChevronRight />
        </button>

        <button onClick={() => setPage('quiz')} className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl p-4 font-bold shadow-lg flex items-center justify-between hover:shadow-xl transition-all">
          <div className="flex items-center gap-3">
            <Target size={24} />
            <div className="text-left">
              <div className="font-black">{lang === 'de' ? '🎯 Quiz' : '🎯 Quiz'}</div>
              <div className="text-xs opacity-90">33 {lang === 'de' ? 'Fragen' : 'questions'}</div>
            </div>
          </div>
          <ChevronRight />
        </button>

        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => setPage('vocab')} className="bg-white text-gray-800 rounded-xl p-4 font-bold shadow-md border-2 border-blue-200 hover:border-blue-400 transition-all">
            <BookMarked className="mx-auto mb-2 text-blue-600" size={28} />
            <div className="text-sm">{lang === 'de' ? 'Vokabeln' : 'Vocabulary'}</div>
          </button>
          <button onClick={() => setPage('cards')} className="bg-white text-gray-800 rounded-xl p-4 font-bold shadow-md border-2 border-green-200 hover:border-green-400 transition-all">
            <BookOpen className="mx-auto mb-2 text-green-600" size={28} />
            <div className="text-sm">{lang === 'de' ? 'Karten' : 'Cards'}</div>
          </button>
        </div>
      </div>

      {/* Badges */}
      {badges.length > 0 && (
        <div className="bg-white rounded-xl p-4 shadow-md border-2 border-yellow-200">
          <div className="flex items-center gap-2 mb-3">
            <Award className="text-yellow-500" size={22} />
            <h3 className="font-bold text-gray-800">{lang === 'de' ? '🏆 Abzeichen' : '🏆 Badges'}</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {badges.map((b: any, i: any) => (
              <span key={i} className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md">
                {b}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
