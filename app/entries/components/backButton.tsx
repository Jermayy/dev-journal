'use client';
import { Button } from '@mantine/core';
import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();
  return (
    <Button type="button" variant="subtle" onClick={() => router.push('/entries')}>
      Back to Entries
    </Button>
  );
}
