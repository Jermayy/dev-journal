'use server';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { Prisma } from '@prisma/client';
import { createEntrySchema, updateEntrySchema } from '@/lib/validation/entry';

// The @prisma/adapter-pg driver adapter doesn't populate `error.meta.target`
// for unique-constraint violations, so the constraint name in the message is
// the only reliable signal; `target` is checked too in case that changes.
const IDEMPOTENCY_KEY_CONSTRAINT = 'Entry_idempotencyKey_key';

function isDuplicateIdempotencyKey(error: unknown) {
  if (!(error instanceof Prisma.PrismaClientKnownRequestError) || error.code !== 'P2002') {
    return false;
  }

  const target = error.meta?.target;
  if (Array.isArray(target) && target.includes('idempotencyKey')) {
    return true;
  }

  return error.message.includes(IDEMPOTENCY_KEY_CONSTRAINT);
}

function formDataToObject(formData: FormData) {
  return Object.fromEntries(formData.entries());
}

export async function createEntry(formData: FormData) {
  'use server';

  const parsedData = createEntrySchema.safeParse(formDataToObject(formData));

  if (!parsedData.success) {
    throw new Error(parsedData.error.issues[0].message);
  }

  try {
    await prisma.entry.create({
      data: parsedData.data,
    });
  } catch (error) {
    // A retried or double-submitted request reuses the same idempotency key;
    // treat the resulting unique-constraint violation as a successful no-op.
    if (!isDuplicateIdempotencyKey(error)) {
      throw error;
    }
  }

  redirect('/entries'); // after creation, go back to entries list
}

export async function updateEntry(formData: FormData) {
  'use server';

  const rawData = formDataToObject(formData);
  const parsedData = updateEntrySchema.safeParse({
    ...rawData,
    id: Number(rawData.id),
  });

  if (!parsedData.success) {
    throw new Error(parsedData.error.issues[0].message);
  }

  const { id, ...data } = parsedData.data;

  await prisma.entry.update({
    where: { id: id },
    data,
  });

  redirect('/entries');
}

export async function deleteEntry(entryId: number) {
  if (!Number.isInteger(entryId)) throw new Error('Invalid entry ID');

  await prisma.entry.delete({
    where: { id: entryId },
  });

  redirect('/entries');
}
