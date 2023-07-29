import { NextRequest, NextResponse } from 'next/server';
import { getUserSession } from './session';
import db from '@/prisma/db';
import { errors } from '@/constants';

export const chatBelongsToUser = async(req : NextRequest, { params } : {params: {id: number | string}}, next : Function) => {
	const { id: userId } = await getUserSession(req);
	const { id: chatId } = params;
	const chat = await db.chat.findUnique({
		where: {
			id: Number(chatId)
		}
	});

	if(chat?.creatorId !== userId) {
		return NextResponse.json({
			ok: false,
			error: errors.NO_CHAT_PERMISSION
		}, { status : 403 });
	} else {
		return next();
	}
};

