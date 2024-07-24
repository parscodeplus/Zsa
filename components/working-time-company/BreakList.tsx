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
    excludeIndex: number
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
      <Button type='button' onClick={() => addBreak(dayIndex)} variant={'default'}>
        Add break
      </Button>
    </>
  );
};

export default BreakList;
