'use client';
import { Button } from '@mantine/core';
import { deleteEntry } from '@/app/entries/actions';
import { useTransition } from 'react';

export default function DeleteButton({ entryId }: { entryId: number }) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      type="button"
      color="red"
      variant="light"
      loading={isPending}
      onClick={() => startTransition(() => deleteEntry(entryId))}
    >
      Delete
    </Button>
  );
}
