import { z } from 'zod';

export const providerSchema = z.object({
  providers: z.array(
    z.object({
        name: z.string().min(2, { message: "Name must be at least 2 characters." }),
        maxCapacity:z.number()
    })
  ),
});

export type ProviderFormValues = z.infer<typeof providerSchema>;
