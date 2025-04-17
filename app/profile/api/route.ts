import { NextResponse } from 'next/server';
import db from '@/db/connection';
import { users } from '@/db/schema';
import { errors } from '@/constants';
import { eq } from 'drizzle-orm';
import logger from '@/utils/logging/logger';

export const runtime = 'edge';
export const preferredRegion = 'syd1';

export async function PUT(request: Request) {
	const { userId, name, openAIKey, googleAIKey, anthropicAIKey } = await request.json();
	if(!userId) {
		return NextResponse.json({ error: errors.NO_USER }, { status: 400 });
	}
	logger.info('Updating user', { userId, name, openAIKey, googleAIKey, anthropicAIKey });

	try{
		await db.update(users).set({ name, openAIKey, googleAIKey, anthropicAIKey })
			.where(eq(users.id, userId));

	} catch(e: any) {
		return NextResponse.json({ error: errors.DEFAULT }, { status: 500 });
	}

	return NextResponse.json({ ok: true, name, openAIKey, googleAIKey, anthropicAIKey });
}