'use client';

import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { Button, CircularProgress, TextField } from '@mui/material';
import { ResData } from '@/types/axios';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getSession } from '@/redux/features/sessionSlice';
import { toast } from '@/utils/toast';
import { errors } from '@/constants';
import { useSearchParams } from 'next/navigation';

export default function Login() {
	const { user, loading: userLoading } = useAppSelector(
		({ sessionReducer }) => sessionReducer
	);
	const dispatch = useAppDispatch();
	const searchParams = useSearchParams();

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');

	const [openAIKey, setOpenAIKey] = useState('');
	const [googleAIKey, setGoogleAIKey] = useState('');
	const [anthropicAIKey, setAnthropicAIKey] = useState('');
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		const errorFromParam = searchParams.get('error');
		if (errorFromParam) {
			toast(errorFromParam, 'error');
		}
	}, []);

	useEffect(() => {
		setLoading(userLoading);
	}, [userLoading]);

	useEffect(() => {
		setName(user?.name || '');
		setOpenAIKey(user?.openAIKey || '');
		setGoogleAIKey(user?.googleAIKey || '');
		setAnthropicAIKey(user?.anthropicAIKey || '');
		setEmail(user?.email || '');
	}, [user]);

	const updateProfile = async () => {
		setLoading(true);

		try {
			const res = await axios.put('/profile/api', {
				headers: {
					'Content-Type': 'application/json',
				},
				name,
				openAIKey,
				googleAIKey,
				anthropicAIKey,
			});
			if (res.status === 200 && res.data.ok) {
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

	return (
		<div className="grid h-[calc(100dvh)] place-items-center">
			<div className="text-center flex flex-col space-y-4">
				<h1 className="text-3xl text-bold">Settings</h1>
				<div>
					<TextField
						sx={{ width: '400px' }}
						name="r-name"
						id="r-name"
						label="Name"
						variant="outlined"
						value={name}
						onChange={(e) => setName(e.target.value)}
						size="small"
						disabled={true}
					/>
				</div>
				<div>
					<TextField
						sx={{ width: '400px' }}
						type="text"
						name="r-email"
						id="r-email"
						label="Email"
						variant="outlined"
						value={email}
						size="small"
						placeholder="Connect to Github or Google to add Email"
						disabled={true}
					/>
				</div>
				<div>
					<TextField
						sx={{ width: '400px' }}
						autoComplete="chrome-off"
						type="text"
						name="r-openai-key"
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
						sx={{ width: '400px' }}
						autoComplete="chrome-off"
						type="text"
						name="r-googleai-key"
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
						sx={{ width: '400px' }}
						autoComplete="chrome-off"
						type="text"
						name="r-anthropicai-key"
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
						sx={{ width: '150px' }}
						variant="contained"
						size="small"
						onClick={updateProfile}
						disabled={loading}
					>
						{loading ? <CircularProgress size={25} /> : 'Update'}
					</Button>
				</div>
			</div>
		</div>
	);
}
