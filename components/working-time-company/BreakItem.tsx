import React from 'react';
import TimeSelect from './TimeSelect';
import { Trash2Icon } from 'lucide-react';

interface Break {
  start: string;
  end: string;
}

interface BreakItemProps {
  b: Break;
  dayIndex: number;
  breakIndex: number;
  day: any;
  handleBreakChange: (dayIndex: number, breakIndex: number, field: 'start' | 'end', value: string) => void;
  removeBreak: (dayIndex: number, breakIndex: number) => void;
  filterTimeOptions: (currentBreaks: Break[], workStart: string, workEnd: string, isStart: boolean, excludeIndex: number) => string[];
}

const BreakItem: React.FC<BreakItemProps> = ({ b, dayIndex, breakIndex, day, handleBreakChange, removeBreak, filterTimeOptions }) => {
  return (
    <div className='mb-4 rounded-lg  py-2 pl-4 pr-2'>
      {/* <label className='mb-2 block font-medium'>Breaks</label> */}
      <div className='flex items-center space-x-3'>
        <TimeSelect
          value={b.start || ''}
          onChange={(value: string) => handleBreakChange(dayIndex, breakIndex, 'start', value)}
          options={filterTimeOptions(day.breaks, day.workStart, day.workEnd, true, breakIndex)}
        />
        <span className='relative -left-1'>-</span>
        <TimeSelect
          value={b.end || ''}
          onChange={(value: string) => handleBreakChange(dayIndex, breakIndex, 'end', value)}
          options={filterTimeOptions(day.breaks, day.workStart, day.workEnd, false, breakIndex)}
        />
        <Trash2Icon className='h-16 w-16 text-red-600' onClick={() => removeBreak(dayIndex, breakIndex)} />
      </div>
    </div>
  );
};

export default BreakItem;
