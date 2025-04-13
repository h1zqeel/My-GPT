'use client';

import NextTopLoader from 'nextjs-toploader';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import { colors } from '@/colors.js';

const darkTheme = createTheme({
	typography: {
		fontFamily: '\'Poppins\', sans-serif'
	},
	palette: {
		mode: 'dark',
		background: {
			default: colors.firstBackground,
			paper: colors.secondBackground
		},
		primary: {
			main: colors.primary
		},
		secondary: {
			main: colors.secondary
		},
		text: {
			primary: colors.textPrimary,
			secondary: colors.textSecondary,
		},
		surfaceA: {
			main: colors['surface-a-start'],
			dark: colors['surface-a-end'],
		},
		surfaceB: {
			main: colors['surface-b-start'],
			dark: colors['surface-b-end'],
		},
	},
	shape: {
		borderRadius: 20
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					padding: '10px 20px',
					maxHeight: '35px',
					borderRadius: '20px',
				},

				containedPrimary: {
					backgroundColor: colors.primary,
					color: colors.textPrimary,
					'&:hover': {
						backgroundColor: colors.primaryHover,
						color: colors.textPrimary
					}
				},

				containedSecondary: {
					backgroundColor: colors.secondary,
					color: colors.textSecondary,
					'&:hover': {
						backgroundColor: colors.secondaryHover,
						color: colors.textSecondary
					}
				}
			}
		},
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					borderRadius: '20px',
				}
			}
		},
		MuiInputLabel: {
			styleOverrides: {
				root: {
					color: colors.textPrimary,
					'&.Mui-focused': {
						color: colors.primary
					}
				}
			}
		},
		MuiCircularProgress: {
			styleOverrides: {
				circle: {
					strokeLinecap: 'round',
					stroke: colors.primary,
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