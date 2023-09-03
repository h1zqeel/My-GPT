import db from '@/db/connection';
import { createData, deleteData, fetchData } from './cache';
import { messages as messagesModel } from '@/db/schema';
import { sql } from 'drizzle-orm';

export const getMessages = async(chatId : number) => {
	const chatsFromCache = await fetchData({ key: `${process.env.TOKEN_NAME}::messages::${chatId}` });
	if(chatsFromCache) {
		return chatsFromCache;
	}
	const chats = await db.select().from(messagesModel)
		.where(sql`${messagesModel.chatId} = ${chatId} AND ${messagesModel.archived} = false`);
	await createData({ key: `${process.env.TOKEN_NAME}::messages::${chatId}`, value: chats });

	return chats;
};

export const invalidateMessagesCache = async(creatorId : number) => {
	await deleteData({ key: `${process.env.TOKEN_NAME}::messages::${creatorId}` });
};