import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle } from 'lucide-react';
import { HighlightedText } from '../components';

interface QuestionCardProps {
  question: string;
  translation?: string;
  showTranslation: boolean;
  onWordClick: (word: string) => void;
  lang: string;
  imageUrl?: string;
  questionId?: number;
}

export function QuestionCard({ 
  question, 
  translation, 
  showTranslation, 
  onWordClick,
  imageUrl,
  questionId
}: QuestionCardProps) {
  // Construct the image path if we have an imageUrl or questionId
  const imagePath = imageUrl 
    ? `/images/question-${questionId}.png` 
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative"
    >
      {/* Glassmorphism card with gradient border */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 via-pink-400/20 to-blue-400/20 rounded-3xl blur-xl"></div>
      
      <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 p-6 mb-6 overflow-hidden">
        {/* Decorative gradient overlay */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl -z-10"></div>
        
        {/* Question icon badge */}
        <motion.div 
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-xs font-bold mb-4 shadow-lg"
        >
          <HelpCircle size={14} />
          <span>Frage</span>
        </motion.div>

        {/* Question text with enhanced typography */}
        <motion.h3 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-4 tracking-tight"
        >
          <HighlightedText 
            text={question}
            onClick={onWordClick}
          />
        </motion.h3>

        {/* Translation with smooth animation */}
        <AnimatePresence mode="wait">
          {showTranslation && translation && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="pt-4 mt-4 border-t-2 border-gradient-to-r from-purple-200 to-pink-200">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-100">
                  <p className="text-base text-gray-700 leading-relaxed italic font-medium">
                    {translation}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Image Display with enhanced styling */}
        {imagePath && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="mt-6 pt-6 border-t-2 border-gray-100"
          >
            <div className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 shadow-inner border-2 border-gray-200/50">
              {/* Shimmer effect while loading */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
              
              <img 
                src={imagePath}
                alt={question}
                className="relative w-full h-auto object-contain max-h-[400px] md:max-h-[500px] p-4"
                loading="lazy"
                onError={(e) => {
                  // Hide image if it fails to load
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
