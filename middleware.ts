import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { getUserSession } from './utils/session';

const throwBack = async(req: NextRequest, destroyCookie : Boolean = true) => {
	const response = NextResponse.redirect(new URL('/login', req.url));

	if(destroyCookie) {
		response.cookies.delete(process.env.TOKEN_NAME);
	}
	if(req.nextUrl.pathname === '/') {
		return NextResponse.next();
	}
	return response;
};

export const middleware = async(req: NextRequest) => {
	const sessionId = req.cookies.get(process.env.TOKEN_NAME)?.value;
	if(sessionId) {
		const sessionData = await getUserSession({ sessionId });
		if(sessionData) {
			if(!sessionData?.name && !sessionData?.username) {
				return throwBack(req);
			} else {
				if(req.nextUrl.pathname === '/') {
					return NextResponse.redirect(new URL('/chats', req.url));
				}
				return NextResponse.next();
			}
		} else {
			return throwBack(req);
		}
	} else {
		return throwBack(req, false);
	}
};

export const config = {
	matcher: [
		/*
     * Match all request paths except for the ones starting with:
     * - api/auth (Auth API routes)
	 * - login (login page)
	 * - register (register page)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
		'/((?!api/auth|AI-LOGO.png|login|register|_next/static|_next/image|favicon.ico).*)'
	]
};