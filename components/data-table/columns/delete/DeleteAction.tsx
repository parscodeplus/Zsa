import React, { useState } from 'react';
import { useMediaQuery } from '@/hook/use-media-query';
import { toast } from '@/components/ui/use-toast';
import { DeleteDialog } from './DeleteDialog';
import { DeleteDrawer } from './DeleteDrawer';
import { DeleteContent } from './DeleteContent';

interface DeleteActionProps {
  rowId: number;
  isDisabled: boolean;
  handleDelete: (id: number) => Promise<boolean>;
}

export const DeleteAction: React.FC<DeleteActionProps> = ({
  rowId,
  isDisabled,
  handleDelete,
}) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const onDelete = async () => {
    setIsLoading(true);
    setError(null);
    const success = await handleDelete(rowId);
    setIsLoading(false);
    if (!success) {
      setError('Failed to delete the row. Please try again.');
    } else {
      toast({
        variant: 'success',
        title: 'Success',
        description: 'The row was successfully deleted.',
      });
      setOpen(false); // Close the dialog or drawer on successful deletion
    }
  };

  const content = (
    <DeleteContent
      onDelete={onDelete}
      error={error}
      isLoading={isLoading}
      setOpen={setOpen}
    />
  );

  return isDesktop ? (
    <DeleteDialog open={open} setOpen={setOpen} isDisabled={isDisabled}>
      {content}
    </DeleteDialog>
  ) : (
    <DeleteDrawer open={open} setOpen={setOpen} isDisabled={isDisabled}>
      {content}
    </DeleteDrawer>
  );
};
