import { ColumnDef } from '@tanstack/react-table';
import { Category, User, UserGroup } from '../../../types';
import { createSelectColumn } from './SelectColumn';
import { SortableHeader } from './SortableHeader';
import { DeleteAction } from './delete/DeleteAction';
import React from 'react';
import { UpdateAction } from './update/UpdateAction';
import { removeCategory } from '@/actions/actions';
const handleDeleteRowCategory = async (id: number) => {
  const [data, err] = await removeCategory({ id: id });

  if (err) {
    return false;
  } else {
    return true;
  }
};

const handleDeleteRowUserGroup = async (id: number) => {
  const [data, err] = await removeCategory({ id: id });

  if (err) {
    return false;
  } else {
    return true;
  }
};
function handleUpdateRowCategory(data: Category): void {
  // Add your update logic here
}
function handleUpdateRowUserGroup(data: UserGroup): void {
  // Add your update logic here
}
export const UserGroupColumns: ColumnDef<UserGroup>[] = [
  createSelectColumn<UserGroup>(),
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: 'Full Name',
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <SortableHeader column={column} title='Description' />
    ),
  },
  {
    accessorKey: 'permissions',
    header: 'Permissions',
  },
  {
    id: 'delete',
    header: 'Actions',
    cell: ({ row }) => (
      <div className='flex space-x-2'>
        <DeleteAction
          rowId={row.original.id}
          isDisabled={!row.getIsSelected()}
          handleDelete={handleDeleteRowUserGroup}
        />
        <UpdateAction<UserGroup>
          rowData={row.original}
          isDisabled={!row.getIsSelected()}
          handleUpdate={handleUpdateRowUserGroup}
        />
      </div>
    ),
  },
];
export const categoryColumns: ColumnDef<Category>[] = [
  createSelectColumn<Category>(),
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: 'Full Name',
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <SortableHeader column={column} title='Description' />
    ),
  },
  {
    accessorKey: 'role',
    header: 'User Role',
  },
  {
    id: 'delete',
    header: 'Actions',
    cell: ({ row }) => (
      <div className='flex space-x-2'>
        <DeleteAction
          rowId={row.original.id}
          isDisabled={!row.getIsSelected()}
          handleDelete={handleDeleteRowCategory}
        />
        <UpdateAction<Category>
          rowData={row.original}
          isDisabled={!row.getIsSelected()}
          handleUpdate={handleUpdateRowCategory}
        />
      </div>
    ),
  },
];

export const userColumns: ColumnDef<User>[] = [
  createSelectColumn<User>(),
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: 'Full Name',
  },
  {
    accessorKey: 'email',
    header: ({ column }) => <SortableHeader column={column} title='Email' />,
  },
  {
    accessorKey: 'role',
    header: 'User Role',
  },
];
