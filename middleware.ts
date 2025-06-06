import { NextRequest, NextResponse } from 'next/server';
import { auth0 } from './utils/auth';

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

export const middleware = async (req: NextRequest) => {
	return await auth0.middleware(req);
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
		'/((?!AI-LOGO.png|api/trigger|_next/static|_next/image|favicon.ico).*)'
	]
};