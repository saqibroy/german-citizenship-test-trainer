# Data Transformation Script

This script transforms the questions from `trainer/fullData.json` into the format used by `src/data.js`.

## Usage

```bash
node scripts/transformData.js
```

## What it does

1. Reads questions from `trainer/fullData.json`
2. Transforms each question to match the structure in `src/data.js`
3. Maps categories to standardized names
4. Generates `src/transformedData.js` with the transformed data
5. Provides statistics about the transformation

## Data Structure Transformation

### Input Format (fullData.json)
```json
{
  "question": "Question text in German",
  "answers": ["Option 1", "Option 2", "Option 3", "Option 4"],
  "correct": 0,
  "category": "Category Name"
}
```

### Output Format (transformedData.js)
```javascript
{
  id: 1,
  question_de: "Question text in German",
  question_en: "",
  options_de: ["Option 1", "Option 2", "Option 3", "Option 4"],
  options_en: ["", "", "", ""],
  correct_index: 0,
  category: "Mapped Category"
}
```

## Category Mappings

The script maps original categories to standardized ones:

- `Recht` → `Grundrechte`
- `Staat` → `Grundgesetz`
- `Politik` → `Wahlen`
- `Gesellschaft und Familie` → `Gesellschaft`
- `Europa und Welt` → `Geografie`
- `Bund und Länder` → `Politik`
- `Religion und Kultur` → `Kultur`
- `Bildung und Arbeit` → `Bildung`
- `Wirtschaft` → `Gesellschaft`

And preserves:
- `Geschichte` → `Geschichte`
- `Geografie` → `Geografie`
- `Kultur` → `Kultur`
- `Berlin` → `Berlin`

## Output

The script generates:
- `src/transformedData.js` - The transformed data file with all questions
- Console statistics showing the number of questions per category

## Notes

- English translations (`question_en` and `options_en`) are left empty as they are not present in the source data
- Questions are automatically assigned sequential IDs starting from 1
- The output file includes the same category icons mapping as the original data.js
