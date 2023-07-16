import { verifyToken } from '@/utils/token';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	const token = req.cookies.get(process.env.TOKEN_NAME)?.value;
	if(token) {
		const claims = await verifyToken(token);
		return NextResponse.json({ user: claims?.payload });
	} else {
		return NextResponse.redirect(new URL('/login', req.url));
	}
}