'use client';

import NextTopLoader from 'nextjs-toploader';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import 'react-loading-skeleton/dist/skeleton.css';

const darkTheme = createTheme({
	typography: {
		fontFamily: '\'Poppins\', sans-serif'
	},
	palette: {
		mode: 'dark',
		primary: {
			main: '#FAFAF9'
		},
		secondary: {
			main: '#E7E5E4'
		}
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					padding:'10px 20px',
					maxHeight: '35px',
					backgroundColor: '#e9f2f9',
					color: 'black',
					'&:hover': {
						color: 'white',
						backgroundColor: 'black'
					}
				}
			}
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
			{/* <NextTopLoader
				color="#ffff"
				easing="ease-in-out"
			/> */}
			{domLoaded && <ThemeProvider theme={darkTheme}>
				<CssBaseline />
				{children}
			</ThemeProvider>}
		</>
	);
};

export default ChildLayout;