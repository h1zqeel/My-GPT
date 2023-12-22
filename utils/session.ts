import cache from './cache';
import moment from 'moment-timezone';
import { TUser } from '@/types/User';
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export const generateSession = async(user: TUser, { userSessionId, redirect, url } : {userSessionId?: string | null, redirect?: Boolean, url?: string} = {}) => {
	let response;
	response = NextResponse.json(
		{
			ok: true,
			user: {
				id: user.id,
				username: user.username,
				name: user.name
			}
		},
		{ status: 200 }
	);

	if(redirect) {
		response = NextResponse.redirect(new URL('/', url));
	}

	const sessionId = userSessionId || uuidv4();

	const sessionData = {
		id: user.id,
		username: user.username,
		name: user.name,
		email: user.email,
		openAIKey: user.openAIKey,
		googleAIKey: user.googleAIKey,
		providers: user.providers
	};

	await cache.hset(`${process.env.TOKEN_NAME}-sessions`, { [sessionId as string]: JSON.stringify(sessionData) });
	await cache.hset(`${process.env.TOKEN_NAME}-session-last-used`, { [sessionId as string]: moment().unix() });

	response.cookies.set({
		name: process.env.TOKEN_NAME,
		value: sessionId,
		httpOnly: true,
		sameSite: 'lax'
	});

	return response;
};

export const getUserSession =async({ req, sessionId }:{req?: NextRequest, sessionId?: string}) => {
	try {
		let userSessionId;
		if(req) {
			userSessionId = req.cookies.get(process.env.TOKEN_NAME)?.value;
		} else if (sessionId) {
			userSessionId = sessionId;
		} else {
			return null;
		}

		const sessionLastAccessed = await cache.hget(`${process.env.TOKEN_NAME}-session-last-used`, userSessionId as string);
		if(sessionLastAccessed) {
			if(moment().diff(moment.unix(sessionLastAccessed as number), 'hours') > 24) {
				await cache.hdel(`${process.env.TOKEN_NAME}-sessions`, userSessionId as string);
				await cache.hdel(`${process.env.TOKEN_NAME}-session-last-used`, userSessionId as string);
				return null;
			}
		}
		const session = await cache.hget(`${process.env.TOKEN_NAME}-sessions`, userSessionId as string);

		if(session) {
			await cache.hset(`${process.env.TOKEN_NAME}-session-last-used`, { [userSessionId as string]: moment().unix() });
		}

		if(!session) {
			return null;
		}
		return session as TUser;
	} catch(e) {
		return null;
	}
};

export const clearExpiredSessions = async({ logger = console } : {logger: Console | any}) => {
	const sessions = await cache.hgetall(`${process.env.TOKEN_NAME}-sessions`);
	const sessionLastAccessed = await cache.hgetall(`${process.env.TOKEN_NAME}-session-last-used`);
	logger.info('Clearing expired sessions');
	if(sessions && sessionLastAccessed) {
		for(const session in sessions) {
			if(sessions[session] && sessionLastAccessed[session]) {
				if(moment().diff(moment.unix(sessionLastAccessed[session] as number), 'hours') > 24) {
					await cache.hdel(`${process.env.TOKEN_NAME}-sessions`, session);
					await cache.hdel(`${process.env.TOKEN_NAME}-session-last-used`, session);
					logger.info(`Cleared Session with SessionID: ${JSON.stringify(session)}`);
				} else {
					logger.info(`Session with SessionID: ${JSON.stringify(session)} is still valid`);
				}
			} else if (sessionLastAccessed[session] || sessions[session]) {
				logger.info(`Invalid Entry, deleting SessionID: ${JSON.stringify(session)}`);
				await cache.hdel(`${process.env.TOKEN_NAME}-sessions`, session);
				await cache.hdel(`${process.env.TOKEN_NAME}-session-last-used`, session);
			}
		}
	}
};