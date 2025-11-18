import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Globe, Sparkles } from 'lucide-react';
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
    <motion.div 
      className="relative"
      initial={{ opacity: 0, x: -20 }}
      animate={{ 
        opacity: 1, 
        x: showAsWrong ? [-5, 5, -5, 5, 0] : 0,
        scale: showAsCorrect ? [1, 1.05, 1] : 1,
        transition: { 
          opacity: { duration: 0.3, delay: index * 0.1 },
          x: { duration: 0.4 },
          scale: { duration: 0.5 }
        }
      }}
      whileHover={!answered ? { scale: 1.02 } : {}}
      whileTap={!answered ? { scale: 0.98 } : {}}
    >
      {/* Glow effect for selected/correct/wrong states */}
      <AnimatePresence>
        {(isSelected || showAsCorrect || showAsWrong) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className={`absolute -inset-1 rounded-3xl blur-lg ${
              showAsWrong ? 'bg-gradient-to-r from-rose-400 to-red-400' :
              showAsCorrect ? 'bg-gradient-to-r from-emerald-400 to-green-400' :
              'bg-gradient-to-r from-purple-400 to-pink-400'
            }`}
          ></motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={onSelect}
        disabled={answered}
        className={`relative w-full text-left p-5 pr-14 rounded-3xl border-3 transition-all duration-300 min-h-[72px] group ${
          showAsWrong ? 'bg-gradient-to-br from-rose-50 to-red-50 border-rose-400 shadow-2xl' :
          showAsCorrect ? 'bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-400 shadow-2xl' :
          isSelected ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 shadow-2xl' :
          answered ? 'border-gray-200 bg-gray-50/50 opacity-50' :
          'border-gray-300 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl hover:border-purple-300'
        }`}
      >
        {/* Shine effect on hover */}
        {!answered && (
          <motion.div 
            className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/40 to-transparent"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.6 }}
          ></motion.div>
        )}

        <div className="relative flex items-center gap-4">
          {/* Letter badge with enhanced animations */}
          <motion.div 
            initial={{ scale: 0, rotate: -180 }}
            animate={{ 
              scale: showAsCorrect ? [1, 1.3, 1] : 1,
              rotate: showAsCorrect ? [0, 10, -10, 0] : 0
            }}
            transition={{ 
              scale: { duration: 0.5 },
              rotate: { duration: 0.5 }
            }}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg flex-shrink-0 shadow-lg ${
              showAsWrong ? 'bg-gradient-to-br from-rose-500 to-red-600 text-white' :
              showAsCorrect ? 'bg-gradient-to-br from-emerald-500 to-green-600 text-white' :
              isSelected ? 'bg-gradient-to-br from-purple-600 to-pink-600 text-white' :
              'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700 group-hover:from-purple-100 group-hover:to-pink-100 group-hover:text-purple-700'
            }`}
          >
            {showAsWrong ? (
              <motion.div
                initial={{ rotate: 0, scale: 0 }}
                animate={{ rotate: 180, scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <X size={20} strokeWidth={3} />
              </motion.div>
            ) :
            showAsCorrect ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Check size={20} strokeWidth={3} />
              </motion.div>
            ) :
            String.fromCharCode(65 + index)}
          </motion.div>

          {/* Answer text with better typography */}
          <span className="flex-1 font-semibold leading-snug text-gray-900 text-base md:text-lg">
            {showingTranslation ? (
              displayText
            ) : (
              <HighlightedText 
                text={text}
                onClick={(word: string) => !answered && onWordClick(word)}
              />
            )}
          </span>

          {/* Success sparkle indicator */}
          <AnimatePresence>
            {showAsCorrect && (
              <motion.div
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0 }}
                className="absolute -top-2 -right-2"
              >
                <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full p-2 shadow-lg">
                  <Sparkles size={16} className="text-white" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.button>
      
      {/* Translation toggle button with enhanced styling */}
      {!answered && (
        <motion.button
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2 + index * 0.1, type: "spring", stiffness: 260 }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          onMouseDown={() => onTranslationToggle(true)}
          onMouseUp={() => onTranslationToggle(false)}
          onMouseLeave={() => onTranslationToggle(false)}
          onTouchStart={(e) => {
            e.preventDefault();
            onTranslationToggle(true);
          }}
          onTouchEnd={() => onTranslationToggle(false)}
          className={`absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-2xl transition-all shadow-lg ${
            showingTranslation 
              ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-blue-500/50' 
              : 'bg-white text-gray-500 hover:bg-gradient-to-br hover:from-blue-100 hover:to-blue-200 hover:text-blue-600 border-2 border-gray-200'
          }`}
          title={lang === 'de' ? 'Übersetzung (halten)' : 'Translation (hold)'}
        >
          <Globe size={18} strokeWidth={2.5} />
        </motion.button>
      )}
    </motion.div>
  );
}
