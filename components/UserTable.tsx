'use client';

import { User } from '@/types';
import { DataTable } from '@/components/data-table/data-table';
import { userColumns } from '@/components/data-table/columns';
import React, { useEffect } from 'react';

import { useServerAction } from 'zsa-react';
import { FetchUsers } from '@/actions/actions';
import { Skeleton } from './ui/skeleton';
import { Card } from './ui/card';

export default function UserTable() {
  const [users, setUsers] = React.useState<User[]>([]);
  const { isPending, execute } = useServerAction(FetchUsers);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const [result, err] = await execute();

        if (!err) {
          setUsers(result || []);
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchUsers();
  }, [execute]);

  return isPending ? (
    <Skeleton className='h-[125px] w-full rounded-xl px-4' />
  ) : (
    <div >
      <h1 className='text-2xl font-semibold px-4'>User List</h1>
      <DataTable columns={userColumns} data={users} />
    </div>
  );
}
