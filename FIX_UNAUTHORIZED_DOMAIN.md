# 🚨 URGENT FIX: Unauthorized Domain Error

## The Problem

When you set `VITE_FIREBASE_AUTH_DOMAIN=einburgercoach.web.app`, you get:
```
auth/unauthorized-domain
```

This means Firebase doesn't recognize `einburgercoach.web.app` as authorized YET.

---

## ✅ The Complete Solution (3 Steps)

### Step 1: Add Domain to Firebase Console (CRITICAL!)

1. Open [Firebase Console](https://console.firebase.google.com/)
2. Select project: **einburgercoach**
3. Click **Authentication** (left sidebar)
4. Click **Settings** tab (top)
5. Scroll to **Authorized domains**
6. Click **Add domain** button
7. Type: `einburgercoach.web.app`
8. Click **Add**
9. Repeat to also add:
   - `einburgercoach.firebaseapp.com`
   - `german-citizenship-test-trainer.vercel.app`
   - `localhost`

**After this, you should see:**
```
Authorized domains:
✅ einburgercoach.web.app
✅ einburgercoach.firebaseapp.com
✅ german-citizenship-test-trainer.vercel.app
✅ localhost
```

### Step 2: Deploy to Firebase Hosting

Firebase Hosting MUST be active for the auth handler to work.

**Option A: Use the deployment script (easiest)**
```bash
./deploy-firebase-hosting.sh
```

**Option B: Manual deployment**
```bash
# Install Firebase CLI (if needed)
npm install -g firebase-tools

# Login
firebase login

# Deploy
firebase deploy --only hosting
```

This deploys your `public` folder (with logo, etc.) to Firebase Hosting and activates the OAuth handler.

### Step 3: Wait 2-5 Minutes

Firebase domain authorization can take a few minutes to propagate. After adding domains:
- Wait 2-5 minutes
- Clear browser cache
- Try again

---

## 🔍 Verification

### Test 1: Check Firebase Hosting is Live

Visit: `https://einburgercoach.web.app`

- ✅ Shows your logo or a page → Good!
- ❌ Shows 404 → Run deployment script again

### Test 2: Check Auth Handler

Visit: `https://einburgercoach.web.app/__/auth/handler`

- ✅ Shows "Completing sign in..." or Firebase message → Good!
- ❌ Shows 404 → Firebase Hosting not active

### Test 3: Check Authorized Domains

Firebase Console → Authentication → Settings → Authorized domains

Should show all 4 domains listed above.

---

## 📋 Quick Checklist

- [ ] Ran `./deploy-firebase-hosting.sh` successfully
- [ ] Can visit `https://einburgercoach.web.app` (shows something, not 404)
- [ ] Added `einburgercoach.web.app` to Firebase authorized domains
- [ ] Added `einburgercoach.firebaseapp.com` to Firebase authorized domains
- [ ] Added `german-citizenship-test-trainer.vercel.app` to Firebase authorized domains
- [ ] Added `localhost` to Firebase authorized domains
- [ ] Waited 2-5 minutes for propagation
- [ ] Set `VITE_FIREBASE_AUTH_DOMAIN=einburgercoach.web.app` in Vercel
- [ ] Redeployed Vercel app
- [ ] Cleared browser cache

---

## 🎯 Final Test

After completing all steps:

1. Visit: `https://german-citizenship-test-trainer.vercel.app`
2. Click "Sign in with Google"
3. ✅ Should work!

---

## 💡 Why This is Needed

Your setup:
- **App hosted on:** Vercel (german-citizenship-test-trainer.vercel.app)
- **Auth handled by:** Firebase Hosting (einburgercoach.web.app)

The flow:
```
User on Vercel app
  ↓
Clicks Google login
  ↓
Redirects to einburgercoach.web.app/__/auth/handler (Firebase)
  ↓
Firebase processes OAuth
  ↓
Redirects back to Vercel app
  ↓
User logged in!
```

**Both domains must be authorized** because:
1. `einburgercoach.web.app` - where OAuth is processed
2. `german-citizenship-test-trainer.vercel.app` - where user returns after auth

---

## 🆘 Still Getting "unauthorized-domain"?

### Double-check Firebase Console:

1. Go to Authentication → Settings
2. Look at "Authorized domains" section
3. Make SURE you see `einburgercoach.web.app` in the list

**Common mistake:** Adding the URL with `https://` or trailing `/`
- ❌ `https://einburgercoach.web.app`
- ❌ `einburgercoach.web.app/`
- ✅ `einburgercoach.web.app`

### Wait and Retry:

Sometimes Firebase takes 2-5 minutes to update domain authorization. Just wait a bit and try again!

### Clear Everything:

```bash
# Clear browser cache completely
Ctrl+Shift+Delete (or Cmd+Shift+Delete on Mac)
→ Check "Cached images and files"
→ Clear

# Try in Incognito/Private window
Ctrl+Shift+N (Chrome) or Ctrl+Shift+P (Firefox)
```

---

## 📞 Quick Commands

```bash
# Deploy Firebase Hosting
./deploy-firebase-hosting.sh

# Or manually:
firebase deploy --only hosting

# Check what's deployed:
firebase hosting:channel:list

# View your site:
open https://einburgercoach.web.app
```

---

That's it! Once the domain is added to Firebase Console, the unauthorized-domain error should disappear! 🎉
