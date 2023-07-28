'use client';

import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { Button, CircularProgress, TextField } from '@mui/material';
import { ResData } from '@/types/axios';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getSession } from '@/redux/features/sessionSlice';

export default function Login()	{
	const { user, loading:userLoading } = useAppSelector(({ sessionReducer }) => sessionReducer);
	const dispatch = useAppDispatch();

	const [username, setUsername] = useState('');
	const [name, setName] = useState('');
	const [openAIKey, setOpenAIKey] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	useEffect(()=>{
		setLoading(userLoading);
	},[userLoading]);

	useEffect(()=>{
		setUsername(user?.username || '');
		setName(user?.name || '');
		setOpenAIKey(user?.openAIKey || '');
	}, [user]);

	const updateProfile = async() => {
		setError('');
		setLoading(true);

		try{
			const res = await axios.put('/profile/api', {
				headers: {
					'Content-Type': 'application/json'
				},
				userId: user?.id,
				name,
				openAIKey
			});
			if (res.status === 200 && res.data.ok) {
				await axios.post('login/api/refresh');
				dispatch(getSession());
				setError('Update Successful');
				setLoading(false);
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
	return <div className="grid h-[calc(100dvh)] place-items-center">
		<div className="text-center flex flex-col space-y-4">
			<h1 className="text-3xl text-bold">Settings</h1>
			<div>
				<TextField
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
				<Button
					className="bg-primary hover:bg-secondary hover:text-white"
					variant="contained"
					size="small"
					onClick={updateProfile}
					disabled={loading}
				>
					{loading ? <CircularProgress  size={25}/> : 'Update'}
				</Button>
			</div>
			<div>{error}</div>
		</div>
	</div>;
}