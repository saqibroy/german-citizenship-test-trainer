#!/bin/bash

# Firebase Setup Helper Script
# Run this after enabling billing and creating Firestore database

echo "🔥 Firebase Setup Helper"
echo "========================"
echo ""

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI not found. Installing..."
    npm install -g firebase-tools
else
    echo "✅ Firebase CLI installed ($(firebase --version))"
fi

# Check if logged in
echo ""
echo "Checking Firebase login status..."
firebase projects:list > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "✅ Logged in to Firebase"
else
    echo "❌ Not logged in. Running login..."
    firebase login
fi

# Deploy Firestore rules
echo ""
echo "📝 Deploying Firestore security rules..."
firebase deploy --only firestore:rules

# Deploy Firestore indexes
echo ""
echo "📊 Deploying Firestore indexes..."
firebase deploy --only firestore:indexes

echo ""
echo "✅ Firebase setup complete!"
echo ""
echo "Next steps:"
echo "1. Fill in your .env file with Firebase config values"
echo "2. Test locally with: firebase emulators:start"
echo "3. Build your app: npm run build"
echo "4. Deploy to hosting: firebase deploy --only hosting"
