import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@/test/render';

vi.mock('@/lib/prisma', () => ({
  prisma: {
    entry: { create: vi.fn(), update: vi.fn(), delete: vi.fn(), findMany: vi.fn(), findUnique: vi.fn() },
  },
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
  redirect: vi.fn(),
}));

import NewEntryPage from './page';

describe('NewEntryPage', () => {
  it('renders the heading, inputs, and submit button', () => {
    render(<NewEntryPage />);

    expect(screen.getByRole('heading', { name: 'New Entry' })).toBeInTheDocument();
    expect(screen.getByLabelText('Title', { exact: false })).toBeInTheDocument();
    expect(screen.getByLabelText('Tag', { exact: false })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Create Entry' })).toBeInTheDocument();
  });

  it('marks the title and tag inputs as required', () => {
    render(<NewEntryPage />);

    expect(screen.getByLabelText('Title', { exact: false })).toBeRequired();
    expect(screen.getByLabelText('Tag', { exact: false })).toBeRequired();
  });
});
