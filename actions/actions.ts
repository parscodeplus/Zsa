'use server';
import { createServerAction } from 'zsa';
import z, { boolean, string } from 'zod';
import prisma from '@/libs/prisma';
import {Option} from "@/types"
import { category } from '@prisma/client';
export const incrementNumberAction = createServerAction()
  .input(
    z.object({
      number: z.number(),
    }),
  )
  .handler(async ({ input }) => {
    // Sleep for .5 seconds
    await new Promise((resolve) => setTimeout(resolve, 500));
    // Increment the input number by 1
    return input.number + 1;
  });

export const InsertCategory = createServerAction()
  .input(
    z.object({
      name: z.string(),
      description: z.string(),
    }),
  )
  .handler(async ({ input }) => {
    await new Promise((resolve) => setTimeout(resolve, 50));

    const category = await prisma.category.create({
      data: { name: input.name, description: input.description },
    });
    return category;
  });

export const FindCategory = createServerAction()
  .input(
    z.object({
      name: z.string(),
    }),
  )
  .handler(async ({ input }) => {
    const category = await prisma.category.findUnique({
      where: { name: input.name },
    });
    if (category) return true;
    else return false;
  });

export const FindCategoryForInfiniteScroll = createServerAction()
  .input(
    z.object({
      limit: z.number(),
      skip: z.number(),
      page: z.number(),
    }),
  )
  .handler(async ({ input }) => {
    const category = await prisma.category.findMany({
      select: { name: true, description: true },
      skip: input.skip * input.page,
      take: input.limit,
    });
    return category;
  });

export const Categries = createServerAction().handler(async () => {
  const category = await prisma.category.findMany({
    select: { name: true, id: true },
  });
 
  const data: Option[] = category.map((item) => ({
    label: item.name,
    value: item.id.toString(),
    disable: false
  }));
  
  return data
});

export const produceNewMessage = createServerAction()
  .input(
    z.object({
      name: z.string().min(5),
    }),
    {
      type: 'formData',
    },
  )
  .handler(async ({ input }) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return 'Hello, ' + input.name;
  });
