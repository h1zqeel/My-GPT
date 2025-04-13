'use client';

import NextTopLoader from 'nextjs-toploader';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useEffect, useMemo, useState } from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import { colors, lightColors } from '@/colors.js';
import { useMediaQuery } from '@mui/material';

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
			secondary: colors.textSecondary
		},
		surfaceA: {
			main: colors['surface-a-start'],
			dark: colors['surface-a-end']
		},
		surfaceB: {
			main: colors['surface-b-start'],
			dark: colors['surface-b-end']
		}
	},
	shape: {
		borderRadius: 20
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				':root': {
					'--firstBackground': colors.firstBackground,
					'--secondBackground': colors.secondBackground,
					'--primary': colors.primary,
					'--primaryHover': colors.primaryHover,
					'--secondary': colors.secondary,
					'--secondaryHover': colors.secondaryHover,
					'--textPrimary': colors.textPrimary,
					'--textSecondary': colors.textSecondary,
					'--textMuted': colors.textMuted,
					'--border': colors.border,
					'--surface-a-start': colors['surface-a-start'],
					'--surface-a-end': colors['surface-a-end'],
					'--surface-b-start': colors['surface-b-start'],
					'--surface-b-end': colors['surface-b-end'],
					'--scrollbarTrack': colors.scrollbarTrack,
					'--scrollbarThumb': colors.scrollbarThumb
				}
			}
		},
		MuiButton: {
			styleOverrides: {
				root: {
					padding: '10px 20px',
					maxHeight: '35px',
					borderRadius: '20px'
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
					borderRadius: '20px'
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
					stroke: colors.primary
				}
			}
		}
	}
});

const lightTheme = createTheme({
	typography: {
		fontFamily: '\'Poppins\', sans-serif'
	},
	palette: {
		mode: 'light',
		background: {
			default: lightColors.firstBackground,
			paper: lightColors.secondBackground
		},
		primary: {
			main: lightColors.primary
		},
		secondary: {
			main: lightColors.secondary
		},
		text: {
			primary: lightColors.textPrimary,
			secondary: lightColors.textSecondary
		},
		surfaceA: {
			main: lightColors['surface-a-start'],
			dark: lightColors['surface-a-end']
		},
		surfaceB: {
			main: lightColors['surface-b-start'],
			dark: lightColors['surface-b-end']
		}
	},
	shape: {
		borderRadius: 20
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				':root': {
					'--firstBackground': lightColors.firstBackground,
					'--secondBackground': lightColors.secondBackground,
					'--primary': lightColors.primary,
					'--primaryHover': lightColors.primaryHover,
					'--secondary': lightColors.secondary,
					'--secondaryHover': lightColors.secondaryHover,
					'--textPrimary': lightColors.textPrimary,
					'--textSecondary': lightColors.textSecondary,
					'--textMuted': lightColors.textMuted,
					'--border': lightColors.border,
					'--surface-a-start': lightColors['surface-a-start'],
					'--surface-a-end': lightColors['surface-a-end'],
					'--surface-b-start': lightColors['surface-b-start'],
					'--surface-b-end': lightColors['surface-b-end'],
					'--scrollbarTrack': lightColors.scrollbarTrack,
					'--scrollbarThumb': lightColors.scrollbarThumb
				}
			}
		},
		MuiButton: {
			styleOverrides: {
				root: {
					padding: '10px 20px',
					maxHeight: '35px',
					borderRadius: '20px'
				},
				containedPrimary: {
					backgroundColor: lightColors.primary,
					color: lightColors.textPrimary,
					'&:hover': {
						backgroundColor: lightColors.primaryHover,
						color: lightColors.textPrimary
					}
				},
				containedSecondary: {
					backgroundColor: lightColors.secondary,
					color: lightColors.textSecondary,
					'&:hover': {
						backgroundColor: lightColors.secondaryHover,
						color: lightColors.textSecondary
					}
				}
			}
		},
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					borderRadius: '20px'
				}
			}
		},
		MuiInputLabel: {
			styleOverrides: {
				root: {
					color: lightColors.textPrimary,
					'&.Mui-focused': {
						color: lightColors.primary
					}
				}
			}
		},
		MuiCircularProgress: {
			styleOverrides: {
				circle: {
					strokeLinecap: 'round',
					stroke: lightColors.primary
				}
			}
		}
	}
});
const ChildLayout = ({ children } : any) => {
	const [domLoaded, setDomLoaded] = useState(false);
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
	const theme = useMemo(
		() => (prefersDarkMode ? darkTheme : lightTheme),
		[prefersDarkMode]
	);
	useEffect(() => {
		setDomLoaded(true);
	}, []);
	return (
		<>
			{/* <NextTopLoader
				color="#ffff"
				easing="ease-in-out"
			/> */}
			{domLoaded && <ThemeProvider theme={theme}>
				<CssBaseline />
				{children}
			</ThemeProvider>}
		</>
	);
};

export default ChildLayout;