import db from '@/prisma/db';
import { Prisma } from '@prisma/client';
import { NextResponse } from 'next/server';

export const linkExistingUser = async ({userId, email, name, } : {userId: number, email: string, name?: string}, provider : string) => {
		let user = await db.user.findUnique({
			where: {
				id: userId
			}
		});
		if(user) {
			let currentProviders = user.providers ? user.providers : []
			await db.user.update({
				data: {
					providers: [
						...currentProviders as Prisma.JsonArray,
						{ name: provider, email: email }
					]
				},
				where: {
					id: userId
				}
			});
			user = await db.user.findUnique({
				where: {
					id: userId
				}
			});

			return NextResponse.json({
				ok: true,
				user
			});
		} else {
			return NextResponse.json({
				ok: false,
				error: 'User not found'
			}, { status: 404 });
		}
}

export const signUpNewUser = async ({ email, name, } : {email: string, name: string}, provider : string) => {
	let user;
	let userWithSameEmail = await db.user.findFirst({
			where: {
				email: email
			}
	});

	if(userWithSameEmail) {
		let currentProviders = userWithSameEmail.providers ? userWithSameEmail.providers : []
		await db.user.update({
			data: {
				providers: [
					...currentProviders as Prisma.JsonArray,
					{ name: provider, email: email }
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
				providers: [{ name: provider, email: email }]
			}
		});
	}

	return NextResponse.json({
		ok: true,
		user
	});
}