import db from './prisma/db';

export async function register() {
	console.time('prisma:connect');
	await db.$connect();
	console.timeEnd('prisma:connect');
}
