/**
 * Bilingual content for Grammar Lessons
 * Contains translations for notes, keyRules, commonMistakes, quickTips, examTips
 */

export interface LessonContentTranslation {
  notes?: Record<number, { de: string; en: string }>;
  keyRules?: { de: string[]; en: string[] };
  commonMistakes?: { de: string[]; en: string[] };
  quickTips?: { de: string[]; en: string[] };
  examTips?: { de: string[]; en: string[] };
}

export const LESSON_CONTENT_TRANSLATIONS: Record<string, LessonContentTranslation> = {
  'lesson-1': {
    notes: {
      0: {
        de: "Einfacher Aussagesatz. Das Verb 'ist' steht an der 2. Position.",
        en: "Simple declarative sentence. The verb 'ist' is in the 2nd position."
      },
      1: {
        de: "Standard-SVO-Reihenfolge. 'Die Menschen' ist Plural, daher lautet das Verb 'zahlen' (nicht 'zahlt').",
        en: "Standard SVO order. 'Die Menschen' is plural, so the verb is 'zahlen' (not 'zahlt')."
      },
      2: {
        de: "Zahlen stehen im Deutschen vor dem Substantiv, genau wie im Englischen.",
        en: "Numbers come before the noun in German, just like English."
      }
    },
    keyRules: {
      de: [
        "Das Verb steht IMMER an der 2. Position in Hauptsätzen",
        "Das Subjekt steht normalerweise zuerst, aber nicht immer",
        "Wenn etwas anderes den Satz beginnt, rückt das Subjekt hinter das Verb"
      ],
      en: [
        "The verb ALWAYS comes in the 2nd position in main clauses",
        "The subject usually comes first, but not always",
        "If something else starts the sentence, the subject moves after the verb"
      ]
    },
    commonMistakes: {
      de: [
        "❌ Deutschland ein Rechtsstaat ist. → ✅ Deutschland ist ein Rechtsstaat.",
        "❌ Die Menschen Steuern zahlen. → ✅ Die Menschen zahlen Steuern."
      ],
      en: [
        "❌ Deutschland ein Rechtsstaat ist. → ✅ Deutschland ist ein Rechtsstaat.",
        "❌ Die Menschen Steuern zahlen. → ✅ Die Menschen zahlen Steuern."
      ]
    }
  },
  'lesson-2': {
    notes: {
      0: {
        de: "'In Deutschland' steht zuerst, also steht 'können' weiterhin an der 2. Position, aber das Subjekt 'Eltern' rückt dahinter.",
        en: "'In Deutschland' comes first, so 'können' is still in 2nd position, but the subject 'Eltern' moves after it."
      },
      1: {
        de: "Dies ist ein Beispiel aus einer Frage. Der Infinitiv 'annehmen' muss ans Ende.",
        en: "This is a conditional example from a question. The infinitive 'annehmen' must go to the end."
      },
      2: {
        de: "Das Reflexivpronomen 'sich' steht vor dem Objekt. Der Infinitiv 'halten' geht ans Ende.",
        en: "The reflexive pronoun 'sich' comes before the object. The infinitive 'halten' goes to the end."
      },
      3: {
        de: "Einfache Modalverb + Infinitiv Struktur.",
        en: "Simple modal + infinitive structure."
      }
    },
    keyRules: {
      de: [
        "Das Modalverb steht an der 2. Position (konjugiert nach dem Subjekt)",
        "Das Hauptverb geht ans ENDE in der Infinitivform (nicht konjugiert)",
        "Häufige Modalverben: können (can), dürfen (may), müssen (must), sollen (should), wollen (want to), mögen (like to)"
      ],
      en: [
        "Modal verb is in 2nd position (conjugated for the subject)",
        "Main verb goes to the END in infinitive form (unconjugated)",
        "Common modals: können (can), dürfen (may), müssen (must), sollen (should), wollen (want to), mögen (like to)"
      ]
    },
    commonMistakes: {
      de: [
        "❌ Eltern können zu entscheiden. → ✅ Eltern können entscheiden. (kein 'zu' bei Modalverben)",
        "❌ Man darf annehmen Geld. → ✅ Man darf Geld annehmen. (Verb am ENDE)",
        "❌ Alle müssen halten an die Gesetze. → ✅ Alle müssen sich an die Gesetze halten."
      ],
      en: [
        "❌ Eltern können zu entscheiden. → ✅ Eltern können entscheiden. (no 'zu' with modals)",
        "❌ Man darf annehmen Geld. → ✅ Man darf Geld annehmen. (verb at END)",
        "❌ Alle müssen halten an die Gesetze. → ✅ Alle müssen sich an die Gesetze halten."
      ]
    }
  },
  'lesson-3': {
    notes: {
      0: {
        de: "Beachten Sie: Im Hauptsatz steht 'sagen' am Ende (Modalverb-Regel). Im Nebensatz steht 'gilt' am ENDE.",
        en: "Notice: In the main clause 'sagen' is at the end (modal verb rule). In the subordinate clause, 'gilt' is at the END."
      },
      1: {
        de: "'teilnimmt' (teilnehmen) geht ans Ende des Nebensatzes.",
        en: "'teilnimmt' (participates) goes to the end of the subordinate clause."
      },
      2: {
        de: "Selbst das einfache Verb 'ist' wandert in einem Nebensatz ans Ende.",
        en: "Even the simple verb 'ist' moves to the end in a subordinate clause."
      },
      3: {
        de: "'wenn' leitet eine Bedingung ein, das Verb geht ans Ende.",
        en: "'wenn' introduces a condition, verb goes to the end."
      }
    },
    keyRules: {
      de: [
        "Nebensatzkonjunktionen: weil (because), dass (that), ob (whether), wenn (if/when), als (when-past), während (while), obwohl (although)",
        "ALLE Verben (einschließlich Modalverben und Hilfsverben) gehen ans ENDE von Nebensätzen",
        "Ein Komma trennt immer Hauptsatz und Nebensatz",
        "Wortstellung im Nebensatz: Konjunktion + Subjekt + andere Elemente + VERB(en) am ENDE"
      ],
      en: [
        "Subordinating conjunctions: weil (because), dass (that), ob (whether), wenn (if/when), als (when-past), während (while), obwohl (although)",
        "ALL verbs (including modals and auxiliaries) go to the END of subordinate clauses",
        "Comma always separates main clause from subordinate clause",
        "Word order in subordinate clause: conjunction + subject + other elements + VERB(s) at END"
      ]
    },
    commonMistakes: {
      de: [
        "❌ weil Meinungsfreiheit gilt hier → ✅ weil hier Meinungsfreiheit gilt",
        "❌ dass Deutschland ist ein Rechtsstaat → ✅ dass Deutschland ein Rechtsstaat ist",
        "❌ ob es teilnimmt am Religionsunterricht → ✅ ob es am Religionsunterricht teilnimmt"
      ],
      en: [
        "❌ weil Meinungsfreiheit gilt hier → ✅ weil hier Meinungsfreiheit gilt",
        "❌ dass Deutschland ist ein Rechtsstaat → ✅ dass Deutschland ein Rechtsstaat ist",
        "❌ ob es teilnimmt am Religionsunterricht → ✅ ob es am Religionsunterricht teilnimmt"
      ]
    }
  },
  'lesson-4': {
    keyRules: {
      de: [
        "Ja/Nein-Fragen: Verb an ERSTER Position",
        "W-Fragen: Fragewort + Verb an 2. Position",
        "Häufige Fragewörter: Was, Wer, Wo, Wann, Warum, Wie, Welche/r/s",
        "Das Verb ist in Fragen immer konjugiert"
      ],
      en: [
        "Yes/No questions: Verb in FIRST position",
        "W-questions: Question word + Verb in 2nd position",
        "Common question words: Was, Wer, Wo, Wann, Warum, Wie, Welche/r/s",
        "The verb is always conjugated in questions"
      ]
    },
    commonMistakes: {
      de: [
        "❌ Was du machst? → ✅ Was machst du?",
        "❌ Du kommst aus Deutschland? → ✅ Kommst du aus Deutschland?",
        "❌ Wann der Zug kommt? → ✅ Wann kommt der Zug?"
      ],
      en: [
        "❌ Was du machst? → ✅ Was machst du?",
        "❌ Du kommst aus Deutschland? → ✅ Kommst du aus Deutschland?",
        "❌ Wann der Zug kommt? → ✅ Wann kommt der Zug?"
      ]
    }
  },
  'lesson-5': {
    keyRules: {
      de: [
        "Perfekt = haben/sein (konjugiert) + Partizip II am Ende",
        "Die meisten Verben verwenden 'haben'",
        "Bewegungsverben (gehen, kommen, fahren) und Zustandsverben (sein, bleiben) verwenden 'sein'",
        "Partizip II: ge- + Stamm + -t (regelmäßig) oder ge- + Stamm + -en (unregelmäßig)"
      ],
      en: [
        "Perfect tense = haben/sein (conjugated) + past participle at the end",
        "Most verbs use 'haben'",
        "Verbs of motion (gehen, kommen, fahren) and state verbs (sein, bleiben) use 'sein'",
        "Past participle: ge- + stem + -t (regular) or ge- + stem + -en (irregular)"
      ]
    },
    commonMistakes: {
      de: [
        "❌ Ich habe nach Berlin gegangen. → ✅ Ich bin nach Berlin gegangen.",
        "❌ Er hat geschlafen geworden. → ✅ Er hat geschlafen.",
        "❌ Wir sind das Buch gelesen. → ✅ Wir haben das Buch gelesen."
      ],
      en: [
        "❌ Ich habe nach Berlin gegangen. → ✅ Ich bin nach Berlin gegangen.",
        "❌ Er hat geschlafen geworden. → ✅ Er hat geschlafen.",
        "❌ Wir sind das Buch gelesen. → ✅ Wir haben das Buch gelesen."
      ]
    }
  },
  'lesson-6': {
    notes: {
      0: {
        de: "Formelles 'Sie' verwendet dieselben Verbformen wie 'sie' (they) - Pluralformen.",
        en: "Formal 'Sie' uses the same verb forms as 'sie' (they) - plural forms."
      },
      1: {
        de: "In Fragen verwendet 'Sie' immer noch Pluralverbformen.",
        en: "In questions, 'Sie' still uses plural verb forms."
      },
      2: {
        de: "Testfragen verwenden niemals 'du' oder 'ihr' - immer 'Sie'!",
        en: "Test questions never use 'du' or 'ihr' - always 'Sie'!"
      }
    },
    keyRules: {
      de: [
        "'Sie' wird IMMER großgeschrieben, wenn es 'Sie' (formell) bedeutet",
        "'Sie' verwendet dieselben Verbformen wie 'sie' (they) - Pluralkonjugation",
        "'sie' (kleingeschrieben) bedeutet 'sie' (she), 'sie' (they) oder 'es' (je nach Kontext)",
        "Reflexivpronomen mit 'Sie' ist 'sich': Sie müssen sich anmelden",
        "In Testfragen sehen Sie nur formelles 'Sie', niemals 'du' oder 'ihr'"
      ],
      en: [
        "'Sie' is ALWAYS capitalized when it means 'you' (formal)",
        "'Sie' takes the same verb forms as 'sie' (they) - plural conjugation",
        "'sie' (lowercase) means 'she', 'they', or 'it' (depending on context)",
        "Reflexive pronoun with 'Sie' is 'sich': Sie müssen sich anmelden (You must register yourself)",
        "In test questions, you'll only see formal 'Sie', never 'du' or 'ihr'"
      ]
    }
  },
  'lesson-7': {
    keyRules: {
      de: [
        "IMMER Substantive mit ihrem Artikel lernen: 'der Staat', nicht nur 'Staat'",
        "Zusammengesetzte Substantive nehmen das Geschlecht des LETZTEN Wortes: das Grundgesetz (das Gesetz)",
        "Plural ist IMMER 'die', unabhängig vom Singular-Geschlecht",
        "In Fragen muss 'welcher/welche/welches' mit dem Geschlecht des Substantivs übereinstimmen"
      ],
      en: [
        "ALWAYS learn nouns with their article: 'der Staat', not just 'Staat'",
        "Compound nouns take the gender of the LAST word: das Grundgesetz (das Gesetz)",
        "Plural is ALWAYS 'die', regardless of singular gender",
        "In questions, 'welcher/welche/welches' (which) must match the noun's gender"
      ]
    },
    quickTips: {
      de: [
        "Wörter mit -ung, -heit, -keit sind immer feminin",
        "Wörter mit -chen, -lein sind immer neutral",
        "Wörter mit -er (für Personen) sind meist maskulin"
      ],
      en: [
        "Words ending in -ung, -heit, -keit are always feminine",
        "Words ending in -chen, -lein are always neuter",
        "Words ending in -er (for people) are usually masculine"
      ]
    }
  },
  'lesson-8': {
    keyRules: {
      de: [
        "Präpositionen erfordern IMMER einen bestimmten Fall",
        "Lernen Sie häufige Präpositionen mit ihren Fällen",
        "Achten Sie auf Kontraktionen: im = in dem, zum = zu dem, usw.",
        "Wechselpräpositionen: Dativ für Ort, Akkusativ für Richtung"
      ],
      en: [
        "Prepositions ALWAYS require a specific case",
        "Learn common prepositions with their cases",
        "Watch for contractions: im = in dem, zum = zu dem, etc.",
        "Two-way prepositions: dative for location, accusative for direction"
      ]
    },
    quickTips: {
      de: [
        "Eselsbrücke für Akkusativ: FUGOD (für, um, gegen, ohne, durch)",
        "Eselsbrücke für Dativ: Aus bei mit nach seit von zu"
      ],
      en: [
        "Memory trick for Accusative: FUGOD (für, um, gegen, ohne, durch)",
        "Memory trick for Dative: Aus bei mit nach seit von zu"
      ]
    }
  },
  'lesson-9': {
    notes: {
      0: {
        de: "Der Bundeskanzler erhält die Handlung (wird gewählt), nicht der Bundestag.",
        en: "The Federal Chancellor receives the action (is elected), not the Bundestag."
      },
      1: {
        de: "Verwenden Sie 'werden' (Plural), wenn das Subjekt im Plural steht.",
        en: "Use 'werden' (plural) when subject is plural."
      }
    },
    keyRules: {
      de: [
        "Verwenden Sie 'wird' (Singular) oder 'werden' (Plural) je nach Subjekt",
        "Das Partizip II geht IMMER ans ENDE",
        "Der Handelnde (wer die Aktion ausführt) verwendet 'von' + Dativ: 'vom Bundestag'",
        "Passiv Vergangenheit verwendet 'wurde/wurden': 'wurde gewählt' (was elected)"
      ],
      en: [
        "Use 'wird' (singular) or 'werden' (plural) based on subject",
        "Past participle always goes to the END",
        "Agent (who does the action) uses 'von' + dative: 'vom Bundestag'",
        "Past passive uses 'wurde/wurden': 'wurde gewählt' (was elected)"
      ]
    }
  },
  'lesson-10': {
    notes: {
      0: {
        de: "Wörtlich: Alle müssen sich an die Gesetze halten.",
        en: "Literal: Everyone must hold themselves to the laws."
      },
      1: {
        de: "Wörtlich: Man kann sich für eine Religion entscheiden.",
        en: "Literal: One can decide oneself for a religion."
      },
      2: {
        de: "Wörtlich: Sie müssen sich selbst anmelden.",
        en: "Literal: You must register yourself."
      }
    },
    keyRules: {
      de: [
        "Reflexivpronomen kommt meist direkt nach dem konjugierten Verb",
        "In Nebensätzen: 'dass er sich entscheidet' (sich steht nach dem Subjekt)",
        "Einige Verben MÜSSEN im Deutschen reflexiv sein: sich befinden, sich verhalten",
        "Akkusativ sich: wenn das Reflexiv das direkte Objekt ist",
        "Dativ sich: wenn es ein anderes Akkusativobjekt gibt"
      ],
      en: [
        "Reflexive pronoun usually comes right after the conjugated verb",
        "In subordinate clauses: 'dass er sich entscheidet' (sich still after subject)",
        "Some verbs MUST be reflexive in German: sich befinden, sich verhalten",
        "Accusative sich: when the reflexive is the direct object",
        "Dative sich: when there's another accusative object"
      ]
    },
    commonMistakes: {
      de: [
        "❌ Ich wasche mich die Hände. → ✅ Ich wasche mir die Hände.",
        "❌ Er freut über das Geschenk. → ✅ Er freut sich über das Geschenk.",
        "❌ Wir treffen am Bahnhof. → ✅ Wir treffen uns am Bahnhof."
      ],
      en: [
        "❌ Ich wasche mich die Hände. → ✅ Ich wasche mir die Hände.",
        "❌ Er freut über das Geschenk. → ✅ Er freut sich über das Geschenk.",
        "❌ Wir treffen am Bahnhof. → ✅ Wir treffen uns am Bahnhof."
      ]
    }
  },
  'lesson-11': {
    keyRules: {
      de: [
        "'es gibt' erfordert immer Akkusativ",
        "'es gibt' ist immer Singular, auch bei Pluralobjekten",
        "'man' verwendet immer die 3. Person Singular (wie 'er/sie/es')",
        "'man' mit Reflexiv verwendet 'sich': man muss sich anmelden",
        "Wenn ein anderes Element den Satz beginnt, verschwindet 'es' oft: 'In Deutschland gibt es'"
      ],
      en: [
        "'es gibt' always takes accusative case",
        "'es gibt' is always singular, even with plural objects",
        "'man' always uses 3rd person singular verb forms (like 'er/sie/es')",
        "'man' with reflexive uses 'sich': man muss sich anmelden",
        "When another element starts the sentence, 'es' often disappears: 'In Deutschland gibt es'"
      ]
    }
  },
  'lesson-12': {
    keyRules: {
      de: [
        "Koordinierende Konjunktionen ändern die Wortstellung NICHT",
        "Das Verb bleibt an der 2. Position in beiden Teilsätzen",
        "Meist Komma vor aber, denn, sondern",
        "Kein Komma vor und, oder (außer bei vollständigen Sätzen)",
        "'sondern' nur nach Verneinung: nicht ... sondern"
      ],
      en: [
        "Coordinating conjunctions DON'T change word order",
        "Verb stays in 2nd position in both clauses",
        "Usually comma before aber, denn, sondern",
        "No comma before und, oder (unless it's a full clause)",
        "'sondern' only after negative: nicht ... sondern"
      ]
    },
    quickTips: {
      de: [
        "Merken Sie: denn = weil, aber = jedoch, sondern = aber stattdessen (nach Verneinung)",
        "Schnelltest: Wenn Sie den Konnektor entfernen, sollten beide Teile vollständige Sätze sein",
        "Komma-Trick: Immer vor aber/denn/sondern, selten vor und/oder"
      ],
      en: [
        "Remember: denn = because, aber = but, sondern = but rather (after negation)",
        "Quick test: If you remove the connector, both parts should be complete sentences",
        "Comma trick: Always before aber/denn/sondern, rarely before und/oder"
      ]
    }
  },
  'lesson-13': {
    notes: {
      0: {
        de: "Dieses Muster erscheint in ~25% der Fragen. Leitet immer eine Definitionsfrage ein.",
        en: "This pattern appears in ~25% of questions. Always introduces a definition question."
      },
      1: {
        de: "Sehr häufig im Multiple-Choice-Format. 'Welche' ändert sich: welcher (maskulin), welche (feminin), welches (neutral).",
        en: "Very common in multiple-choice format. 'Welche' changes: welcher (masculine), welche (feminine), welches (neuter)."
      },
      2: {
        de: "Testet Rechte und Freiheiten. Merken Sie: dürfen = Erlaubnis, müssen = Pflicht, können = Fähigkeit.",
        en: "Tests rights and freedoms. Remember: dürfen = permission, müssen = obligation, können = ability."
      },
      3: {
        de: "Testet Pflichten. 'man' ist ein allgemeines 'du/man', nicht 'man' wie im Englischen!",
        en: "Tests obligations. 'man' is a general 'you/one', not 'man' as in English!"
      },
      4: {
        de: "Führt Definitionen über Deutschlands politisches System ein. Achten Sie auf: demokratischer, föderaler, sozialer Staat.",
        en: "Introduces definitions about Germany's political system. Watch for: demokratischer, föderaler, sozialer Staat."
      }
    },
    keyRules: {
      de: [
        "Modalverben sind WICHTIG: können (can), dürfen (may), müssen (must), sollen (should)",
        "Fragewörter: Was (what), Wer (who), Wann (when), Wo (where), Warum (why), Wie (how)",
        "Der Test verwendet 'man' (one/you allgemein) sehr häufig - nicht das englische Wort 'man'!",
        "Zahlen und Jahre: Als Ziffern geschrieben (1949, 16 Bundesländer)",
        "Verneinung: 'nicht' steht meist vor dem verneinten Wort"
      ],
      en: [
        "Modal verbs are KEY: können (can), dürfen (may), müssen (must), sollen (should)",
        "Question words: Was (what), Wer (who), Wann (when), Wo (where), Warum (why), Wie (how)",
        "Test uses 'man' (one/you in general) very frequently - not the English word 'man'!",
        "Numbers and years: Written as numerals (1949, 16 Bundesländer)",
        "Negation: 'nicht' usually comes before the word being negated"
      ]
    },
    commonMistakes: {
      de: [
        "❌ Verwechslung von 'man' (one/you) mit 'Mann' (man/husband)",
        "❌ Wort-für-Wort-Übersetzung statt Strukturverständnis",
        "❌ Nicht erkennen, dass Modalverben das Hauptverb ans ENDE schicken",
        "❌ Verwechslung von 'dürfen' (erlaubt) mit 'müssen' (muss)",
        "❌ 'Rechtsstaat' nicht als verfassungsmäßiger Staat erkennen"
      ],
      en: [
        "❌ Confusing 'man' (one/you) with 'Mann' (man/husband)",
        "❌ Translating word-by-word instead of understanding structure",
        "❌ Missing that modal verb sends main verb to END",
        "❌ Confusing 'dürfen' (allowed) with 'müssen' (must)",
        "❌ Not recognizing 'Rechtsstaat' = rule of law / constitutional state"
      ]
    },
    quickTips: {
      de: [
        "WICHTIGER WORTSCHATZ: Rechtsstaat, Grundgesetz, Bundesland, Demokratie, Gleichberechtigung",
        "Merken Sie 1949 (Grundgesetz), 1990 (Wiedervereinigung), 16 Bundesländer",
        "Wenn Sie 'dürfen' sehen → es geht um RECHTE und FREIHEITEN",
        "Wenn Sie 'müssen' sehen → es geht um PFLICHTEN und VERBINDLICHKEITEN",
        "Übungstipp: Lesen Sie zuerst das Fragewort (Was/Wer/Wo), um zu wissen, welche Antwort erwartet wird"
      ],
      en: [
        "KEY VOCABULARY: Rechtsstaat, Grundgesetz, Bundesland, Demokratie, Gleichberechtigung",
        "Remember 1949 (Grundgesetz), 1990 (Reunification), 16 Bundesländer",
        "When you see 'dürfen' → it's about RIGHTS and FREEDOMS",
        "When you see 'müssen' → it's about OBLIGATIONS and DUTIES",
        "Practice tip: Read the question word first (Was/Wer/Wo) to know what type of answer to expect"
      ]
    },
    examTips: {
      de: [
        "33 Fragen im echten Test, 17 müssen richtig sein zum Bestehen (≈52%)",
        "60 Minuten insgesamt = etwa 2 Minuten pro Frage",
        "Multiple Choice: 4 Optionen pro Frage",
        "Keine Strafe für falsche Antworten - raten Sie immer, wenn unsicher!",
        "Konzentrieren Sie sich darauf, das FRAGEWORT und MODALVERB zuerst zu verstehen"
      ],
      en: [
        "33 questions in real test, 17 need to be correct to pass (≈52%)",
        "60 minutes total = about 2 minutes per question",
        "Multiple choice: 4 options per question",
        "No penalty for wrong answers - always guess if unsure!",
        "Focus on understanding the QUESTION WORD and MODAL VERB first"
      ]
    }
  }
};

