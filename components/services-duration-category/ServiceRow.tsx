import React from 'react';
import { Input } from '../ui/input';
import { Trash2Icon } from 'lucide-react';
import { motion } from 'framer-motion';
import { Items } from './types';
import DurationCombobox from './DurationCombobox';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';

type ServiceRowProps = {
  form: any;
  idx: number;
  item: Items;
  handleRemoveSpecificRow: (index: number) => () => void;
  rowLength: number;
};

const ServiceRow: React.FC<ServiceRowProps> = ({
  form,
  idx,
  item,
  handleRemoveSpecificRow,
  rowLength,
}) => (
  <motion.div
    className='mb-6 space-y-4 rounded-lg border bg-white p-4 shadow-md md:flex md:items-center md:space-x-4 md:space-y-0'
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    <div className='flex items-center space-x-2 md:w-1/4'>
      <span className='px-1 text-gray-700'>{idx + 1}. </span>
      <FormField
        control={form.control}
        name={`services.${idx}.name`}
        render={({ field }) => (
          <FormItem className='flex-1'>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input {...field} defaultValue={item.name} />
            </FormControl>
            {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
    <div className='flex flex-row gap-2 space-x-2 md:w-1/4 md:flex-1 md:flex-row'>
      <FormField
        control={form.control}
        name={`services.${idx}.duration`}
        render={({ field }) => (
          <FormItem className='flex-1'>
            <FormLabel>Duration</FormLabel>
            <DurationCombobox idx={idx} {...field} />
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`services.${idx}.price`}
        render={({ field }) => (
          <FormItem className='flex-1'>
            <FormLabel>Price</FormLabel>
            <FormControl>
              <Input {...field} defaultValue={item.price} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {rowLength > 1 && (
        <div className='relative flex items-center'>
          <Trash2Icon
            className='relative h-6 w-6 cursor-pointer text-red-600'
            style={{ top: '15px' }}
            onClick={handleRemoveSpecificRow(idx)}
          />
        </div>
      )}
    </div>
  </motion.div>
);

export default ServiceRow;
