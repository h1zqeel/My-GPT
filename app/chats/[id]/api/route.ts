import db from '@/db/connection';
import { sql } from 'drizzle-orm';
import { chats } from '@/db/schema';
import { NextRequest, NextResponse } from 'next/server';
import { chatBelongsToUser } from '@/utils/customMiddlewares';
import { errors } from '@/constants';
import { invalidateChatsCache } from '@/utils/chat';
import { getUserSession } from '@/utils/user';

export const runtime = 'edge';
export const preferredRegion = 'syd1';

export async function DELETE(
	request: NextRequest,
	context: { params: Promise<{ id: string }> }
) {
	const { id } = await context.params;
	const chatId = Number(id);

	const guard = await chatBelongsToUser(request, { id: chatId });
	if (guard) return guard;

	const user = await getUserSession();
	if (!chatId) {
		return NextResponse.json(
			{ ok: false, error: errors.INVALID_REQUEST },
			{ status: 400 }
		);
	}

	await db
		.update(chats)
		.set({ archived: true })
		.where(sql`${chats.id} = ${chatId} AND ${chats.creatorId} = ${user?.sub}`);

	await invalidateChatsCache(user?.sub as string);

	return NextResponse.json({ ok: true }, { status: 200 });
}
