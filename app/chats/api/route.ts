import { getUserSession } from '@/utils/session';
import { NextRequest, NextResponse } from 'next/server';
import db from '@/prisma/db';
export async function POST(req: NextRequest) {
	const user = await getUserSession(req);
	const { name } = await req.json();

	const chat = await db.chat.create({
		data: {
			name,
			creatorId: user.id
		}
	});

	return NextResponse.json(
		{ ok: true, chat },
		{ status: 200 }
	);
}

export async function GET(req: NextRequest) {
	const user = await getUserSession(req);

	const chats = await db.chat.findMany({
		where: {
			creatorId: user.id,
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