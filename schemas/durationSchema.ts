import { z } from 'zod';

export const durationSchema = z.object({
  title: z.string().min(2, { message: "Name must be at least 2 characters." }),
});