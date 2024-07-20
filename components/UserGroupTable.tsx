'use client';

import { UserGroup } from '@/types';
import { DataTable } from '@/components/data-table/data-table';
import { UserGroupColumns } from '@/components/data-table/columns/index';
import React, { useEffect, useState } from 'react';

import { useServerAction } from 'zsa-react';
import { FetchUserGroup } from '@/actions/actions';
import { ChevronLeft, ChevronRight,ArrowRightToLine,ArrowLeftToLine } from 'lucide-react';
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
export default function UserGroupTable() {
  const [UserGroup, setUserGroup] = useState<UserGroup[]>([]);
  const { isPending, execute } = useServerAction(FetchUserGroup);
  const [limit, setLimit] = useState<string>("3");
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [offset, setOffset] = useState<number>(0); // Initialize offset properly
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchUserGroup = async () => {
      try {
        const [result, err] = await execute({ offset: offset, limit: parseInt(limit) });

        if (!err) {
          setUserGroup(result.fetchUserGroup);
          setTotalPages(result.totalPages);
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchUserGroup();
  }, [execute, limit, offset, pageIndex]);

  useEffect(() => {
    setOffset((pageIndex - 1) * parseInt(limit));
  }, [pageIndex, limit]);

  return (
    <div>
      <h1 className='px-4 text-2xl font-semibold'>User List</h1>
      <DataTable
        limit={parseInt(limit)}
        isPending={isPending}
        columns={UserGroupColumns}
        data={UserGroup}
      />
      <div className='flex flex-row-reverse space-x-1 justify-between items-center px-4'>
      <Button
          className={pageIndex - 1 === 0 ? `pointer-events-none opacity-50` : ''}
          onClick={() => setPageIndex(1)}
        >
          <ArrowLeftToLine />
        </Button>
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
        <Button
          className={pageIndex >= totalPages ? `pointer-events-none opacity-50` : ''}
          onClick={() => setPageIndex(totalPages)}
        >
          <ArrowRightToLine />
        </Button>
      </div>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}
