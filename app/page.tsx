'use client';

import { LogoutButton } from '@/components/buttons';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Button, CircularProgress } from '@mui/material';
import Link from 'next/link';

export default function Home() {
	const { user, loading } = useAppSelector(({ sessionReducer }) => sessionReducer);
	const dispatch = useAppDispatch();

	return (
		<main className="flex min-h-screen flex-col items-center p-24">
			{loading ? <CircularProgress size={25} /> : <>Welcome,  {user?.name}
				<Button><Link href={'/chats'}>Chats</Link></Button>
				<Button><Link href={'/profile'}>Profile</Link></Button>
				<LogoutButton />
			</>}
		</main>
	);
}
