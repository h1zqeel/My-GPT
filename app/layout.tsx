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
	weight: ['400', '700'],
	variable: '--main-font',
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
			<body className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-600 via-gray-800 to-black">
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
