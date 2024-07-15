import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Checkbox } from '../ui/checkbox';
import TimeSelect from './TimeSelect';
import BreakList from './BreakList';
import { DaySchedule, Break } from './types';
import { Switch } from "@/components/ui/switch"

interface DayCardProps {
  day: DaySchedule;
  dayIndex: number;
  handleToggle: (index: number) => void;
  handleWorkTimeChange: (index: number, field: 'workStart' | 'workEnd', value: string) => void;
  handleBreakChange: (dayIndex: number, breakIndex: number, field: 'start' | 'end', value: string) => void;
  removeBreak: (dayIndex: number, breakIndex: number) => void;
  addBreak: (index: number) => void;
  filterTimeOptions: (currentBreaks: Break[], workStart: string, workEnd: string, isStart: boolean) => string[];
  generateTimeOptions: () => string[];
}

const DayCard: React.FC<DayCardProps> = ({
  day,
  dayIndex,
  handleToggle,
  handleWorkTimeChange,
  handleBreakChange,
  removeBreak,
  addBreak,
  filterTimeOptions,
  generateTimeOptions,
}) => {
  return (
    <motion.div
      key={day.day}
      className='mb-6 rounded-lg border p-4 shadow-md'
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className='flex items-center justify-between'>
        <label className='font-semibold'>{day.day}</label>
        <Switch  direction='rtl' checked={day.isActive} onCheckedChange={() => handleToggle(dayIndex)} />
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
              <label className='mb-2 block font-medium'>Working hours</label>
              <div className='flex items-center space-x-2'>
                <TimeSelect
                  value={day.workStart}
                  onChange={(value: string) => handleWorkTimeChange(dayIndex, 'workStart', value)}
                  options={generateTimeOptions()}
                />
                <span className='px-1'>-</span>
                <TimeSelect
                  value={day.workEnd}
                  onChange={(value: string) => handleWorkTimeChange(dayIndex, 'workEnd', value)}
                  options={generateTimeOptions()}
                />
              </div>
            </div>
            <BreakList
              dayIndex={dayIndex}
              day={day}
              handleBreakChange={handleBreakChange}
              removeBreak={removeBreak}
              addBreak={addBreak}
              filterTimeOptions={filterTimeOptions}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default DayCard;
