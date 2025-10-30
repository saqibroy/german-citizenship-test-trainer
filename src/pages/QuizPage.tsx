import { useState, useMemo, useEffect } from 'react';
import { 
  BookOpen, BarChart3, Check, X, Eye, EyeOff, Globe
} from 'lucide-react';
import { CATEGORY_ICONS } from '../data.js';
import { calculateSRSWeight } from '../srsAlgorithm';
import { VocabPopup, HighlightedText } from '../components.tsx';
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

  // Smart question selection using spaced repetition
  const selectSmartQuestions = () => {
    const weightedQuestions = questions.map((q: Question) => ({
      ...q,
      weight: calculateSRSWeight(progress[q.id])
    })).sort((a: { weight: number }, b: { weight: number }) => b.weight - a.weight);

    // Take top 50 weighted questions, then randomly select 33 from them
    const topWeighted = weightedQuestions.slice(0, Math.min(50, questions.length));
    return shuffleArray(topWeighted).slice(0, 33);
  };

  const startQuiz = () => {
    const selected = selectSmartQuestions();
    setQuizQuestions(selected);
    setStarted(true);
    setCurrentIdx(0);
    setAnswers([]);
    setShowTranslation(false);
    setResultSaved(false); // Reset result saved flag
  };

  // NOW it's safe to have conditional returns
  if (!started) {
    return (
      <div className="p-4">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-indigo-100 p-3 rounded-full">
              <BookOpen className="text-indigo-600" size={24} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">{lang === 'de' ? 'Quiz Modus' : 'Quiz Mode'}</h2>
          </div>
          <div className="space-y-3 mb-6">
            <p className="text-gray-700">{lang === 'de' ? '✓ 33 zufällige Fragen pro Quiz' : '✓ 33 random questions per quiz'}</p>
            <p className="text-gray-700">{lang === 'de' ? '✓ Schwache Bereiche werden priorisiert' : '✓ Weak areas are prioritized'}</p>
            <p className="text-gray-700">{lang === 'de' ? '✓ Mindestens 17 richtig zum Bestehen' : '✓ At least 17 correct to pass'}</p>
            <p className="text-gray-700">{lang === 'de' ? '✓ Antworten werden jedes Mal gemischt' : '✓ Answers are shuffled each time'}</p>
          </div>
          <button onClick={startQuiz} className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl py-4 font-bold shadow-lg">
            {lang === 'de' ? 'Quiz starten' : 'Start Quiz'}
          </button>
        </div>
      </div>
    );
  }

  if (currentIdx >= quizQuestions.length) {
    if (!quizResults) return null; // Safety check
    
    const { score, categoryBreakdown } = quizResults;
    const passed = score >= 17;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 shadow-2xl text-center max-w-2xl w-full">
          <div className="text-8xl mb-6 animate-bounce">{passed ? '🎉' : '📚'}</div>
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            {lang === 'de' ? 'Quiz abgeschlossen!' : 'Quiz Completed!'}
          </h2>
          <div className={`text-7xl font-bold mb-6 ${passed ? 'text-green-600' : 'text-orange-600'}`}>
            {score}/33
          </div>
          <div className="mb-6">
            <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
              <div 
                className={`h-4 rounded-full transition-all duration-1000 ${
                  passed ? 'bg-gradient-to-r from-green-400 to-green-600' : 'bg-gradient-to-r from-orange-400 to-orange-600'
                }`}
                style={{ width: `${(score / 33) * 100}%` }}
              ></div>
            </div>
            <p className="text-2xl mb-6 font-bold">
              {passed ? (
                <span className="text-green-600">{lang === 'de' ? '✓ BESTANDEN' : '✓ PASSED'}</span>
              ) : (
                <span className="text-orange-600">{lang === 'de' ? 'Weiter üben!' : 'Keep practicing!'}</span>
              )}
            </p>
          </div>
          
          {/* Performance Breakdown */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 mb-6 text-left shadow-inner">
            <h3 className="font-bold text-gray-800 mb-4 text-lg flex items-center gap-2">
              <BarChart3 size={20} className="text-indigo-600" />
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
          
          <button 
            onClick={() => setStarted(false)} 
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-xl py-4 font-bold shadow-lg transform transition-all hover:scale-105"
          >
            {lang === 'de' ? 'Neues Quiz' : 'New Quiz'}
          </button>
        </div>
      </div>
    );
  }

  const q = quizQuestions[currentIdx];
  if (!q) return null; // Safety check

  const answered = answers[currentIdx] !== undefined;
  const userAnswer = answers[currentIdx];

  const handleAnswer = (originalIndex: number) => {
    const isCorrect = originalIndex === q.correct_index;
    const answerTime = Math.floor((Date.now() - questionStartTime) / 1000); // seconds
    const newAnswers = [...answers];
    newAnswers[currentIdx] = { selectedIndex: originalIndex, isCorrect };
    setAnswers(newAnswers);
    updateProgress(q.id, isCorrect, answerTime);
  };

  const CategoryIcon = CATEGORY_ICONS[q.category] || BookOpen;
  const strengthColor = !progress[q.id] ? 'gray' : 
    progress[q.id].strength === 'strong' ? 'green' :
    progress[q.id].strength === 'medium' ? 'yellow' : 'red';

  return (
    <div className="p-4 space-y-4">
      <div className="bg-white rounded-xl p-4 shadow-md">
        <div className="flex justify-between items-center mb-3">
          <span className="font-bold text-gray-800">{currentIdx + 1}/{quizQuestions.length}</span>
          <div className="flex gap-2 items-center">
            <div className={`w-2 h-2 rounded-full bg-${strengthColor}-400`}></div>
            <CategoryIcon size={16} className="text-indigo-600" />
            <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full font-semibold">
              {q.category}
            </span>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all" style={{ width: `${((currentIdx + 1) / quizQuestions.length) * 100}%` }}></div>
        </div>
      </div>

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
                ? 'bg-indigo-500 text-white' 
                : 'bg-gray-100 text-gray-500 hover:bg-indigo-100 hover:text-indigo-600'
            }`}
          >
            {showTranslation ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        
        {showTranslation && (
          <p className="text-sm text-gray-600 mb-4 italic border-l-2 border-indigo-300 pl-3 bg-indigo-50 p-2 rounded">
            {lang === 'de' ? q.question_en : q.question_de}
          </p>
        )}
        
        {/* Vocabulary Popup */}
        {selectedVocab && (
          <VocabPopup 
            word={selectedVocab}
            onClose={() => setSelectedVocab(null)}
            lang={lang}
          />
        )}

        <div className="space-y-3">
          {shuffledOptions.map((opt, idx) => {
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
                    'border-gray-200 hover:border-indigo-400 hover:shadow-md active:scale-98'
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

      {answered && (
        <div className={`rounded-2xl p-4 shadow-lg ${userAnswer.isCorrect ? 'bg-green-50 border-l-4 border-green-500' : 'bg-orange-50 border-l-4 border-orange-500'}`}>
          <div className="flex items-center gap-2 mb-2">
            {userAnswer.isCorrect ? <Check className="text-green-600" size={24} /> : <X className="text-orange-600" size={24} />}
            <span className={`font-bold text-lg ${userAnswer.isCorrect ? 'text-green-800' : 'text-orange-800'}`}>
              {userAnswer.isCorrect ? (lang === 'de' ? 'Richtig!' : 'Correct!') : (lang === 'de' ? 'Falsch' : 'Wrong')}
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

      <button
        onClick={() => { 
          if (answered) { 
            setCurrentIdx(currentIdx + 1);
            setShowTranslation(false);
            setQuestionStartTime(Date.now()); // Reset timer for next question
          } 
        }}
        disabled={!answered}
        className={`w-full py-4 rounded-xl font-bold shadow-lg transition ${answered ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
      >
        {currentIdx === quizQuestions.length - 1 ? (lang === 'de' ? 'Ergebnis anzeigen' : 'Show Result') : (lang === 'de' ? 'Weiter →' : 'Next →')}
      </button>
    </div>
  );
}
