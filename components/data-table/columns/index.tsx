import { ColumnDef } from '@tanstack/react-table';
import { Category, User } from '../../../types';
import { createSelectColumn } from './SelectColumn';
import { SortableHeader } from './SortableHeader';
import { DeleteAction } from './DeleteAction';
import React from 'react';
import { UpdateAction } from './UpdateAction';
function handleDeleteRowCategory(id: number): void {
  // Add your delete logic here
}
function handleUpdateRowCategory(data: Category): void {
    // Add your update logic here
  }
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
        <div className="flex space-x-2">
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
