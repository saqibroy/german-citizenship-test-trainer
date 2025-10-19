export const GERMAN_GRAMMAR_LESSONS = [
  // ============================================
  // LESSON 1: Basic Sentence Structure
  // ============================================
  {
    "id": "lesson-1",
    "title": "Basic German Sentence Structure (SVO)",
    "level": "Beginner",
    "category": "Sentence Structure",
    "description": "Understanding the basic Subject-Verb-Object order in German sentences",
    "content": {
      "explanation": "German follows a Subject-Verb-Object (SVO) pattern in simple sentences, similar to English. However, the verb position is very strict in German.",
      "pattern": "Subject + Verb + Object/Complement",
      "examples": [
        {
          "german": "Deutschland ist ein Rechtsstaat.",
          "english": "Germany is a constitutional state.",
          "breakdown": {
            "subject": "Deutschland (Germany)",
            "verb": "ist (is)",
            "complement": "ein Rechtsstaat (a constitutional state)"
          },
          "notes": "Simple declarative sentence. The verb 'ist' is in the 2nd position."
        },
        {
          "german": "Die Menschen zahlen Steuern.",
          "english": "The people pay taxes.",
          "breakdown": {
            "subject": "Die Menschen (the people)",
            "verb": "zahlen (pay)",
            "object": "Steuern (taxes)"
          },
          "notes": "Standard SVO order. 'Die Menschen' is plural, so the verb is 'zahlen' (not 'zahlt')."
        },
        {
          "german": "Deutschland hat 16 Bundesländer.",
          "english": "Germany has 16 federal states.",
          "breakdown": {
            "subject": "Deutschland (Germany)",
            "verb": "hat (has)",
            "object": "16 Bundesländer (16 federal states)"
          },
          "notes": "Numbers come before the noun in German, just like English."
        }
      ],
      "keyRules": [
        "The verb ALWAYS comes in the 2nd position in main clauses",
        "The subject usually comes first, but not always",
        "If something else starts the sentence, the subject moves after the verb"
      ],
      "commonMistakes": [
        "❌ Deutschland ein Rechtsstaat ist. → ✅ Deutschland ist ein Rechtsstaat.",
        "❌ Die Menschen Steuern zahlen. → ✅ Die Menschen zahlen Steuern."
      ]
    }
  },

  // ============================================
  // LESSON 2: Modal Verbs and Verb Position
  // ============================================
  {
    "id": "lesson-2",
    "title": "Modal Verbs (können, dürfen, müssen, sollen)",
    "level": "Beginner",
    "category": "Verbs",
    "description": "How modal verbs change sentence structure - main verb goes to the end",
    "content": {
      "explanation": "Modal verbs (can, may, must, should) are very common in citizenship questions. When you use a modal verb, it takes the 2nd position, and the main verb moves to the END of the sentence in its infinitive form.",
      "pattern": "Subject + Modal Verb + ... + Main Verb (infinitive)",
      "examples": [
        {
          "german": "In Deutschland können Eltern entscheiden.",
          "english": "In Germany, parents can decide.",
          "breakdown": {
            "subject": "Eltern (parents)",
            "modalVerb": "können (can) - 2nd position",
            "mainVerb": "entscheiden (to decide) - END of sentence"
          },
          "notes": "'In Deutschland' comes first, so 'können' is still in 2nd position, but the subject 'Eltern' moves after it."
        },
        {
          "german": "Man darf Geld annehmen.",
          "english": "One may accept money.",
          "breakdown": {
            "subject": "Man (one/you)",
            "modalVerb": "darf (may)",
            "mainVerb": "annehmen (to accept) - at the END"
          },
          "notes": "This is a conditional example from a question. The infinitive 'annehmen' must go to the end."
        },
        {
          "german": "Alle müssen sich an die Gesetze halten.",
          "english": "Everyone must follow the laws.",
          "breakdown": {
            "subject": "Alle (everyone)",
            "modalVerb": "müssen (must)",
            "reflexive": "sich (themselves)",
            "mainVerb": "halten (to hold/follow) - at the END"
          },
          "notes": "The reflexive pronoun 'sich' comes before the object. The infinitive 'halten' goes to the end."
        },
        {
          "german": "Die Menschen dürfen wählen.",
          "english": "The people may vote.",
          "breakdown": {
            "subject": "Die Menschen (the people)",
            "modalVerb": "dürfen (may/are allowed to)",
            "mainVerb": "wählen (to vote) - at the END"
          },
          "notes": "Simple modal + infinitive structure."
        }
      ],
      "keyRules": [
        "Modal verb is in 2nd position (conjugated for the subject)",
        "Main verb goes to the END in infinitive form (unconjugated)",
        "Common modals: können (can), dürfen (may), müssen (must), sollen (should), wollen (want to), mögen (like to)"
      ],
      "commonMistakes": [
        "❌ Eltern können zu entscheiden. → ✅ Eltern können entscheiden. (no 'zu' with modals)",
        "❌ Man darf annehmen Geld. → ✅ Man darf Geld annehmen. (verb at END)",
        "❌ Alle müssen halten an die Gesetze. → ✅ Alle müssen sich an die Gesetze halten."
      ]
    }
  },

  // ============================================
  // LESSON 3: Subordinate Clauses (weil, dass, ob)
  // ============================================
  {
    "id": "lesson-3",
    "title": "Subordinate Clauses with 'weil', 'dass', 'ob'",
    "level": "Intermediate",
    "category": "Sentence Structure",
    "description": "In subordinate clauses, the verb moves to the very END",
    "content": {
      "explanation": "When you have words like 'weil' (because), 'dass' (that), 'ob' (whether), 'wenn' (if/when), they introduce subordinate clauses where ALL verbs (including modals) move to the END.",
      "pattern": "Main Clause + Subordinating Conjunction + Subject + ... + Verb (END)",
      "examples": [
        {
          "german": "Menschen dürfen etwas sagen, weil hier Meinungsfreiheit gilt.",
          "english": "People may say something because freedom of speech applies here.",
          "breakdown": {
            "mainClause": "Menschen dürfen etwas sagen (normal verb position)",
            "subordinateClause": "weil hier Meinungsfreiheit gilt",
            "verbPosition": "gilt (applies) - at the VERY END after all other words"
          },
          "notes": "Notice: In the main clause 'sagen' is at the end (modal verb rule). In the subordinate clause, 'gilt' is at the END."
        },
        {
          "german": "Eltern können entscheiden, ob es am Religionsunterricht teilnimmt.",
          "english": "Parents can decide whether it participates in religious education.",
          "breakdown": {
            "mainClause": "Eltern können entscheiden",
            "subordinatingConjunction": "ob (whether)",
            "subordinateSubject": "es (it)",
            "verbPosition": "teilnimmt - at the END"
          },
          "notes": "'teilnimmt' (participates) goes to the end of the subordinate clause."
        },
        {
          "german": "Was ist damit gemeint, dass Deutschland ein Rechtsstaat ist?",
          "english": "What is meant by the fact that Germany is a constitutional state?",
          "breakdown": {
            "subordinatingConjunction": "dass (that)",
            "subordinateClause": "Deutschland ein Rechtsstaat ist",
            "verbPosition": "ist - at the END"
          },
          "notes": "Even the simple verb 'ist' moves to the end in a subordinate clause."
        },
        {
          "german": "Man darf nicht wählen, wenn man Geld annimmt.",
          "english": "One may not vote if one accepts money.",
          "breakdown": {
            "mainClause": "Man darf nicht wählen",
            "subordinatingConjunction": "wenn (if/when)",
            "subordinateVerb": "annimmt - at the END"
          },
          "notes": "'wenn' introduces a condition, verb goes to the end."
        }
      ],
      "keyRules": [
        "Subordinating conjunctions: weil (because), dass (that), ob (whether), wenn (if/when), als (when-past), während (while), obwohl (although)",
        "ALL verbs (including modals and auxiliaries) go to the END of subordinate clauses",
        "Comma always separates main clause from subordinate clause",
        "Word order in subordinate clause: conjunction + subject + other elements + VERB(s) at END"
      ],
      "commonMistakes": [
        "❌ weil Meinungsfreiheit gilt hier → ✅ weil hier Meinungsfreiheit gilt",
        "❌ dass Deutschland ist ein Rechtsstaat → ✅ dass Deutschland ein Rechtsstaat ist",
        "❌ ob es teilnimmt am Religionsunterricht → ✅ ob es am Religionsunterricht teilnimmt"
      ]
    }
  },

  // ============================================
  // LESSON 4: Question Formation
  // ============================================
  {
    "id": "lesson-4",
    "title": "Forming Questions in German",
    "level": "Beginner",
    "category": "Questions",
    "description": "Two types: Yes/No questions (verb first) and W-questions (question word first)",
    "content": {
      "explanation": "German has two types of questions: Yes/No questions start with the verb. W-questions start with a question word (Wer, Was, Wie, Wo, Wann, Warum, Welche).",
      "pattern": {
        "yesNo": "Verb + Subject + ...?",
        "wQuestion": "Question Word + Verb + Subject + ...?"
      },
      "examples": [
        {
          "german": "Ist Deutschland ein Rechtsstaat?",
          "english": "Is Germany a constitutional state?",
          "breakdown": {
            "type": "Yes/No question",
            "verb": "Ist (is) - FIRST position",
            "subject": "Deutschland (Germany)",
            "complement": "ein Rechtsstaat"
          },
          "notes": "Verb comes FIRST in yes/no questions. Subject comes second."
        },
        {
          "german": "Was ist ein Rechtsstaat?",
          "english": "What is a constitutional state?",
          "breakdown": {
            "type": "W-question",
            "questionWord": "Was (what) - position 1",
            "verb": "ist (is) - position 2",
            "subject": "ein Rechtsstaat"
          },
          "notes": "Question word first, then verb in 2nd position, then other elements."
        },
        {
          "german": "Wie heißt die deutsche Verfassung?",
          "english": "What is the German constitution called?",
          "breakdown": {
            "questionWord": "Wie (how/what)",
            "verb": "heißt (is called)",
            "subject": "die deutsche Verfassung"
          },
          "notes": "'Wie heißt...?' is a common phrase meaning 'What is... called?'"
        },
        {
          "german": "Welches Recht gehört zu den Grundrechten?",
          "english": "Which right belongs to the fundamental rights?",
          "breakdown": {
            "questionWord": "Welches (which) - agrees with 'Recht' (neuter)",
            "subject": "Recht (right)",
            "verb": "gehört (belongs)",
            "complement": "zu den Grundrechten"
          },
          "notes": "'Welches' changes based on the gender of the noun it refers to: welcher (m), welche (f), welches (n)"
        },
        {
          "german": "Wie viele Bundesländer hat Deutschland?",
          "english": "How many federal states does Germany have?",
          "breakdown": {
            "questionPhrase": "Wie viele (how many)",
            "object": "Bundesländer",
            "verb": "hat",
            "subject": "Deutschland"
          },
          "notes": "'Wie viele' always means 'how many'. The verb still comes in 2nd position (after the question phrase)."
        }
      ],
      "keyRules": [
        "Yes/No questions: Verb comes FIRST, subject second",
        "W-questions: Question word first, verb second, subject third (usually)",
        "Common question words: Was (what), Wer (who), Wie (how), Wo (where), Wann (when), Warum (why), Welche/r/s (which)",
        "The verb is always in the 2nd position (after the question word)"
      ],
      "commonMistakes": [
        "❌ Was ein Rechtsstaat ist? → ✅ Was ist ein Rechtsstaat?",
        "❌ Deutschland ist ein Rechtsstaat? (in writing) → ✅ Ist Deutschland ein Rechtsstaat?",
        "❌ Welche Recht gehört...? → ✅ Welches Recht gehört...? (must match gender)"
      ]
    }
  },

  // ============================================
  // LESSON 5: Separable Verbs
  // ============================================
  {
    "id": "lesson-5",
    "title": "Separable Verbs (teilnehmen, annehmen, stattfinden)",
    "level": "Intermediate",
    "category": "Verbs",
    "description": "Many German verbs split into two parts - the prefix goes to the END",
    "content": {
      "explanation": "Separable verbs are verbs with prefixes (like 'teil', 'an', 'ab', 'aus', 'ein', 'mit', 'zu') that separate in main clauses. The prefix goes to the END of the sentence.",
      "pattern": "Subject + Verb (conjugated) + ... + Prefix (at END)",
      "examples": [
        {
          "german": "Es nimmt am Religionsunterricht teil.",
          "english": "It participates in religious education.",
          "breakdown": {
            "infinitive": "teilnehmen (to participate)",
            "conjugatedVerb": "nimmt (takes) - 2nd position",
            "prefix": "teil (part) - at the END",
            "middle": "am Religionsunterricht (in religious education)"
          },
          "notes": "The verb 'teilnehmen' splits: 'nimmt' in 2nd position, 'teil' at the end."
        },
        {
          "german": "Man nimmt Geld an.",
          "english": "One accepts money.",
          "breakdown": {
            "infinitive": "annehmen (to accept)",
            "conjugatedVerb": "nimmt (takes)",
            "object": "Geld (money)",
            "prefix": "an (on) - at the END"
          },
          "notes": "'annehmen' splits into 'nimmt ... an'. The object 'Geld' comes before the prefix."
        },
        {
          "german": "Die Wahl findet alle vier Jahre statt.",
          "english": "The election takes place every four years.",
          "breakdown": {
            "infinitive": "stattfinden (to take place)",
            "conjugatedVerb": "findet (finds)",
            "prefix": "statt (instead) - at the END"
          },
          "notes": "'stattfinden' is a common separable verb meaning 'to take place'."
        },
        {
          "german": "Der Bundestag schließt das Gesetz ab.",
          "english": "The Bundestag passes the law.",
          "breakdown": {
            "infinitive": "abschließen (to conclude/pass)",
            "conjugatedVerb": "schließt",
            "prefix": "ab - at the END"
          },
          "notes": "With separable verbs, any objects or complements come BEFORE the prefix."
        }
      ],
      "keyRules": [
        "In main clauses: prefix goes to the END of the sentence",
        "In subordinate clauses: verb and prefix stay together at the end (e.g., 'ob es teilnimmt')",
        "With modal verbs: prefix stays attached to infinitive at the end (e.g., 'kann teilnehmen')",
        "Common separable prefixes: ab-, an-, auf-, aus-, bei-, ein-, mit-, nach-, teil-, vor-, zu-"
      ],
      "importantVerbs": [
        "teilnehmen (teil-nehmen) = to participate",
        "annehmen (an-nehmen) = to accept",
        "stattfinden (statt-finden) = to take place",
        "abschließen (ab-schließen) = to conclude/pass",
        "auswählen (aus-wählen) = to select",
        "einreichen (ein-reichen) = to submit",
        "mitwirken (mit-wirken) = to participate/cooperate"
      ],
      "commonMistakes": [
        "❌ Es teilnimmt am Unterricht. → ✅ Es nimmt am Unterricht teil.",
        "❌ Man annimmt Geld. → ✅ Man nimmt Geld an.",
        "❌ Die Wahl stattfindet heute. → ✅ Die Wahl findet heute statt."
      ]
    }
  },

  // ============================================
  // LESSON 6: Formal "Sie" vs Informal "du"
  // ============================================
  {
    "id": "lesson-6",
    "title": "Formal Address: 'Sie' (You) - Always Capitalized",
    "level": "Beginner",
    "category": "Grammar Basics",
    "description": "German has formal and informal ways to say 'you' - test questions ALWAYS use formal 'Sie'",
    "content": {
      "explanation": "In German, there are different words for 'you': 'Sie' (formal, always capitalized), 'du' (informal singular), 'ihr' (informal plural). Citizenship test questions ALWAYS use formal 'Sie' because they're addressing adults officially.",
      "examples": [
        {
          "german": "Sie müssen sich an die Gesetze halten.",
          "english": "You must follow the laws.",
          "breakdown": {
            "formal": "Sie (you - formal) - ALWAYS capitalized",
            "verb": "müssen (must) - plural form, same as 'they'",
            "reflexive": "sich (yourself - formal reflexive)"
          },
          "notes": "Formal 'Sie' uses the same verb forms as 'sie' (they) - plural forms."
        },
        {
          "german": "Können Sie mir helfen?",
          "english": "Can you help me?",
          "breakdown": {
            "formal": "Sie",
            "verb": "können - plural form",
            "dative": "mir (to me)"
          },
          "notes": "In questions, 'Sie' still uses plural verb forms."
        },
        {
          "comparison": {
            "formal": "Sie wählen (You vote - formal)",
            "informalSingular": "Du wählst (You vote - informal to one friend)",
            "informalPlural": "Ihr wählt (You vote - informal to multiple friends)"
          },
          "notes": "Test questions never use 'du' or 'ihr' - always 'Sie'!"
        }
      ],
      "keyRules": [
        "'Sie' is ALWAYS capitalized when it means 'you' (formal)",
        "'Sie' takes the same verb forms as 'sie' (they) - plural conjugation",
        "'sie' (lowercase) means 'she', 'they', or 'it' (depending on context)",
        "Reflexive pronoun with 'Sie' is 'sich': Sie müssen sich anmelden (You must register yourself)",
        "In test questions, you'll only see formal 'Sie', never 'du' or 'ihr'"
      ],
      "conjugationExamples": [
        {
          "verb": "sein (to be)",
          "formal": "Sie sind (you are)",
          "informal": "du bist (you are)"
        },
        {
          "verb": "haben (to have)",
          "formal": "Sie haben (you have)",
          "informal": "du hast (you have)"
        },
        {
          "verb": "können (can)",
          "formal": "Sie können (you can)",
          "informal": "du kannst (you can)"
        },
        {
          "verb": "müssen (must)",
          "formal": "Sie müssen (you must)",
          "informal": "du musst (you must)"
        }
      ]
    }
  },

  // ============================================
  // LESSON 7: Articles and Gender (der, die, das)
  // ============================================
  {
    "id": "lesson-7",
    "title": "German Articles: der, die, das (The) and ein, eine (a/an)",
    "level": "Beginner",
    "category": "Grammar Basics",
    "description": "Every German noun has a gender: masculine, feminine, or neuter",
    "content": {
      "explanation": "Unlike English which uses 'the' for everything, German has three genders (masculine, feminine, neuter) and articles change based on gender and case. This is why you see 'der Staat', 'die Regierung', 'das Gesetz'.",
      "genders": {
        "masculine": {
          "article": "der (the), ein (a/an)",
          "examples": [
            "der Staat (the state)",
            "der Bundestag (the federal parliament)",
            "der Bürger (the citizen)",
            "ein Rechtsstaat (a constitutional state)"
          ]
        },
        "feminine": {
          "article": "die (the), eine (a/an)",
          "examples": [
            "die Regierung (the government)",
            "die Verfassung (the constitution)",
            "die Wahl (the election)",
            "eine Partei (a party)"
          ]
        },
        "neuter": {
          "article": "das (the), ein (a/an)",
          "examples": [
            "das Grundgesetz (the basic law)",
            "das Recht (the right)",
            "das Land (the state/country)",
            "ein Gesetz (a law)"
          ]
        },
        "plural": {
          "article": "die (the - for ALL genders), keine (no/none)",
          "examples": [
            "die Bundesländer (the federal states)",
            "die Menschen (the people)",
            "die Rechte (the rights)"
          ]
        }
      },
      "patterns": "Certain endings often indicate gender, but there are many exceptions",
      "commonEndings": {
        "masculine": [
          "-er (der Bürger, der Arbeiter, der Wähler)",
          "-ismus (der Sozialismus, der Nationalismus)"
        ],
        "feminine": [
          "-ung (die Regierung, die Verfassung, die Einbürgerung)",
          "-heit (die Freiheit, die Mehrheit)",
          "-keit (die Möglichkeit, die Gleichberechtigung)",
          "-schaft (die Gesellschaft, die Wirtschaft)",
          "-ion (die Religion, die Integration)"
        ],
        "neuter": [
          "-um (das Zentrum)",
          "-ment (das Parlament)",
          "diminutives: -chen, -lein (das Mädchen)"
        ]
      },
      "keyRules": [
        "ALWAYS learn nouns with their article: 'der Staat', not just 'Staat'",
        "Compound nouns take the gender of the LAST word: das Grundgesetz (das Gesetz)",
        "Plural is ALWAYS 'die', regardless of singular gender",
        "In questions, 'welcher/welche/welches' (which) must match the noun's gender"
      ],
      "practiceExamples": [
        {
          "german": "Welches Recht gehört zu den Grundrechten?",
          "english": "Which right belongs to the fundamental rights?",
          "notes": "'Welches' because 'das Recht' is neuter"
        },
        {
          "german": "Welche Partei ist verfassungswidrig?",
          "english": "Which party is unconstitutional?",
          "notes": "'Welche' because 'die Partei' is feminine"
        },
        {
          "german": "Welcher Staat ist ein Rechtsstaat?",
          "english": "Which state is a constitutional state?",
          "notes": "'Welcher' because 'der Staat' is masculine"
        }
      ]
    }
  },

  // ============================================
  // LESSON 8: Prepositions and Cases
  // ============================================
  {
    "id": "lesson-8",
    "title": "Common Prepositions: in, an, von, zu, mit, für",
    "level": "Intermediate",
    "category": "Grammar Basics",
    "description": "Prepositions change the article form (case) - understanding 'in der', 'im', 'zum', etc.",
    "content": {
      "explanation": "German prepositions require specific cases (Nominative, Accusative, Dative, Genitive). The article changes based on the preposition and whether you're talking about location or direction.",
      "commonPrepositions": {
        "dative": {
          "prepositions": "in (in/at), an (at/on), von (from/of), zu (to), mit (with), bei (at/with), nach (to/after), aus (from/out of)",
          "rule": "Dative when showing LOCATION (where something is)",
          "examples": [
            {
              "german": "in der Schule (in the school)",
              "breakdown": "in + die → der (dative feminine)"
            },
            {
              "german": "im Bundestag (in the Bundestag)",
              "breakdown": "in + dem → im (contracted, dative masculine/neuter)"
            },
            {
              "german": "von dem Staat = vom Staat (from the state)",
              "breakdown": "von + dem → vom (contracted)"
            },
            {
              "german": "zu dem Gericht = zum Gericht (to the court)",
              "breakdown": "zu + dem → zum (contracted)"
            },
            {
              "german": "zu der Wahl = zur Wahl (to the election)",
              "breakdown": "zu + der → zur (contracted)"
            },
            {
              "german": "mit dem Auto (with the car)",
              "breakdown": "mit always takes dative"
            }
          ]
        },
        "accusative": {
          "prepositions": "für (for), durch (through), gegen (against), ohne (without), um (around/at)",
          "rule": "Accusative for DIRECTION (movement towards) or these specific prepositions",
          "examples": [
            {
              "german": "für die Regierung (for the government)",
              "breakdown": "für + die (accusative feminine, same as nominative)"
            },
            {
              "german": "gegen die Diktatur (against the dictatorship)",
              "breakdown": "gegen always takes accusative"
            },
            {
              "german": "durch das Gesetz (through the law)",
              "breakdown": "durch + das (accusative neuter)"
            }
          ]
        },
        "twoWay": {
          "prepositions": "in, an, auf, über, unter, vor, hinter, neben, zwischen",
          "rule": "DATIVE for location (where?), ACCUSATIVE for direction (where to?)",
          "examples": [
            {
              "german": "Sie sind in der Schule. (They are IN the school - location)",
              "case": "dative"
            },
            {
              "german": "Sie gehen in die Schule. (They go INTO the school - direction)",
              "case": "accusative"
            }
          ]
        }
      },
      "contractions": {
        "explanation": "German commonly contracts prepositions with articles",
        "common": [
          "in dem → im",
          "in das → ins",
          "an dem → am",
          "an das → ans",
          "zu dem → zum",
          "zu der → zur",
          "von dem → vom",
          "bei dem → beim"
        ],
        "testExamples": [
          "im Bundestag (in the Bundestag)",
          "am Religionsunterricht (in religious education)",
          "zum Grundgesetz (to the basic law)",
          "zur Wahl (to the election)",
          "vom Staat (from the state)"
        ]
      },
      "keyRules": [
        "Prepositions ALWAYS require a specific case",
        "Learn common prepositions with their cases",
        "Watch for contractions: im = in dem, zum = zu dem, etc.",
        "Two-way prepositions: dative for location, accusative for direction"
      ]
    }
  },

  // ============================================
  // LESSON 9: Passive Voice (wird + past participle)
  // ============================================
  {
    "id": "lesson-9",
    "title": "Passive Voice: 'wird + Past Participle'",
    "level": "Advanced",
    "category": "Verbs",
    "description": "Understanding sentences like 'Der Bundestag wird gewählt' (The Bundestag is elected)",
    "content": {
      "explanation": "The passive voice is used when the focus is on the action or the recipient of the action, not who does it. Very common in official/legal language like test questions.",
      "pattern": "wird/werden + past participle (at the end)",
      "formation": {
        "present": "wird/werden + past participle",
        "past": "wurde/wurden + past participle"
      },
      "examples": [
        {
          "german": "Der Bundeskanzler wird vom Bundestag gewählt.",
          "english": "The Federal Chancellor is elected by the Bundestag.",
          "breakdown": {
            "subject": "Der Bundeskanzler (the chancellor - receives the action)",
            "auxiliary": "wird (is)",
            "agent": "vom Bundestag (by the Bundestag)",
            "pastParticiple": "gewählt (elected) - at the END"
          },
          "activeVoice": "Der Bundestag wählt den Bundeskanzler. (The Bundestag elects the Chancellor.)"
        },
        {
          "german": "Gesetze werden vom Bundestag beschlossen.",
          "english": "Laws are passed by the Bundestag.",
          "breakdown": {
            "subject": "Gesetze (laws - plural)",
            "auxiliary": "werden (are - plural form)",
            "agent": "vom Bundestag",
            "pastParticiple": "beschlossen (passed/decided)"
          },
          "notes": "Use 'werden' (plural) when subject is plural"
        },
        {
          "german": "Die Würde des Menschen ist unantastbar.",
          "english": "Human dignity is inviolable.",
          "breakdown": {
            "notes": "This uses 'ist' + adjective, not true passive, but common in legal language"
          }
        },
        {
          "german": "Das Recht auf Asyl wird garantiert.",
          "english": "The right to asylum is guaranteed.",
          "breakdown": {
            "subject": "Das Recht (the right)",
            "auxiliary": "wird",
            "pastParticiple": "garantiert (guaranteed)"
          }
        }
      ],
      "commonPassiveVerbs": [
        "gewählt (elected) - from wählen",
        "beschlossen (passed/decided) - from beschließen",
        "garantiert (guaranteed) - from garantieren",
        "verboten (forbidden) - from verbieten",
        "erlaubt (allowed) - from erlauben",
        "geschützt (protected) - from schützen",
        "vertreten (represented) - from vertreten"
      ],
      "keyRules": [
        "Use 'wird' (singular) or 'werden' (plural) based on subject",
        "Past participle always goes to the END",
        "Agent (who does the action) uses 'von' + dative: 'vom Bundestag'",
        "Past passive uses 'wurde/wurden': 'wurde gewählt' (was elected)"
      ],
      "recognition": "If you see 'wird' or 'werden' + a verb ending in '-t' or '-en' at the end, it's likely passive voice."
    }
  },

  // ============================================
  // LESSON 10: Reflexive Verbs (sich + verb)
  // ============================================
  {
    "id": "lesson-10",
    "title": "Reflexive Verbs: 'sich' (oneself)",
    "level": "Intermediate",
    "category": "Verbs",
    "description": "Understanding 'sich anmelden', 'sich entscheiden', 'sich halten an'",
    "content": {
      "explanation": "Reflexive verbs include a reflexive pronoun ('sich' = oneself, myself, yourself, etc.) that refers back to the subject. Many German verbs that aren't reflexive in English are reflexive in German.",
      "pattern": "Subject + Verb + sich + other elements",
      "reflexivePronouns": {
        "explanation": "The reflexive pronoun changes based on the subject",
        "forms": [
          "ich → mich/mir (myself)",
          "du → dich/dir (yourself - informal)",
          "er/sie/es → sich (himself/herself/itself)",
          "wir → uns (ourselves)",
          "ihr → euch (yourselves - informal)",
          "Sie/sie → sich (yourself formal/themselves)"
        ]
      },
      "examples": [
        {
          "german": "Alle müssen sich an die Gesetze halten.",
          "english": "Everyone must follow the laws.",
          "breakdown": {
            "subject": "Alle (everyone)",
            "modal": "müssen",
            "reflexive": "sich (themselves)",
            "infinitive": "halten an (to hold to/follow)"
          },
          "literal": "Everyone must hold themselves to the laws."
        },
        {
          "german": "Man kann sich für eine Religion entscheiden.",
          "english": "One can decide on a religion.",
          "breakdown": {
            "subject": "Man (one)",
            "modal": "kann",
            "reflexive": "sich (oneself)",
            "infinitive": "entscheiden (to decide)"
          },
          "literal": "One can decide oneself for a religion."
        },
        {
          "german": "Sie müssen sich anmelden.",
          "english": "You must register.",
          "breakdown": {
            "subject": "Sie (you - formal)",
            "modal": "müssen",
            "reflexive": "sich (yourself)",
            "infinitive": "anmelden (to register)"
          },
          "literal": "You must register yourself."
        },
        {
          "german": "Der Staat muss sich an die Gesetze halten.",
          "english": "The state must follow the laws.",
          "breakdown": {
            "subject": "Der Staat",
            "modal": "muss",
            "reflexive": "sich (itself)",
            "infinitive": "halten an"
          }
        }
      ],
      "commonReflexiveVerbs": [
        "sich anmelden (to register)",
        "sich entscheiden (to decide)",
        "sich halten an (to adhere to/follow)",
        "sich bewerben (to apply)",
        "sich kümmern um (to take care of)",
        "sich befinden (to be located)",
        "sich verhalten (to behave)",
        "sich wenden an (to turn to/contact)"
      ],
      "keyRules": [
        "Reflexive pronoun usually comes right after the conjugated verb",
        "In subordinate clauses: 'dass er sich entscheidet' (sich still after subject)",
        "Some verbs MUST be reflexive in German: sich befinden, sich verhalten",
        "Accusative sich: when the reflexive is the direct object",
        "Dative sich: when there's another accusative object"
      ],
      "accusativeVsDative": {
        "accusative": {
          "example": "Ich wasche mich. (I wash myself.)",
          "explanation": "myself is the direct object"
        },
        "dative": {
          "example": "Ich wasche mir die Hände. (I wash my hands / I wash the hands for myself.)",
          "explanation": "'die Hände' is accusative (direct object), so reflexive is dative"
        }
      }
    }
  },

  // ============================================
  // LESSON 11: Impersonal Expressions (es gibt, es ist)
  // ============================================
  {
    "id": "lesson-11",
    "title": "Impersonal Expressions: 'es gibt' (there is/are) and 'man' (one/you)",
    "level": "Beginner",
    "category": "Common Phrases",
    "description": "Understanding 'es gibt', 'man darf', and other impersonal constructions",
    "content": {
      "explanation": "German uses 'es gibt' (there is/are) and 'man' (one/you/people in general) very frequently in formal language and test questions.",
      "esGibt": {
        "meaning": "there is / there are",
        "pattern": "es gibt + accusative object",
        "examples": [
          {
            "german": "Es gibt 16 Bundesländer in Deutschland.",
            "english": "There are 16 federal states in Germany.",
            "notes": "'es gibt' is always singular, even for plural objects"
          },
          {
            "german": "In Deutschland gibt es Meinungsfreiheit.",
            "english": "In Germany, there is freedom of speech.",
            "notes": "When something comes first, 'es' disappears: 'In Deutschland gibt es'"
          },
          {
            "german": "Es gibt eine Schulpflicht.",
            "english": "There is compulsory education.",
            "notes": "'es gibt' + accusative case"
          }
        ]
      },
      "man": {
        "meaning": "one / you / people (in general)",
        "conjugation": "Always uses 3rd person singular (er/sie/es form)",
        "examples": [
          {
            "german": "Man darf seine Meinung sagen.",
            "english": "One may express one's opinion. / You can express your opinion.",
            "breakdown": {
              "man": "one/you (general)",
              "darf": "may (3rd person singular)",
              "reflexive": "seine (his/one's)"
            }
          },
          {
            "german": "Man kann sich für eine Religion entscheiden.",
            "english": "One can decide on a religion.",
            "notes": "With 'man', reflexive is 'sich'"
          },
          {
            "german": "Man muss die Gesetze befolgen.",
            "english": "One must follow the laws.",
            "notes": "'man' is always singular, verb in 3rd person"
          },
          {
            "german": "Wenn man 18 ist, darf man wählen.",
            "english": "When one is 18, one may vote.",
            "notes": "'man' can appear multiple times in a sentence"
          }
        ]
      },
      "esIst": {
        "meaning": "it is",
        "pattern": "es ist + adjective/noun",
        "examples": [
          {
            "german": "Es ist verboten zu rauchen.",
            "english": "It is forbidden to smoke.",
            "notes": "es ist + adjective + zu + infinitive"
          },
          {
            "german": "Es ist wichtig, dass alle wählen.",
            "english": "It is important that everyone votes.",
            "notes": "es ist + adjective + dass-clause"
          }
        ]
      },
      "keyRules": [
        "'es gibt' always takes accusative case",
        "'es gibt' is always singular, even with plural objects",
        "'man' always uses 3rd person singular verb forms (like 'er/sie/es')",
        "'man' with reflexive uses 'sich': man muss sich anmelden",
        "When another element starts the sentence, 'es' often disappears: 'In Deutschland gibt es'"
      ]
    }
  },

  // ============================================
  // LESSON 12: Conjunctions (und, oder, aber, denn)
  // ============================================
  {
    "id": "lesson-12",
    "title": "Coordinating Conjunctions: und, oder, aber, denn",
    "level": "Beginner",
    "category": "Sentence Structure",
    "description": "Connecting clauses without changing word order",
    "content": {
      "explanation": "Coordinating conjunctions (und, oder, aber, denn, sondern) connect two main clauses WITHOUT changing the word order. Unlike subordinating conjunctions (weil, dass, ob), the verb stays in 2nd position.",
      "conjunctions": {
        "und": {
          "meaning": "and",
          "example": {
            "german": "Der Bundestag macht Gesetze und der Bundesrat stimmt zu.",
            "english": "The Bundestag makes laws and the Bundesrat agrees.",
            "notes": "Both clauses have normal word order (verb in 2nd position)"
          }
        },
        "oder": {
          "meaning": "or",
          "example": {
            "german": "Man kann wählen oder man kann eine Petition einreichen.",
            "english": "One can vote or one can submit a petition.",
            "notes": "Normal word order in both clauses"
          }
        },
        "aber": {
          "meaning": "but / however",
          "example": {
            "german": "Deutschland ist demokratisch, aber nicht alle Staaten sind demokratisch.",
            "english": "Germany is democratic, but not all states are democratic.",
            "notes": "Shows contrast, both clauses have normal order"
          }
        },
        "denn": {
          "meaning": "because / for (giving a reason)",
          "example": {
            "german": "Menschen dürfen demonstrieren, denn sie haben Versammlungsfreiheit.",
            "english": "People may demonstrate, because they have freedom of assembly.",
            "notes": "'denn' is like 'weil' but doesn't change word order!"
          }
        },
        "sondern": {
          "meaning": "but rather / but instead",
          "usage": "Used after a negation to correct something",
          "example": {
            "german": "Deutschland ist keine Monarchie, sondern eine Republik.",
            "english": "Germany is not a monarchy, but rather a republic.",
            "notes": "Always follows a negative statement"
          }
        }
      },
      "comparison": {
        "coordinating": {
          "conjunctions": "und, oder, aber, denn, sondern",
          "wordOrder": "Normal (verb in 2nd position in both clauses)",
          "example": "Ich wähle, denn ich habe Wahlrecht. (I vote, because I have the right to vote.)"
        },
        "subordinating": {
          "conjunctions": "weil, dass, ob, wenn, als",
          "wordOrder": "Verb goes to the END in subordinate clause",
          "example": "Ich wähle, weil ich Wahlrecht habe. (I vote because I have the right to vote.)"
        }
      },
      "examples": [
        {
          "german": "Die Würde ist unantastbar und alle sind gleich.",
          "english": "Dignity is inviolable and everyone is equal.",
          "breakdown": {
            "clause1": "Die Würde ist unantastbar (normal order)",
            "conjunction": "und",
            "clause2": "alle sind gleich (normal order)"
          }
        },
        {
          "german": "Man darf wählen oder man darf eine Petition einreichen.",
          "english": "One may vote or one may submit a petition.",
          "notes": "Both options presented with normal word order"
        },
        {
          "german": "Deutschland ist ein Rechtsstaat, aber es gibt auch Diktaturen.",
          "english": "Germany is a constitutional state, but there are also dictatorships.",
          "notes": "Contrast shown with 'aber', normal order maintained"
        }
      ],
      "keyRules": [
        "Coordinating conjunctions DON'T change word order",
        "Verb stays in 2nd position in both clauses",
        "Usually comma before aber, denn, sondern",
        "No comma before und, oder (unless it's a full clause)",
        "'sondern' only after negative: nicht ... sondern"
      ]
    }
  }
];

export const LESSON_CATEGORIES = [
  "Sentence Structure",
  "Verbs",
  "Questions",
  "Grammar Basics",
  "Common Phrases"
];

export const LESSON_LEVELS = [
  "Beginner",
  "Intermediate",
  "Advanced"
];
