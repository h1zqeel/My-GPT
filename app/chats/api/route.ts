import db from '@/prisma/db';
import { getUserSession } from '@/utils/session';
import { NextRequest, NextResponse } from 'next/server';
import { errors } from '@/constants';

export async function POST(req: NextRequest) {
	const user = await getUserSession({ req });
	const { name, systemMessage, model } = await req.json();
	if(!user) {
		return NextResponse.json(
			{ ok: false, error: errors.DEFAULT },
			{ status: 500 }
		);
	}

	const chat = await db.chat.create({
		data: {
			name,
			creatorId: user?.id,
			systemMessage,
			model
		}
	});

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
		const chat = await db.chat.findUnique({
			where: {
				id: Number(chatId)
			}
		});
		return NextResponse.json(
			{ ok: true, chat },
			{ status: 200 }
		);
	}

	const chats = await db.chat.findMany({
		where: {
			creatorId: user?.id,
			archived: false
		}
	});


	return NextResponse.json(
		{
			ok: true,
			chats
		},
		{ status: 200 }
	);
}