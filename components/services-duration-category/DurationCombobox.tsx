'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { useServerAction } from 'zsa-react';
import { FetchDuration } from '@/actions/actions';
import { Option } from './types';

import { useController, useFormContext } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Skeleton } from '../ui/skeleton';

const DurationCombobox: React.FC<{ idx: number; form: any }> = ({
  idx,
  form,
}) => {
  const [durations, setDurations] = useState<Option[]>([]);
  const { isPending, execute } = useServerAction(FetchDuration);

  useEffect(() => {
    const fetchDurations = async () => {
      try {
        const [result, err] = await execute();
        if (!err) {
          setDurations(result || []);
        }
      } catch (error) {
        console.error('Failed to fetch durations:', error);
      }
    };

    fetchDurations();
  }, [execute]);

  // const times = useMemo(() => [
  //   { value: '1', label: '10 minutes' },
  //   { value: '2', label: '15 minutes' },
  //   { value: '3', label: '20 minutes' },
  //   { value: '4', label: '30 minutes' },
  //   { value: '5', label: '1 hour' },
  // ], []);

  const { control } = useFormContext();
  const { field } = useController({
    name: `services.${idx}.duration`,
    control,
  });

  const handleSelectionChange = (selected: string | string[]) => {
    field.onChange(selected);
  };

  const memoizedDurations = useMemo(
    () =>
      durations.map((item) => (
        <SelectItem key={item.value} value={item.value}>
          {item.label}
        </SelectItem>
      )),
    [durations],
  );

  return (
    <>
      <FormField
        control={form.control}
        name={`services.${idx}.duration`}
        render={({ field }) => (
          <FormItem className='flex-1'>
            <FormLabel>Duration</FormLabel>
            {!isPending ? (
              <Select
                onValueChange={handleSelectionChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select duration...' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>{memoizedDurations}</SelectContent>
              </Select>
            ) : (
              <Skeleton className='h-10 w-full rounded-lg' />
            )}
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default DurationCombobox;
