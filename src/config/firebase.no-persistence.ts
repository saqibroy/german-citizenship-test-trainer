import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
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

// Initialize Firestore (without persistence - testing fix for 400 errors)
export const db = getFirestore(app);

// Initialize Auth
export const auth = getAuth(app);

// NOTE: Persistence is disabled to fix 400 errors
// If you need offline support, uncomment this after fixing the 400 errors:
/*
import { enableIndexedDbPersistence } from 'firebase/firestore';
if (typeof window !== 'undefined') {
  enableIndexedDbPersistence(db, {
    forceOwnership: false
  }).catch((err) => {
    console.warn('Firestore persistence error:', err.code, err.message);
  });
}
*/

// Connect to emulators in development (optional)
if (import.meta.env.DEV && import.meta.env.VITE_USE_FIREBASE_EMULATOR === 'true') {
  connectFirestoreEmulator(db, 'localhost', 8080);
  connectAuthEmulator(auth, 'http://localhost:9099');
}

export default app;
