import { Brain, TrendingUp, Target, Lightbulb, Sparkles, Award } from 'lucide-react';
import { useEffect } from 'react';
import confetti from 'canvas-confetti';

interface TrainingCompletionProps {
  lang: string;
  score: number;
  total: number;
  accuracy: number;
  sessionStats: { correct: number; incorrect: number; total: number };
  categoryBreakdown: Record<string, { correct: number; total: number }>;
  weakCategories: string[];
  onNewSession: () => void;
}

const MOTIVATIONAL_MESSAGES = {
  de: {
    excellent: [
      "Hervorragend! Sie beherrschen das Material!",
      "Fantastisch! Sie sind bereit für die Prüfung!",
      "Ausgezeichnet! Ihre harte Arbeit zahlt sich aus!",
      "Perfekt! Weiter so!"
    ],
    good: [
      "Gut gemacht! Sie machen tolle Fortschritte!",
      "Sehr gut! Bleiben Sie dran!",
      "Toll! Sie sind auf dem richtigen Weg!",
      "Super! Ihre Kenntnisse verbessern sich stetig!"
    ],
    needsWork: [
      "Nicht schlecht! Üben Sie weiter für bessere Ergebnisse!",
      "Gut begonnen! Mit mehr Übung werden Sie besser!",
      "Bleiben Sie dabei! Wiederholung ist der Schlüssel zum Erfolg!",
      "Guter Versuch! Konzentrieren Sie sich auf Ihre schwachen Bereiche!"
    ]
  },
  en: {
    excellent: [
      "Excellent! You're mastering the material!",
      "Fantastic! You're ready for the exam!",
      "Outstanding! Your hard work is paying off!",
      "Perfect! Keep up the great work!"
    ],
    good: [
      "Well done! You're making great progress!",
      "Very good! Keep it up!",
      "Great! You're on the right track!",
      "Awesome! Your knowledge is improving steadily!"
    ],
    needsWork: [
      "Not bad! Keep practicing for better results!",
      "Good start! With more practice you'll improve!",
      "Stay consistent! Repetition is key to success!",
      "Nice try! Focus on your weak areas!"
    ]
  }
};

