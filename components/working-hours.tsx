'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Switch } from './ui/switch';
import { Checkbox } from './ui/checkbox';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Trash2Icon } from 'lucide-react';
import { Button } from './ui/button';

interface Break {
  start: string;
  end: string;
}

interface DaySchedule {
  day: string;
  isActive: boolean;
  workStart: string;
  workEnd: string;
  breaks: Break[];
}

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const initialSchedule: DaySchedule[] = daysOfWeek.map((day) => ({
  day,
  isActive: day === 'Mon' || day === 'Tue' || day === 'Thu', // Example active days
  workStart: '09:00',
  workEnd: '18:00',
  breaks:
    day === 'Mon'
      ? [
          { start: '13:00', end: '14:00' },
          { start: '15:30', end: '16:00' },
        ]
      : [],
}));

const generateTimeOptions = () => {
  const times = [];
  let currentTime = new Date('1970-01-01T00:00:00');
  while (currentTime.getDate() === 1) {
    times.push(currentTime.toTimeString().substring(0, 5));
    currentTime.setMinutes(currentTime.getMinutes() + 5);
  }
  return times;
};

const WorkSchedule: React.FC = () => {
  const [schedule, setSchedule] = useState<DaySchedule[]>(initialSchedule);

  const isValidTimeRange = (start: string, end: string) => {
    return start < end;
  };

  const isValidBreak = (
    breaks: Break[],
    newBreak: Break,
    workStart: string,
    workEnd: string,
  ) => {
    return (
      newBreak.start >= workStart &&
      newBreak.end <= workEnd &&
      breaks.every(
        (b) =>
          (newBreak.start >= b.end && newBreak.end >= b.end) ||
          (newBreak.start <= b.start && newBreak.end <= b.start),
      )
    );
  };

  const filterTimeOptions = (
    currentBreaks: Break[],
    workStart: string,
    workEnd: string,
    isStart: boolean,
  ) => {
    return generateTimeOptions().filter((time) => {
      if (time < workStart || time > workEnd) return false;
      return currentBreaks.every((b) =>
        isStart
          ? time < b.start || time >= b.end
          : time > b.start || time <= b.end,
      );
    });
  };

  const handleToggle = (index: number) => {
    const newSchedule = [...schedule];
    newSchedule[index].isActive = !newSchedule[index].isActive;
    setSchedule(newSchedule);
  };

  const handleWorkTimeChange = (
    index: number,
    field: 'workStart' | 'workEnd',
    value: string,
  ) => {
    const newSchedule = [...schedule];
    const updatedDaySchedule = { ...newSchedule[index], [field]: value };

    if (
      isValidTimeRange(updatedDaySchedule.workStart, updatedDaySchedule.workEnd)
    ) {
      newSchedule[index] = updatedDaySchedule;

      // Ensure existing breaks are within the updated working hours
      newSchedule[index].breaks = newSchedule[index].breaks.filter(
        (b) =>
          b.start >= updatedDaySchedule.workStart &&
          b.end <= updatedDaySchedule.workEnd,
      );

      setSchedule(newSchedule);
    } else {
      alert('The start time must be earlier than the end time.');
    }
  };

  const handleBreakChange = (
    dayIndex: number,
    breakIndex: number,
    field: 'start' | 'end',
    value: string,
  ) => {
    const newSchedule = [...schedule];
    const newBreak = {
      ...newSchedule[dayIndex].breaks[breakIndex],
      [field]: value,
    };

    if (
      isValidTimeRange(newBreak.start, newBreak.end) &&
      isValidBreak(
        newSchedule[dayIndex].breaks.filter((_, i) => i !== breakIndex),
        newBreak,
        newSchedule[dayIndex].workStart,
        newSchedule[dayIndex].workEnd,
      )
    ) {
      newSchedule[dayIndex].breaks[breakIndex] = newBreak;
      setSchedule(newSchedule);
    } else {
      alert(
        'Invalid break time or overlapping with another break, or not within working hours.',
      );
    }
  };

  const addBreak = (index: number) => {
    const newSchedule = [...schedule];
    const newBreak = { start: '', end: '' };
    newSchedule[index].breaks.push(newBreak);
    setSchedule(newSchedule);
  };

  const removeBreak = (dayIndex: number, breakIndex: number) => {
    const newSchedule = [...schedule];
    newSchedule[dayIndex].breaks.splice(breakIndex, 1);
    setSchedule(newSchedule);
  };

  return (
    <div className='container mx-auto p-4'>
      {schedule.map((day, dayIndex) => (
        <motion.div
          key={day.day}
          className='mb-6 rounded-lg border bg-white p-4 shadow-md'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className='flex items-center justify-between'>
            <label className='font-semibold'>{day.day}</label>
            <Checkbox
              checked={day.isActive}
              onCheckedChange={() => handleToggle(dayIndex)}
            />
          </div>
          <AnimatePresence>
            {day.isActive && (
              <motion.div
                className='mt-4'
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className='mb-4'>
                  <label className='mb-2 block font-medium'>
                    Working hours
                  </label>
                  <div className='flex items-center space-x-2'>
                    <Select
                      defaultValue={day.workStart}
                      onValueChange={(value: string) =>
                        handleWorkTimeChange(dayIndex, 'workStart', value)
                      }
                    >
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder='Select time' />
                      </SelectTrigger>
                      <SelectContent>
                        {generateTimeOptions().map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <span className='px-1'>-</span>
                    <Select
                      defaultValue={day.workEnd}
                      onValueChange={(value: string) =>
                        handleWorkTimeChange(dayIndex, 'workEnd', value)
                      }
                    >
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder='Select time' />
                      </SelectTrigger>
                      <SelectContent>
                        {generateTimeOptions().map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                {day.breaks.map((b, breakIndex) => (
                  <motion.div
                    key={breakIndex}
                    className='mb-4 rounded-lg bg-gray-100 py-2 pl-4 pr-2'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label className='mb-2 block font-medium'>Breaks</label>
                    <div className='flex items-center space-x-2'>
                      <Select
                        defaultValue={b.start}
                        onValueChange={(value: string) =>
                          handleBreakChange(
                            dayIndex,
                            breakIndex,
                            'start',
                            value,
                          )
                        }
                      >
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder='Select time' />
                        </SelectTrigger>
                        <SelectContent>
                          {filterTimeOptions(
                            day.breaks,
                            day.workStart,
                            day.workEnd,
                            true,
                          ).map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <span>-</span>
                      <Select
                        defaultValue={b.end}
                        onValueChange={(value: string) =>
                          handleBreakChange(dayIndex, breakIndex, 'end', value)
                        }
                      >
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder='Select time' />
                        </SelectTrigger>
                        <SelectContent>
                          {filterTimeOptions(
                            day.breaks,
                            day.workStart,
                            day.workEnd,
                            false,
                          ).map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    
                        <Trash2Icon className='h-8 w-[68px]  text-red-600'                         onClick={() => removeBreak(dayIndex, breakIndex)}
                        />
                    </div>
                  </motion.div>
                ))}

                <Button
                variant={'ghost'}
                  onClick={() => addBreak(dayIndex)}
                  // className='rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'
                >
                  Add break
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};

export default WorkSchedule;
