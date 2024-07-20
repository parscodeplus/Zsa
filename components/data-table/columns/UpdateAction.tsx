"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Pencil } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { LoadingButton } from "@/components/ui/loading-button";
import { Textarea } from "@/components/ui/textarea";

async function updateDataOnServer(data: any) {
  const response = await fetch('/api/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to update data on server');
  }

  return response.json();
}

interface UpdateActionProps<T extends Record<string, any>> {
  rowData: T;
  isDisabled: boolean;
  handleUpdate: (data: T) => void;
}

export const UpdateAction = <T extends Record<string, any>>({ rowData, handleUpdate, isDisabled }: UpdateActionProps<T>) => {
  const formSchema = z.object(
    Object.keys(rowData).reduce((schema, key) => {
      if (key !== "id") {
        if (typeof rowData[key] === "boolean") {
          schema[key] = z.boolean();
        } else if (typeof rowData[key] === "number") {
          schema[key] = z.number();
        } else if (typeof rowData[key] === "object") {
          schema[key] = z.any();
        } else {
          schema[key] = z.string().optional();
        }
      }
      return schema;
    }, {} as Record<string, z.ZodTypeAny>)
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: rowData,
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await updateDataOnServer(data);
      toast({
        title: "Data updated successfully",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error updating data",
        description: error.message,
      });
    }
  };

  const renderInputField = (key: string, value: any) => {
    if (typeof value === "boolean") {
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
    } else if (typeof value === "number") {
      return (
        <Input
          type="number"
          {...form.register(key as keyof z.infer<typeof formSchema>, { valueAsNumber: true })}
          disabled={isDisabled}
        />
      );
    } else if (typeof value === "object") {
      return (
        <Textarea
          value={JSON.stringify(value)}
          {...form.register(key as keyof z.infer<typeof formSchema>)}

          onChange={(e) => {
            try {
              const parsedValue = JSON.parse(e.target.value);
              form.setValue(key as keyof z.infer<typeof formSchema>, parsedValue);
            } catch (err) {
              // Handle JSON parsing error
              console.error("Invalid JSON");
            }
          }}
          disabled={isDisabled}
        />
      );
    } else {
      return (
        <Input
          type="text"
          {...form.register(key as keyof z.infer<typeof formSchema>)}
          disabled={isDisabled}
        />
      );
    }
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost" disabled={isDisabled}>
          <Pencil className="h-4 w-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Update</DrawerTitle>
            <DrawerDescription>
              Update the details of the selected item.
            </DrawerDescription>
          </DrawerHeader>
          <ScrollArea className="h-[300px] w-full max-w-sm rounded-md border p-4">
            <div className="p-4 pb-0">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                  {Object.keys(rowData).map((key) => {
                    if (key === "id") return null;
                    return (
                      <FormField
                        key={key}
                        control={form.control}
                        name={key as keyof z.infer<typeof formSchema>}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{key}</FormLabel>
                            <FormControl>{renderInputField(key, field.value)}</FormControl>
                            <FormDescription>Update the {key}.</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    );
                  })}
                  <DrawerFooter>
                    <LoadingButton variant="default" type="submit" loading={form.formState.isSubmitting}>
                      {form.formState.isSubmitting ? "Updating..." : "Update"}
                    </LoadingButton>
                    <DrawerClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </form>
              </Form>
            </div>
          </ScrollArea>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
