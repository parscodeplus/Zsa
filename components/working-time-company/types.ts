// types.ts
export interface Break {
  start: string;
  end: string;
}

export interface DaySchedule {
  day: string;
  persianDay: string;
  isActive: boolean;
  workStart?: string;
  workEnd?: string;
  breaks: Break[];
}

// scheduleSchema.ts
import { z } from 'zod';

export const scheduleSchema = z.object({
  days: z.array(
    z.object({
      day: z.string(),
      isActive: z.boolean(),
      workStart: z.string(),
      workEnd: z.string(),
      breaks: z.array(
        z.object({
          start: z.string(),
          end: z.string(),
        })
      ),
    })
  ),
});

export type scheduleFormValues = z.infer<typeof scheduleSchema>;
