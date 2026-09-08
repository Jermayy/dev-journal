import { describe, expect, it, vi } from 'vitest';
import { render } from '@/test/render';
import IdempotencyKeyField from './idempotencyKeyField';

describe('IdempotencyKeyField', () => {
  it('renders a hidden input populated with a generated key after mount', async () => {
    const { container } = render(<IdempotencyKeyField />);
    const input = container.querySelector('input[name="idempotencyKey"]') as HTMLInputElement;

    expect(input).not.toBeNull();
    expect(input.type).toBe('hidden');
    await vi.waitFor(() => expect(input.value).not.toBe(''));
  });

  it('keeps the same key across re-renders', async () => {
    const { container, rerender } = render(<IdempotencyKeyField />);
    const getValue = () =>
      (container.querySelector('input[name="idempotencyKey"]') as HTMLInputElement).value;

    await vi.waitFor(() => expect(getValue()).not.toBe(''));
    const firstValue = getValue();

    rerender(<IdempotencyKeyField />);
    expect(getValue()).toBe(firstValue);
  });
});
