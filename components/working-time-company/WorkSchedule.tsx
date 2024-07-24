import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import DayCard from "./DayCard";
import { toast } from "@/components/ui/use-toast";
import { DaySchedule, Break } from "./types";

const FormSchema = z.object({
  schedule: z.array(
    z.object({
      day: z.string(),
      persianDay: z.string(),
      isActive: z.boolean(),
      workStart: z.string().optional(),
      workEnd: z.string().optional(),
      breaks: z.array(
        z.object({
          start: z.string().optional(),
          end: z.string().optional(),
        })
      ).optional(),
    })
  ),
});

const initialSchedule: DaySchedule[] = [
  {
    day: "Monday",
    persianDay: "??????",
    isActive: true,
    workStart: "07:00",
    workEnd: "14:00",
    breaks: [],
  },
  {
    day: "Tuesday",
    persianDay: "???????",
    isActive: true,
    workStart: "07:00",
    workEnd: "14:00",
    breaks: [],
  },
  {
    day: "Wednesday",
    persianDay: "????????",
    isActive: true,
    workStart: "07:00",
    workEnd: "14:00",
    breaks: [],
  },
  {
    day: "Thursday",
    persianDay: "????????",
    isActive: true,
    workStart: "07:00",
    workEnd: "14:00",
    breaks: [],
  },
  {
    day: "Saturday",
    persianDay: "????",
    isActive: true,
    workStart: "07:00",
    workEnd: "14:00",
    breaks: [],
  },
  {
    day: "Sunday",
    persianDay: "???????",
    isActive: true,
    workStart: "07:00",
    workEnd: "14:00",
    breaks: [],
  },
  {
    day: "Friday",
    persianDay: "????",
    isActive: false,
    workStart: "",
    workEnd: "",
    breaks: [],
  },
];

const filterTimeOptions = (
  currentBreaks: Break[],
  workStart: string,
  workEnd: string,
  isStart: boolean,
  excludeIndex: number
): string[] => {
  const allTimes = generateTimeOptions();
  const workStartIndex = allTimes.indexOf(workStart);
  const workEndIndex = allTimes.indexOf(workEnd);
  let filteredTimes = allTimes.slice(workStartIndex, workEndIndex + 1);

  currentBreaks.forEach((b, index) => {
    if (index !== excludeIndex) {
      const breakStartIndex = allTimes.indexOf(b.start);
      const breakEndIndex = allTimes.indexOf(b.end);

      if (isStart) {
        // Remove times that are within the range of an existing break
        filteredTimes = filteredTimes.filter(
          time => allTimes.indexOf(time) < breakStartIndex || allTimes.indexOf(time) > breakEndIndex
        );
      } else {
        // Remove times that are within the range of an existing break, plus the start time
        filteredTimes = filteredTimes.filter(
          time => allTimes.indexOf(time) <= breakStartIndex || allTimes.indexOf(time) > breakEndIndex
        );
        filteredTimes.shift()
        filteredTimes.shift()

      }
    }
  });

  return filteredTimes;
};

const generateTimeOptions = (): string[] => {
  const times = [];
  for (let i = 0; i < 24; i++) {
    for (let j = 0; j < 60; j += 5) { // Generates time options in 5-minute intervals
      const hour = i.toString().padStart(2, '0');
      const minute = j.toString().padStart(2, '0');
      times.push(`${hour}:${minute}`);
    }
  }
  return times;
};

export function WorkSchedule() {
  const [schedule, setSchedule] = useState<DaySchedule[]>(initialSchedule);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { schedule },
  });

  useMemo(() => {
    form.reset({ schedule }); // Reset the form whenever the schedule state changes
  }, [schedule, form]);

  const handleToggle = useCallback((index: number) => {
    const newSchedule = [...schedule];
    newSchedule[index].isActive = !newSchedule[index].isActive;
    setSchedule(newSchedule);
  },[schedule])

  const handleWorkTimeChange = useCallback((
    index: number,
    field: "workStart" | "workEnd",
    value: string
  ) => {
    const newSchedule = [...schedule];
    newSchedule[index][field] = value;
    setSchedule(newSchedule);
  },[schedule])

  const handleBreakChange = useCallback((
    dayIndex: number,
    breakIndex: number,
    field: "start" | "end",
    value: string
  ) => {
    const newSchedule = [...schedule];
    newSchedule[dayIndex].breaks[breakIndex][field] = value;
    setSchedule(newSchedule);
  },[schedule])

  const addBreak = useCallback((index: number) => {
    const newSchedule = [...schedule];
    newSchedule[index].breaks.push({ start: "", end: "" });
    setSchedule(newSchedule);
  },[schedule])

  // const addBreak = useCallback((index: number) => {
  //   setSchedule(prev => {
  //     const newSchedule = [...prev];
  //     const day = newSchedule[index];
  //     const availableTimes = filterTimeOptions(day.breaks, day.workStart || "", day.workEnd || "", true, -1);
  //     if (availableTimes.length > 1) {
  //       day.breaks.push({ start: availableTimes[0], end: availableTimes[1] });
  //     } else {
  //       toast({ title: "No available time slots", description: "There are no available time slots to add a break." });
  //     }
  //     return newSchedule;
  //   });
  // },[])

  const removeBreak = useCallback((dayIndex: number, breakIndex: number) => {
    const newSchedule = [...schedule];
    newSchedule[dayIndex].breaks.splice(breakIndex, 1);
    setSchedule(newSchedule);
  },[schedule])

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log("Form Data:", data);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2  w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 space-x-2">
      {schedule.map((day, index) => (
        <DayCard
          key={index}
          day={day}
          dayIndex={index}
          handleToggle={handleToggle}
          handleWorkTimeChange={handleWorkTimeChange}
          handleBreakChange={handleBreakChange}
          removeBreak={removeBreak}
          addBreak={addBreak}
          filterTimeOptions={filterTimeOptions}
          generateTimeOptions={generateTimeOptions}
        />
      ))}
      <div className="flex justify-end">
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}
