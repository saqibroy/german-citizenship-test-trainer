import { CITIZENSHIP_VOCABULARY } from '../vacabulary.js';

export interface VocabMatch {
  word: string;
  vocabEntry: any;
  startIndex: number;
  endIndex: number;
}

/**
 * Find vocabulary words in a text string
 * Returns matches with position information
 */
export function findVocabularyInText(text: string): VocabMatch[] {
  const matches: VocabMatch[] = [];
  const lowerText = text.toLowerCase();
  
  // Sort vocabulary by length (longest first) to match longer phrases first
  const sortedVocab = [...CITIZENSHIP_VOCABULARY].sort((a, b) => 
    b.de.length - a.de.length
  );
  
  for (const entry of sortedVocab) {
    const germanWord = entry.de.toLowerCase();
    
    // Skip if already part of a longer match
    let skip = false;
    for (const match of matches) {
      if (germanWord.includes(match.word.toLowerCase()) || 
          match.word.toLowerCase().includes(germanWord)) {
        skip = true;
        break;
      }
    }
    if (skip) continue;
    
    // Find all occurrences of this word
    let searchIndex = 0;
    while (true) {
      const index = lowerText.indexOf(germanWord, searchIndex);
      if (index === -1) break;
      
      // Check if it's a word boundary (not part of a larger word)
      const before = index > 0 ? lowerText[index - 1] : ' ';
      const after = index + germanWord.length < lowerText.length 
        ? lowerText[index + germanWord.length] 
        : ' ';
      
      const isWordBoundary = /[\s.,;:!?()"\'\-]/.test(before) && /[\s.,;:!?()"\'\-]/.test(after);
      
      if (isWordBoundary) {
        // Check if overlaps with existing match
        const overlaps = matches.some(m => 
          (index >= m.startIndex && index < m.endIndex) ||
          (index + germanWord.length > m.startIndex && index + germanWord.length <= m.endIndex)
        );
        
        if (!overlaps) {
          matches.push({
            word: text.substring(index, index + germanWord.length),
            vocabEntry: entry,
            startIndex: index,
            endIndex: index + germanWord.length
          });
        }
      }
      
      searchIndex = index + 1;
    }
  }
  
  // Sort by position
  return matches.sort((a, b) => a.startIndex - b.startIndex);
}

/**
 * Get vocabulary entry for a word
 */
export function getVocabularyEntry(word: string): any | null {
  const lowerWord = word.toLowerCase();
  return CITIZENSHIP_VOCABULARY.find(entry => 
    entry.de.toLowerCase() === lowerWord
  ) || null;
}


