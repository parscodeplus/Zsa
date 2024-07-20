import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { TriangleIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LoadingButton } from '@/components/ui/loading-button';
import { DrawerClose, DrawerFooter, DrawerHeader, DrawerTitle, DrawerDescription } from '@/components/ui/drawer';

interface DeleteContentProps {
  onDelete: () => void;
  error: string | null;
  isLoading: boolean;
  setOpen: (open: boolean) => void;
}

export const DeleteContent: React.FC<DeleteContentProps> = ({
  onDelete,
  error,
  isLoading,
  setOpen,
}) => {
  return (
    <>
      <DrawerHeader className='text-left'>
        <DrawerTitle>Delete Row</DrawerTitle>
        <DrawerDescription>Are you sure you want to delete this row?</DrawerDescription>
      </DrawerHeader>
      {error && (
        <Alert variant='destructive'>
          <TriangleIcon className='h-4 w-4' />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className='mt-3 h-[120px]'></div>
      <DrawerFooter className='pt-2'>
        <LoadingButton variant={'destructive'} onClick={onDelete} loading={isLoading}>
          Delete
        </LoadingButton>
        <DrawerClose asChild>
          <Button variant='outline' onClick={() => setOpen(false)}>Cancel</Button>
        </DrawerClose>
      </DrawerFooter>
    </>
  );
};
