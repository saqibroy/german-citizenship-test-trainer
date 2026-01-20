import { useState, useMemo } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import {
  Brain, Sparkles, AlertCircle, CheckCircle2,
  Zap, ChevronRight, Languages
} from 'lucide-react';
import { calculateSRSWeight } from '../srsAlgorithm';
import { VocabPopup } from '../components.tsx';
import { VocabHighlight } from '../components/VocabHighlight';
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
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());
  const [customSessionSize, setCustomSessionSize] = useState<number | null>(null);
  // Long-press translation state
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(null);
  const [showingAnswerTranslation, setShowingAnswerTranslation] = useState<number | null>(null);

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

  const calculateSessionSize = () => {
    const totalQuestions = questions.length;
    const answeredCount = Object.keys(progress).length;
    const totalCorrect = Object.values(progress).reduce((sum: number, p: any) => sum + (p.correct || 0), 0);
    const totalAttempts = Object.values(progress).reduce((sum: number, p: any) => sum + (p.correct || 0) + (p.incorrect || 0), 0);
    const accuracyRate = totalAttempts > 0 ? totalCorrect / totalAttempts : 0;
    
    let baseSize = 20;
    if (answeredCount > 50 && accuracyRate > 0.6) baseSize = 25;
    if (answeredCount > 100 && accuracyRate > 0.7) baseSize = 30;
    
    const strongCount = Object.values(progress).filter((p: any) => p.strength === 'strong').length;
    const remaining = totalQuestions - strongCount;
    return Math.min(baseSize, Math.max(10, remaining));
  };

  const selectTrainingQuestions = (count: number, mode: 'smart' | 'weak' | 'learning' | 'new' | 'bekannt' = 'smart') => {
    let filtered = questions;

    // Filter based on mode
    if (mode === 'weak') {
      filtered = questions.filter((q: any) => progress[q.id]?.strength === 'weak' || !progress[q.id]);
    } else if (mode === 'learning') {
      filtered = questions.filter((q: any) => progress[q.id]?.srsLevel === 'learning');
    } else if (mode === 'new') {
      filtered = questions.filter((q: any) => !progress[q.id]);
    } else if (mode === 'bekannt') {
      filtered = questions.filter((q: any) => 
        progress[q.id]?.srsLevel === 'young' || progress[q.id]?.srsLevel === 'mature'
      );
    }

    if (filtered.length === 0) {
      filtered = questions; // Fallback to all questions
    }

    const categories = [...new Set(filtered.map((q: any) => q.category))];
    const questionsPerCategory = Math.floor(count / categories.length);
    const selectedQuestions: any[] = [];
    
    categories.forEach(cat => {
      const catQuestions = filtered
        .filter((q: any) => q.category === cat)
        .map((q: any) => ({ ...q, srsWeight: calculateSRSWeight(progress[q.id]) }))
        .sort((a: any, b: any) => b.srsWeight - a.srsWeight);
      selectedQuestions.push(...catQuestions.slice(0, questionsPerCategory));
    });

    return shuffleArray(selectedQuestions).slice(0, Math.min(count, filtered.length));
  };

  const startTraining = (mode: 'smart' | 'weak' | 'learning' | 'new' | 'bekannt' = 'smart') => {
    const sessionSize = customSessionSize || calculateSessionSize();
    const selected = selectTrainingQuestions(sessionSize, mode);
    setTrainingQuestions(selected);
    setStarted(true);
    setCurrentIdx(0);
    setAnswers([]);
    setShowTranslation(false);
    setSessionStats({ correct: 0, incorrect: 0, total: 0 });
  };

  // Swipe gesture handling
  const handleDragEnd = (_: any, info: PanInfo) => {
    const answered = answers[currentIdx] !== undefined;
    if (!answered) return; // Only allow swipe after answering
    
    const swipeThreshold = 100;
    const swipeVelocity = 500;

    if (info.offset.x < -swipeThreshold || info.velocity.x < -swipeVelocity) {
      // Swipe left - next question
      if (currentIdx < trainingQuestions.length - 1) {
        setCurrentIdx(currentIdx + 1);
        setShowTranslation(false);
        setQuestionStartTime(Date.now());
      }
    }
  };

  if (!started) {
    const weakCount = questions.filter((q: any) => progress[q.id]?.strength === 'weak' || !progress[q.id]).length;
    const masteredCount = Object.values(progress).filter((p: any) => p.srsLevel === 'mastered').length;
    const bekanntCount = Object.values(progress).filter((p: any) => 
      p.srsLevel === 'young' || p.srsLevel === 'mature'
    ).length;
    const learningCount = Object.values(progress).filter((p: any) => p.srsLevel === 'learning').length;
    const newCount = questions.filter((q: any) => !progress[q.id]).length;
    const sessionSize = calculateSessionSize();

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex flex-col main-content">
        <div className="flex-1 flex flex-col mobile-container py-4 max-w-2xl mx-auto w-full overflow-y-auto">
          {/* Header - Compact */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-2xl p-4 text-white shadow-xl mb-4 shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl">
                  <Brain size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold">{lang === 'de' ? 'Training' : 'Training'}</h2>
                  <p className="text-purple-100 text-xs">{lang === 'de' ? 'Intelligentes Lernen' : 'Smart Learning'}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <Sparkles size={16} />
                <span className="text-xl font-bold">{customSessionSize || sessionSize}</span>
              </div>
            </div>
          </div>

          {/* Session Size Selector */}
          <div className="bg-white rounded-xl p-3 shadow-md mb-4 shrink-0">
            <p className="text-xs font-medium text-gray-600 mb-2">{lang === 'de' ? 'Sitzungsgröße:' : 'Session Size:'}</p>
            <div className="flex gap-2">
              {[10, 20, 30, 40].map((size) => (
                <button
                  key={size}
                  onClick={() => setCustomSessionSize(size)}
                  className={`flex-1 py-2 px-3 rounded-lg font-bold text-sm transition-all active:scale-95 ${
                    (customSessionSize || sessionSize) === size
                      ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Detailed Stats Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4 shrink-0">
            <div className="bg-white rounded-xl p-3 shadow-md">
              <div className="flex items-center gap-2 mb-1">
                <div className="bg-green-500 text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm">
                  {masteredCount}
                </div>
                <CheckCircle2 className="text-green-500" size={18} />
              </div>
              <p className="font-semibold text-gray-900 text-xs">{lang === 'de' ? 'Gemeistert' : 'Mastered'}</p>
            </div>

            <div className="bg-white rounded-xl p-3 shadow-md">
              <div className="flex items-center gap-2 mb-1">
                <div className="bg-blue-500 text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm">
                  {bekanntCount}
                </div>
                <Brain className="text-blue-500" size={18} />
              </div>
              <p className="font-semibold text-gray-900 text-xs">{lang === 'de' ? 'Bekannt' : 'Familiar'}</p>
            </div>

            <div className="bg-white rounded-xl p-3 shadow-md">
              <div className="flex items-center gap-2 mb-1">
                <div className="bg-yellow-500 text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm">
                  {learningCount}
                </div>
                <Zap className="text-yellow-500" size={18} />
              </div>
              <p className="font-semibold text-gray-900 text-xs">{lang === 'de' ? 'Lerne' : 'Learning'}</p>
            </div>

            <div className="bg-white rounded-xl p-3 shadow-md">
              <div className="flex items-center gap-2 mb-1">
                <div className="bg-red-500 text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm">
                  {weakCount}
                </div>
                <AlertCircle className="text-red-500" size={18} />
              </div>
              <p className="font-semibold text-gray-900 text-xs">{lang === 'de' ? 'Schwach' : 'Weak'}</p>
            </div>
          </div>

          {/* Practice Mode Selection */}
          <div className="space-y-2 mb-4 shrink-0">
            <h3 className="font-bold text-gray-900 text-sm mb-2">
              {lang === 'de' ? 'Übungsmodus wählen:' : 'Choose Practice Mode:'}
            </h3>
            
            {/* Weak Questions */}
            {weakCount > 0 && (
              <button
                onClick={() => startTraining('weak')}
                className="w-full bg-white border-2 border-red-200 hover:border-red-400 rounded-xl p-3 shadow-md active:scale-98 transition-all text-left"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-red-500 text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold">
                      {weakCount}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{lang === 'de' ? 'Schwache Fragen' : 'Weak Questions'}</p>
                      <p className="text-xs text-gray-600">{lang === 'de' ? 'Fokus auf Verbesserung' : 'Focus on improvement'}</p>
                    </div>
                  </div>
                  <ChevronRight className="text-gray-400" size={20} />
                </div>
              </button>
            )}

            {/* Learning Questions */}
            {learningCount > 0 && (
              <button
                onClick={() => startTraining('learning')}
                className="w-full bg-white border-2 border-yellow-200 hover:border-yellow-400 rounded-xl p-3 shadow-md active:scale-98 transition-all text-left"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-yellow-500 text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold">
                      {learningCount}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{lang === 'de' ? 'Lernende Fragen' : 'Learning Questions'}</p>
                      <p className="text-xs text-gray-600">{lang === 'de' ? 'In Bearbeitung' : 'In progress'}</p>
                    </div>
                  </div>
                  <ChevronRight className="text-gray-400" size={20} />
                </div>
              </button>
            )}

            {/* New Questions */}
            {newCount > 0 && (
              <button
                onClick={() => startTraining('new')}
                className="w-full bg-white border-2 border-gray-200 hover:border-gray-400 rounded-xl p-3 shadow-md active:scale-98 transition-all text-left"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-600 text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold">
                      {newCount}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{lang === 'de' ? 'Neue Fragen' : 'New Questions'}</p>
                      <p className="text-xs text-gray-600">{lang === 'de' ? 'Noch nicht gesehen' : 'Not seen yet'}</p>
                    </div>
                  </div>
                  <ChevronRight className="text-gray-400" size={20} />
                </div>
              </button>
            )}

            {/* Bekannt Questions */}
            {bekanntCount > 0 && (
              <button
                onClick={() => startTraining('bekannt')}
                className="w-full bg-white border-2 border-blue-200 hover:border-blue-400 rounded-xl p-3 shadow-md active:scale-98 transition-all text-left"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-500 text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold">
                      {bekanntCount}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{lang === 'de' ? 'Bekannte Fragen' : 'Familiar Questions'}</p>
                      <p className="text-xs text-gray-600">{lang === 'de' ? 'Auffrischen' : 'Refresh memory'}</p>
                    </div>
                  </div>
                  <ChevronRight className="text-gray-400" size={20} />
                </div>
              </button>
            )}
          </div>

          {/* Smart Training Button - Sticky at bottom */}
          <div className="mt-auto shrink-0">
            <button 
              onClick={() => startTraining('smart')}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-2xl py-4 font-bold text-lg shadow-xl active:scale-98 transition-transform flex items-center justify-center gap-2 touch-target-lg"
            >
              <Brain size={24} />
              {lang === 'de' ? 'Jetzt starten' : 'Start Now'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentIdx >= trainingQuestions.length) {
    const score = answers.filter((ans: any) => ans?.isCorrect).length;
    const accuracy = Math.round((score / trainingQuestions.length) * 100);
    
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

  // Scroll to top when moving to next question
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToNextQuestion = () => {
    setCurrentIdx(currentIdx + 1);
    setShowTranslation(false);
    setSelectedVocab(null);
    setQuestionStartTime(Date.now());
    scrollToTop();
  };

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
    
    // No auto-advance - user must tap to continue
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex flex-col main-content overflow-hidden">
      {/* Progress Bar - Fixed at top */}
      <div className="bg-white shadow-md px-4 py-3 shrink-0">
        <div className="flex items-center justify-between mb-2 max-w-2xl mx-auto">
          <span className="text-sm font-semibold text-gray-700">
            {currentIdx + 1} / {trainingQuestions.length}
          </span>
          {/* Session stats moved here */}
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1 text-green-600 font-medium">
              <CheckCircle2 size={14} /> {sessionStats.correct}
            </span>
            <span className="flex items-center gap-1 text-red-600 font-medium">
              <AlertCircle size={14} /> {sessionStats.incorrect}
            </span>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden max-w-2xl mx-auto">
          <motion.div 
            className="bg-gradient-to-r from-purple-600 to-pink-500 h-2"
            initial={{ width: '0%' }}
            animate={{ width: `${((currentIdx) / trainingQuestions.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Question Card - Scrollable if needed, but optimized to fit */}
      <motion.div 
        className="flex-1 overflow-y-auto mobile-container py-4 max-w-2xl mx-auto w-full"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIdx}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="space-y-4"
            style={{ cursor: answered ? 'pointer' : 'default' }}
            onClick={(e) => {
              // Tap anywhere to continue after answering
              if (!answered) return;
              
              const target = e.target as HTMLElement;
              
              // Don't advance if clicking vocabulary word (they have their own handlers)
              const clickedVocab = target.closest('.vocab-highlight');
              if (clickedVocab) {
                e.stopPropagation();
                return;
              }
              
              // Don't advance if modal is open
              if (selectedVocab) {
                return;
              }
              
              // Don't advance if clicking the main continue button (it has its own handler)
              const clickedContinueButton = target.closest('.continue-button-main');
              if (clickedContinueButton) {
                return;
              }
              
              // Otherwise, advance to next question
              goToNextQuestion();
            }}
          >
            {/* Question */}
            <div className="bg-white rounded-2xl p-4 shadow-lg min-h-[120px]">
              {q.img?.url && (
                <div className="mb-4 rounded-xl overflow-hidden">
                  <img 
                    src={`/images/question-${q.id}.png`}
                    alt="Question" 
                    className="w-full h-auto max-h-48 object-contain bg-gray-50"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                </div>
              )}
              
              {/* Translate button moved here */}
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
                <span className="text-xs font-semibold text-purple-600 uppercase tracking-wide">
                  {lang === 'de' ? 'Frage' : 'Question'} {currentIdx + 1}
                </span>
                <button
                  onClick={() => setShowTranslation(!showTranslation)}
                  className="flex items-center gap-1.5 text-sm font-medium text-purple-600 hover:text-purple-700 active:scale-95 transition-all touch-target bg-purple-50 px-3 py-1.5 rounded-lg"
                >
                  <Languages size={16} />
                  <span>{showTranslation ? (lang === 'de' ? 'DE' : 'EN') : (lang === 'de' ? 'EN' : 'DE')}</span>
                </button>
              </div>
              
              <p className="text-lg font-semibold text-gray-900 leading-relaxed">
                <VocabHighlight 
                  text={lang === 'de' ? q.question_de : q.question_en}
                  onVocabClick={(vocabEntry) => setSelectedVocab(vocabEntry.de)}
                  disabled={!answered}
                />
              </p>
              {showTranslation && (
                <p className="text-sm text-gray-600 mt-3 pt-3 border-t border-gray-100 italic">
                  {lang === 'de' ? q.question_en : q.question_de}
                </p>
              )}
            </div>

            {/* Vocab Popup */}
            {selectedVocab && (
              <VocabPopup 
                word={selectedVocab}
                onClose={() => setSelectedVocab(null)}
                lang={lang}
              />
            )}

            {/* Answer Options */}
            <div className="space-y-2.5">
              {shuffledOptions.map((opt: any, idx: number) => {
                const isSelected = userAnswer?.selectedIndex === opt.originalIndex;
                const isCorrectAnswer = opt.originalIndex === q.correct_index;
                const showAsCorrect = answered && isCorrectAnswer;
                const showAsWrong = answered && isSelected && !isCorrectAnswer;
                const showTranslationForThis = showingAnswerTranslation === idx;

                // Get translated text
                const translatedText = lang === 'de' 
                  ? (lang === 'de' ? q.options_en : q.options_de)[opt.originalIndex]
                  : (lang === 'de' ? q.options_de : q.options_en)[opt.originalIndex];

                return (
                  <motion.button
                    key={idx}
                    onClick={(e) => {
                      // Don't answer if showing translation (long-press just happened)
                      if (showingAnswerTranslation === idx) {
                        e.preventDefault();
                        e.stopPropagation();
                        return;
                      }
                      if (!answered) {
                        handleAnswer(opt.originalIndex);
                        e.stopPropagation(); // Prevent propagation only when answering
                      }
                      // If answered, don't stopPropagation - let it bubble to tap-anywhere handler
                    }}
                    onMouseDown={() => {
                      if (answered) return; // Only allow long-press BEFORE answering
                      // Start long-press timer for desktop (500ms)
                      const timer = setTimeout(() => {
                        setShowingAnswerTranslation(idx);
                      }, 500);
                      setLongPressTimer(timer);
                    }}
                    onMouseUp={() => {
                      // Clear timer on release
                      if (longPressTimer) {
                        clearTimeout(longPressTimer);
                        setLongPressTimer(null);
                      }
                      // Hide translation after a delay if it was shown
                      if (showingAnswerTranslation === idx) {
                        setTimeout(() => {
                          setShowingAnswerTranslation(null);
                        }, 800);
                      }
                    }}
                    onMouseLeave={() => {
                      // Clear timer if mouse leaves
                      if (longPressTimer) {
                        clearTimeout(longPressTimer);
                        setLongPressTimer(null);
                      }
                    }}
                    onTouchStart={() => {
                      if (answered) return; // Only allow long-press BEFORE answering
                      // Start long-press timer for mobile (500ms)
                      const timer = setTimeout(() => {
                        setShowingAnswerTranslation(idx);
                      }, 500);
                      setLongPressTimer(timer);
                    }}
                    onTouchEnd={() => {
                      // Clear timer on release
                      if (longPressTimer) {
                        clearTimeout(longPressTimer);
                        setLongPressTimer(null);
                      }
                      // Hide translation after a delay if it was shown
                      if (showingAnswerTranslation === idx) {
                        setTimeout(() => {
                          setShowingAnswerTranslation(null);
                        }, 800);
                      }
                    }}
                    onTouchCancel={() => {
                      // Clear timer if touch is cancelled
                      if (longPressTimer) {
                        clearTimeout(longPressTimer);
                        setLongPressTimer(null);
                      }
                      setShowingAnswerTranslation(null);
                    }}
                    style={{ pointerEvents: 'auto' }}
                    whileTap={{ scale: answered ? 1 : 0.98 }}
                    className={`answer-option-button w-full p-4 rounded-2xl font-medium text-left transition-all touch-target-lg ${
                      showAsCorrect
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                        : showAsWrong
                        ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg'
                        : isSelected
                        ? 'bg-purple-100 border-2 border-purple-500'
                        : 'bg-white border-2 border-gray-200 hover:border-purple-300 active:bg-purple-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex-1">
                        {/* Always show vocabulary highlighting, use light variant for colored answers */}
                        <VocabHighlight 
                          text={opt.text}
                          onVocabClick={(vocabEntry) => setSelectedVocab(vocabEntry.de)}
                          disabled={!answered}
                          variant={(showAsCorrect || showAsWrong) ? 'light' : 'default'}
                        />
                        {/* Show translation on long press */}
                        {showTranslationForThis && (
                          <motion.span
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="block mt-2 pt-2 border-t border-white/30 text-sm italic opacity-90"
                          >
                            {translatedText}
                          </motion.span>
                        )}
                      </span>
                      {showAsCorrect && <CheckCircle2 size={20} />}
                      {showAsWrong && <AlertCircle size={20} />}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Continue Button - Fixed at bottom */}
      {/* Show always when answered - tap anywhere or button to continue */}
      {answered && (
        <div className="bg-white border-t border-gray-200 px-4 py-3 shrink-0">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={(e) => { 
              e.stopPropagation(); // Prevent double-trigger from tap-anywhere
              goToNextQuestion();
            }}
            className="continue-button-main w-full py-4 rounded-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-xl text-lg active:scale-98 transition-transform flex items-center justify-center gap-2 touch-target-lg max-w-2xl mx-auto"
          >
            {currentIdx === trainingQuestions.length - 1 
              ? (lang === 'de' ? 'Ergebnis anzeigen' : 'Show Results') 
              : (
                <>
                  {lang === 'de' ? 'Weiter' : 'Continue'}
                  <ChevronRight size={20} />
                </>
              )}
          </motion.button>
          <div className="text-center text-xs mt-2 space-y-1">
            <p className="text-gray-500">
              {lang === 'de' ? 'Tippen Sie irgendwo, um fortzufahren' : 'Tap anywhere to continue'}
            </p>
            <p className="text-purple-600 font-medium">
              {lang === 'de' ? 'Halten Sie markierte Wörter gedrückt, um sie zu übersetzen' : 'Long-press highlighted words to translate'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
