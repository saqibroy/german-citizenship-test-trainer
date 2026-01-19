import { CITIZENSHIP_VOCABULARY } from '../vacabulary.js';
import type { VocabularyItem, VocabGender } from '../types';

export interface VocabMatch {
  word: string;
  vocabEntry: VocabularyItem;
  startIndex: number;
  endIndex: number;
  gender: VocabGender;
}

// Helper function to normalize German text for matching
const normalizeText = (text: string): string => {
  return text.toLowerCase()
    .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss');
};

// Extract core word from vocabulary entry (remove articles and handle alternatives)
const extractCoreWords = (vocabDe: string): string[] => {
  const words: string[] = [];
  
  // Remove articles (der, die, das)
  let cleaned = vocabDe.replace(/^(der|die|das)\s+/i, '').trim();
  
  // Handle slashes (e.g., "Abgeordnete / die Abgeordnete")
  if (cleaned.includes('/')) {
    const parts = cleaned.split('/').map(p => p.trim());
    parts.forEach(part => {
      const withoutArticle = part.replace(/^(der|die|das)\s+/i, '').trim();
      if (withoutArticle) {
        words.push(withoutArticle);
      }
    });
  } else {
    words.push(cleaned);
  }
  
  return words.filter(w => w.length > 0);
};

// Detect gender from vocabulary entry
export function getVocabGender(vocab: VocabularyItem): VocabGender {
  // Check if vocab has explicit gender field
  if (vocab.gender) {
    return vocab.gender === 'none' ? 'none' : vocab.gender;
  }
  
  // Check forms array first
  const firstForm = vocab.forms?.[0]?.toLowerCase() || vocab.de.toLowerCase();
  
  // Dative case indicators (special handling)
  if (firstForm.startsWith('dem ') || firstForm.startsWith('einem ')) {
    return 'dative';
  }
  
  // Masculine: der, ein
  if (firstForm.startsWith('der ') || firstForm.startsWith('ein ')) {
    return 'masculine';
  }
  
  // Feminine: die, eine
  if (firstForm.startsWith('die ') || firstForm.startsWith('eine ')) {
    return 'feminine';
  }
  
  // Neuter: das
  if (firstForm.startsWith('das ')) {
    return 'neuter';
  }
  
  // Verbs, adjectives, conjunctions, etc.
  return 'none';
}

// Generate all matchable word forms (WITHOUT articles - only core words)
const generateMatchableForms = (vocab: VocabularyItem): string[] => {
  const forms: string[] = [];
  
  // If vocab already has forms array, extract core words from each
  if (vocab.forms && vocab.forms.length > 0) {
    vocab.forms.forEach(form => {
      // Remove article from form to get just the word
      const withoutArticle = form.replace(/^(der|die|das|den|dem|des|ein|eine|einem|einer|einen|eines)\s+/i, '').trim();
      if (withoutArticle && withoutArticle.length > 1) {
        forms.push(withoutArticle.toLowerCase());
        forms.push(normalizeText(withoutArticle.toLowerCase()));
      }
    });
  }
  
  // Add core words from main de field
  const coreWords = extractCoreWords(vocab.de);
  coreWords.forEach(core => {
    const lower = core.toLowerCase();
    forms.push(lower);
    forms.push(normalizeText(lower));
    
    // Generate common verb conjugations and noun forms
    // This helps match "gehört" to "gehören", "Bundesländer" to "Bundesland", etc.
    
    // For verbs ending in -en, add conjugations
    if (lower.endsWith('en')) {
      const stem = lower.slice(0, -2);
      forms.push(stem + 't');     // er/sie/es gehört
      forms.push(stem + 'e');     // ich gehe
      forms.push(stem + 'st');    // du gehst
      forms.push(stem + 'te');    // ich/er gehörte (past)
      forms.push(stem + 'ten');   // sie gehörten
      forms.push(stem);           // just the stem
    }
    
    // For verbs ending in -ern, -eln
    if (lower.endsWith('ern') || lower.endsWith('eln')) {
      const stem = lower.slice(0, -1);  // remove just n
      forms.push(stem + 't');
      forms.push(stem + 'te');
    }
    
    // Add common noun plural endings
    if (!lower.endsWith('en') && !lower.endsWith('n')) {
      forms.push(lower + 'en');
      forms.push(lower + 'n');
    }
    if (!lower.endsWith('e')) {
      forms.push(lower + 'e');
    }
    if (!lower.endsWith('er')) {
      forms.push(lower + 'er');
    }
    if (!lower.endsWith('s')) {
      forms.push(lower + 's');
    }
  });
  
  // Add word field if present
  if (vocab.word) {
    forms.push(vocab.word.toLowerCase());
    forms.push(normalizeText(vocab.word.toLowerCase()));
  }
  
  // Dedupe and filter out very short words (less than 2 chars)
  return [...new Set(forms)].filter(f => f.length >= 2);
};

// Build vocabulary map for quick lookup
let VOCAB_MAP: Map<string, VocabularyItem> | null = null;

