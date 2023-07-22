import { TUser } from '@/types/User';
import { NextRequest, NextResponse } from 'next/server';
import { generateToken, decryptAndVerifyToken } from './token';

export const generateSession = async(user: TUser) => {
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

	const token = await generateToken({
		id: user.id,
		username: user.username,
		name: user.name,
		openAIKey: user.openAIKey
	});

	response.cookies.set({
		name: process.env.TOKEN_NAME,
		value: token,
		httpOnly: true,
		sameSite: 'lax',
		maxAge: 60 * 60 * 24 * 7
	});

	return response;
};

export const getUserSession =async(req: NextRequest) => {
	const token = req.cookies.get(process.env.TOKEN_NAME)?.value;
	const claims = await decryptAndVerifyToken(token as string);
	return claims?.payload as TUser;
};