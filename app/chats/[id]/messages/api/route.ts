import { NextResponse, type NextRequest } from 'next/server';
import db from '@/db/connection';
import pMap from 'p-map';
import { messages as messagesModel } from '@/db/schema';
import { chatBelongsToUser } from '@/utils/customMiddlewares';
import { errors } from '@/constants';
import { getMessages, invalidateMessagesCache } from '@/utils/messages';

export const runtime = 'edge';
export const preferredRegion = 'syd1';

export async function GET(
	request: NextRequest,
	context: { params: Promise<{ id: string }> }
) {
	const { id } = await context.params;
	const chatId = Number(id);

	const guard = await chatBelongsToUser(request, { id: chatId });
	if (guard) return guard;

	console.time('messages::GET');
	const messages = await getMessages(chatId);
	console.timeEnd('messages::GET');

	return NextResponse.json({ ok: true, messages }, { status: 200 });
}

export async function POST(
	request: NextRequest,
	context: { params: Promise<{ id: string }> }
) {
	const { id } = await context.params;
	const chatId = Number(id);

	const guard = await chatBelongsToUser(request, { id: chatId });
	if (guard) return guard;

	const { content, role, messages } = await request.json();

	if (Array.isArray(messages) && messages.length) {
		await pMap(
			messages,
			async(message: any) =>
				db.insert(messagesModel).values({ ...message, chatId }),
			{ concurrency: 1 }
		);
		await invalidateMessagesCache(chatId);
		return NextResponse.json({ ok: true, messages }, { status: 200 });
	}

	if (!content || !role) {
		return NextResponse.json(
			{ ok: false, error: errors.AI.CONTENT_ROLE_REQUIRED },
			{ status: 400 }
		);
	}

	const message = { content, role, chatId };
	await db.insert(messagesModel).values(message);
	await invalidateMessagesCache(chatId);

	return NextResponse.json({ ok: true, message }, { status: 200 });
}
