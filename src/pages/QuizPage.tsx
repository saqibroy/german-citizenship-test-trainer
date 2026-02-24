import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, BarChart3, Trophy, Target, Award, CheckCircle2, AlertCircle, Clock, ChevronRight, CheckCheck, X
} from 'lucide-react';
import { calculateSRSWeight } from '../srsAlgorithm';
import { VocabPopup } from '../components.tsx';
import { shuffleArray } from '../utils/shuffleArray';
import type { Question, QuizPageProps, CategoryBreakdown } from '../types';

interface Answer {
  selectedIndex: number;
  isCorrect: boolean;
}

export function QuizPage({ lang, questions, updateProgress, progress, saveQuizResult, onSessionChange }: QuizPageProps) {
  const [started, setStarted] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [selectedVocab, setSelectedVocab] = useState<string | null>(null);
  const [resultSaved, setResultSaved] = useState(false);
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());
  const [timeRemaining, setTimeRemaining] = useState<number>(60 * 60); // 60 minutes in seconds
  // Two-step answer: user selects first, then confirms
  const [pendingAnswer, setPendingAnswer] = useState<number | null>(null);
  // Ref to scroll the bottom action bar into view
  const actionBarRef = useRef<HTMLDivElement>(null);

  // Create shuffled options with original indices - CALL HOOKS FIRST, BEFORE ANY RETURNS!
  const shuffledOptions = useMemo(() => {
    if (!quizQuestions[currentIdx]) return [];
    const q = quizQuestions[currentIdx];
    const opts = (lang === 'de' ? q.options_de : q.options_en).map((opt: string, idx: number) => ({
      text: opt,
      originalIndex: idx
    }));
    return shuffleArray(opts);
  }, [quizQuestions, currentIdx, lang]);

  // Calculate quiz results (score and category breakdown) - only when quiz is complete
  const quizResults = useMemo(() => {
    if (currentIdx < quizQuestions.length) return null;
    
    const score = answers.filter((ans: Answer) => ans?.isCorrect).length;
    const categoryBreakdown: CategoryBreakdown = {};
    
    quizQuestions.forEach((q: Question, idx: number) => {
      const cat = q.category;
      if (!categoryBreakdown[cat]) {
        categoryBreakdown[cat] = { correct: 0, total: 0 };
      }
      categoryBreakdown[cat].total++;
      if (answers[idx]?.isCorrect) {
        categoryBreakdown[cat].correct++;
      }
    });
    
    return { score, categoryBreakdown };
  }, [currentIdx, quizQuestions, answers]);

  // Timer countdown - runs every second during quiz
  useEffect(() => {
    if (!started || currentIdx >= quizQuestions.length) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) return 0;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [started, currentIdx, quizQuestions.length]);

  // Save quiz result when completed (runs only once)
  useEffect(() => {
    if (quizResults && !resultSaved) {
      saveQuizResult(quizResults.score, 33, quizResults.categoryBreakdown);
      setResultSaved(true);
    }
  }, [quizResults, resultSaved, saveQuizResult]);

  const startQuiz = (mode: 'untrained' | 'weak' | 'all' | 'strong' = 'all') => {
    let filtered = questions;
    
    if (mode === 'untrained') {
      filtered = questions.filter((q: Question) => !progress[q.id]);
    } else if (mode === 'weak') {
      filtered = questions.filter((q: Question) => 
        progress[q.id]?.strength === 'weak' || !progress[q.id]
      );
    } else if (mode === 'strong') {
      filtered = questions.filter((q: Question) => 
        progress[q.id]?.strength === 'strong' || progress[q.id]?.strength === 'medium'
      );
    } else {
      // 'all' mode - use smart selection
      const weightedQuestions = questions.map((q: Question) => ({
        ...q,
        weight: calculateSRSWeight(progress[q.id])
      })).sort((a: { weight: number }, b: { weight: number }) => b.weight - a.weight);

      const topWeighted = weightedQuestions.slice(0, Math.min(50, questions.length));
      filtered = shuffleArray(topWeighted);
    }
    
    // Take up to 33 questions
    const selected = shuffleArray([...filtered]).slice(0, 33);
    setQuizQuestions(selected);
    setStarted(true);
    setCurrentIdx(0);
    setAnswers([]);
    setResultSaved(false);
    setQuestionStartTime(Date.now());
    setTimeRemaining(60 * 60); // Reset timer to 60 minutes
    onSessionChange?.(true);
  };

  const exitSession = useCallback(() => {
    setStarted(false);
    setCurrentIdx(0);
    setAnswers([]);
    setResultSaved(false);
    onSessionChange?.(false);
  }, [onSessionChange]);

  // Notify parent when component unmounts
  useEffect(() => {
    return () => {
      onSessionChange?.(false);
    };
  }, []);

  // NOW it's safe to have conditional returns
  if (!started) {
    const untrainedCount = questions.filter((q: Question) => !progress[q.id]).length;
    const weakCount = questions.filter((q: Question) => 
      progress[q.id]?.strength === 'weak' || !progress[q.id]
    ).length;
    const strongCount = questions.filter((q: Question) => 
      progress[q.id]?.strength === 'strong' || progress[q.id]?.strength === 'medium'
    ).length;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 pb-4 md:pb-6">
        <div className="max-w-2xl lg:max-w-4xl mx-auto px-4 py-6">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-2xl p-6 text-white shadow-xl mb-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                <Trophy size={28} />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{lang === 'de' ? 'Quiz' : 'Quiz'}</h2>
                <p className="text-orange-100 text-xs">{lang === 'de' ? 'Testen Sie Ihr Wissen' : 'Test Your Knowledge'}</p>
              </div>
            </div>
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-5 py-2.5 border border-white/30">
              <Target size={18} />
              <span className="text-2xl font-bold">33</span>
              <span className="text-xs opacity-90">{lang === 'de' ? 'Fragen' : 'questions'}</span>
            </div>
          </div>

          {/* Quiz Mode Selection */}
          <div className="space-y-3">

            {/* Untrained Questions */}
            <button
              onClick={() => startQuiz('untrained')}
              disabled={untrainedCount === 0}
              className="w-full bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-500 text-white w-12 h-12 rounded-lg flex items-center justify-center font-bold text-lg">
                    {Math.min(33, untrainedCount)}
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">{lang === 'de' ? 'Neue Fragen' : 'New Questions'}</p>
                    <p className="text-xs text-gray-500">{lang === 'de' ? 'Noch nie beantwortet' : 'Never answered'}</p>
                  </div>
                </div>
                <BookOpen className="text-blue-500" size={20} />
              </div>
            </button>

            {/* Weak Questions */}
            <button
              onClick={() => startQuiz('weak')}
              disabled={weakCount === 0}
              className="w-full bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-red-500 text-white w-12 h-12 rounded-lg flex items-center justify-center font-bold text-lg">
                    {Math.min(33, weakCount)}
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">{lang === 'de' ? 'Üben' : 'Practice'}</p>
                    <p className="text-xs text-gray-500">{lang === 'de' ? 'Schwache & neue' : 'Weak & new'}</p>
                  </div>
                </div>
                <Target className="text-red-500" size={20} />
              </div>
            </button>

            {/* Strong Questions */}
            <button
              onClick={() => startQuiz('strong')}
              disabled={strongCount === 0}
              className="w-full bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-green-500 text-white w-12 h-12 rounded-lg flex items-center justify-center font-bold text-lg">
                    {Math.min(33, strongCount)}
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">{lang === 'de' ? 'Bekanntes prüfen' : 'Test Known'}</p>
                    <p className="text-xs text-gray-500">{lang === 'de' ? 'Starke & mittlere' : 'Strong & medium'}</p>
                  </div>
                </div>
                <CheckCircle2 className="text-green-500" size={20} />
              </div>
            </button>

            {/* All Questions */}
            <button
              onClick={() => startQuiz('all')}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all active:scale-98"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 backdrop-blur-sm w-12 h-12 rounded-lg flex items-center justify-center font-bold text-lg">
                    33
                  </div>
                  <div className="text-left">
                    <p className="font-semibold">{lang === 'de' ? 'Gemischtes Quiz' : 'Mixed Quiz'}</p>
                    <p className="text-xs text-purple-100">{lang === 'de' ? 'Alle Fragen' : 'All questions'}</p>
                  </div>
                </div>
                <Award className="text-white" size={20} />
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentIdx >= quizQuestions.length) {
    if (!quizResults) return null;
    
    const { score, categoryBreakdown } = quizResults;
    const passed = score >= 17;
    const accuracy = Math.round((score / 33) * 100);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 pb-20 md:pb-6">
        <div className="max-w-2xl lg:max-w-4xl mx-auto px-4 py-6">
          {/* Results Header */}
          <div className={`${
            passed 
              ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
              : 'bg-gradient-to-r from-red-500 to-rose-600'
          } rounded-2xl p-6 text-white shadow-xl mb-6`}>
            <div className="text-center">
              <div className="mb-4">
                {passed ? <Trophy size={64} className="mx-auto" /> : <BookOpen size={64} className="mx-auto" />}
              </div>
              <h2 className="text-3xl font-bold mb-2">
                {passed 
                  ? (lang === 'de' ? 'Bestanden!' : 'Passed!') 
                  : (lang === 'de' ? 'Nicht bestanden' : 'Not Passed')}
              </h2>
              <p className="text-lg opacity-90">
                {score} / 33 {lang === 'de' ? 'richtig' : 'correct'}
              </p>
              <div className="mt-4 inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
                <span className="text-4xl font-bold">{accuracy}%</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-white rounded-xl p-4 shadow-md text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">{score}</div>
              <div className="text-sm text-gray-600">{lang === 'de' ? 'Richtig' : 'Correct'}</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md text-center">
              <div className="text-3xl font-bold text-red-600 mb-1">{33 - score}</div>
              <div className="text-sm text-gray-600">{lang === 'de' ? 'Falsch' : 'Incorrect'}</div>
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="bg-white rounded-xl p-5 shadow-md mb-6">
            <h3 className="font-bold text-gray-800 mb-4 text-lg flex items-center gap-2">
              <BarChart3 size={20} className="text-purple-600" />
              {lang === 'de' ? 'Leistung nach Kategorie' : 'Performance by Category'}
            </h3>
            <div className="space-y-3">
              {Object.entries(categoryBreakdown).map(([cat, stats]: [string, { correct: number; total: number }]) => {
                const percentage = Math.round((stats.correct / stats.total) * 100);
                const isGood = stats.correct / stats.total >= 0.7;
                return (
                  <div key={cat} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-700 font-medium">{cat}</span>
                      <span className={`font-bold ${isGood ? 'text-green-600' : 'text-orange-600'}`}>
                        {stats.correct}/{stats.total} ({percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all ${
                          isGood ? 'bg-gradient-to-r from-green-400 to-green-600' : 'bg-gradient-to-r from-orange-400 to-orange-600'
                        }`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Feedback */}
          <div className="bg-white rounded-xl p-5 shadow-md mb-6">
            <p className="text-gray-700 leading-relaxed">
              {passed ? (
                lang === 'de' 
                  ? 'Hervorragend! Sie haben den Test bestanden. Machen Sie weiter so!' 
                  : 'Excellent! You passed the test. Keep up the good work!'
              ) : (
                lang === 'de'
                  ? 'Weiter üben! Konzentrieren Sie sich auf Ihre schwachen Bereiche.'
                  : 'Keep practicing! Focus on your weak areas.'
              )}
            </p>
          </div>

          {/* Action Button */}
          <button
            onClick={() => {
              setStarted(false);
              setCurrentIdx(0);
              setAnswers([]);
              setResultSaved(false);
              onSessionChange?.(false);
            }}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-2xl py-4 font-bold text-lg shadow-xl active:scale-98 transition-transform"
          >
            {lang === 'de' ? 'Neues Quiz starten' : 'Start New Quiz'}
          </button>
        </div>
      </div>
    );
  }

  const q = quizQuestions[currentIdx];
  if (!q) return null;

  const answered = answers[currentIdx] !== undefined;
  const userAnswer = answers[currentIdx];

  // Scroll to top when moving to next question
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAnswer = (originalIndex: number) => {
    const isCorrect = originalIndex === q.correct_index;
    const answerTime = Math.floor((Date.now() - questionStartTime) / 1000);
    const newAnswers = [...answers];
    newAnswers[currentIdx] = { selectedIndex: originalIndex, isCorrect };
    setAnswers(newAnswers);
    updateProgress(q.id, isCorrect, answerTime);
    setPendingAnswer(null);

    // Reduce timer if answer is correct (reward good performance)
    if (isCorrect) {
      setTimeRemaining((prev) => Math.max(0, prev - 30)); // Reduce by 30 seconds for correct answer
    }

    // Scroll the action bar into view so user sees the Continue button
    setTimeout(() => {
      actionBarRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  };

  const goToNextQuestion = () => {
    setCurrentIdx(currentIdx + 1);
    setPendingAnswer(null);
    setQuestionStartTime(Date.now());
    scrollToTop();
  };

  const sessionStats = {
    correct: answers.filter((a: Answer) => a?.isCorrect).length,
    incorrect: answers.filter((a: Answer) => a && !a.isCorrect).length
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex flex-col z-40">
      {/* Session Header - App icon + timer + stats + exit */}
      <div className="bg-white shadow-md px-4 py-1 shrink-0">
        <div className="flex items-center justify-between max-w-2xl lg:max-w-4xl mx-auto">
          <img src="/final-logo.svg" alt="Einbürger Coach" className="h-12 md:h-14 w-auto" />
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-700">
              {currentIdx + 1}/{quizQuestions.length}
            </span>
            {/* Timer */}
            <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full font-bold text-xs ${
              timeRemaining < 300 ? 'bg-red-100 text-red-700' : 
              timeRemaining < 900 ? 'bg-orange-100 text-orange-700' : 
              'bg-blue-100 text-blue-700'
            }`}>
              <Clock size={12} />
              <span>{Math.floor(timeRemaining / 60)}:{String(timeRemaining % 60).padStart(2, '0')}</span>
            </div>
            <span className="flex items-center gap-1 text-green-600 font-medium text-xs">
              <CheckCircle2 size={14} /> {sessionStats.correct}
            </span>
            <span className="flex items-center gap-1 text-red-600 font-medium text-xs">
              <AlertCircle size={14} /> {sessionStats.incorrect}
            </span>
          </div>
          <button
            onClick={exitSession}
            className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 active:scale-95 transition-all"
            title={lang === 'de' ? 'Beenden' : 'Exit'}
          >
            <X size={20} />
          </button>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden max-w-2xl lg:max-w-4xl mx-auto mt-2">
          <motion.div 
            className="bg-gradient-to-r from-amber-500 to-red-500 h-1.5"
            initial={{ width: '0%' }}
            animate={{ width: `${((currentIdx) / quizQuestions.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Question Card - Scrollable if needed */}
      <div className="flex-1 overflow-y-auto mobile-container py-4 max-w-2xl lg:max-w-4xl mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIdx}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="space-y-4"
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
              
              {/* Question number only - No translation in Quiz mode (exam simulation) */}
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
                <span className="text-xs font-semibold text-amber-600 uppercase tracking-wide">
                  {lang === 'de' ? 'Prüfungsmodus' : 'Exam Mode'}
                </span>
              </div>
              
              <p className="text-lg font-semibold text-gray-900 leading-relaxed">
                {lang === 'de' ? q.question_de : q.question_en}
              </p>
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
            <div className="space-y-3">
              {shuffledOptions.map((opt: { text: string; originalIndex: number }, idx: number) => {
                const isSelected = answered
                  ? userAnswer?.selectedIndex === opt.originalIndex
                  : pendingAnswer === opt.originalIndex;
                const isCorrectAnswer = opt.originalIndex === q.correct_index;
                const showAsCorrect = answered && isCorrectAnswer;
                const showAsWrong = answered && userAnswer?.selectedIndex === opt.originalIndex && !isCorrectAnswer;
                
                let buttonClass = "w-full text-left p-4 rounded-2xl font-medium transition-all active:scale-98 touch-target ";
                
                if (!answered && isSelected) {
                  buttonClass += "bg-purple-100 border-2 border-purple-500 text-gray-800 shadow-md ring-2 ring-purple-300";
                } else if (!answered) {
                  buttonClass += "bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 text-gray-800 shadow-sm hover:shadow-md";
                } else if (isCorrectAnswer) {
                  buttonClass += "bg-gradient-to-r from-green-500 to-emerald-600 text-white border-2 border-green-600 shadow-lg";
                } else if (userAnswer?.selectedIndex === opt.originalIndex && !isCorrectAnswer) {
                  buttonClass += "bg-gradient-to-r from-red-500 to-rose-600 text-white border-2 border-red-600 shadow-lg";
                } else {
                  buttonClass += "bg-white border-2 border-gray-200 text-gray-500 opacity-50";
                }

                return (
                  <motion.button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!answered) {
                        setPendingAnswer(opt.originalIndex);
                      }
                    }}
                    disabled={answered}
                    className={buttonClass}
                    style={{ pointerEvents: 'auto' }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <div className="flex items-start gap-3">
                      <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        !answered && isSelected
                          ? 'bg-purple-600 text-white'
                          : !answered 
                          ? 'bg-gray-100 text-gray-600'
                          : isCorrectAnswer
                          ? 'bg-white/30 text-white'
                          : showAsWrong
                          ? 'bg-white/30 text-white'
                          : 'bg-gray-50 text-gray-400'
                      }`}>
                        {showAsCorrect ? <CheckCircle2 size={16} /> :
                         showAsWrong ? <AlertCircle size={16} /> :
                         String.fromCharCode(65 + idx)}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className={`leading-relaxed ${!answered ? 'text-gray-900' : ''}`}>
                          {opt.text}
                        </p>
                      </div>
                      {showAsCorrect && (
                        <CheckCircle2 className="flex-shrink-0 text-white" size={24} />
                      )}
                      {showAsWrong && (
                        <AlertCircle className="flex-shrink-0 text-white" size={24} />
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Spacer for bottom action bar */}
            <div ref={actionBarRef} className="h-2" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Action Bar - Flush to bottom, always visible */}
      <div className="bg-white border-t border-gray-200 px-4 py-2 shrink-0" style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}>
        <div className="max-w-2xl lg:max-w-4xl mx-auto">
          {answered ? (
            /* After answering: Show Continue button */
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={goToNextQuestion}
              className="w-full py-3.5 rounded-2xl font-bold bg-gradient-to-r from-amber-500 to-red-500 text-white shadow-xl text-lg active:scale-98 transition-transform flex items-center justify-center gap-2"
            >
              {currentIdx === quizQuestions.length - 1 
                ? (lang === 'de' ? 'Ergebnis anzeigen' : 'Show Results') 
                : (
                  <>
                    {lang === 'de' ? 'Weiter' : 'Continue'}
                    <ChevronRight size={20} />
                  </>
                )}
            </motion.button>
          ) : pendingAnswer !== null ? (
            /* Answer selected but not confirmed: Show Confirm button */
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => handleAnswer(pendingAnswer)}
              className="w-full py-3.5 rounded-2xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-xl text-lg active:scale-98 transition-transform flex items-center justify-center gap-2"
            >
              <CheckCheck size={20} />
              {lang === 'de' ? 'Antwort bestätigen' : 'Confirm Answer'}
            </motion.button>
          ) : (
            /* No answer selected: Show disabled-style button */
            <div className="w-full py-3.5 rounded-2xl font-bold bg-gray-200 text-gray-400 text-lg text-center">
              {lang === 'de' ? 'Wähle eine Antwort' : 'Select an answer'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
