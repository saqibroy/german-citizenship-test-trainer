import { Check, X, Globe } from 'lucide-react';
import { HighlightedText } from '../components';

interface AnswerOptionProps {
  text: string;
  translation: string;
  index: number;
  isSelected: boolean;
  isCorrect: boolean;
  showAsCorrect: boolean;
  showAsWrong: boolean;
  answered: boolean;
  showingTranslation: boolean;
  onSelect: () => void;
  onWordClick: (word: string) => void;
  onTranslationToggle: (show: boolean) => void;
  lang: string;
}

export function AnswerOption({
  text,
  translation,
  index,
  isSelected,
  showAsCorrect,
  showAsWrong,
  answered,
  showingTranslation,
  onSelect,
  onWordClick,
  onTranslationToggle,
  lang
}: AnswerOptionProps) {
  const displayText = showingTranslation ? translation : text;

  return (
    <div className="relative">
      <button
        onClick={onSelect}
        disabled={answered}
        className={`relative w-full text-left p-4 pr-12 rounded-2xl border-2 transition-all duration-300 active:scale-98 min-h-[60px] ${
          showAsWrong ? 'bg-rose-100 border-rose-400 shadow-lg' :
          showAsCorrect ? 'bg-emerald-100 border-emerald-400 shadow-lg' :
          isSelected ? 'border-purple-500 bg-purple-50 shadow-lg' :
          answered ? 'border-gray-200 bg-gray-50 opacity-40' :
          'border-gray-300 bg-white shadow-md active:shadow-lg'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0 ${
            showAsWrong ? 'bg-rose-500 text-white' :
            showAsCorrect ? 'bg-emerald-500 text-white' :
            isSelected ? 'bg-purple-600 text-white' :
            'bg-gray-100 text-gray-700'
          }`}>
            {showAsWrong ? <X size={16} /> :
             showAsCorrect ? <Check size={16} /> :
             String.fromCharCode(65 + index)}
          </div>
          <span className="flex-1 font-medium leading-snug text-gray-900">
            {showingTranslation ? (
              displayText
            ) : (
              <HighlightedText 
                text={text}
                onClick={(word: string) => !answered && onWordClick(word)}
              />
            )}
          </span>
        </div>
      </button>
      
      {!answered && (
        <button
          onMouseDown={() => onTranslationToggle(true)}
          onMouseUp={() => onTranslationToggle(false)}
          onMouseLeave={() => onTranslationToggle(false)}
          onTouchStart={(e) => {
            e.preventDefault();
            onTranslationToggle(true);
          }}
          onTouchEnd={() => onTranslationToggle(false)}
          className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all ${
            showingTranslation 
              ? 'bg-blue-500 text-white shadow-lg' 
              : 'bg-gray-100 text-gray-500 hover:bg-blue-100 hover:text-blue-600'
          }`}
          title={lang === 'de' ? 'Übersetzung (halten)' : 'Translation (hold)'}
        >
          <Globe size={16} />
        </button>
      )}
    </div>
  );
}
