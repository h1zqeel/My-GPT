import db from '@/prisma/db';
import _ from 'lodash';
import { Prisma } from '@prisma/client';
import { NextResponse } from 'next/server';

export const linkExistingUser = async({ userId, email, name } : {userId: number, email: string, name?: string}, provider : string, { googleSub = null, githubId = null }: any = {}) => {
	let user = await db.user.findUnique({
		where: {
			id: userId
		}
	});
	const newProvider = getNewProvider({ provider, googleSub, githubId }) as Prisma.JsonObject;

	const userWithSameAccount = await db.user.findFirst({
		where: {
			providers: { array_contains: [newProvider] }
		}
	});

	if(userWithSameAccount) {
		return NextResponse.json({
			ok: false,
			reason: `Your ${_.startCase(provider)} Account is Already Linked to Another User.`
		});
	}

	if(user) {
		let currentProviders = user.providers ? user.providers : [];

		let newEmail = null;

		if(email && !user.email) {
			const userWithSameEmail = await db.user.findFirst({
				where: {
					email: email
				}
			});
			if(!userWithSameEmail) {
				newEmail = email;
			}
		}

		await db.user.update({
			data: {
				email: newEmail,
				providers: [
					...currentProviders as Prisma.JsonArray,
					newProvider
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
			reason: 'User not found'
		});
	}
};

export const signUpNewUser = async({ email, name } : {email: string, name: string}, provider : string, { googleSub = null, githubId = null } : any = {}) => {
	let user;
	let userWithSameEmail = await db.user.findFirst({
		where: {
			email: email
		}
	});

	if(userWithSameEmail) {
		let currentProviders = userWithSameEmail.providers ? userWithSameEmail.providers : [];
		const newProvider = getNewProvider({ provider, googleSub, githubId }) as Prisma.JsonObject;
		await db.user.update({
			data: {
				providers: [
					...currentProviders as Prisma.JsonArray,
					newProvider as Prisma.JsonObject
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
		const newProvider = getNewProvider({ provider, googleSub, githubId }) as Prisma.JsonObject;
		user = await db.user.create({
			data: {
				name,
				email,
				providers: [newProvider]
			}
		});
	}

	return NextResponse.json({
		ok: true,
		user
	});
};

export const getNewProvider = ({ provider, googleSub, githubId } : any) => {
	if(provider === 'google') {
		return { name: 'google', identifier: googleSub };
	} else if(provider === 'github') {
		return { name: 'github', identifier: githubId };
	}
};