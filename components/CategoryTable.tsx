'use client';

import { Category } from '@/types';
import { DataTable } from '@/components/data-table/data-table';
import { userColumns } from '@/components/data-table/columns';
import React, { useEffect } from 'react';

import { useServerAction } from 'zsa-react';
import { FetchCategries } from '@/actions/actions';
import { Skeleton } from './ui/skeleton';

export default function UserTable() {
  const [Category, setCategory] = React.useState<Category[]>([]);
  const { isPending, execute } = useServerAction(FetchCategries);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const [result, err] = await execute();

        if (!err) {
          setCategory(result);
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchCategory();
  }, [execute]);

  return isPending ? (
    <Skeleton className='h-[125px] w-full rounded-xl px-4' />
  ) : (
    <div >
      <h1 className='text-2xl font-semibold px-4'>User List</h1>
      <DataTable columns={userColumns} data={Category} />
    </div>
  );
}
