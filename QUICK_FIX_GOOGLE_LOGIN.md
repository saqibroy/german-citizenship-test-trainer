# 🚨 QUICK FIX: Google Login 404 Error

## The Problem
```
404: NOT_FOUND
Code: NOT_FOUND
ID: fra1::tqm8b-1763659046623-5128ddd45e7e
```

## The One-Line Fix

In your **Vercel Environment Variables**, change:

```bash
FROM:  VITE_FIREBASE_AUTH_DOMAIN=german-citizenship-test-trainer.vercel.app
TO:    VITE_FIREBASE_AUTH_DOMAIN=einburgercoach.web.app
```

That's it! Then redeploy.

---

## Why This Works

```
❌ BEFORE (404 Error):
User → Google Login → Redirect to vercel.app/__/auth/handler → 404 NOT FOUND

✅ AFTER (Working):
User → Google Login → Redirect to firebase.web.app/__/auth/handler → Success → Back to Vercel
```

The `/__/auth/handler` endpoint **only exists on Firebase Hosting**, not on Vercel!

---

## Complete Setup (5 Steps)

### 1. Update Vercel Environment Variable
```bash
VITE_FIREBASE_AUTH_DOMAIN=einburgercoach.web.app
```

### 2. Firebase Console → Authentication → Authorized domains
Add both:
- `einburgercoach.web.app` ✅
- `german-citizenship-test-trainer.vercel.app` ✅

### 3. Enable Firebase Hosting
Firebase Console → Hosting → "Get started" (just enable it, no need to deploy)

### 4. Redeploy Vercel
Wait for deployment to complete

### 5. Test
Clear cache (Ctrl+Shift+R) and try Google login

---

## Verify It's Working

Open browser console (F12) on your Vercel app:

```javascript
console.log(auth.config.authDomain);
// Should show: "einburgercoach.web.app"
```

If it shows your Vercel domain, the env var didn't update. Check Vercel settings.

---

## That's All!

This is **normal** for Firebase apps on Vercel/Netlify. You **must** use Firebase's domain for the auth handler, even though your app is hosted elsewhere.

🎉 After this change, Google login will work perfectly!
