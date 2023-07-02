import { LoginButton, RegisterButton } from '@/components/buttons';

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center p-24">
			Welcome, Register at <RegisterButton /> or Login at <LoginButton />
		</main>
	);
}
