'use client';
import { Alert, Button, Container, Stack } from '@mantine/core';

export default function EntriesError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <Container size="sm" py="xl">
      <Alert color="red" title="Something went wrong!">
        <Stack gap="sm" align="flex-start">
          <p>{error.message}</p>
          <Button onClick={reset}>Try again</Button>
        </Stack>
      </Alert>
    </Container>
  );
}
