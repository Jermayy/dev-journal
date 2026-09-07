import { beforeEach, describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@/test/render';

const push = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push }),
}));

import BackButton from './backButton';

beforeEach(() => {
  push.mockClear();
});

describe('BackButton', () => {
  it('renders a link back to the entries list', () => {
    render(<BackButton />);
    expect(screen.getByRole('button', { name: 'Back to Entries' })).toBeInTheDocument();
  });

  it('navigates to /entries when clicked', async () => {
    render(<BackButton />);
    await userEvent.click(screen.getByRole('button', { name: 'Back to Entries' }));
    expect(push).toHaveBeenCalledWith('/entries');
  });
});
