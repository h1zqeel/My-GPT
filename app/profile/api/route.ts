import { NextResponse } from 'next/server';
import db from '@/db/connection';
import { users } from '@/db/schema';
import { errors } from '@/constants';
import { eq } from 'drizzle-orm';

export const runtime = 'edge';

export async function PUT(request: Request) {
	const { userId, name, openAIKey } = await request.json();
	if(!userId) {
		return NextResponse.json({ error: errors.NO_USER }, { status: 400 });
	}

	try{
		await db.update(users).set({ name, openAIKey })
			.where(eq(users.id, userId));

	} catch(e: any) {
		return NextResponse.json({ error: errors.DEFAULT }, { status: 500 });
	}

	return NextResponse.json({ ok: true, name, openAIKey });
}