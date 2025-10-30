import { useState, useMemo } from 'react';
import {
  BookOpen, Brain, Sparkles, BarChart3, AlertCircle, Target, Clock, CheckCircle2,
  Zap, Check, X, Eye, EyeOff, Globe
} from 'lucide-react';
import { CATEGORY_ICONS } from '../data.js';
import { calculateSRSWeight } from '../srsAlgorithm';
import { VocabPopup, HighlightedText } from '../components.tsx';
import { TrainingCompletion } from '../components/TrainingCompletion';
import { shuffleArray } from '../utils/shuffleArray';
import type { Question, TrainingPageProps } from '../types';

interface Answer {
  selectedIndex: number;
  isCorrect: boolean;
}

export 
function TrainingPage({ lang, questions, updateProgress, progress }: TrainingPageProps) {
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
    const answeredCount = Object.keys(progress).length;
    const accuracyRate = answeredCount > 0 ? (strongCount / answeredCount * 100).toFixed(0) : 0;

    return (
      <div className="p-4">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-full">
              <Brain className="text-white" size={24} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">{lang === 'de' ? 'Training Modus' : 'Training Mode'}</h2>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 mb-6 border-l-4 border-purple-500">
            <h3 className="font-bold text-purple-900 mb-2 flex items-center gap-2">
              <Sparkles size={18} />
              {lang === 'de' ? 'Intelligentes Lern-System (wie Anki)' : 'Smart Learning System (like Anki)'}
            </h3>
            <p className="text-sm text-purple-800 mb-3">
              {lang === 'de' 
                ? 'Adaptives Wiederholungssystem das sich an deinen Fortschritt anpasst. Schwache Bereiche werden häufiger wiederholt!' 
                : 'Adaptive spaced repetition system that adjusts to your progress. Weak areas are repeated more frequently!'}
            </p>
            <div className="flex items-center gap-4 text-sm">
              <div className="bg-white px-3 py-2 rounded-lg">
                <span className="text-purple-600 font-bold text-2xl">{sessionSize}</span>
                <span className="text-purple-800 ml-2">{lang === 'de' ? 'Fragen' : 'questions'}</span>
              </div>
              <div className="text-purple-700">
                {sessionSize > 20 && (
                  <div className="flex items-center gap-1">
                    <BarChart3 size={16} />
                    <span className="text-xs font-semibold">
                      {lang === 'de' ? `Erhöht! ${accuracyRate}% Genauigkeit` : `Increased! ${accuracyRate}% accuracy`}
                    </span>
                  </div>
                )}
                {sessionSize === 20 && (
                  <span className="text-xs">{lang === 'de' ? 'Standard-Sitzung' : 'Standard session'}</span>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <div className="bg-blue-50 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                  {newCount}
                </div>
                <div>
                  <p className="font-semibold text-blue-900">{lang === 'de' ? 'Neue Fragen' : 'New Questions'}</p>
                  <p className="text-xs text-blue-700">{lang === 'de' ? 'Noch nie gesehen' : 'Never seen before'}</p>
                </div>
              </div>
              <Zap className="text-blue-500" size={24} />
            </div>

            <div className="bg-red-50 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-red-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                  {weakCount}
                </div>
                <div>
                  <p className="font-semibold text-red-900">{lang === 'de' ? 'Schwache Bereiche' : 'Weak Areas'}</p>
                  <p className="text-xs text-red-700">{lang === 'de' ? 'Brauchen Wiederholung' : 'Need reinforcement'}</p>
                </div>
              </div>
              <AlertCircle className="text-red-500" size={24} />
            </div>

            <div className="bg-yellow-50 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-yellow-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                  {mediumCount}
                </div>
                <div>
                  <p className="font-semibold text-yellow-900">{lang === 'de' ? 'In Bearbeitung' : 'Learning'}</p>
                  <p className="text-xs text-yellow-700">{lang === 'de' ? 'Mittlere Genauigkeit' : 'Medium accuracy'}</p>
                </div>
              </div>
              <Target className="text-yellow-500" size={24} />
            </div>

            <div className="bg-orange-50 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-orange-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                  {dueCount}
                </div>
                <div>
                  <p className="font-semibold text-orange-900">{lang === 'de' ? 'Zur Wiederholung fällig' : 'Due for Review'}</p>
                  <p className="text-xs text-orange-700">{lang === 'de' ? 'Basierend auf Zeitintervallen' : 'Based on time intervals'}</p>
                </div>
              </div>
              <Clock className="text-orange-500" size={24} />
            </div>

            <div className="bg-green-50 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-green-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                  {strongCount}
                </div>
                <div>
                  <p className="font-semibold text-green-900">{lang === 'de' ? 'Bekannte Fragen' : 'Known Questions'}</p>
                  <p className="text-xs text-green-700">{lang === 'de' ? 'Stark gemeistert' : 'Strong mastery'}</p>
                </div>
              </div>
              <CheckCircle2 className="text-green-500" size={24} />
            </div>
          </div>

          {/* Category Coverage Indicator */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 mb-6 border-2 border-indigo-200">
            <h4 className="font-bold text-indigo-900 mb-3 flex items-center gap-2">
              <BarChart3 className="text-indigo-600" size={18} />
              {lang === 'de' ? '📚 Kategorieabdeckung' : '📚 Category Coverage'}
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
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="bg-white rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-red-600">{weakCategories.length}</div>
                      <div className="text-xs text-gray-600">{lang === 'de' ? 'Schwache' : 'Weak'}</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-green-600">{strongCategories.length}</div>
                      <div className="text-xs text-gray-600">{lang === 'de' ? 'Stark' : 'Strong'}</div>
                    </div>
                  </div>
                  <p className="text-xs text-indigo-700 bg-white rounded-lg p-2">
                    💡 {lang === 'de' 
                      ? 'Training wählt automatisch Fragen aus allen Kategorien für ausgewogene Vorbereitung!' 
                      : 'Training automatically selects questions from all categories for balanced preparation!'}
                  </p>
                </div>
              );
            })()}
          </div>

          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <h4 className="font-bold text-gray-800 mb-3">{lang === 'de' ? '🎯 Wie funktioniert Training?' : '🎯 How Training Works'}</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">1.</span>
                <span>{lang === 'de' ? `${sessionSize} Fragen ausgewählt nach deinem Fortschritt` : `${sessionSize} questions selected based on your progress`}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">2.</span>
                <span>{lang === 'de' ? 'Schwache Fragen kommen öfter zurück' : 'Weak questions come back more often'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">3.</span>
                <span>{lang === 'de' ? 'Starke Fragen werden nach Tagen wiederholt' : 'Strong questions reviewed after days'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">4.</span>
                <span>{lang === 'de' ? 'Sitzungsgröße steigt mit deinem Fortschritt (bis 40!)' : 'Session size grows with your progress (up to 40!)'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">5.</span>
                <span>{lang === 'de' ? 'Vokabel-Highlighting für sofortiges Lernen' : 'Vocabulary highlighting for instant learning'}</span>
              </li>
            </ul>
          </div>

          <button onClick={startTraining} className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl py-4 font-bold shadow-lg flex items-center justify-center gap-2">
            <Brain size={24} />
            {lang === 'de' ? `Training starten (${sessionSize} Fragen)` : `Start Training (${sessionSize} Questions)`}
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
    const answerTime = Math.floor((Date.now() - questionStartTime) / 1000); // seconds
    const newAnswers = [...answers];
    newAnswers[currentIdx] = { selectedIndex: originalIndex, isCorrect };
    setAnswers(newAnswers);
    updateProgress(q.id, isCorrect, answerTime);
    
    // Update session stats
    setSessionStats(prev => ({
      ...prev,
      correct: prev.correct + (isCorrect ? 1 : 0),
      incorrect: prev.incorrect + (isCorrect ? 0 : 1),
      total: prev.total + 1
    }));
  };

  const CategoryIcon = CATEGORY_ICONS[q.category] || BookOpen;
  const strengthColor = !progress[q.id] ? 'gray' : 
    progress[q.id].strength === 'strong' ? 'green' :
    progress[q.id].strength === 'medium' ? 'yellow' : 'red';

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="bg-white rounded-xl p-4 shadow-md">
        <div className="flex justify-between items-center mb-3">
          <span className="font-bold text-gray-800">{currentIdx + 1}/{trainingQuestions.length}</span>
          <div className="flex gap-2 items-center">
            <div className={`w-2 h-2 rounded-full bg-${strengthColor}-400`}></div>
            <CategoryIcon size={16} className="text-purple-600" />
            <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full font-semibold">
              {q.category}
            </span>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all" style={{ width: `${((currentIdx + 1) / trainingQuestions.length) * 100}%` }}></div>
        </div>
      </div>

      {/* Session Stats */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-3 shadow-sm flex justify-around text-center">
        <div>
          <div className="text-lg font-bold text-green-600">{sessionStats.correct}</div>
          <div className="text-xs text-gray-600">✓</div>
        </div>
        <div>
          <div className="text-lg font-bold text-red-600">{sessionStats.incorrect}</div>
          <div className="text-xs text-gray-600">✗</div>
        </div>
        <div>
          <div className="text-lg font-bold text-purple-600">{Math.round((sessionStats.correct / Math.max(1, sessionStats.total)) * 100)}%</div>
          <div className="text-xs text-gray-600">{lang === 'de' ? 'Genauigkeit' : 'Accuracy'}</div>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg">
        <div className="relative mb-4">
          <h3 className="text-base md:text-lg font-bold text-gray-800 pr-12">
            <HighlightedText 
              text={lang === 'de' ? q.question_de : q.question_en}
              onClick={(word: string) => setSelectedVocab(word)}
            />
          </h3>
          <button 
            onClick={() => setShowTranslation(!showTranslation)} 
            className={`absolute right-0 top-0 p-2 rounded-lg transition-all ${
              showTranslation 
                ? 'bg-purple-500 text-white' 
                : 'bg-gray-100 text-gray-500 hover:bg-purple-100 hover:text-purple-600'
            }`}
          >
            {showTranslation ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        
        {showTranslation && (
          <p className="text-sm text-gray-600 mb-4 italic border-l-2 border-purple-300 pl-3 bg-purple-50 p-2 rounded">
            {lang === 'de' ? q.question_en : q.question_de}
          </p>
        )}
        
        {selectedVocab && (
          <VocabPopup 
            word={selectedVocab}
            onClose={() => setSelectedVocab(null)}
            lang={lang}
          />
        )}

        <div className="space-y-3">
          {shuffledOptions.map((opt: any, idx: number) => {
            const isSelected = userAnswer?.selectedIndex === opt.originalIndex;
            const isCorrectAnswer = opt.originalIndex === q.correct_index;
            const showAsCorrect = answered && isCorrectAnswer;
            const showAsWrong = answered && isSelected && !isCorrectAnswer;
            const showingTranslation = hoveredOption === idx;
            
            // Get the translation text
            const translationArray = lang === 'de' ? q.options_en : q.options_de;
            const displayText = showingTranslation ? translationArray[opt.originalIndex] : opt.text;

            return (
              <div key={idx} className="relative">
                <button
                  onClick={() => !answered && handleAnswer(opt.originalIndex)}
                  disabled={answered}
                  className={`w-full text-left p-3 md:p-4 pr-12 rounded-xl border-2 font-semibold transition-all text-sm md:text-base ${
                    showAsWrong ? 'bg-red-50 border-red-500 shadow-md' :
                    showAsCorrect ? 'bg-green-50 border-green-500 shadow-md' :
                    'border-gray-200 hover:border-purple-400 hover:shadow-md active:scale-98'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs md:text-sm font-bold flex-shrink-0 ${
                      showAsWrong ? 'bg-red-500 text-white' :
                      showAsCorrect ? 'bg-green-500 text-white' :
                      'bg-gray-200 text-gray-600'
                    }`}>
                      {answered && (showAsCorrect || showAsWrong) ? (
                        isCorrectAnswer ? <Check size={16} /> : <X size={16} />
                      ) : (
                        String.fromCharCode(65 + idx)
                      )}
                    </span>
                    <span className="flex-1 break-words pr-2">
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
                
                {/* Translation Toggle Button - Positioned inside at the end */}
                <button
                  onMouseDown={() => setHoveredOption(idx)}
                  onMouseUp={() => setHoveredOption(null)}
                  onMouseLeave={() => setHoveredOption(null)}
                  onTouchStart={() => setHoveredOption(idx)}
                  onTouchEnd={() => setHoveredOption(null)}
                  className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all ${
                    showingTranslation 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600'
                  }`}
                  title={lang === 'de' ? 'Übersetzung anzeigen (gedrückt halten)' : 'Show translation (hold)'}
                >
                  <Globe size={18} />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Feedback */}
      {answered && (
        <div className={`rounded-2xl p-4 shadow-lg ${userAnswer.isCorrect ? 'bg-green-50 border-l-4 border-green-500' : 'bg-orange-50 border-l-4 border-orange-500'}`}>
          <div className="flex items-center gap-2 mb-2">
            {userAnswer.isCorrect ? <CheckCircle2 className="text-green-600" size={24} /> : <X className="text-orange-600" size={24} />}
            <span className={`font-bold text-lg ${userAnswer.isCorrect ? 'text-green-800' : 'text-orange-800'}`}>
              {userAnswer.isCorrect ? (lang === 'de' ? 'Richtig! ✓' : 'Correct! ✓') : (lang === 'de' ? 'Falsch ✗' : 'Wrong ✗')}
            </span>
          </div>
          {!userAnswer.isCorrect && (
            <p className="text-sm text-gray-700 mt-2">
              {lang === 'de' ? '✓ Richtige Antwort: ' : '✓ Correct answer: '}
              <span className="font-semibold">{(lang === 'de' ? q.options_de : q.options_en)[q.correct_index]}</span>
            </p>
          )}
        </div>
      )}

      {/* Next Button */}
      <button
        onClick={() => { 
          if (answered) { 
            setCurrentIdx(currentIdx + 1); 
            setShowTranslation(false); 
            setSelectedVocab(null);
            setQuestionStartTime(Date.now()); // Reset timer for next question
          } 
        }}
        disabled={!answered}
        className={`w-full py-4 rounded-xl font-bold shadow-lg transition ${answered ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
      >
        {currentIdx === trainingQuestions.length - 1 ? (lang === 'de' ? 'Ergebnis anzeigen' : 'Show Result') : (lang === 'de' ? 'Weiter →' : 'Next →')}
      </button>
    </div>
  );
}

