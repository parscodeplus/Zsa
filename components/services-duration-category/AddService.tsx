'use client';
import React, { useEffect, useState } from 'react';
import { useServerAction } from 'zsa-react';
import { Categries } from '@/actions/actions';
import { Option, Items } from './types';
import { Button } from '@/components/ui/button';
import { AnimatePresence } from 'framer-motion';
import ServiceRow from './ServiceRow';
import CategoryButtons from './CategoryButtons';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { serviceSchema, ServiceFormValues } from '@/schemas/serviceSchema';
import { Form } from '@/components/ui/form';

const AddService: React.FC = () => {
  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema),
  });

  const { handleSubmit, reset } = form;

  const [rows, setRows] = useState<Items[]>([
    { name: '', duration: '', price: '' },
  ]);
  const [categories, setCategories] = useState<Option[]>([]);
  const [addedCategories, setAddedCategories] = useState<string[]>([]);
  const { isPending, execute, data } = useServerAction(Categries);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const [result, err] = await execute();
        if (!err) {
          setCategories(result || []);
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchCategories();
  }, [execute]);

  const handleAddRow = (name = '') => {
    const newItem: Items = { name, duration: '', price: '' };
    setRows((prevRows) => [...prevRows, newItem]);
    if (name) setAddedCategories((prevCategories) => [...prevCategories, name]);
  };

  const handleRemoveSpecificRow = (index: number) => () => {
    setRows((prevRows) => {
      const updatedRows = prevRows.filter((_, i) => i !== index);
      return updatedRows.length > 0
        ? updatedRows
        : [{ name: '', duration: '', price: '' }];
    });
    setAddedCategories((prevCategories) =>
      prevCategories.filter((cat, i) => i !== index),
    );
  };

  const onSubmit = (data: ServiceFormValues) => {
    console.log('Form data:', data);
    reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='container mx-auto p-1'>
        <div className='space-y-4'>
          <AnimatePresence>
            {rows.map((item, idx) => (
              <ServiceRow
                form={form}
                key={idx}
                idx={idx}
                item={item}
                handleRemoveSpecificRow={handleRemoveSpecificRow}
                rowLength={rows.length}
              />
            ))}
          </AnimatePresence>
        </div>
        <div className='mt-4 flex space-x-2'>
          <Button
            variant='default'
            onClick={() => handleAddRow()}
            // className='rounded bg-blue-500 px-4 py-2 text-white'
          >
            + Add Another Service
          </Button>
        </div>
        <CategoryButtons
          isPending={isPending}
          data={categories}
          addedCategories={addedCategories}
          handleAddRow={handleAddRow}
        />
        <div className='mt-4'>
          <Button
            type='submit'
            // className='rounded bg-green-500 px-4 py-2 text-white'
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddService;
