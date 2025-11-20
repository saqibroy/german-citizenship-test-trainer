import { useState } from 'react';
import { findVocabularyInText } from '../utils/vocabularyHighlighter';

interface VocabHighlightProps {
  text: string;
  onVocabClick: (vocabEntry: any) => void;
  disabled?: boolean; // Disable interaction (before answering)
  variant?: 'default' | 'light'; // 'light' for colored backgrounds (green/red)
}

export function VocabHighlight({ text, onVocabClick, disabled = false, variant = 'default' }: VocabHighlightProps) {
  const matches = findVocabularyInText(text);
  
  if (matches.length === 0) {
    return <>{text}</>;
  }
  
  const parts: React.ReactElement[] = [];
  let lastIndex = 0;
  
  matches.forEach((match, idx) => {
    // Add text before match
    if (match.startIndex > lastIndex) {
      parts.push(
        <span key={`text-${idx}`}>
          {text.substring(lastIndex, match.startIndex)}
        </span>
      );
    }
    
    // Add highlighted vocab word
    parts.push(
      <VocabWord
        key={`vocab-${idx}`}
        word={match.word}
        vocabEntry={match.vocabEntry}
        onClick={onVocabClick}
        disabled={disabled}
        variant={variant}
      />
    );
    
    lastIndex = match.endIndex;
  });
  
  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(
      <span key="text-end">
        {text.substring(lastIndex)}
      </span>
    );
  }
  
  return <>{parts}</>;
}

interface VocabWordProps {
  word: string;
  vocabEntry: any;
  onClick: (vocabEntry: any) => void;
  disabled?: boolean;
  variant?: 'default' | 'light';
}

function VocabWord({ word, vocabEntry, onClick, disabled = false, variant = 'default' }: VocabWordProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(null);
  const [isLongPressing, setIsLongPressing] = useState(false);
  
  const LONG_PRESS_DURATION = 800; // 800ms for long-press
  
  // Styling based on variant
  const isLight = variant === 'light';
  
  // Mobile: Long-press detection
  const handleTouchStart = () => {
    if (disabled) return;
    
    const timer = setTimeout(() => {
      setIsLongPressing(true);
      
      // Haptic feedback on mobile
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
      
      // Open vocabulary modal
      onClick(vocabEntry);
    }, LONG_PRESS_DURATION);
    
    setLongPressTimer(timer);
  };
  
  const handleTouchEnd = (e: React.TouchEvent) => {
    // Clear timer if released before long-press completes
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
    
    // If was long-pressing, prevent click from bubbling to overlay
    if (isLongPressing) {
      e.preventDefault();
      e.stopPropagation();
      setIsLongPressing(false);
    }
    // If quick tap (< 800ms), let it bubble → overlay catches it → next question
  };
  
  const handleTouchCancel = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
    setIsLongPressing(false);
  };
  
  // Desktop: Click immediately opens (no long-press needed)
  const handleClick = (e: React.MouseEvent) => {
    if (disabled) return;
    
    e.preventDefault();
    e.stopPropagation();
    onClick(vocabEntry);
  };
  
  // Disabled state (before answering)
  if (disabled) {
    return (
      <span
        className="vocab-highlight-disabled relative inline-block select-none"
        style={{
          background: isLight
            ? 'rgba(255, 255, 255, 0.1)'
            : 'linear-gradient(120deg, rgba(124, 58, 237, 0.08) 0%, rgba(219, 39, 119, 0.08) 100%)',
          borderBottom: isLight
            ? '1px solid rgba(255, 255, 255, 0.3)'
            : '1px solid rgba(124, 58, 237, 0.2)',
          borderRadius: '2px',
          padding: '0 2px',
          cursor: 'default',
          pointerEvents: 'none',
          fontWeight: '500'
        }}
      >
        {word}
      </span>
    );
  }
  
  // Interactive state (after answering)
  return (
    <span
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="vocab-highlight cursor-pointer relative inline-block select-none"
      style={{
        background: isLight
          ? isLongPressing
            ? 'rgba(255, 255, 255, 0.4)'
            : isHovered
            ? 'rgba(255, 255, 255, 0.25)'
            : 'rgba(255, 255, 255, 0.2)'
          : isLongPressing
          ? 'linear-gradient(120deg, rgba(124, 58, 237, 0.4) 0%, rgba(219, 39, 119, 0.4) 100%)'
          : isHovered
          ? 'linear-gradient(120deg, rgba(124, 58, 237, 0.25) 0%, rgba(219, 39, 119, 0.25) 100%)'
          : 'linear-gradient(120deg, rgba(124, 58, 237, 0.2) 0%, rgba(219, 39, 119, 0.2) 100%)',
        borderBottom: isLight
          ? isHovered || isLongPressing
            ? '2px dotted rgba(255, 255, 255, 0.9)'
            : '2px dotted rgba(255, 255, 255, 0.6)'
          : isHovered || isLongPressing
          ? '2px dotted rgba(124, 58, 237, 0.8)'
          : '2px dotted rgba(124, 58, 237, 0.5)',
        borderRadius: '2px',
        padding: '0 2px',
        transition: 'all 0.2s ease',
        fontWeight: isHovered || isLongPressing ? '600' : '500',
        transform: isLongPressing ? 'scale(1.05)' : 'scale(1)',
        animation: isLongPressing ? 'vocab-pulse 0.8s ease-out' : 'none'
      }}
    >
      {word}
      {/* Visual feedback during long-press */}
      {isLongPressing && (
        <span 
          className="absolute inset-0 rounded animate-ping pointer-events-none"
          style={{
            background: isLight ? 'rgba(255, 255, 255, 0.3)' : 'rgba(124, 58, 237, 0.3)',
            animation: 'ping 0.8s cubic-bezier(0, 0, 0.2, 1)'
          }}
        />
      )}
    </span>
  );
}
