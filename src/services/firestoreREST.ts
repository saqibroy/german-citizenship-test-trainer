import { auth } from '../config/firebase';

/**
 * Sync progress using Firestore REST API as a fallback
 * This bypasses the SDK's WebChannel issues
 */
async function syncProgressViaREST(userId: string, progress: any): Promise<void> {
  const idToken = await auth.currentUser?.getIdToken();
  if (!idToken) throw new Error('Not authenticated');

  const writes = Object.entries(progress).map(([questionId, data]) => ({
    update: {
      name: `projects/german-citizenship-trainer/databases/(default)/documents/users/${userId}/progress/${questionId}`,
      fields: convertToFirestoreFields(data as any)
    },
    updateMask: { fieldPaths: Object.keys(data as any) }
  }));

  // Add lastSyncedAt update
  writes.push({
    update: {
      name: `projects/german-citizenship-trainer/databases/(default)/documents/users/${userId}`,
      fields: {
        lastSyncedAt: { timestampValue: new Date().toISOString() }
      }
    },
    updateMask: { fieldPaths: ['lastSyncedAt'] }
  });

  const response = await fetch(
    `https://firestore.googleapis.com/v1/projects/german-citizenship-trainer/databases/(default)/documents:commit`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${idToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ writes })
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`REST API failed: ${response.status} - ${error}`);
  }

  return response.json();
}

/**
 * Convert JavaScript object to Firestore field format
 */
function convertToFirestoreFields(obj: any): any {
  const fields: any = {};
  
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      fields[key] = { stringValue: value };
    } else if (typeof value === 'number') {
      // Check if it's an integer or float
      if (Number.isInteger(value)) {
        fields[key] = { integerValue: value.toString() };
      } else {
        fields[key] = { doubleValue: value };
      }
    } else if (typeof value === 'boolean') {
      fields[key] = { booleanValue: value };
    } else if (value === null) {
      fields[key] = { nullValue: null };
    } else if (Array.isArray(value)) {
      fields[key] = {
        arrayValue: {
          values: value.map(item => {
            if (typeof item === 'string') return { stringValue: item };
            if (typeof item === 'number') {
              return Number.isInteger(item) 
                ? { integerValue: item.toString() }
                : { doubleValue: item };
            }
            if (typeof item === 'boolean') return { booleanValue: item };
            if (typeof item === 'object') return { mapValue: { fields: convertToFirestoreFields(item) } };
            return { nullValue: null };
          })
        }
      };
    } else if (typeof value === 'object') {
      fields[key] = { mapValue: { fields: convertToFirestoreFields(value) } };
    }
  }
  
  return fields;
}

export { syncProgressViaREST };
