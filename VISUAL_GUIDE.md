# 🎨 Visual Guide: Onboarding & Empty States

## New Onboarding Steps (5 & 6)

### Step 5: Exam Date Selection

```
┌────────────────────────────────────────────┐
│  📅  Set Your Exam Date                    │
│      Step 5 of 6                           │
│  ✕                                         │
└────────────────────────────────────────────┘
│                                            │
│  When is your citizenship test scheduled? │
│  We'll help you prepare with a            │
│  personalized study plan.                 │
│                                            │
│  ┌──────────────────────────────────────┐ │
│  │  [Date Picker: __/__/____]           │ │
│  └──────────────────────────────────────┘ │
│                                            │
│  ┌──────────────────────────────────────┐ │
│  │     Set Exam Date                    │ │
│  └──────────────────────────────────────┘ │
│                                            │
│  [After clicking - Success message:]      │
│  ┌──────────────────────────────────────┐ │
│  │ ✓ Exam date set!                     │ │
│  │   45 days to prepare                 │ │
│  └──────────────────────────────────────┘ │
│                                            │
│  You can skip this and set it later       │
│  in Settings                               │
│                                            │
└────────────────────────────────────────────┘
│                                            │
│  ● ● ● ● ● ○  [Progress dots]            │
│                                            │
│  ← Back    Skip Tutorial    Next →        │
└────────────────────────────────────────────┘
```

### Step 6: Daily Goal Selection

```
┌────────────────────────────────────────────┐
│  📈  Choose Your Daily Goal                │
│      Step 6 of 6                           │
│  ✕                                         │
└────────────────────────────────────────────┘
│                                            │
│  How many questions do you want to         │
│  practice each day?                        │
│  Consistency is key! Start with a          │
│  manageable goal.                          │
│                                            │
│  ┌──────────┐  ┌──────────┐               │
│  │    10    │  │    20    │               │
│  │  Light   │  │ Moderate │               │
│  │~5 min/day│  │~10min/day│               │
│  └──────────┘  └──────────┘               │
│   (Blue)        (Green)                    │
│                                            │
│  ┌──────────┐  ┌──────────┐               │
│  │    30    │  │    40    │               │
│  │ Serious  │  │ Intense  │               │
│  │~15min/day│  │~20min/day│               │
│  └──────────┘  └──────────┘               │
│   (Orange)      (Red)                      │
│                                            │
│  [After clicking - Success message:]      │
│  ┌──────────────────────────────────────┐ │
│  │ ✓ Goal set: 20 questions/day         │ │
│  └──────────────────────────────────────┘ │
│                                            │
│  You can change this anytime in Settings   │
│                                            │
└────────────────────────────────────────────┘
│                                            │
│  ● ● ● ● ● ●  [Progress dots - all filled]│
│                                            │
│  ← Back    Skip Tutorial  Let's Start! 🏆 │
└────────────────────────────────────────────┘
```

---

## Skeleton Loaders

### Question Skeleton (Training/Quiz)

```
┌───────────────────────────────────────┐
│  ████████ [shimmer]                   │  ← Question number
│                                       │
│  ████████████████████████ [shimmer]   │  ← Question text line 1
│  ██████████████████ [shimmer]         │  ← Question text line 2
│                                       │
│  ┌─────────────────────────────────┐ │
│  │ ████████████████████ [shimmer]  │ │  ← Answer A
│  └─────────────────────────────────┘ │
│  ┌─────────────────────────────────┐ │
│  │ ████████████████████ [shimmer]  │ │  ← Answer B
│  └─────────────────────────────────┘ │
│  ┌─────────────────────────────────┐ │
│  │ ████████████████████ [shimmer]  │ │  ← Answer C
│  └─────────────────────────────────┘ │
│  ┌─────────────────────────────────┐ │
│  │ ████████████████████ [shimmer]  │ │  ← Answer D
│  └─────────────────────────────────┘ │
│                                       │
│  ████████  ████████ [shimmer]         │  ← Action buttons
│                                       │
└───────────────────────────────────────┘
```

### Stats Skeleton

```
┌─────────────────────────────────────────┐
│  Stat Cards:                            │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐  │
│  │ ████ │ │ ████ │ │ ████ │ │ ████ │  │
│  │ ████ │ │ ████ │ │ ████ │ │ ████ │  │
│  └──────┘ └──────┘ └──────┘ └──────┘  │
│                                         │
│  Chart:                                 │
│  ┌─────────────────────────────────┐   │
│  │ ████████ [shimmer]              │   │
│  │                                 │   │
│  │ ████████████████████████████    │   │
│  │ ████████████████████████████    │   │
│  │ ████████████████████████████    │   │
│  │                                 │   │
│  └─────────────────────────────────┘   │
│                                         │
│  Categories:                            │
│  🔲 ████████████ ▓▓▓▓▓░░░ ██           │
│  🔲 ████████████ ▓▓▓▓▓░░░ ██           │
│  🔲 ████████████ ▓▓▓▓▓░░░ ██           │
│                                         │
└─────────────────────────────────────────┘
```

