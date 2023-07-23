'use client';

import { Button } from '@mui/material';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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
	const router = useRouter();
	const signOut = async() => {
		await axios.get('/api/auth/logout');
		router.push('/login');
	};
	return (
		<Button onClick={signOut}>
			Sign Out
		</Button>
	);
};

export const ProfileButton = () => {
	return <Link href="/profile">Profile</Link>;
};
