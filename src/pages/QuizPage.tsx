import { useState, useMemo, useEffect } from 'react';
import { 
  BookOpen, BarChart3, Trophy, Target, Award, CheckCircle2, Clock
} from 'lucide-react';
import { calculateSRSWeight } from '../srsAlgorithm';
import { VocabPopup } from '../components.tsx';
import { QuestionCard } from '../components/QuestionCard';
import { AnswerOption } from '../components/AnswerOption';
import { ProgressHeader } from '../components/ProgressHeader';
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
  const [hoveredOption, setHoveredOption] = useState<number | null>(null);
  const [resultSaved, setResultSaved] = useState(false);
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());
  const [timeLeft, setTimeLeft] = useState<number>(3600); // 60 minutes in seconds

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

  // Timer countdown effect
  useEffect(() => {
    if (!started || currentIdx >= quizQuestions.length) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Auto-submit quiz when time runs out
          if (currentIdx < quizQuestions.length) {
            setCurrentIdx(quizQuestions.length); // Force show results
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [started, currentIdx, quizQuestions.length]);

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
    setTimeLeft(3600); // Reset to 60 minutes
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
  };

  const sessionStats = {
    correct: answers.filter((a: Answer) => a?.isCorrect).length,
    incorrect: answers.filter((a: Answer) => a && !a.isCorrect).length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 pb-20 md:pb-6">
      <ProgressHeader
        currentIndex={currentIdx}
        total={quizQuestions.length}
        correct={sessionStats.correct}
        incorrect={sessionStats.incorrect}
        lang={lang}
      />

      {/* Timer Display */}
      <div className="max-w-3xl mx-auto px-4 pt-2 pb-3">
        <div className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl shadow-md ${
          timeLeft > 1800 ? 'bg-green-100 text-green-700' :
          timeLeft > 600 ? 'bg-yellow-100 text-yellow-700' :
          timeLeft > 60 ? 'bg-orange-100 text-orange-700' :
          'bg-red-100 text-red-700 animate-pulse'
        }`}>
          <Clock className={timeLeft <= 60 ? 'animate-pulse' : ''} size={20} />
          <span className="font-mono font-bold text-lg">
            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </span>
          {timeLeft <= 600 && (
            <span className="text-sm ml-2">
              {lang === 'de' ? 'Beeilen Sie sich!' : 'Hurry up!'}
            </span>
          )}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-4">
        <QuestionCard
          question={lang === 'de' ? q.question_de : q.question_en}
          translation={lang === 'de' ? q.question_en : q.question_de}
          showTranslation={showTranslation}
          onWordClick={setSelectedVocab}
          onToggleTranslation={() => setShowTranslation(!showTranslation)}
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
          {shuffledOptions.map((opt: { text: string; originalIndex: number }, idx: number) => {
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
            {currentIdx === quizQuestions.length - 1 
              ? (lang === 'de' ? '🎯 Ergebnis anzeigen' : '🎯 Show Results') 
              : (lang === 'de' ? 'Weiter →' : 'Continue →')}
          </button>
        )}
      </div>
    </div>
  );
}
