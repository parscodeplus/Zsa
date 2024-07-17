import { z } from 'zod';

export const serviceSchema = z.object({
  services: z.array(
    z.object({
      name: z.string().min(2, { message: "Name must be at least 2 characters." }),
      duration: z.string({ message: "Duration is required" }),
      price: z.string({ message: "Price is required" }),
      //description: z.string().optional(),
      //image: z.string().optional(),
      //isOnMainPage: z.boolean().optional(),
      //salesTax: z.number().positive().optional(),
      //directLink: z.string().optional(),
      //maxBookingPerSlot: z.number().optional(),
      //categoryId: z.number().optional(),
     // providerId: z.string().optional(),
    })
  ),
});

export type ServiceFormValues = z.infer<typeof serviceSchema>;
