module.exports = {
	apps: [
		{
			name: 'my-gpt',
			script: 'node_modules/next/dist/bin/next',
			args: 'start',
			instances : 'max',
			exec_mode : 'cluster',
			env_production: {
				APP_ENV: 'prod'
			}
		}
	]
};