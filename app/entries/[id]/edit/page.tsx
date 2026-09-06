import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { updateEntry } from '@/app/entries/actions';
import BackButton from '@/app/entries/components/backButton';
import SubmitButton from '@/app/entries/components/submitButton';
import { Container, Stack, Text, TextInput, Title } from '@mantine/core';

export default async function EditEntryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const entryId = Number(id);

  if (!Number.isInteger(entryId)) {
    return notFound();
  }

  const entry = await prisma.entry.findUnique({
    where: { id: entryId },
  });

  if (!entry) {
    return notFound();
  }

  return (
    <Container size="sm" py="xl">
      <BackButton />
      <Text c="dimmed" mt="md">
        Editing {entry.title}
      </Text>

      <form action={updateEntry}>
        <input type="hidden" name="id" value={entry.id} />
        <Title order={1} mt="xs" mb="lg">
          Edit Entry
        </Title>

        <Stack gap="md" align="flex-start">
          <TextInput
            name="title"
            label="Title"
            defaultValue={entry.title}
            placeholder="Title"
            required
            w="100%"
          />
          <TextInput
            name="tag"
            label="Tag"
            defaultValue={entry.tag}
            placeholder="Tag"
            required
            w="100%"
          />
          <SubmitButton>Save</SubmitButton>
        </Stack>
      </form>
    </Container>
  );
}
