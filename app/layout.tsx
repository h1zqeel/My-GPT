import './globals.css';
import { Inter } from 'next/font/google';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import { ReduxProvider } from '@/redux/provider';
import { SessionProvider } from './provider';
import ChildLayout from '@/components/childLayout';
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
			<body>
				<ReduxProvider>
					<SessionProvider>
						<ChildLayout>
							{children}
						</ChildLayout>
					</SessionProvider>
				</ReduxProvider>
			</body>
		</html>
	);
}
