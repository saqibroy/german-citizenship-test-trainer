import { motion } from 'framer-motion';
import { Eye, EyeOff, CheckCircle2, XCircle } from 'lucide-react';

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
  const progressPercentage = ((currentIndex + 1) / total) * 100;

  return (
    <>
      {/* Enhanced Progress Bar with gradient and animation */}
      <div className="w-full h-2 bg-gradient-to-r from-gray-200/50 to-gray-300/50 relative overflow-hidden">
        {/* Animated background shimmer */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          animate={{
            x: ['-100%', '100%']
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Main progress bar */}
        <motion.div 
          className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 relative overflow-hidden shadow-lg"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            animate={{
              x: ['0%', '100%']
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </div>

      {/* Enhanced Stats Row with better visual design */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-4 py-4 flex items-center justify-between bg-white/90 backdrop-blur-md border-b-2 border-gray-200/50 sticky top-0 z-40 shadow-sm"
      >
        <div className="flex items-center gap-4">
          {/* Question counter with modern design */}
          <motion.div 
            key={currentIndex}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex items-center gap-2"
          >
            <div className="px-3 py-1.5 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full border-2 border-purple-300/50">
              <span className="text-sm font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {currentIndex + 1}/{total}
              </span>
            </div>
          </motion.div>

          {/* Animated score badges */}
          <div className="flex items-center gap-2">
            {/* Correct answers */}
            <motion.div 
              key={`correct-${correct}`}
              initial={{ scale: correct > 0 ? 1.3 : 1 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 15 }}
              className="relative"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-green-500 text-white flex items-center justify-center text-sm font-bold shadow-lg shadow-emerald-500/30">
                {correct}
              </div>
              {correct > 0 && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute -top-1 -right-1"
                >
                  <CheckCircle2 size={14} className="text-green-600 bg-white rounded-full" />
                </motion.div>
              )}
            </motion.div>

            {/* Incorrect answers */}
            <motion.div 
              key={`incorrect-${incorrect}`}
              initial={{ scale: incorrect > 0 ? 1.3 : 1, x: incorrect > 0 ? [-3, 3, -3, 0] : 0 }}
              animate={{ scale: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 15 }}
              className="relative"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-400 to-red-500 text-white flex items-center justify-center text-sm font-bold shadow-lg shadow-rose-500/30">
                {incorrect}
              </div>
              {incorrect > 0 && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute -top-1 -right-1"
                >
                  <XCircle size={14} className="text-red-600 bg-white rounded-full" />
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Accuracy percentage */}
          {(correct + incorrect) > 0 && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden sm:flex items-center"
            >
              <div className="px-3 py-1 bg-gray-100 rounded-full">
                <span className="text-xs font-bold text-gray-700">
                  {Math.round((correct / (correct + incorrect)) * 100)}%
                </span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Enhanced translation toggle button */}
        <motion.button 
          onClick={onToggleTranslation}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`p-3 rounded-xl transition-all shadow-lg ${
            showTranslation 
              ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-purple-500/40' 
              : 'bg-white text-gray-600 border-2 border-gray-200 hover:border-purple-300 hover:text-purple-600'
          }`}
          title={lang === 'de' ? 'Übersetzung anzeigen' : 'Show translation'}
        >
          {showTranslation ? <EyeOff size={20} strokeWidth={2.5} /> : <Eye size={20} strokeWidth={2.5} />}
        </motion.button>
      </motion.div>
    </>
  );
}
