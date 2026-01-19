import { useState } from 'react';
import { findVocabularyInText } from '../utils/vocabularyHighlighter';
import type { VocabGender } from '../types';

// Gender-based color classes
const getGenderColorClasses = (gender: VocabGender, isLight: boolean, isActive: boolean): {
  bg: string;
  border: string;
  hoverBg: string;
} => {
  if (isLight) {
    // Light variant for colored backgrounds (green/red)
    return {
      bg: isActive ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.2)',
      border: isActive ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.6)',
      hoverBg: 'rgba(255, 255, 255, 0.25)'
    };
  }
  
  const colors: Record<VocabGender, { bg: string; border: string; hoverBg: string }> = {
    masculine: {
      bg: 'rgba(59, 130, 246, 0.15)',      // blue-500/15
      border: 'rgb(59, 130, 246)',          // blue-500
      hoverBg: 'rgba(59, 130, 246, 0.25)'
    },
    feminine: {
      bg: 'rgba(236, 72, 153, 0.15)',      // pink-500/15
      border: 'rgb(236, 72, 153)',          // pink-500
      hoverBg: 'rgba(236, 72, 153, 0.25)'
    },
    neuter: {
      bg: 'rgba(34, 197, 94, 0.15)',       // green-500/15
      border: 'rgb(34, 197, 94)',           // green-500
      hoverBg: 'rgba(34, 197, 94, 0.25)'
    },
    dative: {
      bg: 'rgba(168, 85, 247, 0.15)',      // purple-500/15
      border: 'rgb(168, 85, 247)',          // purple-500
      hoverBg: 'rgba(168, 85, 247, 0.25)'
    },
    none: {
      bg: 'rgba(234, 179, 8, 0.15)',       // yellow-500/15
      border: 'rgb(234, 179, 8)',           // yellow-500
      hoverBg: 'rgba(234, 179, 8, 0.25)'
    }
  };
  
  return isActive ? {
    ...colors[gender],
    bg: colors[gender].hoverBg
  } : colors[gender];
};

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
    
    // Add highlighted vocab word with gender info
    parts.push(
      <VocabWord
        key={`vocab-${idx}`}
        word={match.word}
        vocabEntry={match.vocabEntry}
        gender={match.gender}
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
  gender: VocabGender;
  onClick: (vocabEntry: any) => void;
  disabled?: boolean;
  variant?: 'default' | 'light';
}

function VocabWord({ word, vocabEntry, gender, onClick, disabled = false, variant = 'default' }: VocabWordProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(null);
  const [isLongPressing, setIsLongPressing] = useState(false);
  
  const LONG_PRESS_DURATION = 800; // 800ms for long-press
  
  // Styling based on variant and gender
  const isLight = variant === 'light';
  const colors = getGenderColorClasses(gender, isLight, isHovered || isLongPressing);
  
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
            : colors.bg,
          borderBottom: isLight
            ? '1px solid rgba(255, 255, 255, 0.3)'
            : `1px solid ${colors.border}40`,
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
        background: colors.bg,
        borderBottom: `2px solid ${colors.border}`,
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
            background: colors.hoverBg,
            animation: 'ping 0.8s cubic-bezier(0, 0, 0.2, 1)'
          }}
        />
      )}
    </span>
  );
}
