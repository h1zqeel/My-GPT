import cache from '@/utils/cache';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
	const response = NextResponse.redirect(new URL('/login', req.url));
	const sessionId = req.cookies.get(process.env.TOKEN_NAME)?.value;
	await cache.hdel(`${process.env.TOKEN_NAME}-sessions`, sessionId as string);
	await cache.hdel(`${process.env.TOKEN_NAME}-session-last-used`, sessionId as string);
	response.cookies.delete(process.env.TOKEN_NAME);
	return response;
}