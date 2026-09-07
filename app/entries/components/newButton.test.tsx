import { beforeEach, describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@/test/render';

const push = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push }),
}));

import NewButton from './newButton';

beforeEach(() => {
  push.mockClear();
});

describe('NewButton', () => {
  it('renders a "New Entry" button', () => {
    render(<NewButton />);
    expect(screen.getByRole('button', { name: 'New Entry' })).toBeInTheDocument();
  });

  it('navigates to /entries/new when clicked', async () => {
    render(<NewButton />);
    await userEvent.click(screen.getByRole('button', { name: 'New Entry' }));
    expect(push).toHaveBeenCalledWith('/entries/new');
  });
});
