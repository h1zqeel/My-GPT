'use client';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useEffect, useState } from 'react';

const darkTheme = createTheme({
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
			{domLoaded && <ThemeProvider theme={darkTheme}>
				<CssBaseline />
				{children}
			</ThemeProvider>}
		</>
	);
};

export default ChildLayout;