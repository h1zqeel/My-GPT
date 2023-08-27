import { cacheExtension, cacheInvalidationExtension } from '@/utils/cache';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const xPrisma = prisma.$extends({
	query: {
		chat:{
			findMany:async(args: any) => {
				return cacheExtension(args, { pivot: 'creatorId' });
			},
			findUnique: async(args: any) => {
				return cacheExtension(args, { pivot: 'creatorId' });
			},
			create: async(args: any) => {
				return cacheInvalidationExtension(args, { pivot: 'creatorId' });
			},
			update: async(args: any) => {
				return cacheInvalidationExtension(args, { pivot: 'creatorId' });
			}
		},
		message:{
			findMany: async(args: any) => {
				return cacheExtension(args, { pivot: 'chatId' });
			},
			create: async(args: any) => {
				return cacheInvalidationExtension(args, { pivot: 'chatId' });
			}
		},
		user:{
			findUnique: cacheExtension,
			create: cacheInvalidationExtension,
			update: cacheInvalidationExtension
		}
	}
});

export default xPrisma;
