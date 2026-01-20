import { 
  BarChart3, Award, BookOpen, Flame, Clock, Zap,
  CheckCircle2, AlertCircle, Brain, Target
} from 'lucide-react';
import type { Question, QuestionProgress, QuizResult } from './types';
import { calculateTestReadiness, daysSinceLastSeen } from './srsAlgorithm';
import { CATEGORY_ICONS } from './data.js';
import { EmptyState } from './components/SkeletonLoader';

interface StatsPageProps {
  lang: 'de' | 'en';
  progress: Record<number, QuestionProgress>;
  questions: Question[];
  badges: string[];
  quizHistory: QuizResult[];
  studyStreak: number;
}

export function StatsPage({ 
  lang, 
  progress, 
  questions, 
  badges,
  quizHistory,
  studyStreak
}: StatsPageProps) {
  // Calculate overall statistics
  const totalQuestions = questions.length;
  const answeredQuestions = Object.keys(progress).length;
  const readiness = calculateTestReadiness(progress, totalQuestions);
  
  // Calculate strength groups
  const strengthGroups = {
    strong: questions.filter((q: Question) => progress[q.id]?.strength === 'strong'),
    medium: questions.filter((q: Question) => progress[q.id]?.strength === 'medium'),
    weak: questions.filter((q: Question) => progress[q.id]?.strength === 'weak'),
    unanswered: questions.filter((q: Question) => !progress[q.id])
  };

  // Calculate SRS distribution
  const srsDistribution = {
    new: totalQuestions - answeredQuestions,
    learning: 0,
    young: 0,
    mature: 0,
    mastered: 0
  };
  
  Object.values(progress).forEach((p: QuestionProgress) => {
    srsDistribution[p.srsLevel]++;
  });
  
  // Calculate due for review count
  const dueCount = Object.values(progress).filter((p: QuestionProgress) => {
    const daysSince = daysSinceLastSeen(p.lastSeen);
    return daysSince >= p.interval;
  }).length;

  // Calculate total study time (estimate from answer counts)
  const totalAttempts = Object.values(progress).reduce(
    (sum, p) => sum + p.correct + p.incorrect, 
    0
  );
  const estimatedMinutes = Math.round(totalAttempts * 0.5); // ~30 seconds per question
  
  // Calculate average answer time
  const avgAnswerTime = Object.values(progress).reduce(
    (sum, p) => sum + (p.averageTime || 0),
    0
  ) / (answeredQuestions || 1);

  // Quiz history average
  const avgScore = quizHistory.length > 0 
    ? Math.round(quizHistory.reduce((sum, q) => sum + (q.percentage || ((q.score / q.total) * 100)), 0) / quizHistory.length)
    : 0;

  // Category stats
  const categories = [...new Set(questions.map((q: Question) => q.category))];
  
  const getStats = (category: string) => {
    const catQs = questions.filter((q: Question) => q.category === category);
    const correct = catQs.reduce((sum, q) => sum + (progress[q.id]?.correct || 0), 0);
    const attempts = catQs.reduce((sum, q) => sum + ((progress[q.id]?.correct || 0) + (progress[q.id]?.incorrect || 0)), 0);
    return { correct, attempts, total: catQs.length };
  };

  // Find weak and strong categories
  const categoryBreakdown = categories.map(cat => {
    const stats = getStats(cat);
    const accuracy = stats.attempts > 0 ? (stats.correct / stats.attempts) * 100 : 0;
    return { category: cat, ...stats, accuracy };
  });

  const weakCategories = categoryBreakdown
    .filter(c => c.attempts > 0 && c.accuracy < 60)
    .sort((a, b) => a.accuracy - b.accuracy)
    .slice(0, 5);
    
  const strongCategories = categoryBreakdown
    .filter(c => c.attempts > 0 && c.accuracy >= 80)
    .sort((a, b) => b.accuracy - a.accuracy)
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-2xl p-6 shadow-xl">
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 size={28} />
            <h2 className="text-2xl font-bold">{lang === 'de' ? 'Statistiken' : 'Statistics'}</h2>
          </div>
          <p className="opacity-90 text-sm">{lang === 'de' ? 'Ihr Lernfortschritt im Detail' : 'Your learning progress in detail'}</p>
        </div>

        {/* Test Readiness Card */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-8 text-white shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                {lang === 'de' ? 'Testbereitschaft' : 'Test Readiness'}
              </h2>
              <p className="text-indigo-100">
                {lang === 'de' 
                  ? 'Wie gut sind Sie vorbereitet?' 
                  : 'How well prepared are you?'}
              </p>
            </div>
            <Target className="text-white opacity-80" size={48} />
          </div>
          
          <div className="text-center mb-6">
            <div className="text-6xl md:text-7xl font-bold mb-2">{readiness.score}%</div>
            <div className="text-xl md:text-2xl font-semibold mb-3">
              {readiness.score >= 80 ? (lang === 'de' ? 'Bereit!' : 'Ready!') :
               readiness.score >= 60 ? (lang === 'de' ? 'Fast geschafft' : 'Almost There') :
               readiness.score >= 40 ? (lang === 'de' ? 'Weiter üben' : 'Keep Practicing') :
               (lang === 'de' ? 'Guter Start' : 'Good Start')}
            </div>
            {/* Overall Progress Bar */}
            <div className="w-full max-w-md mx-auto bg-white bg-opacity-30 rounded-full h-3 mt-2">
              <div 
                className="bg-white h-3 rounded-full transition-all duration-700 shadow-lg"
                style={{ width: `${readiness.score}%` }}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-3 md:gap-4">
            <div className="bg-white bg-opacity-95 rounded-xl p-3 md:p-4 text-center backdrop-blur-sm border-2 border-indigo-300 shadow-lg">
              <div className="text-2xl md:text-3xl font-bold text-indigo-700">{readiness.breakdown.coverage}%</div>
              <div className="text-xs md:text-sm text-indigo-900 font-bold leading-tight">{lang === 'de' ? 'Abdeckung' : 'Coverage'}</div>
              <div className="text-[10px] md:text-xs text-gray-700 font-semibold mt-1 truncate">
                {answeredQuestions}/{totalQuestions}
              </div>
              {/* Progress bar */}
              <div className="w-full bg-indigo-200 rounded-full h-1.5 mt-2 md:mt-3">
                <div 
                  className="bg-indigo-600 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${readiness.breakdown.coverage}%` }}
                />
              </div>
            </div>
            <div className="bg-white bg-opacity-95 rounded-xl p-3 md:p-4 text-center backdrop-blur-sm border-2 border-purple-300 shadow-lg">
              <div className="text-2xl md:text-3xl font-bold text-purple-700">{readiness.breakdown.mastery}%</div>
              <div className="text-xs md:text-sm text-purple-900 font-bold leading-tight">{lang === 'de' ? 'Meisterung' : 'Mastery'}</div>
              <div className="text-[10px] md:text-xs text-gray-700 font-semibold mt-1 truncate">
                {srsDistribution.mastered} {lang === 'de' ? 'gemeistert' : 'mastered'}
              </div>
              {/* Progress bar */}
              <div className="w-full bg-purple-200 rounded-full h-1.5 mt-2 md:mt-3">
                <div 
                  className="bg-purple-600 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${readiness.breakdown.mastery}%` }}
                />
              </div>
            </div>
            <div className="bg-white bg-opacity-95 rounded-xl p-3 md:p-4 text-center backdrop-blur-sm border-2 border-pink-300 shadow-lg">
              <div className="text-2xl md:text-3xl font-bold text-pink-700">{readiness.breakdown.averageAccuracy}%</div>
              <div className="text-xs md:text-sm text-pink-900 font-bold leading-tight">{lang === 'de' ? 'Genauigkeit' : 'Accuracy'}</div>
              <div className="text-[10px] md:text-xs text-gray-700 font-semibold mt-1 truncate">
                {lang === 'de' ? 'Durchschnitt' : 'Average'}
              </div>
              {/* Progress bar */}
              <div className="w-full bg-pink-200 rounded-full h-1.5 mt-2 md:mt-3">
                <div 
                  className="bg-pink-600 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${readiness.breakdown.averageAccuracy}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid - MODERNIZED MOBILE-FIRST */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {/* Streak */}
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-4 md:p-6 shadow-xl border-2 border-orange-200 active:scale-98 transition-transform">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
              <Flame className="text-white" size={28} />
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-orange-600 mb-1">{studyStreak}</div>
              <h3 className="font-bold text-gray-900 text-sm md:text-base">
                {lang === 'de' ? 'Tage Streak' : 'Day Streak'}
              </h3>
              <p className="text-xs text-gray-600 mt-1">
                {lang === 'de' ? 'Bleiben Sie dran!' : 'Keep it up!'}
              </p>
            </div>
          </div>

          {/* Study Time */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 md:p-6 shadow-xl border-2 border-blue-200 active:scale-98 transition-transform">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
              <Clock className="text-white" size={28} />
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-blue-600 mb-1">{estimatedMinutes}</div>
              <h3 className="font-bold text-gray-900 text-sm md:text-base">
                {lang === 'de' ? 'Minuten' : 'Minutes'}
              </h3>
              <p className="text-xs text-gray-600 mt-1">
                {lang === 'de' ? 'Lernzeit' : 'Study time'}
              </p>
            </div>
          </div>

          {/* Due Reviews */}
          <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl p-4 md:p-6 shadow-xl border-2 border-red-200 active:scale-98 transition-transform">
            <div className="bg-gradient-to-r from-red-500 to-rose-500 w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
              <AlertCircle className="text-white" size={28} />
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-red-600 mb-1">{dueCount}</div>
              <h3 className="font-bold text-gray-900 text-sm md:text-base">
                {lang === 'de' ? 'Fällig' : 'Due'}
              </h3>
              <p className="text-xs text-gray-600 mt-1">
                {lang === 'de' ? 'Wiederholung' : 'For review'}
              </p>
            </div>
          </div>

          {/* Average Speed */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 md:p-6 shadow-xl border-2 border-green-200 active:scale-98 transition-transform">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
              <Zap className="text-white" size={28} />
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-green-600 mb-1">{Math.round(avgAnswerTime)}s</div>
              <h3 className="font-bold text-gray-900 text-sm md:text-base">
                {lang === 'de' ? 'Ø Zeit' : 'Avg Time'}
              </h3>
              <p className="text-xs text-gray-600 mt-1">
                {lang === 'de' ? 'Pro Frage' : 'Per question'}
              </p>
            </div>
          </div>
        </div>

        {/* Strength Distribution - MODERNIZED */}
        <div className="bg-white rounded-2xl p-5 shadow-xl">
          <h3 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
            <Brain size={22} className="text-purple-600" />
            {lang === 'de' ? 'Fragenstärke' : 'Question Strength'}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 shadow-md border-2 border-green-200 active:scale-95 transition-transform touch-target">
              <div className="text-3xl md:text-4xl font-black text-green-600 mb-2">{strengthGroups.strong.length}</div>
              <div className="text-xs md:text-sm text-gray-800 font-bold">{lang === 'de' ? '💪 Stark' : '💪 Strong'}</div>
              <div className="text-[10px] text-gray-600 mt-1">{lang === 'de' ? 'Sehr gut' : 'Very good'}</div>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-4 shadow-md border-2 border-yellow-200 active:scale-95 transition-transform touch-target">
              <div className="text-3xl md:text-4xl font-black text-yellow-600 mb-2">{strengthGroups.medium.length}</div>
              <div className="text-xs md:text-sm text-gray-800 font-bold">{lang === 'de' ? '📚 Mittel' : '📚 Medium'}</div>
              <div className="text-[10px] text-gray-600 mt-1">{lang === 'de' ? 'Üben' : 'Practice'}</div>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-xl p-4 shadow-md border-2 border-red-200 active:scale-95 transition-transform touch-target">
              <div className="text-3xl md:text-4xl font-black text-red-600 mb-2">{strengthGroups.weak.length}</div>
              <div className="text-xs md:text-sm text-gray-800 font-bold">{lang === 'de' ? '🔄 Schwach' : '🔄 Weak'}</div>
              <div className="text-[10px] text-gray-600 mt-1">{lang === 'de' ? 'Fokus' : 'Focus'}</div>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl p-4 shadow-md border-2 border-gray-200 active:scale-95 transition-transform touch-target">
              <div className="text-3xl md:text-4xl font-black text-gray-600 mb-2">{strengthGroups.unanswered.length}</div>
              <div className="text-xs md:text-sm text-gray-800 font-bold">{lang === 'de' ? '❓ Neu' : '❓ New'}</div>
              <div className="text-[10px] text-gray-600 mt-1">{lang === 'de' ? 'Nicht beantwortet' : 'Not answered'}</div>
            </div>
          </div>
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
              {quizHistory.slice(0, 5).map((quiz, idx) => {
                const percentage = quiz.percentage || ((quiz.score / quiz.total) * 100);
                return (
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
                        percentage >= 75 ? 'text-green-600' : 
                        percentage >= 52 ? 'text-yellow-600' : 'text-red-600'
                      }`}>{quiz.score}/{quiz.total}</span>
                      <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
                        percentage >= 75 ? 'bg-green-100 text-green-800' : 
                        percentage >= 52 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                      }`}>{Math.round(percentage)}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* SRS Level Distribution */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Brain className="text-indigo-600" />
            {lang === 'de' ? 'SRS Stufen' : 'SRS Levels'}
          </h2>
          
          <div className="space-y-3">
            {(['new', 'learning', 'young', 'mature', 'mastered'] as const).map(level => {
              const count = srsDistribution[level];
              const percentage = (count / totalQuestions) * 100;
              
              const levelInfo = {
                new: { emoji: '🆕', name: lang === 'de' ? 'Neu' : 'New', color: '#6366f1' },
                learning: { emoji: '📖', name: lang === 'de' ? 'Lerne' : 'Learning', color: '#f97316' },
                young: { emoji: '🌱', name: lang === 'de' ? 'Jung' : 'Young', color: '#eab308' },
                mature: { emoji: '🌳', name: lang === 'de' ? 'Reif' : 'Mature', color: '#22c55e' },
                mastered: { emoji: '⭐', name: lang === 'de' ? 'Gemeistert' : 'Mastered', color: '#a855f7' }
              }[level];
              
              return (
                <div key={level}>
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{levelInfo.emoji}</span>
                      <span className="font-semibold text-gray-800">{levelInfo.name}</span>
                    </div>
                    <span className="text-lg font-bold text-gray-800">
                      {count} <span className="text-sm text-gray-500">({Math.round(percentage)}%)</span>
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="h-3 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${percentage}%`,
                        backgroundColor: levelInfo.color
                      }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Category Breakdown */}
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

        {/* Weak & Strong Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Weak Categories */}
          {weakCategories.length > 0 && (
            <div className="bg-red-50 rounded-2xl p-6 shadow-lg border-2 border-red-200">
              <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center gap-2">
                <AlertCircle className="text-red-600" />
                {lang === 'de' ? 'Schwache Bereiche' : 'Weak Areas'}
              </h3>
              <div className="space-y-3">
                {weakCategories.map(({ category, correct, attempts, accuracy }) => (
                  <div key={category} className="bg-white rounded-lg p-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-gray-800 text-sm">{category}</span>
                      <span className="text-lg font-bold text-red-600">
                        {Math.round(accuracy)}%
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>{correct}/{attempts} {lang === 'de' ? 'richtig' : 'correct'}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-red-700 mt-4 font-semibold">
                💡 {lang === 'de' 
                  ? 'Konzentriere dich auf diese Bereiche!' 
                  : 'Focus on these areas!'}
              </p>
            </div>
          )}

          {/* Strong Categories */}
          {strongCategories.length > 0 && (
            <div className="bg-green-50 rounded-2xl p-6 shadow-lg border-2 border-green-200">
              <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
                <CheckCircle2 className="text-green-600" />
                {lang === 'de' ? 'Starke Bereiche' : 'Strong Areas'}
              </h3>
              <div className="space-y-3">
                {strongCategories.map(({ category, correct, attempts, accuracy }) => (
                  <div key={category} className="bg-white rounded-lg p-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-gray-800 text-sm">{category}</span>
                      <span className="text-lg font-bold text-green-600">
                        {Math.round(accuracy)}%
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>{correct}/{attempts} {lang === 'de' ? 'richtig' : 'correct'}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-green-700 mt-4 font-semibold">
                ⭐ {lang === 'de' 
                  ? 'Großartige Arbeit!' 
                  : 'Great work!'}
              </p>
            </div>
          )}
        </div>

        {/* Badges */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <Award className="text-yellow-500" size={24} />
            <h3 className="text-lg font-bold text-gray-800">{lang === 'de' ? 'Abzeichen' : 'Badges'} {badges.length > 0 && `(${badges.length})`}</h3>
          </div>
          {badges.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {badges.map((b, i) => (
                <div key={i} className="bg-gradient-to-br from-yellow-400 to-orange-400 text-white px-4 py-2 rounded-xl font-bold shadow-md flex items-center gap-2">
                  <span className="text-2xl">🏆</span>
                  <span>{b}</span>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState type="badges" lang={lang} />
          )}
        </div>
      </div>
    </div>
  );
}
