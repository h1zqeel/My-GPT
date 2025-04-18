'use client';

import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { Button, CircularProgress, TextField } from '@mui/material';
import { ResData } from '@/types/axios';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getSession } from '@/redux/features/sessionSlice';
import { GithubLoginButton, GoogleLoginButton } from 'react-social-login-buttons';
import Link from 'next/link';
import { toast } from '@/utils/toast';
import { errors } from '@/constants';
import { useSearchParams } from 'next/navigation';

export default function Login()	{
	const { user, loading:userLoading } = useAppSelector(({ sessionReducer }) => sessionReducer);
	const dispatch = useAppDispatch();
	const searchParams = useSearchParams();

	const [username, setUsername] = useState('');
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');

	const [openAIKey, setOpenAIKey] = useState('');
	const [googleAIKey, setGoogleAIKey] = useState('');
	const [anthropicAIKey, setAnthropicAIKey] = useState('');
	const [loading, setLoading] = useState(false);
	const [hasGoogle, setHasGoogle] = useState(false);
	const [hasGithub, setHasGithub] = useState(false);
	const [googleLoading, setGoogleLoading] = useState(false);
	const [githubLoading, setGithubLoading] = useState(false);
	useEffect(() => {
		const errorFromParam = searchParams.get('error');
		if(errorFromParam) {
			toast(errorFromParam, 'error');
		}
	}, []);

	useEffect(()=>{
		setLoading(userLoading);
	},[userLoading]);

	useEffect(()=>{
		setUsername(user?.username || '');
		setName(user?.name || '');
		setOpenAIKey(user?.openAIKey || '');
		setGoogleAIKey(user?.googleAIKey || '');
		setAnthropicAIKey(user?.anthropicAIKey || '');
		setEmail(user?.email || '');
		if(user?.providers) {
			const google = user?.providers.find((provider : {name: string, email: string}) => provider.name === 'google');
			const github = user?.providers.find((provider : {name: string, email: string}) => provider.name === 'github');
			if (google && google.identifier) {
				setHasGoogle(true);
			}
			if (github && github.identifier) {
				setHasGithub(true);
			}
		}
	}, [user]);

	const refreshSession = async() => {
		await axios.post('/login/api/refresh');
		dispatch(getSession(true));
	};
	const updateProfile = async() => {
		setLoading(true);

		try{
			const res = await axios.put('/profile/api', {
				headers: {
					'Content-Type': 'application/json'
				},
				userId: user?.id,
				name,
				openAIKey,
				googleAIKey,
				anthropicAIKey
			});
			if (res.status === 200 && res.data.ok) {
				await axios.post('login/api/refresh');
				dispatch(getSession(true));
				toast('Update Successful', 'success');
				setLoading(false);
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

	const unlinkGoogleAccount = async() => {
		setGoogleLoading(true);
		try{
			const { data } = await axios.delete('/login/api/google');

			if(data.ok) {
				await refreshSession();
				setHasGoogle(false);
				toast('Google Account Unlinked', 'success');
				setGoogleLoading(false);
			} else {
				toast(data.error || errors.DEFAULT, 'error');
				setGoogleLoading(false);
			}
		} catch(err) {
			toast(errors.DEFAULT, 'error');
			setGoogleLoading(false);
		}
	};

	const unlinkGithubAccount = async() => {
		setGithubLoading(true);
		try{
			const { data } = await axios.delete('/login/api/github');
			if(data.ok) {
				await refreshSession();
				setHasGithub(false);
				toast('Github Account Unlinked', 'success');
				setGithubLoading(false);
			} else {
				toast(data.error || errors.DEFAULT, 'error');
				setGithubLoading(false);
			}
		} catch(err) {
			toast(errors.DEFAULT, 'error');
			setGithubLoading(false);
		}
	};

	return <div className="grid h-[calc(100dvh)] place-items-center">
		<div className="text-center flex flex-col space-y-4">
			<h1 className="text-3xl text-bold">Settings</h1>
			<div>
				<TextField
					sx={{ width:'400px' }}
					name='r-name'
					id="r-name"
					label="Name"
					variant="outlined"
					value={name}
					onChange={(e) => setName(e.target.value)}
					size="small"
				/>
			</div>
			<div>
				<TextField
					sx={{ width:'400px' }}
					type='text'
					name='r-username'
					id="r-username"
					label="Username"
					variant="outlined"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					size="small"
					disabled={true}
				/>
			</div>
			<div>
				<TextField
					sx={{ width:'400px' }}
					type='text'
					name='r-email'
					id="r-email"
					label="Email"
					variant="outlined"
					value={email}
					size="small"
					placeholder='Connect to Github or Google to add Email'
					disabled={true}
				/>
			</div>
			<div>
				<TextField
					sx={{ width:'400px' }}
					autoComplete='chrome-off'
					type='text'
					name='r-openai-key'
					id="outlined-basic"
					label="Add your Open AI Key Here"
					variant="outlined"
					value={openAIKey}
					onChange={(e) => setOpenAIKey(e.target.value)}
					size="small"
				/>
			</div>
			<div>
				<TextField
					sx={{ width:'400px' }}
					autoComplete='chrome-off'
					type='text'
					name='r-googleai-key'
					id="outlined-basic"
					label="Add your Google AI Key Here"
					variant="outlined"
					value={googleAIKey}
					onChange={(e) => setGoogleAIKey(e.target.value)}
					size="small"
				/>
			</div>
			<div>
				<TextField
					sx={{ width:'400px' }}
					autoComplete='chrome-off'
					type='text'
					name='r-anthropicai-key'
					id="outlined-basic"
					label="Add your Anthropic (Claude) AI Key Here"
					variant="outlined"
					value={anthropicAIKey}
					onChange={(e) => setAnthropicAIKey(e.target.value)}
					size="small"
				/>
			</div>
			<div>
				<Button
					sx={{ width:'150px' }}
					variant="contained"
					size="small"
					onClick={updateProfile}
					disabled={loading}
				>
					{loading ? <CircularProgress  size={25}/> : 'Update'}
				</Button>
			</div>

			{hasGithub ?
				<div className='w-[400px]'>
					<GithubLoginButton className='w-64 text-center' onClick={unlinkGithubAccount} disabled={githubLoading}><span className='flex flex-row justify-start ml-2'>{githubLoading ? 'Unlinking Account...' : 'Unlink Account'}</span></GithubLoginButton>
				</div>
				:
				<div className='w-[400px]'>
					<Link href={`/login/api/github?userId=${user?.id}`}>
						<GithubLoginButton disabled={githubLoading} className='w-64 text-center'><span className='flex flex-row justify-start ml-2'>{githubLoading ? 'Please Wait...' : 'Link Account'}</span></GithubLoginButton>
					</Link>
				</div>}

			{hasGoogle?
				<div className='w-[400px]'>
					<GoogleLoginButton className='w-64 text-center' onClick={unlinkGoogleAccount} disabled={googleLoading}><span className='flex flex-row justify-start ml-2'>{googleLoading ? 'Unlinking Account...' : 'Unlink Account'}</span></GoogleLoginButton>
				</div>
				:
				<div className='w-[400px]'>
					<Link href={`/login/api/google?userId=${user?.id}`} onClick={()=>setGoogleLoading(true)}>
						<GoogleLoginButton disabled={googleLoading} className='w-64 text-center'><span className='flex flex-row justify-start ml-2'>{googleLoading ? 'Please Wait...' : 'Link Account'}</span></GoogleLoginButton>
					</Link>
				</div>}
		</div>
	</div>;
}