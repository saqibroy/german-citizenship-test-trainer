import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { 
  Trophy, Target, Award, CheckCircle2, AlertCircle, ChevronRight, Languages
} from 'lucide-react';
import { calculateSRSWeight } from '../srsAlgorithm';
import { VocabPopup } from '../components.tsx';
import { shuffleArray } from '../utils/shuffleArray';
import type { Question, QuizPageProps, CategoryBreakdown } from '../types';
import ConfettiExplosion from 'react-confetti-explosion';

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
  const [showConfetti, setShowConfetti] = useState(false);

  const shuffledOptions = useMemo(() => {
    if (!quizQuestions[currentIdx]) return [];
    const q = quizQuestions[currentIdx];
    const opts = (lang === 'de' ? q.options_de : q.options_en).map((opt: string, idx: number) => ({
      text: opt,
      originalIndex: idx
    }));
    return shuffleArray(opts);
  }, [quizQuestions, currentIdx, lang]);

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

  useEffect(() => {
    if (quizResults && !resultSaved) {
      saveQuizResult(quizResults.score, 33, quizResults.categoryBreakdown);
      setResultSaved(true);
      if (quizResults.score >= 28) { // 85% pass rate
        setShowConfetti(true);
      }
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
      const weightedQuestions = questions.map((q: Question) => ({
        ...q,
        weight: calculateSRSWeight(progress[q.id])
      })).sort((a: { weight: number }, b: { weight: number }) => b.weight - a.weight);

      const topWeighted = weightedQuestions.slice(0, Math.min(50, questions.length));
      filtered = shuffleArray(topWeighted);
    }
    
    const selected = shuffleArray([...filtered]).slice(0, 33);
    setQuizQuestions(selected);
    setStarted(true);
    setCurrentIdx(0);
    setAnswers([]);
    setShowTranslation(false);
    setResultSaved(false);
    setQuestionStartTime(Date.now());
  };

  // Swipe gesture
  const handleDragEnd = (_: any, info: PanInfo) => {
    const answered = answers[currentIdx] !== undefined;
    if (!answered) return;
    
    const swipeThreshold = 100;
    if (info.offset.x < -swipeThreshold && currentIdx < quizQuestions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setShowTranslation(false);
      setQuestionStartTime(Date.now());
    }
  };

  if (!started) {
    const untrainedCount = questions.filter((q: Question) => !progress[q.id]).length;
    const weakCount = questions.filter((q: Question) => 
      progress[q.id]?.strength === 'weak' || !progress[q.id]
    ).length;
    const strongCount = questions.filter((q: Question) => 
      progress[q.id]?.strength === 'strong' || progress[q.id]?.strength === 'medium'
    ).length;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex flex-col main-content">
        <div className="flex-1 flex flex-col mobile-container py-4 max-w-2xl mx-auto w-full">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-500 to-red-500 rounded-2xl p-4 text-white shadow-xl mb-4 shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl">
                  <Trophy size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold">{lang === 'de' ? 'Quiz' : 'Quiz'}</h2>
                  <p className="text-orange-100 text-xs">{lang === 'de' ? 'Teste dein Wissen' : 'Test Your Knowledge'}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <Target size={16} />
                <span className="text-xl font-bold">33</span>
              </div>
            </div>
          </div>

          {/* Quiz Mode Selection */}
          <div className="space-y-3 flex-1 overflow-y-auto">
            <h3 className="font-bold text-gray-900 mb-3">
              {lang === 'de' ? 'Wähle einen Modus:' : 'Choose a Mode:'}
            </h3>

            <button
              onClick={() => startQuiz('untrained')}
              disabled={untrainedCount === 0}
              className="w-full bg-white rounded-xl p-4 shadow-md hover:shadow-lg active:scale-98 transition-all disabled:opacity-50 disabled:cursor-not-allowed touch-target-lg"
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
                <ChevronRight className="text-gray-400" size={20} />
              </div>
            </button>

            <button
              onClick={() => startQuiz('weak')}
              disabled={weakCount === 0}
              className="w-full bg-white rounded-xl p-4 shadow-md hover:shadow-lg active:scale-98 transition-all disabled:opacity-50 disabled:cursor-not-allowed touch-target-lg"
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
                <ChevronRight className="text-gray-400" size={20} />
              </div>
            </button>

            <button
              onClick={() => startQuiz('strong')}
              disabled={strongCount === 0}
              className="w-full bg-white rounded-xl p-4 shadow-md hover:shadow-lg active:scale-98 transition-all disabled:opacity-50 disabled:cursor-not-allowed touch-target-lg"
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
                <ChevronRight className="text-gray-400" size={20} />
              </div>
            </button>

            <button
              onClick={() => startQuiz('all')}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl p-4 shadow-xl hover:shadow-2xl active:scale-98 transition-all touch-target-lg"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 backdrop-blur-sm w-12 h-12 rounded-lg flex items-center justify-center font-bold text-lg">
                    33
                  </div>
                  <div className="text-left">
                    <p className="font-bold">{lang === 'de' ? 'Gemischtes Quiz' : 'Mixed Quiz'}</p>
                    <p className="text-xs text-purple-100">{lang === 'de' ? 'Intelligente Auswahl' : 'Smart selection'}</p>
                  </div>
                </div>
                <Award size={24} />
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentIdx >= quizQuestions.length) {
    const score = quizResults?.score || 0;
    const percentage = Math.round((score / quizQuestions.length) * 100);
    const passed = percentage >= 85;

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex flex-col main-content">
        {showConfetti && (
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
            <ConfettiExplosion 
              force={0.6}
              duration={3000}
              particleCount={150}
              width={1200}
            />
          </div>
        )}

        <div className="flex-1 flex flex-col mobile-container py-6 max-w-2xl mx-auto w-full">
          {/* Result Card */}
          <div className={`rounded-3xl p-6 text-white shadow-2xl mb-6 ${
            passed 
              ? 'bg-gradient-to-br from-green-500 to-emerald-600' 
              : 'bg-gradient-to-br from-orange-500 to-red-600'
          }`}>
            <div className="text-center">
              <div className="text-6xl mb-4">{passed ? '🎉' : '📚'}</div>
              <h2 className="text-3xl font-bold mb-2">
                {passed 
                  ? (lang === 'de' ? 'Bestanden!' : 'Passed!') 
                  : (lang === 'de' ? 'Weiter üben' : 'Keep Practicing')}
              </h2>
              <p className="text-xl opacity-90">
                {score} / {quizQuestions.length} {lang === 'de' ? 'richtig' : 'correct'}
              </p>
              <div className="text-5xl font-black mt-4">{percentage}%</div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3 mt-auto">
            <button
              onClick={() => {
                setStarted(false);
                setCurrentIdx(0);
                setAnswers([]);
                setResultSaved(false);
                setShowConfetti(false);
              }}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-2xl py-4 font-bold text-lg shadow-xl active:scale-98 transition-transform touch-target-lg"
            >
              {lang === 'de' ? '🔄 Neues Quiz' : '🔄 New Quiz'}
            </button>
          </div>
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
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex flex-col main-content overflow-hidden">
      {/* Progress Bar */}
      <div className="bg-white shadow-md px-4 py-3 shrink-0">
        <div className="flex items-center justify-between mb-2 max-w-2xl mx-auto">
          <span className="text-sm font-semibold text-gray-700">
            {currentIdx + 1} / {quizQuestions.length}
          </span>
          <button
            onClick={() => setShowTranslation(!showTranslation)}
            className="flex items-center gap-1 text-sm font-medium text-purple-600 touch-target"
          >
            <Languages size={18} />
          </button>
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

      {/* Question Card */}
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
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {/* Question */}
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
              <p className="text-lg font-semibold text-gray-900 leading-relaxed">
                {lang === 'de' ? q.question_de : q.question_en}
              </p>
              {showTranslation && (
                <p className="text-sm text-gray-600 mt-2 italic">
                  {lang === 'de' ? q.question_en : q.question_de}
                </p>
              )}
            </div>

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

                return (
                  <motion.button
                    key={idx}
                    onClick={() => !answered && handleAnswer(opt.originalIndex)}
                    disabled={answered}
                    whileTap={{ scale: answered ? 1 : 0.98 }}
                    className={`w-full p-4 rounded-2xl font-medium text-left transition-all touch-target-lg ${
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
                      <span className="flex-1">{opt.text}</span>
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

      {/* Continue Button */}
      {answered && (
        <div className="bg-white border-t border-gray-200 px-4 py-3 shrink-0">
          <motion.button
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            onClick={() => { 
              setCurrentIdx(currentIdx + 1); 
              setShowTranslation(false); 
              setSelectedVocab(null);
              setQuestionStartTime(Date.now());
            }}
            className="w-full py-4 rounded-2xl font-bold bg-gradient-to-r from-amber-500 to-red-500 text-white shadow-xl text-lg active:scale-98 transition-transform flex items-center justify-center gap-2 touch-target-lg max-w-2xl mx-auto"
          >
            {currentIdx === quizQuestions.length - 1 
              ? (lang === 'de' ? '🎯 Ergebnis anzeigen' : '🎯 Show Results') 
              : (
                <>
                  {lang === 'de' ? 'Weiter' : 'Continue'}
                  <ChevronRight size={20} />
                </>
              )}
          </motion.button>
        </div>
      )}
    </div>
  );
}
