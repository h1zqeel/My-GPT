'use client';

import { Button, CircularProgress } from '@mui/material';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

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
	const [loading, setLoading] = useState(false);
	const signOut = async() => {
		setLoading(true);
		await axios.get('/api/auth/logout');
		setLoading(false);
		return router.push('/login');
	};
	return (
		<Button onClick={signOut} disabled={loading}>
			{loading ? <CircularProgress size={25}/> :'Sign Out'}
		</Button>
	);
};

export const ProfileButton = () => {
	return <Link href="/profile">Profile</Link>;
};
