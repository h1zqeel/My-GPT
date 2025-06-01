import { NextRequest, NextResponse } from 'next/server';
import db from '@/db/connection';
import { users } from '@/db/schema';
import { errors } from '@/constants';
import { auth0 } from '@/utils/auth';

export const runtime = 'edge';
export const preferredRegion = 'syd1';

export async function PUT(request: NextRequest) {
	const session = await auth0.getSession(request);
	const { openAIKey, googleAIKey, anthropicAIKey } = await request.json();

	try {
		await db
			.insert(users)
			.values({
				userSub: session?.user?.sub ?? '',
				openAIKey,
				googleAIKey,
				anthropicAIKey,
			})
			.onConflictDoUpdate({
				target: users.userSub,
				set: { openAIKey, googleAIKey, anthropicAIKey },
			});
	} catch (e: any) {
		return NextResponse.json({ error: errors.DEFAULT }, { status: 500 });
	}

	return NextResponse.json({
		ok: true,
		openAIKey,
		googleAIKey,
		anthropicAIKey,
	});
}
