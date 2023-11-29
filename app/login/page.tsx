'use client';

import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import Link from 'next/link';
import { Button, CircularProgress, IconButton, InputAdornment, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import { RegisterButton } from '@/components/buttons';
import { ResData } from '@/types/axios';
import { useAppDispatch } from '@/redux/hooks';
import { getSession } from '@/redux/features/sessionSlice';
import { toast } from '@/utils/toast';
import { errors } from '@/constants';
import { GithubLoginButton, GoogleLoginButton } from 'react-social-login-buttons';
import { useSearchParams } from 'next/navigation';
import { Visibility, VisibilityOff } from '@mui/icons-material';


export default function Login()	{
	const router = useRouter();
	const dispatch = useAppDispatch();
	const callbackUrl = '/';
	const searchParams = useSearchParams();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	useEffect(() => {
		const googleSignInFailed = searchParams.get('googleSignInFailed');
		const googleEmailUnVerified = searchParams.get('googleEmailUnVerified');
		const githubSignInFailed = searchParams.get('githubSignInFailed');
		const errorFromParam = searchParams.get('error');
		if(googleSignInFailed) {
			toast(errors.GOOGLE.SIGN_IN, 'error');
		}
		if(googleEmailUnVerified) {
			toast(errors.GOOGLE.EMAIL_UNVERIFIED, 'error');
		}
		if(githubSignInFailed) {
			toast(errors.GITHUB.SIGN_IN, 'error');
		}
		if(errorFromParam) {
			toast(errorFromParam, 'error');
		}
	}, []);
	const handleSignIn = async() => {
		setLoading(true);
		try {
			const res = await axios.post('/login/api', {
				username,
				password
			});

			if(res.status === 200 && res.data.ok) {
				dispatch(getSession(false));
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
	return <form onSubmit={(e)=> {
		e.preventDefault(); handleSignIn();
	}}>
		<div className="grid h-[calc(100dvh)] place-items-center">
			<div className="text-center flex flex-col space-y-4">
				<h1 className="text-3xl text-bold">Login</h1>
				<div className='w-60'>
					<TextField
						sx={{
							width: '100%'
						}}
						id="outlined-basic"
						label="Username"
						variant="outlined"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						size="small"
					/>
				</div>
				<div className='w-60'>
					<TextField
						sx={{
							width: '100%'
						}}
						InputProps={{
							endAdornment: <InputAdornment position="end"><IconButton onClick={()=>{
								setShowPassword(!showPassword);
							}}> {showPassword ? <VisibilityOff /> :  <Visibility />} </IconButton></InputAdornment>
						}}
						id="outlined-basic"
						label="Password"
						variant="outlined"
						type={showPassword ? 'text' : 'password'}
						onChange={(e) => setPassword(e.target.value)}
						value={password}
						size="small"
					/>
				</div>
				<div className='flex flex-row justify-center space-x-10'>
					<RegisterButton />
					<Button
						className="bg-primary hover:bg-secondary hover:text-white"
						variant="contained"
						size="small"
						type='submit'
						disabled={loading}
					>
						{loading ? <CircularProgress size={25} /> : 'Login'}
					</Button>
				</div>
				<div className='flex flex-row justify-center space-x-3'>
					<div className='flex flex-col'>
						<Link href="/login/api/github">
							<GithubLoginButton />
						</Link>
						<Link href="/login/api/google">
							<GoogleLoginButton />
						</Link>
					</div>
				</div>
			</div>
		</div>
	</form>;
}