const buildVocabMap = (): Map<string, VocabularyItem> => {
  const map = new Map<string, VocabularyItem>();
  
  CITIZENSHIP_VOCABULARY.forEach((item: VocabularyItem) => {
    const forms = generateMatchableForms(item);
    forms.forEach((form: string) => {
      // Only add if not already present (first match wins - longer vocab entries should be processed first)
      if (!map.has(form)) {
        map.set(form, item);
      }
    });
  });
  
  return map;
};

const getVocabMap = (): Map<string, VocabularyItem> => {
  if (!VOCAB_MAP) {
    VOCAB_MAP = buildVocabMap();
  }
  return VOCAB_MAP;
};

// Reset vocab map (call when vocabulary changes)
export function resetVocabMap(): void {
  VOCAB_MAP = null;
}

/**
 * Find vocabulary words in a text string
 * Returns matches with position information
 */
export function findVocabularyInText(text: string): VocabMatch[] {
  const matches: VocabMatch[] = [];
  
  // Sort vocabulary by the length of de field (longest first) to match longer phrases first
  const sortedVocab = [...CITIZENSHIP_VOCABULARY].sort((a: VocabularyItem, b: VocabularyItem) => 
    b.de.length - a.de.length
  );
  
  const lowerText = text.toLowerCase();
  const usedRanges: Array<{start: number, end: number}> = [];
  
  // Helper to check if a range overlaps with existing matches
  const isOverlapping = (start: number, end: number): boolean => {
    return usedRanges.some(range => 
      (start >= range.start && start < range.end) ||
      (end > range.start && end <= range.end) ||
      (start <= range.start && end >= range.end)
    );
  };
  
  for (const vocab of sortedVocab) {
    const forms = generateMatchableForms(vocab);
    
    // Sort forms by length (longest first)
    forms.sort((a: string, b: string) => b.length - a.length);
    
    for (const form of forms) {
      let searchIndex = 0;
      
      while (true) {
        const index = lowerText.indexOf(form, searchIndex);
        if (index === -1) break;
        
        const endIndex = index + form.length;
        
        // Check if it's a word boundary
        const before = index > 0 ? lowerText[index - 1] : ' ';
        const after = endIndex < lowerText.length ? lowerText[endIndex] : ' ';
        const isWordBoundary = /[\s.,;:!?()"\'\-\[\]]/.test(before) && /[\s.,;:!?()"\'\-\[\]]/.test(after);
        
        if (isWordBoundary && !isOverlapping(index, endIndex)) {
          matches.push({
            word: text.substring(index, endIndex),
            vocabEntry: vocab,
            startIndex: index,
            endIndex: endIndex,
            gender: getVocabGender(vocab)
          });
          usedRanges.push({start: index, end: endIndex});
        }
        
        searchIndex = index + 1;
      }
    }
  }
  
  // Sort by position
  return matches.sort((a, b) => a.startIndex - b.startIndex);
}

/**
 * Get vocabulary entry for a word
 */
export function getVocabularyEntry(word: string): VocabularyItem | null {
  const vocabMap = getVocabMap();
  const lowerWord = word.toLowerCase().replace(/[.,!?;:]/g, '');
  return vocabMap.get(lowerWord) || vocabMap.get(normalizeText(lowerWord)) || null;
}

/**
 * Get case type for a form (for color coding)
 */
export type CaseType = 'nominativ' | 'akkusativ' | 'dativ' | 'genitiv' | 'plural' | 'default';

export function getCaseType(form: string): CaseType {
  const lowerForm = form.toLowerCase();
  
  // Nominativ
  if (lowerForm.startsWith('der ') || lowerForm.startsWith('die ') || lowerForm.startsWith('das ')) {
    // Check if it's plural (die + plural word)
    if (lowerForm.startsWith('die ') && (
      lowerForm.includes('en ') || lowerForm.endsWith('en') ||
      lowerForm.includes('er ') || lowerForm.endsWith('er') ||
      lowerForm.includes('e ') || lowerForm.endsWith('e')
    )) {
      // Could be feminine singular or plural - need more context
      // For now, simple heuristic: if ends with common plural markers
      const word = lowerForm.replace('die ', '');
      if (word.endsWith('en') || word.endsWith('er') || word.endsWith('e') || word.endsWith('s')) {
        // Could be plural
      }
    }
    return 'nominativ';
  }
  
  // Akkusativ
  if (lowerForm.startsWith('den ') || lowerForm.startsWith('einen ')) {
    return 'akkusativ';
  }
  
  // Dativ
  if (lowerForm.startsWith('dem ') || lowerForm.startsWith('einem ') || 
      lowerForm.includes('meiner') || lowerForm.includes('meinem') ||
      lowerForm.startsWith('der ') && lowerForm.includes('in ')) {
    return 'dativ';
  }
  
  // Genitiv
  if (lowerForm.startsWith('des ') || lowerForm.startsWith('eines ') || 
      lowerForm.startsWith('einer ')) {
    return 'genitiv';
  }
  
  // Check for plural indicators
  if (lowerForm.startsWith('die ')) {
    return 'plural';
  }
  
  return 'default';
}


