import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/lib/prisma', () => ({
  prisma: {
    entry: {
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  },
}));

vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}));

import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { createEntry, deleteEntry, updateEntry } from './actions';

function formData(fields: Record<string, string>) {
  const fd = new FormData();
  for (const [key, value] of Object.entries(fields)) {
    fd.append(key, value);
  }
  return fd;
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe('createEntry', () => {
  it('creates an entry with valid data and redirects to /entries', async () => {
    await createEntry(formData({ title: 'My entry', tag: 'personal' }));

    expect(prisma.entry.create).toHaveBeenCalledWith({
      data: { title: 'My entry', tag: 'personal' },
    });
    expect(redirect).toHaveBeenCalledWith('/entries');
  });

  it('throws without creating an entry when the title is missing', async () => {
    await expect(createEntry(formData({ title: '', tag: 'personal' }))).rejects.toThrow(
      'Title is required',
    );

    expect(prisma.entry.create).not.toHaveBeenCalled();
    expect(redirect).not.toHaveBeenCalled();
  });
});

describe('updateEntry', () => {
  it('updates an entry with valid data and redirects to /entries', async () => {
    await updateEntry(formData({ id: '5', title: 'Updated', tag: 'coding' }));

    expect(prisma.entry.update).toHaveBeenCalledWith({
      where: { id: 5 },
      data: { title: 'Updated', tag: 'coding' },
    });
    expect(redirect).toHaveBeenCalledWith('/entries');
  });

  it('throws without updating when the tag is missing', async () => {
    await expect(updateEntry(formData({ id: '5', title: 'Updated', tag: '' }))).rejects.toThrow(
      'Tag is required',
    );

    expect(prisma.entry.update).not.toHaveBeenCalled();
    expect(redirect).not.toHaveBeenCalled();
  });
});

describe('deleteEntry', () => {
  it('deletes an entry by id and redirects to /entries', async () => {
    await deleteEntry(7);

    expect(prisma.entry.delete).toHaveBeenCalledWith({ where: { id: 7 } });
    expect(redirect).toHaveBeenCalledWith('/entries');
  });

  it('throws without deleting when the id is not an integer', async () => {
    await expect(deleteEntry(NaN)).rejects.toThrow('Invalid entry ID');

    expect(prisma.entry.delete).not.toHaveBeenCalled();
    expect(redirect).not.toHaveBeenCalled();
  });
});
