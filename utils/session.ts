import cache from './cache';
import { TUser } from '@/types/User';
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export const generateSession = async(user: TUser, { userSessionId } : {userSessionId?: string | null} = {}) => {
	const response = NextResponse.json(
		{
			ok: true,
			user: {
				id: user.id,
				username: user.username,
				name: user.name,
				openAIKey: user.openAIKey
			}
		},
		{ status: 200 }
	);

	const sessionId = userSessionId || uuidv4();

	const sessionData = {
		id: user.id,
		username: user.username,
		name: user.name,
		openAIKey: user.openAIKey
	};

	await cache.set(sessionId, JSON.stringify(sessionData), { ex: 60 * 60 * 24 * 1 });

	response.cookies.set({
		name: process.env.TOKEN_NAME,
		value: sessionId,
		httpOnly: true,
		sameSite: 'lax',
		maxAge: 60 * 60 * 24 * 1
	});

	return response;
};

export const getUserSession =async({ req, sessionId }:{req?: NextRequest, sessionId?: string}) => {
	let userSessionId;
	if(req) {
		userSessionId = req.cookies.get(process.env.TOKEN_NAME)?.value;
	} else if (sessionId) {
		userSessionId = sessionId;
	} else {
		return null;
	}

	const session = await cache.get(userSessionId as string);
	if(!session) {
		return null;
	}
	return session as TUser;
};