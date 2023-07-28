'use client';

import Link from 'next/link';
import { LoginButton, LogoutButton, RegisterButton } from '@/components/buttons';
import { getSession } from '@/redux/features/sessionSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useEffect } from 'react';


export const Landing = () => {
	const dispatch = useAppDispatch();
	const { user } = useAppSelector(({ sessionReducer }) => sessionReducer);
	useEffect(()=>{
		dispatch(getSession());
	}, []);
	if(user) {
		return <div className='text-xl flex flex-col items-center space-y-4'>
			<div>
			Welcome {user.username},
			Start Creating your Bots <Link href={'/chats'} className='underline hover:text-slate-500'>Here</Link>
			</div>
			<div>
				<LogoutButton />
			</div>
		</div>;
	}
	return <>
		<div className='flex flex-row space-x-4'>
			<LoginButton />
			<RegisterButton />
		</div>
	</>;
};