import { NextResponse } from 'next/server';
import * as bcrypt from 'bcrypt';
import db from '../../../prisma/db';
import { PrismaClientValidationError } from '@prisma/client/runtime';
const saltRounds = process.env.SALT_ROUNDS || 10;

export async function POST(request: Request) {
	const { username, password } = await request.json();
	if(!username.length || !password.length) {
		return NextResponse.json({ error: 'Username or Password cannot be Empty' }, { status: 400 });
	}

	const hashedPassword = await bcrypt.hash(password, saltRounds);

	try{
		await db.user.create({
			data: {
				username,
				password: hashedPassword
			}
		});
	} catch(e: any) {
		if(e.code === 'P2002') {
			return NextResponse.json({ error: 'Username already exists' }, { status: 400 });
		} else {
			return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
		}
	}

	return NextResponse.json({ username });
}