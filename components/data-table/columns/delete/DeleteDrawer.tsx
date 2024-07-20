import React from 'react';
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
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

interface DeleteDrawerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  isDisabled: boolean;
  children: React.ReactNode;
}

export const DeleteDrawer: React.FC<DeleteDrawerProps> = ({
  open,
  setOpen,
  isDisabled,
  children,
}) => {
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant='ghost' disabled={isDisabled}>
          <Trash2 className='h-4 w-4' />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        {children}
      </DrawerContent>
    </Drawer>
  );
};
