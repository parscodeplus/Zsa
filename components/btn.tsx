'use client';
import { InsertCategory } from '@/actions/actions';
import { useServerAction } from 'zsa-react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

import { useState } from 'react';
import { category } from '@prisma/client';
export default function Btn() {
  const [counter, setCounter] = useState<category>();
  const { isPending, execute, data } = useServerAction(InsertCategory);
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <Button
        disabled={isPending}
        onClick={async () => {
          const [data, err] = await execute({
            name: 'سایر',
            description: '...',
          });

          if (err) {
            // handle error
            return;
          }

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
