# 🏆 Badge Testing Guide

## Where Badges Are Displayed

### 1. **Home Page** (Main Dashboard)
**Location**: `src/pages/HomePage.tsx` (lines 141-156)

**What you'll see:**
- Yellow/orange gradient badges below the streak counter
- Each badge shows as a pill with emoji + text
- Example badges:
  - `🌱 First Steps` - Answer 10 questions
  - `📚 Half Century` - Answer 50 questions
  - `💯 Century` - Answer 100 questions
  - `🔥 3 Day Streak` - Study 3 days in a row
  - `⭐ Master 10` - Master 10 questions

**How to see it:**
1. Open the app
2. Go to "Home" tab (bottom navigation)
3. Scroll down below the "Study Streak" section
4. You'll see a section titled "🏆 Abzeichen" (German) or "🏆 Badges" (English)

---

### 2. **Stats Page** (Full Badge Gallery)
**Location**: `src/StatsPage.tsx` (lines 427-444)

**What you'll see:**
- Complete badge collection with count: "Badges (X)"
- All earned badges in a grid layout
- Same yellow/orange gradient style
- Shows ALL badges you've earned

**How to see it:**
1. Open the app
2. Go to "Stats" tab (bottom navigation, chart icon)
3. Scroll down to find the "Badges" section
4. Shows total count and all earned badges

---

## How to Earn Your First Badges

### Quick Test (Answer 10 Questions):

1. **Start Training Mode**:
   - Click "Training" tab (bottom navigation)
   - Click "Start Training Session"
   - Answer 10 questions (correct or incorrect doesn't matter)
   
2. **Check for Badge**:
   - Go back to "Home" tab
   - You should see: `🌱 First Steps` badge appear

### Full List of Badges Available:

#### **Milestone Badges** (Based on questions attempted):
- 🌱 **First Steps** - 10 questions
- 📚 **Half Century** - 50 questions
- 💯 **Century** - 100 questions
- 🎯 **Double Century** - 200 questions
- 🏆 **Triple Century** - 300 questions
- ✅ **All Questions** - 310 questions (complete!)

#### **Mastery Badges** (Based on mastered questions):
- ⭐ **Master 10** - Master 10 questions
- ⭐ **Master 50** - Master 50 questions
- ⭐ **Master 100** - Master 100 questions
- ⭐ **Master 200** - Master 200 questions

#### **Strength Badges** (Questions marked as "strong"):
- 💪 **Strong 20** - 20 strong questions
- 💪 **Strong 50** - 50 strong questions
- 💪 **Strong 100** - 100 strong questions

#### **Streak Badges** (Consecutive study days):
- 🔥 **3 Day Streak** - Study 3 days in a row
- 🔥 **Week Warrior** - 7-day streak
- 🔥 **Two Weeks** - 14-day streak
- 🔥 **Month Master** - 30-day streak
- 🔥 **Centurion** - 100-day streak

#### **Quiz Badges**:
- 🎯 **Perfect Quiz** - Score 33/33 on a quiz
- ✅ **5 Passed Quizzes** - Pass 5 quizzes (≥52%)
- ✅ **10 Passed Quizzes** - Pass 10 quizzes

#### **Special Badges**:
- ⚡ **Speed Demon** - Average answer time ≤10 seconds (50+ questions)
- 🏅 **[Category] Master** - 80%+ accuracy in a specific category (5+ questions)

---

## Troubleshooting: "I don't see any badges!"

### Checklist:

1. **Have you answered any questions yet?**
   - Badges only appear AFTER you start training
   - Go to Training mode and answer at least 10 questions

2. **Check both locations**:
   - Home page (scroll down below streak)
   - Stats page (dedicated badges section)

3. **The badge section is hidden if badges array is empty**:
   ```tsx
   {badges.length > 0 && ( ... )}
   ```
   - This means if you have 0 badges, the section won't show at all

4. **Clear localStorage and start fresh** (if testing):
   - Open browser DevTools (F12)
   - Go to Application > Local Storage
   - Clear all data
   - Refresh page
   - Start training to earn first badge

---

## Current Badge System (After Hook Integration)

### Old System (Removed):
- ❌ Inline badge logic in App.tsx
- ❌ Manual badge checking with long if/else chains
- ❌ Hardcoded badge strings

### New System (Integrated):
- ✅ `useBadges` custom hook from `src/hooks/useBadges.ts`
- ✅ Automatic badge checking on progress updates
- ✅ 30+ achievement badges with metadata
- ✅ Badge categories: first steps, correct answers, mastery, streaks, consistency, quizzes, speed
- ✅ `getBadgeInfo()` function for badge details
- ✅ `newBadges` array for celebration animations (can be used later)

---

## Visual Example

When you have badges, you'll see something like this on the **Home Page**:

```
┌─────────────────────────────────────┐
│  📊 Study Streak: 🔥 3 days         │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  🏆 Badges                          │
│                                     │
│  ┌──────────────┐ ┌──────────────┐│
│  │🌱 First Steps│ │📚 Half Century││
│  └──────────────┘ └──────────────┘│
│  ┌──────────────┐ ┌──────────────┐│
│  │🔥 3 Day Streak│ │⭐ Master 10  ││
│  └──────────────┘ └──────────────┘│
└─────────────────────────────────────┘
```

Each badge is a **yellow-to-orange gradient pill** with the emoji and text.

---

## Next Steps

To test badges right now:

1. **Open your app**: `npm run dev`
2. **Start Training**: Click Training tab
3. **Answer 10 questions**: Get the "🌱 First Steps" badge
4. **Check Home page**: Scroll down to see your first badge!
5. **Check Stats page**: See the complete badge gallery

The badge system is now fully integrated with custom hooks and ready for production! 🎉
