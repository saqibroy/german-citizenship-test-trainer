import { 
  Target, Brain, Clock,
  CheckCircle2, AlertCircle, Zap, Flame, Lightbulb, BookMarked
} from 'lucide-react';
import type { Question, QuestionProgress, VocabProgress, VocabularyItem } from './types';
import { calculateTestReadiness, getSRSLevelInfo, daysSinceLastSeen } from './srsAlgorithm';

interface PerformancePageProps {
  lang: 'de' | 'en';
  progress: Record<number, QuestionProgress>;
  questions: Question[];
  quizHistory: any[]; // eslint-disable-line @typescript-eslint/no-unused-vars
  studyStreak: number;
  vocabProgress?: Record<string, VocabProgress>;
  vocabulary?: VocabularyItem[];
}

export function PerformancePage({ 
  lang, 
  progress, 
  questions, 
  studyStreak,
  vocabProgress = {},
  vocabulary = []
}: PerformancePageProps) {
  // Calculate overall statistics
  const totalQuestions = questions.length;
  const answeredQuestions = Object.keys(progress).length;
  const readiness = calculateTestReadiness(progress, totalQuestions);
  
  // Calculate category breakdown
  const categoryStats = questions.reduce((acc, q) => {
    const cat = q.category;
    if (!acc[cat]) {
      acc[cat] = { total: 0, answered: 0, correct: 0, incorrect: 0, avgAccuracy: 0 };
    }
    acc[cat].total++;
    
    const qProgress = progress[q.id];
    if (qProgress) {
      acc[cat].answered++;
      acc[cat].correct += qProgress.correct;
      acc[cat].incorrect += qProgress.incorrect;
      const total = qProgress.correct + qProgress.incorrect;
      const accuracy = total > 0 ? qProgress.correct / total : 0;
      acc[cat].avgAccuracy += accuracy;
    }
    return acc;
  }, {} as Record<string, any>);
  
  // Calculate average accuracy per category
  Object.keys(categoryStats).forEach(cat => {
    if (categoryStats[cat].answered > 0) {
      categoryStats[cat].avgAccuracy = (categoryStats[cat].avgAccuracy / categoryStats[cat].answered) * 100;
    }
  });
  
  // Find weak categories (< 60% accuracy)
  const weakCategories = Object.entries(categoryStats)
    .filter(([_, stats]) => stats.answered > 0 && stats.avgAccuracy < 60)
    .sort((a, b) => a[1].avgAccuracy - b[1].avgAccuracy)
    .slice(0, 5);
  
  // Find strong categories (>= 80% accuracy)
  const strongCategories = Object.entries(categoryStats)
    .filter(([_, stats]) => stats.answered > 0 && stats.avgAccuracy >= 80)
    .sort((a, b) => b[1].avgAccuracy - a[1].avgAccuracy)
    .slice(0, 5);
  
  // Calculate SRS level distribution
  const srsDistribution = {
    new: totalQuestions - answeredQuestions,
    learning: 0,
    young: 0,
    mature: 0,
    mastered: 0
  };
  
  Object.values(progress).forEach(p => {
    srsDistribution[p.srsLevel]++;
  });
  
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
  
  // Calculate due for review count
  const dueCount = Object.values(progress).filter(p => {
    const daysSince = daysSinceLastSeen(p.lastSeen);
    return daysSince >= p.interval;
  }).length;
  
  // Predict pass probability based on readiness score
  const passProbability = Math.min(100, Math.max(0, 
    (readiness.score - 40) * 1.67 // Linear scale from 40% readiness = 0% pass to 100% readiness = 100% pass
  ));
  
  // Calculate days until exam (December 2, 2025)
  const examDate = new Date('2025-12-02');
  const today = new Date();
  const daysUntilExam = Math.ceil((examDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header with Exam Countdown */}
        <div className="text-center mb-8">
          <div className="inline-block bg-red-100 border-2 border-red-300 rounded-full px-6 py-2 mb-4">
            <p className="text-red-800 font-bold">
              🗓️ {lang === 'de' ? 'Prüfung in' : 'Exam in'} <span className="text-3xl">{daysUntilExam}</span> {lang === 'de' ? 'Tagen' : 'Days'}
              <span className="text-sm block text-red-600">{lang === 'de' ? '2. Dezember 2025' : 'December 2, 2025'}</span>
            </p>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            {lang === 'de' ? '📊 Leistungsübersicht' : '📊 Performance Dashboard'}
          </h1>
          <p className="text-gray-600">
            {lang === 'de' 
              ? 'Detaillierte Statistiken zu deinem Lernfortschritt' 
              : 'Detailed statistics on your learning progress'}
          </p>
        </div>

        {/* Test Readiness Score - Hero Card */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-8 text-white shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                {lang === 'de' ? 'Testbereitschaft' : 'Test Readiness'}
              </h2>
              <p className="text-indigo-100">
                {lang === 'de' 
                  ? 'Wie gut bist du auf den Test vorbereitet?' 
                  : 'How well prepared are you for the test?'}
              </p>
            </div>
            <Target className="text-white opacity-80" size={48} />
          </div>
          
          <div className="text-center mb-6">
            <div className="text-7xl font-bold mb-2">{readiness.score}%</div>
            <div className="text-2xl font-semibold">
              {readiness.score >= 80 ? '🎉 ' + (lang === 'de' ? 'Bereit!' : 'Ready!') :
               readiness.score >= 60 ? '👍 ' + (lang === 'de' ? 'Fast geschafft' : 'Almost There') :
               readiness.score >= 40 ? '📚 ' + (lang === 'de' ? 'Weiter üben' : 'Keep Practicing') :
               '🌱 ' + (lang === 'de' ? 'Gerade erst angefangen' : 'Just Getting Started')}
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="bg-white bg-opacity-95 rounded-xl p-4 text-center backdrop-blur-sm border-2 border-indigo-300 shadow-lg">
              <div className="text-3xl font-bold text-indigo-700">{readiness.breakdown.coverage}%</div>
              <div className="text-sm text-indigo-900 font-bold">{lang === 'de' ? 'Abdeckung' : 'Coverage'}</div>
              <div className="text-xs text-gray-700 font-semibold mt-1">
                {answeredQuestions}/{totalQuestions} {lang === 'de' ? 'Fragen' : 'questions'}
              </div>
            </div>
            <div className="bg-white bg-opacity-95 rounded-xl p-4 text-center backdrop-blur-sm border-2 border-purple-300 shadow-lg">
              <div className="text-3xl font-bold text-purple-700">{readiness.breakdown.mastery}%</div>
              <div className="text-sm text-purple-900 font-bold">{lang === 'de' ? 'Meisterung' : 'Mastery'}</div>
              <div className="text-xs text-gray-700 font-semibold mt-1">
                {srsDistribution.mastered} {lang === 'de' ? 'gemeistert' : 'mastered'}
              </div>
            </div>
            <div className="bg-white bg-opacity-95 rounded-xl p-4 text-center backdrop-blur-sm border-2 border-pink-300 shadow-lg">
              <div className="text-3xl font-bold text-pink-700">{readiness.breakdown.averageAccuracy}%</div>
              <div className="text-sm text-pink-900 font-bold">{lang === 'de' ? 'Genauigkeit' : 'Accuracy'}</div>
              <div className="text-xs text-gray-700 font-semibold mt-1">
                {lang === 'de' ? 'Durchschnitt' : 'Average'}
              </div>
            </div>
          </div>
          
          {/* Pass Probability */}
          <div className="bg-white bg-opacity-95 rounded-xl p-4 backdrop-blur-sm border-2 border-green-300 shadow-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-bold text-gray-800">
                {lang === 'de' ? 'Bestehenswahrscheinlichkeit' : 'Pass Probability'}
              </span>
              <span className="text-2xl font-bold text-green-700">{Math.round(passProbability)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 border border-gray-300">
              <div 
                className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500 shadow-md"
                style={{ width: `${passProbability}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Streak */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-orange-200">
            <div className="flex items-center justify-between mb-4">
              <Flame className="text-orange-500" size={32} />
              <span className="text-4xl font-bold text-orange-600">{studyStreak}</span>
            </div>
            <h3 className="font-bold text-gray-800">
              {lang === 'de' ? 'Tage Streak' : 'Day Streak'}
            </h3>
            <p className="text-sm text-gray-600">
              {lang === 'de' ? 'Täglich lernen!' : 'Keep it going!'}
            </p>
          </div>

          {/* Study Time */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-200">
            <div className="flex items-center justify-between mb-4">
              <Clock className="text-blue-500" size={32} />
              <span className="text-4xl font-bold text-blue-600">{estimatedMinutes}</span>
            </div>
            <h3 className="font-bold text-gray-800">
              {lang === 'de' ? 'Minuten' : 'Minutes'}
            </h3>
            <p className="text-sm text-gray-600">
              {lang === 'de' ? 'Gesamte Lernzeit' : 'Total study time'}
            </p>
          </div>

          {/* Due Reviews */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-red-200">
            <div className="flex items-center justify-between mb-4">
              <AlertCircle className="text-red-500" size={32} />
              <span className="text-4xl font-bold text-red-600">{dueCount}</span>
            </div>
            <h3 className="font-bold text-gray-800">
              {lang === 'de' ? 'Fällig' : 'Due'}
            </h3>
            <p className="text-sm text-gray-600">
              {lang === 'de' ? 'Zur Wiederholung' : 'For review'}
            </p>
          </div>

          {/* Average Speed */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-green-200">
            <div className="flex items-center justify-between mb-4">
              <Zap className="text-green-500" size={32} />
              <span className="text-4xl font-bold text-green-600">{Math.round(avgAnswerTime)}s</span>
            </div>
            <h3 className="font-bold text-gray-800">
              {lang === 'de' ? 'Ø Zeit' : 'Avg Time'}
            </h3>
            <p className="text-sm text-gray-600">
              {lang === 'de' ? 'Pro Frage' : 'Per question'}
            </p>
          </div>
        </div>

        {/* SRS Level Distribution */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Brain className="text-indigo-600" />
            {lang === 'de' ? 'Lernfortschritt nach Stufen' : 'Learning Progress by Level'}
          </h2>
          
          <div className="space-y-3">
            {(['new', 'learning', 'young', 'mature', 'mastered'] as const).map(level => {
              const info = getSRSLevelInfo(level, lang);
              const count = srsDistribution[level];
              const percentage = (count / totalQuestions) * 100;
              
              return (
                <div key={level}>
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{info.emoji}</span>
                      <span className="font-semibold text-gray-800">{info.name}</span>
                      <span className="text-sm text-gray-500">({info.description})</span>
                    </div>
                    <span className="text-lg font-bold text-gray-800">
                      {count} <span className="text-sm text-gray-500">({Math.round(percentage)}%)</span>
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-500 bg-${info.color}-500`}
                      style={{ 
                        width: `${percentage}%`,
                        backgroundColor: info.color === 'blue' ? '#3b82f6' :
                                       info.color === 'orange' ? '#f97316' :
                                       info.color === 'yellow' ? '#eab308' :
                                       info.color === 'green' ? '#22c55e' :
                                       '#a855f7'
                      }}
                    ></div>
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
                {weakCategories.map(([cat, stats]) => (
                  <div key={cat} className="bg-white rounded-lg p-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-gray-800 text-sm">{cat}</span>
                      <span className="text-lg font-bold text-red-600">
                        {Math.round(stats.avgAccuracy)}%
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>{stats.answered}/{stats.total} {lang === 'de' ? 'beantwortet' : 'answered'}</span>
                      <span>{stats.correct}/{stats.correct + stats.incorrect} {lang === 'de' ? 'richtig' : 'correct'}</span>
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
                {strongCategories.map(([cat, stats]) => (
                  <div key={cat} className="bg-white rounded-lg p-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-gray-800 text-sm">{cat}</span>
                      <span className="text-lg font-bold text-green-600">
                        {Math.round(stats.avgAccuracy)}%
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>{stats.answered}/{stats.total} {lang === 'de' ? 'beantwortet' : 'answered'}</span>
                      <span>{stats.correct}/{stats.correct + stats.incorrect} {lang === 'de' ? 'richtig' : 'correct'}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-green-700 mt-4 font-semibold">
                ⭐ {lang === 'de' 
                  ? 'Großartige Arbeit in diesen Bereichen!' 
                  : 'Great work in these areas!'}
              </p>
            </div>
          )}
        </div>

        {/* Vocabulary Statistics Section */}
        {vocabulary.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-200">
            <h3 className="text-2xl font-bold text-purple-800 mb-6 flex items-center gap-2">
              <BookMarked className="text-purple-600" />
              {lang === 'de' ? '📚 Wortschatz-Statistiken' : '📚 Vocabulary Statistics'}
            </h3>

            {(() => {
              // Calculate vocabulary statistics
              const totalVocab = vocabulary.length;
              const studiedVocab = Object.keys(vocabProgress).length;
              
              // Calculate SRS distribution for vocabulary
              const vocabSRSDistribution = {
                new: totalVocab - studiedVocab,
                learning: 0,
                young: 0,
                mature: 0,
                mastered: 0
              };
              
              Object.values(vocabProgress).forEach((vp: VocabProgress) => {
                const level = vp.srsLevel || 'new';
                vocabSRSDistribution[level as keyof typeof vocabSRSDistribution]++;
              });

              // Calculate tier mastery
              const tierStats = vocabulary.reduce((acc, vocab) => {
                const tier = vocab.tier || 4;
                if (!acc[tier]) {
                  acc[tier] = { total: 0, studied: 0, mastered: 0 };
                }
                acc[tier].total++;
                
                const vp = vocabProgress[vocab.de];
                if (vp) {
                  acc[tier].studied++;
                  if (vp.srsLevel === 'mastered' || vp.srsLevel === 'mature') {
                    acc[tier].mastered++;
                  }
                }
                return acc;
              }, {} as Record<number, { total: number; studied: number; mastered: number }>);

              // Calculate due vocabulary
              const dueVocab = Object.entries(vocabProgress).filter(([_, vp]) => {
                const daysSince = daysSinceLastSeen(vp.lastSeen);
                return daysSince >= (vp.interval || 0);
              }).length;

              // Calculate weak vocabulary (accuracy < 50%)
              const weakVocab = Object.entries(vocabProgress).filter(([_, vp]) => {
                const total = vp.correct + vp.incorrect;
                const accuracy = total > 0 ? vp.correct / total : 0;
                return total >= 2 && accuracy < 0.5;
              }).length;

              return (
                <>
                  {/* Vocabulary Overview Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 text-center">
                      <div className="text-3xl font-bold text-purple-600">{studiedVocab}</div>
                      <div className="text-sm text-purple-800 font-semibold">
                        {lang === 'de' ? 'Gelernt' : 'Studied'}
                      </div>
                      <div className="text-xs text-purple-600">
                        {lang === 'de' ? `von ${totalVocab}` : `of ${totalVocab}`}
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center">
                      <div className="text-3xl font-bold text-blue-600">
                        {vocabSRSDistribution.mastered + vocabSRSDistribution.mature}
                      </div>
                      <div className="text-sm text-blue-800 font-semibold">
                        {lang === 'de' ? 'Gemeistert' : 'Mastered'}
                      </div>
                      <div className="text-xs text-blue-600">
                        {studiedVocab > 0 ? Math.round(((vocabSRSDistribution.mastered + vocabSRSDistribution.mature) / studiedVocab) * 100) : 0}%
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 text-center">
                      <div className="text-3xl font-bold text-orange-600">{dueVocab}</div>
                      <div className="text-sm text-orange-800 font-semibold">
                        {lang === 'de' ? 'Fällig' : 'Due'}
                      </div>
                      <div className="text-xs text-orange-600">
                        {lang === 'de' ? 'Heute üben' : 'Practice today'}
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4 text-center">
                      <div className="text-3xl font-bold text-red-600">{weakVocab}</div>
                      <div className="text-sm text-red-800 font-semibold">
                        {lang === 'de' ? 'Schwach' : 'Weak'}
                      </div>
                      <div className="text-xs text-red-600">
                        {lang === 'de' ? 'Fokus nötig' : 'Need focus'}
                      </div>
                    </div>
                  </div>

                  {/* SRS Distribution for Vocabulary */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3">
                      {lang === 'de' ? 'SRS-Stufen Verteilung' : 'SRS Level Distribution'}
                    </h4>
                    <div className="grid grid-cols-5 gap-2">
                      {Object.entries(vocabSRSDistribution).map(([level, count]) => {
                        const info = getSRSLevelInfo(level as any);
                        const percentage = studiedVocab > 0 && level !== 'new' 
                          ? Math.round((count / studiedVocab) * 100) 
                          : level === 'new' 
                            ? Math.round((count / totalVocab) * 100)
                            : 0;
                        
                        return (
                          <div key={level} className={`bg-${info.color}-100 rounded-lg p-3 text-center`}>
                            <div className="text-2xl mb-1">{info.emoji}</div>
                            <div className="text-xl font-bold text-gray-800">{count}</div>
                            <div className="text-xs text-gray-600 capitalize">{level}</div>
                            <div className="text-xs text-gray-500">{percentage}%</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Tier Mastery */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">
                      {lang === 'de' ? 'Tier-Fortschritt' : 'Tier Progress'}
                    </h4>
                    <div className="space-y-3">
                      {[1, 2, 3, 4].map(tier => {
                        const stats = tierStats[tier] || { total: 0, studied: 0, mastered: 0 };
                        const studiedPercentage = stats.total > 0 ? Math.round((stats.studied / stats.total) * 100) : 0;
                        const masteredPercentage = stats.studied > 0 ? Math.round((stats.mastered / stats.studied) * 100) : 0;
                        
                        const tierName = tier === 1 ? (lang === 'de' ? 'Essentiell' : 'Essential')
                          : tier === 2 ? (lang === 'de' ? 'Wichtig' : 'Important')
                          : tier === 3 ? (lang === 'de' ? 'Nützlich' : 'Useful')
                          : (lang === 'de' ? 'Ergänzend' : 'Supplementary');
                        
                        const tierColor = tier === 1 ? 'red' : tier === 2 ? 'orange' : tier === 3 ? 'yellow' : 'gray';
                        
                        return (
                          <div key={tier} className="bg-gray-50 rounded-lg p-4">
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-semibold text-gray-800">
                                Tier {tier}: {tierName}
                              </span>
                              <span className="text-sm text-gray-600">
                                {stats.studied}/{stats.total} {lang === 'de' ? 'gelernt' : 'studied'}
                              </span>
                            </div>
                            <div className="space-y-2">
                              <div>
                                <div className="flex justify-between text-xs text-gray-600 mb-1">
                                  <span>{lang === 'de' ? 'Gelernt' : 'Studied'}</span>
                                  <span>{studiedPercentage}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div 
                                    className={`bg-${tierColor}-500 h-2 rounded-full`}
                                    style={{ width: `${studiedPercentage}%` }}
                                  />
                                </div>
                              </div>
                              <div>
                                <div className="flex justify-between text-xs text-gray-600 mb-1">
                                  <span>{lang === 'de' ? 'Gemeistert' : 'Mastered'}</span>
                                  <span>{masteredPercentage}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div 
                                    className={`bg-green-500 h-2 rounded-full`}
                                    style={{ width: `${masteredPercentage}%` }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        )}

        {/* Exam-Focused Recommendations */}
        <div className="bg-gradient-to-r from-red-100 to-orange-100 rounded-2xl p-6 shadow-lg border-2 border-red-300">
          <h3 className="text-xl font-bold text-red-800 mb-2 flex items-center gap-2">
            <Lightbulb className="text-red-600" />
            {lang === 'de' ? '🎯 Prüfungsvorbereitung - ' + daysUntilExam + ' Tage verbleibend!' : '🎯 Exam Prep - ' + daysUntilExam + ' Days Left!'}
          </h3>
          <p className="text-sm text-red-700 mb-4 font-semibold">
            {lang === 'de' 
              ? 'Deine Prüfung ist am 2. Dezember. Hier ist dein Aktionsplan:' 
              : 'Your exam is December 2nd. Here\'s your action plan:'}
          </p>
          <div className="space-y-3">
            {readiness.score < 80 && (
              <div className="bg-white rounded-lg p-4 border-l-4 border-red-500">
                <p className="font-semibold text-gray-800 mb-2">
                  � {lang === 'de' 
                    ? 'PRIORITÄT: Alle Fragen abdecken' 
                    : 'PRIORITY: Cover All Questions'}
                </p>
                <p className="text-sm text-gray-600">
                  {lang === 'de' 
                    ? `Du hast erst ${answeredQuestions} von ${totalQuestions} Fragen (${readiness.breakdown.coverage}%) gesehen. Ziel: 100% vor der Prüfung!`
                    : `You've only seen ${answeredQuestions} of ${totalQuestions} questions (${readiness.breakdown.coverage}%). Goal: 100% before exam!`}
                </p>
                <p className="text-xs text-red-600 mt-2 font-semibold">
                  💡 {lang === 'de' 
                    ? `Täglich ~${Math.ceil((totalQuestions - answeredQuestions) / daysUntilExam)} Fragen = Alle Fragen abgedeckt` 
                    : `Do ~${Math.ceil((totalQuestions - answeredQuestions) / daysUntilExam)} questions/day = All covered`}
                </p>
              </div>
            )}
            
            {dueCount > 0 && (
              <div className="bg-white rounded-lg p-4 border-l-4 border-orange-500">
                <p className="font-semibold text-gray-800 mb-2">
                  🔄 {lang === 'de' 
                    ? 'Heute fällig: ' + dueCount + ' Fragen' 
                    : 'Due Today: ' + dueCount + ' Questions'}
                </p>
                <p className="text-sm text-gray-600">
                  {lang === 'de' 
                    ? `Wiederholungen sind entscheidend! Diese ${dueCount} Fragen brauchen eine Auffrischung.`
                    : `Reviews are crucial! These ${dueCount} questions need refreshing.`}
                </p>
              </div>
            )}
            
            {weakCategories.length > 0 && (
              <div className="bg-white rounded-lg p-4 border-l-4 border-yellow-500">
                <p className="font-semibold text-gray-800 mb-2">
                  🎯 {lang === 'de' 
                    ? 'Schwache Kategorien üben' 
                    : 'Practice Weak Categories'}
                </p>
                <p className="text-sm text-gray-600">
                  {lang === 'de' 
                    ? `Fokussiere dich auf: ${weakCategories.slice(0, 3).map(([cat]) => cat).join(', ')}`
                    : `Focus on: ${weakCategories.slice(0, 3).map(([cat]) => cat).join(', ')}`}
                </p>
              </div>
            )}
            
            {studyStreak < 3 && (
              <div className="bg-white rounded-lg p-4 border-l-4 border-purple-500">
                <p className="font-semibold text-gray-800 mb-2">
                  🔥 {lang === 'de' 
                    ? 'Tägliches Lernen aufbauen' 
                    : 'Build Daily Habit'}
                </p>
                <p className="text-sm text-gray-600">
                  {lang === 'de' 
                    ? `Mit ${daysUntilExam} Tagen bis zur Prüfung ist tägliches Üben entscheidend!`
                    : `With ${daysUntilExam} days until exam, daily practice is crucial!`}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