export function TrainingCompletion({
  lang,
  score,
  total,
  accuracy,
  sessionStats,
  categoryBreakdown,
  weakCategories,
  onNewSession
}: TrainingCompletionProps) {
  
  const getMessage = () => {
    const messages = MOTIVATIONAL_MESSAGES[lang === 'de' ? 'de' : 'en'];
    const category = accuracy >= 80 ? 'excellent' : accuracy >= 60 ? 'good' : 'needsWork';
    const options = messages[category];
    return options[Math.floor(Math.random() * options.length)];
  };

  const getRecommendation = () => {
    if (lang === 'de') {
      if (accuracy >= 85) {
        return "Sie sind in großartiger Verfassung! Machen Sie morgen eine kurze Wiederholung, um Ihr Wissen zu festigen.";
      } else if (accuracy >= 70) {
        return "Konzentrieren Sie sich auf Ihre schwachen Kategorien. Überprüfen Sie die falschen Antworten noch einmal.";
      } else if (weakCategories.length > 0) {
        return `Fokus-Bereiche: ${weakCategories.join(', ')}. Üben Sie diese Kategorien gezielt.`;
      } else {
        return "Wiederholen Sie dieses Training morgen. Die Spaced Repetition wird Ihnen helfen!";
      }
    } else {
      if (accuracy >= 85) {
        return "You're in great shape! Do a quick review tomorrow to solidify your knowledge.";
      } else if (accuracy >= 70) {
        return "Focus on your weak categories. Review the incorrect answers again.";
      } else if (weakCategories.length > 0) {
        return `Focus areas: ${weakCategories.join(', ')}. Practice these categories specifically.`;
      } else {
        return "Repeat this training tomorrow. Spaced repetition will help you!";
      }
    }
  };

  // Fire confetti on mount for great results
  useEffect(() => {
    if (accuracy >= 80) {
      const isPerfect = accuracy >= 95;
      confetti({
        particleCount: isPerfect ? 100 : 60,
        spread: isPerfect ? 120 : 80,
        startVelocity: isPerfect ? 40 : 30,
        origin: { x: 0.5, y: 0.3 },
        colors: ['#a855f7', '#ec4899', '#22c55e', '#fbbf24', '#60a5fa', '#c084fc'],
        ticks: 180,
        gravity: 0.7,
        disableForReducedMotion: true,
      });
      if (isPerfect) {
        setTimeout(() => {
          confetti({
            particleCount: 40,
            angle: 60,
            spread: 55,
            startVelocity: 35,
            origin: { x: 0, y: 0.5 },
            colors: ['#a855f7', '#ec4899', '#22c55e', '#fbbf24'],
            disableForReducedMotion: true,
          });
          confetti({
            particleCount: 40,
            angle: 120,
            spread: 55,
            startVelocity: 35,
            origin: { x: 1, y: 0.5 },
            colors: ['#a855f7', '#ec4899', '#22c55e', '#fbbf24'],
            disableForReducedMotion: true,
          });
        }, 400);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 shadow-2xl text-center max-w-3xl w-full relative overflow-hidden">
        {/* Emoji and Title */}
        <div className="text-8xl mb-6 animate-bounce">
          {accuracy >= 80 ? '🎉' : accuracy >= 60 ? '👍' : '📚'}
        </div>
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          {lang === 'de' ? 'Training abgeschlossen!' : 'Training Completed!'}
        </h2>
        
        {/* Score */}
        <div className={`text-7xl font-bold mb-4 ${
          accuracy >= 80 ? 'text-green-600' : 
          accuracy >= 60 ? 'text-yellow-600' : 'text-orange-600'
        }`}>
          {score}/{total}
        </div>

        {/* Accuracy Bar */}
        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
            <div 
              className={`h-4 rounded-full transition-all duration-1000 ${
                accuracy >= 80 ? 'bg-gradient-to-r from-green-400 to-green-600' : 
                accuracy >= 60 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' : 
                'bg-gradient-to-r from-orange-400 to-orange-600'
              }`}
              style={{ width: `${accuracy}%` }}
            ></div>
          </div>
          <p className="text-2xl font-bold text-gray-700">
            {lang === 'de' ? 'Genauigkeit' : 'Accuracy'}: {accuracy}%
          </p>
        </div>

        {/* Motivational Message */}
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-4 mb-6">
          <p className="text-lg font-semibold text-purple-800 flex items-center justify-center gap-2">
            <Sparkles size={20} />
            {getMessage()}
          </p>
        </div>

        {/* Session Stats */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 mb-6 shadow-inner">
          <h3 className="font-bold text-gray-800 mb-4 text-lg flex items-center justify-center gap-2">
            <Brain size={20} className="text-purple-600" />
            {lang === 'de' ? 'Sitzungsstatistik' : 'Session Stats'}
          </h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-4xl font-bold text-green-600 mb-1">{sessionStats.correct}</div>
              <div className="text-sm text-gray-600 font-medium">{lang === 'de' ? 'Richtig' : 'Correct'}</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-4xl font-bold text-red-600 mb-1">{sessionStats.incorrect}</div>
              <div className="text-sm text-gray-600 font-medium">{lang === 'de' ? 'Falsch' : 'Wrong'}</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-4xl font-bold text-purple-600 mb-1">{total}</div>
              <div className="text-sm text-gray-600 font-medium">{lang === 'de' ? 'Gesamt' : 'Total'}</div>
            </div>
          </div>
        </div>

        {/* Category Breakdown */}
        {Object.keys(categoryBreakdown).length > 0 && (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 mb-6 shadow-inner">
            <h3 className="font-bold text-gray-800 mb-4 text-lg flex items-center justify-center gap-2">
              <Target size={20} className="text-indigo-600" />
              {lang === 'de' ? 'Kategorien-Übersicht' : 'Category Breakdown'}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {Object.entries(categoryBreakdown).map(([category, stats]) => {
                const catAccuracy = Math.round((stats.correct / stats.total) * 100);
                const isWeak = catAccuracy < 70;
                return (
                  <div 
                    key={category}
                    className={`bg-white rounded-lg p-3 shadow-sm ${isWeak ? 'border-2 border-orange-300' : ''}`}
                  >
                    <div className="text-sm font-semibold text-gray-700 mb-1 truncate">{category}</div>
                    <div className={`text-2xl font-bold ${isWeak ? 'text-orange-600' : 'text-green-600'}`}>
                      {stats.correct}/{stats.total}
                    </div>
                    <div className="text-xs text-gray-500">{catAccuracy}%</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Recommendations */}
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-4 mb-6">
          <h3 className="font-bold text-amber-900 mb-2 text-sm flex items-center justify-center gap-2">
            <TrendingUp size={16} />
            {lang === 'de' ? 'Empfehlung' : 'Recommendation'}
          </h3>
          <p className="text-sm text-amber-800 font-medium">
            {getRecommendation()}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button 
            onClick={onNewSession} 
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl py-4 font-bold shadow-lg transform transition-all hover:scale-105 active:scale-95"
          >
            {lang === 'de' ? 'Neue Training-Sitzung' : 'New Training Session'}
          </button>
          
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <p className="text-sm text-purple-800 font-medium flex items-center justify-center gap-2">
              <Lightbulb size={16} className="text-purple-600" />
              {lang === 'de' 
                ? 'Tipp: Kommen Sie morgen zurück für optimale Wiederholung!' 
                : 'Tip: Come back tomorrow for optimal review!'}
            </p>
          </div>

          {accuracy >= 85 && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-3">
              <p className="text-sm text-green-800 font-medium flex items-center justify-center gap-2">
                <Award size={16} className="text-green-600" />
                {lang === 'de' 
                  ? 'Ausgezeichnet! Sie sind bereit für die Prüfung!' 
                  : 'Excellent! You\'re ready for the exam!'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
