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
	}
};

module.exports = nextConfig;
