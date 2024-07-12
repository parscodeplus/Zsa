'use client'
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Switch } from './ui/switch';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';

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
  breaks: day === 'Mon' ? [{ start: '13:00', end: '14:00' }, { start: '15:30', end: '16:00' }] : [],
}));

const WorkSchedule: React.FC = () => {
  const [schedule, setSchedule] = useState<DaySchedule[]>(initialSchedule);

  const isValidTimeRange = (start: string, end: string) => {
    return start < end;
  };

  const isValidBreak = (breaks: Break[], newBreak: Break, workStart: string, workEnd: string) => {
    return (
      newBreak.start >= workStart &&
      newBreak.end <= workEnd &&
      breaks.every(b => newBreak.end <= b.start || newBreak.start >= b.end)
    );
  };

  const handleToggle = (index: number) => {
    const newSchedule = [...schedule];
    newSchedule[index].isActive = !newSchedule[index].isActive;
    setSchedule(newSchedule);
  };

  const handleWorkTimeChange = (index: number, field: 'workStart' | 'workEnd', value: string) => {
    const newSchedule = [...schedule];
    const updatedDaySchedule = { ...newSchedule[index], [field]: value };

    if (isValidTimeRange(updatedDaySchedule.workStart, updatedDaySchedule.workEnd)) {
      newSchedule[index] = updatedDaySchedule;

      // Ensure breaks are within working hours
      newSchedule[index].breaks = newSchedule[index].breaks.filter(b => b.start >= newSchedule[index].workStart && b.end <= newSchedule[index].workEnd);

      setSchedule(newSchedule);
    } else {
      alert('The start time must be earlier than the end time.');
    }
  };

  const handleBreakChange = (dayIndex: number, breakIndex: number, field: 'start' | 'end', value: string) => {
    const newSchedule = [...schedule];
    const newBreak = { ...newSchedule[dayIndex].breaks[breakIndex], [field]: value };

    if (
      isValidTimeRange(newBreak.start, newBreak.end) &&
      isValidBreak(newSchedule[dayIndex].breaks.filter((_, i) => i !== breakIndex), newBreak, newSchedule[dayIndex].workStart, newSchedule[dayIndex].workEnd)
    ) {
      newSchedule[dayIndex].breaks[breakIndex] = newBreak;
      setSchedule(newSchedule);
    } else {
      alert('Invalid break time or overlapping with another break, or not within working hours.');
    }
  };

  const addBreak = (index: number) => {
    const newSchedule = [...schedule];
    const newBreak = { start: '', end: '' };

    if (isValidBreak(newSchedule[index].breaks, newBreak, newSchedule[index].workStart, newSchedule[index].workEnd)) {
      newSchedule[index].breaks.push(newBreak);
      setSchedule(newSchedule);
    } else {
      alert('Invalid break time.');
    }
  };

  const removeBreak = (dayIndex: number, breakIndex: number) => {
    const newSchedule = [...schedule];
    newSchedule[dayIndex].breaks.splice(breakIndex, 1);
    setSchedule(newSchedule);
  };

  return (
    <div className="container mx-auto p-4">
      {schedule.map((day, dayIndex) => (
        <motion.div 
          key={day.day} 
          className="mb-6 p-4 border rounded-lg shadow-md bg-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-between items-center">
            <label className="font-semibold">{day.day}</label>
            <Checkbox
              checked={day.isActive}
              onCheckedChange={() => handleToggle(dayIndex)}
            />
          </div>
          <AnimatePresence>
            {day.isActive && (
              <motion.div 
                className="mt-4"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-4">
                  <label className="block mb-2 font-medium">Working hours</label>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="time"
                      value={day.workStart}
                      onChange={(e) => handleWorkTimeChange(dayIndex, 'workStart', e.target.value)}
                      className="py-2 px-4 w-full"
                    />
                    <span className='px-1'>-</span>
                    <Input
                      type="time"
                      value={day.workEnd}
                      onChange={(e) => handleWorkTimeChange(dayIndex, 'workEnd', e.target.value)}
                      className="py-2 px-4 w-full"
                    />
                  </div>
                </div>
                {day.breaks.map((b, breakIndex) => (
                  <motion.div 
                    key={breakIndex} 
                    className="mb-4 pl-4 pr-2 py-2 bg-gray-100 rounded-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label className="block mb-2 font-medium">Breaks</label>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="time"
                        value={b.start}
                        onChange={(e) => handleBreakChange(dayIndex, breakIndex, 'start', e.target.value)}
                        className=" w-full"
                      />
                      <span>-</span>
                      <Input
                        type="time"
                        value={b.end}
                        onChange={(e) => handleBreakChange(dayIndex, breakIndex, 'end', e.target.value)}
                        className=" w-full"
                      />
                      <button
                        onClick={() => removeBreak(dayIndex, breakIndex)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </motion.div>
                ))}
                <button
                  onClick={() => addBreak(dayIndex)}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Add break
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};

export default WorkSchedule;
