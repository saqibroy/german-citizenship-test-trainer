# 🔥 Firebase Setup Guide

## Current Status

✅ Firebase project created: `german-citizenship-trainer`  
✅ Project connected locally (.firebaserc)  
✅ Configuration files created (firebase.json, firestore.rules)  
⏳ **Billing needs to be enabled**  
⏳ **Firestore database needs to be created**  

---

## 🚀 Quick Setup (3 Steps)

### Step 1: Enable Billing (Required - But FREE Tier Available!)

Firebase requires a billing account, but you won't be charged on the **Spark Plan (Free Tier)**.

**Free Tier Includes:**
- 50,000 document reads/day
- 20,000 document writes/day
- 1 GB storage
- 10 GB/month network egress

**Action:**
1. Go to: https://console.developers.google.com/billing/enable?project=german-citizenship-trainer
2. Click "Link a billing account" or "Create billing account"
3. Enter payment details (required but won't be charged on free tier)
4. Complete setup

---

### Step 2: Create Firestore Database

1. Go to: https://console.firebase.google.com/project/german-citizenship-trainer/firestore
2. Click **"Create database"**
3. Select: **"Start in production mode"** (we have security rules ready)
4. Choose location: **"europe-west3 (Frankfurt)"** - closest to your users in Germany
5. Click **"Enable"**
6. Wait 1-2 minutes for database creation

---

### Step 3: Enable Authentication

1. Go to: https://console.firebase.google.com/project/german-citizenship-trainer/authentication
2. Click **"Get started"**
3. Go to **"Sign-in method"** tab
4. Click on **"Email/Password"**:
   - Toggle ON "Enable"
   - Click "Save"
5. Click on **"Google"**:
   - Toggle ON "Enable"
   - Select your support email from dropdown
   - Click "Save"

---

## 📝 Get Your Firebase Configuration

After completing the above steps:

1. Go to: https://console.firebase.google.com/project/german-citizenship-trainer/settings/general
2. Scroll down to "Your apps"
3. Click the **Web icon** (`</>`) to add a web app (if not already added)
4. Register app name: `Citizenship Test Trainer`
5. Copy the `firebaseConfig` object
6. Open your `.env` file
7. Fill in the values:

```bash
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=german-citizenship-trainer.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=german-citizenship-trainer
VITE_FIREBASE_STORAGE_BUCKET=german-citizenship-trainer.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789...
VITE_FIREBASE_APP_ID=1:123456789...:web:...
VITE_FIREBASE_MEASUREMENT_ID=G-...
```

---

## 🔧 Deploy Firestore Rules

After completing steps 1-3 above, deploy your security rules:

```bash
npm run deploy:rules
```

This will deploy the security rules from `firestore.rules` to your Firebase project.

---

## 🧪 Test Locally with Emulators

You can test everything locally without affecting production:

```bash
# Start Firebase emulators
npm run emulators
```

This will start:
- 🔐 Authentication Emulator: http://localhost:9099
- 📊 Firestore Emulator: http://localhost:8080
- 🌐 Hosting Emulator: http://localhost:5000
- 🎛️ Emulator UI: http://localhost:4000

---

## 📦 Available NPM Scripts

```bash
# Development
npm run dev                 # Start Vite dev server
npm run emulators          # Start Firebase emulators

# Build
npm run build              # Build production app

# Deploy
npm run deploy             # Build + deploy everything
npm run deploy:hosting     # Build + deploy hosting only
npm run deploy:rules       # Deploy Firestore rules only

# Testing
npm run test               # Run tests
npm run test:ui            # Run tests with UI
```

---

## 🚀 First Deployment

Once you've completed all setup steps:

```bash
# 1. Build your app
npm run build

# 2. Deploy to Firebase Hosting
npm run deploy:hosting
```

Your app will be live at:
`https://german-citizenship-trainer.web.app`

---

## 📊 Firebase Console Links

- **Project Overview**: https://console.firebase.google.com/project/german-citizenship-trainer
- **Authentication**: https://console.firebase.google.com/project/german-citizenship-trainer/authentication
- **Firestore Database**: https://console.firebase.google.com/project/german-citizenship-trainer/firestore
- **Hosting**: https://console.firebase.google.com/project/german-citizenship-trainer/hosting
- **Settings**: https://console.firebase.google.com/project/german-citizenship-trainer/settings/general

---

## ✅ Verification Checklist

After setup, verify everything works:

- [ ] Billing enabled in Google Cloud Console
- [ ] Firestore database created (europe-west3)
- [ ] Email/Password auth enabled
- [ ] Google sign-in enabled
- [ ] Firebase config copied to `.env`
- [ ] Firestore rules deployed successfully
- [ ] Can run emulators locally
- [ ] App builds successfully

---

## 🆘 Troubleshooting

### "Billing needs to be enabled"
→ Follow Step 1 above to enable billing (free tier available)

### "Database not found"
→ Follow Step 2 to create Firestore database

### "Authentication not enabled"
→ Follow Step 3 to enable auth methods

### "Permission denied" errors
→ Run `npm run deploy:rules` to deploy security rules

### Emulators won't start
→ Make sure ports 4000, 5000, 8080, 9099 are not in use

---

## 🎯 Next Steps

After Firebase setup is complete:

1. ✅ Set up Stripe account for payments
2. ✅ Fill in Stripe keys in `.env`
3. ✅ Integrate auth pages into App.tsx
4. ✅ Test signup/login flow
5. ✅ Deploy to production

---

**Need help?** Check the [Firebase Documentation](https://firebase.google.com/docs) or the project's main README.
