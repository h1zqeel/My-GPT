import db from '@/db/connection';
import { users } from '@/db/schema';
import { NextRequest, NextResponse } from 'next/server';
import { generateSession, getUserSession } from '@/utils/session';
import { TUser } from '@/types/User';
import { errors } from '@/constants';
import { eq } from 'drizzle-orm';

export const runtime = 'edge';
export const preferredRegion = 'syd1';

export async function POST(req: NextRequest) {
	const sessionId = req.cookies.get(process.env.TOKEN_NAME)?.value as string;
	const session = await getUserSession({ sessionId });

	if(session && session.id) {
		const user = (await db.select().from(users)
			.where(eq(users.id, session.id as number)))[0];

		return generateSession(user as TUser, { userSessionId: sessionId });
	}
	return NextResponse.json({ error: errors.DEFAULT }, { status: 500 });
}