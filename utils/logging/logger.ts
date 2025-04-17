import pino from 'pino';

const transport = pino.transport({
	targets: [
		{
			target: 'pino-pretty',
			options: { colorize: true },
			level: 'debug',
		},
		{
			target: './transport.ts',
			level: 'info',
		},
	],
});

const logger = pino({ level: 'debug' }, transport);

export default logger;
