'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { AnimatePresence } from 'framer-motion';
import ProviderRow from './ProviderRow';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { toast } from '../ui/use-toast';
import { useServerAction } from 'zsa-react';
import { InsertProvider } from '@/actions/actions';
import { Separator } from '../ui/separator';
import { ProviderFormValues, providerSchema } from '@/schemas/providerSchema';
import { useStepper } from '../stepper';
const AddProvider: React.FC = () => {
  const { isPending, isSuccess, execute, error } = useServerAction(InsertProvider);
  const { nextStep } = useStepper();

  const form = useForm<ProviderFormValues>({
    resolver: zodResolver(providerSchema),
    defaultValues: {
      providers: [{ name: '', maxCapacity: 1 }],
    },
  });

  const { handleSubmit, reset, control } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'providers',
  });

  const handleAddRow = () => {
    append({ name: '', maxCapacity: 1 });
  };

  const handleRemoveSpecificRow = (index: number) => () => {
    remove(index);
  };

  const onSubmit = async (values: ProviderFormValues) => {
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
        title: 'Error submitting values:',
        description: (
          <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
            <code className='text-white'>{JSON.stringify(err, null, 2)}</code>
          </pre>
        ),
      });
      reset();
      return;
    }

    nextStep();

  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className='container mx-auto p-4' name='add-provider'>
        <div className='space-y-4 space-x-2'>
          <AnimatePresence>
            {fields.map((item, idx) => (
              <ProviderRow
                form={form}
                key={item.id}
                idx={idx}
                item={item}
                handleRemoveSpecificRow={handleRemoveSpecificRow}
                rowLength={fields.length}
              />
            ))}
          </AnimatePresence>
        </div>
        <div className='mt-4 flex space-x-2'>
          <Button variant='default' onClick={handleAddRow}>
            + Add Another Provider
          </Button>
        </div>
        <Separator className='my-4' />
        <div className='mt-4 w-full'>
          <Button className='w-full' disabled={isPending} type='submit'>
            {isPending ? 'Saving...' : 'next page'}
          </Button>
          {isSuccess && <div>Record saved successfully!</div>}
          {error && <div>Error: {JSON.stringify(error.fieldErrors)}</div>}
        </div>
      </form>
    </Form>
  );
};

export default AddProvider;
