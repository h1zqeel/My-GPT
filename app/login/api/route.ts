import { NextResponse } from 'next/server';
import * as bcrypt from 'bcrypt';
import db from '@/prisma/db';
import { generateSession } from '@/utils/session';
import { TUser } from '@/types/User';
import { errors } from '@/constants';

export async function POST(request: Request) {
	const { username, password } = await request.json();
	const user = await db.user.findUnique({
		where: {
			username
		}
	});

	if (!user) {
		return NextResponse.json({ error: errors.USERNAME_PASSWORD_INCORRECT }, { status: 400 });
	}
	const match = await bcrypt.compare(password, user?.password || '');

	if (!match) {
		return NextResponse.json({ error: errors.USERNAME_PASSWORD_INCORRECT }, { status: 400 });
	}
	if(!user.name) user.name = user.username;

	return generateSession(user as TUser);
}