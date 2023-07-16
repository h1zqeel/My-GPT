import { NextResponse } from 'next/server';
import * as bcrypt from 'bcrypt';
import db from '../../../prisma/db';
import { signToken } from '@/utils/token';
import { generateSession } from '@/utils/session';
import { TUser } from '@/types/User';

export async function POST(request: Request) {
	const { username, password } = await request.json();
	const user = await db.user.findUnique({
		where: {
			username
		}
	});

	if (!user) {
		return NextResponse.json({ error: 'Username or Password is incorrect' }, { status: 400 });
	}
	const match = await bcrypt.compare(password, user.password);

	if (!match) {
		return NextResponse.json({ error: 'Username or Password is incorrect' }, { status: 400 });
	}
	if(!user.name) user.name = user.username;

	return generateSession(user as TUser);
}