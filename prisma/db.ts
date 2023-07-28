import { PrismaClient } from '@prisma/client';
import { Redis } from 'ioredis';
import { createPrismaRedisCache } from 'prisma-redis-middleware';

const prisma = new PrismaClient();
const redis = new Redis(process.env.KV_URL || '');

const cacheMiddleware = createPrismaRedisCache({
	models: [
		{ model: 'Chat' },
		{ model: 'Message' }
	],
	storage: { type: 'redis', options: { client: redis, invalidation: { referencesTTL: 300 }, log: console } },
	cacheTime: 300,
	excludeModels: ['User'],
	excludeMethods: ['count', 'groupBy'],
	onHit: (key) => {
		console.log('Redis hit', key);
	},
	onMiss: (key) => {
		console.log('Redis Miss', key);
	}
});

prisma.$use(cacheMiddleware);

export default prisma;
