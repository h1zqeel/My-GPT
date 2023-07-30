
import db from '@/prisma/db';
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuid } from 'uuid';
import { Prisma } from '@prisma/client';
export async function GET(req: Request) {
	const callBackUrl = new URL('/login/api/github/callback', req.url).toString();
	const state = uuid();

	const githubAuthURL = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${callBackUrl}&scope=read:user&state=${state}`;

	return NextResponse.redirect(githubAuthURL);
}

export async function POST(req: NextRequest) {
	const { name, email } = await req.json();
	let user = await db.user.findFirst({
		where: {
			providers: {
				array_contains: [{ name: 'github', email: email }]
			}
		}
	});

	if(!user) {
		let userWithSameEmail = await db.user.findFirst({
			where: {
				email: email
			}
		});

		if(userWithSameEmail) {
			await db.user.update({
				data: {
					providers: [
						...userWithSameEmail.providers as Prisma.JsonArray,
						{ name: 'github', email: email }
					]
				},
				where: {
					id: userWithSameEmail.id
				}
			});

			user = await db.user.findUnique({
				where: {
					id: userWithSameEmail.id
				}
			});
		} else {
			user = await db.user.create({
				data: {
					name,
					email,
					providers: [{ name: 'github', email: email }]
				}
			});
		}
	}

	return NextResponse.json({
		ok: true,
		user
	});
}