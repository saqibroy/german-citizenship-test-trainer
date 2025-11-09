import { auth } from '../config/firebase';

/**
 * Pure REST API implementation for Firestore writes
 * Bypasses the broken SDK WebChannel completely
 */

const PROJECT_ID = 'german-citizenship-trainer';
const DATABASE_ID = '(default)';

/**
 * Convert JavaScript object to Firestore field format
 */
function convertToFirestoreFields(obj: any): any {
  const fields: any = {};
  
  for (const [key, value] of Object.entries(obj)) {
    if (value === null || value === undefined) {
      fields[key] = { nullValue: null };
    } else if (typeof value === 'string') {
      fields[key] = { stringValue: value };
    } else if (typeof value === 'number') {
      if (Number.isInteger(value)) {
        fields[key] = { integerValue: value.toString() };
      } else {
        fields[key] = { doubleValue: value };
      }
    } else if (typeof value === 'boolean') {
      fields[key] = { booleanValue: value };
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
            if (typeof item === 'object' && item !== null) {
              return { mapValue: { fields: convertToFirestoreFields(item) } };
            }
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

/**
 * Write a single document using REST API with createDocument
 */
export async function writeDocument(
  collection: string,
  documentId: string,
  data: any
): Promise<void> {
  const idToken = await auth.currentUser?.getIdToken();
  if (!idToken) throw new Error('Not authenticated');

  // Use createDocument with merge behavior
  const url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/${DATABASE_ID}/documents:commit`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${idToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      writes: [
        {
          update: {
            name: `projects/${PROJECT_ID}/databases/${DATABASE_ID}/documents/${collection}/${documentId}`,
            fields: convertToFirestoreFields(data)
          }
        }
      ]
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    let errorJson;
    try {
      errorJson = JSON.parse(errorText);
    } catch {
      errorJson = { error: errorText };
    }
    console.error(`Failed to write ${collection}/${documentId}:`, errorJson);
    console.error(`URL used: https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/${DATABASE_ID}/documents:commit`);
    console.error(`Document path: projects/${PROJECT_ID}/databases/${DATABASE_ID}/documents/${collection}/${documentId}`);
    throw new Error(`Write failed (${response.status}): ${JSON.stringify(errorJson)}`);
  }
}

/**
 * Batch write multiple documents using REST API commit
 */
export async function batchWriteDocuments(
  writes: Array<{ collection: string; documentId: string; data: any }>
): Promise<void> {
  const idToken = await auth.currentUser?.getIdToken();
  if (!idToken) throw new Error('Not authenticated');

  // Split into smaller batches (max 500 per batch as per Firestore limits)
  const batchSize = 200;
  const batches = [];
  
  for (let i = 0; i < writes.length; i += batchSize) {
    batches.push(writes.slice(i, i + batchSize));
  }

  console.log(`Writing ${writes.length} documents in ${batches.length} batch(es)...`);

  // Process batches sequentially
  for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
    const batch = batches[batchIndex];
    console.log(`Processing batch ${batchIndex + 1}/${batches.length} (${batch.length} docs)...`);
    
    // Use commit API for atomic batch writes
    const url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/${DATABASE_ID}/documents:commit`;
    
    const commitWrites = batch.map(({ collection, documentId, data }) => ({
      update: {
        name: `projects/${PROJECT_ID}/databases/${DATABASE_ID}/documents/${collection}/${documentId}`,
        fields: convertToFirestoreFields(data)
      }
    }));

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${idToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        writes: commitWrites
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorJson;
      try {
        errorJson = JSON.parse(errorText);
      } catch {
        errorJson = { error: errorText };
      }
      console.error(`Batch ${batchIndex + 1} failed:`, errorJson);
      console.error(`URL used: https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/${DATABASE_ID}/documents:commit`);
      console.error(`Batch size: ${batch.length} documents`);
      throw new Error(`Batch write failed (${response.status}): ${JSON.stringify(errorJson)}`);
    }
    
    console.log(`✓ Batch ${batchIndex + 1} completed`);
  }
}

/**
 * Sync progress using pure REST API
 */
export async function syncProgressViaREST(
  userId: string,
  progress: any
): Promise<void> {
  console.log(`Starting REST API sync for ${Object.keys(progress).length} progress items...`);
  
  const writes = Object.entries(progress).map(([questionId, data]) => ({
    collection: `users/${userId}/progress`,
    documentId: questionId,
    data: data
  }));

  // Add user lastSyncedAt update
  writes.push({
    collection: 'users',
    documentId: userId,
    data: {
      lastSyncedAt: new Date().toISOString()
    }
  });

  await batchWriteDocuments(writes);
  console.log('✓ REST API sync completed successfully');
}
