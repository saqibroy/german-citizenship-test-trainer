# Firestore 400 Error Fix Guide

## ✅ Your Database Exists!

Good news: Your database is created and ready in `europe-west4`.

## ❌ Problem: 400 Bad Request Errors

The 400 errors suggest one of these issues:

### 1. **IndexedDB Persistence Conflict** (Most Likely)

The `enableIndexedDbPersistence()` can cause 400 errors when:
- Multiple tabs are open
- Browser cache is corrupted
- Service worker conflicts

**Quick Fix:**
1. Close ALL browser tabs of your app
2. Clear browser data (Ctrl+Shift+Delete)
   - Select "Cookies and site data"
   - Select "Cached images and files"
3. Open in Incognito/Private mode
4. Try logging in again

**Permanent Fix:**
Temporarily disable persistence to test:

```typescript
// In src/config/firebase.ts
// Comment out lines 25-36 (the enableIndexedDbPersistence block)
```

### 2. **Database Location Mismatch**

Your database is in `europe-west4` (France).
If your app is deployed in a different region, this could cause issues.

**Check:**
- Firebase Console → Firestore → Check location
- Should say: `europe-west4` or `eur3`

### 3. **Security Rules Issue**

Your rules look correct, but let's verify they're deployed:

```bash
firebase deploy --only firestore:rules
```

### 4. **Browser Extension Interference**

Some extensions block Firestore connections:
- Ad blockers
- Privacy extensions
- VPN extensions

**Test:** Try in Incognito mode with extensions disabled

---

## 🧪 Quick Test

### Test 1: Check if you're authenticated

Open browser console on your site and run:

```javascript
import { auth } from './config/firebase';
console.log('User:', auth.currentUser?.email);
console.log('UID:', auth.currentUser?.uid);
```

If this shows your email, authentication works ✅

### Test 2: Try a simple write

```javascript
import { doc, setDoc } from 'firebase/firestore';
import { db, auth } from './config/firebase';

const testWrite = async () => {
  try {
    const uid = auth.currentUser?.uid;
    await setDoc(doc(db, `users/${uid}`), {
      test: true,
      timestamp: new Date().toISOString()
    }, { merge: true });
    console.log('✅ Write successful!');
  } catch (error) {
    console.error('❌ Write failed:', error.code, error.message);
  }
};

testWrite();
```

---

## 🔧 Step-by-Step Fix

### Option A: Disable Persistence (Recommended for testing)

1. Edit `src/config/firebase.ts`
2. Comment out the persistence block:

```typescript
// TEMPORARILY DISABLED - Testing without persistence
// if (typeof window !== 'undefined') {
//   enableIndexedDbPersistence(db, {
//     forceOwnership: false
//   }).catch((err) => {
//     console.warn('Firestore persistence error:', err);
//   });
// }
```

3. Rebuild and test:
```bash
npm run dev
```

### Option B: Clear Everything

1. **Clear Browser Data:**
   - Chrome: Settings → Privacy → Clear browsing data
   - Select "All time"
   - Check "Cookies" and "Cached images"

2. **Clear localStorage:**
   ```javascript
   // In browser console
   localStorage.clear();
   sessionStorage.clear();
   ```

3. **Unregister Service Worker:**
   ```javascript
   // In browser console
   navigator.serviceWorker.getRegistrations().then(function(registrations) {
     for(let registration of registrations) {
       registration.unregister();
     }
   });
   ```

4. **Restart browser completely**

5. **Test in Incognito mode first**

---

## 📊 Understanding Your Data

### What's Working: ✅
- Firebase Auth (you can login/signup)
- Database exists and is ready
- Security rules are deployed
- Questions load from data.js

### What's Not Working: ❌
- Writing to Firestore (400 errors)
- Reading from Firestore (400 errors)
- Data sync across devices

### Root Cause:
Most likely **IndexedDB persistence** or **browser cache** issues.

---

## 🎯 Recommended Solution

1. **Right now** - Test without persistence:
   - Comment out persistence in `firebase.ts`
   - Clear browser cache
   - Test in incognito mode

2. **If that works** - It's the persistence layer:
   - Keep persistence disabled, OR
   - Use memory-only cache instead:
   ```typescript
   import { initializeFirestore, CACHE_SIZE_UNLIMITED } from 'firebase/firestore';
   
   export const db = initializeFirestore(app, {
     cacheSizeBytes: CACHE_SIZE_UNLIMITED
   });
   ```

3. **Long-term**:
   - Firestore works fine without persistence
   - You'll still get caching via memory
   - No offline support, but no 400 errors

---

## 📝 Quick Summary

**Problem:** 400 errors when reading/writing to Firestore

**Likely Cause:** IndexedDB persistence conflicts

**Quick Fix:**
1. Close all tabs
2. Clear browser cache
3. Test in incognito mode
4. If works → persistence issue

**Permanent Fix:**
- Disable `enableIndexedDbPersistence`
- Use memory cache instead
- Or fix persistence settings

---

## Need More Help?

Check Firebase Console logs:
1. Go to: https://console.firebase.google.com/project/german-citizenship-trainer/firestore/logs
2. Look for recent errors
3. Check error messages

The logs will show exactly what's failing!
