import db from '@/db/connection';
import _ from 'lodash';
import { NextResponse } from 'next/server';
import { users } from '@/db/schema';
import { eq, sql } from 'drizzle-orm';

export const linkExistingUser = async({ userId, email, name } : {userId: number, email: string, name?: string}, provider : string, { googleSub = null, githubId = null }: any = {}) => {
	let user = (await db.select().from(users)
		.where(eq(users.id, userId)))[0];
	const newProvider = getNewProvider({ provider, googleSub, githubId });

	const userWithSameAccount = (await db.select().from(users)
		.where(sql`${users.providers} @> ${JSON.stringify([newProvider])}`))[0];

	if(userWithSameAccount) {
		return NextResponse.json({
			ok: false,
			reason: `Your ${_.startCase(provider)} Account is Already Linked to Another User.`
		});
	}

	if(user) {
		let currentProviders = user.providers ? user.providers : [];

		let newEmail = user.email ? user.email : email;

		if(email && !user.email) {
			const userWithSameEmail = await db.select().from(users)
				.where(eq(users.email, email));

			if(!userWithSameEmail) {
				newEmail = email;
			}
		}
		await db.update(users).set({
			email: newEmail,
			providers: [
				...currentProviders as any,
				newProvider
			]
		})
			.where(eq(users.id, userId));

		user = (await db.select().from(users)
			.where(eq(users.id, userId)))[0];

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

	let userWithSameEmail = (await db.select().from(users)
		.where(eq(users.email, email)))[0];

	if(userWithSameEmail) {
		let currentProviders = userWithSameEmail.providers ? userWithSameEmail.providers : [];
		const newProvider = getNewProvider({ provider, googleSub, githubId });
		await db.update(users).set({
			providers: [
				...currentProviders as any,
				newProvider
			]
		})
			.where(eq(users.id, userWithSameEmail.id));

		user = (await db.select().from(users)
			.where(eq(users.id, userWithSameEmail.id)))[0];

	} else {
		const newProvider = getNewProvider({ provider, googleSub, githubId });
		user = {
			email,
			name,
			providers: [newProvider]
		};
		await db.insert(users).values(user);

		user = (await db.select().from(users)
			.where(eq(users.providers, [newProvider])))[0];
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