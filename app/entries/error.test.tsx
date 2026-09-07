import { describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@/test/render';
import EntriesError from './error';

describe('EntriesError', () => {
  it('renders the error title and message', () => {
    render(<EntriesError error={new Error('Database connection failed')} reset={vi.fn()} />);

    expect(screen.getByText('Something went wrong!')).toBeInTheDocument();
    expect(screen.getByText('Database connection failed')).toBeInTheDocument();
  });

  it('calls reset when "Try again" is clicked', async () => {
    const reset = vi.fn();
    render(<EntriesError error={new Error('Oops')} reset={reset} />);

    await userEvent.click(screen.getByRole('button', { name: 'Try again' }));

    expect(reset).toHaveBeenCalledOnce();
  });
});
