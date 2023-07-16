'use client';

import { LogoutButton } from '@/components/buttons';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getSession } from  '@/redux/features/sessionSlice';
import { useEffect } from 'react';
import { CircularProgress } from '@mui/material';
export default function Home() {
	const { user, loading } = useAppSelector(({ sessionReducer }) => sessionReducer);
	const dispatch = useAppDispatch();
	useEffect(()=>{
		if(!user) {
			dispatch(getSession());
		}
	}, []);
	return (
		<main className="flex min-h-screen flex-col items-center p-24">
			{loading ? <CircularProgress /> : <>Welcome,  {user?.username} </>}
			<LogoutButton />
		</main>
	);
}
