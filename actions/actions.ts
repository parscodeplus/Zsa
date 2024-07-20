'use server';
import { createServerAction } from 'zsa';
import z from 'zod';
import prisma from '@/libs/prisma';
import { Category, Option, User, UserGroup } from '@/types';
import { serviceSchema } from '@/schemas/serviceSchema';
import { durationSchema } from '@/schemas/durationSchema';
import { providerSchema } from '@/schemas/providerSchema';
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createSuggestedService(formData: FormData) {
  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const categoryId = formData.get("categoryId")?.toString();

  if (!name || !description || !categoryId) {
    return;
  }

  const newTask = await prisma.suggestedService.create({
    data: {
      name: name,
      description: description,
      categoryId:parseInt(categoryId)
    },
  });

  redirect("/");
}

export async function removeSuggestedService(formData: FormData) {
  "use server";
  const suggestedServiceId = formData.get("id")?.toString();

  if (!suggestedServiceId) {
    return;
  }

  await prisma.suggestedService.delete({
    where: {
      id: parseInt(suggestedServiceId),
    },
  });

  revalidatePath("/");
}

export async function updateSuggestedService(formData: FormData) {
  const id = formData.get("id")?.toString();
  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const categoryId = formData.get("categoryId")?.toString();

  if (!id || !name || !description || !categoryId) {
    return;
  }

  await prisma.suggestedService.update({
    where: {
      id: parseInt(id),
    },
    data: {
      name: name,
      description: description,
      categoryId: parseInt(categoryId),
    }
  });
  
  redirect("/");
}
export async function GetCategory({
  search,
  offset = 0,
  limit = 20,
}: {
  search?: string | undefined
  offset?: number
  limit?: number
}) {
  try {
    const data = await prisma.category.findMany({
      where: { name: { contains: search } },
      skip: offset,
      take: limit,
    })
  
    const totalCount = await prisma.category.count({
      where: { name: { contains: search } },
    })
    const totalPages = Math.ceil(totalCount / limit)
  
    return { data, totalCount, totalPages }
  } catch (error) {
    return {
      message: 'Database Error: Failed to Select Category.',
    };
  }
 
}
export const InsertCategory = createServerAction()
  .input(
    z.object({
      name: z.string(),
      description: z.string(),
    }),
  )
  .handler(async ({ input }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 50));
      const category = await prisma.category.create({
        data: { name: input.name, description: input.description },
      });
      return category;
    } catch (error) {
      console.error('InsertCategory error:', error);
      throw new Error('Failed to insert category');
    }
  });

export const FindCategory = createServerAction()
  .input(
    z.object({
      name: z.string(),
    }),
  )
  .handler(async ({ input }) => {
    try {
      const category = await prisma.category.findUnique({
        where: { name: input.name },
      });
      return !!category;
    } catch (error) {
      console.error('FindCategory error:', error);
      throw new Error('Failed to find category');
    }
  });

  export const removeCategory = createServerAction()
  .input(
    z.object({
      id: z.number(),
    }),
  )
  .handler(async ({ input }) => {
    try {
      const category = await prisma.category.delete({
        where: { id: input.id },
      });
      return !!category;
    } catch (error) {
      console.error('remove Category error:', error);
      throw new Error('Remove to find category');
    }
  });

const findIdDuration = async (
  title: string,
): Promise<[number, null] | [null, z.ZodError]> => {
  const parsed = durationSchema.safeParse({ title });
  if (!parsed.success) {
    return [null, parsed.error];
  }

  try {
    const duration = await prisma.duration.findUnique({
      where: { title: parsed.data.title },
    });

    return duration ? [duration.id, null] : [0, null];
  } catch (error: any) {
    console.error('findIdDuration error:', error);
    return [null, new z.ZodError([error])];
  }
};

export const InsertService = createServerAction()
  .input(serviceSchema)
  .handler(async ({ input }) => {
    try {
      const servicePromises = input.services.map(async (item) => {
        await new Promise((resolve) => setTimeout(resolve, 50));
        parseInt(item.duration) &&
          (await prisma.service.create({
            data: {
              name: item.name.trim(),
              price: parseFloat(item.price),
              durationId: parseInt(item.duration),
            },
          }));
      });
      return servicePromises;
      //await Promise.all(servicePromises);
    } catch (error) {
      console.error('InsertService error:', error);
      throw new Error('Failed to insert service');
    }
  });
