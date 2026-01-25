/**
 * Bilingual translations for Grammar Lessons
 * Structure: lessonId -> { de: {...}, en: {...} }
 */

export interface LessonTranslation {
  title: string;
  description: string;
  category: string;
  explanation?: string;
  pattern?: string;
  keyRulesIntro?: string;
  commonMistakesIntro?: string;
  quickTipsIntro?: string;
  examTipsIntro?: string;
}

export const LESSON_TRANSLATIONS: Record<string, { de: LessonTranslation; en: LessonTranslation }> = {
  'lesson-1': {
    de: {
      title: 'Grundlegender deutscher Satzbau (SVO)',
      description: 'Das grundlegende Subjekt-Verb-Objekt-Muster in deutschen Sätzen verstehen',
      category: 'Satzstruktur',
      explanation: 'Deutsch folgt in einfachen Sätzen einem Subjekt-Verb-Objekt (SVO) Muster, ähnlich wie Englisch. Die Verbposition ist im Deutschen jedoch sehr strikt.',
      pattern: 'Subjekt + Verb + Objekt/Ergänzung',
    },
    en: {
      title: 'Basic German Sentence Structure (SVO)',
      description: 'Understanding the basic Subject-Verb-Object order in German sentences',
      category: 'Sentence Structure',
      explanation: 'German follows a Subject-Verb-Object (SVO) pattern in simple sentences, similar to English. However, the verb position is very strict in German.',
      pattern: 'Subject + Verb + Object/Complement',
    }
  },
  'lesson-2': {
    de: {
      title: 'Modalverben (können, dürfen, müssen, sollen)',
      description: 'Wie Modalverben die Satzstruktur verändern - das Hauptverb geht ans Ende',
      category: 'Verben',
      explanation: 'Modalverben (können, dürfen, müssen, sollen) sind in Einbürgerungsfragen sehr häufig. Wenn Sie ein Modalverb verwenden, steht es an der 2. Position und das Hauptverb geht ans ENDE des Satzes in seiner Infinitivform.',
      pattern: 'Subjekt + Modalverb + ... + Hauptverb (Infinitiv)',
    },
    en: {
      title: 'Modal Verbs (können, dürfen, müssen, sollen)',
      description: 'How modal verbs change sentence structure - main verb goes to the end',
      category: 'Verbs',
      explanation: 'Modal verbs (can, may, must, should) are very common in citizenship questions. When you use a modal verb, it takes the 2nd position, and the main verb moves to the END of the sentence in its infinitive form.',
      pattern: 'Subject + Modal Verb + ... + Main Verb (infinitive)',
    }
  },
  'lesson-3': {
    de: {
      title: "Nebensätze mit 'weil', 'dass', 'ob'",
      description: 'In Nebensätzen wandert das Verb ans Ende',
      category: 'Satzstruktur',
      explanation: "Bei Wörtern wie 'weil' (because), 'dass' (that), 'ob' (whether), 'wenn' (if/when) leiten sie Nebensätze ein, bei denen ALLE Verben (einschließlich Modalverben) ans ENDE gehen.",
      pattern: 'Hauptsatz + Nebensatzkonjunktion + Subjekt + ... + Verb (ENDE)',
    },
    en: {
      title: "Subordinate Clauses with 'weil', 'dass', 'ob'",
      description: 'In subordinate clauses, the verb moves to the very END',
      category: 'Sentence Structure',
      explanation: "When you have words like 'weil' (because), 'dass' (that), 'ob' (whether), 'wenn' (if/when), they introduce subordinate clauses where ALL verbs (including modals) move to the END.",
      pattern: 'Main Clause + Subordinating Conjunction + Subject + ... + Verb (END)',
    }
  },
  'lesson-4': {
    de: {
      title: 'Fragebildung im Deutschen',
      description: 'Ja/Nein-Fragen und W-Fragen (Was, Wer, Wo, Wann, Warum, Wie)',
      category: 'Fragen',
      explanation: 'Deutsche Fragen folgen spezifischen Mustern. Bei Ja/Nein-Fragen beginnt der Satz mit dem Verb. Bei W-Fragen beginnt der Satz mit dem Fragewort, gefolgt vom Verb an der 2. Position.',
    },
    en: {
      title: 'Forming Questions in German',
      description: 'Yes/No questions and W-questions (What, Who, Where, When, Why, How)',
      category: 'Questions',
      explanation: 'German questions follow specific patterns. For Yes/No questions, the sentence starts with the verb. For W-questions, the sentence starts with the question word, followed by the verb in 2nd position.',
    }
  },
  'lesson-5': {
    de: {
      title: 'Perfekt (Vergangenheit mit haben/sein)',
      description: 'Das Hilfsverb steht an Position 2, das Partizip am Ende',
      category: 'Verben',
      explanation: "Das Perfekt wird mit 'haben' oder 'sein' als Hilfsverb und dem Partizip II gebildet. Das Hilfsverb steht an der 2. Position, das Partizip geht ans ENDE.",
    },
    en: {
      title: 'Perfect Tense (Past with haben/sein)',
      description: 'Auxiliary verb in 2nd position, past participle at the end',
      category: 'Verbs',
      explanation: "The perfect tense is formed with 'haben' or 'sein' as auxiliary verb and the past participle. The auxiliary verb is in 2nd position, the participle goes to the END.",
    }
  },
  'lesson-6': {
    de: {
      title: 'Artikel und Geschlecht (der, die, das)',
      description: 'Maskulin, feminin und neutral im Deutschen verstehen',
      category: 'Grammatik-Grundlagen',
      explanation: 'Jedes deutsche Substantiv hat ein Geschlecht: maskulin (der), feminin (die) oder neutral (das). Das Geschlecht beeinflusst Artikel, Adjektive und Pronomen.',
    },
    en: {
      title: 'Articles and Gender (der, die, das)',
      description: 'Understanding masculine, feminine, and neuter in German',
      category: 'Grammar Basics',
      explanation: 'Every German noun has a gender: masculine (der), feminine (die), or neuter (das). Gender affects articles, adjectives, and pronouns.',
    }
  },
  'lesson-7': {
    de: {
      title: 'Fälle im Deutschen (Nominativ, Akkusativ, Dativ)',
      description: 'Wie sich Artikel je nach Funktion im Satz ändern',
      category: 'Grammatik-Grundlagen',
      explanation: 'Deutsch hat vier Fälle: Nominativ (Subjekt), Akkusativ (direktes Objekt), Dativ (indirektes Objekt) und Genitiv (Besitz). Jeder Fall verändert die Artikelendungen.',
    },
    en: {
      title: 'German Cases (Nominative, Accusative, Dative)',
      description: 'How articles change based on their function in the sentence',
      category: 'Grammar Basics',
      explanation: 'German has four cases: Nominative (subject), Accusative (direct object), Dative (indirect object), and Genitive (possession). Each case changes article endings.',
    }
  },
  'lesson-8': {
    de: {
      title: 'Präpositionen mit Akkusativ und Dativ',
      description: 'Präpositionen, die bestimmte Fälle erfordern',
      category: 'Grammatik-Grundlagen',
      explanation: 'Präpositionen erfordern bestimmte Fälle. Einige verlangen immer Akkusativ (durch, für, gegen, ohne, um), andere immer Dativ (aus, bei, mit, nach, seit, von, zu).',
    },
    en: {
      title: 'Prepositions with Accusative and Dative',
      description: 'Prepositions that require specific cases',
      category: 'Grammar Basics',
      explanation: 'Prepositions require specific cases. Some always take accusative (durch, für, gegen, ohne, um), others always take dative (aus, bei, mit, nach, seit, von, zu).',
    }
  },
  'lesson-9': {
    de: {
      title: 'Negation (nicht, kein)',
      description: "Wann man 'nicht' und wann man 'kein' verwendet",
      category: 'Grammatik-Grundlagen',
      explanation: "Deutsch hat zwei Hauptwege der Verneinung: 'nicht' (nicht) für Verben, Adjektive und spezifische Substantive, und 'kein' (kein/keine) für Substantive mit unbestimmtem Artikel.",
    },
    en: {
      title: "Negation (nicht, kein)",
      description: "When to use 'nicht' and when to use 'kein'",
      category: 'Grammar Basics',
      explanation: "German has two main ways to negate: 'nicht' (not) for verbs, adjectives, and specific nouns, and 'kein' (no/not a) for nouns with indefinite articles.",
    }
  },
  'lesson-10': {
    de: {
      title: 'Reflexivverben (sich waschen, sich freuen)',
      description: 'Verben, die Reflexivpronomen erfordern',
      category: 'Verben',
      explanation: "Reflexivverben werden mit Reflexivpronomen verwendet (mich, dich, sich, uns, euch, sich). Das Pronomen bezieht sich auf das Subjekt zurück.",
    },
    en: {
      title: 'Reflexive Verbs (sich waschen, sich freuen)',
      description: 'Verbs that require reflexive pronouns',
      category: 'Verbs',
      explanation: "Reflexive verbs are used with reflexive pronouns (mich, dich, sich, uns, euch, sich). The pronoun refers back to the subject.",
    }
  },
  'lesson-11': {
    de: {
      title: 'Passiv im Deutschen',
      description: "Wie man das Passiv mit 'werden' bildet",
      category: 'Verben',
      explanation: "Das Passiv wird mit 'werden' + Partizip II gebildet. Es betont die Handlung statt des Handelnden. Häufig in formellen und rechtlichen Texten.",
    },
    en: {
      title: 'Passive Voice in German',
      description: "How to form passive with 'werden'",
      category: 'Verbs',
      explanation: "The passive voice is formed with 'werden' + past participle. It emphasizes the action rather than the doer. Common in formal and legal texts.",
    }
  },
  'lesson-12': {
    de: {
      title: 'Koordinierende Konjunktionen (und, oder, aber)',
      description: 'Sätze verbinden ohne Wortstellung zu ändern',
      category: 'Satzstruktur',
      explanation: 'Koordinierende Konjunktionen (und, oder, aber, denn, sondern) verbinden zwei Hauptsätze OHNE die Wortstellung zu ändern. Anders als bei Nebensatzkonjunktionen bleibt das Verb an der 2. Position.',
    },
    en: {
      title: 'Coordinating Conjunctions (und, oder, aber)',
      description: 'Joining sentences without changing word order',
      category: 'Sentence Structure',
      explanation: 'Coordinating conjunctions (und, oder, aber, denn, sondern) connect two main clauses WITHOUT changing the word order. Unlike subordinating conjunctions, the verb stays in 2nd position.',
    }
  },
  'lesson-13': {
    de: {
      title: 'Einbürgerungstest: Häufige Muster & Phrasen',
      description: 'Wichtige Muster und Phrasen, die häufig im deutschen Einbürgerungstest erscheinen',
      category: 'Testvorbereitung',
      explanation: 'Der Einbürgerungstest verwendet bestimmte grammatische Muster wiederholt. Diese zu beherrschen hilft Ihnen, Fragen schneller zu verstehen und sicher zu antworten!',
    },
    en: {
      title: 'Citizenship Test: Common Patterns & Phrases',
      description: 'Essential patterns and phrases that appear frequently in the German citizenship test',
      category: 'Test Preparation',
      explanation: 'The citizenship test uses specific grammatical patterns repeatedly. Mastering these will help you understand questions faster and answer with confidence!',
    }
  }
};

