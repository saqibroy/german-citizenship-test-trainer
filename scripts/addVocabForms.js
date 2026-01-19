/**
 * Script to add forms to vocabulary entries based on German grammar rules
 * Run with: node scripts/addVocabForms.js
 */

const fs = require('fs');
const path = require('path');

// Read the vocabulary file
const vocabPath = path.join(__dirname, '..', 'src', 'vacabulary.js');
let content = fs.readFileSync(vocabPath, 'utf8');

// Extract the array content
const match = content.match(/export const CITIZENSHIP_VOCABULARY = (\[[\s\S]*\]);/);
if (!match) {
  console.error('Could not parse vocabulary file');
  process.exit(1);
}

const vocab = eval(match[1]);

/**
 * Generate forms for a noun based on gender
 */
function generateNounForms(de, gender) {
  const forms = [];
  
  // Remove article to get the core word
  const coreWord = de.replace(/^(der|die|das)\s+/i, '').trim();
  
  if (!coreWord) return forms;
  
  // Get the article based on gender
  const articles = {
    masculine: { nom: 'der', gen: 'des', dat: 'dem', acc: 'den' },
    feminine: { nom: 'die', gen: 'der', dat: 'der', acc: 'die' },
    neuter: { nom: 'das', gen: 'des', dat: 'dem', acc: 'das' }
  };
  
  const art = articles[gender];
  if (!art) {
    forms.push(de);
    return forms;
  }
  
  // Nominative
  forms.push(`${art.nom} ${coreWord}`);
  
  // Genitive - often adds -(e)s for masculine/neuter
  if (gender === 'masculine' || gender === 'neuter') {
    if (coreWord.endsWith('s') || coreWord.endsWith('ß') || coreWord.endsWith('z') || coreWord.endsWith('x')) {
      forms.push(`${art.gen} ${coreWord}es`);
    } else if (coreWord.endsWith('e')) {
      forms.push(`${art.gen} ${coreWord}s`);
    } else {
      // Most common: add -es or -s
      forms.push(`${art.gen} ${coreWord}s`);
    }
  } else {
    forms.push(`${art.gen} ${coreWord}`);
  }
  
  // Dative
  forms.push(`${art.dat} ${coreWord}`);
  
  // Accusative (same as nominative for feminine/neuter)
  if (gender === 'masculine') {
    forms.push(`${art.acc} ${coreWord}`);
  }
  
  // Plural - heuristic based on word ending
  const pluralForms = generatePlural(coreWord, gender);
  pluralForms.forEach(p => {
    if (!forms.includes(`die ${p}`)) {
      forms.push(`die ${p}`);
    }
  });
  
  return forms;
}

/**
 * Generate plural forms based on common German patterns
 */
function generatePlural(word, gender) {
  const plurals = [];
  
  // Common feminine plural: add -en or -n
  if (gender === 'feminine') {
    if (word.endsWith('e')) {
      plurals.push(word + 'n');
    } else if (word.endsWith('in')) {
      plurals.push(word + 'nen');
    } else if (word.endsWith('ung') || word.endsWith('heit') || word.endsWith('keit') || word.endsWith('schaft')) {
      plurals.push(word + 'en');
    } else if (word.endsWith('ion')) {
      plurals.push(word + 'en');
    } else {
      plurals.push(word + 'en');
    }
  }
  
  // Common masculine/neuter patterns
  if (gender === 'masculine' || gender === 'neuter') {
    if (word.endsWith('er') || word.endsWith('el') || word.endsWith('en')) {
      // Often no change or umlaut
      plurals.push(word);
    } else if (word.endsWith('e')) {
      plurals.push(word + 'n');
    } else if (word.endsWith('nis')) {
      plurals.push(word.slice(0, -2) + 'sse');
    } else {
      // Try -e ending
      plurals.push(word + 'e');
    }
  }
  
  return plurals;
}

/**
 * Generate forms for a verb
 */
function generateVerbForms(de) {
  const forms = [];
  
  // Clean up the verb - handle variations like "halten (sich halten an)"
  let verb = de.replace(/\s*\(.*\)/, '').trim();
  
  if (!verb.endsWith('en') && !verb.endsWith('n')) {
    forms.push(verb);
    return forms;
  }
  
  // Get the stem
  const stem = verb.endsWith('en') ? verb.slice(0, -2) : verb.slice(0, -1);
  
  // Infinitive
  forms.push(verb);
  
  // Present tense conjugations
  forms.push(`ich ${stem}e`);
  forms.push(`du ${stem}st`);
  forms.push(`er ${stem}t`);
  forms.push(`wir ${verb}`);
  forms.push(`ihr ${stem}t`);
  forms.push(`sie ${verb}`);
  
  // Simple forms without pronouns (for matching in text)
  forms.push(`${stem}t`);
  forms.push(`${stem}st`);
  forms.push(`${stem}e`);
  
  // Past participle (ge- + stem + t/en) - simplified heuristic
  if (!verb.startsWith('be') && !verb.startsWith('ge') && !verb.startsWith('er') && 
      !verb.startsWith('ver') && !verb.startsWith('ent') && !verb.startsWith('emp')) {
    forms.push(`ge${stem}t`);
  } else {
    forms.push(`${stem}t`);
  }
  
  // Simple past (Präteritum) - simplified
  forms.push(`${stem}te`);
  forms.push(`${stem}ten`);
  
  return forms;
}

