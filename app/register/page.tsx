'use client';

import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { Button, CircularProgress, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import { ResData } from '@/types/axios';
import { LoginButton } from '@/components/buttons';
import { toast } from '@/utils/toast';
import { errors } from '@/constants';

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
			toast('Invalid username or password: username and password must be at least 6 characters long and passwords must match', 'error');
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
				setLoading(false);
				setUsername('');
				setPassword('');
				setCPassword('');
				toast('Registration successful, redirecting to login page', 'success');
				setTimeout(()=>{
					return router.push(callbackUrl);
				}, 600);
			} else {
				toast(res.data.error || errors.DEFAULT, 'error');
				setLoading(false);
			}
		} catch (err) {
			const error = err as AxiosError;
			const data = error.response?.data as ResData;
			toast(data.error || errors.DEFAULT, 'error');
			setLoading(false);
		}
	};
	return <div className="grid h-[calc(100dvh)] place-items-center">
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
			<div className='flex flex-row justify-center space-x-4'>
				<LoginButton />
				<Button
					className="bg-primary hover:bg-secondary hover:text-white"
					variant="contained"
					size="small"
					onClick={handleSignUp}
					disabled={loading}
				>
					{loading ? <CircularProgress size={25}/> : 'Register'}
				</Button>
			</div>
			<div>{error}</div>
		</div>
	</div>;
}