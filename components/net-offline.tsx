'use client';
import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import useNetworkStatus from '@/hook/useNetworkStatus';

const NetworkOffline = () => {
  const { isOnline } = useNetworkStatus();
  const [open, setOpen] = React.useState<boolean>(!isOnline);

  React.useEffect(() => {
    setOpen(!isOnline);
  }, [isOnline]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='rounded-lg'>
        <DialogHeader>
          <DialogTitle>?????? ??????? ??? ??</DialogTitle>
          <DialogDescription>
            ???? ????? ??????? ??? ?? ????? ????.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default NetworkOffline;
