import { act } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { fireEvent, render, screen, waitFor } from '@/test/render';

const { deleteEntry } = vi.hoisted(() => ({ deleteEntry: vi.fn() }));
vi.mock('@/app/entries/actions', () => ({ deleteEntry }));

import DeleteButton from './deleteButton';

beforeEach(() => {
  deleteEntry.mockClear();
});

describe('DeleteButton', () => {
  it('renders a "Delete" button', () => {
    deleteEntry.mockResolvedValue(undefined);
    render(<DeleteButton entryId={1} />);
    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument();
  });

  it('calls deleteEntry with the entry id when clicked', async () => {
    deleteEntry.mockResolvedValue(undefined);
    render(<DeleteButton entryId={9} />);

    await userEvent.click(screen.getByRole('button', { name: 'Delete' }));

    expect(deleteEntry).toHaveBeenCalledWith(9);
  });

  it('disables the button while the delete is pending, then re-enables it', async () => {
    let resolveDelete: () => void = () => {};
    deleteEntry.mockImplementation(
      () =>
        new Promise<void>((resolve) => {
          resolveDelete = resolve;
        }),
    );

    render(<DeleteButton entryId={9} />);
    const button = screen.getByRole('button', { name: 'Delete' });

    await act(async () => {
      fireEvent.click(button);
    });
    expect(button).toBeDisabled();

    await act(async () => {
      resolveDelete();
    });
    await waitFor(() => expect(button).not.toBeDisabled());
  });
});
