'use client';

import axios from 'axios';
import Link from 'next/link';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const LoginButton = () => {
	return (
		<Button>
			<Link href="/login">
				Login
			</Link>
		</Button>
	);
};

export const RegisterButton = () => {
	return (
		<Button>
			<Link href="/register" >
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

export const LogoutIcon = () => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const signOut = async() => {
		setLoading(true);
		await axios.get('/api/auth/logout');
		setLoading(false);
		return router.push('/login');
	};
	return (
		loading ? <CircularProgress size={30}/>:<FontAwesomeIcon size='2x' onClick={signOut}  icon={faRightFromBracket} />
	);
};

export const ProfileButton = () => {
	return <Link href="/profile">Profile</Link>;
};
