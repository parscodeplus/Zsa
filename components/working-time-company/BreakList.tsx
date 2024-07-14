import React from 'react';
import BreakItem from './BreakItem';
import { Break } from './types';
import { Button } from '../ui/button';

interface BreakListProps {
  dayIndex: number;
  day: any;
  handleBreakChange: (
    dayIndex: number,
    breakIndex: number,
    field: 'start' | 'end',
    value: string,
  ) => void;
  removeBreak: (dayIndex: number, breakIndex: number) => void;
  addBreak: (index: number) => void;
  filterTimeOptions: (
    currentBreaks: Break[],
    workStart: string,
    workEnd: string,
    isStart: boolean,
  ) => string[];
}

const BreakList: React.FC<BreakListProps> = ({
  dayIndex,
  day,
  handleBreakChange,
  removeBreak,
  addBreak,
  filterTimeOptions,
}) => {
  return (
    <>
      {day.breaks.map((b: Break, breakIndex: number) => (
        <BreakItem
          key={breakIndex}
          b={b}
          dayIndex={dayIndex}
          breakIndex={breakIndex}
          day={day}
          handleBreakChange={handleBreakChange}
          removeBreak={removeBreak}
          filterTimeOptions={filterTimeOptions}
        />
      ))}
      <Button
        onClick={() => addBreak(dayIndex)}
        variant={'default'}
        // className='rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'
      >
        Add break
      </Button>
    </>
  );
};

export default BreakList;
