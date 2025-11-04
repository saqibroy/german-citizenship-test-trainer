import { Eye, EyeOff } from 'lucide-react';

interface ProgressHeaderProps {
  currentIndex: number;
  total: number;
  correct: number;
  incorrect: number;
  showTranslation: boolean;
  onToggleTranslation: () => void;
  lang: string;
}

export function ProgressHeader({
  currentIndex,
  total,
  correct,
  incorrect,
  showTranslation,
  onToggleTranslation,
  lang
}: ProgressHeaderProps) {
  return (
    <>
      {/* Progress Bar */}
      <div className="w-full h-1 bg-gray-200/50">
        <div 
          className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 transition-all duration-700 ease-out"
          style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
        />
      </div>

      {/* Stats Row */}
      <div className="px-4 py-3 flex items-center justify-between bg-white/70 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-gray-600">{currentIndex + 1}/{total}</span>
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-green-100 text-green-700 flex items-center justify-center text-xs font-bold">
              {correct}
            </span>
            <span className="w-7 h-7 rounded-lg bg-red-100 text-red-700 flex items-center justify-center text-xs font-bold">
              {incorrect}
            </span>
          </div>
        </div>
        <button 
          onClick={onToggleTranslation}
          className={`p-2 rounded-lg transition-all ${
            showTranslation 
              ? 'bg-purple-500 text-white' 
              : 'bg-gray-100 text-gray-500'
          }`}
          title={lang === 'de' ? 'Übersetzung anzeigen' : 'Show translation'}
        >
          {showTranslation ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </>
  );
}
