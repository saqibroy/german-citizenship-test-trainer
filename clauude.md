# 📚 German Vocabulary System - Complete Documentation

This document provides a comprehensive guide to the vocabulary system used in the German Language Trainer app. Use this as a reference when implementing similar features in other applications.

---

## 📋 Table of Contents

1. [Vocabulary Data Structure](#vocabulary-data-structure)
2. [Word Types and Forms](#word-types-and-forms)
3. [Gender Detection System](#gender-detection-system)
4. [Color Coding System](#color-coding-system)
5. [Text Highlighting Feature](#text-highlighting-feature)
6. [Vocabulary Card Modal](#vocabulary-card-modal)
7. [Flashcard System](#flashcard-system)
8. [JSON Import Format](#json-import-format)
9. [Implementation Details](#implementation-details)

---

## 1. Vocabulary Data Structure {#vocabulary-data-structure}

### VocabularyItem Interface

```typescript
interface VocabularyItem {
  id: string;                    // Unique identifier (e.g., "vocab-1705123456789-0")
  word: string;                  // The primary word (e.g., "Haus", "geben", "weil")
  forms: string[];               // All grammatical forms/variations of the word
  meaning: string;               // English translation/definition
  createdAt: string;             // ISO timestamp of creation
  topicId?: string;              // Optional link to parent topic
  timesAnswered: number;         // SRS tracking: total practice attempts
  timesCorrect: number;          // SRS tracking: correct answers
  lastReviewed: string | null;   // SRS tracking: last practice date
}
```

### Key Concepts

| Field | Purpose | Example |
|-------|---------|---------|
| `word` | Display name, dictionary form | `"Haus"`, `"geben"`, `"weil"` |
| `forms` | All variations for matching/display | `["das Haus", "des Hauses", "dem Haus"]` |
| `meaning` | Translation with grammar notes | `"house (neuter)"`, `"to give (+ DATIVE)"` |

---

## 2. Word Types and Forms {#word-types-and-forms}

The system handles different word types with specific form patterns:

### 2.1 Nouns (with Articles and Cases)

Nouns include all four German grammatical cases:

```json
{
  "word": "Haus",
  "forms": [
    "das Haus",        // Nominativ (subject)
    "des Hauses",      // Genitiv (possession)
    "dem Haus",        // Dativ (indirect object)
    "das Haus",        // Akkusativ (direct object) - same as Nom for neuter
    "die Häuser",      // Plural Nominativ
    "zu Hause",        // Common phrases
    "nach Hause"       // Common phrases
  ],
  "meaning": "house (neuter)"
}
```

#### Standard Noun Form Order:
1. **der/die/das + WORD** → Nominativ (determines gender)
2. **des/der + WORD** → Genitiv
3. **dem/der + WORD** → Dativ
4. **den/die/das + WORD** → Akkusativ
5. **die + WORD(plural)** → Plural forms
6. **Common phrases** → Fixed expressions

### 2.2 Verbs (with Conjugations)

Verbs include conjugation forms and fixed prepositions:

```json
{
  "word": "geben",
  "forms": [
    "geben",           // Infinitive
    "gibt",            // 3rd person singular (er/sie/es gibt)
    "gab",             // Präteritum (simple past)
    "gegeben",         // Partizip II (past participle)
    "ich gebe",        // Optional: full conjugations
    "du gibst",
    "er gibt"
  ],
  "meaning": "to give (+ DATIVE indirect object)"
}
```

#### Verbs with Fixed Prepositions:

```json
{
  "word": "interessieren",
  "forms": [
    "interessieren",
    "interessiert",
    "interessiere",
    "interessierst",
    "sich interessieren für"  // ← Fixed preposition phrase
  ],
  "meaning": "to be interested in (+ für + accusative)"
}
```

```json
{
  "word": "freuen",
  "forms": [
    "freuen",
    "freut",
    "freue",
    "sich freuen auf",    // Looking forward to (future)
    "sich freuen über"    // Happy about (present)
  ],
  "meaning": "to be happy (auf = future, über = present)"
}
```

### 2.3 Adjectives (with Declensions)

Adjectives include all declension endings:

```json
{
  "word": "gut",
  "forms": [
    "gut",           // Base form (predicate)
    "gute",          // Feminine/plural
    "guten",         // Accusative masculine, dative, genitive
    "guter",         // Nominative masculine, genitive feminine
    "gutes",         // Nominative/accusative neuter
    "besser",        // Comparative
    "am besten"      // Superlative
  ],
  "meaning": "good"
}
```

### 2.4 Prepositions (with Case Requirements)

Prepositions include examples with their required cases:

```json
{
  "word": "mit",
  "forms": [
    "mit",
    "mit dem",      // + dative masculine/neuter
    "mit der",      // + dative feminine
    "mit den"       // + dative plural
  ],
  "meaning": "with (+ DATIVE always)"
}
```

### 2.5 Conjunctions

Conjunctions typically have fewer forms:

```json
{
  "word": "weil",
  "forms": ["weil", "Weil"],  // Lowercase and capitalized (sentence start)
  "meaning": "because (conjunction, verb goes to END)"
}
```

---

## 3. Gender Detection System {#gender-detection-system}

The system automatically detects noun gender from the first form's article:

### Detection Logic (TypeScript)

```typescript
const getVocabGender = (vocab: VocabularyItem): 
  'masculine' | 'feminine' | 'neuter' | 'dative' | 'none' => {
  
  const firstForm = vocab.forms[0]?.toLowerCase() || '';
  
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
};
```

### Detection Rules

| First Form Pattern | Detected Type | Examples |
|-------------------|---------------|----------|
| `der ...` or `ein ...` | masculine | der Vater, der Bus |
| `die ...` or `eine ...` | feminine | die Mutter, die Stadt |
| `das ...` | neuter | das Haus, das Kind |
| `dem ...` or `einem ...` | dative | dem Kind (special case) |
| Other patterns | none | geben, weil, gut |

---

## 4. Color Coding System {#color-coding-system}

### 4.1 Text Highlighting Colors (In-Exercise View)

When vocabulary words appear in exercise text, they are highlighted with color-coded underlines:

| Gender/Type | Background | Border | Text Color | Tailwind Classes |
|-------------|------------|--------|------------|------------------|
| **Masculine** (der) | `bg-blue-50` | `border-blue-500` | Blue | `decoration-blue-500 bg-blue-50 hover:bg-blue-100 border-b-2 border-blue-500` |
| **Feminine** (die) | `bg-pink-50` | `border-pink-500` | Pink | `decoration-pink-500 bg-pink-50 hover:bg-pink-100 border-b-2 border-pink-500` |
| **Neuter** (das) | `bg-green-50` | `border-green-500` | Green | `decoration-green-500 bg-green-50 hover:bg-green-100 border-b-2 border-green-500` |
| **Dative** (dem) | `bg-purple-50` | `border-purple-500` | Purple | `decoration-purple-500 bg-purple-50 hover:bg-purple-100 border-b-2 border-purple-500` |
| **Other** (verbs, etc.) | `bg-yellow-50` | `border-yellow-400` | Yellow | `decoration-yellow-400 bg-yellow-50 hover:bg-yellow-100 border-b-2 border-yellow-400` |

### 4.2 Gender Badge Colors (In Modal Header)

Small badges showing gender in vocabulary modals:

| Gender | Badge Text | Badge Classes |
|--------|------------|---------------|
| Masculine | `der` | `bg-blue-100 text-blue-800 border-blue-300` |
| Feminine | `die` | `bg-pink-100 text-pink-800 border-pink-300` |
| Neuter | `das` | `bg-green-100 text-green-800 border-green-300` |
| Dative | `dem` | `bg-purple-100 text-purple-800 border-purple-300` |
| Other | `verb/other` | `bg-yellow-100 text-yellow-800 border-yellow-300` |

### 4.3 Case Colors (In Modal Forms Display)

When displaying all forms in the vocabulary modal, each form is color-coded by grammatical case:

| Case | Background | Text | Border | Detection Pattern |
|------|------------|------|--------|-------------------|
| **Nominativ** | `bg-blue-50` | `text-blue-800` | `border-blue-300` | Starts with `der`, `die`, `das` |
| **Akkusativ** | `bg-teal-50` | `text-teal-800` | `border-teal-300` | Starts with `den`, `einen` |
| **Dativ** | `bg-orange-50` | `text-orange-800` | `border-orange-300` | Starts with `dem`, contains `einem`, `meiner`, `meinem` |
| **Genitiv** | `bg-purple-50` | `text-purple-800` | `border-purple-300` | Starts with `des`, `einer`, `eines` |
| **Plural** | `bg-pink-50` | `text-pink-800` | `border-pink-300` | Contains plural indicators |
| **Default** | `bg-gray-100` | `text-gray-700` | `border-gray-300` | Other forms |

### Visual Color Legend (shown in modal)

```
┌─────────────────────────────────────────────────┐
│  Color Key:                                      │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐         │
│  │Nominativ │ │Akkusativ │ │Dativ     │         │
│  │ (blue)   │ │ (teal)   │ │ (orange) │         │
│  └──────────┘ └──────────┘ └──────────┘         │
│  ┌──────────┐ ┌──────────┐                      │
│  │Genitiv   │ │Plural    │                      │
│  │ (purple) │ │ (pink)   │                      │
│  └──────────┘ └──────────┘                      │
└─────────────────────────────────────────────────┘
```

---

## 5. Text Highlighting Feature {#text-highlighting-feature}

### How It Works

1. **Build Vocabulary Index**: Create a map of all word forms to their vocabulary items
2. **Tokenize Text**: Split exercise text into words (preserving punctuation)
3. **Match Tokens**: Check each word against the vocabulary index
4. **Apply Highlighting**: Wrap matched words in colored, clickable spans

### Implementation (TypeScript/React)

```typescript
const highlightVocabulary = (
  text: string, 
  onWordClick: (vocab: VocabularyItem) => void
) => {
  if (!text || vocabulary.length === 0) {
    return <span>{text}</span>;
  }

  // Build form-to-vocabulary map (removing articles for better matching)
  const formToVocab = new Map<string, VocabularyItem>();
  vocabulary.forEach(vocab => {
    vocab.forms.forEach(form => {
      // Strip articles: "der Mann" → "mann"
      const normalizedForm = form.toLowerCase()
        .replace(/^(der|die|das|den|dem|des|ein|eine|einem|einen|einer)\s+/, '');
      formToVocab.set(normalizedForm, vocab);
    });
  });

  // Tokenize preserving whitespace and punctuation
  const tokens = text.split(/(\s+|[.,!?;:(){}[\]"'])/);
  
  return (
    <span>
      {tokens.map((token, idx) => {
        if (!token.trim()) return token;
        
        const normalizedToken = token.toLowerCase()
          .replace(/[.,!?;:(){}[\]"']/g, '');
        const vocab = formToVocab.get(normalizedToken);
        
        if (vocab) {
          const gender = getVocabGender(vocab);
          const colorClasses = {
            masculine: 'bg-blue-50 border-b-2 border-blue-500',
            feminine: 'bg-pink-50 border-b-2 border-pink-500',
            neuter: 'bg-green-50 border-b-2 border-green-500',
            dative: 'bg-purple-50 border-b-2 border-purple-500',
            none: 'bg-yellow-50 border-b-2 border-yellow-400'
          };
          
          return (
            <span
              key={idx}
              onClick={() => onWordClick(vocab)}
              className={`cursor-pointer px-1 rounded ${colorClasses[gender]}`}
            >
              {token}
            </span>
          );
        }
        
        return <span key={idx}>{token}</span>;
      })}
    </span>
  );
};
```

### Example Visual Output

**Original text:**
```
Ich gebe dem Lehrer das Buch.
```

**Highlighted display:**
```
Ich [gebe] [dem] [Lehrer] [das] [Buch].
     ↑      ↑      ↑       ↑      ↑
   yellow purple  blue   green  green
  (verb) (dative)(masc) (neuter)(neuter)
```

---

## 6. Vocabulary Card Modal {#vocabulary-card-modal}

When a user clicks a highlighted word, a modal appears showing:

### Modal Structure

```
┌───────────────────────────────────────────────────┐
│  Haus  [das]                              [✕]    │
│                                                   │
│  Meaning:                                         │
│  house (neuter)                                   │
│                                                   │
│  All Forms (Cases & Usage):                       │
│  ┌───────────┐ ┌────────────┐ ┌──────────┐       │
│  │ das Haus  │ │ des Hauses │ │ dem Haus │       │
│  │  (blue)   │ │  (purple)  │ │ (orange) │       │
│  └───────────┘ └────────────┘ └──────────┘       │
│  ┌────────────┐ ┌───────────┐ ┌────────────┐     │
│  │ die Häuser │ │ zu Hause  │ │ nach Hause │     │
│  │   (pink)   │ │  (gray)   │ │   (gray)   │     │
│  └────────────┘ └───────────┘ └────────────┘     │
│                                                   │
│  Color Key:                                       │
│  [Nominativ] [Akkusativ] [Dativ] [Genitiv]       │
│     blue        teal     orange   purple          │
│                                                   │
│  ┌─────────────────────────────────────────────┐ │
│  │                  Close                       │ │
│  └─────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────┘
```

### Modal Components

1. **Header**: Word + Gender Badge + Close Button
2. **Meaning Section**: English translation with grammar notes
3. **Forms Section**: All forms as color-coded pills/badges
4. **Color Legend**: Explains case color coding
5. **Close Button**: Full-width action button

---

## 7. Flashcard System {#flashcard-system}

### Flashcard Card Design

**Front Side (German):**
```
╔═══════════════════════════════════════════════════╗
║              GERMAN WORD                           ║
║                                                    ║
║                  der Freund                        ║
║                                                    ║
║              Forms:                                ║
║              der Freund                            ║
║              des Freundes                          ║
║              dem Freund                            ║
║              den Freund                            ║
║              die Freunde                           ║
║                                                    ║
║         👆 Click to reveal meaning                 ║
╚═══════════════════════════════════════════════════╝
```
- Gradient: `from-indigo-500 to-purple-600`

**Back Side (Meaning):**
```
╔═══════════════════════════════════════════════════╗
║                 MEANING                            ║
║                                                    ║
║                  friend                            ║
║                                                    ║
╚═══════════════════════════════════════════════════╝
```
- Gradient: `from-green-500 to-teal-600`

### SRS (Spaced Repetition) Tracking

Each vocabulary item tracks:
- `timesAnswered`: Total flashcard reviews
- `timesCorrect`: Correct self-assessments
- `lastReviewed`: Last practice timestamp

**Mastery Levels:**
| Accuracy | Level | Badge |
|----------|-------|-------|
| ≥80% | Mastered | 🌟 Mastered |
| ≥60% | Learning | 📚 Learning |
| <60% | Weak | ⚠️ Weak |
| 0 reviews | New | 🆕 New |

---

## 8. JSON Import Format {#json-import-format}

### Complete Topic JSON Structure

```json
{
  "topic": {
    "title": "Dative Case Practice",
    "description": "Master dative prepositions and articles"
  },
  "exercises": [
    {
      "name": "Dative Prepositions",
      "description": "Practice with bei, mit, nach, von, zu, aus, seit",
      "questions": [
        {
          "type": "fill-blank",
          "text": "Ich fahre mit ___ Bus zur Arbeit.",
          "answer": "dem"
        }
      ]
    }
  ],
  "vocabulary": [
    {
      "word": "Bus",
      "forms": ["der Bus", "des Busses", "dem Bus", "den Bus", "die Busse"],
      "meaning": "bus (masculine)"
    },
    {
      "word": "fahren",
      "forms": ["fahren", "fährt", "fuhr", "gefahren"],
      "meaning": "to drive/travel"
    },
    {
      "word": "mit",
      "forms": ["mit", "mit dem", "mit der", "mit den"],
      "meaning": "with (+ DATIVE always)"
    }
  ]
}
```

### Vocabulary-Only Import

```json
[
  {
    "word": "Haus",
    "forms": ["das Haus", "des Hauses", "dem Haus", "die Häuser"],
    "meaning": "house (neuter)"
  },
  {
    "word": "geben",
    "forms": ["geben", "gibt", "gab", "gegeben"],
    "meaning": "to give (+ dative indirect object)"
  }
]
```

---

## 9. Implementation Details {#implementation-details}

### Required States (React)

```typescript
const [vocabulary, setVocabulary] = useState<VocabularyItem[]>([]);
const [selectedWord, setSelectedWord] = useState<VocabularyItem | null>(null);
const [showVocabModal, setShowVocabModal] = useState(false);
const [flashcardPool, setFlashcardPool] = useState<VocabularyItem[]>([]);
```

### Storage

- Uses `localStorage` for persistence
- Key: `vocabulary` (JSON array of VocabularyItem)
- Auto-saved on state changes

### Key Functions

| Function | Purpose |
|----------|---------|
| `getVocabGender()` | Detect noun gender from forms |
| `highlightVocabulary()` | Wrap text words in colored spans |
| `handleWordClick()` | Open vocabulary detail modal |
| `createFlashcardPool()` | Select words for flashcard session |
| `transformDefaultVocabulary()` | Import JSON vocabulary |

---

## 📎 Quick Reference Card

### Color System Summary

```
┌────────────────────────────────────────────────────────┐
│  GENDER COLORS (Highlighting & Badges)                  │
│  ─────────────────────────────────────                  │
│  🔵 Blue   = Masculine (der)                            │
│  🩷 Pink   = Feminine (die)                             │
│  🟢 Green  = Neuter (das)                               │
│  🟣 Purple = Dative (dem) - special case                │
│  🟡 Yellow = Other (verbs, adjectives, conjunctions)    │
│                                                         │
│  CASE COLORS (Form Pills in Modal)                      │
│  ─────────────────────────────────                      │
│  🔵 Blue   = Nominativ                                  │
│  🩵 Teal   = Akkusativ                                  │
│  🟠 Orange = Dativ                                      │
│  🟣 Purple = Genitiv                                    │
│  🩷 Pink   = Plural                                     │
│  ⚪ Gray   = Default/Other                              │
└────────────────────────────────────────────────────────┘
```

### Vocabulary Form Checklist

For **nouns**, include:
- [ ] Nominativ with article (der/die/das + word)
- [ ] Genitiv (des/der + word)
- [ ] Dativ (dem/der + word)
- [ ] Akkusativ (den/die/das + word)
- [ ] Plural form (die + plural)
- [ ] Common phrases (if applicable)

For **verbs**, include:
- [ ] Infinitive (base form)
- [ ] 3rd person singular present
- [ ] Simple past (Präteritum)
- [ ] Past participle (Partizip II)
- [ ] Fixed prepositions with case info

For **adjectives**, include:
- [ ] Base form
- [ ] Common declension endings (-e, -en, -er, -es)
- [ ] Comparative and superlative

---

## 🎯 Best Practices for AI Agents

When creating vocabulary for this system:

1. **Always start noun forms with the article** - This is how gender is detected
2. **Include grammar notes in meaning** - e.g., "(+ DATIVE)", "(masculine)"
3. **Order matters** - Put the nominative/infinitive form first
4. **Be comprehensive** - Include all common forms users might encounter
5. **Use consistent formatting** - Same pattern for all similar word types
6. **Include fixed expressions** - Common phrases like "zu Hause", "nach Hause"

---

*Last updated: January 2026*
