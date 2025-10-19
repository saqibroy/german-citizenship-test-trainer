# 🎉 New Features Added!

## 1. ✨ Dynamic Session Sizing (Like Anki!)

### Questions Training Mode
The training mode now **automatically adjusts** the number of questions based on your progress:

| Progress Level | Session Size |
|----------------|--------------|
| **Beginner** (0-50 answered, <60% accuracy) | 20 questions |
| **Intermediate** (50-100 answered, 60%+ accuracy) | 25 questions |
| **Advanced** (100-150 answered, 70%+ accuracy) | 30 questions |
| **Expert** (150-200 answered, 75%+ accuracy) | 35 questions |
| **Master** (200+ answered, 80%+ accuracy) | 40 questions |

**Why this is amazing:**
- 🎯 Starts small for beginners (20 questions)
- 📈 Gradually increases as you improve
- 🏆 Rewards your progress with more practice
- 🧠 Adapts to YOUR learning speed
- ✅ Just like Anki's "new cards" system!

### Vocabulary Training Mode
Similar adaptive sizing for vocabulary:

| Progress Level | Session Size |
|----------------|--------------|
| **Beginner** (0-30 words) | 15 words |
| **Intermediate** (30-60 words, 60%+ accuracy) | 20 words |
| **Advanced** (60-90 words, 70%+ accuracy) | 25 words |
| **Expert** (90+ words, 75%+ accuracy) | 30 words |

---

## 2. 🎓 Vocabulary Training with SRS!

### New "Vocab Training" Page
A dedicated **Anki-style spaced repetition** system specifically for vocabulary!

**Features:**
- ✅ **Flashcard-based learning** (German → English)
- ✅ **Example sentences** shown with translations
- ✅ **Tier-based prioritization:**
  - Tier 1 (ESSENTIAL) gets +400 priority weight
  - Tier 2 (IMPORTANT) gets +300 priority weight
  - Tier 3 (USEFUL) gets +200 priority weight
- ✅ **Smart selection algorithm:**
  - 50% New words (never seen)
  - 25% Weak words (< 50% accuracy)
  - 20% Due for review (based on intervals)
  - 5% Random (for variety)

**Spaced Repetition Intervals:**
- Strong words (75%+ accuracy, 5+ correct): Review every **7 days**
- Medium words (50%+ accuracy): Review every **1.5 days**
- Weak words (< 50% accuracy): Review **same day**
- New words: **Highest priority**

**How to Access:**
1. Click on **"Vocab"** tab
2. You'll see two sub-tabs:
   - **📚 Learn** - Browse, search, flashcards
   - **🧠 Training** - Anki-style SRS training

---

## 3. 🔥 Combined Training Display

### Updated Training Start Screen
Now shows **dynamic session size** with visual feedback:

**Before:** "Training starten (20 Fragen)"  
**Now:** 
```
┌─────────────────────────────────┐
│  25 Fragen  📈 Erhöht! 75% Genauigkeit │
└─────────────────────────────────┘
```

The screen displays:
- ✅ Current session size (changes based on progress)
- ✅ Progress indicator if size increased
- ✅ Your current accuracy rate
- ✅ Count of new/weak/due questions
- ✅ Updated instructions

---

## 4. 📊 Priority System Explained

### Questions (Training Mode)
Priority calculation factors:
1. **New questions** → +5000 weight (highest)
2. **Weak strength** → +1000 weight
3. **Due for review** → +10 to +100 weight (based on overdue days)
4. **Low accuracy (< 50%)** → +800 weight
5. **Medium strength** → +500 weight
6. **Strong & not due** → -500 weight (lowest)

### Vocabulary (Training Mode)
Priority calculation factors:
1. **New words** → +5000 weight (highest)
2. **Weak words** → +1000 weight
3. **Due for review** → +10 to +100 weight
4. **Low accuracy (< 50%)** → +800 weight
5. **Tier 1 words** → +400 weight 🔥
6. **Tier 2 words** → +300 weight
7. **Tier 3 words** → +200 weight
8. **Medium strength** → +500 weight
9. **Strong & not due** → -500 weight (lowest)

**This means:**
- Tier 1 & 2 vocabulary gets shown **more frequently**
- Weak vocabulary comes back **sooner**
- Strong vocabulary takes **longer to reappear**
- Just like Anki's algorithm! 🎯

---

## 5. 🎮 How to Use

### Questions Training
1. Go to **"Training"** tab
2. System automatically selects questions based on:
   - Your progress (new vs. answered)
   - Your weak areas
   - Time since last review
   - Current accuracy rate
3. Session size increases as you improve! (20 → 40 questions)

### Vocabulary Training
1. Go to **"Vocab"** tab
2. Click **"🧠 Training"** sub-tab
3. System shows:
   - Tier 1 & 2 words **more often**
   - Weak words **frequently**
   - New words **mixed in**
   - Strong words **after interval**
4. Session size increases as you learn! (15 → 30 words)

---

## 🚀 Why These Changes?

### Problem 1: Fixed session size wasn't adaptive
**Before:** Always 20 questions, regardless of skill level  
**Now:** 20 → 40 questions based on your mastery

### Problem 2: Vocabulary wasn't in SRS system
**Before:** Only flashcards and list view  
**Now:** Full Anki-style training with intervals and tiers!

### Problem 3: Important vocab not prioritized
**Before:** All vocabulary treated equally  
**Now:** Tier 1 & 2 words get extra priority weight!

---

## 📈 Expected Learning Impact

### With Dynamic Sizing:
- ✅ **Beginners** aren't overwhelmed (starts at 20)
- ✅ **Advanced learners** get more practice (up to 40)
- ✅ **Motivation boost** from seeing progress
- ✅ **Faster mastery** of all 310 questions

### With Vocabulary Training:
- ✅ **Tier 1 & 2** words memorized faster
- ✅ **Weak vocabulary** reviewed more
- ✅ **Strong vocabulary** retained longer
- ✅ **Example sentences** help context learning
- ✅ **Adaptive session size** prevents burnout

---

## 🎯 Next Steps

1. **Start Training Mode**
   - Do daily sessions (20-40 questions)
   - Watch session size increase!

2. **Use Vocab Training**
   - Focus on Tier 1 & 2 first
   - Sessions adapt (15-30 words)

3. **Monitor Your Progress**
   - Check accuracy improvements
   - See session sizes grow
   - Track vocabulary mastery

---

## 💡 Pro Tips

1. **Daily Vocabulary Training** = Fastest way to learn Tier 1 & 2
2. **Questions Training** = Better for weak categories
3. **Quiz Mode** = For exam simulation (always 33 questions)
4. **Study Plan** = Stay on track with weekly targets

---

## ✅ Summary

### What's New:
1. ✅ **Dynamic session sizing** (20-40 for questions, 15-30 for vocab)
2. ✅ **Vocabulary Training Page** with Anki-style SRS
3. ✅ **Tier-based vocabulary prioritization** (Tier 1 & 2 boosted)
4. ✅ **Adaptive intervals** for both questions and vocabulary
5. ✅ **Visual session size display** with progress indicators

### What This Means:
- 🎯 **Smarter learning** that adapts to YOU
- 🚀 **Faster progress** with optimized repetition
- 🧠 **Better retention** with spaced intervals
- 🏆 **More motivation** from seeing growth

**Your app is now a complete Anki-style learning system for both questions AND vocabulary!** 🎉
