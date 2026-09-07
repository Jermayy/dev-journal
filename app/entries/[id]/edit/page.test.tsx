import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@/test/render';

const { findUnique } = vi.hoisted(() => ({ findUnique: vi.fn() }));
vi.mock('@/lib/prisma', () => ({
  prisma: {
    entry: { findUnique, create: vi.fn(), update: vi.fn(), delete: vi.fn(), findMany: vi.fn() },
  },
}));

const { notFound } = vi.hoisted(() => ({ notFound: vi.fn() }));
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
  redirect: vi.fn(),
  notFound,
}));

import EditEntryPage from './page';

beforeEach(() => {
  findUnique.mockReset();
  notFound.mockClear();
});

describe('EditEntryPage', () => {
  it('renders the edit form pre-filled with the entry data', async () => {
    findUnique.mockResolvedValue({
      id: 4,
      title: 'My entry',
      tag: 'coding',
      createdAt: new Date(),
    });

    render(await EditEntryPage({ params: Promise.resolve({ id: '4' }) }));

    expect(screen.getByText('Editing My entry')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Edit Entry' })).toBeInTheDocument();
    expect(screen.getByDisplayValue('My entry')).toBeInTheDocument();
    expect(screen.getByDisplayValue('coding')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });

  it('calls notFound without querying the database when the id is not a valid integer', async () => {
    await EditEntryPage({ params: Promise.resolve({ id: 'not-a-number' }) });

    expect(notFound).toHaveBeenCalledOnce();
    expect(findUnique).not.toHaveBeenCalled();
  });

  it('calls notFound when no entry exists for the given id', async () => {
    findUnique.mockResolvedValue(null);

    await EditEntryPage({ params: Promise.resolve({ id: '999' }) });

    expect(notFound).toHaveBeenCalledOnce();
  });
});
