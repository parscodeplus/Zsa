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
  const [open, setopen] = React.useState<boolean>(isOnline)

  return (
    <Dialog open={open} onOpenChange={setopen}>
      <DialogContent className='rounded-lg'>
        <DialogHeader>
          <DialogTitle>وضعیت اتصال به اینترنت </DialogTitle>
          <DialogDescription>
            لطفاً از اتصال به اینترنت مطمئن شوی
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default NetworkOffline;
