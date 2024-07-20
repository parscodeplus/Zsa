import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';

interface UpdateDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  isDisabled: boolean;
  children: React.ReactNode;
}

export const UpdateDialog: React.FC<UpdateDialogProps> = ({ open, setOpen, isDisabled, children }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='ghost' disabled={isDisabled}>
          <Pencil className='h-4 w-4' />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>{children}</DialogContent>
    </Dialog>
  );
};
