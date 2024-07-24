'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { X, Settings } from 'lucide-react';
import { Sheet, SheetClose, SheetContent, SheetFooter } from "@/components/ui/sheet";
import { Separator } from '@/components/ui/separator';
import OpenSheetButton from './OpenSheetButton';
import { Button } from './ui/button';
const SHEET_SIDES = ["top", "right", "bottom", "left"] as const
 
type SheetSide = (typeof SHEET_SIDES)[number]
 
const App = () => {
  const [enabled, setEnabled] = React.useState(false);
  const router = useRouter();

  const handleToggle = () => {
    setEnabled(!enabled);
  };

  const handleSettingsClick = () => {
    router.push('/settings'); // Replace '/settings' with your desired route
  };

  return (
    <div>
      <Sheet key={3}>
        <OpenSheetButton />
        <SheetContent className='w-full'>
          <div className="flex items-center space-x-2">
            <X className="h-6 w-6" />
            <h2 className="text-lg font-semibold">Title</h2>
          </div>
          <Separator className="my-4" />
          <div className="flex space-x-2">
            <button
              onClick={handleToggle}
              className={cn(
                'px-4 py-2 rounded',
                enabled ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
              )}
            >
              {enabled ? 'Disable' : 'Enable'}
            </button>
            {enabled && (
              <button
                onClick={handleSettingsClick}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                <Settings className="h-4 w-4" />
                Settings
              </button>
            )}
          </div>
          <Separator className="my-4" />
          <div className="overflow-auto max-h-40">
            <p>
              This is some scrollable text. If the content here is long, it will be scrollable. You can add as much content as you like here and it will remain scrollable within this container. This allows you to have a fixed height section with scrollable content inside your sheet.
            </p>
          </div>
          <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Save changes</Button>
              </SheetClose>
            </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default App;
