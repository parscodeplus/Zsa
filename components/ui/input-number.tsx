'use client';
import * as React from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

interface InputNumberProps extends React.InputHTMLAttributes<HTMLInputElement> {
  min?: number;
  max?: number;
}

const InputNumber = React.forwardRef<HTMLInputElement, InputNumberProps>(
  ({ className, min = 1, max = 50, value: initialValue = 3, ...props }, ref) => {
    const [value, setValue] = React.useState<number>(Number(initialValue));

    const handleIncrement = () => {
      if (value < max) {
        setValue((prevValue) => prevValue + 1);
      }
    };

    const handleDecrement = () => {
      if (value > min) {
        setValue((prevValue) => prevValue - 1);
      }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = Number(event.target.value);
      if (newValue >= min && newValue <= max) {
        setValue(newValue);
      }
    };

    return (
      <div className='mx-auto max-w-xs'>
     
        <div className='relative flex max-w-[11rem] items-center'>
          <button
            type='button'
            id='decrement-button'
            onClick={handleDecrement}
            className='h-11 rounded-s-lg border border-gray-300 bg-gray-100 p-3 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700'
          >
            <svg
              className='h-3 w-3 text-gray-900 dark:text-white'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 18 2'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M1 1h16'
              />
            </svg>
          </button>
          <Input
            type='number'
            disabled
            id='bedrooms-input'
            ref={ref}
            className={cn(
              'block h-11 w-full border-x-0 border-gray-300 bg-gray-50 py-2.5 text-center text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
              className,
            )}
            value={value}
            onChange={handleChange}
            min={min}
            max={max}
            {...props}
          />
          <button
            type='button'
            id='increment-button'
            onClick={handleIncrement}
            className='h-11 rounded-e-lg border border-gray-300 bg-gray-100 p-3 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700'
          >
            <svg
              className='h-3 w-3 text-gray-900 dark:text-white'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 18 18'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M9 1v16M1 9h16'
              />
            </svg>
          </button>
        </div>
   
      </div>
    );
  },
);
InputNumber.displayName = 'InputNumber';

export { InputNumber };
