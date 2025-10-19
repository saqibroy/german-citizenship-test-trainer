import { useState, useMemo } from 'react';
import {
  BookMarked, Star, CheckCircle2, XCircle, Brain, Sparkles,
  Calendar, Target, AlertCircle, Flame, Clock,
  ChevronRight, Lightbulb, Zap
} from 'lucide-react';
import { CITIZENSHIP_VOCABULARY } from './vacabulary.js';
import type { VocabPopupProps, HighlightedTextProps, VocabPageProps, StudyPlanPageProps, VocabTrainingPageProps, VocabularyItem } from './types';

// Helper function to normalize German text for matching
const normalizeText = (text: string) => {
  return text.toLowerCase()
    .replace(/ä/g, 'a').replace(/ö/g, 'o').replace(/ü/g, 'u').replace(/ß/g, 'ss');
};

// Extract core word from vocabulary entry (remove articles and handle alternatives)
const extractCoreWords = (vocabDe: string): string[] => {
  const words: string[] = [];
  
  // Remove articles (der, die, das)
  let cleaned = vocabDe.replace(/^(der|die|das)\s+/i, '').trim();
  
  // Handle slashes (e.g., "Abgeordnete / die Abgeordnete" or "der / die")
  if (cleaned.includes('/')) {
    const parts = cleaned.split('/').map(p => p.trim());
    parts.forEach(part => {
      // Remove article from each part
      const withoutArticle = part.replace(/^(der|die|das)\s+/i, '').trim();
      if (withoutArticle) {
        words.push(withoutArticle);
      }
    });
  } else {
    words.push(cleaned);
  }
  
  return words.filter(w => w.length > 0);
};

