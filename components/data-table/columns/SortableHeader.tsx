import React from 'react';
import { Button } from '../../ui/button';
import { ArrowUpDown } from 'lucide-react';

interface SortableHeaderProps {
  column: any;
  title: string;
}

export const SortableHeader: React.FC<SortableHeaderProps> = ({ column, title }) => {
  return (
    <Button
      variant='ghost'
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    >
      {title}
      <ArrowUpDown className='ml-2 h-4 w-4' />
    </Button>
  );
};
