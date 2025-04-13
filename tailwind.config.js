const { colors } = require('./colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				firstBackground: 'var(--firstBackground)',
				secondBackground: 'var(--secondBackground)',
				primary: 'var(--primary)',
				primaryHover: 'var(--primaryHover)',
				secondary: 'var(--secondary)',
				secondaryHover: 'var(--secondaryHover)',
				textPrimary: 'var(--textPrimary)',
				textSecondary: 'var(--textSecondary)',
				textMuted: 'var(--textMuted)',
				border: 'var(--border)',
				'surface-a-start': 'var(--surface-a-start)',
				'surface-a-end': 'var(--surface-a-end)',
				'surface-b-start': 'var(--surface-b-start)',
				'surface-b-end': 'var(--surface-b-end)',
				scrollbarTrack: 'var(--scrollbarTrack)',
				scrollbarThumb: 'var(--scrollbarThumb)',
			},
		},
	},
	plugins: [],
};
