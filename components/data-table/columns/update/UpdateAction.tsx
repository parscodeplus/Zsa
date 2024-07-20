import React, { useState } from 'react';
import { useMediaQuery } from "@/hook/use-media-query";
import { toast } from '@/components/ui/use-toast';
import { UpdateDialog } from './UpdateDialog';
import { UpdateDrawer } from './UpdateDrawer';
import { UpdateForm } from './UpdateForm';

async function updateDataOnServer(data: any) {
  const response = await fetch('/api/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to update data on server');
  }

  return response.json();
}

interface UpdateActionProps<T extends Record<string, any>> {
  rowData: T;
  isDisabled: boolean;
  handleUpdate: (data: T) => void;
}

export const UpdateAction = <T extends Record<string, any>>({ rowData, handleUpdate, isDisabled }: UpdateActionProps<T>) => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const onSubmit = async (data: Record<string, any>) => {
    try {
      await updateDataOnServer(data);
      toast({
        title: 'Data updated successfully',
        description: (
          <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
            <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      });
      setOpen(false); // Close the dialog or drawer on successful update
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error updating data',
        description: error.message,
      });
    }
  };

  const content = <UpdateForm rowData={rowData} isDisabled={isDisabled} onSubmit={onSubmit} />;

  return isDesktop ? (
    <UpdateDialog open={open} setOpen={setOpen} isDisabled={isDisabled}>
      {content}
    </UpdateDialog>
  ) : (
    <UpdateDrawer open={open} setOpen={setOpen} isDisabled={isDisabled}>
      {content}
    </UpdateDrawer>
  );
};
