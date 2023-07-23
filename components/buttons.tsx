'use client';

import { Button } from '@mui/material';
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
		<Button>
			<Link href={'/api/auth/logout'}>
				Sign Out
			</Link>
		</Button>
	);
};

export const ProfileButton = () => {
	return <Link href="/profile">Profile</Link>;
};
