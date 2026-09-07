import { beforeEach, describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@/test/render';

const push = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push }),
}));

import EditButton from './editButton';

beforeEach(() => {
  push.mockClear();
});

describe('EditButton', () => {
  it('renders an "Edit" button', () => {
    render(<EditButton entryId={3} />);
    expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument();
  });

  it('navigates to the edit page for the given entry id when clicked', async () => {
    render(<EditButton entryId={3} />);
    await userEvent.click(screen.getByRole('button', { name: 'Edit' }));
    expect(push).toHaveBeenCalledWith('/entries/3/edit');
  });
});
