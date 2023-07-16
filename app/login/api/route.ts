import { NextResponse } from 'next/server';
import * as bcrypt from 'bcrypt';
import db from '../../../prisma/db';
import { signToken } from '@/utils/token';

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
	const response = NextResponse.json(
		{
			ok: true,
			user: {
				id: user.id,
				username: user.username,
				name: user.name,
				openAPIKey: user.openAPIKey
			}
		},
		{ status: 200 }
	);

	const token = await signToken({
		id: user.id,
		username: user.username,
		name: user.name,
		openAPIKey: user.openAPIKey
	});

	response.cookies.set({
		name: process.env.TOKEN_NAME,
		value: token,
		httpOnly: true,
		sameSite: 'lax',
		maxAge: 60 * 60 * 24 * 7
	});

	return response;
}