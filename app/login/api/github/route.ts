
import db from '@/prisma/db';
import { NextRequest, NextResponse } from 'next/server';
import { linkExistingUser, signUpNewUser } from '@/utils/socialLogin';
export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const userId = searchParams.get('userId');
	const callBackUrl = new URL('/login/api/github/callback', req.url).toString();
	let state = null;

	if(userId) {
		state = JSON.stringify({ userId });
	}

	let githubAuthURL = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${callBackUrl}&scope=read:user`;

	if(state){
		githubAuthURL += `&state=${state}`;
	}


	return NextResponse.redirect(githubAuthURL);
}

export async function POST(req: NextRequest) {
	const { name, email, userId } = await req.json();
	let user;

	if(userId) {
		return linkExistingUser({ userId, name, email }, 'github');
	}

	user = await db.user.findFirst({
		where: {
			providers: {
				array_contains: [{ name: 'github', email: email }]
			}
		}
	});

	if(!user) {
		return signUpNewUser({ name, email }, 'github');
	}

	return NextResponse.json({
		ok: true,
		user
	});
}