'use client';
import { Button } from '@mantine/core';
import { useRouter } from 'next/navigation';

export default function NewButton() {
  const router = useRouter();
  return (
    <Button type="button" onClick={() => router.push('/entries/new')}>
      New Entry
    </Button>
  );
}
