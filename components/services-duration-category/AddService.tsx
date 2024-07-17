'use client';
import React, { useState } from 'react';
import { Option, Items } from './types';
import { Button } from '@/components/ui/button';
import { AnimatePresence } from 'framer-motion';
import ServiceRow from './ServiceRow';
import SuggestedServiceButtons from './SuggestedServiceButtons';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { serviceSchema, ServiceFormValues } from '@/schemas/serviceSchema';
import { Form } from '@/components/ui/form';
import { toast } from '../ui/use-toast';
import { useServerAction } from 'zsa-react';
import { InsertService } from '@/actions/actions';
import { Separator } from '../ui/separator';
const AddService: React.FC = () => {
  const { isPending, isSuccess, execute, data, error } =
    useServerAction(InsertService);
  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema),
  });

  const { handleSubmit, reset } = form;

  const [rows, setRows] = useState<Items[]>([
    { name: '', duration: '', price: '' },
  ]);
  const [addedCategories, setAddedCategories] = useState<string[]>([]);

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

    setAddedCategories((prevCategories) => {
      const categoryToRemove = rows[index].name;
      return prevCategories.filter((cat) => cat !== categoryToRemove);
    });
  };

  const onSubmit = async (values: ServiceFormValues) => {
    // toast({
    //   title: 'You submitted the following values:',
    //   description: (
    //     <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
    //       <code className='text-white'>{JSON.stringify(values, null, 2)}</code>
    //     </pre>
    //   ),
    // });

    const [data, err] = await execute(values);
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    });
    if (err) {
      toast({
        title: 'You submitted the following values:',
        description: (
          <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
            <code className='text-white'>{JSON.stringify(err, null, 2)}</code>
          </pre>
        ),
      });
      return;
    }

    reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='container mx-auto p-1'
      >
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
          <Button variant='default' onClick={() => handleAddRow()}>
            + Add Another Service
          </Button>
        </div>
        <Separator className="my-4" />
        <SuggestedServiceButtons
          addedCategories={addedCategories}
          handleAddRow={handleAddRow}
        />
        <div className='mt-4'>
          <Button disabled={isPending} type='submit'>
            {isPending ? 'Saving...' : 'Save'}
          </Button>
          {isSuccess && <div>save record</div>}
          {error && <div>Error: {JSON.stringify(error.fieldErrors)}</div>}
          <br />
          <br />
          <br />
        </div>
      </form>
    </Form>
  );
};

export default AddService;
