// import { PrismaClient } from '@prisma/client'
//import { PrismaClient } from '@prisma/client/edge'
import { PrismaClient } from '../prisma/node_modules/.prisma/client'
const prismaClientSingleton = () => {
  return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const Prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default Prisma;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = Prisma;