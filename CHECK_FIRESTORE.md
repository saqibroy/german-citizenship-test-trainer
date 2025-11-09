# 🔍 Firestore Performance Issue Checklist

Your Firestore writes are taking **80+ seconds** instead of ~1 second. Here's what to check:

## 1. Check Firebase Console - Firestore Database

Visit: https://console.firebase.google.com/project/german-citizenship-trainer/firestore/databases

**Check for:**
- ❓ Is the database status "Active" or "Creating"?
- ❓ What's the location? (Should be europe-west4)
- ❓ Are there any warnings or errors shown?

## 2. Check Firestore Usage & Quota

Visit: https://console.firebase.google.com/project/german-citizenship-trainer/usage

**Check for:**
- ❓ Document Reads/Writes today
- ❓ Are you hitting any quota limits?
- ❓ Is there a "Free tier limit exceeded" warning?

## 3. Check Network from Your Location

Run this in your terminal:

```bash
# Check latency to europe-west4
curl -w "@-" -o /dev/null -s "https://firestore.googleapis.com/v1/projects/german-citizenship-trainer/databases/(default)" <<'EOF'
time_namelookup:  %{time_namelookup}s\n
time_connect:  %{time_connect}s\n
time_appconnect:  %{time_appconnect}s\n
time_pretransfer:  %{time_pretransfer}s\n
time_starttransfer:  %{time_starttransfer}s\n
time_total:  %{time_total}s\n
EOF
```

**Expected:** < 0.5 seconds total
**If > 2 seconds:** Network/firewall issue

## 4. Check Firebase SDK Version

Your project uses: `firebase` v10.8.0 (from the imports)

**Try updating to latest:**
```bash
npm update firebase
```

## 5. Possible Root Causes

Based on your symptoms (writes slow, reads fast):

### Most Likely:
1. **Firestore Database Region Mismatch**
   - Your database is in europe-west4
   - But your Firebase config might be pointing to wrong region
   - **Check in Console:** Which region is actually configured?

2. **Free Tier Quota Hit**
   - Firestore free tier: 50k reads, 20k writes per day
   - **Check usage tab** to see if you're throttled

3. **Network/Firewall Blocking WebChannel**
   - We already tried `experimentalForceLongPolling`
   - But there might be additional firewall rules

### Less Likely:
4. **Multiple Database Instances**
   - You might have created multiple databases
   - App might be writing to the wrong one

5. **Corrupted Firestore Configuration**
   - Try deleting and recreating the database (BACKUP FIRST!)

## 6. Immediate Workarounds

### Option A: Keep current setup with timeout
- ✅ Already implemented (10-second timeout)
- Sync happens in background
- App doesn't block on slow writes

### Option B: Use different database region
```bash
# Create a new database in a closer region
firebase firestore:databases:create my-new-db --location=us-central1
```

Then update your app to use the new database.

### Option C: Use Realtime Database instead
- Faster for small documents
- Different pricing model
- Requires code changes

## 7. Debug Commands to Run

```bash
# 1. Check current Firebase project
firebase projects:list

# 2. Check Firestore databases
firebase firestore:databases:list

# 3. Check if you're on the right project
firebase use

# 4. Test network to Firestore
curl -v https://firestore.googleapis.com/v1/projects/german-citizenship-trainer/databases/(default)
```

## 8. Contact Firebase Support

If none of the above helps, open a Firebase support ticket:
https://firebase.google.com/support

Include:
- Project ID: german-citizenship-trainer
- Issue: Write operations taking 80+ seconds
- Database: (default) in europe-west4
- Diagnostic results (from your tests)

---

## Current Workaround Status

✅ **Implemented:**
- 10-second timeout on sync operations
- Background sync (doesn't block logout)
- Batch writes instead of individual writes
- Long polling enabled

⚠️ **Known Issue:**
- Writes still take 80+ seconds to complete
- But app won't hang waiting for them
