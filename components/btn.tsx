'use client';
import { InsertCategory, FindCategory } from '@/actions/actions';
import { useServerAction } from 'zsa-react';
import { Button } from '@/components/ui/button';
import { Loader2, CheckIcon, CircleAlert } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import DotPattern from "@/components/magicui/dot-pattern";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useState } from 'react';
import { ToastAction } from './ui/toast';
import { cn } from '@/lib/utils';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputWithIcon } from './ui/InputWithIcon';
import { Vortex } from './ui/vortex'; // https://ui.aceternity.com/
import withLazyLoad from './withLazyLoad';
const LazyComponentWithLazyLoad = withLazyLoad(Vortex);
const FormSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: 'نام باید بیش از سه کاراکتر باشد.',
    })
    //.regex(/^[a-zA-Z]+$/, { message: 'Name must only contain English letters' })
    .refine(
      async (value) => {
        const [data, err] = await FindCategory({
          name: value,
        });

        if (!err) return !data;
      },
      {
        message: 'این نام وجود دارد ',
      },
    ),
});

export default function Btn() {
  const { toast } = useToast();
  const [name, setName] = useState("")
  const { isPending, execute, data } = useServerAction(InsertCategory);
  const [result, setResult] = useState<boolean | null>(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
    },
  });
  function onSubmit(data: z.infer<typeof FormSchema>) {
    data && setResult(false);
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }
  return (
     
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='name'
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel>category</FormLabel>
                <FormControl>
                  <div className='relative'>
                    <InputWithIcon
                      endIcon= {!result ? (
                        <CheckIcon className='h-4 w-4 animate-bounce text-green-700' />
                      ) : (
                        <CircleAlert className='h-4 w-4 animate-pulse text-red-700' />
                      )}
                      placeholder='name'
                      className='block w-full p-4 ps-10'
                      onChange={(events)=>{
                        events.preventDefault()
                       setName(events.target.value)
 
                     }}
                     {...fieldProps}

                      // onChange={async (e) => {
                      //   e.preventDefault();
                      //   const [data, err] = await FindCategory({
                      //     name: e.target.value,
                      //   });
                      //   if (!err) setResult(data);
                      // }}
                    />

                    {/* <div className='pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3'>
                      {!result ? (
                        <CheckIcon className='h-4 w-4 animate-bounce text-green-700' />
                      ) : (
                        <CircleAlert className='h-4 w-4 animate-pulse text-red-700' />
                      )}
                    </div> */}
                  </div>
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit'>Submit</Button>
        </form>
      </Form>

    <div className="w-[calc(100%-4rem)] mx-auto rounded-md  h-[30rem] overflow-hidden">
      <Vortex
        backgroundColor="black"
        className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
      >
        <h2 className="text-white text-2xl md:text-6xl font-bold text-center">
          The hell is this?
        </h2>
        <p className="text-white text-sm md:text-2xl max-w-xl mt-6 text-center">
          This is chemical burn. It&apos;ll hurt more than you&apos;ve ever been
          burned and you&apos;ll have a scar.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition duration-200 rounded-lg text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset]">
            Order now
          </button>
          <button className="px-4 py-2  text-white ">Watch trailer</button>
        </div>
      </Vortex>
    </div>


      <Button
        disabled={isPending}
        onClick={async (e) => {
          const [data, err] = await execute({
            name: name,
            description: '...',
          });

          if (err) {
            toast({
              variant: 'destructive',
              title: 'ا در ثبت کاتالوگ  ',
              description: 'ثبت ای اتفاق افتاد است     ' + err.message,
              //action: <ToastAction altText="Try again">Try again</ToastAction>,
            });

            return;
          }

          toast({
            className: cn(
              'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4',
            ),
            title: 'ثبت کاتالوگ ',
            variant: 'success',
            description: (
              <div className='flex items-center'>
                <CheckIcon className='mr-2' />
                <span className='first-letter:capitalize'>
                  ثبت با موفقیت انجام شد
                </span>
              </div>
            ),
          });
        }}
      >

        {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
        Invoke action
      </Button>
      <p>Count:</p>
      <div>{isPending ? 'saving...' : ''}</div>
      <div className="relative flex h-full w-full max-w-[32rem] items-center justify-center overflow-hidden rounded-lg border bg-background p-20 md:shadow-xl">
      <p className="z-10 whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter text-black dark:text-white">
        Dot Patter
      </p>
      <DotPattern
      
        className={cn(
          "[mask-image:radial-gradient(200px_circle_at_center,white,transparent)]",
        )}
      />
      <LazyComponentWithLazyLoad />
    </div>
    </main>
  );
}
