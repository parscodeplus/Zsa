'use client';
import React, { useEffect, useState } from 'react';
import { useServerAction } from 'zsa-react';
import { Categries } from '@/actions/actions';
import { Option } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2Icon } from 'lucide-react';
import { TriangleAlertIcon } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Combobox, ComboboxOptions } from '../ui/combobox';
import { ComboboxDemo } from './service-durations';
import { Input } from '../ui/input';
import { motion, AnimatePresence } from 'framer-motion';

type Items = {
  name: string;
  duration: string;
  price: string;
};

const AddService: React.FC = () => {
  const [row, setRow] = useState<Items[]>([
    { name: '', duration: '', price: '' },
  ]);
  const frameworks: ComboboxOptions[] = [
    { value: '1', label: '10 دقیقه' },
    { value: '2', label: '15 دقیقه' },
    { value: '3', label: '20 دقیقه' },
    { value: '4', label: '30 دقیقه' },
    { value: '5', label: '1 ساعت' },
  ];
  const { isPending, execute, data } = useServerAction(Categries);
  const [categores, setCategores] = useState<Option[]>([]);
  const [addedCategories, setAddedCategories] = useState<string[]>([]);
  const [selectedFrameworks, setSelectedFrameworks] = React.useState<
    string | string[]
  >([]);

  const handleSelectionChange = (selected: string | string[]) => {
    setSelectedFrameworks(selected);
    console.log('Selected Value:', selected);
  };

  const handleCreate = (value: string) => {
    console.log('Create new value:', value);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [data, err] = await execute();

        if (!err) setCategores(data);
      } catch (error) {}
    };

    fetchData();
  }, [execute]);

  const handleChange =
    (idx: number) => (e: { target: { name: any; value: any } }) => {
      const { name, value } = e.target;
      const updatedRows = [...row];
      updatedRows[idx] = { ...updatedRows[idx], [name]: value };
      setRow(updatedRows);
    };

  const handleAddRow = (name: string = '') => {
    const newItem = {
      name: name,
      duration: '',
      price: '',
    };
    setRow([...row, newItem]);
    if (name) {
      setAddedCategories([...addedCategories, name]);
    }
  };

  const handleRemoveSpecificRow = (idx: number) => () => {
    const updatedRows = [...row];
    const removedItem = updatedRows.splice(idx, 1)[0];
    setRow(
      updatedRows.length > 0
        ? updatedRows
        : [{ name: '', duration: '', price: '' }],
    );
    if (removedItem.name) {
      setAddedCategories(
        addedCategories.filter((cat) => cat !== removedItem.name),
      );
    }
  };

  return (
    <div className='container mx-auto p-1'>
      <div className='space-y-4'>
      <AnimatePresence>
        {row.map((item, idx) => (
          <motion.div
            key={idx}
            className='mb-6 space-y-4 rounded-lg border bg-white p-4 shadow-md md:flex md:items-center md:space-x-4 md:space-y-0'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className='flex items-center space-x-2 md:w-1/4'>
              <span className='text-gray-700 px-1 '>{idx + 1}. </span>
              <div className='flex-1'>
                <label className='block text-gray-700'>name:</label>
                <Input
                  // type='text'
                  name='name'
                  value={item.name}
                  onChange={handleChange(idx)}
                  // className='w-full rounded border px-2 py-1'
                />
              </div>
            </div>
            <div className='flex gap-2 space-x-2 md:w-1/4 md:flex-1'>
              <div className='flex-1'>
                <label className='block text-gray-700'>Duration</label>
                <Combobox
                  options={frameworks}
                  selected={selectedFrameworks}
                  mode='single'
                  placeholder='انتخاب زمات ...'
                  onChange={handleSelectionChange}
                  // onCreate={handleCreate}
                />

                {/* <input
                  type='text'
                  name='duration'
                  value={item.duration}
                  onChange={handleChange(idx)}
                  className='w-full rounded border px-2 py-1'
                /> */}
              </div>
              <div className='flex-1'>
                <label className='block text-gray-700'>Price</label>
                <Input
                  // type='text'
                  name='price'
                  value={item.price}
                  onChange={handleChange(idx)}
                  // className='w-full rounded border px-2 py-1'
                />
              </div>
              {row.length > 1 && (
                <div className='flex items-end'>
                  <Button
                    className='rounded-full'
                    variant={'destructive'}
                    onClick={handleRemoveSpecificRow(idx)}
                  >
                    <Trash2Icon className='h-4 w-4' />
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        ))}
        </AnimatePresence>
      </div>
      <div className='mt-4 flex space-x-2'>
        <Button
          variant={'ghost'}
          onClick={() => handleAddRow()}
          className='rounded bg-blue-500 px-4 py-2 text-white'
        >
          سرویس دیگری اضافه کنید +
        </Button>
      </div>

      <div>خدمات پیشنهادی</div>
      {isPending ? (
        <Skeleton className='h-[125px] w-[250px] rounded-xl' />
      ) : (
        <div className='mt-4 flex flex-wrap items-center justify-center gap-1'>
          {data?.length ? (
            data.map(
              (item, index) =>
                !addedCategories.includes(item.label) && (
                  <Button
                    variant={'outline'}
                    className='rounded-l-full rounded-r-full'
                    onClick={() => handleAddRow(item.label)}
                    key={index}
                  >
                    + {item.label}
                  </Button>
                ),
            )
          ) : (
            <Alert variant='destructive' className='ml-2 rtl:ml-0'>
              <TriangleAlertIcon className='h-4 w-4' />
              <AlertTitle>خطا</AlertTitle>
              <AlertDescription>
                دریافت اطلاعات از سرور اتفاق افتاده است
              </AlertDescription>
            </Alert>
          )}
        </div>
      )}
    </div>
  );
};

export default AddService;
