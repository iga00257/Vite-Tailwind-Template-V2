import { random } from '../number';
import { describe, test, expect, vi } from 'vitest';

describe('random utility function', () => {
  // Basic functionality tests
  test('returns a number', () => {
    const result = random();
    expect(typeof result).toBe('number');
  });

  test('returns an integer', () => {
    const result = random();
    expect(Number.isInteger(result)).toBe(true);
  });

  test('returns a number within default range when no params provided', () => {
    const defaultMin = 10000;
    const defaultMax = 10000 * 10000;

    // Run multiple tests to account for randomness
    for (let i = 0; i < 100; i++) {
      const result = random();
      expect(result).toBeGreaterThanOrEqual(defaultMin);
      expect(result).toBeLessThanOrEqual(defaultMax);
    }
  });

  // Test with custom ranges
  test('returns a number within provided range', () => {
    const testCases = [
      { min: 5, max: 10 },
      { min: 100, max: 200 },
      { min: -10, max: 10 },
      { min: -100, max: -50 },
      { min: 0, max: 1 },
      { min: 999999, max: 1000000 },
    ];

    testCases.forEach(({ min, max }) => {
      // Run multiple tests for each range
      for (let i = 0; i < 20; i++) {
        const result = random(min, max);
        expect(result).toBeGreaterThanOrEqual(min);
        expect(result).toBeLessThanOrEqual(max);
      }
    });
  });

  // Edge cases
  test('handles equal min and max values', () => {
    const values = [0, 42, -42, 999999, -999999];

    values.forEach((value) => {
      const result = random(value, value);
      expect(result).toBe(value);
    });
  });

  // Implementation-specific behavior tests
  test('uses parseInt to convert floating point to integer', () => {
    // Mock Math.random to return a fixed value
    const originalRandom = Math.random;
    Math.random = vi.fn().mockReturnValue(0.5);

    const min = 10;
    const max = 20;
    const expected = parseInt((0.5 * (max - min) + min).toString(), 10);

    const result = random(min, max);
    expect(result).toBe(expected);

    // Restore original Math.random
    Math.random = originalRandom;
  });
});
