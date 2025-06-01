'use client';

import Link from 'next/link';
import {
	LoginButton,
	LogoutButton,
	RegisterButton,
} from '@/components/buttons';

import { useUser } from '@auth0/nextjs-auth0';

export const Landing = () => {
	const { user } = useUser();
	if (user) {
		return (
			<div className="text-xl flex flex-col items-center space-y-4">
				<div>
					Welcome {user.name}, Start Creating your Bots{' '}
					<Link
						href={'/chats'}
						className="underline hover:text-slate-500"
					>
						Here
					</Link>
				</div>
				<div>
					<LogoutButton />
				</div>
			</div>
		);
	}
	return (
		<>
			<div className="flex flex-row space-x-4">
				<div>
					<LoginButton />
				</div>
				<div>
					<RegisterButton />
				</div>
			</div>
		</>
	);
};
