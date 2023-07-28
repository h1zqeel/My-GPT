'use client';

import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { Button, CircularProgress, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import { RegisterButton } from '@/components/buttons';
import { ResData } from '@/types/axios';
import { useAppDispatch } from '@/redux/hooks';
import { setSession } from '@/redux/features/sessionSlice';
import { toast } from '@/utils/toast';
import { errors } from '@/constants';

export default function Login()	{
	const router = useRouter();
	const dispatch = useAppDispatch();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const callbackUrl = '/';

	const handleSignIn = async() => {
		setLoading(true);
		try {
			const res = await axios.post('/login/api', {
				username,
				password
			});

			if(res.status === 200 && res.data.ok) {
				dispatch(setSession(res.data.user));
				return router.push(callbackUrl);
			}
		} catch (err) {
			const error = err as AxiosError;
			const data = error.response?.data as ResData;
			toast(data.error || errors.DEFAULT, 'error');
			setLoading(false);
		}
		setLoading(false);
	};
	return <div className="grid h-[calc(100dvh)] place-items-center">
		<div className="text-center flex flex-col space-y-4">
			<h1 className="text-3xl text-bold">Login</h1>
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
			<div className='flex flex-row justify-center space-x-4'>
				<RegisterButton />
				<Button
					className="bg-primary hover:bg-secondary hover:text-white"
					variant="contained"
					size="small"
					onClick={handleSignIn}
					disabled={loading}
				>
					{loading ? <CircularProgress size={25} /> : 'Login'}
				</Button>
			</div>
		</div>
	</div>;
}