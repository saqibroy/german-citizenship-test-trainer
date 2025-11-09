import { Eye, EyeOff } from 'lucide-react';
import { HighlightedText } from '../components';

interface QuestionCardProps {
  question: string;
  translation?: string;
  showTranslation: boolean;
  onWordClick: (word: string) => void;
  onToggleTranslation: () => void;
  lang: string;
}

export function QuestionCard({ 
  question, 
  translation, 
  showTranslation, 
  onWordClick,
  onToggleTranslation,
  lang
}: QuestionCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-5 mb-4">
      <div className="flex items-start gap-3 mb-3">
        <h3 className="flex-1 text-xl font-bold text-gray-900 leading-snug">
          <HighlightedText 
            text={question}
            onClick={onWordClick}
          />
        </h3>
        <button 
          onClick={onToggleTranslation}
          className={`flex-shrink-0 p-2 rounded-lg transition-all ${
            showTranslation 
              ? 'bg-purple-500 text-white' 
              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
          }`}
          title={lang === 'de' ? 'Übersetzung anzeigen' : 'Show translation'}
        >
          {showTranslation ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {showTranslation && translation && (
        <p className="text-sm text-gray-600 pt-3 border-t border-gray-100 italic">
          {translation}
        </p>
      )}
    </div>
  );
}
