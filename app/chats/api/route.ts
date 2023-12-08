import db from '@/db/connection';
import { chats as chatsModel } from '@/db/schema';
import { getUserSession } from '@/utils/session';
import { NextRequest, NextResponse } from 'next/server';
import { errors } from '@/constants';
import { eq, sql } from 'drizzle-orm';
import { getChats, invalidateChatsCache } from '@/utils/chat';

export async function POST(req: NextRequest) {
	const user = await getUserSession({ req });
	const { name, systemMessage, model } = await req.json();
	if(!user) {
		return NextResponse.json(
			{ ok: false, error: errors.DEFAULT },
			{ status: 500 }
		);
	}

	const chat = {
		name,
		creatorId: user?.id,
		systemMessage,
		model
	};

	await db.insert(chatsModel).values(chat);
	await invalidateChatsCache(user?.id as number);

	return NextResponse.json(
		{ ok: true, chat },
		{ status: 200 }
	);
}

export async function GET(req: NextRequest) {
	const user = await getUserSession({ req });
	const { searchParams } = new URL(req.url);
	const chatId = searchParams.get('id');

	if(chatId) {
		const chat = (await db.select().from(chatsModel)
			.where(eq(chatsModel.id, Number(chatId))))[0];

		return NextResponse.json(
			{ ok: true, chat },
			{ status: 200 }
		);
	}

	const chats = await getChats(user?.id as number);
	return NextResponse.json(
		{
			ok: true,
			chats
		},
		{ status: 200 }
	);
}