/**
 * Generate forms for an adjective
 */
function generateAdjectiveForms(de) {
  const forms = [];
  const adj = de.trim();
  
  forms.push(adj);
  
  // Comparative
  if (!adj.endsWith('er')) {
    forms.push(adj + 'er');
    forms.push(adj + 'ere');
    forms.push(adj + 'eren');
  }
  
  // Superlative
  forms.push(adj + 'ste');
  forms.push(adj + 'sten');
  
  // Declined forms
  forms.push(adj + 'e');
  forms.push(adj + 'en');
  forms.push(adj + 'es');
  forms.push(adj + 'em');
  
  return forms;
}

/**
 * Detect word type from the entry
 */
function detectWordType(entry) {
  const de = entry.de.toLowerCase();
  
  // Check if it already has wordType
  if (entry.wordType) {
    return entry.wordType;
  }
  
  // Nouns have articles
  if (de.startsWith('der ') || de.startsWith('die ') || de.startsWith('das ')) {
    return 'noun';
  }
  
  // Verbs typically end in -en
  if (de.endsWith('en') && !de.includes(' ') && de.length > 3) {
    return 'verb';
  }
  
  // Check category hints
  const cat = (entry.category || '').toLowerCase();
  if (cat.includes('verb')) return 'verb';
  if (cat.includes('adjective')) return 'adjective';
  
  // Some common patterns
  if (de.endsWith('heit') || de.endsWith('keit') || de.endsWith('ung') || 
      de.endsWith('schaft') || de.endsWith('ion')) {
    return 'noun';
  }
  
  return 'unknown';
}

/**
 * Detect gender from the entry
 */
function detectGender(entry) {
  if (entry.gender) return entry.gender;
  
  const de = entry.de.toLowerCase();
  
  if (de.startsWith('der ')) return 'masculine';
  if (de.startsWith('die ')) return 'feminine';
  if (de.startsWith('das ')) return 'neuter';
  
  // Check word endings for nouns without articles
  const word = de.trim();
  
  // Common feminine endings
  if (word.endsWith('heit') || word.endsWith('keit') || word.endsWith('ung') ||
      word.endsWith('schaft') || word.endsWith('ion') || word.endsWith('ie') ||
      word.endsWith('tät') || word.endsWith('enz') || word.endsWith('anz')) {
    return 'feminine';
  }
  
  // Common masculine endings
  if (word.endsWith('ling') || word.endsWith('ismus') || word.endsWith('or') ||
      word.endsWith('ist')) {
    return 'masculine';
  }
  
  // Common neuter endings  
  if (word.endsWith('chen') || word.endsWith('lein') || word.endsWith('ment') ||
      word.endsWith('nis') || word.endsWith('tum') || word.endsWith('um')) {
    return 'neuter';
  }
  
  return 'none';
}

/**
 * Process all vocabulary entries
 */
function processVocabulary(vocab) {
  let updated = 0;
  
  vocab.forEach((entry, index) => {
    // Skip if already has forms
    if (entry.forms && entry.forms.length > 0) {
      return;
    }
    
    const wordType = detectWordType(entry);
    const gender = detectGender(entry);
    
    let forms = [];
    
    switch (wordType) {
      case 'noun':
        forms = generateNounForms(entry.de, gender);
        break;
      case 'verb':
        forms = generateVerbForms(entry.de);
        break;
      case 'adjective':
        forms = generateAdjectiveForms(entry.de);
        break;
      default:
        // For unknown types, just add the base form
        forms = [entry.de];
    }
    
    // Dedupe and filter
    forms = [...new Set(forms)].filter(f => f && f.length > 0);
    
    if (forms.length > 0) {
      entry.forms = forms;
      
      // Also add word field if missing
      if (!entry.word) {
        entry.word = entry.de.replace(/^(der|die|das)\s+/i, '').trim();
      }
      
      // Add gender if missing
      if (!entry.gender && gender !== 'none') {
        entry.gender = gender;
      }
      
      // Add wordType if missing
      if (!entry.wordType) {
        entry.wordType = wordType;
      }
      
      updated++;
    }
  });
  
  return updated;
}

// Process the vocabulary
const updatedCount = processVocabulary(vocab);

// Write back to file
const newContent = `export const CITIZENSHIP_VOCABULARY = ${JSON.stringify(vocab, null, 2)};`;

fs.writeFileSync(vocabPath, newContent, 'utf8');

console.log(`Updated ${updatedCount} vocabulary entries with forms.`);
console.log(`Total entries: ${vocab.length}`);
