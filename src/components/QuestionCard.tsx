import { HighlightedText } from '../components';

interface QuestionCardProps {
  question: string;
  translation?: string;
  showTranslation: boolean;
  onWordClick: (word: string) => void;
  lang: string;
}

export function QuestionCard({ 
  question, 
  translation, 
  showTranslation, 
  onWordClick
}: QuestionCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-5 mb-4">
      <h3 className="text-xl font-bold text-gray-900 leading-snug mb-3">
        <HighlightedText 
          text={question}
          onClick={onWordClick}
        />
      </h3>
      {showTranslation && translation && (
        <p className="text-sm text-gray-600 pt-3 border-t border-gray-100 italic">
          {translation}
        </p>
      )}
    </div>
  );
}
