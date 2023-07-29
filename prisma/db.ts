import { cacheExtension, cacheInvalidationExtension } from '@/utils/cache';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const xPrisma = prisma.$extends({
	query: {
		chat:{
			findMany: cacheExtension,
			findUnique: cacheExtension,
			create: cacheInvalidationExtension
		},
		message:{
			findMany: cacheExtension,
			create: cacheInvalidationExtension
		},
		user:{
			findUnique: cacheExtension,
			create: cacheInvalidationExtension
		}
	}
});

export default xPrisma;
