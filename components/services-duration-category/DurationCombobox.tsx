import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FormControl } from '../ui/form';

const DurationCombobox: React.FC<{ idx: number }> = ({ idx }) => {
  const times = [
    { value: '1', label: '10 minutes' },
    { value: '2', label: '15 minutes' },
    { value: '3', label: '20 minutes' },
    { value: '4', label: '30 minutes' },
    { value: '5', label: '1 hour' },
  ];

  const { control } = useFormContext();
  const { field } = useController({
    name: `services.${idx}.duration`,
    control,
  });

  const handleSelectionChange = (selected: string | string[]) => {
    field.onChange(selected);
  };

  return (
    <Select onValueChange={handleSelectionChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="Select duration..." />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {times.map((item) => ( // Added parentheses for correct mapping
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default DurationCombobox;