export const InsertProvider = createServerAction()
  .input(providerSchema)
  .handler(async ({ input }) => {
    try {
      const providerPromises = input.providers.map(async (item) => {
        //await new Promise((resolve) => setTimeout(resolve, 50));

        await prisma.provider.create({
          data: {
            name: item.name.trim(),
            maxCapacity: item.maxCapacity,
            description: '',
            image: '',
            phone: '',
            email: '',
            bookingLink: '',
          },
        });
      });
      return providerPromises;
    } catch (error) {
      console.error('InsertProvider error:', error);
      throw new Error('Failed to insert provider');
    }
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
    try {
      const category = await prisma.category.findMany({
        select: { name: true, description: true },
        skip: input.skip * input.page,
        take: input.limit,
      });
      return category;
    } catch (error) {
      console.error('FindCategoryForInfiniteScroll error:', error);
      throw new Error('Failed to find categories for infinite scroll');
    }
  });

export const FetchCategries = createServerAction()
  .retry({
    maxAttempts: 3,
    delay: (currentAttempt, err) => {
      return 1000 * currentAttempt;
    },
  })
  .input(
    z.object({
      search:z.string().optional(),
      offset: z.number().default(0),
      limit: z.number().default(5),
    }),
  )
  .handler(async ({ input }) => {
    try {
      const fetchCategory: Category[] = await prisma.category.findMany({
        where: { name: { contains: input.search } },

        skip: input.offset,
        take: input.limit,

        orderBy: {
          id: 'asc',
        },
      });
      const totalCount = await prisma.category.count({
        where: { name: { contains: input.search } },
      })
      const totalPages = Math.ceil(totalCount / input.limit)
      return { fetchCategory, totalCount, totalPages }
    } catch (error) {
      console.error('Categries error:', error);
      throw new Error('Failed to fetch categories');
    }
  });


export const FetchUserGroup = createServerAction()
.retry({
  maxAttempts: 3,
  delay: (currentAttempt, err) => {
    return 1000 * currentAttempt;
  },
})
.input(
  z.object({
    search:z.string().optional(),
    offset: z.number().default(0),
    limit: z.number().default(5),
  }),
)
.handler(async ({ input }) => {
  try {
    const fetchUserGroup: UserGroup[] = await prisma.userGroup.findMany({
      where: { name: { contains: input.search } },

      skip: input.offset,
      take: input.limit,

      orderBy: {
        id: 'asc',
      },
    });
    const totalCount = await prisma.userGroup.count({
      where: { name: { contains: input.search } },
    })
    const totalPages = Math.ceil(totalCount / input.limit)
    return { fetchUserGroup, totalCount, totalPages }
  } catch (error) {
    console.error('Categries error:', error);
    throw new Error('Failed to fetch categories');
  }
});


export const FetchUsers = createServerAction()
  .retry({
    maxAttempts: 3,
    delay: (currentAttempt, err) => {
      return 1000 * currentAttempt;
    },
  })
  .handler(async () => {
    try {
      const users: User[] = await prisma.user.findMany();

      return users;
    } catch (error) {
      console.error('Users error:', error);
      throw new Error('Failed to fetch Users');
    }
  });

export const FetchSuggestedService = createServerAction()
  .retry({
    maxAttempts: 3,
    delay: (currentAttempt, err) => {
      return 1000 * currentAttempt;
    },
  })
  .input(
    z.object({
      categoryId: z.number(),
    }),
  )
  .handler(async ({ input }) => {
    try {
      const result = await prisma.suggestedService.findMany({
        select: { name: true, id: true },
        where: {
          categoryId: input.categoryId,
        },
      });

      const data: Option[] = result.map((item) => ({
        label: item.name,
        value: item.id.toString(),
      }));
      console.log(data);

      return data;
    } catch (error) {
      console.error('Categries error:', error);
      throw new Error('Failed to fetch categories');
    }
  });

export const InsertDuration = createServerAction()
  .input(durationSchema)
  .handler(async ({ input }) => {
    try {
      const result = await prisma.duration.create({
        data: {
          title: input.title,
        },
      });

      return result;
    } catch (error) {
      console.error('InsertDuration error:', error);
      throw new Error('Failed to insert duration');
    }
  });

export const FetchDuration = createServerAction()
  .retry({
    maxAttempts: 3,
    delay: (currentAttempt, err) => {
      return 1000 * currentAttempt;
    },
  })
  .handler(async () => {
    try {
      const duration = await prisma.duration.findMany({
        select: { title: true, id: true },
      });

      const result: Option[] = duration.map((item) => ({
        label: item.title,
        value: item.id.toString(),
      }));

      return result;
    } catch (error) {
      console.error('Duration error:', error);
      throw new Error('Failed to fetch durations');
    }
  });
