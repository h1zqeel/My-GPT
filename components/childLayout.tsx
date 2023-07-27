'use client';

import NextTopLoader from 'nextjs-toploader';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useEffect, useState } from 'react';

const darkTheme = createTheme({
	typography: {
		fontFamily: '\'__Ubuntu_761005\', \'__Ubuntu_Fallback_761005\''
	},
	palette: {
		mode: 'dark',
		primary: {
			main: '#FAFAF9'
		},
		secondary: {
			main: '#E7E5E4'
		}
	}
});
const ChildLayout = ({ children } : any) => {
	const [domLoaded, setDomLoaded] = useState(false);

	useEffect(() => {
		setDomLoaded(true);
	}, []);
	return (
		<>
			<NextTopLoader
				color="#ffff"
				easing="ease-in-out"
			/>
			{domLoaded && <ThemeProvider theme={darkTheme}>
				<CssBaseline />
				{children}
			</ThemeProvider>}
		</>
	);
};

export default ChildLayout;