import { useState } from 'react';
import { findVocabularyInText } from '../utils/vocabularyHighlighter';

interface VocabHighlightProps {
  text: string;
  onVocabClick: (vocabEntry: any) => void;
}

export function VocabHighlight({ text, onVocabClick }: VocabHighlightProps) {
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
}

function VocabWord({ word, vocabEntry, onClick }: VocabWordProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <span
      onClick={(e) => {
        e.stopPropagation();
        onClick(vocabEntry);
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="vocab-highlight cursor-pointer relative inline-block select-none"
      style={{
        background: isHovered
          ? 'linear-gradient(120deg, rgba(124, 58, 237, 0.25) 0%, rgba(219, 39, 119, 0.25) 100%)'
          : 'linear-gradient(120deg, rgba(124, 58, 237, 0.15) 0%, rgba(219, 39, 119, 0.15) 100%)',
        borderBottom: isHovered
          ? '2px solid rgba(124, 58, 237, 0.7)'
          : '2px solid rgba(124, 58, 237, 0.4)',
        borderRadius: '2px',
        padding: '0 2px',
        transition: 'all 0.2s ease',
        fontWeight: isHovered ? '600' : '500'
      }}
    >
      {word}
    </span>
  );
}
