# 🔧 Complete Firebase Domain Setup - Fixing Both Errors

## Your Current Situation

You're getting **two different errors** depending on the `authDomain` setting:

### Error 1: 404 NOT_FOUND
```bash
# When using:
VITE_FIREBASE_AUTH_DOMAIN=german-citizenship-test-trainer.vercel.app
```
**Problem:** Vercel doesn't have the `/__/auth/handler` endpoint

### Error 2: auth/unauthorized-domain
```bash
# When using:
VITE_FIREBASE_AUTH_DOMAIN=einburgercoach.web.app
```
**Problem:** `einburgercoach.web.app` not added to Firebase authorized domains

---

## ✅ The Complete Fix (Do ALL These Steps)

### Step 1: Add BOTH Domains to Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **einburgercoach**
3. Click **Authentication** in left sidebar
4. Click **Settings** tab
5. Scroll to **Authorized domains** section
6. Click **Add domain**
7. Add these domains **ONE BY ONE**:

```
✅ einburgercoach.web.app
✅ einburgercoach.firebaseapp.com
✅ german-citizenship-test-trainer.vercel.app
✅ localhost
```

**IMPORTANT:** Just the domain name, no `https://` or `/` at the end!

**Screenshot of what it should look like:**
```
Authorized domains:
✅ einburgercoach.web.app
✅ einburgercoach.firebaseapp.com
✅ german-citizenship-test-trainer.vercel.app
✅ localhost
```

### Step 2: Enable Firebase Hosting

Firebase Hosting **MUST** be enabled for the auth handler to work:

1. In Firebase Console, click **Hosting** in left sidebar
2. If you see "Get started", click it
3. Follow the initial setup:
   - Install Firebase CLI (you can skip this)
   - Click through the steps
   - **You don't need to actually deploy anything!**
4. Just make sure Hosting is **enabled** (not showing "Get started" anymore)

### Step 3: Deploy a Minimal Page to Firebase Hosting (Required!)

Even though your app is on Vercel, Firebase Hosting needs to be active:

<function_calls>
<invoke name="run_in_terminal">
<parameter name="command">cd /home/saqib/projects/einburgrungtest-trainer && cat > firebase.json << 'EOF'
{
  "hosting": {
    "public": "public",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ]
  }
}
EOF
