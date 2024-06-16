'use server';
import { createServerAction } from 'zsa';
import z, { boolean } from 'zod';
import prisma from '@/libs/prisma';

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
