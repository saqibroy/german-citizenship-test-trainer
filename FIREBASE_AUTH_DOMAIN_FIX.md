# 🔧 Firebase Auth Domain Fix - Google Login 404 Error

## ❌ Current Problem
When clicking "Sign in with Google", you see:
```
404: NOT_FOUND
Code: NOT_FOUND
ID: fra1::tqm8b-1763659046623-5128ddd45e7e
```

## 🎯 Root Cause
Your app is hosted on **Vercel** (`german-citizenship-test-trainer.vercel.app`), but Firebase Authentication needs to use **Firebase Hosting** to handle the OAuth redirect at `/__/auth/handler`.

The `authDomain` must point to your **Firebase Hosting domain** (e.g., `einburgercoach.web.app`), NOT your Vercel domain!

---

## ✅ Solution - Follow These Steps:

### Step 1: Update Environment Variables in Vercel (CRITICAL FIX!)

Go to your Vercel project settings and **change** the `authDomain`:

**WRONG (causes 404):**
```bash
VITE_FIREBASE_AUTH_DOMAIN=german-citizenship-test-trainer.vercel.app  ❌
```

**CORRECT (fixes 404):**
```bash
VITE_FIREBASE_AUTH_DOMAIN=einburgercoach.web.app  ✅
# OR
VITE_FIREBASE_AUTH_DOMAIN=einburgercoach.firebaseapp.com  ✅
```

**All your environment variables should be:**
```bash
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=einburgercoach.web.app  ← THIS IS THE FIX!
VITE_FIREBASE_PROJECT_ID=einburgercoach
VITE_FIREBASE_STORAGE_BUCKET=einburgercoach.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

### Step 2: Add BOTH Domains to Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select project: **einburgercoach**
3. Go to **Authentication** > **Settings** > **Authorized domains**
4. Make sure these are ALL added:
   - ✅ `einburgercoach.web.app` ← **Required for auth handler!**
   - ✅ `german-citizenship-test-trainer.vercel.app` ← Your Vercel app
   - ✅ `localhost` ← For development

### Step 3: Enable Firebase Hosting

Firebase Hosting MUST be enabled (even if you don't deploy to it):

1. Go to Firebase Console > **Hosting**
2. If you see "Get started", click it
3. You can skip the actual deployment steps
4. Just needs to be **enabled** for the auth handler to work

### Step 4: Redeploy on Vercel

After updating environment variables:
1. Go to your Vercel dashboard
2. Trigger a new deployment (or it auto-deploys)
3. Wait for completion

### Step 5: Test

1. Clear browser cache (Ctrl+Shift+Delete)
2. Visit: `https://german-citizenship-test-trainer.vercel.app`
3. Click "Sign in with Google"
4. ✅ Should work now!

---

## 🔍 How It Works

### Before (❌ 404 Error):
```
1. User on Vercel app clicks "Sign in with Google"
2. Google authenticates user
3. Google redirects to: 
   https://german-citizenship-test-trainer.vercel.app/__/auth/handler
4. ❌ Vercel doesn't have this handler → 404 NOT_FOUND
```

### After (✅ Working):
```
1. User on Vercel app clicks "Sign in with Google"
2. Google authenticates user
3. Google redirects to: 
   https://einburgercoach.web.app/__/auth/handler
4. ✅ Firebase Hosting serves the handler
5. Firebase processes auth token
6. User redirected back to Vercel app
7. ✅ User is logged in!
```

---

## 📋 Quick Checklist

- [ ] `VITE_FIREBASE_AUTH_DOMAIN=einburgercoach.web.app` in Vercel env vars
- [ ] `einburgercoach.web.app` in Firebase authorized domains
- [ ] `german-citizenship-test-trainer.vercel.app` in Firebase authorized domains
- [ ] Firebase Hosting enabled
- [ ] Vercel redeployed
- [ ] Browser cache cleared
- [ ] Tested Google login
6. Under "Authorized redirect URIs", add:
   - `https://german-citizenship-test-trainer.vercel.app/__/auth/handler`

### Step 6: Redeploy on Vercel

---

## 🆘 Still Having Issues?

### Verify Your Current Config

Run this in browser console (F12) on your Vercel app:

```javascript
// Check what authDomain is actually being used
console.log('Auth Domain:', auth.config.authDomain);
```

Should show: `einburgercoach.web.app` or `einburgercoach.firebaseapp.com`

If it shows your Vercel domain, env vars didn't update!

### Verify Firebase Hosting is Enabled

Visit: `https://einburgercoach.web.app`

You should see SOMETHING (even a default page). If 404, Hosting isn't enabled.

### Check All Authorized Domains

Firebase Console > Authentication > Settings > Authorized domains

Should have:
```
✅ einburgercoach.web.app
✅ einburgercoach.firebaseapp.com  
✅ german-citizenship-test-trainer.vercel.app
✅ localhost
```

---

## 💡 Why This Works

Firebase Authentication with external providers (Google, Facebook) requires `/__/auth/handler`:

1. **Only exists on Firebase Hosting** (*.web.app, *.firebaseapp.com)
2. Processes OAuth redirect callbacks
3. Exchanges authorization codes for tokens
4. Returns authenticated user to your app

Your Vercel app **cannot** serve this endpoint! You must use Firebase's domain for auth, even if your app is hosted elsewhere.

This is **standard** for hosting Firebase apps on Vercel/Netlify!
- ✅ `https://german-citizenship-test-trainer.vercel.app`
- ❌ NOT `http://german-citizenship-test-trainer.vercel.app` (http)
- ❌ NOT `www.german-citizenship-test-trainer.vercel.app` (www)

---

## ⚡ Quick Fix - Hardcode for Testing

If you need a quick fix for testing, temporarily hardcode in `src/lib/firebase.ts`:

```typescript
---

## ✅ SUMMARY - THE CRITICAL FIX

**The Problem:**
```
404: NOT_FOUND when clicking Google Sign-In
```

**The Solution:**
```bash
# In Vercel Environment Variables:
VITE_FIREBASE_AUTH_DOMAIN=einburgercoach.web.app  ✅

# NOT this:
VITE_FIREBASE_AUTH_DOMAIN=german-citizenship-test-trainer.vercel.app  ❌
```

**Why:**
- Firebase's OAuth handler lives at `/__/auth/handler`
- This endpoint **only exists** on Firebase Hosting domains
- Your Vercel app can't serve it
- So you use Firebase's domain for auth, then redirect back to Vercel

**After changing:**
1. ✅ Redeploy Vercel
2. ✅ Clear browser cache
3. ✅ Test Google login
4. ✅ Should work perfectly!

---

This is the **standard pattern** for hosting Firebase apps on Vercel! 🚀
