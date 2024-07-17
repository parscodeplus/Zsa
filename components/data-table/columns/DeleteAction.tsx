import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from '../../ui/drawer';
  import { Alert, AlertDescription, AlertTitle } from '../../ui/alert';
  import { Button } from '../../ui/button';
  import { Trash2, TriangleIcon } from 'lucide-react';
import React from 'react';
  
  interface DeleteActionProps {
    rowId: number;
    isDisabled: boolean;
    handleDelete: (id: number) => void;
  }
  
  export const DeleteAction: React.FC<DeleteActionProps> = ({ rowId, isDisabled, handleDelete }) => {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant='ghost' disabled={isDisabled}>
            <Trash2 className='h-4 w-4' />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className='mx-auto w-full max-w-sm'>
            <DrawerHeader>
              <DrawerTitle>Delete row select Category</DrawerTitle>
              <DrawerDescription>
                Set your daily activity goal.
              </DrawerDescription>
            </DrawerHeader>
            <div className='p-4 pb-0'>
              <div className='flex items-center justify-center space-x-2'>
                <Alert variant='destructive'>
                  <TriangleIcon className='h-4 w-4' />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    Your session has expired. Please log in again.
                  </AlertDescription>
                </Alert>
              </div>
              <div className='mt-3 h-[120px]'></div>
            </div>
            <DrawerFooter>
              <Button variant={'destructive'} onClick={() => handleDelete(rowId)}>
                Delete
              </Button>
              <DrawerClose asChild>
                <Button variant='outline'>Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    );
  };
  