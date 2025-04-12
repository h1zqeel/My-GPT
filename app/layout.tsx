import './globals.css';
import ChildLayout from '@/components/childLayout';
import { Poppins } from 'next/font/google';
import { config } from '@fortawesome/fontawesome-svg-core';
import { ReduxProvider } from '@/redux/provider';
import { SessionProvider } from './provider';
import { ToastContainer } from 'react-toastify';
import '@fortawesome/fontawesome-svg-core/styles.css';
import 'react-toastify/dist/ReactToastify.css';

config.autoAddCss = false;

const poppins = Poppins({
	weight: ['400', '500', '600', '700'],
	variable: '--font-poppins',
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
		<html lang="en" className={poppins.className} style={poppins.style}>
			<body className="min-h-screen bg-linear-to-br from-gray-700 via-gray-900 to-black bg-[length:200%_200%] animate-[gradient-bg_12s_ease_infinite] text-white">
				<ReduxProvider>
					<SessionProvider>
						<ChildLayout>
							{children}
							<ToastContainer />
						</ChildLayout>
					</SessionProvider>
				</ReduxProvider>
			</body>
		</html>
	);
}
