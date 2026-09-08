import { z } from 'zod';

const entryFieldsSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  tag: z.string().min(1, 'Tag is required'),
});

export const createEntrySchema = entryFieldsSchema.extend({
  idempotencyKey: z.string().min(1, 'Idempotency key is required'),
});

export const updateEntrySchema = entryFieldsSchema.extend({
  id: z.number().int(),
});
