import db from '@/db/connection';
import { createData, fetchData } from './cache';
import { chats as chatsModel } from '@/db/schema';
import { sql } from 'drizzle-orm';

export const getChats = async(creatorId : number) => {
	const chatsFromCache = await fetchData({ key: `chats_${creatorId}` });
	if(chatsFromCache) {
		return chatsFromCache;
	}
	const chats = await db.select().from(chatsModel)
		.where(sql`${chatsModel.creatorId} = ${creatorId} AND ${chatsModel.archived} = false`);
	await createData({ key: `chats_${creatorId}`, value: chats });

	return chats;
};

export const invalidateChatsCache = async(creatorId : number) => {
	await createData({ key: `chats_${creatorId}`, value: null });
};