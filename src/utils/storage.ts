// Safe localStorage wrapper with error handling and validation

export function safeGetItem<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) return defaultValue;
    
    const parsed = JSON.parse(item);
    
    // Basic validation - you can extend this
    if (parsed === null || parsed === undefined) {
      return defaultValue;
    }
    
    return parsed as T;
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return defaultValue;
  }
}

export function safeSetItem(key: string, value: any): boolean {
  try {
    const serialized = JSON.stringify(value);
    localStorage.setItem(key, serialized);
    return true;
  } catch (error) {
    console.error(`Error writing ${key} to localStorage:`, error);
    
    // Handle quota exceeded error
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      console.warn('localStorage quota exceeded. Consider clearing old data.');
    }
    
    return false;
  }
}

export function safeRemoveItem(key: string): boolean {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing ${key} from localStorage:`, error);
    return false;
  }
}

export function safeClearAll(): boolean {
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
}

// Validate progress data structure
export function validateProgressData(data: any): boolean {
  if (!data || typeof data !== 'object') return false;
  
  // Check if it has expected properties
  for (const key in data) {
    const item = data[key];
    if (!item.lastSeen || !item.srsLevel || typeof item.correct !== 'number') {
      console.warn(`Invalid progress data for question ${key}`);
      return false;
    }
  }
  
  return true;
}

// Validate quiz history
export function validateQuizHistory(data: any): boolean {
  if (!Array.isArray(data)) return false;
  
  for (const quiz of data) {
    if (!quiz.date || typeof quiz.score !== 'number' || typeof quiz.total !== 'number') {
      console.warn('Invalid quiz history entry');
      return false;
    }
  }
  
  return true;
}

// Validate vocab progress
export function validateVocabProgress(data: any): boolean {
  if (!data || typeof data !== 'object') return false;
  
  for (const key in data) {
    const item = data[key];
    if (!item.lastSeen || !item.srsLevel) {
      console.warn(`Invalid vocab data for word ${key}`);
      return false;
    }
  }
  
  return true;
}
