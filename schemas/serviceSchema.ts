import { z } from 'zod';

export const serviceSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  duration: z.string().nonempty({ message: "Duration is required" }),
  price: z.string().nonempty({ message: "Price is required" }),
});

export type ServiceFormValues = z.infer<typeof serviceSchema>;
