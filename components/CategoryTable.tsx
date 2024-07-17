'use client';

import { Category } from '@/types';
import { DataTable } from '@/components/data-table/data-table';
import { categoryColumns } from '@/components/data-table/columns';
import React, { useEffect, useMemo, useState } from 'react';

import { useServerAction } from 'zsa-react';
import { FetchCategries } from '@/actions/actions';
 
export default function CategoryTable() {
  const [Category, setCategory] = React.useState<Category[]>([]);
  const { isPending, execute } = useServerAction(FetchCategries);
  const [pageIndex, setPageIndex] = useState<number>(1);
  useMemo(() => {
    const fetchCategory = async () => {
      try {
        const [result, err] = await execute({offset:0,limit:5}); // take = count record

        if (!err) {
          setCategory(result.fetchCategory);
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchCategory();
  }, [execute]);
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const [result, err] = await execute({offset:0,limit:5}); // take = count record

        if (!err) {
          setCategory(result.fetchCategory);
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchCategory();
  }, [execute,pageIndex]);

  return  (
    <div >
      <h1 className='text-2xl font-semibold px-4'>User List</h1>
      <DataTable isPending={isPending} columns={categoryColumns} data={Category} />
      <button onClick={() => setPageIndex(pageIndex - 1)}>Previous</button>
      <button onClick={() => setPageIndex(pageIndex + 1)}>Next</button>
    </div>
  );
}
