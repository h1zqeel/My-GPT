// lib/logger.js
import pino from 'pino';
import path from 'path';

const transport = pino.transport({
	targets: [
		{
			target: 'pino-pretty',
			options: { colorize: true },
			level: 'debug',
		},
		{
			target: path.resolve('./transport.ts'),
			level: 'info',
		},
	],
});

const logger = pino({ level: 'debug' }, transport);

export default logger;
