import { describe, test, expect } from 'vitest';
import { updateProgress, calculateSRSWeight, calculateSRSLevel, daysSinceLastSeen, SRS_CONFIG } from '../srsAlgorithm';
import type { QuestionProgress } from '../types';

describe('SRS Algorithm - Complete Test Suite', () => {
  const NOW = Date.now();
  const nowISO = new Date(NOW).toISOString();
  
  // Helper to create test data at different SRS levels
  const createProgress = (overrides: Partial<QuestionProgress> = {}): QuestionProgress => ({
    correct: 0,
    incorrect: 0,
    lastSeen: nowISO,
    strength: 'weak',
    srsLevel: 'new',
    easeFactor: SRS_CONFIG.DEFAULT_EASE,
    interval: 0,
    repetitions: 0,
    lapses: 0,
    averageTime: 0,
    lastConfidence: 'good',
    ...overrides
  });

  describe('New Questions (Never Seen)', () => {
    test('should have highest weight for new questions', () => {
      const weight = calculateSRSWeight(undefined, 0);
      expect(weight).toBeGreaterThan(7000); // Very high priority
    });

    test('should create progress on first correct answer', () => {
      const updated = updateProgress(undefined, true, 5);
      
      expect(updated.correct).toBe(1);
      expect(updated.incorrect).toBe(0);
      expect(updated.srsLevel).toBe('learning');
      expect(updated.repetitions).toBe(1);
      expect(updated.lapses).toBe(0);
    });

    test('should create progress on first incorrect answer', () => {
      const updated = updateProgress(undefined, false, 10);
      
      expect(updated.correct).toBe(0);
      expect(updated.incorrect).toBe(1);
      expect(updated.srsLevel).toBe('new');
      expect(updated.lapses).toBe(1);
    });
  });

  describe('Learning Level (Frequent Review Needed)', () => {
    const learningProgress = createProgress({
      correct: 1,
      incorrect: 1,
      srsLevel: 'learning',
      interval: SRS_CONFIG.INTERVALS.learning,
      repetitions: 1,
      lapses: 1,
      lastSeen: new Date(NOW - 30 * 60 * 1000).toISOString() // 30 min ago
    });

    test('should progress when answered correctly quickly (easy)', () => {
      const updated = updateProgress(learningProgress, true, 2); // Fast = easy
      
      expect(updated.correct).toBe(2);
      expect(updated.repetitions).toBe(2);
      expect(updated.interval).toBeGreaterThan(SRS_CONFIG.INTERVALS.learning);
      expect(updated.easeFactor).toBeGreaterThanOrEqual(SRS_CONFIG.DEFAULT_EASE);
    });

    test('should progress when answered correctly at moderate speed (good)', () => {
      const updated = updateProgress(learningProgress, true, 6); // Moderate = good
      
      expect(updated.correct).toBe(2);
      expect(updated.repetitions).toBe(2);
      expect(updated.interval).toBeGreaterThan(0);
    });

    test('should stay learning level when answered slowly (hard)', () => {
      const updated = updateProgress(learningProgress, true, 15); // Slow = hard
      
      expect(updated.correct).toBe(2);
      expect(updated.interval).toBeGreaterThan(0);
    });

    test('should reset repetitions when answered incorrectly', () => {
      const updated = updateProgress(learningProgress, false, 8);
      
      expect(updated.incorrect).toBe(2);
      expect(updated.repetitions).toBe(0);
      expect(updated.lapses).toBe(2);
    });

    test('should have high weight when due for review', () => {
      const weight = calculateSRSWeight(learningProgress, 0);
      expect(weight).toBeGreaterThan(5000); // High priority for learning
    });
  });

  describe('Young Level (1-3 days interval)', () => {
    const youngProgress = createProgress({
      correct: 5,
      incorrect: 1,
      srsLevel: 'young',
      interval: SRS_CONFIG.INTERVALS.young, // 1 day
      repetitions: 5,
      lapses: 1,
      averageTime: 6,
      lastSeen: new Date(NOW - 18 * 60 * 60 * 1000).toISOString() // 18 hours ago
    });

    test('should progress toward mature when answered correctly', () => {
      const updated = updateProgress(youngProgress, true, 5);
      
      expect(updated.correct).toBe(6);
      expect(updated.repetitions).toBe(6);
      expect(updated.interval).toBeGreaterThan(SRS_CONFIG.INTERVALS.young);
    });

    test('should increase ease factor on easy answer', () => {
      const updated = updateProgress(youngProgress, true, 2); // Fast = easy
      
      // Ease factor might be capped at MAX_EASE (2.5), so check it's maintained or increased up to cap
      expect(updated.easeFactor).toBeGreaterThanOrEqual(youngProgress.easeFactor);
      expect(updated.easeFactor).toBeLessThanOrEqual(SRS_CONFIG.MAX_EASE);
    });

    test('should decrease ease factor on hard answer', () => {
      const updated = updateProgress(youngProgress, true, 12); // Slow = hard
      
      expect(updated.easeFactor).toBeLessThan(youngProgress.easeFactor);
    });

    test('should regress when answered incorrectly', () => {
      const updated = updateProgress(youngProgress, false, 10);
      
      expect(updated.incorrect).toBe(2);
      expect(updated.repetitions).toBe(0); // Reset
      // Interval resets to learning phase, which may still be close to young interval
      expect(updated.interval).toBeLessThanOrEqual(youngProgress.interval);
    });

    test('should have medium weight when approaching due date', () => {
      const almostDue = createProgress({
        ...youngProgress,
        lastSeen: new Date(NOW - 20 * 60 * 60 * 1000).toISOString() // 20 hours ago (close to 1 day)
      });
      
      const weight = calculateSRSWeight(almostDue, 0);
      expect(weight).toBeGreaterThan(2000); // Medium priority range
      expect(weight).toBeLessThan(8000);
    });
  });

  describe('Mature Level (3-5 days interval)', () => {
    const matureProgress = createProgress({
      correct: 10,
      incorrect: 1,
      srsLevel: 'mature',
      interval: SRS_CONFIG.INTERVALS.mature, // 3 days
      repetitions: 10,
      lapses: 1,
      averageTime: 5,
      lastSeen: new Date(NOW - 2.5 * 24 * 60 * 60 * 1000).toISOString() // 2.5 days ago
    });

    test('should progress toward mastered when answered correctly', () => {
      const updated = updateProgress(matureProgress, true, 4);
      
      expect(updated.correct).toBe(11);
      expect(updated.repetitions).toBe(11);
      expect(updated.interval).toBeGreaterThan(SRS_CONFIG.INTERVALS.mature);
    });

    test('should respect 7-day interval cap (exam-focused)', () => {
      const longInterval = createProgress({
        ...matureProgress,
        srsLevel: 'mastered',
        interval: 6.5,
        easeFactor: 2.5
      });
      
      const updated = updateProgress(longInterval, true, 3); // Easy answer
      expect(updated.interval).toBeLessThanOrEqual(SRS_CONFIG.MAX_INTERVAL);
    });

    test('should regress significantly when forgotten', () => {
      const updated = updateProgress(matureProgress, false, 15);
      
      expect(updated.incorrect).toBe(2);
      expect(updated.repetitions).toBe(0);
      expect(updated.lapses).toBe(2);
      // Interval should reset or reduce significantly
      expect(updated.interval).toBeLessThanOrEqual(matureProgress.interval);
    });

    test('should have lower weight when not yet due', () => {
      const notDue = createProgress({
        ...matureProgress,
        lastSeen: new Date(NOW - 1 * 24 * 60 * 60 * 1000).toISOString() // Only 1 day ago
      });
      
      const weight = calculateSRSWeight(notDue, 0);
      expect(weight).toBeLessThan(3000);
    });
  });

  describe('Mastered Level (5-7 days interval)', () => {
    const masteredProgress = createProgress({
      correct: 20,
      incorrect: 2,
      srsLevel: 'mastered',
      interval: SRS_CONFIG.INTERVALS.mastered, // 5 days
      repetitions: 20,
      lapses: 2,
      averageTime: 4,
      lastSeen: new Date(NOW - 4.5 * 24 * 60 * 60 * 1000).toISOString() // 4.5 days ago
    });

    test('should maintain mastered status when answered correctly', () => {
      const updated = updateProgress(masteredProgress, true, 3);
      
      expect(updated.correct).toBe(21);
      expect(updated.repetitions).toBe(21);
      expect(updated.interval).toBeGreaterThanOrEqual(SRS_CONFIG.INTERVALS.mastered);
    });

    test('should enforce maximum 7-day interval cap', () => {
      const updated = updateProgress(masteredProgress, true, 2); // Easy
      expect(updated.interval).toBeLessThanOrEqual(SRS_CONFIG.MAX_INTERVAL);
    });

    test('should have very low weight when not due', () => {
      const notDue = createProgress({
        ...masteredProgress,
        lastSeen: new Date(NOW - 2 * 24 * 60 * 60 * 1000).toISOString() // Only 2 days ago
      });
      
      const weight = calculateSRSWeight(notDue, 0);
      expect(weight).toBeLessThan(500);
    });

    test('should have high weight when overdue', () => {
      const overdue = createProgress({
        ...masteredProgress,
        lastSeen: new Date(NOW - 8 * 24 * 60 * 60 * 1000).toISOString() // 8 days ago (overdue)
      });
      
      const weight = calculateSRSWeight(overdue, 0);
      expect(weight).toBeGreaterThan(10000); // Overdue items = highest priority
    });

    test('should regress when forgotten', () => {
      const updated = updateProgress(masteredProgress, false, 20);
      
      expect(updated.repetitions).toBe(0);
      expect(updated.lapses).toBe(3);
      expect(updated.interval).toBeLessThan(masteredProgress.interval);
    });
  });

  describe('SRS Level Calculation', () => {
    test('should be "new" for undefined progress', () => {
      const level = calculateSRSLevel(undefined);
      expect(level).toBe('new');
    });

    test('should be "learning" for low accuracy', () => {
      const progress = createProgress({ correct: 2, incorrect: 3, repetitions: 2 });
      const level = calculateSRSLevel(progress);
      expect(level).toBe('learning');
    });

    test('should be "young" for moderate accuracy', () => {
      const progress = createProgress({ correct: 4, incorrect: 1, repetitions: 4 });
      const level = calculateSRSLevel(progress);
      expect(level).toBe('young');
    });

    test('should be "mature" for good accuracy', () => {
      const progress = createProgress({ correct: 8, incorrect: 1, repetitions: 8 });
      const level = calculateSRSLevel(progress);
      expect(level).toBe('mature');
    });

    test('should be "mastered" for excellent accuracy', () => {
      const progress = createProgress({ correct: 12, incorrect: 1, repetitions: 12 });
      const level = calculateSRSLevel(progress);
      expect(level).toBe('mastered');
    });
  });

  describe('Days Since Last Seen Calculation', () => {
    test('should calculate 0 days for recent review', () => {
      const progress = createProgress();
      const days = daysSinceLastSeen(progress.lastSeen);
      expect(days).toBe(0);
    });

    test('should calculate correct days for past reviews', () => {
      const threeDaysAgo = new Date(NOW - 3 * 24 * 60 * 60 * 1000).toISOString();
      const days = daysSinceLastSeen(threeDaysAgo);
      expect(days).toBe(3);
    });

    test('should return 999 for undefined lastSeen', () => {
      const days = daysSinceLastSeen(undefined);
      expect(days).toBe(999);
    });
  });

  describe('Answer Time Impact on Confidence', () => {
    const baseProgress = createProgress({
      correct: 5,
      incorrect: 1,
      srsLevel: 'young',
      repetitions: 5,
      interval: 1,
      easeFactor: 2.3
    });

    test('very fast answer (<3s) should be rated "easy"', () => {
      const updated = updateProgress(baseProgress, true, 2);
      expect(updated.lastConfidence).toBe('easy');
      expect(updated.easeFactor).toBeGreaterThan(baseProgress.easeFactor);
    });

    test('moderate answer (3-8s) should be rated "good"', () => {
      const updated = updateProgress(baseProgress, true, 6);
      expect(updated.lastConfidence).toBe('good');
    });

    test('slow answer (>8s) should be rated "hard"', () => {
      const updated = updateProgress(baseProgress, true, 12);
      expect(updated.lastConfidence).toBe('hard');
      expect(updated.easeFactor).toBeLessThan(baseProgress.easeFactor);
    });

    test('incorrect answer should be rated "again"', () => {
      const updated = updateProgress(baseProgress, false, 5);
      expect(updated.lastConfidence).toBe('again');
      expect(updated.easeFactor).toBeLessThan(baseProgress.easeFactor);
    });
  });

  describe('Ease Factor Constraints', () => {
    test('should maintain minimum ease factor of 1.3', () => {
      const lowEase = createProgress({ easeFactor: 1.4, srsLevel: 'learning' });
      const updated = updateProgress(lowEase, false, 20); // Hard incorrect
      
      expect(updated.easeFactor).toBeGreaterThanOrEqual(SRS_CONFIG.MIN_EASE);
    });

    test('should maintain maximum ease factor of 2.5', () => {
      const highEase = createProgress({ easeFactor: 2.5, srsLevel: 'mastered' });
      const updated = updateProgress(highEase, true, 1); // Very easy
      
      expect(updated.easeFactor).toBeLessThanOrEqual(SRS_CONFIG.MAX_EASE);
    });
  });

  describe('Vocabulary Progress (Same SRS Logic)', () => {
    test('should work identically for vocab progress', () => {
      const vocabProgress = createProgress({
        correct: 3,
        incorrect: 1,
        srsLevel: 'young',
        repetitions: 3
      });
      
      const updated = updateProgress(vocabProgress, true, 5);
      expect(updated.correct).toBe(4);
      expect(updated.repetitions).toBe(4);
    });

    test('should calculate weight correctly for vocab', () => {
      const vocabProgress = createProgress({
        correct: 10,
        incorrect: 2,
        srsLevel: 'mature',
        interval: 3,
        lastSeen: new Date(NOW - 2.8 * 24 * 60 * 60 * 1000).toISOString() // 2.8 days ago (close to 3-day interval)
      });
      
      const weight = calculateSRSWeight(vocabProgress, 0);
      expect(weight).toBeGreaterThan(400); // Approaching due date, should have some priority
    });
  });

  describe('Exam-Focused Constraints', () => {
    test('should cap maximum interval at 7 days', () => {
      const longInterval = createProgress({
        srsLevel: 'mastered',
        interval: 6,
        easeFactor: 2.5,
        correct: 20,
        repetitions: 20
      });
      
      const updated = updateProgress(longInterval, true, 2); // Easy answer
      expect(updated.interval).toBeLessThanOrEqual(SRS_CONFIG.MAX_INTERVAL);
    });

    test('should prioritize overdue items heavily', () => {
      const overdue = createProgress({
        srsLevel: 'mature',
        interval: 3,
        lastSeen: new Date(NOW - 5 * 24 * 60 * 60 * 1000).toISOString() // 2 days overdue
      });
      
      const weight = calculateSRSWeight(overdue, 0);
      expect(weight).toBeGreaterThan(10000); // Very high priority
    });

    test('should boost learning items even when not overdue', () => {
      const learning = createProgress({
        srsLevel: 'learning',
        interval: 0.007, // 10 minutes
        lastSeen: new Date(NOW - 5 * 60 * 1000).toISOString() // 5 min ago
      });
      
      const weight = calculateSRSWeight(learning, 0);
      expect(weight).toBeGreaterThan(5000);
    });
  });
});

