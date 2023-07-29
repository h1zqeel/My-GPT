import { NextResponse } from 'next/server';
import db from '@/prisma/db';
import { errors } from '@/constants';

export async function PUT(request: Request) {
	const { userId, name, openAIKey } = await request.json();
	if(!userId) {
		return NextResponse.json({ error: errors.NO_USER }, { status: 400 });
	}

	try{
		await db.user.update({
			data: {
				name,
				openAIKey
			},
			where: {
				id: userId
			}
		});
	} catch(e: any) {
		return NextResponse.json({ error: errors.DEFAULT }, { status: 500 });
	}

	return NextResponse.json({ ok: true, name, openAIKey });
}