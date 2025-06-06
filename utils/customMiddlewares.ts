import db from '@/db/connection';
import { chats } from '@/db/schema';
import { NextRequest, NextResponse } from 'next/server';
import { errors } from '@/constants';
import { sql } from 'drizzle-orm';
import { getUserSession } from './user';

export const chatBelongsToUser = async(
	req: NextRequest,
	{ id }: { id: number | string }
): Promise<Response | void> => {
	const user = await getUserSession();
	const chat = (
		await db
			.select()
			.from(chats)
			.where(
				sql`${chats.id} = ${id} AND ${chats.creatorId} = ${user?.sub} AND ${chats.archived} = false`
			)
	)[0];

	if (chat?.creatorId !== user?.sub) {
		return NextResponse.json(
			{ ok: false, error: errors.NO_CHAT_PERMISSION },
			{ status: 403 }
		);
	}
};

