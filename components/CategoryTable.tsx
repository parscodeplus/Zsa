'use client';

import { Category } from '@/types';
import { DataTable } from '@/components/data-table/data-table';
import { categoryColumns } from '@/components/data-table/columns/index';
import React, { useEffect, useState } from 'react';

import { useServerAction } from 'zsa-react';
import { FetchCategries } from '@/actions/actions';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { InputNumber } from './ui/input-number';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
export default function CategoryTable() {
  const [Category, setCategory] = useState<Category[]>([]);
  const { isPending, execute } = useServerAction(FetchCategries);
  const [limit, setLimit] = useState<string>("3");
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [offset, setOffset] = useState<number>(0); // Initialize offset properly
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const [result, err] = await execute({ offset: offset, limit: parseInt(limit) });

        if (!err) {
          setCategory(result.fetchCategory);
          setTotalPages(result.totalPages);
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchCategory();
  }, [execute, limit, offset, pageIndex]);

  useEffect(() => {
    setOffset((pageIndex - 1) * parseInt(limit));
  }, [pageIndex, limit]);

  return (
    <div>
      <h1 className='px-4 text-2xl font-semibold'>User List</h1>
      <DataTable
        isPending={isPending}
        columns={categoryColumns}
        data={Category}
      />
      <div className='flex flex-row justify-between items-center px-4'>
        <Button
          className={pageIndex - 1 === 0 ? `pointer-events-none opacity-50` : ''}
          onClick={() => setPageIndex(pageIndex - 1)}
        >
          <ChevronLeft />
        </Button>
        <Select onValueChange={setLimit} defaultValue={limit}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a row count" />
      </SelectTrigger>
      <SelectContent >
        <SelectGroup>
          <SelectLabel>row count</SelectLabel>
          <SelectItem value="3">3</SelectItem>
          <SelectItem value="5">5</SelectItem>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="15">15</SelectItem>
          <SelectItem value="20">20</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
        <Button
          className={pageIndex >= totalPages ? `pointer-events-none opacity-50` : ''}
          onClick={() => setPageIndex(pageIndex + 1)}
        >
          <ChevronRight />
        </Button>
      </div>
      {limit.toString()}
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}
