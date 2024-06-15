'use client';
import { InsertCategory } from '@/actions/actions';
import { useServerAction } from 'zsa-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useState } from 'react';
import { category } from '@prisma/client';
export default function Home() {
  const [counter, setCounter] = useState<category>();
  const { isPending, execute, data } = useServerAction(InsertCategory);
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <Button
      
        disabled={isPending}
        onClick={async (e) => {
          e.preventDefault();
          const [data, err] = await execute({
            name:"وکالت",
            description:"..."
          });

          if (err) {
            // handle error
            return;
          }

          setCounter(data);
        }}
      >
        Invoke action
      </Button>
      <p>Count:</p>
      <div>{isPending ? 'saving...' : counter?.name}</div>
    </main>
  );
}