---

## Empty States

### Badges Empty State

```
┌───────────────────────────────────────┐
│                                       │
│                                       │
│              🏆                        │  ← Bouncing animation
│          (bouncing)                   │
│                                       │
│        No Badges Yet                  │  ← Title (bold, large)
│                                       │
│   Earn badges by studying             │  ← Description (gray)
│   consistently and achieving          │
│   milestones!                         │
│                                       │
│   ┌───────────────────────┐           │
│   │   Start Learning      │           │  ← CTA button (gradient)
│   └───────────────────────┘           │
│                                       │
│                                       │
└───────────────────────────────────────┘
```

### Quiz History Empty State

```
┌───────────────────────────────────────┐
│                                       │
│              📝                        │  ← Bouncing animation
│          (bouncing)                   │
│                                       │
│      No Quiz History                  │
│                                       │
│   Take your first practice quiz       │
│   to see your results here!           │
│                                       │
│   ┌───────────────────────┐           │
│   │     Take Quiz         │           │
│   └───────────────────────┘           │
│                                       │
└───────────────────────────────────────┘
```

### Progress Empty State

```
┌───────────────────────────────────────┐
│                                       │
│              📚                        │  ← Bouncing animation
│          (bouncing)                   │
│                                       │
│      No Progress Yet                  │
│                                       │
│   Start your first training session   │
│   to begin tracking your progress!    │
│                                       │
│   ┌───────────────────────┐           │
│   │   Start Training      │           │
│   └───────────────────────┘           │
│                                       │
└───────────────────────────────────────┘
```

---

## Color Guide

### Onboarding Step 6 - Daily Goals

- **10 questions (Light)**: `from-blue-500 to-blue-600`
  - Calm, beginner-friendly
  - ~5 minutes/day

- **20 questions (Moderate)**: `from-green-500 to-green-600`
  - Balanced, sustainable
  - ~10 minutes/day

- **30 questions (Serious)**: `from-orange-500 to-orange-600`
  - Dedicated learner
  - ~15 minutes/day

- **40 questions (Intense)**: `from-red-500 to-red-600`
  - Highly motivated
  - ~20 minutes/day

### Skeleton Loaders

- **Background**: `gray-200` → `gray-100` → `gray-200` (gradient)
- **Animation**: `animate-pulse` (1.5s cycle)
- **Shimmer**: Left-to-right sweep effect

### Empty States

- **Emoji**: 8xl size (128px), bouncing animation
- **Title**: 2xl, bold, gray-800
- **Description**: Base size, gray-600
- **CTA Button**: Indigo-to-purple gradient, white text, rounded-xl

---

## User Flow Examples

### First-Time User (Onboarding)

1. User opens app (never used before)
2. Sees 6-step onboarding:
   - Steps 1-4: Learn about features
   - **Step 5**: Sets exam date (e.g., "December 15, 2025" = 46 days)
   - **Step 6**: Chooses daily goal (e.g., 20 questions/day)
3. Clicks "Let's Start!"
4. Lands on HomePage
5. Clicks "Start Training"
6. Sees question skeleton for ~1 second
7. Training page loads with real questions

### Returning User (No Badges Yet)

1. User opens app
2. Goes to Stats page
3. Scrolls to Badges section
4. Sees: 🏆 "No Badges Yet" empty state
5. Motivated to start training
6. (Optional) Clicks "Start Learning" button
7. Redirected to Training page

### Loading Experience

1. User clicks "Training" tab
2. Sees question skeleton immediately:
   - Question number placeholder
   - Question text (2 lines)
   - 4 answer buttons
   - Action buttons
3. After ~1 second: Real question appears
4. Smooth transition (no jarring flash)

---

## Accessibility

### Onboarding
✅ Keyboard navigable (Tab, Enter, Esc)
✅ Skip button always visible
✅ Clear progress indicators (dots)
✅ Large, readable text
✅ High contrast buttons

### Skeleton Loaders
✅ Proper ARIA labels (can be added)
✅ No flashing/seizure risk
✅ Smooth animations
✅ Fallback for motion preferences

### Empty States
✅ Large, clear messaging
✅ Optional action buttons
✅ No critical info blocked
✅ Color contrast compliant

---

## Mobile View

All components are responsive:

- **Onboarding**: Full-screen modal, scrollable
- **Daily Goal Buttons**: 2x2 grid on mobile
- **Skeleton Loaders**: Adapt to screen width
- **Empty States**: Centered, readable on small screens

---

**This guide shows all visual changes from Phases 4.2 & 4.3!** 🎨
