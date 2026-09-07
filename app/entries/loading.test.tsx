import { describe, expect, it } from 'vitest';
import { render } from '@/test/render';
import EntriesLoading from './loading';

describe('EntriesLoading', () => {
  it('renders a set of skeleton placeholders', () => {
    const { container } = render(<EntriesLoading />);

    const skeletons = container.querySelectorAll('[class*="Skeleton"]');
    expect(skeletons.length).toBeGreaterThan(0);
  });
});
