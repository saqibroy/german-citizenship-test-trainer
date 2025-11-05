#!/bin/bash

echo "🧪 Firebase Setup Verification"
echo "=============================="
echo ""

# Check Firebase CLI
echo "1. Checking Firebase CLI..."
if command -v firebase &> /dev/null; then
    echo "   ✅ Firebase CLI installed ($(firebase --version))"
else
    echo "   ❌ Firebase CLI not found"
    exit 1
fi

# Check if logged in
echo ""
echo "2. Checking Firebase login..."
firebase projects:list > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "   ✅ Logged in to Firebase"
else
    echo "   ❌ Not logged in"
    exit 1
fi

# Check project connection
echo ""
echo "3. Checking project connection..."
PROJECT=$(firebase use 2>&1)
if [[ $PROJECT == *"german-citizenship-trainer"* ]]; then
    echo "   ✅ Connected to: german-citizenship-trainer"
else
    echo "   ❌ Project not connected"
    exit 1
fi

# Check database
echo ""
echo "4. Checking Firestore database..."
firebase firestore:databases:list > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "   ✅ Firestore database exists"
else
    echo "   ❌ Database not found"
    exit 1
fi

# Check files
echo ""
echo "5. Checking configuration files..."
FILES=("firebase.json" "firestore.rules" ".firebaserc" ".env")
for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "   ✅ $file exists"
    else
        echo "   ⚠️  $file missing"
    fi
done

# Check .env content
echo ""
echo "6. Checking .env configuration..."
if grep -q "VITE_FIREBASE_API_KEY=" .env && ! grep -q "VITE_FIREBASE_API_KEY=$" .env; then
    echo "   ✅ Firebase API key configured"
else
    echo "   ⚠️  Firebase API key not set in .env"
fi

if grep -q "VITE_STRIPE_PUBLISHABLE_KEY=" .env && ! grep -q "VITE_STRIPE_PUBLISHABLE_KEY=$" .env; then
    echo "   ✅ Stripe key configured"
else
    echo "   ⚠️  Stripe key not set in .env"
fi

echo ""
echo "=============================="
echo "✨ Verification Complete!"
echo ""
echo "Next steps:"
echo "1. Fill in .env with your Firebase config"
echo "2. Fill in .env with your Stripe keys"
echo "3. Run 'npm run dev' to start your app"
echo "4. Run 'npm run emulators' to test with Firebase emulators"
