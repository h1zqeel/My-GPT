'use client';

import { Button } from '@mui/material';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

export const LoginButton = () => {
	return (
		<Button>
			<Link href="/login" style={{ marginRight: 10 }}>
				Login
			</Link>
		</Button>
	);
};

export const RegisterButton = () => {
	return (
		<Button>
			<Link href="/register" style={{ marginRight: 10 }}>
				Register
			</Link>
		</Button>
	);
};

export const LogoutButton = () => {
	return (
		<button style={{ marginRight: 10 }} onClick={() => signOut()}>
			Sign Out
		</button>
	);
};

export const ProfileButton = () => {
	return <Link href="/profile">Profile</Link>;
};
