# 🔧 Firebase Auth Domain Fix

## Problem
Getting `auth/unauthorized-domain` error when trying to login from `german-citizenship-test-trainer.vercel.app` even though the domain is added to Firebase Console.

## Root Cause
The `authDomain` in your Firebase configuration might not match your production domain exactly.

---

## ✅ Solution - Follow These Steps:

### Step 1: Check Your Current Configuration

Your Firebase config should look like this in production:

```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "german-citizenship-test-trainer.vercel.app", // ← MUST match your domain!
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### Step 2: Update Your Environment Variables

Create/update your `.env` file (for local development):

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Step 3: Configure Vercel Environment Variables

In your Vercel dashboard:

1. Go to your project
2. Settings → Environment Variables
3. Add these variables:

```
VITE_FIREBASE_API_KEY = your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN = german-citizenship-test-trainer.vercel.app
VITE_FIREBASE_PROJECT_ID = your-project-id
VITE_FIREBASE_STORAGE_BUCKET = your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID = your_sender_id
VITE_FIREBASE_APP_ID = your_app_id
```

**IMPORTANT:** Make sure `VITE_FIREBASE_AUTH_DOMAIN` is set to:
- **Production:** `german-citizenship-test-trainer.vercel.app`
- **Local:** `your-project-id.firebaseapp.com`

### Step 4: Update Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Go to **Authentication** → **Settings** → **Authorized domains**
4. Make sure these domains are added:
   - ✅ `localhost`
   - ✅ `german-citizenship-test-trainer.vercel.app`
   - ✅ `your-project-id.firebaseapp.com` (default)
   - ✅ `your-project-id.web.app` (if using Firebase Hosting)

**Format:** Just the domain name, no `http://` or `https://`

### Step 5: Update OAuth Provider Settings (if using Google Sign-In)

If you're using Google Sign-In:

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Select your project
3. **APIs & Services** → **Credentials**
4. Click on your OAuth 2.0 Client ID
5. Under "Authorized JavaScript origins", add:
   - `https://german-citizenship-test-trainer.vercel.app`
6. Under "Authorized redirect URIs", add:
   - `https://german-citizenship-test-trainer.vercel.app/__/auth/handler`

### Step 6: Redeploy on Vercel

After updating environment variables:

```bash
# Trigger a new deployment
git commit --allow-empty -m "Update Firebase config"
git push
```

Or manually trigger deployment in Vercel dashboard.

---

## 🧪 Testing

### Local Testing:
1. Make sure `.env` has `authDomain` set to `your-project-id.firebaseapp.com`
2. Run `npm run dev`
3. Try logging in → should work

### Production Testing:
1. Make sure Vercel env vars have `authDomain` set to `german-citizenship-test-trainer.vercel.app`
2. Deploy to Vercel
3. Open `https://german-citizenship-test-trainer.vercel.app`
4. Open DevTools Console (F12)
5. Try logging in
6. Check for errors

---

## 🔍 Debugging

If still not working, check these:

### 1. Verify authDomain in Browser Console:

```javascript
// In browser console, type:
console.log(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN)
```

Should show:
- **Local:** `your-project-id.firebaseapp.com`
- **Production:** `german-citizenship-test-trainer.vercel.app`

### 2. Check Network Tab:

1. Open DevTools → Network tab
2. Try logging in
3. Look for requests to `https://identitytoolkit.googleapis.com`
4. Check if there's an error response

### 3. Clear Browser Cache:

```
Chrome: Ctrl+Shift+Delete → Clear cached images and files
Firefox: Ctrl+Shift+Delete → Clear cache
```

### 4. Check Exact URL:

Make sure you're accessing exactly:
- ✅ `https://german-citizenship-test-trainer.vercel.app`
- ❌ NOT `http://german-citizenship-test-trainer.vercel.app` (http)
- ❌ NOT `www.german-citizenship-test-trainer.vercel.app` (www)

---

## ⚡ Quick Fix - Hardcode for Testing

If you need a quick fix for testing, temporarily hardcode in `src/lib/firebase.ts`:

```typescript
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY",
  authDomain: "german-citizenship-test-trainer.vercel.app", // ← Hardcoded
  projectId: "YOUR_ACTUAL_PROJECT_ID",
  storageBucket: "YOUR_ACTUAL_STORAGE_BUCKET",
  messagingSenderId: "YOUR_ACTUAL_SENDER_ID",
  appId: "YOUR_ACTUAL_APP_ID"
};
```

**Note:** Don't commit real API keys to Git! Use environment variables instead.

---

## 📋 Checklist

- [ ] Environment variables updated in Vercel
- [ ] `authDomain` matches production domain exactly
- [ ] Domains added to Firebase Console (Authorized domains)
- [ ] OAuth credentials updated (if using Google Sign-In)
- [ ] Browser cache cleared
- [ ] Redeployed to Vercel
- [ ] Tested in production

---

## 💡 Common Mistakes

1. **Wrong format in Firebase Console:**
   - ❌ `https://german-citizenship-test-trainer.vercel.app`
   - ✅ `german-citizenship-test-trainer.vercel.app`

2. **Forgot to redeploy after updating env vars**
   - Environment variables only apply after redeployment

3. **Using wrong domain:**
   - Make sure you're not using preview URLs
   - Use your main production domain

4. **OAuth redirect URIs:**
   - Must include `/__/auth/handler` path
   - Must be `https://` (not `http://`)

---

## 🎯 Expected Result

After fixing:
- ✅ Can login on `https://german-citizenship-test-trainer.vercel.app`
- ✅ No `auth/unauthorized-domain` error
- ✅ Google Sign-In works (if enabled)
- ✅ Email Sign-In works

---

**If still not working after all steps, check:**
1. Firebase Console → Authentication → Settings → Check all authorized domains
2. Google Cloud Console → Credentials → Check OAuth settings
3. Vercel → Settings → Environment Variables → Verify all values
4. Browser console for exact error message
