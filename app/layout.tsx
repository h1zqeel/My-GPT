import './globals.css';
import ChildLayout from '@/components/childLayout';
import { Ubuntu } from 'next/font/google';
import { config } from '@fortawesome/fontawesome-svg-core';
import { ReduxProvider } from '@/redux/provider';
import { SessionProvider } from './provider';
import { Analytics } from '@vercel/analytics/react';
import { ToastContainer } from 'react-toastify';
import '@fortawesome/fontawesome-svg-core/styles.css';
import 'react-toastify/dist/ReactToastify.css';

config.autoAddCss = false;

const ubuntu = Ubuntu({
	weight: ['400', '700'],
	variable: '--font-ubuntu',
	preload: false
});

export const metadata = {
	title: 'My GPT',
	description: 'An AI Application that uses GPT using your personal API Key'
};

export default function RootLayout({
	children
}: {
  children: React.ReactNode
}) {
	return (
		<html lang="en" className={ubuntu.className} style={ubuntu.style}>
			<body className={`bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-600 via-gray-800 to-black ${ubuntu.className}`} style={ubuntu.style}>
				<ReduxProvider>
					<SessionProvider>
						<ChildLayout>
							{children}
							<ToastContainer />
							<Analytics />
						</ChildLayout>
					</SessionProvider>
				</ReduxProvider>
			</body>
		</html>
	);
}
