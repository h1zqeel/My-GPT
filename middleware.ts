export { default } from 'next-auth/middleware';

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
		'/((?!api/auth|login|register|_next/static|_next/image|favicon.ico).*)'
	]
};