import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import type { NextAuthOptions } from 'next-auth';

export const authOptions : NextAuthOptions = {
	session:{
		strategy: 'jwt'
	},
	providers: [
		CredentialsProvider({
			name: 'Login',
			credentials: {
				username: { label: 'Username', type: 'text', placeholder: 'username' },
				password: { label: 'Password', type: 'password', placeholder: 'password' }
			},
			async authorize(credentials, req) {
				const res = await fetch(`${process.env.BASE_URL}/login/api`, {
					method: 'POST',
					body: JSON.stringify(credentials),
					headers: { 'Content-Type': 'application/json' }
				});
				const user = await res.json();
				if (res.ok && user) {
					return user;
				}
				return null;
			}
		})
	],
	pages: {
		signIn: '/login',
		error: '/error'
	}
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };