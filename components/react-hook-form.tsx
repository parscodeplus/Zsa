'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useServerAction } from 'zsa-react';
import { Categries } from '@/actions/actions';
import MultipleSelector, {
  MultipleSelectorRef,
  Option,
} from '@/components/ui/multiple-selector';
import React, { useEffect, useMemo, useState } from 'react';
import { toast } from './ui/use-toast';

const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
});
const FormSchema = z.object({
  frameworks: z.array(optionSchema).min(1),
});

const OPTIONS: Option[] = [
  { label: 'nextjs', value: 'nextjs' },
  { label: 'React', value: 'react' },
  { label: 'Remix', value: 'remix' },
  { label: 'Vite', value: 'vite' },
  { label: 'Nuxt', value: 'nuxt' },
  { label: 'Vue', value: 'vue' },
  { label: 'Svelte', value: 'svelte' },
  { label: 'Angular', value: 'angular' },
  { label: 'Ember', value: 'ember', disable: true },
  { label: 'Gatsby', value: 'gatsby', disable: true },
  { label: 'Astro', value: 'astro' },
];
export function ReactHookForm() {
  const { isPending, execute, data } = useServerAction(Categries);
  // const { isPending, execute, data, error } =
  //   useServerAction(Categries);
const [categores, setCategores] = useState<Option[]>([])
  const ref = React.useRef<MultipleSelectorRef>(null);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
   
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [data, err] = await execute() 
        // toast({
        //        title: 'Your ref data',
        //        description: (
        //          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        //            <code className="text-white">
        //              {JSON.stringify(data, null, 2)}
        //            </code>
        //          </pre>
        //        ),
        //      });
       if (!err) setCategores(data)
      } catch (error) {
       
      }
    };

    fetchData();
  }, [execute]);
  // useMemo(async () => {
  //     const [data, err] = await execute() 
  //      toast({
  //             title: 'Your ref data',
  //             description: (
  //               <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
  //                 <code className="text-white">
  //                   {JSON.stringify(data, null, 2)}
  //                 </code>
  //               </pre>
  //             ),
  //           });
  //     if (!err) setCategores(data)
  //   }
  
  // , [execute])
 
  async function onSubmit(frm: z.infer<typeof FormSchema>) {
    const [data, err] = await execute();

    // if (err) {
    //   // show a toast or something
    //   return;
    // }

    //form.reset({ name: '' });
  }

  return (
  
    <Card className='not-prose'>
      <CardHeader>
        <CardTitle>Form Example</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col gap-4'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name="frameworks"
             render={({ field }) => (
            <FormItem>
              <FormLabel>Frameworks</FormLabel>
              <FormControl>
                <MultipleSelector
                  {...field}
                  disabled={isPending}
                  options={categores}
                  defaultOptions={categores}
                  hidePlaceholderWhenSelected
                  placeholder="Select frameworks you like..."
                  emptyIndicator={
                    <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                      no results found.
                    </p>
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
            />
            <Button disabled={isPending} type='submit' className='w-full'>
              {/* {isPending ? "Saving..." : "Save"} */} save
            </Button>
          </form>
        </Form>
        {/* {data && <div>Message: {data}</div>} */}
        {/* {error && <div>Error: {JSON.stringify(error.fieldErrors)}</div>} */}
      </CardContent>
    </Card>
  );
}
