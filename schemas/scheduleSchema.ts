import { z } from "zod";

export const scheduleSchema = z.array(
    z.object({
      day: z.string(),
      isActive: z.boolean(),
      workStart: z.string().regex(/^\d{2}:\d{2}$/),
      workEnd: z.string().regex(/^\d{2}:\d{2}$/),
      breaks: z.array(
        z.object({
          start: z.string().regex(/^\d{2}:\d{2}$/),
          end: z.string().regex(/^\d{2}:\d{2}$/),
        })
      ),
    })
  );

  export type scheduleFormValues = z.infer<typeof scheduleSchema>;
