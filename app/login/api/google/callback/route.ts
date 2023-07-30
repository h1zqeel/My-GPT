/* eslint-disable camelcase */

import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { OAuth2Client } from 'google-auth-library';
import { generateSession } from '@/utils/session';
import { TUser } from '@/types/User';

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const state = searchParams.get('state');
	let userId = null;

	if(state) {
		userId = parseInt(JSON.parse(state).userId) ?? null;
	}

	const callBackUrl = new URL('/login/api/google/callback', req.url).toString();

	const oAuth2Client = new OAuth2Client({ clientId: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET, redirectUri: callBackUrl });

	const tokenData = await oAuth2Client.getToken(searchParams.get('code') ?? '');
	const ticket = await oAuth2Client.verifyIdToken({
		idToken: tokenData.tokens.id_token ?? ''
	});
	const payload = ticket.getPayload();

	if(!payload?.email_verified) {
		return NextResponse.redirect(new URL('/login?googleEmailUnVerified=1', req.url));
	}
	const loginURL = new URL('/login/api/google', req.url).toString();
	const { data: { user } } = await axios.post(loginURL, { ...payload, userId });

	if(user) {
		return generateSession(user as TUser, { redirect: true, url: req.url });
	}

	return NextResponse.redirect(new URL('/login?googleSignInFailed=1', req.url));
}
