import { useState } from 'react';
import { doc, setDoc, getDoc, getDocs, collection, writeBatch } from 'firebase/firestore';
import { db, auth } from '../config/firebase';

interface LogEntry {
  timestamp: string;
  message: string;
  type: 'info' | 'success' | 'error' | 'warning';
}

export function DiagnosticPage() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [testResults, setTestResults] = useState({
    connection: 'pending',
    simpleWrite: 'pending',
    batchWrite: 'pending',
    read: 'pending',
  });

  const log = (message: string, type: LogEntry['type'] = 'info') => {
    const entry: LogEntry = {
      timestamp: new Date().toLocaleTimeString(),
      message,
      type,
    };
    setLogs(prev => [...prev, entry]);
    console.log(`[${type.toUpperCase()}]`, message);
  };

  const clearLogs = () => setLogs([]);

  const testConnection = async () => {
    log('Testing Firebase connection...', 'info');
    try {
      const user = auth.currentUser;
      if (!user) {
        log('✗ Not authenticated', 'error');
        setTestResults(prev => ({ ...prev, connection: 'error' }));
        return;
      }

      log(`✓ User authenticated: ${user.email}`, 'success');
      log(`UID: ${user.uid}`, 'info');

      // Check if user document exists
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        log('✓ User document exists in Firestore', 'success');
        setTestResults(prev => ({ ...prev, connection: 'success' }));
      } else {
        log('⚠ User document does not exist', 'warning');
        setTestResults(prev => ({ ...prev, connection: 'warning' }));
      }
    } catch (error: any) {
      log(`✗ Connection test failed: ${error.code} - ${error.message}`, 'error');
      setTestResults(prev => ({ ...prev, connection: 'error' }));
    }
  };

  const testSimpleWrite = async () => {
    log('Testing simple write operation...', 'info');
    const user = auth.currentUser;
    if (!user) {
      log('✗ Not authenticated', 'error');
      return;
    }

    try {
      // First, ensure user document exists
      log('Step 1: Creating/updating user document...', 'info');
      const userRef = doc(db, 'users', user.uid);
      
      await setDoc(userRef, {
        email: user.email,
        lastTest: new Date().toISOString(),
        testType: 'simple-write'
      }, { merge: true });
      
      log('✓ User document written', 'success');

      // Now write a progress document
      log('Step 2: Writing progress document...', 'info');
      const progressRef = doc(db, `users/${user.uid}/progress/diagnostic-test-${Date.now()}`);
      
      await setDoc(progressRef, {
        questionId: 999,
        correct: 1,
        incorrect: 0,
        lastAnswered: new Date().toISOString(),
        srsLevel: 'learning',
        diagnosticTest: true
      }, { merge: true });
      
      log('✓ Progress document written', 'success');

      // Verify by reading back
      log('Step 3: Verifying write...', 'info');
      const readBack = await getDoc(progressRef);
      if (readBack.exists()) {
        log('✓ Document verified (read back successful)', 'success');
        log(`Data: ${JSON.stringify(readBack.data())}`, 'info');
        setTestResults(prev => ({ ...prev, simpleWrite: 'success' }));
      } else {
        log('⚠ Document write may have failed', 'warning');
        setTestResults(prev => ({ ...prev, simpleWrite: 'warning' }));
      }
    } catch (error: any) {
      log(`✗ Write failed: ${error.code} - ${error.message}`, 'error');
      log(`Full error: ${JSON.stringify(error, null, 2)}`, 'error');
      setTestResults(prev => ({ ...prev, simpleWrite: 'error' }));
    }
  };

  const testBatchWrite = async () => {
    log('Testing batch write operation...', 'info');
    const user = auth.currentUser;
    if (!user) {
      log('✗ Not authenticated', 'error');
      return;
    }

    try {
      log('Step 1: Creating batch...', 'info');
      const batch = writeBatch(db);
      
      // Add 5 documents to the batch
      for (let i = 1; i <= 5; i++) {
        const ref = doc(db, `users/${user.uid}/progress/batch-test-${Date.now()}-${i}`);
        batch.set(ref, {
          questionId: 1000 + i,
          correct: i % 2,
          incorrect: (i + 1) % 2,
          lastAnswered: new Date().toISOString(),
          srsLevel: 'learning',
          batchTest: true,
          batchNumber: i
        }, { merge: true });
        log(`Added document ${i} to batch`, 'info');
      }
      
      log('Step 2: Committing batch...', 'info');
      await batch.commit();
      log('✓ Batch committed successfully', 'success');
      
      // Update user doc with last sync
      log('Step 3: Updating user lastSyncedAt...', 'info');
      await setDoc(doc(db, 'users', user.uid), {
        lastSyncedAt: new Date().toISOString(),
        lastBatchTest: new Date().toISOString()
      }, { merge: true });
      log('✓ User document updated', 'success');
      
      setTestResults(prev => ({ ...prev, batchWrite: 'success' }));
    } catch (error: any) {
      log(`✗ Batch write failed: ${error.code} - ${error.message}`, 'error');
      log(`Error details: ${JSON.stringify({
        code: error.code,
        message: error.message,
        name: error.name,
        stack: error.stack
      }, null, 2)}`, 'error');
      setTestResults(prev => ({ ...prev, batchWrite: 'error' }));
    }
  };

  const testRead = async () => {
    log('Testing read operation...', 'info');
    const user = auth.currentUser;
    if (!user) {
      log('✗ Not authenticated', 'error');
      return;
    }

    try {
      log('Reading progress documents...', 'info');
      const progressRef = collection(db, `users/${user.uid}/progress`);
      const snapshot = await getDocs(progressRef);
      
      log(`✓ Found ${snapshot.size} documents`, 'success');
      
      if (snapshot.size > 0) {
        let index = 0;
        snapshot.forEach((docSnap) => {
          if (index < 3) { // Show first 3
            log(`Document ${docSnap.id}: ${JSON.stringify(docSnap.data())}`, 'info');
          }
          index++;
        });
      }
      
      setTestResults(prev => ({ ...prev, read: 'success' }));
    } catch (error: any) {
      log(`✗ Read failed: ${error.code} - ${error.message}`, 'error');
      setTestResults(prev => ({ ...prev, read: 'error' }));
    }
  };

  const runAllTests = async () => {
    clearLogs();
    log('🔥 Starting comprehensive Firestore diagnostic...', 'info');
    log('========================================', 'info');
    
    await testConnection();
    await new Promise(r => setTimeout(r, 500));
    
    await testSimpleWrite();
    await new Promise(r => setTimeout(r, 500));
    
    await testBatchWrite();
    await new Promise(r => setTimeout(r, 500));
    
    await testRead();
    
    log('========================================', 'info');
    log('✓ All tests completed', 'success');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLogColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-400';
      case 'error': return 'text-red-400';
      case 'warning': return 'text-yellow-400';
      default: return 'text-blue-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🔍 Firestore Diagnostic Tool
          </h1>
          <p className="text-gray-600 mb-8">
            Test all aspects of your Firestore integration
          </p>

          {/* User Info */}
          {auth.currentUser && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Logged in as:</strong> {auth.currentUser.email}
              </p>
              <p className="text-sm text-gray-700">
                <strong>UID:</strong> {auth.currentUser.uid}
              </p>
            </div>
          )}

          {!auth.currentUser && (
            <div className="mb-6 p-4 bg-yellow-50 rounded-lg">
              <p className="text-sm text-yellow-800">
                ⚠️ Please login first to run diagnostics
              </p>
            </div>
          )}

          {/* Test Status */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600 mb-2">Connection</p>
              <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(testResults.connection)}`}>
                {testResults.connection}
              </span>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600 mb-2">Simple Write</p>
              <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(testResults.simpleWrite)}`}>
                {testResults.simpleWrite}
              </span>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600 mb-2">Batch Write</p>
              <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(testResults.batchWrite)}`}>
                {testResults.batchWrite}
              </span>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600 mb-2">Read</p>
              <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(testResults.read)}`}>
                {testResults.read}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mb-6">
            <button
              onClick={runAllTests}
              disabled={!auth.currentUser}
              className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-shadow"
            >
              🚀 Run All Tests
            </button>
            <button
              onClick={testConnection}
              disabled={!auth.currentUser}
              className="bg-blue-500 text-white px-4 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              1. Connection
            </button>
            <button
              onClick={testSimpleWrite}
              disabled={!auth.currentUser}
              className="bg-green-500 text-white px-4 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              2. Simple Write
            </button>
            <button
              onClick={testBatchWrite}
              disabled={!auth.currentUser}
              className="bg-orange-500 text-white px-4 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              3. Batch Write
            </button>
            <button
              onClick={testRead}
              disabled={!auth.currentUser}
              className="bg-indigo-500 text-white px-4 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              4. Read
            </button>
            <button
              onClick={clearLogs}
              className="bg-gray-500 text-white px-4 py-3 rounded-lg font-semibold"
            >
              Clear Logs
            </button>
          </div>

          {/* Console Log */}
          <div className="bg-gray-900 rounded-lg p-4 h-96 overflow-y-auto font-mono text-sm">
            {logs.length === 0 ? (
              <p className="text-gray-500">No logs yet. Click "Run All Tests" to start.</p>
            ) : (
              logs.map((entry, index) => (
                <div key={index} className={`mb-1 ${getLogColor(entry.type)}`}>
                  <span className="text-gray-500">[{entry.timestamp}]</span> {entry.message}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
