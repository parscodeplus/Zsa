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
import { Button } from '../../ui/button';
import { Pencil } from 'lucide-react';
import { useState } from 'react';

interface UpdateActionProps<T> {
  rowData: T;
  isDisabled: boolean;
  handleUpdate: (data: T) => void;
}

export const UpdateAction = <T,>({ rowData, handleUpdate,isDisabled }: UpdateActionProps<T>) => {
  const [formData, setFormData] = useState(rowData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant='ghost' disabled={isDisabled}>
          <Pencil className='h-4 w-4' />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className='mx-auto w-full max-w-sm'>
          <DrawerHeader>
            <DrawerTitle>Update</DrawerTitle>
            <DrawerDescription>
              Update the details of the selected item.
            </DrawerDescription>
          </DrawerHeader>
          <div className='p-4 pb-0'>
            <form>
              {Object.keys(formData as any).map((key) => (
                <div className='mb-4' key={key}>
                  <label className='block text-sm font-medium text-gray-700'>{key}</label>
                  <input
                    type='text'
                    name={key}
                    value={(formData as any)[key] || ''}
                    onChange={handleChange}
                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                  />
                </div>
              ))}
            </form>
          </div>
          <DrawerFooter>
            <Button
              variant={'default'}
              onClick={() => handleUpdate(formData)}
            >
              Update
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