// Vocabulary Popup Component
export function VocabPopup({ word, onClose, lang }: VocabPopupProps) {
  const vocabItem = CITIZENSHIP_VOCABULARY.find((v: VocabularyItem) => 
    normalizeText(v.de).includes(normalizeText(word)) || 
    v.de.toLowerCase() === word.toLowerCase()
  );

  if (!vocabItem) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="text-indigo-600" size={24} />
            <h3 className="text-xl font-bold text-gray-800">{lang === 'de' ? 'Vokabel' : 'Vocabulary'}</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
        </div>

        <div className="space-y-4">
          <div className="bg-indigo-50 rounded-xl p-4">
            <p className="text-sm text-indigo-600 font-semibold mb-1">{lang === 'de' ? 'Deutsch' : 'German'}</p>
            <p className="text-2xl font-bold text-indigo-900">{vocabItem.de}</p>
          </div>

          <div className="bg-green-50 rounded-xl p-4">
            <p className="text-sm text-green-600 font-semibold mb-1">{lang === 'de' ? 'Englisch' : 'English'}</p>
            <p className="text-xl font-bold text-green-900">{vocabItem.en}</p>
          </div>

          <div className="border-t pt-4">
            <p className="text-sm text-gray-500 font-semibold mb-2">{lang === 'de' ? 'Kategorie' : 'Category'}</p>
            <p className="text-gray-800">{vocabItem.category}</p>
          </div>

          <div className="border-t pt-4">
            <p className="text-sm text-gray-500 font-semibold mb-2">{lang === 'de' ? 'Beispiel' : 'Example'}</p>
            <p className="text-gray-800 italic mb-2">&ldquo;{vocabItem.example_de}&rdquo;</p>
            <p className="text-gray-600 text-sm">&ldquo;{vocabItem.example_en}&rdquo;</p>
          </div>

          <div className="flex items-center gap-2 bg-yellow-50 rounded-lg p-3">
            <Star className="text-yellow-500" size={16} />
            <span className="text-sm font-semibold text-yellow-800">{vocabItem.tier_name}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Text with Vocabulary Highlighting Component
export function HighlightedText({ text, onClick }: Omit<HighlightedTextProps, 'lang'>) {
  // Build a map of vocabulary words for quick lookup
  const vocabMap = useMemo(() => {
    const map: Record<string, VocabularyItem> = {};
    CITIZENSHIP_VOCABULARY.forEach((item: VocabularyItem) => {
      // Extract all core words from the vocabulary entry
      const coreWords = extractCoreWords(item.de);
      
      coreWords.forEach(coreWord => {
        const lower = coreWord.toLowerCase();
        const normalized = normalizeText(lower);
        
        // Map both original and normalized versions to the vocabulary item
        map[lower] = item;
        map[normalized] = item;
        
        // Also handle plural forms (simple heuristic: add 'n', 'en', 'e', 's')
        if (!lower.endsWith('n')) {
          map[lower + 'n'] = item;
          map[normalized + 'n'] = item;
        }
        if (!lower.endsWith('en')) {
          map[lower + 'en'] = item;
          map[normalized + 'en'] = item;
        }
        if (!lower.endsWith('e')) {
          map[lower + 'e'] = item;
          map[normalized + 'e'] = item;
        }
        if (!lower.endsWith('s')) {
          map[lower + 's'] = item;
          map[normalized + 's'] = item;
        }
      });
    });
    return map;
  }, []);

  // Split text into words and identify vocabulary words
  const renderHighlightedText = () => {
    const words = text.split(/(\s+|[.,!?;:])/);
    return words.map((word: string, idx: number) => {
      const cleanWord = word.toLowerCase().replace(/[.,!?;:]/g, '');
      const normalized = normalizeText(cleanWord);
      
      if (vocabMap[cleanWord] || vocabMap[normalized]) {
        return (
          <span
            key={idx}
            className="bg-yellow-200 hover:bg-yellow-300 cursor-pointer px-1 rounded transition-colors border-b-2 border-yellow-400"
            onClick={() => onClick(cleanWord)}
          >
            {word}
          </span>
        );
      }
      return <span key={idx}>{word}</span>;
    });
  };

  return <div className="inline">{renderHighlightedText()}</div>;
}

// Vocabulary Page Component
export function VocabPage({ lang, vocabulary, updateVocabProgress, vocabProgress, favoriteVocab, toggleFavoriteVocab }: VocabPageProps) {
  const [mode, setMode] = useState<'flashcards' | 'list'>('list');
  const [filter, setFilter] = useState<'all' | 'favorites' | 'tier1' | 'tier2' | 'tier3'>('all');
  const [currentCardIdx, setCurrentCardIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // SRS weight calculation for flashcards (same as training)
  const calculateVocabWeight = (vocabId: string) => {
    const vProgress = vocabProgress[vocabId];
    const vocab = vocabulary.find((v: VocabularyItem) => v.de === vocabId);
    const tierBonus = vocab ? 
      (vocab.tier === 1 ? 400 : vocab.tier === 2 ? 300 : 200) : 0;
    
    if (!vProgress) return 8000 + tierBonus; // NEW words
    
    const { correct, incorrect, lastSeen } = vProgress;
    const total = correct + incorrect;
    const accuracy = total > 0 ? correct / total : 0;
    const daysSince = lastSeen ? 
      Math.floor((Date.now() - new Date(lastSeen).getTime()) / (1000 * 60 * 60 * 24)) : 999;
    
    let strength: 'weak' | 'medium' | 'strong' = 'weak';
    if (total >= 3 && accuracy >= 0.8) strength = 'strong';
    else if (total >= 2 && accuracy >= 0.6) strength = 'medium';
    
    let reviewInterval = 1;
    if (strength === 'strong') {
      if (correct >= 10) reviewInterval = 60;
      else if (correct >= 8) reviewInterval = 30;
      else if (correct >= 6) reviewInterval = 14;
      else if (correct >= 4) reviewInterval = 7;
      else if (correct >= 3) reviewInterval = 3;
      else reviewInterval = 1;
    } else if (strength === 'medium') {
      if (correct >= 4) reviewInterval = 3;
      else if (correct >= 2) reviewInterval = 2;
      else reviewInterval = 1;
    } else {
      reviewInterval = 0.5;
    }
    
    let weight = 100;
    if (daysSince >= reviewInterval) {
      const overdueDays = daysSince - reviewInterval;
      weight = 9000 + (overdueDays * 100) + tierBonus;
      if (strength === 'weak') weight += 1000;
    } else if (strength === 'weak' || accuracy < 0.5) {
      weight = 7000 + (daysSince * 10) + tierBonus;
    } else if (strength === 'medium') {
      if (daysSince >= reviewInterval * 0.7) {
        weight = 4000 + (daysSince * 5) + tierBonus;
      } else {
        weight = 2000 + tierBonus;
      }
    } else if (strength === 'strong') {
      if (daysSince >= reviewInterval * 0.8) {
        weight = 1500 + (daysSince * 2) + tierBonus;
      } else {
        weight = 50 + tierBonus;
      }
    }
    
    if (incorrect > correct && total >= 2) weight *= 1.3;
    if (strength === 'strong' && correct >= 8 && daysSince < reviewInterval * 0.5) {
      weight = Math.max(10, weight * 0.3);
    }
    
    return weight;
  };

  // Filter and randomize vocabulary based on SRS weight and tier priority
  const filteredVocab = useMemo(() => {
    let filtered = vocabulary;
    
    if (filter === 'favorites') {
      filtered = vocabulary.filter((v: VocabularyItem) => favoriteVocab.includes(v.de));
    } else if (filter === 'tier1') {
      filtered = vocabulary.filter((v: VocabularyItem) => v.tier === 1);
    } else if (filter === 'tier2') {
      filtered = vocabulary.filter((v: VocabularyItem) => v.tier === 2);
    } else if (filter === 'tier3') {
      filtered = vocabulary.filter((v: VocabularyItem) => v.tier === 3);
    }

    if (searchTerm) {
      filtered = filtered.filter((v: VocabularyItem) => 
        v.de.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply SRS weighting and randomization
    type WeightedVocab = VocabularyItem & { srsWeight: number };
    const weighted: WeightedVocab[] = filtered.map((v: VocabularyItem) => ({
      ...v,
      srsWeight: calculateVocabWeight(v.de)
    })).sort((a: WeightedVocab, b: WeightedVocab) => b.srsWeight - a.srsWeight);
    
    // Take top 80% weighted, then shuffle for randomness
    const topWeighted = weighted.slice(0, Math.max(Math.ceil(weighted.length * 0.8), filtered.length));
    const shuffled = [...topWeighted];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    return shuffled.map(({ srsWeight, ...vocab }) => vocab as VocabularyItem);
  }, [vocabulary, filter, favoriteVocab, searchTerm, vocabProgress]);

  const handleCardRating = (known: boolean) => {
    const currentWord = filteredVocab[currentCardIdx]?.de;
    if (currentWord) {
      updateVocabProgress(currentWord, known);
      setFlipped(false);
      setCurrentCardIdx((prev) => (prev + 1) % filteredVocab.length);
    }
  };

  if (mode === 'flashcards') {
    if (filteredVocab.length === 0) {
      return (
        <div className="p-4">
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
            <AlertCircle className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {lang === 'de' ? 'Keine Vokabeln gefunden' : 'No vocabulary found'}
            </h3>
            <p className="text-gray-600 mb-6">
              {lang === 'de' ? 'Ändere den Filter oder füge Favoriten hinzu.' : 'Change the filter or add favorites.'}
            </p>
            <button onClick={() => setMode('list')} className="bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold">
              {lang === 'de' ? 'Zur Liste' : 'Go to List'}
            </button>
          </div>
        </div>
      );
    }

    const currentVocab = filteredVocab[currentCardIdx];
    const progress = vocabProgress[currentVocab.de];
    const correct = progress?.correct || 0;
    const incorrect = progress?.incorrect || 0;
    const total = correct + incorrect;
    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;

    return (
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button onClick={() => setMode('list')} className="text-indigo-600 font-semibold flex items-center gap-1">
            ← {lang === 'de' ? 'Zurück' : 'Back'}
          </button>
          <span className="text-sm text-gray-600 font-semibold">
            {currentCardIdx + 1} / {filteredVocab.length}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-xl p-3 shadow-md">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all" 
              style={{ width: `${((currentCardIdx + 1) / filteredVocab.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Flashcard */}
        <div 
          onClick={() => setFlipped(!flipped)} 
          className={`rounded-2xl p-8 min-h-80 cursor-pointer flex flex-col items-center justify-center text-center shadow-xl transition-all duration-500 transform hover:scale-105 ${
            flipped 
              ? 'bg-gradient-to-br from-green-500 to-emerald-600' 
              : 'bg-gradient-to-br from-blue-500 to-purple-600'
          } text-white`}
        >
          <div className="w-full">
            <div className="text-sm opacity-80 mb-4 font-semibold uppercase tracking-wide">
              {flipped ? (lang === 'de' ? 'Englisch' : 'English') : (lang === 'de' ? 'Deutsch' : 'German')}
            </div>
            <div className="text-3xl font-bold leading-relaxed mb-6">
              {flipped ? currentVocab.en : currentVocab.de}
            </div>
            {flipped && (
              <div className="text-sm opacity-90 italic mt-4 border-t border-white border-opacity-30 pt-4">
                &ldquo;{lang === 'de' ? currentVocab.example_de : currentVocab.example_en}&rdquo;
              </div>
            )}
            <div className="mt-6 text-sm opacity-75">
              {flipped ? '✓' : (lang === 'de' ? '👆 Tippen zum Umdrehen' : '👆 Tap to flip')}
            </div>
          </div>
        </div>

        {/* Stats */}
        {total > 0 && (
          <div className="bg-white rounded-xl p-4 shadow-md">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">{lang === 'de' ? 'Genauigkeit' : 'Accuracy'}</span>
              <span className={`font-bold ${accuracy >= 80 ? 'text-green-600' : accuracy >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                {accuracy}% ({correct}/{total})
              </span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {flipped ? (
          <div className="flex gap-3">
            <button 
              onClick={(e) => { e.stopPropagation(); handleCardRating(false); }} 
              className="flex-1 bg-red-500 hover:bg-red-600 text-white py-4 rounded-xl font-bold shadow-lg transition flex items-center justify-center gap-2"
            >
              <XCircle size={20} />
              {lang === 'de' ? 'Nicht gewusst' : 'Didn\'t Know'}
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); handleCardRating(true); }} 
              className="flex-1 bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-bold shadow-lg transition flex items-center justify-center gap-2"
            >
              <CheckCircle2 size={20} />
              {lang === 'de' ? 'Gewusst' : 'Knew It'}
            </button>
          </div>
        ) : (
          <div className="flex gap-3">
            <button 
              onClick={() => setFlipped(true)} 
              className="flex-1 bg-white text-gray-800 py-4 rounded-xl font-bold shadow-md border-2 border-gray-200 hover:border-indigo-400 transition"
            >
              {lang === 'de' ? '🔄 Karte umdrehen' : '🔄 Flip Card'}
            </button>
            <button 
              onClick={() => toggleFavoriteVocab(currentVocab.de)} 
              className={`px-6 py-4 rounded-xl font-bold shadow-md transition ${
                favoriteVocab.includes(currentVocab.de)
                  ? 'bg-yellow-400 text-yellow-900'
                  : 'bg-white text-gray-800 border-2 border-gray-200'
              }`}
            >
              <Star size={20} fill={favoriteVocab.includes(currentVocab.de) ? 'currentColor' : 'none'} />
            </button>
          </div>
        )}

        {/* Category Badge */}
        <div className="flex items-center justify-center gap-2">
          <span className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-semibold">
            {currentVocab.category}
          </span>
          <span className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-semibold">
            ⭐ {currentVocab.tier_name}
          </span>
        </div>
      </div>
    );
  }

  // List Mode
  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-2">
          <BookMarked size={28} />
          <h2 className="text-2xl font-bold">{lang === 'de' ? 'Vokabeln' : 'Vocabulary'}</h2>
        </div>
        <p className="opacity-90 text-sm">
          {lang === 'de' 
            ? `${filteredVocab.length} Wörter • Lerne die wichtigsten Begriffe für den Test` 
            : `${filteredVocab.length} words • Learn the most important terms for the test`}
        </p>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl p-4 shadow-md">
        <input
          type="text"
          placeholder={lang === 'de' ? '🔍 Suche...' : '🔍 Search...'}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-indigo-400 focus:outline-none"
        />
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-xl p-2 shadow-md flex gap-2 overflow-x-auto">
        {['all', 'tier1', 'tier2', 'tier3', 'favorites'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            className={`px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition ${
              filter === f
                ? 'bg-indigo-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {f === 'all' && (lang === 'de' ? '🌐 Alle' : '🌐 All')}
            {f === 'tier1' && (lang === 'de' ? '⭐⭐⭐ Tier 1' : '⭐⭐⭐ Tier 1')}
            {f === 'tier2' && (lang === 'de' ? '⭐⭐ Tier 2' : '⭐⭐ Tier 2')}
            {f === 'tier3' && (lang === 'de' ? '⭐ Tier 3' : '⭐ Tier 3')}
            {f === 'favorites' && `⭐ ${lang === 'de' ? 'Favoriten' : 'Favorites'} (${favoriteVocab.length})`}
          </button>
        ))}
      </div>

      {/* Learning Stats */}
      <div className="bg-white rounded-xl p-4 shadow-md">
        <h3 className="font-bold text-gray-800 mb-3 text-sm">
          {lang === 'de' ? '📊 Lernstatistik' : '📊 Learning Stats'}
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-blue-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <div className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                {vocabulary.filter((v: VocabularyItem) => !vocabProgress[v.de]).length}
              </div>
              <span className="text-blue-900 font-semibold text-sm">
                {lang === 'de' ? 'Neu' : 'New'}
              </span>
            </div>
            <p className="text-xs text-blue-700">{lang === 'de' ? 'Noch nicht gelernt' : 'Not learned yet'}</p>
          </div>

          <div className="bg-red-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <div className="bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                {vocabulary.filter((v: VocabularyItem) => {
                  const p = vocabProgress[v.de];
                  if (!p) return false;
                  const total = p.correct + p.incorrect;
                  const accuracy = total > 0 ? p.correct / total : 0;
                  return total >= 1 && accuracy < 0.5;
                }).length}
              </div>
              <span className="text-red-900 font-semibold text-sm">
                {lang === 'de' ? 'Schwach' : 'Weak'}
              </span>
            </div>
            <p className="text-xs text-red-700">{lang === 'de' ? '< 50% richtig' : '< 50% correct'}</p>
          </div>

          <div className="bg-yellow-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <div className="bg-yellow-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                {vocabulary.filter((v: VocabularyItem) => {
                  const p = vocabProgress[v.de];
                  if (!p) return false;
                  const total = p.correct + p.incorrect;
                  const accuracy = total > 0 ? p.correct / total : 0;
                  return total >= 2 && accuracy >= 0.5 && accuracy < 0.8;
                }).length}
              </div>
              <span className="text-yellow-900 font-semibold text-sm">
                {lang === 'de' ? 'Mittel' : 'Learning'}
              </span>
            </div>
            <p className="text-xs text-yellow-700">{lang === 'de' ? '50-80% richtig' : '50-80% correct'}</p>
          </div>

          <div className="bg-green-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <div className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                {vocabulary.filter((v: VocabularyItem) => {
                  const p = vocabProgress[v.de];
                  if (!p) return false;
                  const total = p.correct + p.incorrect;
                  const accuracy = total > 0 ? p.correct / total : 0;
                  return total >= 3 && accuracy >= 0.8;
                }).length}
              </div>
              <span className="text-green-900 font-semibold text-sm">
                {lang === 'de' ? 'Bekannt' : 'Known'}
              </span>
            </div>
            <p className="text-xs text-green-700">{lang === 'de' ? '≥ 80% richtig' : '≥ 80% correct'}</p>
          </div>
        </div>
      </div>

      {/* Start Flashcards Button */}
      <button 
        onClick={() => { setMode('flashcards'); setCurrentCardIdx(0); setFlipped(false); }}
        className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl p-4 font-bold shadow-lg flex items-center justify-between"
      >
        <span>{lang === 'de' ? '🧠 Karteikarten starten' : '🧠 Start Flashcards'}</span>
        <ChevronRight />
      </button>

      {/* Vocabulary List */}
      <div className="space-y-3">
        {filteredVocab.map((vocab: VocabularyItem, idx: number) => {
          const progress = vocabProgress[vocab.de];
          const correct = progress?.correct || 0;
          const incorrect = progress?.incorrect || 0;
          const total = correct + incorrect;
          const isFavorite = favoriteVocab.includes(vocab.de);

          return (
            <div key={idx} className="bg-white rounded-xl p-4 shadow-md">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-gray-800">{vocab.de}</h3>
                    {vocab.tier === 1 && <span className="text-yellow-500">⭐</span>}
                  </div>
                  <p className="text-green-700 font-semibold">{vocab.en}</p>
                </div>
                <button
                  onClick={() => toggleFavoriteVocab(vocab.de)}
                  className={`p-2 rounded-lg transition ${isFavorite ? 'text-yellow-500' : 'text-gray-300 hover:text-yellow-500'}`}
                >
                  <Star size={20} fill={isFavorite ? 'currentColor' : 'none'} />
                </button>
              </div>
              <p className="text-sm text-gray-600 mb-2">{vocab.category}</p>
              {total > 0 && (
                <div className="text-xs text-gray-500 mt-2 flex items-center gap-2">
                  <span>{lang === 'de' ? 'Genauigkeit:' : 'Accuracy:'}</span>
                  <span className={`font-bold ${
                    correct / total >= 0.8 ? 'text-green-600' : 
                    correct / total >= 0.5 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {Math.round((correct / total) * 100)}%
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Study Plan Page Component
export function StudyPlanPage({ lang, progress, questions, quizHistory, studyStreak }: Omit<StudyPlanPageProps, 'startDate'>) {
  const daysRemaining = Math.max(0, Math.ceil((new Date('2025-12-02').getTime() - Date.now()) / (1000 * 60 * 60 * 24)));
  const weeksRemaining = Math.ceil(daysRemaining / 7);
  const currentWeek = Math.max(1, Math.min(8, 8 - weeksRemaining + 1));

  const answered = Object.keys(progress).length;
  const avgScore = quizHistory.length > 0 
    ? Math.round(quizHistory.reduce((sum: number, q: any) => sum + q.percentage, 0) / quizHistory.length)
    : 0;
  
  const strongCount = Object.values(progress).filter((p: any) => p.strength === 'strong').length;
  const weakCount = Object.values(progress).filter((p: any) => p.strength === 'weak').length;

  // Weekly targets
  const weeklyTargets: Record<number, { questions: number; avgScore: number; strongCategories: number }> = {
    1: { questions: 50, avgScore: 50, strongCategories: 0 },
    2: { questions: 100, avgScore: 55, strongCategories: 2 },
    3: { questions: 150, avgScore: 60, strongCategories: 4 },
    4: { questions: 200, avgScore: 65, strongCategories: 6 },
    5: { questions: 250, avgScore: 70, strongCategories: 8 },
    6: { questions: 280, avgScore: 75, strongCategories: 10 },
    7: { questions: 300, avgScore: 80, strongCategories: 11 },
    8: { questions: 310, avgScore: 85, strongCategories: 12 }
  };

  const currentTarget = weeklyTargets[currentWeek] || weeklyTargets[8];
  // const onTrack = answered >= currentTarget.questions && avgScore >= currentTarget.avgScore;

  // Calculate pace status
  let paceStatus = 'green';
  let paceMessage = lang === 'de' ? 'Auf Kurs - weiter so!' : 'On track - keep going!';
  
  if (answered < currentTarget.questions * 0.7 || avgScore < currentTarget.avgScore - 10) {
    paceStatus = 'red';
    paceMessage = lang === 'de' ? 'Hinten - mehr üben!' : 'Behind - practice more!';
  } else if (answered < currentTarget.questions * 0.9 || avgScore < currentTarget.avgScore - 5) {
    paceStatus = 'yellow';
    paceMessage = lang === 'de' ? 'Etwas hinten - 15 Min. mehr täglich' : 'Slightly behind - add 15 min daily';
  }

  // Daily recommendation
  const getDailyRecommendation = () => {
    if (weakCount > 5) {
      return lang === 'de' 
        ? '🎯 Heute: 30 Min. Karteikarten für schwache Bereiche'
        : '🎯 Today: 30 min flashcards for weak areas';
    } else if (quizHistory.length === 0 || (Date.now() - new Date(quizHistory[0]?.date || 0).getTime()) > 172800000) {
      return lang === 'de'
        ? '📝 Heute: Vollständiges 33-Fragen-Quiz'
        : '📝 Today: Full 33-question quiz';
    } else if (answered < questions.length * 0.5) {
      return lang === 'de'
        ? '📚 Heute: 20 neue Fragen in Karteikarten'
        : '📚 Today: 20 new questions in flashcards';
    } else {
      return lang === 'de'
        ? '💪 Heute: Quiz + 10 Min. Vokabeln'
        : '💪 Today: Quiz + 10 min vocabulary';
    }
  };

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="bg-gradient-to-br from-orange-600 to-red-600 text-white rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-2">
          <Calendar size={28} />
          <h2 className="text-2xl font-bold">{lang === 'de' ? 'Lernplan' : 'Study Plan'}</h2>
        </div>
        <p className="opacity-90 text-sm">
          {lang === 'de' ? '8-Wochen-Plan bis zur Prüfung' : '8-week plan until exam'}
        </p>
      </div>

      {/* Countdown Card */}
      <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-red-500">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <Clock className="text-red-500" size={24} />
            <div>
              <h3 className="text-lg font-bold text-gray-800">{lang === 'de' ? 'Zeit bis zur Prüfung' : 'Time Until Exam'}</h3>
              <p className="text-3xl font-black text-red-600 mt-1">{daysRemaining} {lang === 'de' ? 'Tage' : 'Days'}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">{lang === 'de' ? 'Woche' : 'Week'}</p>
            <p className="text-2xl font-bold text-gray-800">{currentWeek}/8</p>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-orange-500 to-red-500 h-3 rounded-full transition-all" 
            style={{ width: `${(currentWeek / 8) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Pace Status */}
      <div className={`rounded-xl p-6 shadow-lg border-l-4 ${
        paceStatus === 'green' ? 'bg-green-50 border-green-500' :
        paceStatus === 'yellow' ? 'bg-yellow-50 border-yellow-500' :
        'bg-red-50 border-red-500'
      }`}>
        <div className="flex items-center gap-3 mb-2">
          {paceStatus === 'green' && <CheckCircle2 className="text-green-600" size={24} />}
          {paceStatus === 'yellow' && <AlertCircle className="text-yellow-600" size={24} />}
          {paceStatus === 'red' && <AlertCircle className="text-red-600" size={24} />}
          <h3 className={`text-lg font-bold ${
            paceStatus === 'green' ? 'text-green-800' :
            paceStatus === 'yellow' ? 'text-yellow-800' :
            'text-red-800'
          }`}>
            {lang === 'de' ? 'Tempo-Status' : 'Pace Status'}
          </h3>
        </div>
        <p className={`font-semibold ${
          paceStatus === 'green' ? 'text-green-700' :
          paceStatus === 'yellow' ? 'text-yellow-700' :
          'text-red-700'
        }`}>
          {paceMessage}
        </p>
      </div>

      {/* Week Progress */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Target size={20} />
          {lang === 'de' ? `Woche ${currentWeek} Ziele` : `Week ${currentWeek} Targets`}
        </h3>
        
        <div className="space-y-4">
          {/* Questions Answered */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">{lang === 'de' ? 'Fragen beantwortet' : 'Questions Answered'}</span>
              <span className={`font-bold ${answered >= currentTarget.questions ? 'text-green-600' : 'text-orange-600'}`}>
                {answered} / {currentTarget.questions}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all ${
                  answered >= currentTarget.questions ? 'bg-green-500' : 'bg-orange-500'
                }`}
                style={{ width: `${Math.min(100, (answered / currentTarget.questions) * 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Average Score */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">{lang === 'de' ? 'Durchschnittliche Punktzahl' : 'Average Score'}</span>
              <span className={`font-bold ${avgScore >= currentTarget.avgScore ? 'text-green-600' : 'text-orange-600'}`}>
                {avgScore}% / {currentTarget.avgScore}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all ${
                  avgScore >= currentTarget.avgScore ? 'bg-green-500' : 'bg-orange-500'
                }`}
                style={{ width: `${Math.min(100, (avgScore / currentTarget.avgScore) * 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Strong Areas */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">{lang === 'de' ? 'Starke Bereiche' : 'Strong Areas'}</span>
              <span className={`font-bold ${strongCount >= currentTarget.strongCategories ? 'text-green-600' : 'text-orange-600'}`}>
                {strongCount} / {currentTarget.strongCategories}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all ${
                  strongCount >= currentTarget.strongCategories ? 'bg-green-500' : 'bg-orange-500'
                }`}
                style={{ width: `${Math.min(100, (strongCount / currentTarget.strongCategories) * 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Recommendation */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-3">
          <Lightbulb size={24} />
          <h3 className="text-lg font-bold">{lang === 'de' ? 'Heute empfohlen' : 'Recommended Today'}</h3>
        </div>
        <p className="text-lg font-semibold">{getDailyRecommendation()}</p>
      </div>

      {/* Study Streak */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-3">
          <Flame className="text-orange-500" size={24} />
          <div>
            <h3 className="text-lg font-bold text-gray-800">{lang === 'de' ? 'Lern-Streak' : 'Study Streak'}</h3>
            <p className="text-3xl font-bold text-orange-600 mt-1">{studyStreak} {lang === 'de' ? 'Tage' : 'Days'}</p>
          </div>
        </div>
        <p className="text-sm text-gray-600">
          {studyStreak >= 7 
            ? (lang === 'de' ? '🔥 Unglaublich! Weiter so!' : '🔥 Amazing! Keep it up!')
            : studyStreak >= 3
            ? (lang === 'de' ? '💪 Guter Fortschritt!' : '💪 Good progress!')
            : (lang === 'de' ? '🌱 Baue deinen Streak auf!' : '🌱 Build your streak!')}
        </p>
      </div>

      {/* 8-Week Overview */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-bold text-gray-800 mb-4">{lang === 'de' ? '8-Wochen-Übersicht' : '8-Week Overview'}</h3>
        <div className="space-y-3">
          {Object.entries(weeklyTargets).map(([week, target]) => {
            const weekNum = parseInt(week);
            const isPast = weekNum < currentWeek;
            const isCurrent = weekNum === currentWeek;
            // const isFuture = weekNum > currentWeek;

            return (
              <div 
                key={week} 
                className={`p-4 rounded-lg border-2 ${
                  isCurrent ? 'border-indigo-500 bg-indigo-50' :
                  isPast ? 'border-green-200 bg-green-50' :
                  'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {isPast && <CheckCircle2 className="text-green-600" size={20} />}
                    {isCurrent && <Zap className="text-indigo-600" size={20} />}
                    <div>
                      <h4 className={`font-bold ${isCurrent ? 'text-indigo-800' : 'text-gray-800'}`}>
                        {lang === 'de' ? `Woche ${weekNum}` : `Week ${weekNum}`}
                      </h4>
                      <p className="text-xs text-gray-600">
                        {target.questions} {lang === 'de' ? 'Fragen' : 'questions'} • {target.avgScore}% {lang === 'de' ? 'Durchschnitt' : 'average'}
                      </p>
                    </div>
                  </div>
                  {isCurrent && (
                    <span className="bg-indigo-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      {lang === 'de' ? 'AKTUELL' : 'CURRENT'}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Vocabulary Training Page with SRS
export function VocabTrainingPage({ lang, vocabProgress, updateVocabProgress }: VocabTrainingPageProps) {
  const [started, setStarted] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [sessionVocab, setSessionVocab] = useState<VocabularyItem[]>([]);
  const [sessionStats, setSessionStats] = useState({ correct: 0, incorrect: 0, total: 0 });

  // Enhanced SRS weight calculation for vocabulary (Anki/SM-2 style)
  // Priority system:
  // 1. DUE items (past their review interval) - HIGHEST
  // 2. WEAK items (need practice) - HIGH
  // 3. NEW items (never seen) - MEDIUM-HIGH
  // 4. MEDIUM items - MEDIUM
  // 5. STRONG items (only when due or for occasional review) - LOW
  
  const calculateVocabWeight = (vocabId: string) => {
    const vProgress = vocabProgress[vocabId];
    
    // Get vocabulary tier for additional priority
    const vocab = CITIZENSHIP_VOCABULARY.find((v: VocabularyItem) => v.de === vocabId);
    const tierBonus = vocab ? 
      (vocab.tier === 1 ? 400 : vocab.tier === 2 ? 300 : 200) : 0;
    
    // NEW word - never seen before
    if (!vProgress) {
      return 8000 + tierBonus; // High priority for new words (but lower than due items)
    }
    
    const { correct, incorrect, lastSeen } = vProgress;
    const total = correct + incorrect;
    const accuracy = total > 0 ? correct / total : 0;
    
    // Calculate days since last seen
    const daysSince = lastSeen ? 
      Math.floor((Date.now() - new Date(lastSeen).getTime()) / (1000 * 60 * 60 * 24)) : 999;
    
    // Determine strength level
    let strength: 'weak' | 'medium' | 'strong' = 'weak';
    if (total >= 3 && accuracy >= 0.8) strength = 'strong';
    else if (total >= 2 && accuracy >= 0.6) strength = 'medium';
    
    // Calculate review interval based on strength (Anki-style exponential backoff)
    let reviewInterval = 1; // days
    
    if (strength === 'strong') {
      // Strong words: exponential intervals (1 → 3 → 7 → 14 → 30 → 60 days)
      if (correct >= 10) reviewInterval = 60;
      else if (correct >= 8) reviewInterval = 30;
      else if (correct >= 6) reviewInterval = 14;
      else if (correct >= 4) reviewInterval = 7;
      else if (correct >= 3) reviewInterval = 3;
      else reviewInterval = 1;
    } else if (strength === 'medium') {
      // Medium words: slower progression (1 → 2 → 3 days)
      if (correct >= 4) reviewInterval = 3;
      else if (correct >= 2) reviewInterval = 2;
      else reviewInterval = 1;
    } else {
      // Weak words: review frequently (0.5 days = 12 hours)
      reviewInterval = 0.5;
    }
    
    let weight = 100;
    
    // PRIORITY 1: DUE items (past review interval) - HIGHEST PRIORITY
    if (daysSince >= reviewInterval) {
      const overdueDays = daysSince - reviewInterval;
      weight = 9000 + (overdueDays * 100) + tierBonus;
      
      // Extra boost for overdue weak items
      if (strength === 'weak') {
        weight += 1000;
      }
    }
    
    // PRIORITY 2: WEAK items (need practice) - HIGH PRIORITY
    else if (strength === 'weak' || accuracy < 0.5) {
      weight = 7000 + (daysSince * 10) + tierBonus;
    }
    
    // PRIORITY 3: MEDIUM items - MEDIUM PRIORITY
    else if (strength === 'medium') {
      // Show medium items when they're getting close to due
      if (daysSince >= reviewInterval * 0.7) {
        weight = 4000 + (daysSince * 5) + tierBonus;
      } else {
        weight = 2000 + tierBonus;
      }
    }
    
    // PRIORITY 4: STRONG items - LOW PRIORITY (only when due or occasional review)
    else if (strength === 'strong') {
      if (daysSince >= reviewInterval * 0.8) {
        // Strong items approaching their due date
        weight = 1500 + (daysSince * 2) + tierBonus;
      } else {
        // Strong items not due yet - very low priority
        weight = 50 + tierBonus;
      }
    }
    
    // Boost for words with more incorrect than correct
    if (incorrect > correct && total >= 2) {
      weight *= 1.3;
    }
    
    // Penalty for very well-known items that aren't due
    if (strength === 'strong' && correct >= 8 && daysSince < reviewInterval * 0.5) {
      weight = Math.max(10, weight * 0.3); // Significantly reduce priority
    }
    
    return weight;
  };

  // Calculate session size based on progress
  const calculateSessionSize = () => {
    const answeredCount = Object.keys(vocabProgress).length;
    const strongCount = Object.values(vocabProgress).filter((p: any) => {
      const total = p.correct + p.incorrect;
      const accuracy = total > 0 ? p.correct / total : 0;
      return total >= 3 && accuracy >= 0.75;
    }).length;
    const accuracyRate = answeredCount > 0 ? strongCount / answeredCount : 0;
    
    let baseSize = 15; // Start smaller for vocabulary
    
    if (answeredCount > 30 && accuracyRate > 0.6) baseSize = 20;
    if (answeredCount > 60 && accuracyRate > 0.7) baseSize = 25;
    if (answeredCount > 90 && accuracyRate > 0.75) baseSize = 30;
    
    return baseSize;
  };

  // Select vocabulary for training - Prioritizes Tier 1 (Essential), then Tier 2 (Important), then Tier 3
  const selectVocabForTraining = (count: number): VocabularyItem[] => {
    type WeightedVocab = VocabularyItem & { srsWeight: number };
    
    // Calculate weights for all vocabulary with tier-based priority
    const weightedVocab: WeightedVocab[] = CITIZENSHIP_VOCABULARY.map((v: VocabularyItem) => ({
      ...v,
      srsWeight: calculateVocabWeight(v.de)
    })).sort((a: WeightedVocab, b: WeightedVocab) => {
      // First sort by tier (lower tier number = higher priority)
      if (a.tier !== b.tier) {
        return a.tier - b.tier;
      }
      // Then by SRS weight (higher weight = needs more practice)
      return b.srsWeight - a.srsWeight;
    });

    // Separate by tier and mastery level
    const tier1Words = weightedVocab.filter(v => v.tier === 1);
    const tier2Words = weightedVocab.filter(v => v.tier === 2);
    const tier3Words = weightedVocab.filter(v => v.tier === 3);

    // Helper to check if a word is mastered (80%+ accuracy with at least 3 attempts)
    const isMastered = (vocabDe: string): boolean => {
      const p = vocabProgress[vocabDe];
      if (!p) return false;
      const total = p.correct + p.incorrect;
      const accuracy = total > 0 ? p.correct / total : 0;
      return total >= 3 && accuracy >= 0.8;
    };

    // Strategy: Focus on Tier 1 until 80% mastered, then move to Tier 2, etc.
    const tier1Mastered = tier1Words.filter(v => isMastered(v.de));
    const tier2Mastered = tier2Words.filter(v => isMastered(v.de));
    
    const tier1MasteryRate = tier1Words.length > 0 ? tier1Mastered.length / tier1Words.length : 1;
    const tier2MasteryRate = tier2Words.length > 0 ? tier2Mastered.length / tier2Words.length : 1;

    let selection: WeightedVocab[] = [];

    if (tier1MasteryRate < 0.8) {
      // Focus on Tier 1: 70% Tier 1, 20% Tier 2, 10% Tier 3
      const tier1Count = Math.ceil(count * 0.7);
      const tier2Count = Math.ceil(count * 0.2);
      const tier3Count = Math.ceil(count * 0.1);
      
      selection = [
        ...tier1Words.filter(v => !isMastered(v.de)).slice(0, tier1Count),
        ...tier2Words.slice(0, tier2Count),
        ...tier3Words.slice(0, tier3Count)
      ];
    } else if (tier2MasteryRate < 0.8) {
      // Focus on Tier 2: 20% Tier 1 (review), 60% Tier 2, 20% Tier 3
      const tier1Count = Math.ceil(count * 0.2);
      const tier2Count = Math.ceil(count * 0.6);
      const tier3Count = Math.ceil(count * 0.2);
      
      selection = [
        ...tier1Words.slice(0, tier1Count),
        ...tier2Words.filter(v => !isMastered(v.de)).slice(0, tier2Count),
        ...tier3Words.slice(0, tier3Count)
      ];
    } else {
      // Focus on Tier 3: 15% Tier 1 (review), 25% Tier 2 (review), 60% Tier 3
      const tier1Count = Math.ceil(count * 0.15);
      const tier2Count = Math.ceil(count * 0.25);
      const tier3Count = Math.ceil(count * 0.6);
      
      selection = [
        ...tier1Words.slice(0, tier1Count),
        ...tier2Words.slice(0, tier2Count),
        ...tier3Words.filter(v => !isMastered(v.de)).slice(0, tier3Count)
      ];
    }

    // Remove duplicates
    const unique = Array.from(new Set(selection.map(v => v.de)))
      .map(de => selection.find(v => v.de === de))
      .filter((v): v is WeightedVocab => v !== undefined);
    
    // RANDOMIZE the final selection - this is the key change!
    const shuffled = [...unique];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    // Strip srsWeight property before returning
    return shuffled.slice(0, count).map(({ srsWeight, ...vocab }) => vocab as VocabularyItem);
  };

  const startTraining = () => {
    const sessionSize = calculateSessionSize();
    const selected = selectVocabForTraining(sessionSize);
    setSessionVocab(selected);
    setStarted(true);
    setCurrentIdx(0);
    setShowAnswer(false);
    setSessionStats({ correct: 0, incorrect: 0, total: 0 });
  };

  const handleAnswer = (knew: boolean) => {
    const vocab = sessionVocab[currentIdx];
    updateVocabProgress(vocab.de, knew);
    setSessionStats(prev => ({
      correct: prev.correct + (knew ? 1 : 0),
      incorrect: prev.incorrect + (knew ? 0 : 1),
      total: prev.total + 1
    }));
    
    if (currentIdx < sessionVocab.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setShowAnswer(false);
    } else {
      setStarted(false);
    }
  };

  if (!started) {
    const sessionSize = calculateSessionSize();
    const newCount = CITIZENSHIP_VOCABULARY.filter((v: VocabularyItem) => !vocabProgress[v.de]).length;
    const weakCount = CITIZENSHIP_VOCABULARY.filter((v: VocabularyItem) => {
      const p = vocabProgress[v.de];
      if (!p) return false;
      const total = p.correct + p.incorrect;
      const accuracy = total > 0 ? p.correct / total : 0;
      return total >= 1 && accuracy < 0.5;
    }).length;
    
    const tier1Words = CITIZENSHIP_VOCABULARY.filter((v: VocabularyItem) => v.tier === 1);
    const tier2Words = CITIZENSHIP_VOCABULARY.filter((v: VocabularyItem) => v.tier === 2);
    const tier3Words = CITIZENSHIP_VOCABULARY.filter((v: VocabularyItem) => v.tier === 3);
    
    // Calculate mastery for each tier
    const isMastered = (vocabDe: string): boolean => {
      const p = vocabProgress[vocabDe];
      if (!p) return false;
      const total = p.correct + p.incorrect;
      const accuracy = total > 0 ? p.correct / total : 0;
      return total >= 3 && accuracy >= 0.8;
    };
    
    const tier1Mastered = tier1Words.filter((v: VocabularyItem) => isMastered(v.de)).length;
    const tier2Mastered = tier2Words.filter((v: VocabularyItem) => isMastered(v.de)).length;
    const tier3Mastered = tier3Words.filter((v: VocabularyItem) => isMastered(v.de)).length;
    
    const tier1Progress = tier1Words.length > 0 ? Math.round((tier1Mastered / tier1Words.length) * 100) : 0;
    const tier2Progress = tier2Words.length > 0 ? Math.round((tier2Mastered / tier2Words.length) * 100) : 0;
    const tier3Progress = tier3Words.length > 0 ? Math.round((tier3Mastered / tier3Words.length) * 100) : 0;
    
    // Determine current focus
    let currentFocus = '';
    if (tier1Progress < 80) {
      currentFocus = lang === 'de' ? '🎯 Fokus: TIER 1 (Essential)' : '🎯 Focus: TIER 1 (Essential)';
    } else if (tier2Progress < 80) {
      currentFocus = lang === 'de' ? '🎯 Fokus: TIER 2 (Important)' : '🎯 Focus: TIER 2 (Important)';
    } else {
      currentFocus = lang === 'de' ? '🎯 Fokus: TIER 3 (Useful)' : '🎯 Focus: TIER 3 (Useful)';
    }

    return (
      <div className="p-4">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-3 rounded-full">
              <BookMarked className="text-white" size={24} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              {lang === 'de' ? 'Vokabel Training' : 'Vocabulary Training'}
            </h2>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 mb-6 border-l-4 border-blue-500">
            <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
              <Sparkles size={18} />
              {lang === 'de' ? 'Intelligentes Vokabel-System' : 'Smart Vocabulary System'}
            </h3>
            <p className="text-sm text-blue-800 mb-3">
              {lang === 'de' 
                ? 'Vokabeln erscheinen in zufälliger Reihenfolge. Höhere Tier-Vokabeln haben Priorität!' 
                : 'Vocabulary appears in random order. Higher-tier vocabulary has priority!'}
            </p>
            <p className="text-sm font-bold text-blue-900 bg-white px-3 py-2 rounded-lg mb-3">
              {currentFocus}
            </p>
            <div className="flex items-center gap-4 text-sm">
              <div className="bg-white px-3 py-2 rounded-lg">
                <span className="text-blue-600 font-bold text-2xl">{sessionSize}</span>
                <span className="text-blue-800 ml-2">{lang === 'de' ? 'Wörter' : 'words'}</span>
              </div>
            </div>
          </div>

          {/* Tier Mastery Progress */}
          <div className="mb-6 space-y-3">
            <h3 className="font-bold text-gray-800 text-sm mb-3">
              {lang === 'de' ? '📊 Beherrschung nach Stufe' : '📊 Mastery by Tier'}
            </h3>
            
            <div className="bg-red-50 rounded-lg p-3 border-2 border-red-200">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-red-900">TIER 1 - Essential</span>
                <span className="text-red-700 font-bold">{tier1Mastered}/{tier1Words.length}</span>
              </div>
              <div className="w-full bg-red-200 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-red-500 to-red-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${tier1Progress}%` }}
                ></div>
              </div>
              <p className="text-xs text-red-700 mt-1">{tier1Progress}% {lang === 'de' ? 'gemeistert' : 'mastered'}</p>
            </div>

            <div className="bg-orange-50 rounded-lg p-3 border-2 border-orange-200">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-orange-900">TIER 2 - Important</span>
                <span className="text-orange-700 font-bold">{tier2Mastered}/{tier2Words.length}</span>
              </div>
              <div className="w-full bg-orange-200 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-orange-500 to-orange-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${tier2Progress}%` }}
                ></div>
              </div>
              <p className="text-xs text-orange-700 mt-1">{tier2Progress}% {lang === 'de' ? 'gemeistert' : 'mastered'}</p>
            </div>

            <div className="bg-yellow-50 rounded-lg p-3 border-2 border-yellow-200">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-yellow-900">TIER 3 - Useful</span>
                <span className="text-yellow-700 font-bold">{tier3Mastered}/{tier3Words.length}</span>
              </div>
              <div className="w-full bg-yellow-200 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-yellow-500 to-yellow-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${tier3Progress}%` }}
                ></div>
              </div>
              <p className="text-xs text-yellow-700 mt-1">{tier3Progress}% {lang === 'de' ? 'gemeistert' : 'mastered'}</p>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <div className="bg-blue-50 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                  {newCount}
                </div>
                <div>
                  <p className="font-semibold text-blue-900">{lang === 'de' ? 'Neue Wörter' : 'New Words'}</p>
                  <p className="text-xs text-blue-700">{lang === 'de' ? 'Noch nicht gelernt' : 'Not learned yet'}</p>
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
                  <p className="font-semibold text-red-900">{lang === 'de' ? 'Schwache Wörter' : 'Weak Words'}</p>
                  <p className="text-xs text-red-700">{lang === 'de' ? 'Brauchen Übung' : 'Need practice'}</p>
                </div>
              </div>
              <AlertCircle className="text-red-500" size={24} />
            </div>
          </div>

          <button onClick={startTraining} className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl py-4 font-bold shadow-lg flex items-center justify-center gap-2">
            <Brain size={24} />
            {lang === 'de' ? `Training starten (${sessionSize} Wörter)` : `Start Training (${sessionSize} Words)`}
          </button>
        </div>
      </div>
    );
  }

  // Training in progress
  if (currentIdx >= sessionVocab.length) {
    const score = sessionStats.correct;
    const accuracy = Math.round((score / sessionVocab.length) * 100);
    
    return (
      <div className="p-4">
        <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
          <div className="text-6xl mb-4">
            {accuracy >= 80 ? '🎉' : accuracy >= 60 ? '👍' : '📚'}
          </div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            {lang === 'de' ? 'Training abgeschlossen!' : 'Training Completed!'}
          </h2>
          <div className={`text-6xl font-bold mb-4 ${
            accuracy >= 80 ? 'text-green-600' : 
            accuracy >= 60 ? 'text-yellow-600' : 'text-orange-600'
          }`}>
            {score}/{sessionVocab.length}
          </div>
          <p className="text-xl mb-6 font-semibold text-gray-700">
            {lang === 'de' ? 'Genauigkeit' : 'Accuracy'}: {accuracy}%
          </p>
          <button onClick={() => { setStarted(false); setCurrentIdx(0); }} 
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl py-3 font-bold">
            {lang === 'de' ? 'Neue Sitzung starten' : 'Start New Session'}
          </button>
        </div>
      </div>
    );
  }

  const vocab = sessionVocab[currentIdx];
  const accuracy = sessionStats.total > 0 ? Math.round((sessionStats.correct / sessionStats.total) * 100) : 0;

  const getTierColor = (tier: number) => {
    if (tier === 1) return 'bg-red-100 text-red-800';
    if (tier === 2) return 'bg-orange-100 text-orange-800';
    if (tier === 3) return 'bg-yellow-100 text-yellow-800';
    if (tier === 4) return 'bg-green-100 text-green-800';
    return 'bg-blue-100 text-blue-800';
  };

  return (
    <div className="p-4">
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        {/* Progress */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-semibold text-gray-600">
            {currentIdx + 1} / {sessionVocab.length}
          </span>
          <span className="text-sm font-semibold text-gray-600">
            {lang === 'de' ? 'Genauigkeit' : 'Accuracy'}: {accuracy}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all" 
            style={{ width: `${((currentIdx + 1) / sessionVocab.length) * 100}%` }} />
        </div>

        {/* Tier Badge */}
        <div className="flex items-center gap-2 mb-4">
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${getTierColor(vocab.tier)}`}>
            TIER {vocab.tier}: {vocab.tier_name}
          </span>
          <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
            {vocab.category}
          </span>
        </div>

        {/* Card */}
        <div onClick={() => setShowAnswer(!showAnswer)} 
          className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 min-h-[300px] flex items-center justify-center cursor-pointer hover:shadow-lg transition-all mb-6">
          <div className="text-center">
            {!showAnswer ? (
              <>
                <div className="text-3xl font-bold text-blue-900 mb-2">
                  {vocab.de}
                </div>
                <p className="text-sm text-blue-600 mt-4">
                  {lang === 'de' ? 'Klicken zum Umdrehen' : 'Click to flip'}
                </p>
              </>
            ) : (
              <>
                <div className="text-2xl font-bold text-cyan-900 mb-4">
                  {vocab.en}
                </div>
                <div className="text-sm text-gray-600 italic border-t pt-4 mt-4">
                  <p className="mb-2"><strong>DE:</strong> {vocab.example_de}</p>
                  <p><strong>EN:</strong> {vocab.example_en}</p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Answer Buttons */}
        {showAnswer && (
          <div className="flex gap-3">
            <button onClick={() => handleAnswer(false)} 
              className="flex-1 bg-red-500 hover:bg-red-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2">
              <XCircle size={20} />
              {lang === 'de' ? 'Nicht gewusst' : "Didn't Know"}
            </button>
            <button onClick={() => handleAnswer(true)} 
              className="flex-1 bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2">
              <CheckCircle2 size={20} />
              {lang === 'de' ? 'Gewusst' : 'Knew It'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
