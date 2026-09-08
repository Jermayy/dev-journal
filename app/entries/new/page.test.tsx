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

  it('renders the idempotency key with a value in the initial markup, not just after an effect', () => {
    // Regression test: the key must be generated during the server render
    // (not in a useEffect after hydration) so a submission that lands before
    // JS runs — or with JS disabled entirely — still carries a valid key.
    const { container } = render(<NewEntryPage />);
    const input = container.querySelector('input[name="idempotencyKey"]') as HTMLInputElement;

    expect(input).not.toBeNull();
    expect(input.value).not.toBe('');
  });

  it('generates a different idempotency key on each render', () => {
    const first = render(<NewEntryPage />);
    const firstValue = (
      first.container.querySelector('input[name="idempotencyKey"]') as HTMLInputElement
    ).value;
    first.unmount();

    const second = render(<NewEntryPage />);
    const secondValue = (
      second.container.querySelector('input[name="idempotencyKey"]') as HTMLInputElement
    ).value;

    expect(secondValue).not.toBe(firstValue);
  });
});
