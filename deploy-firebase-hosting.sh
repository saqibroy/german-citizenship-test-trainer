#!/bin/bash

echo "🔥 Firebase Hosting Setup for Auth Handler"
echo "=========================================="
echo ""
echo "This script will deploy your public folder to Firebase Hosting"
echo "so the Google OAuth handler (/__/auth/handler) works correctly."
echo ""

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI not found!"
    echo ""
    echo "Install it with:"
    echo "  npm install -g firebase-tools"
    echo ""
    exit 1
fi

echo "✅ Firebase CLI found"
echo ""

# Check if logged in
if ! firebase projects:list &> /dev/null; then
    echo "📝 Not logged in to Firebase"
    echo "Running: firebase login"
    echo ""
    firebase login
fi

echo "✅ Logged in to Firebase"
echo ""

# Check if firebase.json exists
if [ ! -f "firebase.json" ]; then
    echo "❌ firebase.json not found!"
    echo "Creating it now..."
    cat > firebase.json << 'EOF'
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
    echo "✅ Created firebase.json"
fi

# Check if .firebaserc exists
if [ ! -f ".firebaserc" ]; then
    echo "❌ .firebaserc not found!"
    echo "Creating it now..."
    cat > .firebaserc << 'EOF'
{
  "projects": {
    "default": "einburgercoach"
  }
}
EOF
    echo "✅ Created .firebaserc"
fi

echo ""
echo "📦 Deploying to Firebase Hosting..."
echo "Project: einburgercoach"
echo "Domain: einburgercoach.web.app"
echo ""

firebase deploy --only hosting

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Deployment successful!"
    echo ""
    echo "🎉 Your auth handler is now live at:"
    echo "   https://einburgercoach.web.app/__/auth/handler"
    echo ""
    echo "🔧 Next steps:"
    echo "1. Go to Firebase Console → Authentication → Settings → Authorized domains"
    echo "2. Make sure these domains are added:"
    echo "   ✅ einburgercoach.web.app"
    echo "   ✅ einburgercoach.firebaseapp.com"
    echo "   ✅ german-citizenship-test-trainer.vercel.app"
    echo "   ✅ localhost"
    echo ""
    echo "3. In Vercel environment variables, set:"
    echo "   VITE_FIREBASE_AUTH_DOMAIN=einburgercoach.web.app"
    echo ""
    echo "4. Redeploy your Vercel app"
    echo ""
    echo "5. Test Google login!"
    echo ""
else
    echo ""
    echo "❌ Deployment failed!"
    echo "Check the error above and try again."
    echo ""
fi
