'use client';
import { InsertCategory, FindCategory } from '@/actions/actions';
import { useServerAction } from 'zsa-react';
import { Button } from '@/components/ui/button';
import { Loader2, CheckIcon, CircleAlert } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useState } from 'react';
import { category } from '@prisma/client';
import { ToastAction } from './ui/toast';
import { cn } from '@/lib/utils';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
const FormSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: 'نام باید بیش از سه کاراکتر باشد.',
    })
    //.regex(/^[a-zA-Z]+$/, { message: 'Name must only contain English letters' })
    .refine(
      async (value) => {
        const [data, err] = await FindCategory({
          name: value,
        });

        if (!err) return !data;
      },
      {
        message: 'این نام وجود دارد ',
      },
    ),
});

export default function Btn() {
  const { toast } = useToast();
  const [counter, setCounter] = useState<category>();
  const { isPending, execute, data } = useServerAction(InsertCategory);
  const [result, setResult] = useState<boolean | null>(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
    },
  });
  function onSubmit(data: z.infer<typeof FormSchema>) {
    data && setResult(false);
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>category</FormLabel>
                <FormControl>
                  <div className='relative'>
                    <Input
                      placeholder='name'
                      className='block w-full p-4 ps-10'
                      {...field}
                      // onChange={async (e) => {
                      //   e.preventDefault();
                      //   const [data, err] = await FindCategory({
                      //     name: e.target.value,
                      //   });
                      //   if (!err) setResult(data);
                      // }}
                    />

                    <div className='pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3'>
                      {!result ? (
                        <CheckIcon className='h-4 w-4 animate-bounce text-green-700' />
                      ) : (
                        <CircleAlert className='h-4 w-4 animate-pulse text-red-700' />
                      )}
                    </div>
                  </div>
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit'>Submit</Button>
        </form>
      </Form>

      <Button
        disabled={isPending}
        onClick={async () => {
          const [data, err] = await execute({
            name: 'مدارس  ',
            description: '...',
          });

          if (err) {
            toast({
              variant: 'error',
              title: 'ا در ثبت کاتالوگ  ',
              description: 'ثبت ای اتفاق افتاد است     ' + err.message,
              //action: <ToastAction altText="Try again">Try again</ToastAction>,
            });

            return;
          }

          toast({
            className: cn(
              'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4',
            ),
            title: 'ثبت کاتالوگ ',
            variant: 'success',
            description: (
              <div className='flex items-center'>
                <CheckIcon className='mr-2' />
                <span className='first-letter:capitalize'>
                  ثبت با موفقیت انجام شد
                </span>
              </div>
            ),
          });
          setCounter(data);
        }}
      >
        {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
        Invoke action
      </Button>
      <p>Count:</p>
      <div>{isPending ? 'saving...' : counter?.name}</div>
    </main>
  );
}
