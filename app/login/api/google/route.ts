
import db from '@/prisma/db';
import { NextRequest, NextResponse } from 'next/server';
import { OAuth2Client } from 'google-auth-library';
import { linkExistingUser, signUpNewUser } from '@/utils/socialLogin';

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const userId = searchParams.get('userId');
	const callBackUrl = new URL('/login/api/google/callback', req.url).toString();

	const oAuth2Client = new OAuth2Client({ clientId: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET, redirectUri: callBackUrl });

	let state = null;

	if(userId) {
		state = JSON.stringify({ userId });
	}

	const authorizeUrl = oAuth2Client.generateAuthUrl({
		state: state ?? '',
		scope: [
			'https://www.googleapis.com/auth/userinfo.profile',
			'https://www.googleapis.com/auth/userinfo.email'
		]
	});

	return NextResponse.redirect(authorizeUrl);
}

export async function POST(req: NextRequest) {
	const { name, email, userId } = await req.json();
	let user;

	if(userId) {
		return linkExistingUser({ userId, name, email }, 'google');
	}

	user = await db.user.findFirst({
		where: {
			providers: {
				array_contains: [{ name: 'google', email: email }]
			}
		}
	});

	if(!user) {
		return signUpNewUser({ name, email }, 'google');
	}

	return NextResponse.json({
		ok: true,
		user
	});
}