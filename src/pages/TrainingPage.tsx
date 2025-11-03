import { useState, useMemo } from 'react';
import {
  Brain, Sparkles, BarChart3, AlertCircle, Target, Clock, CheckCircle2,
  Zap, Check, X, Eye, EyeOff, Globe
} from 'lucide-react';
import { calculateSRSWeight } from '../srsAlgorithm';
import { VocabPopup, HighlightedText } from '../components.tsx';
import { TrainingCompletion } from '../components/TrainingCompletion';
import { shuffleArray } from '../utils/shuffleArray';
import type { Question, TrainingPageProps } from '../types';

interface Answer {
  selectedIndex: number;
  isCorrect: boolean;
}

export function TrainingPage({ lang, questions, updateProgress, progress }: TrainingPageProps) {
  const [started, setStarted] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [trainingQuestions, setTrainingQuestions] = useState<Question[]>([]);
  const [showTranslation, setShowTranslation] = useState(false);
  const [selectedVocab, setSelectedVocab] = useState<string | null>(null);
  const [sessionStats, setSessionStats] = useState({ correct: 0, incorrect: 0, total: 0 });
  const [hoveredOption, setHoveredOption] = useState<number | null>(null);
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());

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

  // Calculate dynamic session size (like Anki's new cards system)
  const calculateSessionSize = () => {
    const totalQuestions = questions.length;
    const answeredCount = Object.keys(progress).length;
    const strongCount = Object.values(progress).filter((p: any) => p.strength === 'strong').length;
    
    // Calculate actual accuracy rate (correct / total attempts)
    const totalCorrect = Object.values(progress).reduce((sum: number, p: any) => sum + (p.correct || 0), 0);
    const totalAttempts = Object.values(progress).reduce((sum: number, p: any) => sum + (p.correct || 0) + (p.incorrect || 0), 0);
    const accuracyRate = totalAttempts > 0 ? totalCorrect / totalAttempts : 0;
    
    // Start with 20 questions for beginners
    let baseSize = 20;
    
    // Increase gradually as user progresses (based on both answered count AND accuracy)
    if (answeredCount > 50 && accuracyRate > 0.6) baseSize = 25;
    if (answeredCount > 100 && accuracyRate > 0.7) baseSize = 30;
    if (answeredCount > 150 && accuracyRate > 0.75) baseSize = 35;
    if (answeredCount > 200 && accuracyRate > 0.8) baseSize = 40;
    
    // Don't exceed remaining questions
    const remaining = totalQuestions - strongCount;
    return Math.min(baseSize, Math.max(10, remaining));
  };

  // Smart question selection for training with CATEGORY BALANCING
  const selectTrainingQuestions = (count: number) => {
    // First, get all categories and their question counts
    const categories = [...new Set(questions.map((q: any) => q.category))];
    const categoryStats = categories.map(cat => {
      const catQuestions = questions.filter((q: any) => q.category === cat);
      const answered = catQuestions.filter((q: any) => progress[q.id]).length;
      const weak = catQuestions.filter((q: any) => progress[q.id]?.strength === 'weak').length;
      const avgAccuracy = catQuestions.reduce((acc, q: any) => {
        const p = progress[q.id];
        if (!p) return acc;
        const total = p.correct + p.incorrect;
        return acc + (total > 0 ? p.correct / total : 0);
      }, 0) / Math.max(1, answered);
      
      return {
        category: cat,
        total: catQuestions.length,
        answered,
        weak,
        avgAccuracy,
        coverage: answered / catQuestions.length,
        priority: (1 - (answered / catQuestions.length)) * 2 + (weak / catQuestions.length) + (1 - avgAccuracy)
      };
    }).sort((a, b) => b.priority - a.priority);

    // Calculate how many questions to take from each category
    const questionsPerCategory: Record<string, number> = {};
    const basePerCategory = Math.floor(count / categories.length);
    let remaining = count - (basePerCategory * categories.length);
    
    // Distribute questions proportionally with priority for weak categories
    categoryStats.forEach(stat => {
      questionsPerCategory[stat.category] = basePerCategory;
      if (stat.priority > 2 && remaining > 0) {
        questionsPerCategory[stat.category]++;
        remaining--;
      }
    });
    
    // Distribute any remaining questions to highest priority categories
    categoryStats.forEach(stat => {
      if (remaining > 0) {
        questionsPerCategory[stat.category]++;
        remaining--;
      }
    });

    // Now select questions from each category using SRS weighting
    const selectedQuestions: any[] = [];
    
    categories.forEach(cat => {
      const catQuestions = questions.filter((q: any) => q.category === cat);
      const targetCount = questionsPerCategory[cat];
      
      // Weight questions by SRS score
      const weightedCatQuestions = catQuestions.map((q: any) => ({
        ...q,
        srsWeight: calculateSRSWeight(progress[q.id])
      })).sort((a: any, b: any) => b.srsWeight - a.srsWeight);

      // Take the highest priority questions from this category
      selectedQuestions.push(...weightedCatQuestions.slice(0, targetCount));
    });

    // Shuffle the final selection to mix categories
    return shuffleArray(selectedQuestions).slice(0, count);
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
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 p-4 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            {/* Header with Gradient */}
            <div className="bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 p-8 text-white">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                  <Brain size={32} />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">{lang === 'de' ? 'Training Modus' : 'Training Mode'}</h2>
                  <p className="text-purple-100 text-sm">{lang === 'de' ? 'Intelligentes adaptives Lernen' : 'Smart adaptive learning'}</p>
                </div>
              </div>
              
              {/* Session Size Badge */}
              <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 border border-white/30">
                <Sparkles size={20} />
                <div>
                  <span className="text-3xl font-bold">{sessionSize}</span>
                  <span className="ml-2 text-sm opacity-90">{lang === 'de' ? 'Fragen heute' : 'questions today'}</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-5 border border-blue-200/50">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-blue-500 text-white w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg shadow-lg">
                      {newCount}
                    </div>
                    <Zap className="text-blue-500" size={24} />
                  </div>
                  <p className="font-semibold text-blue-900 text-sm">{lang === 'de' ? 'Neue Fragen' : 'New Questions'}</p>
                  <p className="text-xs text-blue-600 mt-1">{lang === 'de' ? 'Noch nie gesehen' : 'Never seen before'}</p>
                </div>

                <div className="bg-gradient-to-br from-red-50 to-red-100/50 rounded-2xl p-5 border border-red-200/50">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-red-500 text-white w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg shadow-lg">
                      {weakCount}
                    </div>
                    <AlertCircle className="text-red-500" size={24} />
                  </div>
                  <p className="font-semibold text-red-900 text-sm">{lang === 'de' ? 'Schwache Bereiche' : 'Weak Areas'}</p>
                  <p className="text-xs text-red-600 mt-1">{lang === 'de' ? 'Brauchen Wiederholung' : 'Need reinforcement'}</p>
                </div>

                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100/50 rounded-2xl p-5 border border-yellow-200/50">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-yellow-500 text-white w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg shadow-lg">
                      {mediumCount}
                    </div>
                    <Target className="text-yellow-500" size={24} />
                  </div>
                  <p className="font-semibold text-yellow-900 text-sm">{lang === 'de' ? 'In Bearbeitung' : 'Learning'}</p>
                  <p className="text-xs text-yellow-600 mt-1">{lang === 'de' ? 'Mittlere Genauigkeit' : 'Medium accuracy'}</p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-2xl p-5 border border-green-200/50">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-green-500 text-white w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg shadow-lg">
                      {strongCount}
                    </div>
                    <CheckCircle2 className="text-green-500" size={24} />
                  </div>
                  <p className="font-semibold text-green-900 text-sm">{lang === 'de' ? 'Bekannte Fragen' : 'Known Questions'}</p>
                  <p className="text-xs text-green-600 mt-1">{lang === 'de' ? 'Stark gemeistert' : 'Strong mastery'}</p>
                </div>
              </div>

              {/* Due for Review Card */}
              <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-2xl p-5 border border-orange-200/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-orange-500 text-white w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg shadow-lg">
                      {dueCount}
                    </div>
                    <div>
                      <p className="font-semibold text-orange-900 text-sm">{lang === 'de' ? 'Zur Wiederholung fällig' : 'Due for Review'}</p>
                      <p className="text-xs text-orange-600 mt-1">{lang === 'de' ? 'Basierend auf Zeitintervallen' : 'Based on time intervals'}</p>
                    </div>
                  </div>
                  <Clock className="text-orange-500" size={24} />
                </div>
              </div>

              {/* Category Coverage */}
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-200/50">
                <h4 className="font-bold text-indigo-900 mb-4 flex items-center gap-2">
                  <BarChart3 className="text-indigo-600" size={20} />
                  {lang === 'de' ? '📚 Kategorieabdeckung' : '📚 Category Balance'}
                </h4>
                {(() => {
                  const categories = [...new Set(questions.map((q: any) => q.category))];
                  const categoryProgress = categories.map(cat => {
                    const catQuestions = questions.filter((q: any) => q.category === cat);
                    const answered = catQuestions.filter((q: any) => progress[q.id]).length;
                    const coverage = (answered / catQuestions.length) * 100;
                    return { category: cat, coverage, answered, total: catQuestions.length };
                  }).sort((a, b) => a.coverage - b.coverage);

                  const weakCategories = categoryProgress.filter(c => c.coverage < 50);
                  const strongCategories = categoryProgress.filter(c => c.coverage >= 80);

                  return (
                    <div>
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                          <div className="text-3xl font-bold text-red-600 mb-1">{weakCategories.length}</div>
                          <div className="text-xs text-gray-600">{lang === 'de' ? 'Brauchen Fokus' : 'Need Focus'}</div>
                        </div>
                        <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                          <div className="text-3xl font-bold text-green-600 mb-1">{strongCategories.length}</div>
                          <div className="text-xs text-gray-600">{lang === 'de' ? 'Kompetent' : 'Proficient'}</div>
                        </div>
                      </div>
                      <p className="text-xs text-indigo-700 bg-white/70 rounded-lg p-3">
                        💡 {lang === 'de' 
                          ? 'Fragen werden aus allen Kategorien ausgeglichen für umfassendes Lernen' 
                          : 'Questions are balanced across all categories for comprehensive learning'}
                      </p>
                    </div>
                  );
                })()}
              </div>

              {/* Start Button */}
              <button 
                onClick={startTraining}
                className="w-full bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 text-white rounded-2xl py-5 font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3"
              >
                <Brain size={24} />
                {lang === 'de' ? `Training starten (${sessionSize} Fragen)` : `Start Training (${sessionSize} Questions)`}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentIdx >= trainingQuestions.length) {
    const score = answers.filter((ans: any) => ans?.isCorrect).length;
    const accuracy = Math.round((score / trainingQuestions.length) * 100);
    
    // Calculate category breakdown
    const categoryBreakdown: Record<string, { correct: number; total: number }> = {};
    trainingQuestions.forEach((q, idx) => {
      if (!categoryBreakdown[q.category]) {
        categoryBreakdown[q.category] = { correct: 0, total: 0 };
      }
      categoryBreakdown[q.category].total++;
      if (answers[idx]?.isCorrect) {
        categoryBreakdown[q.category].correct++;
      }
    });

    // Find weak categories (< 70% accuracy)
    const weakCategories = Object.entries(categoryBreakdown)
      .filter(([_, stats]) => (stats.correct / stats.total) < 0.7)
      .map(([category, _]) => category);
    
    return (
      <TrainingCompletion
        lang={lang}
        score={score}
        total={trainingQuestions.length}
        accuracy={accuracy}
        sessionStats={sessionStats}
        categoryBreakdown={categoryBreakdown}
        weakCategories={weakCategories}
        onNewSession={() => {
          setStarted(false);
          setCurrentIdx(0);
          setAnswers([]);
          setSessionStats({ correct: 0, incorrect: 0, total: 0 });
        }}
      />
    );
  }

  const q = trainingQuestions[currentIdx];
  if (!q) return null;

  const answered = answers[currentIdx] !== undefined;
  const userAnswer = answers[currentIdx];

  const handleAnswer = (originalIndex: any) => {
    const isCorrect = originalIndex === q.correct_index;
    const answerTime = Math.floor((Date.now() - questionStartTime) / 1000);
    const newAnswers = [...answers];
    newAnswers[currentIdx] = { selectedIndex: originalIndex, isCorrect };
    setAnswers(newAnswers);
    updateProgress(q.id, isCorrect, answerTime);
    
    setSessionStats(prev => ({
      ...prev,
      correct: prev.correct + (isCorrect ? 1 : 0),
      incorrect: prev.incorrect + (isCorrect ? 0 : 1),
      total: prev.total + 1
    }));
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
      {/* Minimal Top Bar */}
      <div className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-lg z-50 border-b border-gray-200/50">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <span className="text-lg font-bold text-gray-800">{currentIdx + 1}/{trainingQuestions.length}</span>
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1 text-green-600 font-semibold">
                  <Check size={16} /> {sessionStats.correct}
                </span>
                <span className="flex items-center gap-1 text-red-600 font-semibold">
                  <X size={16} /> {sessionStats.incorrect}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                {q.category}
              </span>
              <span className="text-purple-600 font-bold text-sm hidden sm:inline">
                {Math.round((sessionStats.correct / Math.max(1, sessionStats.total)) * 100)}%
              </span>
            </div>
          </div>
        </div>
        <div className="h-1 bg-gray-100">
          <div 
            className="h-full bg-gradient-to-r from-purple-600 to-pink-500 transition-all duration-500"
            style={{ width: `${((currentIdx + 1) / trainingQuestions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Content */}
      <div className="pt-20 pb-8 px-4 flex items-center justify-center min-h-screen">
        <div className="max-w-3xl w-full">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            {/* Question Header */}
            <div className="p-8 pb-6">
              <div className="flex items-start justify-between gap-4 mb-6">
                <h3 className="text-2xl font-bold text-gray-900 leading-relaxed flex-1">
                  <HighlightedText 
                    text={lang === 'de' ? q.question_de : q.question_en}
                    onClick={(word: string) => setSelectedVocab(word)}
                  />
                </h3>
                <button 
                  onClick={() => setShowTranslation(!showTranslation)}
                  className={`p-3 rounded-xl transition-all flex-shrink-0 ${
                    showTranslation 
                      ? 'bg-purple-600 text-white shadow-lg' 
                      : 'bg-gray-100 text-gray-500 hover:bg-purple-100 hover:text-purple-600'
                  }`}
                  title={lang === 'de' ? 'Übersetzung anzeigen' : 'Show translation'}
                >
                  {showTranslation ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              
              {showTranslation && (
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border-l-4 border-purple-400 mb-6">
                  <p className="text-sm text-gray-700 italic">
                    {lang === 'de' ? q.question_en : q.question_de}
                  </p>
                </div>
              )}
              
              {selectedVocab && (
                <VocabPopup 
                  word={selectedVocab}
                  onClose={() => setSelectedVocab(null)}
                  lang={lang}
                />
              )}
            </div>

            {/* Answer Options */}
            <div className="px-8 pb-8 space-y-3">
              {shuffledOptions.map((opt: any, idx: number) => {
                const isSelected = userAnswer?.selectedIndex === opt.originalIndex;
                const isCorrectAnswer = opt.originalIndex === q.correct_index;
                const showAsCorrect = answered && isCorrectAnswer;
                const showAsWrong = answered && isSelected && !isCorrectAnswer;
                const showingTranslation = hoveredOption === idx;
                const translationArray = lang === 'de' ? q.options_en : q.options_de;
                const displayText = showingTranslation ? translationArray[opt.originalIndex] : opt.text;

                return (
                  <div key={idx} className="relative group">
                    <button
                      onClick={() => !answered && handleAnswer(opt.originalIndex)}
                      disabled={answered}
                      className={`w-full text-left p-5 pr-14 rounded-2xl border-2 transition-all duration-300 ${
                        showAsWrong ? 'bg-red-50 border-red-400 shadow-lg shadow-red-100' :
                        showAsCorrect ? 'bg-green-50 border-green-400 shadow-lg shadow-green-100' :
                        isSelected ? 'border-purple-400 bg-purple-50 shadow-md' :
                        answered ? 'border-gray-200 bg-gray-50 opacity-60' :
                        'border-gray-200 bg-white hover:border-purple-300 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0 transition-all ${
                          showAsWrong ? 'bg-red-500 text-white shadow-lg' :
                          showAsCorrect ? 'bg-green-500 text-white shadow-lg' :
                          isSelected ? 'bg-purple-600 text-white shadow-lg' :
                          'bg-gray-100 text-gray-600 group-hover:bg-purple-100 group-hover:text-purple-600'
                        }`}>
                          {showAsWrong ? <X size={18} /> :
                           showAsCorrect ? <Check size={18} /> :
                           String.fromCharCode(65 + idx)}
                        </div>
                        <span className="flex-1 text-base font-medium text-gray-800">
                          {showingTranslation ? (
                            displayText
                          ) : (
                            <HighlightedText 
                              text={opt.text}
                              onClick={(word: string) => setSelectedVocab(word)}
                            />
                          )}
                        </span>
                      </div>
                    </button>
                    
                    <button
                      onMouseDown={() => setHoveredOption(idx)}
                      onMouseUp={() => setHoveredOption(null)}
                      onMouseLeave={() => setHoveredOption(null)}
                      onTouchStart={() => setHoveredOption(idx)}
                      onTouchEnd={() => setHoveredOption(null)}
                      className={`absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-xl transition-all ${
                        showingTranslation 
                          ? 'bg-blue-500 text-white shadow-lg' 
                          : 'bg-gray-100 text-gray-500 hover:bg-blue-100 hover:text-blue-600 opacity-0 group-hover:opacity-100'
                      }`}
                      title={lang === 'de' ? 'Übersetzung anzeigen (gedrückt halten)' : 'Show translation (hold)'}
                    >
                      <Globe size={16} />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Feedback Section */}
            {answered && (
              <div className="px-8 pb-8">
                <div className={`rounded-2xl p-6 ${
                  userAnswer.isCorrect 
                    ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200' 
                    : 'bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200'
                }`}>
                  <div className="flex items-center gap-3 mb-3">
                    {userAnswer.isCorrect ? (
                      <div className="bg-green-500 text-white p-2 rounded-xl">
                        <CheckCircle2 size={24} />
                      </div>
                    ) : (
                      <div className="bg-orange-500 text-white p-2 rounded-xl">
                        <X size={24} />
                      </div>
                    )}
                    <span className={`font-bold text-xl ${
                      userAnswer.isCorrect ? 'text-green-800' : 'text-orange-800'
                    }`}>
                      {userAnswer.isCorrect 
                        ? (lang === 'de' ? 'Ausgezeichnet! ✓' : 'Excellent! ✓') 
                        : (lang === 'de' ? 'Nicht ganz ✗' : 'Not quite ✗')}
                    </span>
                  </div>
                  {!userAnswer.isCorrect && (
                    <div className="bg-white/70 rounded-xl p-4 mt-3">
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold text-green-700">{lang === 'de' ? 'Richtige Antwort:' : 'Correct answer:'}</span>
                        <span className="ml-2 font-medium">{(lang === 'de' ? q.options_de : q.options_en)[q.correct_index]}</span>
                      </p>
                    </div>
                  )}
                  
                  <button
                    onClick={() => { 
                      setCurrentIdx(currentIdx + 1); 
                      setShowTranslation(false); 
                      setSelectedVocab(null);
                      setHoveredOption(null);
                      setQuestionStartTime(Date.now());
                    }}
                    className="w-full mt-4 py-4 rounded-xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {currentIdx === trainingQuestions.length - 1 
                      ? (lang === 'de' ? 'Ergebnis anzeigen' : 'Show Result') 
                      : (lang === 'de' ? 'Nächste Frage →' : 'Next Question →')}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}