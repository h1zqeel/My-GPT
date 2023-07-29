import { cacheExtension } from '@/utils/cache';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const xPrisma = prisma.$extends({
	query: {
		chat:{
			findMany: cacheExtension
		},
		message:{
			findMany: cacheExtension
		},
		user:{
			findUnique: cacheExtension
		}
	}
});

export default xPrisma;
