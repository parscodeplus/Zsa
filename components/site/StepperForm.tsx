'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { ScrollArea } from '@/components/ui/scroll-area';

import { Step, Stepper, useStepper } from '../stepper';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { toast } from '../ui/use-toast';

import AddProvider from '../provider-add-step/AddProvider'; // Ensure correct import path
import AddService from '../services-duration-category/AddService'; // Ensure correct import path
import {WorkSchedule} from '../working-time-company/WorkSchedule'; '../working-time-company/WorkSchedule';
import StepContent from './StepContent';

const steps = [
  { label: 'ساعات کاری', description: 'Description 1', optional: true },
  { label: 'خدمات', description: 'Description 2' },
  { label: 'خدمات', description: 'Description 3' },
  { label: 'step4', description: 'Description 4', optional: true },
  { label: 'step5', description: 'Description 5', optional: true },
];

export default function StepperForm() {
  return (
    <div className='flex w-full flex-col gap-4'>
      <Stepper
        orientation='horizontal'
        variant='circle-alt'
        initialStep={0}
        steps={steps}
      >
        {steps.map((stepProps, index) => {
          const StepComponent =
            index === 0
              ? WorkSchedule
              : index === 1 || index === 3
                ? AddProvider
                : AddService;

          return (
            <Step key={stepProps.label} {...stepProps}>
              <StepContent
                index={index}
              >
                {/* <ScrollArea dir='rtl' className='h-[350px] min-w-max rounded-md border'> */}
                  <StepComponent />
                {/* </ScrollArea> */}
              </StepContent>
            </Step>
          );
        })}
        <MyStepperFooter />
      </Stepper>
    </div>
  );
}

function StepperFormActions() {
  const {
    prevStep,
    resetSteps,
    isDisabledStep,
    hasCompletedAllSteps,
    isLastStep,
  } = useStepper();

  return (
    <div className='flex w-full justify-end gap-2'>
      {hasCompletedAllSteps ? (
        <Button size='sm' type='button' onClick={resetSteps}>
          Reset
        </Button>
      ) : (
        <>
          <Button
            disabled={isDisabledStep}
            onClick={prevStep}
            size='sm'
            variant='secondary'
            type='button'
          >
            Prev
          </Button>
          <Button size='sm' type='submit'>
            {isLastStep ? 'Finish' : 'Next'}
          </Button>
        </>
      )}
    </div>
  );
}

function MyStepperFooter() {
  const { activeStep, resetSteps, steps } = useStepper();

  if (activeStep !== steps.length) {
    return null;
  }

  return (
    <div className='flex items-center justify-end gap-2'>
      <Button onClick={resetSteps}>Reset Stepper with Form</Button>
    </div>
  );
}
