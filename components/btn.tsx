'use client';
import { InsertCategory } from '@/actions/actions';
import { useServerAction } from 'zsa-react';
import { Button } from '@/components/ui/button';
import { Loader2, CheckIcon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

import { useState } from 'react';
import { category } from '@prisma/client';
import { ToastAction } from './ui/toast';
import { cn } from '@/lib/utils';
export default function Btn() {
  const { toast } = useToast();
  const [counter, setCounter] = useState<category>();
  const { isPending, execute, data } = useServerAction(InsertCategory);
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
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
              'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'
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
