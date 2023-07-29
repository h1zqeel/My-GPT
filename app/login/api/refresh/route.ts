import { NextRequest, NextResponse } from 'next/server';
import db from '@/prisma/db';
import { decryptAndVerifyToken } from '@/utils/token';
import { generateSession } from '@/utils/session';
import { TUser } from '@/types/User';
import { errors } from '@/constants';

export async function POST(req: NextRequest) {
	const token = req.cookies.get(process.env.TOKEN_NAME)?.value;
	const claims = await decryptAndVerifyToken(token as string);

	if(claims?.payload.id) {
		const user = await db.user.findUnique({
			where: {
				id: claims?.payload.id as number
			}
		});

		return generateSession(user as TUser);
	}
	return NextResponse.json({ error: errors.DEFAULT }, { status: 500 });
}