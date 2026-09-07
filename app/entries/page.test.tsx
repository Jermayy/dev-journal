import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@/test/render';

const { findMany } = vi.hoisted(() => ({ findMany: vi.fn() }));
vi.mock('@/lib/prisma', () => ({
  prisma: {
    entry: { findMany, create: vi.fn(), update: vi.fn(), delete: vi.fn(), findUnique: vi.fn() },
  },
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
  redirect: vi.fn(),
}));

import EntriesPage from './page';

beforeEach(() => {
  findMany.mockReset();
});

describe('EntriesPage', () => {
  it('shows an empty state when there are no entries', async () => {
    findMany.mockResolvedValue([]);
    render(await EntriesPage());
    expect(screen.getByText('No entries yet.')).toBeInTheDocument();
  });

  it('renders a card for each entry with its title, tag, and action buttons', async () => {
    findMany.mockResolvedValue([
      {
        id: 1,
        title: 'First entry',
        tag: 'personal',
        createdAt: new Date('2026-03-05T12:00:00Z'),
      },
      {
        id: 2,
        title: 'Second entry',
        tag: 'coding',
        createdAt: new Date('2026-03-06T12:00:00Z'),
      },
    ]);

    render(await EntriesPage());

    expect(screen.getByText('First entry')).toBeInTheDocument();
    expect(screen.getByText('Second entry')).toBeInTheDocument();
    expect(screen.getByText('personal')).toBeInTheDocument();
    expect(screen.getByText('coding')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Edit' })).toHaveLength(2);
    expect(screen.getAllByRole('button', { name: 'Delete' })).toHaveLength(2);
  });
});
