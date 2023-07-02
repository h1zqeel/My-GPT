'use client';

import React, { useState } from 'react';
import { Button, CircularProgress, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function Login()	{
	const router = useRouter();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const callbackUrl = '/home';

	const handleSignIn = async() => {
		setLoading(true);
		const res = await signIn('credentials', {
			redirect: false,
			username,
			password,
			callbackUrl
		});
		if (!res?.error) {
			router.push(callbackUrl);
		} else {
			setError('Invalid email or password');
		}
		setLoading(false);
	};
	return <div className="grid h-screen place-items-center">
		<div className="text-center flex flex-col space-y-4">
			<h1 className="text-3xl text-bold">Enter Details</h1>
			<div>
				<TextField
					id="outlined-basic"
					label="Username"
					variant="outlined"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					size="small"
				/>
			</div>
			<div>
				<TextField
					id="outlined-basic"
					label="Password"
					variant="outlined"
					type="password"
					onChange={(e) => setPassword(e.target.value)}
					value={password}
					size="small"
				/>
			</div>
			<div>
				<Button
					className="bg-primary hover:bg-secondary hover:text-white"
					variant="contained"
					size="small"
					onClick={handleSignIn}
				>
					{loading ? <CircularProgress /> : 'Login'}
				</Button>
			</div>
			<div>{error}</div>
		</div>
	</div>;
}