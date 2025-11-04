import { useState, useMemo } from 'react';
import {
  Brain, Sparkles, BarChart3, AlertCircle, Target, Clock, CheckCircle2,
  Zap
} from 'lucide-react';
import { calculateSRSWeight } from '../srsAlgorithm';
import { VocabPopup } from '../components.tsx';
import { QuestionCard } from '../components/QuestionCard';
import { AnswerOption } from '../components/AnswerOption';
import { ProgressHeader } from '../components/ProgressHeader';
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
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 pb-20 md:pb-6">
        <div className="max-w-2xl mx-auto px-4 py-6">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 rounded-2xl p-6 text-white shadow-xl mb-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                <Brain size={28} />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{lang === 'de' ? 'Training' : 'Training'}</h2>
                <p className="text-purple-100 text-xs">{lang === 'de' ? 'Intelligentes Lernen' : 'Smart Learning'}</p>
              </div>
            </div>
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-5 py-2.5 border border-white/30">
              <Sparkles size={18} />
              <span className="text-2xl font-bold">{sessionSize}</span>
              <span className="text-xs opacity-90">{lang === 'de' ? 'Fragen' : 'questions'}</span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white rounded-xl p-3 shadow-md">
                <div className="flex items-center gap-2 mb-1">
                  <div className="bg-blue-500 text-white w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm">
                    {newCount}
                  </div>
                  <Zap className="text-blue-500" size={18} />
                </div>
                <p className="font-semibold text-gray-900 text-xs">{lang === 'de' ? 'Neue' : 'New'}</p>
              </div>

              <div className="bg-white rounded-xl p-3 shadow-md">
                <div className="flex items-center gap-2 mb-1">
                  <div className="bg-red-500 text-white w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm">
                    {weakCount}
                  </div>
                  <AlertCircle className="text-red-500" size={18} />
                </div>
                <p className="font-semibold text-gray-900 text-xs">{lang === 'de' ? 'Schwach' : 'Weak'}</p>
              </div>

              <div className="bg-white rounded-xl p-3 shadow-md">
                <div className="flex items-center gap-2 mb-1">
                  <div className="bg-yellow-500 text-white w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm">
                    {mediumCount}
                  </div>
                  <Target className="text-yellow-500" size={18} />
                </div>
                <p className="font-semibold text-gray-900 text-xs">{lang === 'de' ? 'Lernen' : 'Learning'}</p>
              </div>

              <div className="bg-white rounded-xl p-3 shadow-md">
                <div className="flex items-center gap-2 mb-1">
                  <div className="bg-green-500 text-white w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm">
                    {strongCount}
                  </div>
                  <CheckCircle2 className="text-green-500" size={18} />
                </div>
                <p className="font-semibold text-gray-900 text-xs">{lang === 'de' ? 'Bekannt' : 'Known'}</p>
              </div>
            </div>

            {/* Due Review */}
            <div className="bg-white rounded-xl p-4 shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-orange-500 text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold">
                    {dueCount}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{lang === 'de' ? 'Fällig zur Wiederholung' : 'Due for Review'}</p>
                    <p className="text-xs text-gray-500">{lang === 'de' ? 'Zeitbasiert' : 'Time-based'}</p>
                  </div>
                </div>
                <Clock className="text-orange-500" size={20} />
              </div>
            </div>

            {/* Category Coverage */}
            <div className="bg-white rounded-xl p-4 shadow-md">
              <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-sm">
                <BarChart3 className="text-purple-600" size={18} />
                {lang === 'de' ? 'Kategorien' : 'Categories'}
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
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <div className="bg-red-50 rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold text-red-600 mb-0.5">{weakCategories.length}</div>
                        <div className="text-xs text-gray-600">{lang === 'de' ? 'Fokus' : 'Focus'}</div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold text-green-600 mb-0.5">{strongCategories.length}</div>
                        <div className="text-xs text-gray-600">{lang === 'de' ? 'Gut' : 'Strong'}</div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 bg-purple-50 rounded-lg p-2">
                      💡 {lang === 'de' 
                        ? 'Ausgeglichene Fragenauswahl' 
                        : 'Balanced question mix'}
                    </p>
                  </div>
                );
              })()}
            </div>
          </div>

          {/* Start Button */}
          <button 
            onClick={startTraining}
            className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-2xl py-4 font-bold text-lg shadow-xl active:scale-98 transition-transform flex items-center justify-center gap-2"
          >
            <Brain size={22} />
            {lang === 'de' ? 'Starten' : 'Start'}
          </button>
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 pb-20 md:pb-6">
      <ProgressHeader
        currentIndex={currentIdx}
        total={trainingQuestions.length}
        correct={sessionStats.correct}
        incorrect={sessionStats.incorrect}
        showTranslation={showTranslation}
        onToggleTranslation={() => setShowTranslation(!showTranslation)}
        lang={lang}
      />

      <div className="max-w-3xl mx-auto px-4 py-4">
        <QuestionCard
          question={lang === 'de' ? q.question_de : q.question_en}
          translation={lang === 'de' ? q.question_en : q.question_de}
          showTranslation={showTranslation}
          onWordClick={setSelectedVocab}
          lang={lang}
        />

        {selectedVocab && (
          <VocabPopup 
            word={selectedVocab}
            onClose={() => setSelectedVocab(null)}
            lang={lang}
          />
        )}

        <div className="space-y-3 mb-4">
          {shuffledOptions.map((opt: any, idx: number) => {
            const isSelected = userAnswer?.selectedIndex === opt.originalIndex;
            const isCorrectAnswer = opt.originalIndex === q.correct_index;
            const showAsCorrect = answered && isCorrectAnswer;
            const showAsWrong = answered && isSelected && !isCorrectAnswer;
            const translationArray = lang === 'de' ? q.options_en : q.options_de;

            return (
              <AnswerOption
                key={idx}
                text={opt.text}
                translation={translationArray[opt.originalIndex]}
                index={idx}
                isSelected={isSelected}
                isCorrect={isCorrectAnswer}
                showAsCorrect={showAsCorrect}
                showAsWrong={showAsWrong}
                answered={answered}
                showingTranslation={hoveredOption === idx}
                onSelect={() => !answered && handleAnswer(opt.originalIndex)}
                onWordClick={setSelectedVocab}
                onTranslationToggle={(show) => setHoveredOption(show ? idx : null)}
                lang={lang}
              />
            );
          })}
        </div>

        {/* Continue Button */}
        {answered && (
          <button
            onClick={() => { 
              setCurrentIdx(currentIdx + 1); 
              setShowTranslation(false); 
              setSelectedVocab(null);
              setHoveredOption(null);
              setQuestionStartTime(Date.now());
            }}
            className="w-full py-4 rounded-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-2xl text-lg active:scale-98 transition-transform"
          >
            {currentIdx === trainingQuestions.length - 1 
              ? (lang === 'de' ? '🎯 Ergebnis anzeigen' : '🎯 Show Results') 
              : (lang === 'de' ? 'Weiter →' : 'Continue →')}
          </button>
        )}
      </div>
    </div>
  );
}