// UI element translations for GrammarLessons component
export const GRAMMAR_UI_TRANSLATIONS = {
  de: {
    explanation: 'Erklärung',
    pattern: 'Muster',
    examples: 'Beispiele',
    german: 'Deutsch',
    english: 'Englisch',
    breakdown: 'Aufschlüsselung',
    notes: 'Hinweise',
    keyRules: 'Wichtige Regeln',
    commonMistakes: 'Häufige Fehler',
    quickTips: 'Schnelle Tipps',
    examTips: 'Prüfungstipps',
    backToLessons: 'Zurück zu Lektionen',
    completed: 'Abgeschlossen',
    category: 'Kategorie',
    grammarLessons: 'Grammatik-Lektionen',
    learnGrammar: 'Lernen Sie deutsche Satzstruktur und Grammatik für den Einbürgerungstest',
    comprehensiveLessons: '12 umfassende Lektionen',
    progress: 'Fortschritt',
    completedLabel: 'Abgeschlossen',
    done: 'Fertig',
    reviewLesson: 'Erneut lernen',
    startLesson: 'Lektion starten',
    markCompleteAndContinue: 'Als abgeschlossen markieren & weiter',
    nextLesson: 'Nächste Lektion',
    backToLessonsList: 'Zu den Lektionen',
  },
  en: {
    explanation: 'Explanation',
    pattern: 'Pattern',
    examples: 'Examples',
    german: 'German',
    english: 'English',
    breakdown: 'Breakdown',
    notes: 'Notes',
    keyRules: 'Key Rules',
    commonMistakes: 'Common Mistakes',
    quickTips: 'Quick Tips',
    examTips: 'Exam Tips',
    backToLessons: 'Back to Lessons',
    completed: 'Completed',
    category: 'Category',
    grammarLessons: 'Grammar Lessons',
    learnGrammar: 'Learn German sentence structure and grammar for the citizenship test',
    comprehensiveLessons: '12 comprehensive lessons',
    progress: 'Progress',
    completedLabel: 'Completed',
    done: 'Done',
    reviewLesson: 'Review Lesson',
    startLesson: 'Start Lesson',
    markCompleteAndContinue: 'Mark Complete & Continue',
    nextLesson: 'Next Lesson',
    backToLessonsList: 'Back to Lessons',
  }
};

// Category translations
export const CATEGORY_TRANSLATIONS: Record<string, { de: string; en: string }> = {
  'Sentence Structure': { de: 'Satzstruktur', en: 'Sentence Structure' },
  'Verbs': { de: 'Verben', en: 'Verbs' },
  'Questions': { de: 'Fragen', en: 'Questions' },
  'Grammar Basics': { de: 'Grammatik-Grundlagen', en: 'Grammar Basics' },
  'Test Preparation': { de: 'Testvorbereitung', en: 'Test Preparation' },
  'Common Phrases': { de: 'Häufige Phrasen', en: 'Common Phrases' },
};

// Level translations
export const LEVEL_TRANSLATIONS: Record<string, { de: string; en: string }> = {
  'Beginner': { de: 'Anfänger', en: 'Beginner' },
  'Intermediate': { de: 'Fortgeschritten', en: 'Intermediate' },
  'Advanced': { de: 'Experte', en: 'Advanced' },
};
