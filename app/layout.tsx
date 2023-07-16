import './globals.css';
import { Inter } from 'next/font/google';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import { ReduxProvider } from '@/redux/provider';
import { SessionProvider } from './provider';
config.autoAddCss = false;

const inter = Inter({ subsets: ['latin'] });

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
		<html lang="en">
			<body className={inter.className}>
				<ReduxProvider>
					<SessionProvider>
						{children}
					</SessionProvider>
				</ReduxProvider>
			</body>
		</html>
	);
}
