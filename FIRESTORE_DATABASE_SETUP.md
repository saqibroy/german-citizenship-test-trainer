# Firestore Database Setup Guide

## Problem
Your Firestore database hasn't been created yet, causing 400 errors when trying to sync data.

## Solution: Create Firestore Database

### Step 1: Go to Firebase Console
1. Visit: https://console.firebase.google.com/
2. Select your project: **german-citizenship-trainer**

### Step 2: Create Firestore Database
1. In the left sidebar, click **"Build"** → **"Firestore Database"**
2. Click **"Create database"**
3. Choose **"Start in production mode"** (your rules file will secure it)
4. Select a location:
   - Recommended for Europe: **eur3 (europe-west)**
   - This cannot be changed later!
5. Click **"Enable"**

### Step 3: Verify Rules
1. Go to **"Rules"** tab in Firestore
2. Your rules should look like this (already configured in your project):

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      match /{document=**} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
}
```

3. Click **"Publish"**

### Step 4: Test the Connection
1. Login to your app
2. Complete some training
3. Check Firestore Console → **"Data"** tab
4. You should see a `users` collection with your UID

## What Gets Stored Where

### ✅ In Git Repository (src/data.js)
- Quiz questions (310 questions)
- Question text, answers, explanations
- Images/icons
- Static content that doesn't change per user

### ✅ In Firestore (Cloud Database)
- User authentication (email, password hash)
- User progress (which questions completed)
- Quiz history (scores, dates)
- Settings (preferences)
- Usage limits (questions answered today)
- Study streaks

## Architecture Benefits

1. **Fast Loading**: Questions load instantly from bundled JS
2. **Free**: No API calls for question data
3. **Offline Ready**: Questions work offline automatically
4. **Secure**: User data protected by Firestore rules
5. **Scalable**: Each user only loads their own data

## Cost Analysis (Firebase Free Tier)

### Storage
- Questions in repo: **FREE** (bundled with app)
- Firestore: 1 GB storage **FREE**
- User data: ~10-50 KB per user
- Can support **20,000+ users FREE**

### Reads/Writes
- 50K reads/day **FREE**
- 20K writes/day **FREE**
- Your app: ~100-200 operations per user per day
- Can support **250-500 active users/day FREE**

## Troubleshooting

### "No database found" errors
- Database hasn't been created yet
- Follow Step 2 above

### "Permission denied" errors
- Rules not published correctly
- Make sure user is logged in
- Check that `request.auth.uid` matches document path

### Data not syncing across devices
- Database not created (most likely)
- Check browser console for errors
- Verify user is authenticated

## Next Steps

1. ✅ Create Firestore database (Step 2 above)
2. ✅ Deploy your rules: `firebase deploy --only firestore:rules`
3. ✅ Test login and data sync
4. ✅ Check Firestore console to see user data
