import React from 'react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../ui/select';

interface TimeSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
}

const TimeSelect: React.FC<TimeSelectProps> = ({ value, onChange, options }) => {
  return (
    <Select defaultValue={value} onValueChange={onChange}>
      <SelectTrigger className='w-full'>
        <SelectValue placeholder='Select time' />
      </SelectTrigger>
      <SelectContent>
        {options.map((time) => (
          <SelectItem key={time} value={time}>
            {time}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default TimeSelect;
