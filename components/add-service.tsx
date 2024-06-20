"use client"
import React, { useState } from 'react';
import { Eraser, PackagePlus } from 'lucide-react';
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
    if (inputs.length > 1) {
      setInputs((prevInputs) => prevInputs.filter((input) => input.id !== id));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const updatedInputs = inputs.map((input) =>
      input.id === id ? { ...input, value: e.target.value } : input
    );
    setInputs(updatedInputs);
  };

  return (
    <div className='flex flex-col items-center justify-center gap-4 md:gap-8'>
      {inputs.map((input, index) => (
        <div key={input.id} className='flex flex-col md:flex-row gap-2 items-center'>
          <span className='text-gray-600'>{index + 1}</span>
          <Input
            type={input.type}
            value={input.value}
            placeholder='Enter value'
            onChange={(e) => handleChange(e, input.id)}
            className='rounded border px-4 py-2 leading-tight text-gray-700 focus:outline-none focus:shadow-outline'
          />
          <div className='flex gap-2'>
            <Input
              type='text'
              placeholder='Enter value'
              className='w-full md:w-24 rounded border px-4 py-2 leading-tight text-gray-700 focus:outline-none focus:shadow-outline'
            />
            <Input
              type='text'
              placeholder='Enter value'
              className='w-full md:w-36 rounded border px-4 py-2 leading-tight text-gray-700 focus:outline-none focus:shadow-outline'
            />
            <Button
              variant='destructive'
              className='rounded-full'
              onClick={() => removeInput(input.id)}
            >
              <Eraser />
            </Button>
          </div>
        </div>
      ))}

      <Button
        onClick={addInput}
        variant='default'
        className='px-4 py-2 rounded bg-blue-500 font-bold text-white hover:bg-blue-700'
      >
        <PackagePlus />
        Add Input
      </Button>
    </div>
  );
};

export default AddService;
