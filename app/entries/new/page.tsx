import { createEntry } from '@/app/entries/actions';
import BackButton from '@/app/entries/components/backButton';
import SubmitButton from '@/app/entries/components/submitButton';
import { Container, Stack, TextInput, Title } from '@mantine/core';

export default function NewEntryPage() {
  return (
    <Container size="sm" py="xl">
      <BackButton />
      <Title order={1} mt="md" mb="lg">
        New Entry
      </Title>
      <form action={createEntry}>
        <Stack gap="md" align="flex-start">
          <TextInput name="title" label="Title" placeholder="Title" required w="100%" />
          <TextInput name="tag" label="Tag" placeholder="Tag" required w="100%" />
          <SubmitButton>Create Entry</SubmitButton>
        </Stack>
      </form>
    </Container>
  );
}
