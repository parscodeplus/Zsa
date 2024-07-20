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
import { Pencil } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { LoadingButton } from '@/components/ui/loading-button';

interface UpdateDrawerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  isDisabled: boolean;
  children: React.ReactNode;
}

export const UpdateDrawer: React.FC<UpdateDrawerProps> = ({
  open,
  setOpen,
  isDisabled,
  children,
}) => {
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant='ghost' disabled={isDisabled}>
          <Pencil className='h-4 w-4' />
        </Button>
      </DrawerTrigger>
      <DrawerContent className='mx-auto  p-6'>
        <DrawerHeader>
          <DrawerTitle>Update</DrawerTitle>
          <DrawerDescription>
            Update the details of the selected item.
          </DrawerDescription>
        </DrawerHeader>
        <ScrollArea className='h-[300px] w-full rounded-md border p-6'>
          {children}
        </ScrollArea>
       
      </DrawerContent>
    </Drawer>
  );
};
