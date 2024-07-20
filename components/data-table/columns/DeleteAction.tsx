import * as React from 'react';
import { useMediaQuery } from "@/hook/use-media-query";
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Trash2, TriangleIcon } from 'lucide-react';
import { LoadingButton } from '@/components/ui/loading-button';
import { toast } from '@/components/ui/use-toast';

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
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
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

  const dialogContent = (
    <>
      <DialogHeader>
        <DialogTitle>Delete Row</DialogTitle>
        <DialogDescription>Are you sure you want to delete this row?</DialogDescription>
      </DialogHeader>
      {error && (
        <Alert variant='destructive'>
          <TriangleIcon className='h-4 w-4' />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className='mt-3 h-[120px]'></div>
      <LoadingButton variant={'destructive'} onClick={onDelete} loading={isLoading}>
        Delete
      </LoadingButton>
      <Button variant='outline' onClick={() => setOpen(false)}>
        Cancel
      </Button>
    </>
  );

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant='ghost' disabled={isDisabled}>
            <Trash2 className='h-4 w-4' />
          </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>{dialogContent}</DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant='ghost' disabled={isDisabled}>
          <Trash2 className='h-4 w-4' />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
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
            <Button variant='outline'>Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
