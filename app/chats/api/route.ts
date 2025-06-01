import db from '@/db/connection';
import { chats as chatsModel } from '@/db/schema';
import { getUserSession } from '@/utils/session';
import { NextRequest, NextResponse } from 'next/server';
import { errors, gptModels } from '@/constants';
import { eq } from 'drizzle-orm';
import { getChats, invalidateChatsCache } from '@/utils/chat';
import { auth0 } from '@/utils/auth';

export const runtime = 'edge';
export const preferredRegion = 'syd1';

export async function POST(req: NextRequest) {
	const session = await auth0.getSession(req);
	const user = session?.user;
	const { name, systemMessage, model } = await req.json();
	if(!user) {
		return NextResponse.json(
			{ ok: false, error: errors.DEFAULT },
			{ status: 500 }
		);
	}

	const chat = {
		name,
		creatorId: user.sub,
		systemMessage,
		model,
		llm: gptModels.find(gptModel=>gptModel.value === model)?.llm
	};

	console.log('Creating chat', chat);

	await db.insert(chatsModel).values(chat);
	await invalidateChatsCache(user?.sub.toString() as string);

	return NextResponse.json(
		{ ok: true, chat },
		{ status: 200 }
	);
}

export async function GET(req: NextRequest) {
	const session = await auth0.getSession(req);
	const user = session?.user;
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

	const chats = await getChats(user?.sub as string);
	return NextResponse.json(
		{
			ok: true,
			chats
		},
		{ status: 200 }
	);
}