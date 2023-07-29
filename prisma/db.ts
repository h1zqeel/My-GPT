import { PrismaClient } from '@prisma/client';
import { Redis } from 'ioredis';
import { createPrismaRedisCache } from 'prisma-redis-middleware';

const prisma = new PrismaClient();
const redis = new Redis(process.env.REDIS_URL);

const cacheMiddleware = createPrismaRedisCache({
	models: [
		{ model: 'Chat', cacheTime: 200 },
		{ model: 'Message', cacheTime: 200 },
		{ model: 'User', cacheTime: 400 }
	],
	storage: { type: 'redis', options: { client: redis, invalidation: { referencesTTL: 400 }, log: console } },
	cacheTime: 400,
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
