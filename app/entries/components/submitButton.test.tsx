import { act } from 'react';
import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@/test/render';
import SubmitButton from './submitButton';

function Wrapper({ action }: { action: (formData: FormData) => void | Promise<void> }) {
  return (
    <form action={action}>
      <SubmitButton>Save</SubmitButton>
    </form>
  );
}

describe('SubmitButton', () => {
  it('renders the children text and is not disabled initially', () => {
    render(<Wrapper action={() => {}} />);
    const button = screen.getByRole('button', { name: 'Save' });
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });

  it('disables the button while the form action is pending, then re-enables it', async () => {
    let resolveAction: () => void = () => {};
    const action = () =>
      new Promise<void>((resolve) => {
        resolveAction = resolve;
      });

    render(<Wrapper action={action} />);
    const button = screen.getByRole('button', { name: 'Save' });

    await act(async () => {
      fireEvent.click(button);
    });
    expect(button).toBeDisabled();

    await act(async () => {
      resolveAction();
    });
    await waitFor(() => expect(button).not.toBeDisabled());
  });
});
