import { render as testingLibraryRender } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import type { ReactElement } from 'react';

export function render(ui: ReactElement) {
  return testingLibraryRender(ui, {
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <MantineProvider env="test">{children}</MantineProvider>
    ),
  });
}

export * from '@testing-library/react';
