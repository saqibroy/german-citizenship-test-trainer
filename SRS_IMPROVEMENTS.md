# SRS and Randomization Improvements

## Summary of Changes (Latest Update)

### ✅ Issues Fixed

1. **Vocabulary Flashcards Now Use SRS & Randomization**
   - Previously: Flashcards appeared in the same order every time (e.g., "government" always first)
   - Now: Full SRS weight calculation with tier priority + randomization
   - Implementation: Top 80% weighted items are shuffled using Fisher-Yates algorithm

2. **Both Training Modes Show Learning Stats**
   - Question Training: Shows New/Weak/Learning/Due/Known counts
   - Vocabulary Training: Shows New/Weak/Learning/Known counts  
   - Vocabulary Flashcards: Shows same stats before starting

3. **Complete Tier-Based Priority System**
   - Vocabulary SRS includes tier bonuses:
     - Tier 1 (Essential): +400 weight
     - Tier 2 (Important): +300 weight
     - Tier 3 (Useful): +200 weight
   - Combined with Anki-style intervals for optimal learning

### 📊 Learning Stats Display

#### Question Training Stats:
- **New Questions** (Blue): Never seen before
- **Weak Areas** (Red): Need reinforcement (< 50% accuracy)
- **Learning** (Yellow): Medium accuracy (50-80%)
- **Due for Review** (Orange): Past their review interval
- **Known Questions** (Green): Strong mastery (≥ 80% accuracy)

#### Vocabulary Training/Flashcards Stats:
- **New Words** (Blue): Not learned yet
- **Weak Words** (Red): < 50% correct
- **Learning** (Yellow): 50-80% correct
- **Known Words** (Green): ≥ 80% correct (3+ attempts)

### 🎲 Randomization Strategy

#### Question Training:
1. Calculate SRS weight for all questions
2. Sort by weight (highest priority first)
3. Take top 50 weighted questions
4. Randomly shuffle those 50
5. Select 33 for the quiz

#### Vocabulary Training:
1. Calculate SRS weight with tier bonuses
2. Sort by tier first, then by SRS weight
3. Select based on tier mastery phase:
   - Phase 1 (Tier 1 < 80%): 70% T1, 20% T2, 10% T3
   - Phase 2 (Tier 2 < 80%): 20% T1, 60% T2, 20% T3
   - Phase 3: 15% T1, 25% T2, 60% T3
4. Fisher-Yates shuffle of final selection

#### Vocabulary Flashcards:
1. Calculate SRS weight with tier bonuses
2. Take top 80% weighted items
3. Fisher-Yates shuffle for random order
4. Display in shuffled order

### 🔄 Anki-Style Spaced Repetition System

Both questions and vocabulary now use the same SRS algorithm:

#### Priority Levels:
1. **DUE/Overdue** (9000+ weight): Highest priority
   - Items past their review interval
   - +100 weight per overdue day
   - Weak overdue items get +1000 bonus

2. **WEAK** (7000+ weight): High priority
   - Accuracy < 50%
   - Review interval: 0.5 days (12 hours)
   - Appear very frequently

3. **NEW** (8000 weight): Medium-high priority
   - Never seen before
   - Plus tier bonus for vocabulary

4. **MEDIUM** (2000-4000 weight): Medium priority
   - Accuracy 50-80%
   - Review intervals: 1 → 2 → 3 days
   - Higher priority when ≥70% of interval elapsed

5. **STRONG/Known** (50-1500 weight): Low priority
   - Accuracy ≥ 80% with 3+ correct attempts
   - Exponential intervals: 1 → 3 → 7 → 14 → 30 → 60 days
   - Only appear when ≥80% of interval elapsed
   - Very low priority (50) when not due

### 🎯 Learning Flow

#### For Weak Items:
- Appear multiple times per session
- Short 12-hour review interval
- High weight (7000+) ensures frequent practice
- When accuracy improves → moves to medium → strong

#### For New Items:
- High initial priority (8000)
- Appear until user has seen them
- After first attempt, classified as weak/medium/strong

#### For Known Items:
- Appear rarely (only when due)
- Intervals increase exponentially
- Focus shifts to new/weak items
- Maintains long-term retention

### 📈 Session Size Adaptation

Both question and vocabulary training adapt session size:

**Question Training:**
- Starts at 20 questions
- Grows based on progress and accuracy
- Maximum 40 questions for advanced learners

**Vocabulary Training:**
- Starts at 15 words
- Grows based on tier mastery
- Maximum 30 words for advanced learners

### 🏆 Result

The app now implements a complete Anki/DuoCard-style spaced repetition system with:
- ✅ Random order (no more predictable sequences)
- ✅ Tier-based priority for vocabulary
- ✅ Full learning stats display
- ✅ Weak items appear frequently
- ✅ Known items appear occasionally
- ✅ New items get high priority
- ✅ Time-based intervals (exponential backoff)
- ✅ Consistent SRS algorithm across questions and vocabulary

## Build Status

✅ **Production build successful**: No TypeScript errors
✅ **Bundle size**: 470.07 kB (131.21 kB gzipped)
✅ **Ready for deployment to Vercel**
