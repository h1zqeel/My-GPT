'use client';

import { LoginButton, LogoutButton, RegisterButton } from '@/components/buttons';
import { useSession } from 'next-auth/react';

export default function Home() {
	const { data: session } = useSession();
	const user = session?.user;
	return (
		<main className="flex min-h-screen flex-col items-center p-24">
			Welcome, {user?.name ?? 'Guest'}
			<LogoutButton />
		</main>
	);
}
