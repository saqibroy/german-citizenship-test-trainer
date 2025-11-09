#!/bin/bash

# Firestore Database Setup Script
# This script helps you verify and set up your Firestore database

echo "================================"
echo "Firestore Database Setup"
echo "================================"
echo ""

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI is not installed"
    echo "Install it with: npm install -g firebase-tools"
    exit 1
fi

echo "✅ Firebase CLI is installed"
echo ""

# Check if logged in
if ! firebase projects:list &> /dev/null; then
    echo "❌ Not logged in to Firebase"
    echo "Run: firebase login"
    exit 1
fi

echo "✅ Logged in to Firebase"
echo ""

# Get current project
PROJECT=$(firebase projects:list | grep "current" | awk '{print $2}')
echo "📦 Current project: $PROJECT"
echo ""

# Deploy Firestore rules
echo "📤 Deploying Firestore rules..."
if firebase deploy --only firestore:rules; then
    echo "✅ Firestore rules deployed successfully!"
else
    echo "❌ Failed to deploy rules"
    echo "This is expected if the database doesn't exist yet"
fi

echo ""
echo "================================"
echo "⚠️  IMPORTANT: Manual Steps Required"
echo "================================"
echo ""
echo "You need to CREATE the Firestore database manually:"
echo ""
echo "1. Open: https://console.firebase.google.com/project/$PROJECT/firestore"
echo "2. Click 'Create database'"
echo "3. Choose 'Start in production mode'"
echo "4. Select location: 'eur3 (europe-west)' (recommended for Europe)"
echo "5. Click 'Enable'"
echo ""
echo "After creating the database:"
echo "- Your data will sync automatically"
echo "- User progress will persist across devices"
echo "- Run this script again to deploy rules"
echo ""
echo "================================"
echo "What gets stored where?"
echo "================================"
echo ""
echo "📁 Git Repository (src/data.js):"
echo "   - Quiz questions"
echo "   - Answers and explanations"
echo "   - Static content"
echo ""
echo "☁️  Firestore Database:"
echo "   - User accounts"
echo "   - Progress tracking"
echo "   - Quiz history"
echo "   - Settings"
echo ""
echo "💰 Cost: FREE for up to 20,000+ users!"
echo ""
