import { describe, expect, it } from 'vitest';
import { createEntrySchema, updateEntrySchema } from './entry';

describe('createEntrySchema', () => {
  it('accepts valid title and tag', () => {
    const result = createEntrySchema.safeParse({ title: 'My entry', tag: 'personal' });
    expect(result.success).toBe(true);
  });

  it('rejects an empty title', () => {
    const result = createEntrySchema.safeParse({ title: '', tag: 'personal' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Title is required');
    }
  });

  it('rejects an empty tag', () => {
    const result = createEntrySchema.safeParse({ title: 'My entry', tag: '' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Tag is required');
    }
  });

  it('rejects missing fields', () => {
    const result = createEntrySchema.safeParse({});
    expect(result.success).toBe(false);
  });
});

describe('updateEntrySchema', () => {
  it('accepts a valid id, title, and tag', () => {
    const result = updateEntrySchema.safeParse({ id: 1, title: 'My entry', tag: 'personal' });
    expect(result.success).toBe(true);
  });

  it('rejects a non-integer id', () => {
    const result = updateEntrySchema.safeParse({ id: 1.5, title: 'My entry', tag: 'personal' });
    expect(result.success).toBe(false);
  });

  it('rejects a missing id', () => {
    const result = updateEntrySchema.safeParse({ title: 'My entry', tag: 'personal' });
    expect(result.success).toBe(false);
  });
});
