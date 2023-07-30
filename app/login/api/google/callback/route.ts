/* eslint-disable camelcase */

import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { OAuth2Client } from 'google-auth-library';
import { generateSession } from '@/utils/session';
import { TUser } from '@/types/User';

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const callBackUrl = new URL('/login/api/google/callback', req.url).toString();
	console.log({ callBackUrl });
	const oAuth2Client = new OAuth2Client(
		process.env.GOOGLE_CLIENT_ID,
		process.env.GOOGLE_CLIENT_SECRET,
		callBackUrl
	);
	console.log('generated oAuth2Client');
	const tokenData = await oAuth2Client.getToken(searchParams.get('code') ?? '');
	console.log('got tokenData', tokenData);
	const ticket = await oAuth2Client.verifyIdToken({
		idToken: tokenData.tokens.id_token ?? ''
	});
	console.log('got ticket', ticket);
	const payload = ticket.getPayload();
	console.log('got payload', payload);
	if(!payload?.email_verified) {
		return NextResponse.redirect(new URL('/login?googleEmailUnVerified=1', req.url));
	}
	const loginURL = new URL('/login/api/google', req.url).toString();
	const { data: { user } } = await axios.post(loginURL, payload);
	console.log('got user', user);
	if(user) {
		return generateSession(user as TUser, { redirect: true, url: req.url });
	}
	
	return NextResponse.redirect(new URL('/login?googleSignInFailed=1', req.url));
}
