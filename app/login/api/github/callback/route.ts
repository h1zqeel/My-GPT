/* eslint-disable camelcase */

import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { generateSession } from '@/utils/session';
import { TUser } from '@/types/User';

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);

	const state = searchParams.get('state');
	let userId = null;
	if(state) {
		userId = parseInt(JSON.parse(state).userId) ?? null;
	}

	const callBackUrl = new URL('/login/api/github/callback', req.url).toString();

	const response = await axios.post('https://github.com/login/oauth/access_token', {
		code: searchParams.get('code') ?? '',
		client_id: process.env.GITHUB_CLIENT_ID,
		client_secret: process.env.GITHUB_CLIENT_SECRET,
		redirect_uri: callBackUrl
	});
	const params = new URLSearchParams(response.data);
	const accessToken = params.get('access_token');
	const tokenData = { access_token: accessToken };

	const { data : { name, email } } = await axios.get('https://api.github.com/user', {
		headers: {
			Authorization: `token ${tokenData.access_token}`
		}
	});
	const loginURL = new URL('/login/api/github', req.url).toString();
	const { data: { user } } = await axios.post(loginURL, { name, email, userId });

	if(user) {
		return generateSession(user as TUser, { redirect: true, url: req.url });
	}

	return NextResponse.redirect(new URL('/login?githubSignInFailed=1', req.url));
}
