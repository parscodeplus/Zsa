import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from '@/components/ui/use-toast';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { LoadingButton } from '@/components/ui/loading-button';
import { DrawerClose, DrawerFooter } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';

interface UpdateFormProps {
  rowData: Record<string, any>;
  isDisabled: boolean;
  onSubmit: (data: Record<string, any>) => Promise<void>;
}

export const UpdateForm: React.FC<UpdateFormProps> = ({
  rowData,
  isDisabled,
  onSubmit,
}) => {
  const formSchema = z.object(
    Object.keys(rowData).reduce(
      (schema, key) => {
        if (key !== 'id') {
          if (typeof rowData[key] === 'boolean') {
            schema[key] = z.boolean();
          } else if (typeof rowData[key] === 'number') {
            schema[key] = z.number();
          } else if (typeof rowData[key] === 'object') {
            schema[key] = z.any();
          } else {
            schema[key] = z.string().optional();
          }
        }
        return schema;
      },
      {} as Record<string, z.ZodTypeAny>,
    ),
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: rowData,
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    await onSubmit(data);
  };

  const renderInputField = (key: string, value: any) => {
    if (typeof value === 'boolean') {
      return (
        <Switch
          checked={value}
          onCheckedChange={(checked) =>
            form.setValue(key as keyof z.infer<typeof formSchema>, checked)
          }
          disabled={isDisabled}
          aria-readonly={isDisabled}
        />
      );
    } else if (typeof value === 'number') {
      return (
        <Input
          type='number'
          {...form.register(key as keyof z.infer<typeof formSchema>, {
            valueAsNumber: true,
          })}
          disabled={isDisabled}
        />
      );
    } else if (typeof value === 'object') {
      return (
        <Textarea
          value={JSON.stringify(value)}
          {...form.register(key as keyof z.infer<typeof formSchema>)}
          onChange={(e) => {
            try {
              const parsedValue = JSON.parse(e.target.value);
              form.setValue(
                key as keyof z.infer<typeof formSchema>,
                parsedValue,
              );
            } catch (err) {
              console.error('Invalid JSON');
            }
          }}
          disabled={isDisabled}
        />
      );
    } else {
      return (
        <Input
          type='text'
          {...form.register(key as keyof z.infer<typeof formSchema>)}
          disabled={isDisabled}
        />
      );
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className='w-full space-y-6'
      >
        {Object.keys(rowData).map((key) => {
          if (key === 'id') return null;
          return (
            <FormField
              key={key}
              control={form.control}
              name={key as keyof z.infer<typeof formSchema>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{key}</FormLabel>
                  <FormControl>
                    {renderInputField(key, field.value)}
                  </FormControl>
                  <FormDescription>Update the {key}.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          );
        })}
        <DrawerFooter>
          <LoadingButton
            variant='default'
            type='submit'
            loading={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? 'Updating...' : 'Update'}
          </LoadingButton>
          <DrawerClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </form>
    </Form>
  );
};
