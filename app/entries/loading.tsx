import { Container, Group, Skeleton, Stack } from '@mantine/core';

export default function EntriesLoading() {
  return (
    <Container size="sm" py="xl">
      <Skeleton height={32} width={180} mb="md" />
      <Skeleton height={36} width={120} mb="xl" />

      <Stack gap="lg">
        {Array.from({ length: 4 }).map((_, i) => (
          <Stack key={i} gap="xs">
            <Skeleton height={20} width="60%" />
            <Skeleton height={16} width={100} />
            <Skeleton height={12} width={140} />
            <Group gap="xs">
              <Skeleton height={32} width={70} />
              <Skeleton height={32} width={70} />
            </Group>
          </Stack>
        ))}
      </Stack>
    </Container>
  );
}
