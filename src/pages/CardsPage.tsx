import { useState } from 'react';
import { BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import { CATEGORY_ICONS } from '../data.js';
import { calculateSRSWeight } from '../srsAlgorithm';
import type { Question, CardsPageProps } from '../types';

export function CardsPage({ lang, questions, updateProgress, progress }: CardsPageProps) {
  const [started, setStarted] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [cards, setCards] = useState<Question[]>([]);
  const [cardStartTime, setCardStartTime] = useState<number>(Date.now());
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Swipe detection - minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentIdx < cards.length - 1) {
      // Swipe left = Next card
      setFlipped(false);
      setCurrentIdx(currentIdx + 1);
      setCardStartTime(Date.now());
    }
    
    if (isRightSwipe && currentIdx > 0) {
      // Swipe right = Previous card
      setFlipped(false);
      setCurrentIdx(currentIdx - 1);
      setCardStartTime(Date.now());
    }
  };

  const startCards = () => {
    const weightedCards = questions.map((q: Question) => ({
      ...q,
      weight: calculateSRSWeight(progress[q.id])
    })).sort((a: { weight: number }, b: { weight: number}) => b.weight - a.weight);
    
    setCards(weightedCards);
    setStarted(true);
    setCurrentIdx(0);
    setFlipped(false);
    setCardStartTime(Date.now());
  };

  if (!started) {
    return (
      <div className="p-4">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">{lang === 'de' ? 'Kartenset Modus' : 'Flashcard Mode'}</h2>
          <div className="space-y-3 mb-6">
            <p className="text-gray-700">{lang === 'de' ? '✓ Intelligente Reihenfolge basiert auf deinen Schwächen' : '✓ Smart order based on your weaknesses'}</p>
            <p className="text-gray-700">{lang === 'de' ? '✓ Tippe auf die Karte zum Umdrehen' : '✓ Tap card to flip'}</p>
            <p className="text-gray-700">{lang === 'de' ? '✓ Bewerte dein Wissen selbst' : '✓ Self-assess your knowledge'}</p>
          </div>
          <button onClick={startCards} className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl py-4 font-bold shadow-lg">{lang === 'de' ? 'Kartenset starten' : 'Start Flashcards'}</button>
        </div>
      </div>
    );
  }

  if (currentIdx >= cards.length) {
    return (
      <div className="p-4">
        <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
          <div className="text-6xl mb-4">🎊</div>
          <h2 className="text-2xl font-bold mb-4">{lang === 'de' ? 'Alle Karten durchgegangen!' : 'All cards reviewed!'}</h2>
          <p className="text-gray-700 mb-6">{lang === 'de' ? 'Ausgezeichnete Arbeit!' : 'Excellent work!'}</p>
          <button onClick={() => setStarted(false)} className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl py-3 font-bold shadow-lg">{lang === 'de' ? 'Neu starten' : 'Restart'}</button>
        </div>
      </div>
    );
  }

  const q = cards[currentIdx];
  if (!q) return null;

  const CategoryIcon = CATEGORY_ICONS[q.category] || BookOpen;
  const strengthColor = !progress[q.id] ? 'bg-gray-400' : 
    progress[q.id].strength === 'strong' ? 'bg-green-400' :
    progress[q.id].strength === 'medium' ? 'bg-yellow-400' : 'bg-red-400';

  return (
    <div className="p-4 space-y-4">
      <div className="bg-white rounded-xl p-4 shadow-md flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="font-bold text-gray-800">{currentIdx + 1}/{cards.length}</span>
          <div className={`w-3 h-3 rounded-full ${strengthColor}`}></div>
        </div>
        <div className="flex items-center gap-2">
          <CategoryIcon size={16} className="text-green-600" />
          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-semibold">{q.category}</span>
        </div>
      </div>

      {/* Swipe hint */}
      <div className="text-center text-sm text-gray-600">
        {lang === 'de' ? '← Wischen für Navigation →' : '← Swipe to navigate →'}
      </div>

      {/* Navigation arrows for desktop + Card with swipe support */}
      <div className="relative">
        {/* Previous button */}
        {currentIdx > 0 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setFlipped(false);
              setCurrentIdx(currentIdx - 1);
              setCardStartTime(Date.now());
            }}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-all hover:scale-110"
            aria-label={lang === 'de' ? 'Vorherige Karte' : 'Previous card'}
          >
            <ChevronLeft size={24} className="text-gray-700" />
          </button>
        )}

        {/* Card with touch/swipe support */}
        <div 
          onClick={() => setFlipped(!flipped)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          className={`rounded-2xl p-8 min-h-72 cursor-pointer flex items-center justify-center text-center shadow-xl transition-all duration-500 transform ${flipped ? 'bg-gradient-to-br from-green-500 to-emerald-600' : 'bg-gradient-to-br from-blue-500 to-purple-600'} text-white hover:scale-105 touch-none select-none`}
        >
          <div className="w-full">
            <div className="text-sm opacity-80 mb-4 font-semibold uppercase tracking-wide">
              {flipped ? (lang === 'de' ? 'Antwort' : 'Answer') : (lang === 'de' ? 'Frage' : 'Question')}
            </div>
            <div className="text-xl font-bold leading-relaxed">
              {flipped ? (lang === 'de' ? q.options_de[q.correct_index] : q.options_en[q.correct_index]) : (lang === 'de' ? q.question_de : q.question_en)}
            </div>
            <div className="mt-6 text-sm opacity-75">
              {flipped ? '✓' : (lang === 'de' ? '👆 Tippen zum Umdrehen' : '👆 Tap to flip')}
            </div>
          </div>
        </div>

        {/* Next button */}
        {currentIdx < cards.length - 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setFlipped(false);
              setCurrentIdx(currentIdx + 1);
              setCardStartTime(Date.now());
            }}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-all hover:scale-110"
            aria-label={lang === 'de' ? 'Nächste Karte' : 'Next card'}
          >
            <ChevronRight size={24} className="text-gray-700" />
          </button>
        )}
      </div>

      {/* Action buttons */}
      {flipped ? (
        <div className="flex gap-3">
          <button onClick={(e) => { 
            e.stopPropagation(); 
            const answerTime = Math.floor((Date.now() - cardStartTime) / 1000);
            updateProgress(q.id, false, answerTime); 
            setFlipped(false); 
            setCurrentIdx(currentIdx + 1);
            setCardStartTime(Date.now());
          }} className="flex-1 bg-red-500 hover:bg-red-600 text-white py-4 rounded-xl font-bold shadow-lg transition min-h-[44px]">
            {lang === 'de' ? '✗ Nicht gewusst' : '✗ Didn\'t Know'}
          </button>
          <button onClick={(e) => { 
            e.stopPropagation(); 
            const answerTime = Math.floor((Date.now() - cardStartTime) / 1000);
            updateProgress(q.id, true, answerTime); 
            setFlipped(false); 
            setCurrentIdx(currentIdx + 1);
            setCardStartTime(Date.now());
          }} className="flex-1 bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-bold shadow-lg transition min-h-[44px]">
            {lang === 'de' ? '✓ Gewusst' : '✓ Knew It'}
          </button>
        </div>
      ) : (
        <button onClick={() => setFlipped(true)} className="w-full bg-white text-gray-800 py-4 rounded-xl font-bold shadow-md border-2 border-gray-200 hover:border-indigo-400 transition min-h-[44px]">
          {lang === 'de' ? '🔄 Karte umdrehen' : '🔄 Flip Card'}
        </button>
      )}
    </div>
  );
}