/**
 * Get translated note for a specific example
 */
export function getTranslatedNote(
  lessonId: string,
  exampleIndex: number,
  lang: 'de' | 'en'
): string | null {
  const content = LESSON_CONTENT_TRANSLATIONS[lessonId];
  if (!content?.notes?.[exampleIndex]) return null;
  return content.notes[exampleIndex][lang];
}

/**
 * Get translated key rules
 */
export function getTranslatedKeyRules(
  lessonId: string,
  lang: 'de' | 'en'
): string[] | null {
  const content = LESSON_CONTENT_TRANSLATIONS[lessonId];
  if (!content?.keyRules) return null;
  return content.keyRules[lang];
}

/**
 * Get translated common mistakes
 */
export function getTranslatedCommonMistakes(
  lessonId: string,
  lang: 'de' | 'en'
): string[] | null {
  const content = LESSON_CONTENT_TRANSLATIONS[lessonId];
  if (!content?.commonMistakes) return null;
  return content.commonMistakes[lang];
}

/**
 * Get translated quick tips
 */
export function getTranslatedQuickTips(
  lessonId: string,
  lang: 'de' | 'en'
): string[] | null {
  const content = LESSON_CONTENT_TRANSLATIONS[lessonId];
  if (!content?.quickTips) return null;
  return content.quickTips[lang];
}

/**
 * Get translated exam tips
 */
export function getTranslatedExamTips(
  lessonId: string,
  lang: 'de' | 'en'
): string[] | null {
  const content = LESSON_CONTENT_TRANSLATIONS[lessonId];
  if (!content?.examTips) return null;
  return content.examTips[lang];
}
