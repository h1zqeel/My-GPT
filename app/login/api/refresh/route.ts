import db from '@/prisma/db';
import { NextRequest, NextResponse } from 'next/server';
import { generateSession, getUserSession } from '@/utils/session';
import { TUser } from '@/types/User';
import { errors } from '@/constants';

export async function POST(req: NextRequest) {
	const sessionId = req.cookies.get(process.env.TOKEN_NAME)?.value as string;
	const session = await getUserSession({ sessionId });

	if(session && session.id) {
		const user = await db.user.findUnique({
			where: {
				id: session.id as number
			}
		});

		return generateSession(user as TUser, { userSessionId: sessionId });
	}
	return NextResponse.json({ error: errors.DEFAULT }, { status: 500 });
}