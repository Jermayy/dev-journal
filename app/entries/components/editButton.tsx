'use client';
import { Button } from '@mantine/core';
import { useRouter } from 'next/navigation';

export default function EditButton({ entryId }: { entryId: number }) {
  const router = useRouter();
  return (
    <Button
      type="button"
      variant="light"
      onClick={() => router.push(`/entries/${entryId}/edit`)}
    >
      Edit
    </Button>
  );
}
