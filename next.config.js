/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'my-gpt-axq.pages.dev',
				port: '',
				pathname: '/*'
			}
		]
	},
	experimental: {
		instrumentationHook: true
	}
};

module.exports = nextConfig;
