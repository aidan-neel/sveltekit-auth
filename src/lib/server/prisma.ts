import { PrismaAuth } from '@aaidan5899/prisma-auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()
const prismaAuth = new PrismaAuth(prisma);
export { prisma, prismaAuth };

// Prisma and PrismaAuth exports