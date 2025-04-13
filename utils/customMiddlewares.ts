import db from '@/db/connection';
import { chats } from '@/db/schema';
import { NextRequest, NextResponse } from 'next/server';
import { getUserSession } from './session';
import { errors } from '@/constants';
import { sql } from 'drizzle-orm';

export const chatBelongsToUser = async(
	req: NextRequest,
	{ id }: { id: number | string }
): Promise<Response | void> => {
	const { id: userId }: any = await getUserSession({ req });
	const chat = (
		await db
			.select()
			.from(chats)
			.where(
				sql`${chats.id} = ${id} AND ${chats.creatorId} = ${userId} AND ${chats.archived} = false`
			)
	)[0];

	if (chat?.creatorId !== userId) {
		return NextResponse.json(
			{ ok: false, error: errors.NO_CHAT_PERMISSION },
			{ status: 403 }
		);
	}
};

