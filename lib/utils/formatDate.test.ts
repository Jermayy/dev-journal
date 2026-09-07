import { describe, expect, it } from 'vitest';
import { formatDate } from './formatDate';

describe('formatDate', () => {
  it('formats a date as "D MMM YYYY" in en-AU style', () => {
    const date = new Date('2026-03-05T12:00:00Z');
    expect(formatDate(date)).toBe('5 Mar 2026');
  });

  it('formats a different date correctly', () => {
    const date = new Date('2026-12-25T12:00:00Z');
    expect(formatDate(date)).toBe('25 Dec 2026');
  });
});
