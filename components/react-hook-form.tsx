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
import { FetchCategries } from '@/actions/actions';
import MultipleSelector, {
  MultipleSelectorRef,
  Option,
} from '@/components/ui/multiple-selector';
import React, { useEffect, useMemo, useState } from 'react';
import { toast } from './ui/use-toast';
import { Category } from '@/types';

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
  const { isPending, execute, data } = useServerAction(FetchCategries);
  // const { isPending, execute, data, error } =
  //   useServerAction(Categries);
  const [categores, setCategores] = useState<Category[]>([]);
  const ref = React.useRef<MultipleSelectorRef>(null);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [data, err] = await execute({limit:5,offset:0});

        if (!err) setCategores(data.fetchCategory);
      } catch (error) {}
    };

    fetchData();
  }, [execute]);

  async function onSubmit(frm: z.infer<typeof FormSchema>) {
    // const [data, err] = await execute();
    toast({
      title: 'Your ref data',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>
            {JSON.stringify(frm.frameworks, null, 2)}
          </code>
        </pre>
      ),
    });
    // if (err) {
    //   // show a toast or something
    //   return;
    // }

    //form.reset({ name: '' });
  }

  return (
    <section className='w-full py-12 md:py-24 lg:py-32'>
      <div className='container px-4 md:px-6'>
        <div className='flex flex-col items-center justify-center space-y-4 text-center'>
          <Card className='not-prose'>
            <CardHeader>
              <CardTitle>Form Example</CardTitle>
            </CardHeader>
            <CardContent className='flex flex-col gap-4'>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className='space-y-8'
                >
                  <FormField
                    control={form.control}
                    name='frameworks'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Frameworks</FormLabel>
                        <FormControl>
                          <MultipleSelector
                            {...field}
                            disabled={isPending}
                            options={categores.map((item)=> ({
                              label: item.name,
                              value: item.id.toString(),
                            }))}
                            
                            defaultOptions={categores.map((item)=> ({
                              label: item.name,
                              value: item.id.toString(),
                            }))}
                            hidePlaceholderWhenSelected
                            loadingIndicator={<div>Loading...</div>}
                            placeholder='Select frameworks you like...'
                            emptyIndicator={
                              <p className='text-center text-lg leading-10 text-gray-600 dark:text-gray-400'>
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
        </div>
      </div>
    </section>
  );
}
