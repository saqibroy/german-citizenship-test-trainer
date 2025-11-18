# Image Display Implementation

## Summary
Successfully implemented image display functionality for questions in the German Citizenship Test Trainer app. Questions with associated images now display those images in Training, Quiz, and Cards modes.

## Changes Made

### 1. Type Definition Updates
**File:** `src/types.ts`
- Added optional `img` field to the `Question` interface
- Structure: `img?: { url: string }`

### 2. Image File Organization
**Location:** `public/images/`
- Renamed all image files from question text to question IDs for easier mapping
- Format: `question-{id}.png`
- Images renamed:
  - `question-21.png` - Welches ist das Wappen der Bundesrepublik Deutschland?
  - `question-55.png` - Was zeigt dieses Bild?
  - `question-130.png` - Welcher Stimmzettel wäre bei einer Bundestagswahl gültig?
  - `question-176.png` - Besatzungszonen Deutschlands nach 1945
  - `question-187.png` - schwarz-rot-goldene Flagge
  - `question-209.png` - Welches war das Wappen der Deutschen Demokratischen Republik?
  - `question-226.png` - Welches Symbol ist im Plenarsaal des Deutschen Bundestages zu sehen?
  - `question-301.png` - Welches Wappen gehört zum Bundesland Berlin?
  - `question-308.png` - Welches Bundesland ist Berlin?

### 3. QuestionCard Component
**File:** `src/components/QuestionCard.tsx`
- Added optional `imageUrl` and `questionId` props
- Images display between question text and answers
- Features:
  - Responsive design with max heights (400px mobile, 500px desktop)
  - Lazy loading for performance
  - Error handling (images that fail to load are hidden)
  - Rounded corners and background styling
  - Object-contain to maintain aspect ratio

### 4. QuizPage Updates
**File:** `src/pages/QuizPage.tsx`
- Passed `imageUrl={q.img?.url}` and `questionId={q.id}` to QuestionCard
- Images now display during quiz sessions

### 5. TrainingPage Updates
**File:** `src/pages/TrainingPage.tsx`
- Passed `imageUrl={q.img?.url}` and `questionId={q.id}` to QuestionCard
- Images now display during training sessions

### 6. CardsPage Updates
**File:** `src/pages/CardsPage.tsx`
- Added inline image display for flashcard mode
- Images appear on the question side (before flipping)
- Styled with:
  - Max height of 256px (64 tailwind units)
  - White backdrop with blur effect
  - Rounded corners and shadow
  - Centered within card

## Design Decisions

### Mobile-First Approach
- Images are responsive and scale appropriately on different screen sizes
- Max heights prevent oversized images from dominating the screen
- Object-contain ensures images maintain their aspect ratio

### Performance Optimization
- Lazy loading (`loading="lazy"`) to improve initial page load
- Images only load when they come into viewport
- Error handling prevents broken image displays

### User Experience
- Images display between question and answers for natural reading flow
- Clean separation with border-top styling
- Consistent styling across all modes (Training, Quiz, Cards)

## Testing Checklist

To verify the implementation works correctly:

1. ✅ Navigate to Training mode and find question 21, 55, 130, 176, 187, 209, or 226
2. ✅ Verify image displays between question text and answer options
3. ✅ Navigate to Quiz mode and check same questions
4. ✅ Navigate to Cards mode and verify images appear on question side
5. ✅ Test on mobile viewport to ensure responsive behavior
6. ✅ Verify lazy loading works (images load as you scroll)
7. ✅ Test with a missing image to verify graceful degradation

## Future Enhancements

Potential improvements for future iterations:

1. **Image Zoom**: Add click-to-zoom functionality for detailed viewing
2. **Alt Text Localization**: Add proper German/English alt text for accessibility
3. **Image Optimization**: Convert PNGs to WebP for better compression
4. **Progressive Loading**: Add blur-up placeholder technique
5. **Fullscreen Mode**: Allow images to be viewed in fullscreen on mobile
6. **Caption Support**: Add optional captions below images for context

## Questions with Images

The following question IDs have associated images:
- 21 - German coat of arms
- 55 - Bundestag building
- 130 - Voting ballot
- 176 - Post-1945 occupation zones
- 187 - Black-red-gold flag
- 209 - GDR coat of arms
- 226 - Bundestag plenary symbol
- 301 - Berlin coat of arms
- 308 - Berlin on map

## Technical Notes

- Images are served from `/public/images/` directory
- Path construction: `/images/question-${questionId}.png`
- Component accepts both `imageUrl` (from data) and `questionId` for flexible mapping
- TypeScript types updated to support optional image field
- No breaking changes to existing functionality
