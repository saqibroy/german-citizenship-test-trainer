import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the full data JSON file
const fullDataPath = path.join(__dirname, '../trainer/fullData.json');
const outputPath = path.join(__dirname, '../src/transformedData.js');

console.log('Reading fullData.json...');
const fullData = JSON.parse(fs.readFileSync(fullDataPath, 'utf-8'));

console.log(`Found ${fullData.length} questions`);

// Category mapping from fullData categories to the ones used in data.js
const categoryMapping = {
  'Recht': 'Grundrechte',
  'Staat': 'Grundgesetz',
  'Politik': 'Wahlen',
  'Gesellschaft und Familie': 'Gesellschaft',
  'Geschichte': 'Geschichte',
  'Geografie': 'Geografie',
  'Kultur': 'Kultur',
  'Berlin': 'Berlin',
  'Wahlen': 'Wahlen',
  'Grundrechte': 'Grundrechte',
  'Grundgesetz': 'Grundgesetz',
  'Gesellschaft': 'Gesellschaft',
  'Europa und Welt': 'Geografie',
  'Bund und Länder': 'Politik',
  'Religion und Kultur': 'Kultur',
  'Bildung und Arbeit': 'Bildung',
  'Wirtschaft': 'Gesellschaft',
  // Add more mappings as needed
};

// Transform the data
const transformedQuestions = fullData.map((item, index) => {
  // Map category or use original if not in mapping
  const mappedCategory = categoryMapping[item.category] || item.category;
  
  return {
    id: index + 1,
    question_de: item.question,
    question_en: item.question_en || '', // Use empty string if no English translation
    options_de: item.answers,
    options_en: item.answers_en || ['', '', '', ''], // Use empty array if no English translations
    correct_index: item.correct,
    category: mappedCategory
  };
});

// Generate the output file content
const outputContent = `import { Scale, Landmark, Users, History, Map, Award, GraduationCap, Heart, Home } from 'lucide-react';

// Transformed questions from fullData.json
export const QUESTIONS = ${JSON.stringify(transformedQuestions, null, 2)};

// Category icons mapping
export const CATEGORY_ICONS = {
  'Grundrechte': Scale,
  'Grundgesetz': Landmark,
  'Rechtsstaat': Scale,
  'Politik': Landmark,
  'Wahlen': Users,
  'Geschichte': History,
  'Geografie': Map,
  'Symbole': Award,
  'Bildung': GraduationCap,
  'Gesellschaft': Users,
  'Kultur': Heart,
  'Berlin': Home
};
`;

// Write the output file
fs.writeFileSync(outputPath, outputContent, 'utf-8');

console.log(`✓ Successfully transformed ${transformedQuestions.length} questions`);
console.log(`✓ Output written to: ${outputPath}`);

// Generate statistics
const categoryStats = {};
transformedQuestions.forEach(q => {
  categoryStats[q.category] = (categoryStats[q.category] || 0) + 1;
});

console.log('\nCategory Distribution:');
Object.entries(categoryStats)
  .sort((a, b) => b[1] - a[1])
  .forEach(([category, count]) => {
    console.log(`  ${category}: ${count} questions`);
  });
