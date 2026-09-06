export const dynamic = 'force-dynamic';

import { prisma } from '@/lib/prisma';
import { formatDate } from '@/lib/utils/formatDate';
import type { Entry } from '@prisma/client';
import { Badge, Card, Container, Group, Stack, Text, Title } from '@mantine/core';
import EditButton from './components/editButton';
import DeleteButton from './components/deleteButton';
import NewButton from './components/newButton';

export default async function EntriesPage() {
  const entries: Entry[] = await prisma.entry.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <Container size="sm" py="xl">
      <Group justify="space-between" mb="lg">
        <Title order={1}>Dev Journal</Title>
        <NewButton />
      </Group>

      {entries.length === 0 ? (
        <Text c="dimmed">No entries yet.</Text>
      ) : (
        <Stack gap="md">
          {entries.map((entry) => (
            <Card key={entry.id} withBorder padding="lg" radius="md">
              <Stack gap={4} mb="sm">
                <Title order={3}>{entry.title}</Title>
                <Group gap="xs">
                  <Badge variant="light">{entry.tag}</Badge>
                  <Text size="xs" c="dimmed">
                    {formatDate(entry.createdAt)}
                  </Text>
                </Group>
              </Stack>
              <Group gap="xs">
                <EditButton entryId={entry.id} />
                <DeleteButton entryId={entry.id} />
              </Group>
            </Card>
          ))}
        </Stack>
      )}
    </Container>
  );
}
