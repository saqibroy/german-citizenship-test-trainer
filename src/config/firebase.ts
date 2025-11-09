import { initializeApp } from 'firebase/app';
import { connectFirestoreEmulator, initializeFirestore } from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore with experimental long polling to fix connection issues
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true, // Force long polling instead of WebChannel
  experimentalAutoDetectLongPolling: false,
});

// Initialize Auth
export const auth = getAuth(app);

// Log initialization for debugging
console.log('Firebase initialized with long polling:', {
  projectId: firebaseConfig.projectId,
  authDomain: firebaseConfig.authDomain,
  databaseURL: `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)`,
  longPolling: true
});

// TEMPORARILY DISABLED: IndexedDB Persistence
// This was causing 400 errors. Will re-enable after testing.
// If you need offline support, uncomment the block below after fixing the 400 errors
/*
import { enableIndexedDbPersistence } from 'firebase/firestore';
if (typeof window !== 'undefined') {
  enableIndexedDbPersistence(db, {
    forceOwnership: false // Allow multiple tabs
  }).catch((err) => {
    if (err.code === 'failed-precondition') {
      console.warn('Firestore persistence failed: Multiple tabs open');
    } else if (err.code === 'unimplemented') {
      console.warn('Firestore persistence not available in this browser');
    } else {
      console.warn('Firestore persistence error:', err.code, err.message);
    }
  });
}
*/

// Connect to emulators in development (optional)
if (import.meta.env.DEV && import.meta.env.VITE_USE_FIREBASE_EMULATOR === 'true') {
  connectFirestoreEmulator(db, 'localhost', 8080);
  connectAuthEmulator(auth, 'http://localhost:9099');
}

export default app;
