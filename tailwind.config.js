/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}'
	],
	theme: {
		extend: {
			colors: {
				background: '#0000',
				primary: '#FAFAF9',
				secondary: '#E7E5E4',
				secondBackground: '#18181B'
			}
		}
	},
	plugins: []
};
