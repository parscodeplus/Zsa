'use client';
import { useState } from 'react';
import { Eraser,PackagePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
interface InputItem {
  type: string;
  id: number;
  value: string;
}

const AddService: React.FC = () => {
  const initialInputs: InputItem[] = [
    {
      id: 1,
      type: 'text',
      value: '',
    },
  ];
  const [inputs, setInputs] = useState<InputItem[]>(initialInputs);
  const [inputCount, setInputCount] = useState(1);

  const addInput = () => {
    setInputs((prevInputs) => [
      ...prevInputs,
      {
        id: inputCount + 1,
        type: 'text',
        value: '',
      },
    ]);
    setInputCount((prevCount) => prevCount + 1);
  };

  const removeInput = (id: number) => {
    inputs.length > 1 &&
      setInputs((prevInputs) => prevInputs.filter((input) => input.id !== id));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const updatedInputs = inputs.map((input) => {
      if (input.id === id) {
        return { ...input, value: e.target.value };
      }
      return input;
    });
    setInputs(updatedInputs);
  };

  return (
    <div className='flex flex-col items-center justify-center gap-2'>
      {inputs.map((input, index) => (
        <>
          <div key={input.id} className='flex flex-row gap-1'>
            <span>{index + 1} </span>
            <Input
              //className='focus:shadow-outline block w-full appearance-none rounded border px-4 py-2 leading-tight text-gray-700 shadow focus:outline-none'
              type={input.type}
              value={input.value}
              placeholder='سرویس '
              onChange={(e) => handleChange(e, input.id)}
            />
          
          </div>
          <div className='flex flex-row items-center gap-2'>
            <input
              className='w-[60px] focus:shadow-outline block appearance-none rounded border px-4 py-2 leading-tight text-gray-700 shadow focus:outline-none'
              type={'text'}
              placeholder='مدت زمان'
            />
            <input
              className='w-[100px] focus:shadow-outline block appearance-none rounded border px-4 py-2 leading-tight text-gray-700 shadow focus:outline-none'
              type={'text'}
              placeholder='قیمت  '
            />
              <Button
              variant={'destructive'}
              className='rounded-full'
              //className='rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700'
              onClick={() => removeInput(input.id)}
            >
              <Eraser />
            </Button>
          </div>
        </>
      ))}

      <Button
        onClick={addInput}
        variant={'default'}
        //className='mr-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'
      >
        <PackagePlus />{" خدمات دیگری اضافه کنید "}
      </Button>
      </div>

  );
};

export default AddService;
