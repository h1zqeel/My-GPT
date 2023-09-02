import db from '@/db/connection';
import { chats } from '@/db/schema';
import { NextRequest, NextResponse } from 'next/server';
import { getUserSession } from './session';
import { errors } from '@/constants';
import { sql } from 'drizzle-orm';

export const chatBelongsToUser = async(req : NextRequest, { params } : {params: {id: number | string}}, next : Function) => {
	const { id: userId } : any = await getUserSession({ req });
	const { id: chatId } = params;

	const chat = (await db.select().from(chats)
		.where(sql`${chats.id} = ${chatId} AND ${chats.creatorId} = ${userId}`))[0];


	if(chat?.creatorId !== userId) {
		return NextResponse.json({
			ok: false,
			error: errors.NO_CHAT_PERMISSION
		}, { status : 403 });
	} else {
		return next();
	}
};

