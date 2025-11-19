import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, BarChart3, Trophy, Target, Award, CheckCircle2, Languages, AlertCircle
} from 'lucide-react';
import { calculateSRSWeight } from '../srsAlgorithm';
import { VocabPopup } from '../components.tsx';
import { shuffleArray } from '../utils/shuffleArray';
import type { Question, QuizPageProps, CategoryBreakdown } from '../types';

interface Answer {
  selectedIndex: number;
  isCorrect: boolean;
}

export function QuizPage({ lang, questions, updateProgress, progress, saveQuizResult }: QuizPageProps) {
  const [started, setStarted] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [showTranslation, setShowTranslation] = useState(false);
  const [selectedVocab, setSelectedVocab] = useState<string | null>(null);
  const [resultSaved, setResultSaved] = useState(false);
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());

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
    setShowTranslation(false);
    setResultSaved(false);
    setQuestionStartTime(Date.now());
  };

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
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 pb-20 md:pb-6">
        <div className="max-w-2xl mx-auto px-4 py-6">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-2xl p-6 text-white shadow-xl mb-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                <Trophy size={28} />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{lang === 'de' ? 'Quiz' : 'Quiz'}</h2>
                <p className="text-orange-100 text-xs">{lang === 'de' ? 'Teste dein Wissen' : 'Test Your Knowledge'}</p>
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
            <h3 className="font-bold text-gray-900 mb-3 text-sm">
              {lang === 'de' ? 'Wähle einen Modus:' : 'Choose a Mode:'}
            </h3>

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
        <div className="max-w-2xl mx-auto px-4 py-6">
          {/* Results Header */}
          <div className={`${
            passed 
              ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
              : 'bg-gradient-to-r from-red-500 to-rose-600'
          } rounded-2xl p-6 text-white shadow-xl mb-6`}>
            <div className="text-center">
              <div className="text-6xl mb-4">{passed ? '🎉' : '📚'}</div>
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
                  ? '🎯 Hervorragend! Du hast den Test bestanden. Mach weiter so!' 
                  : '🎯 Excellent! You passed the test. Keep up the good work!'
              ) : (
                lang === 'de'
                  ? '💪 Weiter üben! Konzentriere dich auf deine schwachen Bereiche.'
                  : '💪 Keep practicing! Focus on your weak areas.'
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
            }}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-2xl py-4 font-bold text-lg shadow-xl active:scale-98 transition-transform"
          >
            {lang === 'de' ? '🔄 Neues Quiz' : '🔄 New Quiz'}
          </button>
        </div>
      </div>
    );
  }

  const q = quizQuestions[currentIdx];
  if (!q) return null;

  const answered = answers[currentIdx] !== undefined;
  const userAnswer = answers[currentIdx];

  const handleAnswer = (originalIndex: number) => {
    const isCorrect = originalIndex === q.correct_index;
    const answerTime = Math.floor((Date.now() - questionStartTime) / 1000);
    const newAnswers = [...answers];
    newAnswers[currentIdx] = { selectedIndex: originalIndex, isCorrect };
    setAnswers(newAnswers);
    updateProgress(q.id, isCorrect, answerTime);

    // Auto-advance on correct answer after 1 second (except last question)
    if (isCorrect && currentIdx < quizQuestions.length - 1) {
      setTimeout(() => {
        setCurrentIdx(currentIdx + 1);
        setShowTranslation(false);
        setQuestionStartTime(Date.now());
      }, 1000);
    }
  };

  const sessionStats = {
    correct: answers.filter((a: Answer) => a?.isCorrect).length,
    incorrect: answers.filter((a: Answer) => a && !a.isCorrect).length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex flex-col main-content overflow-hidden">
      {/* Progress Bar - Fixed at top - MATCHES TrainingPage */}
      <div className="bg-white shadow-md px-4 py-3 shrink-0">
        <div className="flex items-center justify-between mb-2 max-w-2xl mx-auto">
          <span className="text-sm font-semibold text-gray-700">
            {currentIdx + 1} / {quizQuestions.length}
          </span>
          {/* Session stats */}
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
            className="bg-gradient-to-r from-amber-500 to-red-500 h-2"
            initial={{ width: '0%' }}
            animate={{ width: `${((currentIdx) / quizQuestions.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Question Card - Scrollable if needed */}
      <div className="flex-1 overflow-y-auto mobile-container py-4 max-w-2xl mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {/* Question - MATCHES TrainingPage */}
            <div className="bg-white rounded-2xl p-4 shadow-lg">
              {q.img?.url && (
                <div className="mb-4 rounded-xl overflow-hidden">
                  <img 
                    src={q.img.url} 
                    alt="Question" 
                    className="w-full h-auto max-h-48 object-contain bg-gray-50"
                  />
                </div>
              )}
              
              {/* Translate button - MATCHES TrainingPage */}
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
                <span className="text-xs font-semibold text-amber-600 uppercase tracking-wide">
                  {lang === 'de' ? 'Frage' : 'Question'} {currentIdx + 1}
                </span>
                <button
                  onClick={() => setShowTranslation(!showTranslation)}
                  className="flex items-center gap-1.5 text-sm font-medium text-amber-600 hover:text-amber-700 active:scale-95 transition-all touch-target bg-amber-50 px-3 py-1.5 rounded-lg"
                >
                  <Languages size={16} />
                  <span>{showTranslation ? (lang === 'de' ? 'DE' : 'EN') : (lang === 'de' ? 'EN' : 'DE')}</span>
                </button>
              </div>
              
              <p className="text-lg font-semibold text-gray-900 leading-relaxed">
                {lang === 'de' ? q.question_de : q.question_en}
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

            {/* Answer Options - MATCHES TrainingPage */}
            <div className="space-y-3">
              {shuffledOptions.map((opt: { text: string; originalIndex: number }, idx: number) => {
                const isSelected = userAnswer?.selectedIndex === opt.originalIndex;
                const isCorrectAnswer = opt.originalIndex === q.correct_index;
                const showFeedback = answered;
                
                let buttonClass = "w-full text-left p-4 rounded-2xl font-medium transition-all active:scale-98 touch-target ";
                
                if (!answered) {
                  buttonClass += "bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 text-gray-800 shadow-sm hover:shadow-md";
                } else if (isCorrectAnswer) {
                  buttonClass += "bg-gradient-to-r from-green-500 to-emerald-600 text-white border-2 border-green-600 shadow-lg";
                } else if (isSelected && !isCorrectAnswer) {
                  buttonClass += "bg-gradient-to-r from-red-500 to-rose-600 text-white border-2 border-red-600 shadow-lg";
                } else {
                  buttonClass += "bg-white border-2 border-gray-200 text-gray-500 opacity-50";
                }

                return (
                  <motion.button
                    key={idx}
                    onClick={() => !answered && handleAnswer(opt.originalIndex)}
                    className={buttonClass}
                    disabled={answered}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <div className="flex items-start gap-3">
                      <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        !answered 
                          ? 'bg-gray-100 text-gray-600'
                          : isCorrectAnswer
                          ? 'bg-white/30 text-white'
                          : isSelected
                          ? 'bg-white/30 text-white'
                          : 'bg-gray-50 text-gray-400'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className={`leading-relaxed ${!answered ? 'text-gray-900' : ''}`}>
                          {opt.text}
                        </p>
                        {showTranslation && (
                          <p className={`text-sm mt-2 pt-2 border-t italic ${
                            answered && isCorrectAnswer ? 'border-white/30 text-white/90' :
                            answered && isSelected && !isCorrectAnswer ? 'border-white/30 text-white/90' :
                            'border-gray-200 text-gray-600'
                          }`}>
                            {(lang === 'de' ? q.options_en : q.options_de)[opt.originalIndex]}
                          </p>
                        )}
                      </div>
                      {showFeedback && isCorrectAnswer && (
                        <CheckCircle2 className="flex-shrink-0 text-white" size={24} />
                      )}
                      {showFeedback && isSelected && !isCorrectAnswer && (
                        <AlertCircle className="flex-shrink-0 text-white" size={24} />
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Continue Button - Only show if answered incorrectly OR last question - MATCHES TrainingPage */}
            {answered && (!userAnswer?.isCorrect || currentIdx === quizQuestions.length - 1) && (
              <motion.button
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => { 
                  setCurrentIdx(currentIdx + 1); 
                  setShowTranslation(false); 
                  setQuestionStartTime(Date.now());
                }}
                className="w-full py-4 rounded-2xl font-bold bg-gradient-to-r from-amber-500 to-red-500 text-white shadow-2xl text-lg active:scale-98 transition-transform touch-target"
              >
                {currentIdx === quizQuestions.length - 1 
                  ? (lang === 'de' ? '🎯 Ergebnis anzeigen' : '🎯 Show Results') 
                  : (lang === 'de' ? 'Weiter →' : 'Continue →')}
              </motion.button>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
