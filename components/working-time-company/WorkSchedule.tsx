'use client'
import React, { useState } from 'react';
import DayCard from './DayCard';
import { DaySchedule, Break } from './types';
import { Card } from '../ui/card';

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
  const times: string[] = [];
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
        <DayCard
          key={day.day}
          day={day}
          dayIndex={dayIndex}
          handleToggle={handleToggle}
          handleWorkTimeChange={handleWorkTimeChange}
          handleBreakChange={handleBreakChange}
          removeBreak={removeBreak}
          addBreak={addBreak}
          filterTimeOptions={filterTimeOptions}
          generateTimeOptions={generateTimeOptions}
        />
      ))}
    </div>
  );
};

export default WorkSchedule;
