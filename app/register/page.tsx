'use client';

import React, { useState } from 'react';
import { Button, CircularProgress, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import axios, { AxiosError } from 'axios';
import { ResData } from '@/types/axios';

export default function Login()	{
	const router = useRouter();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [cPassword, setCPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const callbackUrl = '/login';

	const handleSignUp = async() => {
		setError('');
		setLoading(true);
		if(username.length < 6 || password.length < 6 || password !== cPassword) {
			setError('Invalid username or password: username and password must be at least 6 characters long and passwords must match');
			setLoading(false);
			return;
		}
		try{
			const res = await axios.post('/register/api', {
				headers: {
					'Content-Type': 'application/json'
				},
				username,
				password
			});
			if (res.status === 200 && res.data.ok) {
				router.push(callbackUrl);
			} else {
				setError(res.data.error || 'An error occurred');
				setLoading(false);
			}
		} catch (err) {
			const error = err as AxiosError;
			const data = error.response?.data as ResData;
			setError(data.error || 'An error occurred');
			setLoading(false);
		}
	};
	return <div className="grid h-screen place-items-center">
		<div className="text-center flex flex-col space-y-4">
			<h1 className="text-3xl text-bold">Register</h1>
			<div>
				<TextField
					name='r-username'
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
					name='r-password'
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
				<TextField
					name='r-cpassword'
					id="outlined-basic"
					label="Confirm Password"
					variant="outlined"
					type="password"
					onChange={(e) => setCPassword(e.target.value)}
					value={cPassword}
					size="small"
				/>
			</div>
			<div>
				<Button
					className="bg-primary hover:bg-secondary hover:text-white"
					variant="contained"
					size="small"
					onClick={handleSignUp}
				>
					{loading ? <CircularProgress /> : 'Register'}
				</Button>
			</div>
			<div>{error}</div>
		</div>
	</div>;
}